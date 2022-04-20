## i18n-chain
**反向选择路径链**多语言vscode插件。

通过分析本地项目的多语言文件(js、ts、json)，生成snippet.json，帮助开发者实现多语言快速复用，提升开发效率。

### 演示图
<p align="center">
  <img src="https://imgur.com/EeqhvpZ.gif" />
</p>


### 两种方式
- i18n-json: 适用于locales文件类型为json的项目。
- i18n-ts: 适用于locales文件类型为ts file的项目。


### 安装及使用

1. 插件市场搜索i18n-chain，安装即可
2. 配置多语言文件目录 Preferences->Settings->User->Extensions->i18n-chain(例如，配置Locale Path为：/src/locales/zh)
3. Command+Shift+P => i18n-json(Locale Path目录中的内容为json文件) 或者 Command+Shift+P => i18n-ts（Locale Path目录中的内容为ts文件）
4. 键入i18n-后选择需要的链即可。


例如：

```json
{
  "foo": "知道了",
  "foo.bar": "知道了",
  "foo.bar.baz": "知道了",
}
```

```js
i18n-知道了
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

## FAQ
### 生成失败

运行命令后，可以查看.vscode目录下的i18n-chain.code-snippets是否有内容。
没有的话，检查Locale Path配置的目录格式，是否与执行的命令一致。

## 开发说明

### 开发调试
- vscode执行Extension
- 找一个扩展开发宿主项目测试
- 插件代码有更新时，需要`yarn compile`编译并且点击右上角刷新按钮，保持扩展开发宿主内的插件为最新态

### 仅编译
```js
yarn test-compile
```
### 生成本地vsix包
```js
yarn build
```

