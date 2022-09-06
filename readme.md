[中文](./README-zh.md)

## i18n-chain
**Reverse selection path chain** Multilingual vscode plugin.

By analyzing the multi-language files (js, ts, json) of the local project, and generating snippet.json, it helps developers to achieve multi-language rapid reuse and improve development efficiency.

### repo
https://github.com/FrankKai/i18n-chain

### demo
<p align="center">
  <img src="https://imgur.com/tO0oXjk.gif" />
</p>


### two ways
- i18n-json: For projects with locales file type json.
- i18n-ts: For projects with locales file type ts file.


### installation and use

1. Search for i18n-chain in the plugin market and install it
2. Configure multilingual file directory Preferences->Settings->User->Extensions->i18n-chain (for example, configure Locale Path, the default path is /src/locales/zh)
3. Command+Shift+P => i18n-json(The content in the Locale Path directory is a json file) or Command+Shift+P => i18n-ts（The content in the Locale Path directory is the ts file）
4. Type i18n- and select the desired chain。


E.g：

```json
{
  "foo": "understood",
  "foo.bar": "understood",
  "foo.bar.baz": "understood",
}
```

```js
i18n-understood
```
=> 
```js
1.foo

2.foo.bar

3.foo.bar.baz

```

=>
```js
foo.bar.baz
```

## Schematic
<p align="center">
  <img src="https://imgur.com/FSHTt82.png" />
</p>

## FAQ
### Build failed

After running the command, you can check whether there is any content in i18n-chain.code-snippets in the .vscode directory.
If not, check whether the directory format of the Locale Path configuration is consistent with the executed command.

## Development Notes

### Development and debugging
- vscode executes Extension
- Find an extension development host project to test
- When the plugin code is updated, you need to compile it with `yarn compile` and click the refresh button in the upper right corner to keep the plugins in the extension development host up to date

### compile only
```js
yarn test-compile
```
### Generate local vsix package
```js
yarn build
```

