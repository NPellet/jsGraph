import Serie3DMixin from '../mixins/graph.mixin.serie3d.js';
import * as util from '../graph.util.js';

import Serie from './graph.serie.line.js';

/**
 * Serie line with 3D projection
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends SerieLine
 */
class SerieLine3D extends Serie {

  static defaults() {
    return {
      zpos: 0
    };
  }
  constructor( graph, name, options ) {
    super( ...arguments );

  }

  /**
   * Sets the z-position
   * @memberof SerieLine3D
   * @param {Number} zPos - The position in the z axis
   */
  setZPos( zPos ) {
    this.options.zpos = zPos;
    return this;
  }

  setz() {
    return this.setZPos( ...arguments );
  }
}

util.mix( SerieLine3D, Serie3DMixin );
export default SerieLine3D;