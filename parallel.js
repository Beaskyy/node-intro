const task = (name, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${name} completed`);

      resolve(name);
    }, delay);
  });
};

const main = async () => {
  console.log("Starting tasks...");

  // Your implementation here
  const [taskA, taskB, taskC] = await Promise.all([
    task("A", 3000),
    task("B", 1000),
    task("C", 2000),
  ]);

  console.log("All tasks completed");
};

main();