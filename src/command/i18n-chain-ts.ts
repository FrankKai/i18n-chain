import * as vscode from "vscode";
import { HMR } from "../hmr";
import { tsDiffData } from "../diff/ts";
import { start, end } from "../benchmark";

export default async function I18nChainTS() {
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
        "/client/locales/zh";
      const localeDir = `${rootPath}${userDefinedPath}`;
      console.log("localeDir", localeDir);

      async function main(
        props: { isHMR?: boolean; hmrUrl?: string } = { isHMR: false }
      ) {
        // 通过tsc编译ts为js
        const compilerCreator = require("../compiler/creator");
        // 增量热更新HMR时，仅编译变化文件即可
        const time = start();
        await compilerCreator(
          props?.isHMR ? props?.hmrUrl : `${localeDir}/index.ts`,
          `${rootPath}/.i18n-chain`,
          !props?.isHMR
        );
        end(time, "TS compiler");
        const data = tsDiffData({
          isHMR: props?.isHMR,
          tempDir: `${rootPath}/.i18n-chain`,
        });

        // 报告生成器
        const reporter = require("../generator/reporter");
        const report = reporter({ data, type: "js", isHMR: props?.isHMR });
        console.log("report", report);
        // 片段生成器
        const snippet = require("../generator/snippet");
        // 片段生成位置
        const snippetPosition = `${rootPath}/.vscode`;
        const json = snippet(report, snippetPosition);
        console.log("json", json);
        // 删除生成文件
        const compilerDestroyer = require("../compiler/destroyer");
        compilerDestroyer(`${rootPath}/.i18n-chain`);

        if (json) {
          const tip = props.isHMR
            ? "TS HMR 成功!"
            : "多语言代码片段（TS）生成成功!";
          vscode.window.showInformationMessage(tip);
        }
      }
      main();

      // 监听ts文件变化
      HMR({
        pathname: localeDir,
        matchRule: "*.ts",
        changeCallback: (url) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
        createCallback: (url) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
        deleteCallback: (url) =>
          main.bind(null, { isHMR: true, hmrUrl: url })(),
      });
    } catch (err) {
      if (err) {
        vscode.window.showErrorMessage("多语言代码片段（TS）生成异常！");
        const compilerDestroyer = require("../compiler/destroyer");
        compilerDestroyer(`${rootPath}/.i18n-chain`);
      }
    }
  }
}
