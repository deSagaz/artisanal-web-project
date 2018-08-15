/**
 * Run on page load. Starts event listeners.
 */
window.onload = function() {
    let listener = document.getElementById("image-wrapper");

    listener.addEventListener("mouseenter", toggleImage);
    listener.addEventListener("mouseleave", toggleImage);
    listener.addEventListener("wheel", controlScroll);
};

/* MAIN FUNCTIONS */

/**
 * Turns on display of overlay image.
 */
function toggleImage(event) {
    // console.log(event); // DEBUG
    const elem = document.getElementById("image-overlay");

    if (event.type === "mouseenter") {
        elem.classList.add("show");
    } else {
        elem.classList.remove("show");
    }

    const textWrapper = document.getElementById("text-wrapper");
    textWrapper.focus();
}

/**
 * Animated scroll, as passed from existing scroll event in DOM.
 */
let isScrolling = false; // Global variable
let backlog = 0; // Global variable
function controlScroll(event) {
    let scrollDirection = Math.sign(event.deltaY);
    // console.log(delta); // DEBUG

    // Check if already scrolling
    if (isScrolling) {
        if (scrollDirection === Math.sign(backlog)) {
            backlog = clamp(backlog + scrollDirection, -3, 3);
        } else {
            backlog = scrollDirection;
        }
        return;
    }
    isScrolling = true;

    let i = 0;
    let spaceDiff = 100;
    let timeDiff = .05;
    let origScrollTop = document.getElementById('text-wrapper').scrollTop;
    const intervalID = setInterval(() => {
        document.getElementById('text-wrapper').scrollTop =
          origScrollTop + spaceDiff * scrollDirection * EasingFunctions.linear(i);

        // Check if backlog exists (!= 0). If so, adjust loop.
        if (backlog) {
            i = 0;

            // Check if still in same direction.
            // If not, reset values, otherwise increase speed.
            if (scrollDirection !== Math.sign(backlog)) {
                spaceDiff = 100;
                timeDiff = .05;
            } else {
                spaceDiff = spaceDiff + 50;
                timeDiff = .05 * (1 + Math.abs(backlog));
            }

            origScrollTop = document.getElementById('text-wrapper').scrollTop;
            scrollDirection = Math.sign(backlog);
            backlog = backlog - Math.sign(backlog);
        }

        i = i + timeDiff;
        if (i >= 1) { // Current scroll event is over
            clearInterval(intervalID);
            isScrolling = false;
        }
    }, 10);
}

/**
 * Instant scroll, as passed from existing scroll event in DOM.
 * Deprecated by controlScroll().
 */
function controlScrollSimple(event) {
    let delta = event.deltaY;
    // console.log(delta); // DEBUG

    let origScrollTop = document.getElementById('text-wrapper').scrollTop;
    document.getElementById('text-wrapper').scrollTop = origScrollTop + 100 * Math.sign(delta);
}

/* AUXILIARY FUNCTIONS */

/**
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 * Taken from https://gist.github.com/gre/1650294
 */
EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
};

/**
 * Clamps value between min and max
 * Adapted from https://stackoverflow.com/a/11409944
 */
function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}
