import type { VisualItem } from "./type";

interface TReporter {
  /**
   * @description 数据
   */
  data: Object;
  /**
   * @description 需要处理的文件类型
   */
  type?: "js" | "json";
}

module.exports = (props: TReporter) => {
  const { data, type = "js" } = props;
  /**
   * 多语言重复检测
   * 1.中文作为key
   * 2.递归统计个数
   * 输入：多语言对象
   * 输出：map
   */
  const map = new Map();
  let count = 0;

  function check(data: Object, prefix = "") {
    for (const [key, value] of Object.entries(data)) {
      const computedKey = `${prefix}${prefix ? "." : ""}${key}`;
      if (Object.prototype.toString.call(value) === "[object Object]") {
        check(value, computedKey);
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          count++;
          map.set(
            item,
            map.get(item) ? [...map.get(item), computedKey] : [computedKey]
          );
        });
      } else {
        count++;
        map.set(
          value,
          map.get(value) ? [...map.get(value), computedKey] : [computedKey]
        );
      }
    }
  }
  check(data);

  /**
   * 可视化统计个数
   * 1.倒序统计出重复多语言
   * 2.列出多语言重复项
   * 输入：map
   * 输出：倒序统计数组
   */

  const visual: VisualItem[] = [];

  function visualizeData() {
    map.forEach((value, key) => {
      if (type === "js") {
        // 移除default前缀
        // const VALUE_PATH_PREFIX_REMOVED = value.map((item: string) =>{
        //   const chars = item.split('.');
        //   chars.shift();
        //   return chars.join(".");
        // });
        visual.push({
          key,
          count: value.length,
          items: value,
        });
      }
      if (type === "json") {
        visual.push({
          key,
          count: value.length,
          items: value,
        });
      }
    });
    visual.sort((x, y) => y.count - x.count);
    visual.forEach((item: VisualItem) => {
      // 调整这里改变打印结果
      console.log(item.key, ":", item.count, item.items);
    });
  }

  visualizeData();
  return visual;
};
