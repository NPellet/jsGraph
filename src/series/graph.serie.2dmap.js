define( [ '../graph._serie' ], function( GraphSerieNonInstanciable ) {

  "use strict";

  var GraphSerie = function() {}
  $.extend( GraphSerie.prototype, GraphSerieNonInstanciable.prototype, {

    defaults: {
      
    },

    init: function( graph, name, options ) {

      var self = this;

      this.graph = graph;
      this.name = name;
      this.id = this.graph.uniqueId();

      this.options = $.extend( true, {}, GraphSerie.prototype.defaults, options ); // Creates options
      this.graph.mapEventEmission( this.options, this ); // Register events

      this.canvas = document.createElement("canvas"); 
      
    },

    redraw: function() {




    }



function getColorFromValue(value) {

    var minValue = min;
    var maxValue = max;
    if (!highContrast) {
        minValue = 0;
        maxValue = 1;
    }
    var ratio = 1 / (maxValue - minValue);
    var diff = maxValue - minValue;
    var segNb = colors.length - 1;
    var step = diff / segNb;
    var color1Id = Math.round(segNb * (value - minValue) / diff);
    color1Id = Math.min(Math.max(0, color1Id), colors.length - 2);

    return getColorBetween(value, colors[color1Id], colors[color1Id + 1], color1Id * step + minValue, (color1Id + 1) * step + minValue);
}


function getColorBetween(value, color1, color2, color1Val, color2Val) {

    /*var color1 = getRGB(color1);
     var color2 = getRGB(color2);
     */
    // Between 0 and 1
    var ratio = (value - color1Val) / (color2Val - color1Val);

    return [parseInt(ratio * (color2[0] - color1[0]) + color1[0]), parseInt(ratio * (color2[1] - color1[1]) + color1[1]), parseInt(ratio * (color2[2] - color1[2]) + color1[2]), parseInt(ratio * (color2[3] - color1[3]) + color1[3])];
//  return [parseInt(ratio * Math.abs(color2[0] - color1[0]) + Math.min(color2[0], color1[0])), parseInt(ratio * Math.abs(color2[1] - color1[1]) + Math.min(color2[1], color1[1])), parseInt(ratio * Math.abs(color2[2] - color1[2]) + Math.min(color2[2], color1[2]))];
}


function getRGB(color) {

    if (!color)
        return false;
    if (color.length == 7) {
        return [parseInt('0x' + color.substring(1, 3)),
            parseInt('0x' + color.substring(3, 5)),
            parseInt('0x' + color.substring(5, 7))];
    } else if (color.length == 4) {
        return [parseInt('0x' + color.substring(1, 2)),
            parseInt('0x' + color.substring(2, 3)),
            parseInt('0x' + color.substring(3, 4))];
    }
}


  prepare: function() {

    var startXPx = this.getXAxis().getMinPx();
    var endXPx = this.getXAxis().getMaxPx();
    var startYPx = this.getYAxis().getMinPx();
    var endYPx = this.getYAxis().getMaxPx();

    var startX = this.getXAxis().getDataMin();
    var endX = this.getXAxis().getDataMax();
    var startY = this.getYAxis().getDataMin();
    var endY = this.getYAxis().getDataMax();

    this.pointPerPx = {};
    this.pointPerPx.x = ( endX - startX ) / ( endXPx - startXPx );
    this.pointPerPx.y = ( endY - startY ) / ( endYPx - startYPx );


  },


  getValFromPx: function( x, y ) {

    var x = this.getIndexFromPx( x, 'x' );
  },

  getIndexFromPx: function( px, type ) {
    return px * this.pointPerPx[ type ] + this.indexOffset[ type ]
  }


  generate: function( startX, endX, startY, endY ) { // in val

    var startXPx = this.getXAxis().getMinPx();
    var endXPx = this.getXAxis().getMaxPx();

    var startYPx = this.getYAxis().getMinPx();
    var endYPx = this.getYAxis().getMaxPx();


    var x = startXPx, y = startYPx;

    for (; x < endXPx; x++) {
        y = startY;
        for (; y < endYPx; y++) {

          this.getValFromPx( x, y );

            if (typeof data[y] === "undefined" || typeof data[y][x] === "undefined") {
                //  throw "Errrrror !!!";
                continue;
            } else {
                var val = data[y][x];
                if (val.value)
                    val = val.value;
            }


            var color = getColorFromValue(val);
            drawCell(val, x - startX, y - startY, color, bufferData, nbValX);
        }
    }

    return buffer;
}

function drawCell(value, startX, startY, color, bufferData, nbValX) {

    var squareWidth = nbValX * pxPerCell;


    var i = 0, j = 0, pixelNum;
    while (j < pxPerCell) {
        while (i < pxPerCell) {
            count++;
            pixelNum = 4 * (startX * pxPerCell + i + (startY * pxPerCell + j) * squareWidth);
            bufferData[pixelNum + 0] = color[0]; // Red value
            bufferData[pixelNum + 1] = color[1]; // Green value
            bufferData[pixelNum + 2] = color[2]; // Blue value
            bufferData[pixelNum + 3] = 255; // Alpha value
            i++;
        }
        i = 0;
        j++;
    }
    j = 0;
}






  });
  return GraphSerie;
} );