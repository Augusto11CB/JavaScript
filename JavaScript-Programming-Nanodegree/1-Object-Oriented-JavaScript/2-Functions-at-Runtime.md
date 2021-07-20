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


