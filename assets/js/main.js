$(document).ready(function () {
  for (var i = 0; i < 2; i++) {
    $("<div />").addClass("point").appendTo("#container").draggable();
  }

  $(".point").on("click", function () {
    var line = $("<div class='line'></div>");
    function createLine(x1, y1, x2, y2, line) {
      //   the distance between the two points(for the line div width)
      var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      // the mid-point between the two points,we use it as rotation center
      var xMid = (x1 + x2) / 2;
      var yMid = (y1 + y2) / 2;
      var leftPos = xMid - distance / 2;
      // get the salope of the line between two points
      var salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
      var salopeInDegrees = (salopeInRadian * 180) / Math.PI;

      // change the css of the line

      $(line).css({
        width: distance,
        top: yMid + 7.5,
        left: leftPos + 7.5,
        "-webkit-transform": "rotate(" + salopeInDegrees + "deg)",
        "-moz-transform": "rotate(" + salopeInDegrees + "deg)",
        "-ms-transform": "rotate(" + salopeInDegrees + "deg)",
        "-o-transform": "rotate(" + salopeInDegrees + "deg)",
        transform: "rotate(" + salopeInDegrees + "deg)",
      });
      $(line).appendTo("#container").draggable();
    }

    var prev = $(".point").prev();
    var last = $(".point:last");
    var x1 = last.getPos().left;
    var y1 = last.getPos().top;
    var x2 = prev.getPos().left;
    var y2 = prev.getPos().top;

    createLine(x1, y1, x2, y2, line);
   
  });

  jQuery.fn.getPos = function () {
    var o = this[0];
    var left = 0,
      top = 0,
      parentNode = null,
      offsetParent = null;
    offsetParent = o.offsetParent;
    var original = o;
    var el = o;
    while (el.parentNode != null) {
      el = el.parentNode;
      if (el.offsetParent != null) {
        var considerScroll = true;
        if (window.opera) {
          if (el == original.parentNode || el.nodeName == "TR") {
            considerScroll = false;
          }
        }
        if (considerScroll) {
          if (el.scrollTop && el.scrollTop > 0) {
            top -= el.scrollTop;
          }
          if (el.scrollLeft && el.scrollLeft > 0) {
            left -= el.scrollLeft;
          }
        }
      }
      if (el == offsetParent) {
        left += o.offsetLeft;
        if (el.clientLeft && el.nodeName != "TABLE") {
          left += el.clientLeft;
        }
        top += o.offsetTop;
        if (el.clientTop && el.nodeName != "TABLE") {
          top += el.clientTop;
        }
        o = el;
        if (o.offsetParent == null) {
          if (o.offsetLeft) {
            left += o.offsetLeft;
          }
          if (o.offsetTop) {
            top += o.offsetTop;
          }
        }
        offsetParent = o.offsetParent;
      }
    }
    return {
      left: left,
      top: top,
    };
  };
});
