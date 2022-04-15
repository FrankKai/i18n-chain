/* @deprecated */

const clearAllCache = `
function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });
}
clearRequireCache();
`;

interface IGetNoCacheFile {
  pathname?: string; // 文件路径
}

export const getNoCacheFile = (props: IGetNoCacheFile) => {
  const { pathname } = props;
  const fs = require("fs");

  // 需要注入代码，将index.js中的require cache清空
  const file = fs.readFileSync(pathname, "utf8");
  fs.writeFileSync(pathname, clearAllCache + file, "utf8");
};
