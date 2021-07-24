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

## Callbacks and  `this`
```
function invokeTwice(cb) {
   cb();
   cb();
}

const dog = {
  age: 5,
  growOneYear: function () {
    this.age += 1;
  }
};

```

First, invoking  `growOneYear()`  works as expected, updating the value of the  `dog`  object's  `age`  property from  `5`  to  `6`:

```
dog.growOneYear();

dog.age; 
// 6

```

However, passing  `dog.growOneYear`  (a function) as an argument into  `invokeTwice()`  produces an odd result:

```
invokeTwice(dog.growOneYear);

dog.age;
// 6
```

As it turns out, `invokeTwice()` does indeed invoke `growOneYear` -- but it is invoked as a _function_ rather 
than a _method_! Let's revisit the `this` grid from earlier:

### Saving  `this`  with an Anonymous Closure
One way to resolve the above issue is to use an **anonymous closure** to close over the `dog` object:

```
function invokeTwice(cb) {
   cb();
   cb();
}

invokeTwice(function () { 
  dog.growOneYear(); 
});

dog.age;
// 7
```
Using this approach, invoking  `invokeTwice()`  still sets the value of  `this`  to  `window`. However, this has no effect on the closure; **within the anonymous function, the  `growOneYear()`  method will still be directly called onto the  `dog`  object.** As a result, the value of  `dog`'s  `age`  property increases from  `5`  to  `7`.

### Saving  `this`  with bind()
Similar to  `call()`  and  `apply()`, the  `bind()`  method allows us to directly define a value for  `this`.  `bind()`  is a method that is also called _on_ a function, but unlike  `call()`  or  `apply()`, which both invoke the function right away --  `bind()`  _returns_  a new function that, when called, has  `this`  set to the value we give it.

```
const myGrow = dog.growOneYear.bind(dog);

invokeTwice(myGrow);

dog.age;
// 7
```

### Summary
JavaScript provides three methods that allow us to set the value of  `this`  for a given function:

-   `call()`  invokes the function and has arguments passed in individually, separated by commas.
-   `apply()`  is similar to  `call()`; it invokes the function just the same, but arguments are passed in as an array.
-   `bind()`  returns a new function with  `this`  bound to a specific object, allowing us to call it as a regular function.

## Prototypal Inheritance
When a function is called as a constructor using the  `new`  operator, the function creates and returns a new object. This object is secretly linked to its constructor's  `prototype`, which is just another object. Using this secret link allows an object to access the  `prototype`'s properties and methods as if it were its own. If JavaScript does not find a particular property within an object, it will keep looking up the prototype chain, eventually reaching  `Object()`  (top-level parent) if necessary.


```
// (A)

function Dalmatian (name) {
  this.name = name;

  this.bark = function() {
    console.log(`${this.name} barks!`);
  };
}

```

```
// (B)

function Dalmatian (name) {
  this.name = name;
}

Dalmatian.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};
```

**(B)** is optimal, because the function that `bark` points to does not need to be recreated each time an instance of `Dalmatian` is created.

### hasOwnProperty()
`hasOwnProperty()`  allows you to find the origin of a particular property. Upon passing in a string of the property name you're looking for, the method will return a boolean indicating whether or not the property belongs to the object itself (i.e., that property was  _not_  inherited).

```
function Phone() {
  this.operatingSystem = 'Android';
}

Phone.prototype.screenSize = 6;
```

```
const myPhone = new Phone();

const own = myPhone.hasOwnProperty('operatingSystem');

console.log(own);
// true
```

```
const inherited = myPhone.hasOwnProperty('screenSize');

console.log(inherited);
// false
```

### isPrototypeOf()
Objects also have access to the  `isPrototypeOf()`  method, which checks whether or not an object exists in another object's prototype chain.

> `isPrototypeOf()`  checks whether or not an object exists in another object's prototype chain

>  `isPrototypeOf()`  takes a single argument: an object whose prototype chain is to be searched

```
function Mouse() {
  this.favoriteFood = 'cheese';
}

Mouse.prototype = rodent;
```

```
const ralph = new Mouse();

const result = rodent.isPrototypeOf(ralph);

console.log(result);
// true
```

### Object.getPrototypeOf()
Using the previous example:
```
const myPrototype = Object.getPrototypeOf(ralph);

console.log(myPrototype);
// { favoriteFood: 'cheese', hasTail: true }
```

### The  `constructor`  Property
Each time an object is created, a special property is assigned to it under the hood: `constructor`. Accessing an object's `constructor` property returns a reference to the constructor function that created that object in the first place.

```
function Longboard() {
  this.material = 'bamboo';
}

const board = new Longboard();

```

If we access  `board`'s  `constructor`  property, we should see the original constructor function itself:

```
console.log(board.constructor);

// function Longboard() {
//   this.material = 'bamboo';
// }
```

## Prototypal Inheritance - Subclasses
Recap: an object's constructor function's prototype is first place searched when the JavaScript engine tries to access a property that doesn't exist in the object itself.

`__proto__` is a property of all objects (i.e., instances) made by a **constructor function**, and points directly to that constructor's `prototype` object.

```
const bear = {
  claws: true,
  diet: 'carnivore'
};
```

```
function PolarBear() { 
  // ...
}

PolarBear.prototype = bear;

const snowball = new PolarBear();

snowball.color = 'white';
snowball.favoriteDrink = 'cola';

console.log(snowball.claws);
// true

console.log(snowball.diet);
// 'carnivore'

console.log(snowball.__proto__);

// { claws: true, diet: 'carnivore' }
```

### `___proto___` and `prototype` 
```
function GuineaPig (name) {
  this.name = name;
  this.isCute = true;
}

const waffle = new GuineaPig('Waffle');
```

When the new instance of `GuineaPig` is created, the special property `waffle.__proto__` is set to `GuineaPig.prototype`. This secret link allows instances of the `GuineaPig` constructor to access properties of `GuineaPig.prototype`. Keep in mind that **you should never use the  `__proto__`  in any code you write.**



### 💡 What About Just Inheriting the Prototype? 💡
Let's say we want a  `Child`  object to inherit from a  `Parent`  object. Why shouldn't we just set  `Child.prototype = Parent.prototype`?

First, recall that objects are passed by  _reference_. This means that since the  `Child.prototype`  object and the  `Parent.prototype`  object refer to the  _same object_  -- **any changes you make to  `Child`'s prototype will  _also_  be made to  `Parent`'s prototype**. We don't want children being able to modify properties of their parents!

On top of all this, no prototype chain will be set up. What if we want an object to inherit from any object we want, not just its prototype?

We still need a way to efficiently manage inheritance without mutating the prototype at all.
