// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { I18nChainJSON, I18nChainTS } from "./command";
import { CACHE_MAP as CACHE_MAP_JSON } from './diff/json';
import { CACHE_MAP as CACHE_MAP_TS } from './diff/ts';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    "欢迎使用i18n-chain，这是一款多语言vscode插件！"
  );

  // 根据autoCompile配置，启动时是否自动编译，默认为false
  const autoCompile = vscode.workspace
    .getConfiguration()
    .get("i18n-chain.autoCompile");
  if (autoCompile) {
    // 默认启动时，根据i18n-chain.defaultCmd设置，运行命令
    const defaultCommand = vscode.workspace
      .getConfiguration()
      .get("i18n-chain.defaultCmd") || "i18n-json";
    if (defaultCommand === "i18n-ts") {
      I18nChainTS();
    }

    if (defaultCommand === "i18n-json") {
      I18nChainJSON();
    }
  }


  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  // ts版本
  let disposableTS = vscode.commands.registerCommand("i18n-ts", I18nChainTS);

  // json版本
  let disposableJSON = vscode.commands.registerCommand(
    "i18n-json",
    I18nChainJSON
  );

  context.subscriptions.push(disposableTS);
  context.subscriptions.push(disposableJSON);
}

// this method is called when your extension is deactivated
export function deactivate() {
  CACHE_MAP_JSON.clear();
  CACHE_MAP_TS.clear();
}
