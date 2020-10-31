const setMarkerStyle = ( serie, style, styleName ) => {
  serie.showMarkers();
  let _default = {};
  let modifiers = [];

  if ( style.default ) {
    _default = style.default;
    if ( style.modifiers ) {
      modifiers = style.modifiers;
    }
  } else {
    _default = style;
    modifiers = [];
  }

  serie.setMarkerStyle( _default, modifiers, styleName );
};

const setSerieStyle = ( Graph, serie, jsonSerie, type ) => {
  let styles = jsonSerie.style;

  if ( !Array.isArray( styles ) ) {
    styles = [ {
      name: 'unselected',
      style: styles
    } ];
  }
  styles.map( ( {
    name,
    style
  }, index ) => {
    if ( style.line && ( type == Graph.SERIE_LINE || type == Graph.SERIE_BAR || type == Graph.SERIE_LINE_COLORED ) ) {
      if ( style.line.color && type != Graph.SERIE_LINE_COLORED ) {
        serie.setLineColor( style.line.color, name );
      }

      if ( style.line.width ) {
        serie.setLineWidth( style.line.width, name );
      }

      if ( style.line.dash || style.line.style ) {
        serie.setLineStyle( style.line.dash || style.line.style, name );
      }

      if ( style.line.fill ) {
        serie.setFillColor( style.line.fill, name );
      }

      if ( style.line.fillOpacity && serie.setFillOpacity ) {
        serie.setFillOpacity( style.line.fillOpacity, name );
      }
    }
    if ( style.errorBar ) {
      serie.setErrorBarStyle( style.errorBar );
    }

    if ( style.errorBox ) {
      serie.setErrorBoxStyle( style.errorBox );
    }

    if (
      style.marker &&
      ( type == Graph.SERIE_LINE || type == Graph.SERIE_SCATTER )
    ) {

      setMarkerStyle( serie, style.marker, name );
    }
  } );
};

export default setSerieStyle;