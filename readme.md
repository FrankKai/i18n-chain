## i18n-chain
**反向选择路径链**多语言vscode插件。

通过分析本地项目的多语言文件(js、ts、json)，生成snippet.json，帮助开发者实现多语言快速复用，提升开发效率。

### 演示图
![](./image/demo.gif)


### 提供两种方式
- i18n-chain-ts: 适用于locales文件类型为ts file的项目。
- i18n-chain-json: 适用于locales文件类型为json的项目。


### 安装

1. 安装i18n-chain-0.0.1.vsix
2. Command+Shift+P => i18n-chain-ts 或者 Command+Shift+P => i18n-chain-json


### 使用
例如有这样的结构

```json
{
  "foo": "知道了",
  "foo.bar": "知道了",
  "foo.bar.baz": "知道了",
}
```

键入i18n-chain-后选择需要的链即可。

```js
x-知道了
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

## 开发说明

### 开发调试
- vscode执行Extension
- 找一个扩展开发宿主项目测试
- 插件代码有更新时，需要`yarn compile`编译并且点击右上角刷新按钮，保持扩展开发宿主内的插件为最新态

### 仅编译
```js
yarn compile
```
### 生成本地vsix包
```js
yarn build
```

