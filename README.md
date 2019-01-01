# Hyper-Wallpaper

<p>
  <a href="#hyper-version" alt="Hyper version">
    <img src="https://img.shields.io/badge/Hyper-%3E%3D%202.1.0-lightgrey.svg" />
  </a>
</p>

Extension for [Hyper](https://hyper.is/) terminal which introduces background image easily

![demo](https://raw.githubusercontent.com/inside-hakumai/hyper-wallpaper/demo/demo.gif)

## Features
- **Background Images with simple config**. You need to write only a few lines in `hyper.js`
- **Multiple images**. Hyper-Wallpaper lets you change background image instantly
- **Coexistence with non-image background**. You can remove background image and use simple monochromatic background

## Installation
- Execute `$ hyper i hyper-wallpaper` in your Hyper terminal

or

- Add `hyper-wallpaper` to the list of plugins in `~/.hyper.js` manually.


## Configuration
`Hyper-Wallpaper` can be configured in `hyper.js` as follows:
```javascript
module.exports = {
  config: {
    
    // ...
    
    wallpapers: [
      {
        image: true,
        filePath: '/path/to/your/image',
        size: 'cover'
      },
      {
        image: true,
        filePath: '/path/to/your/another/image',
        size: 'cover'
      },
      {
        image: false,
        color: '#000000'
      }
    ],
    
    // ...
    
  }
}
``` 

Each item of `wallpaper` array shows configuration for a wallpaper.

The available options in a wallpaper configuration are as follows:

| Option | Type | Description |
| --- | --- | --- |
| image | Boolean | `true` when you set background image. <br> `false` when you don't set image but use monochromatic background. | 
| filePath | String | File path for background image file. <br> This option will be ignored when `image` is `false`.|
| size | String | Image size for background image. <br> Accepted value is same with `background-size` CSS property. <br> This option will be ignored when `image` is `false`.　|
| color | String | Background color as HTML color code for monochromatic background. <br> This option will be ignored when `image` is `true` |


