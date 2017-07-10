var Serie3DMixin = {

  /**
   * Returns the x position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The x position in px corresponding to the x value
   */
  getX: function( val ) {
    return ( ( val = this.getXAxis().getPx( val ) ) - val % 0.2 ) + this.getXAxis().getZProj( this.options.zpos );
  },

  /**
   * Returns the y position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie3DMixin
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The y position in px corresponding to the y value
   */
  getY: function( val ) {
    return ( ( val = this.getYAxis().getPx( val ) ) - val % 0.2 ) + this.getYAxis().getZProj( this.options.zpos );
  },

  getZPos: function() {
    return this.options.zpos;
  },

  /**
   * @returns {Number} Lowest x value of the serie's data
   * @memberof Serie
   */
  getMinX: function( useZValues ) {
    if ( !useZValues ) {
      return this.minX;
    }

    return getZCorrectedValue( this, true, true );
  },

  /**
   * @returns {Number} Highest x value of the serie's data
   * @memberof Serie
   */
  getMaxX: function( useZValues ) {

    if ( !useZValues ) {
      return this.maxX;
    }
    return getZCorrectedValue( this, true, false );
  },

  /**
   * @returns {Number} Lowest y value of the serie's data
   * @memberof Serie
   */
  getMinY: function( useZValues ) {

    if ( !useZValues ) {
      return this.minY;
    }
    return getZCorrectedValue( this, false, true );
  },

  /**
   * @returns {Number} Highest y value of the serie's data
   * @memberof Serie
   */
  getMaxY: function( useZValues ) {

    if ( !useZValues ) {
      return this.maxY;
    }
    return getZCorrectedValue( this, false, false );
  }

};

function getZCorrectedValue( serie, x, min ) {

  let i, l, data, val, valFinal;
  let wf = serie.getWaveforms();

  for ( let wave of wf ) {

    i = 0;
    l = wave.getLength();
    data = wave.getData();

    for ( ; i < l; i += 1 ) {

      if ( x ) {
        val = serie.getXAxis().getVal( serie.getX( wave.getX( i, true ) ) );
      } else {
        val = serie.getYAxis().getVal( serie.getY( data[ i ] ) );
      }

      if ( i == 0 ) {
        valFinal = val;
      } else {

        if ( min ) {
          valFinal = Math.min( valFinal, val );
        } else {
          valFinal = Math.max( valFinal, val );
        }
      }
    }
  }
  return valFinal;
}

export default Serie3DMixin;