'use strict';


exports.decorateConfig = (config) => {

  const wallpaperPath = config.wallpaperPath || null;
  const wallpaperSize = config.wallpaperSize || 'cover';

  console.log(wallpaperPath);


  const cssString = `
    .header_header {
      background: linear-gradient(#37383D, #2B2B2F);
    }
    .terms_terms {
      background: url(file://${wallpaperPath}) center;
      background-size: ${wallpaperSize};
    }
    .terms_termGroup {
      background: rgba(0,0,0,0.7) !important
    }
    .xterm-viewport {
      background: none;
    }
    `;

  return Object.assign({}, config, {
    backgroundColor: wallpaperPath ? 'rgba(255, 255, 255, 0.0)' : config.backgroundColor,
    css: `
      ${config.css || ''} 
      ${wallpaperPath ? cssString : ''}
      `
  });
};