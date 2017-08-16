'use strict'

class FitHost {

  constructor( options ) {

    this.DELTAP = 1e-6;
    this.BIGVAL = 9e99;
    this.WEIGHT = 1.0;
    console.log( options );
    this.setYData( options.dataY );
    this.setXData( options.dataX );
    this.setWeight( options.weight );
    this.setInitialParams( options.params );

    if ( options.subsetIndex ) {
      this.setSubset( ...options.subsetIndex );
    }

    this.setFunction( options.function );

    if ( options.progress ) {
      this.hookIteration( options.progress );
    }

    this.options = options;
  }

  //[ [ x1, y1 ], [ x2, y2 ] ]
  setYData( data ) { // Waveform instance
    this.data = data;
  }

  setXData( data ) { // Waveform instance
    this.dataX = data;
  }

  setWeight( weight ) { // Waveform instance
    this.weight = weight;
  }

  setInitialParams( params ) {
    this.parms = params;

    this.parms = this.parms.map( ( el ) => {
      if ( typeof el == 'function' ) {
        return el( this.data, this.dataX )
      } else {
        return el;
      }
    } );
    this.NPARMS = params.length;
  }

  setSubset( fromIndex, toIndex ) {
    if ( fromIndex !== undefined && toIndex !== undefined ) {
      this._from = fromIndex;
      this._to = toIndex;
    }
  }

  hookIteration( f ) {
    this._hookIteration = ( params ) => {
      let data = this.buildFit( params, 200 );
      f( data );
    }
  }

  setFunction( func ) {
    this._func = func;
  }

  init() {

    // Get data length
    if ( this._from !== undefined && this._to !== undefined ) {

      if ( this._from >= this._to ) {
        throw "Impossible to fit negative subranges. The starting index must be lower than the ending index";
      }

      this.NPTS = this._to - this._from + 1;

      if ( this.data && this.data.getLength() <= this._to ) {
        throw "Wave Y has not enough point to be fitted to subrange [" + this._from + ", " + this._to + "]";
      }

      if ( this._from < 0 ) {
        throw "Impossible to fit a subrange with negative indices";
      }

    } else {

      this.NPTS = this.data.getLength();
      this._from = 0;
      this._to = this.data.getLength() - 1;
    }

    if ( this.dataX && this.dataX.getLength() <= this._to ) {
      throw "Wave X has not enough point to be fitted to subrange [" + this._from + ", " + this._to + "]";
    }

    this.arrY = this.data.getDataY();

    if ( this.dataX ) {
      this.arrX = this.dataX.getDataY();
    } else {
      this.arrX = this.data.getDataX();
    }

    this.resid = new Array( this.NPTS ).fill( 0 );
    this.jac = new Array( this.NPTS ).fill( 0 );
    this.jac = this.jac.map( ( el ) => new Array( this.NPARMS ) );
  }

  fit() {

    this.log( "Starting the fit with initial parameter list {" + this.parms.join() + "};" );
    new LM( this, this.NPARMS, this.NPTS, this._hookIteration );
    this.log( "Fit successful. Output parameters {" + this.parms.join() + "};" );

    this._result = this.buildFit( this.parms, 200 );

    if ( this.options.done ) {
      this.options.done( this.parms, this._result );
    }

    return this._result;
  }

  func( x, param ) {
    return this._func( x, param );
  }

  computeResiduals() {
    var sumsq = 0;
    for ( var i = 0; i < this.NPTS; i++ ) {
      this.resid[ i ] = ( this.func( this.arrX[ i + this._from ], this.parms ) - this.arrY[ i + this._from ] ) * ( this.WEIGHT );
      sumsq += this.resid[ i ] * this.resid[ i ];
    }

    return sumsq;
  }

  log( message ) {
    console.log( message );
  }

  //------the four mandated interface methods------------
  nudge( dp ) {

    for ( var j = 0; j < this.NPARMS; j++ ) {
      this.parms[ j ] += dp[ j ];
    }
    return this.computeResiduals();
  }

