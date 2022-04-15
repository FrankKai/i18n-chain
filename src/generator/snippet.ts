/*
 * @Author: yihu
 * @Date: 2021-08-18 10:57:30
 * @LastEditTime: 2021-08-20 11:15:17
 * @LastEditors: Please set LastEditors
 * @Description: 生成可用的snippet条目
 * @FilePath: /i18n-reporter/generator/index.js
 */
import type { VisualItem, SnippetItem, SnippetsItems } from "./type";

import { prefix, name } from "./constant";
module.exports = async (data: [], path: string) => {
  const fs = require("fs");

  const result = data.reduce((acc: SnippetsItems, cur: VisualItem) => {
    const choices = cur.items.join(",");
    const list = cur.items.map((e, i) => `${i + 1}.${e}\n`);
    const snippet: SnippetItem = {
      prefix: [`${prefix}-${cur.key}`],
      body: [`\${1|${choices}|}`],
      description: [cur.key, ...list],
    };
    acc[cur.key] = snippet;
    return acc;
  }, {});

  // 移除JSON格式化，减少40%存储空间
  const json = JSON.stringify(result);
  // 若无.vscode目录，自动创建
  const mkdir = require("../compiler/mkdir");
  if (!fs.existsSync(path)) {
    await mkdir(path);
  }
  const filePath = `${path}/${name}`;
  fs.writeFile(filePath, json, "utf8", function (error: any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("写入成功");
  });
  return result;
};
