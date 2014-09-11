define( [ './graph.shape' ], function( GraphShape ) {

  var Zoom2DShape = function( graph, options ) {

    this.init( graph );
    this.options = options ||  {};
    this.series = [];
  }


  $.extend( Zoom2DShape.prototype, GraphShape.prototype, {

    createDom: function() {
      this._dom = document.createElementNS( this.graph.ns, 'g' );

      var rect = document.createElementNS( this.graph.ns, 'rect');
      rect.setAttribute('rx', 3 );
      rect.setAttribute('ry', 3 );

      rect.setAttribute('height', 200 );
      rect.setAttribute('width', 6 );
      rect.setAttribute('fill', 'rgb(150, 140, 180)' );
      rect.setAttribute('stroke', 'rgb( 40, 40, 40 )' );
      rect.setAttribute('stroke-width', '1px' );
      rect.setAttribute('x', 0 );
      rect.setAttribute('y', 0 );

      this._dom.appendChild( rect );

      var handlePos = document.createElementNS( this.graph.ns, 'rect');
      
      handlePos.setAttribute('height', 5 );
      handlePos.setAttribute('width', 12 );
      handlePos.setAttribute('fill', 'rgb(190, 180, 220)' );
      handlePos.setAttribute('stroke', 'rgb( 40, 40, 40 )' );
      handlePos.setAttribute('stroke-width', '1px' );
      handlePos.setAttribute('x', -3 );
      handlePos.setAttribute('y', 0 );
      handlePos.setAttribute('class', 'positive');
      handlePos.setAttribute('cursor', 'pointer' );


      var handleNeg = document.createElementNS( this.graph.ns, 'rect');
      
      handleNeg.setAttribute('height', 5 );
      handleNeg.setAttribute('width', 12 );
      handleNeg.setAttribute('fill', 'rgb(190, 180, 220)' );
      handleNeg.setAttribute('stroke', 'rgb( 40, 40, 40 )' );
      handleNeg.setAttribute('stroke-width', '1px' );
      handleNeg.setAttribute('x', -3 );
      handleNeg.setAttribute('y', 0 );
      handleNeg.setAttribute('class', 'negative');
      handleNeg.setAttribute('cursor', 'pointer' );

      this._dom.appendChild( handlePos );
      this._dom.appendChild( handleNeg );

      this.handlePos = handlePos;
      this.handleNeg = handleNeg;
    },

    setPosition: function() {
      var position = this._getPosition( this.getFromData( 'pos' ) );

      if ( !position || !position.x || !position.y ) {
        return;
      }

      this.setDom( 'transform', 'translate(' + position.x +', ' + position.y + ')' );
      return true;
    },

    setHandleNeg: function( value, max ) {

      this.handleNeg.setAttribute( 'y', ( value ) * 95 + 105 )
    },

    setHandlePos: function( value, max ) {

      this.handlePos.setAttribute( 'y', ( 1- value  ) * 95 )
    },

    redrawImpl: function() {
      this.setPosition();
    },

    handleCreateImpl: function() {

      this.resize = true;
      this.handleSelected = 2;

    },

    handleMouseDownImpl: function( e ) {

      this.selected = e.target.getAttribute('class') == 'positive' ? 'positive' : ( e.target.getAttribute('class') == 'negative'  ? 'negative' : false );
      return true;
    },

    handleMouseUpImpl: function() {

      this.selected = false;
      this.triggerChange();
      return true;
    },

    addSerie: function( serie ) {
      this.series.push( serie );
    },

    handleMouseMoveImpl: function( e ) {

      
      var o = $(this._dom).offset();
      var cY = e.pageY - o.top;
//console.log( this.selected );
      if( this.selected == "negative" ) {

        if( cY > 200 ) {
          cY = 200;
        } else if( cY < 105) {
         cY = 105;
        } 

        //this.handleNeg.setAttribute('y', cY);
        //console.log( cY);
        cY = - ( cY - 105 ) / 95; 
        
      }


      if( this.selected == "positive" ) {

        if( cY < 0 ) {
          cY = 0;
        } else if( cY > 95) {
          cY = 95;
        }

       // this.handlePos.setAttribute('y', cY);  
        cY = ( 95 - cY ) / 95;
      }

      this.series.map( function ( s ) {
        s.onMouseWheel( false, false, cY );
      });

      
    },

    selectStyle: function() {
      this.setDom( 'stroke', 'red' );
      this.setDom( 'stroke-width', '2' );
    },

    hideHandleNeg: function() {
      this.handleNeg.setAttribute('display', 'none');
    },

    showHandleNeg: function() {
            this.handleNeg.setAttribute('display', 'block');
    },

    setHandles: function() {}

  } );

  return Zoom2DShape;

} );