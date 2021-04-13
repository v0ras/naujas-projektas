$(document).ready(function () {
  var lineArray = [];
  $("#clearWindow").on("click", function () {
    $(".line").remove();
  });
  $("#removeLast").on("click", function () {
    $(".line:last").remove();
    lineArray.splice(-1, 1);

    $(".taskas").remove();
  });

  for (var i = 1; i < 3; i++) {
    $("<div />")
      .addClass("point")
      .attr("id", i)
      .appendTo("#container")
      .draggable();
  }

  $(".point").on("click", function () {
    var line = $("<div class='line'></div>");
    function createLine(x1, y1, x2, y2, line) {
      var distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      var xMid = (x1 + x2) / 2;
      var yMid = (y1 + y2) / 2;
      var leftPos = xMid - distance / 2;
      // get the salope of the line between two points
      var salopeInRadian = Math.atan2(y1 - y2, x1 - x2);
      var salopeInDegrees = (salopeInRadian * 180) / Math.PI;

      $(line).css({
        width: distance,
        top: yMid + 7.5,
        left: leftPos + 7,
        "-webkit-transform": "rotate(" + salopeInDegrees + "deg)",
        "-moz-transform": "rotate(" + salopeInDegrees + "deg)",
        "-ms-transform": "rotate(" + salopeInDegrees + "deg)",
        "-o-transform": "rotate(" + salopeInDegrees + "deg)",
        transform: "rotate(" + salopeInDegrees + "deg)",
      });
      $("#container").append(line);
    }

    var prev = $("#1");
    var last = $("#2");
    var x1 = prev.css("left");
    var y1 = prev.css("top");
    var x2 = last.css("left");
    var y2 = last.css("top");

    x1 = parseFloat(x1);
    y1 = parseFloat(y1);
    x2 = parseFloat(x2);
    y2 = parseFloat(y2);
    createLine(x1, y1, x2, y2, line);

    var lineCordinates = { x1, y1, x2, y2 };
    lineArray.push(lineCordinates);

    lineIntersect();
    function lineIntersect() {
      for (let i = 0; i < lineArray.length; i++) {
        const line1 = lineCordinates;
        const line2 = lineArray[i];
        console.table(lineArray);
        const x1 = line1.x1;
        const y1 = line1.y1;
        const x2 = line1.x2;
        const y2 = line1.y2;
        const x3 = line2.x1;
        const y3 = line2.y1;
        const x4 = line2.x2;
        const y4 = line2.y2;

        var x =
          ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
          ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        var y =
          ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
          ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        if (isNaN(x) || isNaN(y)) {
          return false;
        } else {
          if (x1 >= x2) {
            if (!(x2 <= x && x <= x1)) {
              return false;
            }
          } else {
            if (!(x1 <= x && x <= x2)) {
              return false;
            }
          }
          if (y1 >= y2) {
            if (!(y2 <= y && y <= y1)) {
              return false;
            }
          } else {
            if (!(y1 <= y && y <= y2)) {
              return false;
            }
          }
          if (x3 >= x4) {
            if (!(x4 <= x && x <= x3)) {
              return false;
            }
          } else {
            if (!(x3 <= x && x <= x4)) {
              return false;
            }
          }
          if (y3 >= y4) {
            if (!(y4 <= y && y <= y3)) {
              return false;
            }
          } else {
            if (!(y3 <= y && y <= y4)) {
              return false;
            }
          }
        }
        $("<div />")
          .addClass("taskas")
          .css({
            left: x,
            top: y,
          })
          .appendTo("#container");
      }
    }
  });
});
