import * as React from 'react';
import './style.css';
// cat moods
import catIdle from './assets/catMoods/babycat-idle.png'
import catFed from './assets/catMoods/adultcat-idle.png'
import catEat from './assets/catMoods/babycat-eat.png'
import catPat from './assets/catMoods/babycat-pat.png'
import catSleep from './assets/catMoods/babycat-sleep.png'
import catActive from './assets/catMoods/babycat-active.png'

// cat backgrounds
import beachBg from './assets/backgrounds/beach.png'
import backyardBg from './assets/backgrounds/backyard.png'
import parkBg from './assets/backgrounds/park.png'
import snowvillageBg from './assets/backgrounds/snowvillage.png'

let gMouseDownX = 0;
let gMouseDownY = 0;
let gMouseDownOffsetX = 0;
let gMouseDownOffsetY = 0;

function addListeners() {
  document.getElementById('cat-image').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);
}


function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    gMouseDownX = e.clientX;
    gMouseDownY = e.clientY;

    var div = document.getElementById('cat-image')

    //The following block gets the X offset (the difference between where it starts and where it was clicked)
    let leftPart = "";
    if(!div.style.left)
        leftPart+="0px";    //In case this was not defined as 0px explicitly.
    else
        leftPart = div.style.left;
    let leftPos = leftPart.indexOf("px");
    let leftNumString = leftPart.slice(0, leftPos); // Get the X value of the object.
    gMouseDownOffsetX = gMouseDownX - parseInt(leftNumString,10);

    //The following block gets the Y offset (the difference between where it starts and where it was clicked)
    let topPart = "";
    if(!div.style.top)
        topPart+="0px";     //In case this was not defined as 0px explicitly.
    else
        topPart = div.style.top;
    let topPos = topPart.indexOf("px");
    let topNumString = topPart.slice(0, topPos);    // Get the Y value of the object.
    gMouseDownOffsetY = gMouseDownY - parseInt(topNumString,10);

    window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    var div = document.getElementById('cat-image')
    div.style.position = 'absolute';
    let topAmount = e.clientY - gMouseDownOffsetY;
    div.style.top = topAmount + 'px';
    let leftAmount = e.clientX - gMouseDownOffsetX;
    div.style.left = leftAmount + 'px';
}

window.addEventListener('load', () => addListeners());
class CatPanel extends React.Component {

  render() {
    const mood = ({
        'idle': catIdle,
        'idle2': catFed,
        'eat': catEat,
        'pat': catPat,
        'sleep': catSleep,
        'active': catActive
    })[this.props.catMood]

    const background = ({
      'beach': beachBg,
      'backyard': backyardBg,
      'park': parkBg,
      'snowvillage': snowvillageBg
    })[this.props.background]

    return (
      <div className="cat-panel">
        <img className="cat-background" src={background} />
        <img draggable={false} onDragStart={() => false} src={mood} className="cat-image" id="cat-image" alt="cat" />
      </div>
    )
  }
}

export default CatPanel;
