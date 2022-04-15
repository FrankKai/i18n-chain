const p = require("process");
const start = () => p.hrtime(); // [ 1800216, 25 ]

const end = (time: string, namespace?: string) => {
  const NS_PER_SEC = 1e9;
  const diff = p.hrtime(time);
  // [ 1, 552 ]

  console.log(`Benchmark ${namespace} took ${(diff[0] * NS_PER_SEC + diff[1]) / 1e6} ms`);
  // Benchmark TS compiler took 2057.071987 ms
  // Benchmark TS init took 13.595046 ms
};

export { start, end };
