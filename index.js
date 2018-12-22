'use strict';

exports.decorateConfig = (config) => {
  return Object.assign({}, config, {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    css: `
      ${config.css || ''}
      .header_header {
        background: linear-gradient(#37383D, #2B2B2F);
      }
      .terms_terms {
        background: url(file:///Users/inside-hakumai/.hyper_plugins/local/hyper-wallpaper/local_files/sample_bg.png) center;
        background-size: cover;
      }
      .terms_termGroup {
        background: rgba(0,0,0,0.7) !important
      }
      .xterm-viewport {
        background: none;
      }
    `
  });
};