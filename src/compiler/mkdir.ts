/*
 * @Author: your name
 * @Date: 2021-08-20 14:25:27
 * @LastEditTime: 2021-08-20 17:32:42
 * @LastEditors: Please set LastEditors
 * @Description: 编译client/locales/zh下的ts文件为js文件
 * @FilePath: /snake/src/compiler/index.ts
 */
module.exports = (path: string) => {
  return new Promise((resolve, reject) => {
    const cp = require("child_process");
    cp.exec(`mkdir ${path}`, (err: any) => {
      resolve(true);
      if (err) {
        console.log("compiler err:", err);
        reject(err);
      }
    });
  });
};
