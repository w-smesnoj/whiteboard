let factor = 1;
let panzoomInstance;
window.addEventListener('DOMContentLoaded', (event) => {
  // just grab a DOM element
  var element = document.querySelector('#board');

  // And pass it to panzoom
  panzoomInstance = panzoom(element, {
    maxZoom: 1.5,
    minZoom: 0.5,
    // smoothScroll: false,
    zoomDoubleClickSpeed: 1,
    // bounds: true,
    // boundsPadding: 0.1,
    beforeWheel: function (e) {
      // allow wheel-zoom only if altKey is down. Otherwise - ignore
      // var shouldIgnore = !e.altKey;
      var shouldIgnore = !e.altKey;
      return shouldIgnore;
    },
    beforeMouseDown: function (e) {
      e.preventDefault();
      // allow mouse-down panning only if altKey is down. Otherwise - ignore
      var shouldIgnore = !(e.which == 2);
      return shouldIgnore;
    },
  });
  factor = panzoomInstance.getTransform().scale;
});
