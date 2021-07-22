# Classes and Objects
Previously, objects were created using the **object literal notation**. Likewise, we can even write functions that _return_ objects. There is yet another way to create objects, and it is the foundation of object-oriented JavaScript: the **constructor function**.

To instantiate (i.e.,  _create_) a new object, use the  `new`  operator to invoke the function:

```
new SoftwareDeveloper();
```

### Constructor Functions: Structure and Syntax
This is what the internals of a constructor function looks like:

```
function SoftwareDeveloper() {
  this.favoriteLanguage = 'JavaScript';
}
```

The above function will add a `favoriteLanguage` property to any object that it creates, and assigns it a default value of `'JavaScript'`. The `this` keyword refers to the new object that was created by using the `new` keyword in front of the constructor function.

```
let developer = new SoftwareDeveloper();
```

## What Does  `this`  Get Set To?
There are four ways to call functions, and each way sets  `this`  differently.

First, calling a constructor function with the  `new`  keyword sets  `this`  to a newly-created object. 

On the other hand, calling a function that belongs to an object (i.e., a  _method_) sets  `this`  to the object itself. 

Third, calling a function on its own (i.e., simply invoking a regular function) will set  `this`  to  `window`, which is the global object if the host environment is the browser.

## More Ways to Invoke Functions
### call()

`call()`  is a method directly invoked onto a function. As first parameter, it receives a value to be set as the value of this; then the other parameters that the function receives is passed one by one, separated by commas

```
function multiply(n1, n2) {
  return n1 * n2;
}

```

**'normal' way**

```
multiply(3, 4);

// 12

```

**using `call`**

```
multiply.call(window, 3, 4);

// 12
```

**more examples**
```
const mockingbird = {
  title: 'To Kill a Mockingbird',
  describe: function () {
    console.log(`${this.title} is a classic novel`);
  }
};

```

```
mockingbird.describe();

// 'To Kill a Mockingbird is a classic novel'

```

Using  `call()`, however, the following  `pride`  object can utilize  `mockingbird`'s  `describe()`  method:

```
const pride = {
  title: 'Pride and Prejudice'
};

mockingbird.describe.call(pride);
// 'Pride and Prejudice is a classic novel'
```

First, the  `call()`  method is invoked onto  `mockingbird.describe`  (which points to a function). Then, the value of  `this`  is passed into the  `call()`  method:  `pride`.

Since  `mockingbird`'s  `describe()`  method references  `this.title`, we need to access the  `title`  property of the object that  `this`  refers to. But since we've set our own value of  `this`, the value of  `this.title`  will be accessed from the  `pride`  object.

### apply()
Just like `call()`, the `apply()` method is called on a function to not only invoke that function, but also to associate with it a specific value of `this`. However, rather than passing arguments one-by-one, separated by commas -- `apply()` takes the function's arguments in an _array_.

```
function multiply(n1, n2) {
  return n1 * n2;
}

```

```
multiply.call(window, 3, 4);

// 12

```

Using  `apply()`, however, we collect all of the  `multiply()`  function's arguments in an  _array_! Then, we pass that entire array into  `apply()`:

```
multiply.apply(window, [3, 4]);

// 12
```

### `call()` vs `apply()`
`call()` may be limited if you don't know ahead of time the number of arguments that the function needs. In this case, `apply()` would be a better option, since it simply takes an array of arguments, then unpacks them to pass along to the function. Keep in mind that the unpacking comes at a minor performance cost, but it shouldn't be much of an issue.