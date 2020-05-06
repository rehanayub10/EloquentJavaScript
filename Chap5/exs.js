//Q1
let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((a,b) => a.concat(b)));
// → [1, 2, 3, 4, 5, 6]

//Q2
function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
      body(value);
    }
}


