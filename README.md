# Hyper-Wallpaper

Extension for Hyper which a set background image easily

## Features
- **Background Images with simple config**. You need to write only a few lines in `hyper.js`
- **Multiple images**. Hyper-Wallpaper lets you change background image instantly
- **Coexistence with non-image background**. You can remove background image and use simple monochromatic background

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

The available options in a wallpaper configurations are as follows:

| Option | Type | Description |
| --- | --- | --- |
| image | Boolean | `true` when you set background image. <br> `false` when you don't set image but use monochromatic background. | 
| filePath | String | File path for background image file. <br> This option will be ignored when `image` is `false`.|
| size | String | Image size for background image. <br> Accepted value is same with `background-size` CSS property. <br> This option will be ignored when `image` is `false`.　|
| color | String | Background color as HTML color code for monochromatic background. <br> This option will be ignored when `image` is `true` |

