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

## Immediately-Invoked Function Expressions: Structure and Syntax

### Function Declarations vs. Function Expressions 
In JavaScript functions can be created either through a function declaration or a function expression. A function declaration is the "normal" way of creating a named function.

```javascript
// Named function declaration
function myFunction () { /* logic here */ }

```

On the other hand, if a function is assigned to a variable or property, you are dealing with a function expression.

```javascript
// Assignment of a function expression to a variable
var myFunction = function () { /* logic here */ };

// Assignment of a function expression to a property
var myObj = {
    myFunction: function () { /* logic here */ }
};
```
The key thing about JavaScript expressions is that they return values. In both cases above the return value of the expression is the function.

###  Immediately-Invoked Function Expressions

An immediately-invoked function expression, or IIFE (pronounced  _iffy_), is a function that is called immediately after it is defined. 

```js
(function sayHi(){
    alert('Hi there!');
  }
)();

// alerts 'Hi there!'
```

### Passing Arguments into IIFE's
```js
(function (name){
    alert(`Hi, ${name}`);
  }
)('Andrew');

// alerts 'Hi, Andrew'


(function (x, y){
    console.log(x * y);
  }
)(2, 3);

// 6
```

The second pair of parentheses not only immediately executes the function preceding it -- it's also the place to put any arguments that the function may need

###  Alternative Syntax for IIFE's 💡
```js
(function sayHi(){
   alert('Hi there!');
}());

// alerts 'Hi there!'
```

### Benefits of Immediately-Invoked Function Expressions
The primary reason to use an IIFE is to obtain data privacy. Because JavaScript's  `var`  scopes variables to their containing function, any variables declared within the IIFE cannot be accessed by the outside world. [Reference: An Introduction to IIFEs - Immediately Invoked Function Expressions ](http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html)

```javascript
(function () {
    var foo = "bar";

    // Outputs: "bar"
    console.log(foo);
})();

// ReferenceError: foo is not defined
console.log(foo);

```

Of course, you could explicitly name and then invoke a function to achieve the same ends.

```javascript
function myImmediateFunction () {
    var foo = "bar";

    // Outputs: "bar"
    console.log(foo);
}

myImmediateFunction();

// ReferenceError: foo is not defined
console.log(foo);

```

However, this approach has a few downsides. First, it unnecessarily takes up a name in the global namespace, increasing the possibility of name collisions. Second, the intentions of this code aren't as self-documenting as an IIFE. And third, because it is named and isn't self-documenting it might accidentally be invoked more than once.

Another great opportunity to use an IFFE is when you want to execute some code without creating extra global variables. However, note that an IIFE is only intended to be invoked once, to create a unique execution context. If you have some code that is expected to be re-used (e.g., a function meant to be executed more than once in the application), declaring the function and then invoking it might be a better option.

All in all, if you simply have a one-time task (e.g., initializing an application), an IIFE is a great way to get something done without polluting your the global environment with extra variables. Cleaning up the global namespace decreases the chance of collisions with duplicate variable names, after all.

### Summary about Immediately-Invoked Function Expressions
An  **immediately-invoked function expression**  (IIFE) is a function that is called immediately after it is defined. Utilizing an IIFE alongside closures allows for a  **private scope**, which maintains privacy for variables defined within them. And since less variables are created, an IIFE will help to minimize pollution of the global environment, hindering the chances of variable name collisions.

### References about Immediately-Invoked Function Expressions
-   [Function Declarations vs. Function Expressions](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
-   [An Introduction to IIFEs - Immediately Invoked Function Expressions](http://adripofjavascript.com/blog/drips/an-introduction-to-iffes-immediately-invoked-function-expressions.html)  on A Drip of JavaScript
-   [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)  by Ben Alman