  buildJacobian() {
    // Allows LM to compute a new Jacobian.
    // Uses current parms[] and two-sided finite difference.
    // If current parms[] is bad, returns false.
    var delta = new Array( this.NPARMS );
    var FACTOR = 0.5 / this.DELTAP;
    var d = 0;

    for ( var j = 0; j < this.NPARMS; j++ ) {
      for ( var k = 0; k < this.NPARMS; k++ )
        delta[ k ] = ( k == j ) ? this.DELTAP : 0.0;

      d = this.nudge( delta ); // resid at pplus
      if ( d == this.BIGVAL ) {
        throw "Bad dBuildJacobian() exit 2";
      }

      for ( var i = 0; i < this.NPTS; i++ ) {
        this.jac[ i ][ j ] = this.getResidualElement( i );
      }

      for ( var k = 0; k < this.NPARMS; k++ ) {
        delta[ k ] = ( k == j ) ? -2 * this.DELTAP : 0.0;
      }

      d = this.nudge( delta ); // resid at pminus
      if ( d == this.BIGVAL ) {
        throw "Bad dBuildJacobian(). exit 3";
      }

      for ( var i = 0; i < this.NPTS; i++ )
        this.jac[ i ][ j ] -= this.getResidualElement( i ); // fetches resid[]

      for ( var i = 0; i < this.NPTS; i++ )
        this.jac[ i ][ j ] *= FACTOR;

      for ( var k = 0; k < this.NPARMS; k++ )
        delta[ k ] = ( k == j ) ? this.DELTAP : 0.0;

      d = this.nudge( delta );
      if ( d == this.BIGVAL ) {
        throw "Bad dBuildJacobian(). exit 4";
      }
    }
    return true;
  }

  getResidualElement( i ) {
    // Allows LM to see one element of the resid[] vector.
    return this.resid[ i ];
  }

  getJacobianElement( i, j ) {
    // Allows LM to see one element of the Jacobian matrix.
    return this.jac[ i ][ j ];
  }

  buildFit( parms, length ) {
    let x;

    if ( !length ) {
      x = this.arrX;
    } else {

      const xmin = ( this.dataX ).getMin( this._from, this._to );
      const xmax = ( this.dataX ).getMax( this._from, this._to );

      x = new Array( length ).fill( 0 ).map( ( el, index ) => index * ( xmax - xmin ) / ( length - 1 ) + xmin );
    }

    var fit = new Array( x.length );
    for ( var i = 0, l = x.length; i < l; i++ ) {
      fit[ i ] = this.func( x[ i ], this.parms );
    }

    let waveformResult = this.options.waveform;
    waveformResult.setData( fit, x );
    //waveformResult.setXWaveform( x );

    return waveformResult;
  }
}

class LM {

  constructor( gH, gnadj, gnpnts, hook ) {

    this.LMITER = 100; // max number of L-M iterations
    this.LMBOOST = 2.0; // damping increase per failed step
    this.LMSHRINK = 0.10; // damping decrease per successful step
    this.LAMBDAZERO = 0.001; // initial damping
    this.LAMBDAMAX = 1E9; // max damping
    this.LMTOL = 1E-12; // exit tolerance
    this.BIGVAL = 9e99; // trouble flag

    this.sos;
    this.sosprev;
    this.lambda;

    this.myH = null; // overwritten by constructor
    this.nadj = 0; // overwritten by constructor
    this.npts = 0; // overwritten by constructor

    this.delta; // local parm change
    this.beta;
    this.alpha;
    this.amatrix;

    // Constructor sets up fields and drives iterations.
    this.myH = gH;
    this.nadj = gnadj;
    this.npts = gnpnts;

    this.delta = new Array( this.nadj ).fill( 0 );
    this.beta = new Array( this.nadj ).fill( 0 );

    this.alpha = new Array( this.nadj ).fill( 0 );
    this.amatrix = new Array( this.nadj ).fill( 0 );

    this.alpha = this.alpha.map( () => new Array( this.nadj ) );
    this.amatrix = this.amatrix.map( () => new Array( this.nadj ) );

    this.lambda = this.LAMBDAZERO;

    var niter = 0;
    var done = false;
    do {
      done = this.bLMiter();

      if ( hook ) {
        hook( this.myH.params );
      }

      niter++;
    }
    while ( !done && ( niter < this.LMITER ) );
  }

