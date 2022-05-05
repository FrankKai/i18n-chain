import * as vscode from "vscode";

interface IHMR {
  pathname: string; // 监听的目录地址
  matchRule: string; // 监听的文件类型
  changeCallback?: CommonVoid<string>; // 文件变化时的执行回调
  createCallback?: CommonVoid<string>; // 文件创建时的执行回调
  deleteCallback?: CommonVoid<string>; // 文件删除时的执行回调
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
