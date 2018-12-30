'use strict';

exports.onRendererWindow = (win) => {

  function waitForElement() {
    if(typeof win.rpc !== "undefined" && typeof win.store !== "undefined"){
      win.rpc.on('TOGGLE_WALLPAPER_PROFILE', direction => {
        win.store.dispatch({
          type: 'CHANGE_WALLPAPER_PROFILE',
          direction: direction
        })
      });
    }
    else{
      setTimeout(waitForElement, 50);
    }
  }

  waitForElement();
};

exports.middleware = (store) => (next) => (action) => {
  if ('CONFIG_LOAD' === action.type || 'CONFIG_RELOAD' === action.type) {
    store.dispatch({
      type: 'SET_WALLPAPER_CONFIG',
      bgProfiles: action.config.bgProfiles
    });
  }

  if ('INIT' === action.type ) {
    console.log('INIT');
    store.dispatch({
      type: 'INIT_ACTIVE_WALLPAPER'
    })
  }

  next(action);
};

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'INIT_ACTIVE_WALLPAPER':
      return state.set('activeWallpaper', 0);
    case 'SET_WALLPAPER_CONFIG':
      return state.set('wallpaperConfig', action.bgProfiles);
    case 'CHANGE_WALLPAPER_PROFILE':
      if (action.direction === 'next') {
        return state.set('activeWallpaper', (state.activeWallpaper + 1) % state.wallpaperConfig.length);
      } else if (action.direction === 'prev') {
        return state.set('activeWallpaper', (state.activeWallpaper - 1 + state.wallpaperConfig.length) % state.wallpaperConfig.length);
      } else {
        throw new Error(`Unexpected value for activeWallpaper: ${action.direction}`);
      }
  }
  return state;
};

exports.mapTermsState = (state, map) => {
    return Object.assign(map, {
      activeWallpaper: state.ui.activeWallpaper,
      wallpaperConfig: state.ui.wallpaperConfig,
      changeWallpaperProfile: state.ui.changeWallpaperProfile
  });
};

exports.decorateConfig = (config) => {

  const cssString = `
    .hyper-wallpaper-wrapper {
      width: 100%;
      height: 100%;
    }
    .hyper-wallpaper-wrapper .profile {
      width: 100%;
      height: 100%;
    }
    .terms_termGroup {
      background: rgba(0,0,0,0.7) !important
    }
    .xterm-viewport {
      background-color: rgba(0,0,0,0) !important;
    }
    `;

  return Object.assign({}, config, {
    css: `
      ${config.css || ''} 
      ${cssString}
      `
  });
};

exports.getTermProps = (uid, parentProps, props) => {
  props.backgroundColor = 'rgba(0,0,0,0)';
  return props;
};

exports.decorateTerms = (Terms, {React, notify, Notification}) => {

  class WallPaperComponent extends React.Component {

    constructor(props, context) {
      super(props, context)
    }

    render() {
      return React.createElement('div', {
        className: 'profile',
        style: {
          backgroundImage: this.props.wallpaper ? `url(file://${this.props.filePath}` : null,
          backgroundSize: this.props.wallpaper ? this.props.size : null,
          backgroundPosition: 'center',
          backgroundColor: !this.props.wallpaper ? this.props.color : null,
          display: this.props.isActive ? 'block' : 'none'
        },
      })
    }
  }

  return class extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.activeWallpaper !== this.props.activeWallpaper) {
        console.debug(`Active wallpaper has been changed to: ${this.props.activeWallpaper}`);
      }
  }

    render () {
      return React.createElement(Terms, Object.assign({}, this.props, {
        customChildrenBefore: React.createElement('div', {className: 'hyper-wallpaper-wrapper'},
          ...this.props.wallpaperConfig.map((config, index) => {
            return React.createElement(WallPaperComponent, {
              wallpaper: config.wallpaper,
              filePath: config.filePath,
              size: config.size,
              color: config.color,
              isActive: (this.props.activeWallpaper === index)
            });
          })
        )
      }));
    }
  };
};

exports.decorateMenu = (menu) => {

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
        click: (_menuItem, browserWindow, _event) => {
          browserWindow.rpc.emit('TOGGLE_WALLPAPER_PROFILE', 'prev');
        }
      }, {
        label: 'Switch to next profile',
        accelerator: 'command+p',
        click: (_menuItem, browserWindow, _event) => {
          browserWindow.rpc.emit('TOGGLE_WALLPAPER_PROFILE', 'next');
        }
      }
    ]
  });

  return menu
};