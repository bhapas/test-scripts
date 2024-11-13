const { Worker, isMainThread, parentPort } = require("worker_threads");
const { getHeapStatistics } = require("v8");

if (isMainThread) {
  console.log("Main Thread: ", process.memoryUsage());
  let worker;
  worker = new Worker(__filename);
  worker.on("message", (msg) => {
    const heapSize = getHeapStatistics().total_heap_size;
    console.log(
      `In the main thread got message "${msg}", heap size is ${heapSize}`
    );
  });
  worker.on("error", (err) => {
    console.log(err);
  });
  worker.on('exit', () => {
    console.log("Main Thread end: ", process.memoryUsage());
    console.log('Worker exited');
  });
} else {
  console.log("Worker Thread start: ", process.memoryUsage());
  const bigArray = [];
  const heapSizeBefore = getHeapStatistics().total_heap_size;
  console.log(`In the worker thread, heap size is ${heapSizeBefore}`);

//   parentPort.postMessage(`Array size ${bigArray.length}`);

//   // Eat a lot of memory
//   for (let i = 0; i < 100000000; i++) {
//     bigArray.push(i);
//   }

//   const heapSizeAfter = getHeapStatistics().total_heap_size;
//   console.log(`In the worker thread, heap size is ${heapSizeAfter}`);
//   parentPort.postMessage(`Array size ${bigArray.length}`);
  console.log("Worker Thread end: ", process.memoryUsage());
  parentPort.unref();
}
