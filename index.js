const p1 = Promise.resolve(1);
const p2 = Promise.resolve(p1);
console.log(p2);
const p3 = new Promise((resolve) => {
  resolve(p1);
});

console.log(p3);

p3.then((value) => {
  console.log('p3', value);
});

p2.then((value) => {
  console.log('p2', value);
});

p1.then((value) => {
  console.log('p1', value);
});
