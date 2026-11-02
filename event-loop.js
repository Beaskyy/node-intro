console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("4");

  process.nextTick(() => {
    console.log("5");
  });
});

process.nextTick(() => {
  console.log("6");
});

setImmediate(() => {
  console.log("7");
});

console.log("8");