'use strict';

exports.middleware = (store) => (next) => (action) => {
  if ('CONFIG_LOAD' === action.type || 'CONFIG_RELOAD' === action.type) {
    store.dispatch({
      type: 'SET_WALLPAPER_CONFIG',
      bgProfiles: action.config.bgProfiles
    });
  }
  next(action);
};

exports.reduceUI = (state, action) => {
  switch (action.type) {
    case 'SET_WALLPAPER_CONFIG':
      return state.set('wallpaperConfig', action.bgProfiles);
  }
  return state;
};

exports.mapTermsState = (state, map) => {
  return Object.assign(map, {
    wallpaperConfig: state.ui.wallpaperConfig
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
      background: none;
    }
    `;

  return Object.assign({}, config, {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    css: `
      ${config.css || ''} 
      ${cssString}
      `
  });
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
          color: !this.props.wallpaper ? this.props.color : null,
          display: this.props.isActive ? 'block' : 'none'
        },
      })
    }
  }

  return class extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.componentDidMount = this.componentDidMount.bind(this);

      this.state = {
        isActiveProfile: props.wallpaperConfig.map(() => { return false })
      };
    }

    componentDidMount() {
      let isActiveProfileCopy = this.state.isActiveProfile.slice();
      isActiveProfileCopy[0] = true;
      this.setState({
        isActiveProfile: isActiveProfileCopy
      })
    }

    render () {
      return React.createElement(Terms, Object.assign({}, this.props, {
        customChildrenBefore: React.createElement('div', {className: 'hyper-wallpaper-wrapper'},
          ...this.props.wallpaperConfig.map((config, index) => {
            return React.createElement(WallPaperComponent, {
              wallpaper: config.wallpaper,
              filePath: config.filePath,
              size: config.size,
              color: config.size,
              isActive: this.state.isActiveProfile[index]
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

  return menu
};