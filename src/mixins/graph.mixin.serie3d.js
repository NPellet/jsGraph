var Serie3DMixin = {

  /**
   * Returns the x position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The x position in px corresponding to the x value
   */
  getX( val ) {
    return ( ( val = this.getXAxis().getPx( val ) ) - val % 0.2 ) + this.options.zpos * 1;
  },

  /**
   * Returns the y position of a certain value in pixels position, based on the serie's axis
   * @memberof Serie3DMixin
   * @param {Number} val - Value to convert to pixels position
   * @returns {Number} The y position in px corresponding to the y value
   */
  getY( val ) {
    return ( ( val = this.getYAxis().getPx( val ) ) - val % 0.2 ) + this.options.zpos * 1.2;
  }

};

export default Serie3DMixin;