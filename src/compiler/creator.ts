/*
 * @Author: your name
 * @Date: 2021-08-20 14:25:27
 * @LastEditTime: 2021-08-20 17:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 编译client/locales/zh下的ts文件为js文件
 * @FilePath: /snake/src/compiler/index.ts
 */

module.exports = (path: string, dir: string, isDir?: boolean) => {
  return new Promise((resolve, reject) => {
    const tempDir = `${dir}`;
    const memfs = require('memfs');
    memfs.fs.writeFileSync(tempDir, '');
    const cp = require('child_process');

    // todo: tsc编译资源到memfs生成的内存目录
    // 原因：tsc找不到内存中的目录，tsc可能需要disk的目录
    const compileCmd = isDir
      ? `tsc -p ${path} --outDir ${tempDir}`
      : `tsc ${path} --outDir ${tempDir}`;

    cp.exec(compileCmd, (err: any) => {
      resolve(true);
      if (err) {
        console.log('compiler err:', err);
        reject(err);
      }
    });
  });
};
