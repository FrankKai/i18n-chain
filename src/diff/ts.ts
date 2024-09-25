import { start, end } from "../benchmark";
import * as glob from "glob";

/**
 * TS 热更新 diff 算法
 * 思路：
 * - 记录一个js file路径hashmap
 * - 监听某个文件变化，编译这个文件到临时目录.i18n-chain
 * - 编译i18n-chain目录下的*.js文件
 * - 移除旧的url中的所有code
 * - 编译url生成新的code
 * - 将新的code merge到现有对象上
 * - 根据最新的对象，生成全新的i18n-chain.code-snippets
 * - 删除临时目录.i18n-chain
 */
interface ITSDiffData {
  /**
   * @description 是否为热更新
   */
  isHMR?: boolean;
  /**
   * @description 临时文件
   */
  tempDir: string;
}
const CACHE_MAP = new Map();

const tsDiffData = (props: ITSDiffData) => {
  const { isHMR = false, tempDir } = props;

  if (isHMR) {
    const time = start();
    const files = glob.sync(`${tempDir}/*.js`);

    for (const fileUrl of files) {
      CACHE_MAP.delete(fileUrl);
      delete require.cache[fileUrl];
      const fileData = require(fileUrl).default;
      CACHE_MAP.set(fileUrl, fileData);
    }
    const cachedData = [...CACHE_MAP.values()].reduce(
      (acc, cur) => ({ ...acc, ...cur }),
      {}
    );
    end(time, "TS HMR");
    return {
      ...cachedData,
    };
  }

  if (!isHMR) {
    const time = start();
    const files = glob.sync(`${tempDir}/*.js`);

    let data = {};

    for (const fileUrl of files) {
      delete require.cache[fileUrl];
      const fileData = require(fileUrl).default;
      CACHE_MAP.set(fileUrl, fileData);
      data = { ...data, ...fileData };
    }
    end(time, "TS init");

    return data;
  }
  return {};
};

export { tsDiffData, CACHE_MAP };
