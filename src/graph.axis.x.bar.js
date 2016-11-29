import AxisX from './graph.axis.x'

/** 
 * Generic constructor of a y axis
 * @class AxisXBar
 * @augments Axis
 */
class AxisXBar extends AxisX {

  constructor( graph, topbottom, options = {} ) {
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

    // this.drawInit();

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
   * Sets the series automatically
   * @returns {AxisBar} The current axis instance
   */
  autoSeries() {

    let series = [];
    for ( let serie of this.graph.series ) {
      if ( serie.getXAxis() == this ) {
        series.push( serie );
      }
    }

    this.setSeries( ...series );
    return this;
  }

  /**
   * Sets the series that should belong to the axis
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

      if ( serie.setCategoryConfig ) {
        serie.setCategoryConfig( index, self._barCategories, self.series.length );
      }
    } );

    this._getUsedCategories();

    return this;
  }

  _getUsedCategories() {

    let categories = {},
      total = 0;

    Array.prototype.map.call( this.series, ( serie ) => {
      let usedCategories = serie.getUsedCategories();
      for ( let cat of usedCategories ) {

        if ( !categories.hasOwnProperty( cat ) ) {
          categories[ cat ] = 1;
          total += 1;
        }

        categories[ cat ]++;
        total++;
      }
    } );

    let accumulator = 0;
    for ( let i in categories ) {
      let temp = categories[ i ];
      categories[ i ] = accumulator;
      accumulator += temp;
    }

    let dispatchedCategories = {};

    let i = 0;
    Array.prototype.map.call( this.series, ( serie ) => {

      let scategories = serie.getUsedCategories(),
        indices = {};

      scategories.map( ( cat ) => {

        dispatchedCategories[ cat ] = dispatchedCategories[ cat ] || 0.5;
        indices[ cat ] = ( categories[ cat ] + dispatchedCategories[ cat ] ) / total;
        dispatchedCategories[ cat ]++;
      } );

      serie.setDataIndices( indices, total );
      i++;
    } );

  }

  getType() {
    return 'category';
  }
}

export default AxisXBar;