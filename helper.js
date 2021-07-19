/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

function $delOn(target, type, callback, capture) {
  target.removeEventListener(type, callback, !!capture);
}

// function $onDrag(elm, callback) {
//   $on(elm, 'mousedown', mouseDown, false);
//   $on(elm, 'mouseup', mouseUp, false);

//   function mouseDown(e) {
//     $on(window, 'mousemove', callback, false);
//   }
//   function mouseUp(e) {
//     $delOn(window, 'mousemove', callback, false);
//   }
// }

// function dragElement(elmnt, cb) {
//   var pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;
//   if (document.getElementById(elmnt.id + 'header')) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:

//     // elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
//     // elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';

//     cb({
//       x: elmnt.offsetTop - pos2,
//       y: elmnt.offsetLeft - pos1,
//     });
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }

// function point(x, y) {
//   return { x: x, y: y };
// }

function determineOrientation(a, b, callback) {
  let deg = cordToDeg(a, b);

  if (deg > 135 && deg < 225) {
    callback.left();
  } else if (deg > 315 || deg < 45) {
    callback.right();
  } else if (deg > 225 && deg < 315) {
    callback.top();
  } else {
    callback.bottom();
  }
}
function cordToDeg(a, b) {
  let rad = Math.atan2(a.y - b.y, a.x - b.x);
  rad = rad < 0 ? rad + 2 * Math.PI : rad;
  return rad * (180 / Math.PI);
}

function offsetPoints(elmx, at) {
  let result = '';
  let latitude = '';
  let longitute = '';
  let elmPos = elmx.element.position;
  let option = at || 'center';
  let node = elmx.element.node;
  // let side = elm.at ?? 'center';
  switch (option) {
    case 'bottom':
      latitude = elmPos.x + node.clientWidth / 2;
      longitute = elmPos.y + node.clientHeight;
      result = { x: latitude, y: longitute };
      break;
    case 'top':
      latitude = elmPos.x + node.clientWidth / 2;
      longitute = elmPos.y;
      result = { x: latitude, y: longitute };
      break;
    case 'left':
      latitude = elmPos.x;
      longitute = elmPos.y + node.clientHeight / 2;
      result = { x: latitude, y: longitute };
      break;
    case 'right':
      latitude = elmPos.x + node.clientWidth;
      longitute = elmPos.y + node.clientHeight / 2;
      result = { x: latitude, y: longitute };
      break;
    case 'center':
      latitude = elmPos.x + node.clientWidth / 2;
      longitute = elmPos.y + node.clientHeight / 2;
      result = { x: latitude, y: longitute };
      break;
  }
  return result;
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

let prebuildBoard = {
  elements: [
    {
      id: 'a',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'Alpha',
      },
      position: {
        x: 550,
        y: 299,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover primary',
      },
    },
    {
      id: 'b',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'Bravo',
      },
      position: {
        x: 713,
        y: 499,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'c',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'Charlie',
      },
      position: {
        x: 845,
        y: 377,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'd',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'D',
      },
      position: {
        x: 846,
        y: 243,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'e',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'E',
      },
      position: {
        x: 722,
        y: 116,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'f',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'F',
      },
      position: {
        x: 401,
        y: 500,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'g',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'G',
      },
      position: {
        x: 277,
        y: 383,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'h',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'H',
      },
      position: {
        x: 278,
        y: 236,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
    {
      id: 'i',
      category: {
        type: 'shape',
        shape: 'rectangle',
      },
      content: {
        text: 'I',
      },
      position: {
        x: 403,
        y: 116,
      },
      dimension: {
        width: 100,
        height: 50,
      },
      style: {
        class: 'main hover secondary',
      },
    },
  ],
  lines: [
    {
      id: '0ce2f365-2bc1-4ad2-a892-a663bfe11878',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'b',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: '7562d676-836f-4f48-8c41-da9b557bde96',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'c',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: '7b8ac190-17aa-4d6b-9f48-9bbfcf761b53',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'd',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: 'be63f089-a08a-4953-8db6-ff100a5a14f1',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'e',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: 'a44bfb64-2bad-4265-9816-1d17d846fc0e',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'f',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: '34d02cdc-52dc-438f-92cd-88b9a6a2d825',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'g',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: 'f8dea9ef-8a82-4cd2-9b67-8a1589cd4e6b',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'h',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
    {
      id: 'c8b776f5-23f3-41c1-ba3b-cf7717c283e3',
      category: {
        type: 'line',
        points: 'elements',
      },
      between: {
        A: {
          elementId: 'a',
        },
        B: {
          elementId: 'i',
        },
      },
      style: {
        class: 'line mobility',
      },
    },
  ],
};