  bLMiter() {
    // Each call performs one LM iteration.
    // Returns true if done with iterations; false=wants more.
    // Global nadj, npts; needs nadj, myH to be preset.
    // Ref: M.Lampton, Computers in Physics v.11 pp.110-115 1997.
    for ( var k = 0; k < this.nadj; k++ )
      this.delta[ k ] = 0.0;
    this.sos = this.myH.nudge( this.delta );
    if ( this.sos == this.BIGVAL ) {
      console.error( "  bLMiter finds faulty initial nudge()" );
      return false;
    }
    this.sosprev = this.sos;

    console.log( "  bLMiter..SumOfSquares= " + this.sos );
    if ( !this.myH.buildJacobian() ) {
      console.error( "  bLMiter finds buildJacobian()=false" );
      return false;
    }

    for ( var k = 0; k < this.nadj; k++ ) // get downhill gradient beta
    {
      this.beta[ k ] = 0.0;
      for ( var i = 0; i < this.npts; i++ ) {
        this.beta[ k ] -= this.myH.getResidualElement( i ) * this.myH.getJacobianElement( i, k );
      }
    }

    for ( var k = 0; k < this.nadj; k++ ) // get curvature matrix alpha
      for ( var j = 0; j < this.nadj; j++ ) {
        this.alpha[ j ][ k ] = 0.0;
        for ( var i = 0; i < this.npts; i++ ) {
          this.alpha[ j ][ k ] += this.myH.getJacobianElement( i, j ) * this.myH.getJacobianElement( i, k );
        }
      }
    var rrise = 0;
    do // inner damping loop searches for one downhill step
    {
      for ( var k = 0; k < this.nadj; k++ ) { // copy and damp it
        for ( var j = 0; j < this.nadj; j++ ) {
          this.amatrix[ j ][ k ] = this.alpha[ j ][ k ] + ( ( j == k ) ? this.lambda : 0.0 );
        }
      }

      this.gaussj( this.amatrix, this.nadj ); // invert

      for ( var k = 0; k < this.nadj; k++ ) // compute delta[]
      {
        this.delta[ k ] = 0.0;
        for ( var j = 0; j < this.nadj; j++ )
          this.delta[ k ] += this.amatrix[ j ][ k ] * this.beta[ j ];
      }
      this.sos = this.myH.nudge( this.delta ); // try it out.
      if ( this.sos == this.BIGVAL ) {
        console.error( "  LMinner failed SOS step" );
        return false;
      }
      rrise = ( this.sos - this.sosprev ) / ( 1 + this.sos );
      if ( rrise <= 0.0 ) // good step!
      {
        this.lambda *= this.LMSHRINK; // shrink lambda
        break; // leave lmInner.
      }
      for ( var q = 0; q < this.nadj; q++ ) { // reverse course!
        this.delta[ q ] *= -1.0;
      }
      this.myH.nudge( this.delta ); // sosprev should still be OK
      if ( rrise < this.LMTOL ) { // finished but keep prev parms
        break; // leave inner loop
      }
      this.lambda *= this.LMBOOST; // else try more damping.
    } while ( this.lambda < this.LAMBDAMAX );
    return ( rrise > -this.LMTOL ) || ( this.lambda > this.LAMBDAMAX );
  }

  gaussj( a, N ) {
    // Inverts the double array a[N][N] by Gauss-Jordan method
    // M.Lampton UCB SSL (c)2003, 2005

    var det = 1.0,
      big, save;
    var i, j, k, L;
    var ik = new Array( 100 );
    var jk = new Array( 100 );

    for ( k = 0; k < N; k++ ) {
      big = 0.0;
      for ( i = k; i < N; i++ )
        for ( j = k; j < N; j++ ) // find biggest element
          if ( Math.abs( big ) <= Math.abs( a[ i ][ j ] ) ) {
            big = a[ i ][ j ];
            ik[ k ] = i;
            jk[ k ] = j;
          }
      if ( big == 0.0 ) return 0.0;
      i = ik[ k ];
      if ( i > k )
        for ( j = 0; j < N; j++ ) // exchange rows
      {
        save = a[ k ][ j ];
        a[ k ][ j ] = a[ i ][ j ];
        a[ i ][ j ] = -save;
      }
      j = jk[ k ];
      if ( j > k )
        for ( i = 0; i < N; i++ ) {
          save = a[ i ][ k ];
          a[ i ][ k ] = a[ i ][ j ];
          a[ i ][ j ] = -save;
        }
      for ( i = 0; i < N; i++ ) // build the inverse
        if ( i != k )
          a[ i ][ k ] = -a[ i ][ k ] / big;
      for ( i = 0; i < N; i++ )
        for ( j = 0; j < N; j++ )
          if ( ( i != k ) && ( j != k ) )
            a[ i ][ j ] += a[ i ][ k ] * a[ k ][ j ];
      for ( j = 0; j < N; j++ )
        if ( j != k )
          a[ k ][ j ] /= big;
      a[ k ][ k ] = 1.0 / big;
      det *= big; // bomb point
    } // end k loop
    for ( L = 0; L < N; L++ ) {
      k = N - L - 1;
      j = ik[ k ];
      if ( j > k )
        for ( i = 0; i < N; i++ ) {
          save = a[ i ][ k ];
          a[ i ][ k ] = -a[ i ][ j ];
          a[ i ][ j ] = save;
        }
      i = jk[ k ];
      if ( i > k )
        for ( j = 0; j < N; j++ ) {
          save = a[ k ][ j ];
          a[ k ][ j ] = -a[ i ][ j ];
          a[ i ][ j ] = save;
        }
    }
    return det;
  }
}

export default FitHost