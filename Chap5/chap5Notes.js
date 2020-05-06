//Usefulness of Abstractions
//Method1
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
//Method 2
console.log(sum(range(1, 10)));

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
      action(i);
    }
  }
  
repeat(3, console.log);
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]

//Composability
function greaterThan(n) {
    return m => m > n;
  }
  let greaterThan10 = greaterThan(10);
  console.log(greaterThan10(11));
  // → true

  function noisy(f) {
    return (...args) => {
      console.log("calling with", args);
      let result = f(...args);
      console.log("called with", args, ", returned", result);
      return result;
    };
  }
  noisy(Math.min)(3, 2, 1);
  // → calling with [3, 2, 1]
  // → called with [3, 2, 1] , returned 1

  //Control flow -> unless
  function unless(test, then) {
    if (!test) then();
  }
  
  repeat(3, n => {
    unless(n % 2 == 1, () => {
      console.log(n, "is even");
    });
  });
  // → 0 is even
  // → 2 is even

  //Higher Order Methods
  //Filter
  function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }
  
  console.log(filter(SCRIPTS, script => script.living));
  // → [{name: "Adlam", …}, …]
  
  //Map
  function map(array, transform) {
    let mapped = [];
    for (let element of array) {
      mapped.push(transform(element));
    }
    return mapped;
  }
  
  let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
  console.log(map(rtlScripts, s => s.name));
  // → ["Adlam", "Arabic", "Imperial Aramaic", …]

  //Reduce
  function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
      current = combine(current, element);
    }
    return current;
  }
  
  console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
  // → 10
  console.log([1, 2, 3, 4].reduce((a, b) => a + b));
  // → 10
  
  //Find the script with most characters
  function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
      return count + (to - from);
    }, 0);
  }
  
  console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  }));
  // → {name: "Han", …}

  //Code that finds the average year of origin for living and dead scripts in the data set.
  function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  
  console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year))));
  // → 1165
  console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year))));
  // → 204

  //Remember that each script has an array of character code ranges associated with it. So given a character code, we could use a function like this to find the corresponding script
  function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        return script;
      }
    }
    return null;
  }
  
  console.log(characterScript(121));
  // → {name: "Latin", …}



