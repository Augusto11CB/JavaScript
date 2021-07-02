## Objects
Fundamentally, an object is a collection of associated key/value pairs. We create an object with curly brackets (i.e.,  `{`  and  `}`). Here's a variable called  `myObject`, which is assigned to an empty object:

```
const myObject = {};

```

While elements in  _arrays_  are referenced by a numeric index, keys in an  _object_  must be named explicitly, like  `color`  or  `year`. Check out the following example:

```
const car = {
  color: 'red',
  year: 1992,
  isPreOwned: true
};

```

Let's break this down and see what's going on:

-   The variable that is assigned to the object is named  `car`.
-   Curly brackets are used to define the  `car`  object.
-   Individual  **keys**  (e,g,  `color`) are associated with a single  **value**  (`'red'`  in this case). These key/value pairs are connected by a colon (`:`).
-   Each distinct key/value pair, known as a  **property**  of that object, is separated from other properties by a comma (`,`). The  `car`  object therefore contains three properties.

Unlike arrays, objects are  _unordered_  collections. For example, the  `car`  object above could be written with the key/value pairs in a different order, and it wouldn't change how you'd access  `car`'s items:

```
const car = {
  isPreOwned: true,
  color: 'red',
  year: 1992
};

```

### Object Property Syntax
Another thing to note is that keys (i.e., the  _names_  of the object's properties) are strings, but quotation marks surrounding these strings are  _optional_  as long as the string is also a valid Javascript identifier (i.e., you could use it as a variable name or function name). As a result, the following three objects are equivalent:

```
const course = { courseId: 711 };    // ← no quotes around the courseId key
const course = { 'courseId': 711 };  // ← single quotes around the courseId key
const course = { "courseId": 711 };  // ← double quotes around the courseId key
```

You'll commonly find quotation marks omitted from property names. Certain situations  _require_  them to be included, especially if the property name:

-   Is a  **reserved word**  (e.g.,  `for`,  `if`,  `let`,  `true`, etc.).
-   Contains  **spaces or special characters**  that cannot appear in a variable name (i.e., punctuation other than  `$`, and  `_`  -- most accented characters).

## Accessing Object Properties

how do we retrieve information from them? In other words: how do we  _access their values_? There are two ways:  **dot notation**  and  **square bracket notation**. Consider this  `bicycle`  object:

```js
const bicycle = {
  color: 'blue',
  type: 'mountain bike',
  wheels: {
    diameter: 18,
    width: 8
  }
};
```

Using dot notation, we can access  `bicycle`'s  `color`  property by writing:

```js
bicycle.color;

// 'blue'

```

Similarly, we can access the same property using square bracket notation by writing:

```js
bicycle['color'];

// 'blue'

```

### What about nested objects?
To retrieve the value of the  `width`  property of the object contained within  `bicycle`'s  `wheels`  property, you can do the following with dot notation:

```
bicycle.wheels.width;

// 8

```

And with square bracket notation:

```
bicycle['wheels']['width'];

// 8

```

Again, both expressions are equivalent, and will each return  `8`.

### Dot Notation Limitations ⚠️

Note that while dot notation may be easier to read and write, it can't be used in every situation. For example, let's say there's a key in the above  `bicycle`  object that is a  _number_. An expression like  `bicycle.1;`  will cause a error, while  `bicycle[1];`  returns the intended value:

```js
bicycle.1;

// Uncaught SyntaxError: Unexpected number

bicycle[1];

// (returns the value of the `1` property)

```

Another issue is when variables are assigned to property names. Let's say we declare  `myVariable`, and assign it to the string  `'color'`:

```js
const myVariable = 'color';

```

`bicycle[myVariable];`  returns  `'blue'`  because the variable  `myVariable`  gets substituted with its value (the string  `'color'`) and  `bicycle['color']`'s value is  `'blue'`. However,  `bicycle.myVariable;`  returns  `undefined`:

```js
bicycle[myVariable];

// 'blue'

bicycle.myVariable;

// undefined

```

It may seem odd, but recall that all property keys in a JavaScript object are  _strings_, even if the quotation marks are omitted. With dot notation, the JavaScript interpreter looks for a key within  `bicycle`  whose value is  `'myVariable'`. Since there isn't such a key defined in the object, the expression returns  `undefined`.

## Creating Ojects
To create a new, blank (i.e., “empty”) object, you can use object **literal notation**, or the `Object()`  **constructor function**.

```js
// Using literal notation:

const myObject = {};

// Using the Object() constructor function:

const myObject = new Object();
```

PS: the recommended way to create new objects in JavaScript is to use literal notation.

## Modifying Properties
Keep in mind that data within objects are _mutable_, meaning that data can be changed.

```
const cat = {
  age: 2,
  name: 'Bailey',
  meow: function () {
    console.log('Meow!');
  },
  greet: function (name) {
    console.log(`Hello ${name}`);
  }
};


cat.age += 1;

cat.age;
// 3


cat.name = 'Lol';

cat.name;
// 'Lol

```

# Adding Properties
Properties can be added to objects simply by specifying the property name, then giving it a value. 

```
// start off with a blank object, then add two properties
const printer = {};

printer.on = true;
printer.mode = 'black and white';

```

The above example uses dot notation to add properties, but keep in mind that square bracket notation works just as well:

```
printer['remainingSheets'] = 168;
```

Likewise, we can add a method to the  `printer`  object in a similar manner. This time, the value of the property is an anonymous (i.e., unnamed) function:

```
printer.print = function () {
  console.log('The printer is printing!');
};
```

The complete  `printer`  object now looks like the following:

```js
{
  on: true,
  mode: 'black and white',
  remainingSheets: 168,
  print: function () {
    console.log('The printer is printing!');
  }
}
```

## Removing Properties

Recall that since objects are  _mutable_, not only can we modify existing properties (or even add new ones) -- we can also  _delete_  properties from objects.

Say that the  `printer`  object above actually doesn't have any modes (i.e.,  `'black and white'`,  `'color'`, etc.). We can go ahead and remove that property from  `printer`  using the  `delete`  operator.

```js
delete printer.mode;

// true

```

Note that  `delete`  directly mutates the object at hand. If we try to access a deleted property, the JavaScript interpreter will no longer be able to find the  `mode`  property because the  `mode`  key (along with its value,  `true`) have been deleted:

```js
printer.mode;

// undefined
```

## Passing Arguments
### Passing a Primitive
In JavaScript, a primitive (e.g., a string, number, boolean, etc.) is  _immutable_. In other words, any changes made to an argument inside a function effectively creates a  _copy_  local to that function, and does  _not_  affect the primitive  _outside_  of that function. 
```
function changeToEight(n) {
  n = 8; // whatever n was, it is now 8... but only in this function!
}

let n = 7;

changeToEight(n);

console.log(n);
// 7

```

`changeToEight()`  takes in a single argument,  `n`, and changes it to  `8`. However, this change only exists inside the function itself. We then pass the global variable  `n`  (which is assigned the value  `7`) into the function. After invoking it,  `n`  is still equal to  `7`.

### Passing an Object
On the other hand,  _objects_  in JavaScript are  _mutable_. If you pass an object into a function, Javascript passes a  _reference_  to that object. 

```
let originalObject = {
  favoriteColor: 'red'
};

function setToBlue(object) {
  object.favoriteColor = 'blue';
}

setToBlue(originalObject);

originalObject.favoriteColor;
// 'blue'
```

In the above example, `originalObject` contains a single property, `favoriteColor`, which has a value of `'red'`. We pass `originalObject` into the `setToBlue()` function and invoke it. After accessing `originalObject`'s `favoriteColor` property, we see that the value is now `'blue'`.

As objects in JavaScript are passed by reference, if we make changes to that reference, we're actually directly modifying the original object itself!

#### Re-assigning an object 
the same rule applies when re-assigning an object to a new variable, and then changing _that_ copy. Again, since objects are passed by reference, the original object is changed as well. 

```
const iceCreamOriginal = {
  Andrew: 3,
  Richard: 15
};


const iceCreamCopy = iceCreamOriginal;

iceCreamCopy.Richard;
// 15

iceCreamCopy.Richard = 99;

iceCreamCopy.Richard;
// 99

iceCreamOriginal.Richard;
// 99
```

ince objects are passed by reference, making changes to the copy (`iceCreamCopy`) has a direct effect on the original object (`iceCreamOriginal`) as well. In both objects, the value of the `Richard` property is now `99`.

## Comparing an Object with Another Object
```
const parrot = {
  group: 'bird',
  feathers: true,
  chirp: function () {
    console.log('Chirp chirp!');
  }
};

const pigeon = {
  group: 'bird',
  feathers: true,
  chirp: function () {
    console.log('Chirp chirp!');
  }
};

parrot === pigeon;
// false

const myBird = parrot;
myBird === parrot;

// true
```

As it turns out, the expression will only return `true` when comparing two _references_ to exactly the same object.


Objects are commonly created with  **literal notation**, and can include properties that point to functions called  **methods**. Methods are accessed the same way as other properties of objects, and can be  _invoked_  the same way as regular functions, except they automatically have access to the other properties of their parent object.

```
function sayHello () {
  console.log('Hi there!');
}

const developer = {
  name: 'Andrew'
};

developer.sayHello = function () {
  console.log('Hi there!');
};
```

This is how the updated  `developer`  object looks:

```
{
  name: 'Andrew',
  sayHello: function () {
    console.log('Hi there!');
  }
}
```

By default, objects are mutable (with a few exceptions), so data within them can be altered. New properties can be added, and existing properties can be modified by simply specifying the property name and assigning (or re-assigning) a value. Additionally, properties and methods of an object can be deleted as well with the  `delete`  operator, which directly mutates the object.


## Method and Functions
A **method** is a function property of an object. It is accessed the same way as any other property of the object (i.e., using dot notation or square bracket notation), and is invoked the same way as a regular function outside of an object (i.e., adding parentheses to the end of the expression).
### Example
expression that invokes the  `alerter()`  function in the following array,  `myArray`:

```
const myArray = [ function alerter() { alert('Hello!'); } ];
```
```
myArray[0]()
```

### A Method Can Access the Object it was Called On
Using `this`, methods can directly access the object that it is called on.

```
const triangle = {
  type: 'scalene',
  identify: function () {
    console.log(`This is a ${this.type} triangle.`);
  }
};

triangle.identify();

// 'This is a scalene triangle.'
```

Since an object is a collection of data and the means to operate on that data, a method can access the object it was called on using the special `this` keyword. The value of `this` is determined when a method is invoked, and its value is the object on which the method was called. Since `this` is a reserved word in JavaScript, its value cannot be used as an identifier.

### `this`  and Invocation

**How the function is invoked determines the value of  `this`  inside the function.**

## The  `window`  Object

If you haven't worked with the  `window`  object yet, this object is provided by the browser environment and is globally accessible to your JavaScript code using the identifier,  `window`. This object is not part of the JavaScript specification (i.e., ECMAScript); instead, it is developed by the  [W3C](https://www.w3.org/Consortium/).

This  `window`  object has access to a ton of information about the page itself, including:

-   The page's URL (`window.location;`)
-   The vertical scroll position of the page (`window.scrollY'`)
-   Scrolling to a new location (`window.scroll(0, window.scrollY + 200);`  to scroll 200 pixels down from the current location)
-   Opening a new web page (`window.open("https://www.udacity.com/");`)

### Example
```
const car = {
  numberOfDoors: 4,
  drive: function () {
     console.log(`Get in one of the ${this.numberOfDoors} doors, and let's go!`);
  }
};

