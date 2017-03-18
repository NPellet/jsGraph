import Graph from '../graph.core'
import Serie from './graph.serie.line'
import Waveform from '../util/waveform'
import Serie3DMixin from '../mixins/graph.mixin.serie3d'
import * as util from '../graph.util'

/**
 * @name SerieLineDefaultOptions
 * @object
 * @static
 * @memberof SerieLine
 */
const defaults = {
  zpos: 0
};

/**
 * Serie line with 3D projection
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends SerieLine
 */
class SerieLine3D extends Serie {

  constructor() {
    super( ...arguments );
  }

  init( graph, name, options ) {
    super.init( graph, name, options );
    this.options = util.extend( true, this.options, defaults, ( options || {} ) ); // Creates options
    return this;

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