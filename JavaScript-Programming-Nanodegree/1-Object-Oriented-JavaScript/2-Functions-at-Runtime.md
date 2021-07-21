# Functions at Runtime
## Functions are First-Class Functions
In JavaScript, functions are  _first-class_  functions. This means that you can do with a  _function_  just about anything that you can do with other elements, such as numbers, strings, objects, arrays, etc. JavaScript functions can:

1.  Be stored in variables
2.  Be returned from a function.
3.  Be passed as arguments into another function.

## Higher Order Function
Recall that a function must always return a value. Whether the value is explicitly specified in a  `return`  statement (e.g., returning a string, boolean, array, etc.), or the function implicitly returns  `undefined`  (e.g., a function that simply logs something to the console), a function will always return just  _one_  value.

Since we know that functions are first-class functions, we can treat a  _function_  as a value and just as easily return a  _function_  from another function. A function that takes other functions as arguments (and/or _returns_ a function), is known as  **higher-order function**

```
function alertThenReturn() {
  alert('Message 1!');

  return function () {
    alert('Message 2!');
  };
}

const innerFunction = alertThenReturn();

innerFunction();

// alerts 'Message 2!'

```
Likewise, this (the returned function from `alertThenReuturn` function) function can be invoked immediately without being stored in a variable. The same outcome can be achieved if we simply add another set of parentheses to the expression  `alertThenReturn();`:

```
alertThenReturn()();

// alerts 'Message 1!' then alerts 'Message 2!'
```

## Callback Functions
A function that is passed as an argument into another function is called a **callback** function. 
By delegating functions to other functions it allows to build applications with *composition*.

```js
function each(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      console.log(array[i]);
    }
  }
}


function isPositive(n) {
  return n > 0;
};


each([-2, 7, 11, -4, -10], isPositive);
// log 7 and 11
```


## Array Methods
-   `forEach()`
-   `map()`
-   `filter()`

### forEach()
Array's `forEach()` method takes in a callback function and invokes that function _for each_ element in the array.
```js
array.forEach(function callback(currentValue, index, array) {
    // function code here
});

```

The callback function itself receives the arguments: the current array element, its index, and the entire array itself.

``` js
function logIfOdd(n) {
  if (n % 2 !== 0) {
    console.log(n);
  }
}

const myArray = [1, 5, 2, 4, 6, 3] 
myArray.forEach(logIfOdd);
// 1
// 5
// 3

```

### map()
Array's  `map()`  method is similar to  `forEach()`  in that it invokes a callback function for each element in an array. However,  `map()`  returns a  _new array_  based on what's returned from the callback function.

### filter()
Array's  `filter()`  method is similar to the  `map()`  method:

-   It is called on an array
-   It takes a function as an argument
-   It returns a new array

The difference is that the function passed to  `filter()`  is used as a test, and only items in the array that pass the test are included in the new array.

## Scope
Variables in JavaScript are traditionally defined in the scope of a _function_, rather than in the scope of a _block_. Since entering a function will change scope, any variables defined inside that function are _not_ available outside of that function. On the other hand, if there are any variables defined inside a _block_ (e.g., within an `if` statement), those variables _are_ available outside of that block.

### Variable Shadowing
JavaScript won't throw an error or otherwise prevent you from creating that extra variable. In fact, the variable with local scope will just temporarily "shadow" the variable in the outer scope. This is called **variable shadowing**.

Any local variables that have the same name take precedence over those with a wider scope.
```js
const symbol = '¥';

function displayPrice(price) {
  const symbol = '$';
  console.log(symbol + price);
}

displayPrice('80');
// '$80'
```

### `let` , `var` and scope
The  **`let`**  statement declares a block-scoped local variable, optionally initializing it to a value.

```
let x = 1;

if (x === 1) {
  let x = 2;

  console.log(x);
  // expected output: 2
}

console.log(x);
// expected output: 1

```

**`let`** allows you to declare variables that are limited to the scope of a [block](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) statement, or expression on which it is used, unlike the [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) keyword, which declares a variable globally, or locally to an entire function regardless of block scope.

```

function varTest() {
  var x = 1;
  {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}
```

## Closure
MDN defines a closure as:
> "the combination of a function and the lexical environment within which that function was declared."

The [ES5 spec](http://es5.github.io/#x10.2) refers to a lexical environment as:
> "the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code."

In this case, the "lexical environment" refers the code as it was written in the JavaScript file. As such, a closure is:

-   The function itself, and
-   The code (but more importantly, the  _scope chain of_) where the function is declared

**What's really interesting about a function, though, is that it will _retain_ this scope chain -- even if it is invoked in a location _other_ than where it was declared. This is all due to the closure!**

```
function outerFunction() {
  let num1 = 5;

  return function(num2) {
    console.log(num1 + num2);
  };
}

let result = outerFunction();

result(10);
// 15
```

## Garbage Collection
JavaScript manages memory with automatic  **garbage collection**. This means that when data is no longer referable (i.e., there are no remaining references to that data available for executable code), it is "garbage collected" and will be destroyed at some later point in time. This frees up the resources (i.e., computer memory) that the data had once consumed, making those resources available for re-use.

### Garbage Collection and Closures
If the nested function captures and uses its parent's variables (or variables along the scope chain, such as its parent's parent's variables), those variables will stay in memory as long as the functions that utilize them can still be referenced.

```
unction myCounter() {
  let count = 0;

  return function () {
    count += 1;
    return count;
  };
}

```

The existence of the nested function keeps the  `count`  variable from being available for garbage collection, therefore  `count`  remains available for future access.
