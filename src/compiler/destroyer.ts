module.exports = (dir: string) => {
  return new Promise((resolve, reject) => {
    const cp = require("child_process");
    cp.exec(`rm -rf ${dir}`, (err: any) => {
      resolve(true);
      if (err) {
        console.log("compiler err:", err);
        reject(err);
      }
    });
  });
};
