# ssi-loader

Webpack SSI loader

This is a very simple implementation of SSI to be used with as a webpack loader
in development mode.

## Support

Currently only ~~the **block** and~~ **include** directives are supported:

```
<!--# block name="shush" --><!--# endblock -->
```

```
<!--# include virtual="/includes/new/pre/async" stub="shush" -->
```

## Config

Inside your **webpack.dev.config.js** file just add the reference to ssi-loader:

```js
// webpack.dev.config.js

module: {
      rules: [
      {
        test: /\.html?$/,
        use: [
          {
            loader: 'html-loader' // Used to output as html
          },
          {
            loader: 'ssi-loader',
            options: {
              locations: {
                "includes": "https://www.uswitch.com",
                // "widgets": "https://www.uswitch.com"
              }
            }
          }
        ]
      }
```

This will replace all SSI directives with the actual include content.
The ssi-loader only handles the server side includes, in order to return
a valid webpack source you can use the **html-loader** like shown in the
previous example.

## to-think

ssi-loader，会将 ssi 内的内容替换掉页面的注释语法 ，而实际上，希望 ssi 更新后可以实时更新，在产品模式不使用ssi-loader，只在在生产模式使用。

>html-webpack-plugin 最新版不支持 3.x webpack

ssi-loader bugs:

1. ~~支持本地 & 远程 ssi~~
2. 开发时，无法监控实时更新（因为是服务器端的，所以无法监控更改）
3. 目前仅支持 webpack 3.x，不支持 4.x 

## LICENSE

[WTFPL](http://www.wtfpl.net/)
