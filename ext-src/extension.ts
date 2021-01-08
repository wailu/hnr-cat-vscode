import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = new CatViewProvider(context.extensionPath, context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(CatViewProvider.viewType, provider));
	
	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(() => provider._view?.webview.postMessage({ type: 'userTyping' }))
	)
}

class CatViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'VSCat.catView';

	public _view?: vscode.WebviewView;

	private readonly _extensionPath: string;

	constructor(
		extensionPath: string,
		private readonly _extensionUri: vscode.Uri,
	) {
		this._extensionPath = extensionPath;
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview();

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'colorSelected':
					{
						vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${data.value}`));
						break;
					}
			}
		});
	}

	// public addColor() {
	// 	if (this._view) {
	// 		this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
	// 		this._view.webview.postMessage({ type: 'addColor' });
	// 	}
	// }

	// public clearColors() {
	// 	if (this._view) {
	// 		this._view.webview.postMessage({ type: 'clearColors' });
	// 	}
	// }

	private _getHtmlForWebview() {
		const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'));
		const mainScript = manifest['main.js'];
		const mainStyle = manifest['main.css'];

		const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));
		const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
		const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));
		const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
				<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}