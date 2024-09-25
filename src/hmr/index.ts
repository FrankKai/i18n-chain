import * as vscode from "vscode";

interface IHMR {
  /**
   * @description 监听的目录地址
   */
  pathname: string;
  /**
   * @description 监听的文件类型
   */
  matchRule: string;
  /**
   * @description 文件变化时的执行回调
   */
  changeCallback?: CommonVoid<string>;
  /**
   * @description 文件创建时的执行回调
   */
  createCallback?: CommonVoid<string>;
  /**
   * @description 文件删除时的执行回调
   */
  deleteCallback?: CommonVoid<string>;
}

export const HMR = (props: IHMR) => {
  const {
    pathname,
    matchRule,
    changeCallback,
    createCallback,
    deleteCallback,
  } = props;
  if (!pathname || !matchRule) {
    return;
  }
  const watcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(pathname, matchRule)
  );
  watcher.onDidChange((uri) => {
    console.log("change", uri);
    changeCallback?.(uri.path);
  });
  watcher.onDidCreate((uri) => {
    console.log("create", uri);
    createCallback?.(uri.path);
  });
  watcher.onDidDelete((uri) => {
    console.log("delete", uri);
    deleteCallback?.(uri.path);
  });
};
