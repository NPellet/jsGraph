/*!
 * jsGraph JavaScript Graphing Library v@VERSION
 * http://github.com/NPellet/jsGraph
 *
 * Copyright 2014 Norman Pellet
 * Released under the MIT license
 *
 * Date: @DATE
 */

(function( root, factory ) {

  if ( typeof define === 'function' && define.amd ) {
    define( function( ) {
      return factory( );
    } );
  } else if ( typeof module === 'object' && typeof module.exports === 'object' ) {
    module.exports = factory( );
  } else {
    root.Graph = factory( );
  }

}( ( typeof window !== 'undefined' ? window : this ) , function( ) {

  'use strict';

  var Graph = function( ) {

    var build = [ ];
