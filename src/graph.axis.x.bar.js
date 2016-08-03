import AxisX from './graph.axis.x'

  /** 
   * Generic constructor of a y axis
   * @class AxisXBar
   * @augments Axis
   */
  class AxisXBar extends AxisX {

    constructor( graph, topbottom, options ) {
      super( graph, topbottom, options );
    }

    /**
     * @param {Object[]} categories - Categories array
     * @param {(String|Number)} categories[].title - The title of the category (to be dispalyed)
     * @param {(String|Number)} categories[].name - The name of the category (to indentify series)
     * @returns {AxisBar} The current axis instance
     */
    set categories( categories ) {
      this._barCategories = categories;
      return this;
    }

    draw() {

      var self = this,
        tickLabel,
        width = this.graph.drawingSpaceWidth,
        elements = this._barCategories;

      this.forceMin( 0 );
      this.forceMax( 1 );

      this.cacheCurrentMin();
      this.cacheCurrentMax();
      this.cacheInterval();

      if ( !elements ) {
        return;
      }

      if ( !Array.isArray( elements ) ) {
        elements = [ elements ];
      }

      this.drawInit();

      //var widthPerElement = width / elements.length;
      for ( var i = 0; i <= elements.length; i++ ) {
        this.drawTick( i / elements.length, 2 );

        if ( i < elements.length ) {
          tickLabel = this.nextTickLabel( function( tickLabel ) {

            tickLabel.setAttribute( 'y', ( self.top ? -1 : 1 ) * ( ( self.options.tickPosition == 1 ? 8 : 20 ) + ( self.top ? 10 : 0 ) ) );
            tickLabel.setAttribute( 'text-anchor', 'middle' );
            if ( self.getTicksLabelColor() !== 'black' ) {
              tickLabel.setAttribute( 'fill', self.getTicksLabelColor() );
            }
            tickLabel.style.dominantBaseline = 'hanging';

          } );

          tickLabel.setAttribute( 'x', this.getPos( ( i + 0.5 ) / elements.length ) );
          tickLabel.textContent = elements[ i ].title;
        }

      }

      this.drawSpecifics();
      return this;
    }


    /**
     * @param {...(Series|Number|String)} series - List of series identified either by their instance, or their index (string or number)
     * @returns {AxisBar} The current axis instance
     */
    setSeries() {

      var self = this;
      this.series = arguments;

      Array.prototype.map.call( this.series, function( serie, index ) {

        if ( !( typeof serie == "object" ) ) {
          serie = self.graph.getSerie( serie );
        }

        if ( serie.setBarConfig ) {
          serie.setBarConfig( index, self._barCategories, self.series.length );
        }
      } );

      return this;
    }
  }

export default AxisXBar;