const letsRoll = car.drive;

letsRoll();
```

**What does you think `this` refers to in the code above?**
Even though `car.drive` is a method, we're storing the function itself in the a variable `letsRoll`. Because `letsRoll()` is invoked as a regular function, `this` will refer to the `window` object inside of it.

Since the `window` object is at the highest (i.e., global) level, an interesting thing happens with global variable declarations. Every variable declaration that is made at the global level (outside of a function) automatically becomes a property on the `window` object!

### Globals and  `var`,  `let`, and  `const`
The keywords `var`, `let`, and `const` are used to declare variables in JavaScript. `var` has been around since the beginning of the language, while `let` and `const` are significantly newer additions (added in ES6).

Only declaring variables with the `var` keyword will add them to the `window` object. If you declare a variable _outside of a function_ with either `let` or `const`, it will _not_ be added as a property to the `window` object.

### Global Functions are Methods on  `window`
```
function learnSomethingNew() {
  window.open('https://www.udacity.com/');
}

window.learnSomethingNew === learnSomethingNew
// true

```

Declaring the  `learnSomethingNew()`  function as a global function declaration (i.e., it's globally accessible and not written  _inside_  another function) makes it accessible to your code as either  `learnSomethingNew()`  or  `window.learnSomethingNew()`.

## Object Methods
`Object()` constructor function can be used to create (i.e., instantiate) new objects with the `new` keyword.
```
const myNewFancyObject = new Object();
```

The  `Object()`  function actually includes a few methods of its own to aid in the development of your applications. 

To extract property names and values from an object, we can use:

-   `Object.keys()`  returns an array of a given object's own keys (property  _names_).
-   `Object.values()`  returns an array of a given object's own values (property  _values_).
