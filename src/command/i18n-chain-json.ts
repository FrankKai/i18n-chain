import * as vscode from "vscode";
import * as glob from "glob";
import { HMR } from "../hmr";
import { jsonDiffData } from "../diff/json";

export default async function I18nChainJSON() {
  // The code you place here will be executed every time your command is executed
  // Display a message box to the user
  console.log("command:workspaceFolders", vscode.workspace.workspaceFolders);
  if (vscode.workspace.workspaceFolders) {
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    try {
      // 应用根路径
      console.log("command:rootPath", rootPath);
      // 获取配置文件中的多语言配置
      const userDefinedPath =
        vscode.workspace.getConfiguration().get("i18n-chain.localePath") ||
        "/src/locales/zh";
      const localeDir = `${rootPath}${userDefinedPath}`;
      console.log("localeDir", localeDir);
      // 避免require缓存
      delete require.cache[localeDir];
      // 多语言入口路径。从json文件升级为文件夹
      function globJSON(isHMR?: boolean, hmrUrl?: string) {
        const files = glob.sync(`${localeDir}/*.json`);
        // 热更新时，从缓存map移除当前url的，读取新的，再merge其他的
        return jsonDiffData({ hmrUrl, isHMR, files });
      }
      function generateSnippets(src: {}, isHMR?: boolean) {
        // 报告生成器
        const reporter = require("../generator/reporter");
        const report = reporter({ data: src, type: "json" });
        // 片段生成器
        const snippet = require("../generator/snippet");
        // 片段生成位置
        const snippetPosition = `${rootPath}/.vscode`;
        const json = snippet(report, snippetPosition);
        if (json) {
          const tip = isHMR
            ? "JSON HMR 成功!"
            : "多语言代码片段（JSON）生成成功!";
          vscode.window.showInformationMessage(tip);
        }
      }
      function main(
        props: { isHMR?: boolean; hmrUrl?: string } = {
          isHMR: false,
        }
      ) {
        const data = globJSON(props.isHMR, props.hmrUrl);
        generateSnippets(data, props.isHMR);
      }
      // 初始化加载
      main();

      // 监听json文件变化
      HMR({
        pathname: localeDir,
        matchRule: "*.json",
        changeCallback: (url: string) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
        createCallback: (url: string) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
        deleteCallback: (url: string) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
      });
    } catch (err) {
      if (err) {
        console.log(err);
        vscode.window.showErrorMessage("多语言代码片段（JSON）生成异常！");
      }
    }
  }
}
