import { start, end } from "../benchmark";

/**
 * JSON 热更新 diff 算法
 * 思路：
 * - 记录一个json file路径hashmap
 * - 监听某个文件变化，记录下变化的url
 * - 移除旧的url中的所有code
 * - 编译url生成新的code
 * - 将新的code merge到现有对象上
 * - 根据最新的对象，生成全新的i18n-chain.code-snippets
 */
interface IJsonDiffData {
  /**
   * @description 热更新链接
   */
  hmrUrl?: string;
  /**
   * @description 是否为热更新
   */
  isHMR?: boolean;
  /**
   * @description 文件数组
   */
  files: string[];
}
const CACHE_MAP = new Map();

const jsonDiffData = (props: IJsonDiffData) => {
  const { hmrUrl, isHMR = false, files } = props;
  if (isHMR) {
    const time = start();
    CACHE_MAP.delete(hmrUrl);
    const fs = require("fs");
    const hmrData = fs.existsSync(hmrUrl)
      ? JSON.parse(fs.readFileSync(hmrUrl, "utf8"))
      : {};
    CACHE_MAP.set(hmrUrl, hmrData);
    const cachedData = [...CACHE_MAP.values()].reduce(
      (acc, cur) => ({ ...acc, ...cur }),
      {}
    );
    end(time, "JSON HMR");

    return {
      ...hmrData,
      ...cachedData,
    };
  }

  if (!isHMR) {
    const time = start();
    let data = {};
    for (const fileUrl of files) {
      console.log("glob json", fileUrl);
      const fs = require("fs");
      const fileData = JSON.parse(fs.readFileSync(fileUrl, "utf8"));
      CACHE_MAP.set(fileUrl, fileData);
      data = { ...data, ...fileData };
    }
    end(time, "JSON init");
    return data;
  }
  return {};
};

export { jsonDiffData, CACHE_MAP };
