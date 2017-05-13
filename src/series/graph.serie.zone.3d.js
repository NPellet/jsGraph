import Graph from '../graph.core'
import Serie from './graph.serie.zone'
import Waveform from '../util/waveform'
import Serie3DMixin from '../mixins/graph.mixin.serie3d'
import * as util from '../graph.util'

/**
 * Serie line with 3D projection
 * @example graph.newSerie( name, options, "line" );
 * @see Graph#newSerie
 * @extends SerieLine
 */
class SerieZone3D extends Serie {

  static
  default () {
    return {
      zpos: 0
    };
  }
  constructor( graph, name, options ) {
    super( ...arguments );
    this.options = util.extend( true, this.options, defaults, ( options || {} ) ); // Creates options
  }

  /**
   * Sets the z-position
   * @memberof SerieZone3D
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

util.mix( SerieZone3D, Serie3DMixin );
export default SerieZone3D;