'use strict';


exports.decorateConfig = (config) => {

  const wallpaperPath = config.wallpaperPath || null;
  const wallpaperSize = config.wallpaperSize || 'cover';

  console.log(wallpaperPath);


  const cssString = `
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

exports.decorateMenu = (menu) => {

  console.log(JSON.stringify(menu, undefined, 2));

  let indexForPluginItemInMenu = menu.findIndex((element) => {
    return element['label'] === 'Plugins'
  });

  menu[indexForPluginItemInMenu]['submenu'].push({
    type: 'separator'
  });
  menu[indexForPluginItemInMenu]['submenu'].push({
    label: 'hyper-wallpaper',
    submenu: [
      {
        label: 'Switch to previous profile',
        accelerator: 'command+o',
        click: () => {
          console.log('hoge');
        }
      }, {
        label: 'Switch to next profile',
        accelerator: 'command+p',
        click: () => {
          console.log('hoge');
        }
      }
    ]
  });

  console.log(indexForPluginItemInMenu);


  return menu
};