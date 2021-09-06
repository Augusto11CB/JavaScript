# JavaScript Programming Language

## Declaring Variables

### `let`
```javascript
let total = 12.00;

// declaring multiples variables
let price = 2.12,
	name = 'Augusto',
	alien = false; 
```

### `var`
**WARNING -** When misused, it does not show errors like in the example below:
```javascript
showMessage(price);
var price = 25
```

## `const`  - Constants
```javascript
// declaring a constant
const NUMBER_MAX = 12;
```

## `for`
```javascript
const monthlySales = new Set();
function addSale(newSale) {
	monthlySales.add(newSale);

	for(let total of monthlySales) console.log(total);
}
```

## String
###  Using The  ' ` '
```javascript
// declaring a constant
let name = 'Augusto';
let message = `Hello 

${name}`;

console.log(message);
```

**Output**
```
Hello

Augusto;
```

### Converting Strings to Numbers
```javascript
// declaring a constant
let numberOne= Number.parseFloat("123.12");

// When parsing an string only the first character must be a number
let numberTwo= Number.parseFloat("123.12A");

console.log(numberOne);
console.log(numberTwo);
```

**Output**
```
123.12
123.12
```

## Numbers

### Problemas with Number(Decimal Places) operations
```javascript
let number = 1.1 + 1.1;
// number will be printed as 2.20000004, or something like that

if(1.1 + 1.1 === 2.2) {
	// This console.log will not be executed because of the problem described above
	console.log(true);
}


// Making comparison with number of decimal places
if((1.1 + 1.1).toFixed(2) === 2.2) {
	// toFixed returns a string
	// in order to converte the string return from toFixed back into a a number use the '+'

	// This console.log is printed!
	console.log(true);
}

```

## Functions
```javascript
let myNiceFuncion = function () {
	console.log("here is a msg");
}

let myFuncion = function loggingFunction() {
	console.log("here is a msg");
}

// It works fine!!
myFuncion();

// It does not work
// Uncaughy ReferenceError:loggingFunction is not defined
loggingFunction();


// The idea to define the name for a `function expression` is for debugging purposes
myNiceFuncion(); 
```


### Function Scope
```javascript
function getSecretCode(value) {

	let keyGenerator = function() {
		let key = 12;
		console.log('in keyGenerator : ', key);
		return key;	
	}

	let code = value * keyGenerator();
	console.log('in getSecretCode: ', key)
	return code;
}

let secretCode = getSecretCode(2);
console.log('in out: ', secretCode )


/*
* in keyGenerator: 12
* in getSecretCode: 42
* in out: 24
*/
```

## JavaScript - Objects
### How an object is defined in JavaScript?
```javascript
let person = {
	name:"John",
	age:32,
	partTime:false
	showInfo: function() {
		console.log(this.name); // WE MUST PUT `this` keyword in order to access the object variable
	}
};
```

### How to change the values of object's properties
```
person.age = 33;
person['age'] = 44;
```

### Standard built-in objects 
#### `Date`
- [DOC](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
#### `Math`
- Math.sqrt()
- Math.random()
- Math.trunc() == The **`Math.trunc()`** function returns the integer part of a number by removing any fractional digits.
	```js
	console.log(Math.trunc(13.37));
	// expected output: 13

	console.log(Math.trunc(42.84));
	// expected output: 42
	```
- Math.max()
	```js
	console.log(Math.max(1, 3, 2));
	// expected output: 3

	console.log(Math.max(-1, -3, -2));
	// expected output: -1

	const array1 = [1, 3, 2];

	console.log(Math.max(...array1)); // we need these tree dots =( 
	// expected output: 3 
	```
	
#### `Number` 
- Number.parseInt(stringNumber, radix) 
	- stringNumber == The value to parse. If this argument is not a string, then it is converted to one using the ToString abstract operation.
	- radix == An integer between `2` and `36` that represents the _radix_ (the base in mathematical numeral systems) of the `string`. It is an optional parameter
- Checking whether values are numeric
	```js
	function sanitise(x) {
	  if (isNaN(x)) {
	    return Number.NaN;
	  }
	  return x;
	}
	```

#### `String` 
- String.charAt()
	```javascript
	const sentence = 'The quick brown fox jumps over the lazy dog.';

	const index = 4;

	console.log(`The character at index ${index} is ${sentence.charAt(index)}`);
	// expected output: "The character at index 4 is q"
	```
- String.concat()
	```javascript
	const str1 = 'Hello';
	const str2 = 'World';

	console.log(str1.concat(' ', str2));
	// expected output: "Hello World"

	console.log(str2.concat(', ', str1));
	// expected output: "World, Hello"
	```
	
#### `Map`
- Map.clear()
- Map.delete()
- Map.entries()
- Map.forEach()
- Map.get()
- Map.has()
- Map.keys()
- Map.set()
- Map.values()

#### `JSON`
- JSON.parse
	```js
	const json = '{"result":true, "count":42}';
	const obj = JSON.parse(json);

	console.log(obj.count);
	// expected output: 42

	console.log(obj.result);
	// expected output: true
	```
- JSON.stringify()
	```js
	console.log(JSON.stringify({ x: 5, y: 6 }));
	// expected output: "{"x":5,"y":6}"

	console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
	// expected output: "[3,"false",false]"

	console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
	// expected output: "{"x":[10,null,null,null]}"

	console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
	// expected output: ""2006-01-02T15:04:05.000Z""
	```

## Arrays
```js
let theArray= Array(3);
// theArray was created and has 3 empty slots ;
```

### `Arrays.of`
```js
let niceArray= Array.of(12,9,3);
// niceArray has 3 slots and in each one of then we have the 12, 9 and 3 respectively
```

### Spread Operator (`...myArray`)
```js
let mothlySales= Array.of(3000,1200,12200);
// theArray was created and has 3 empty slots ;

function addThreeMonthsIncome(m1, m2, m3){
    return m1 + m2 + m3;
}

let total = addThreeMonthsIncome(...mothlySales);

// instead of doing:
// let total = addThreeMonthsIncome(mothlySales[0], mothlySales[1], mothlySales[2]);
```

### Manipulating Arrays
```js
const values = ['a', 'b', 'c'];
```

#### `push()`
```js
values.push('d');
console.log(values); //a b c d
```

#### `pop()`
```js
const last = values.pop();
console.log(last); // c 
```

#### `shift`
```js
const first = values.shift();
console.log(first); // a 

// result values = ['b', 'c']
```

#### `unshift`
```js
values.unshift('z');
console.log(values); //  

// values = ['z','a', 'b', 'c'];
```

### Array.slice()
```js
const values = ['a', 'b', 'c'];
const newValues = values.slice(1,2);
console.log(newValues); // b
```

### Array.splice()
#### Deleting
```js
const values = ['a', 'b', 'c'];
values.splice(1,1); // index, number of elements to be deleted
console.log(newValues); // a c
```

#### Inserting
```js
const values = ['a', 'b', 'c'];
values.splice(1, 0, 'foo'); // index, number of elements to be  deleted after this item (including it), the element to be inserted
console.log(newValues); // 'a', 'foo', 'b', 'c'
```

### Array.filter()
```js
const values = ['a', 'b', 'c'];
const set = values.filter(function(item) {
	return item > 'b';
});
console.log(set); // a c
```

### Array.find()
```js
const values = ['a', 'bbb', 'c'];
const set = values.find(function(item) {
	return item.length > 1;
});
console.log(set); // a c

function findOver1000() {
	return monthlySales.find(element => element > 1000);
}
```

## Set
### `forEach`
```js
const mySet = new Set();
// value1 == value2, and value 1 come from mySet;
mySet((value1, value2, mySet) => {
	console.log(value1;
});
```

## Map
```js
const monthlySales = new Map();
monthlySales.set(1, 'test');
```

## DOM - Document Object Model
Modifying the web page and getting events from an user using the web page.


## Destructuring Assignment
The destructuring assignment syntax is a JavaScript expression that makes it possible to **unpack** values from arrays, or properties from objects, into distinct variables.

```js
let { fadeAnim } = this.state;
```

Equals

```js
let fadeAnim = this.state.fadeAnim;
```

### Array Destructuring
```js
const foo = ['one', 'two', 'three'];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```

## Three dots ( `…` ) in JavaScript
- Spread Operator
- Rest Operator
- [Reference](https://dev.to/sagar/three-dots---in-javascript-26ci)

### Rest Parameters 
With rest parameters it is possible to gatter any number of arguments into an array.

```js
function myFunc(a, b, ...args) {
 console.log(a); // 22
 console.log(b); // 98
 console.log(args); // [43, 3, 26]
};

myFunc(22, 98, 43, 3, 26);
```

### Rest parameters Can Be Destructured

```js
function myFunc(...[x, y, z]) {
  return x * y * z;
}

myFunc(1)          // NaN
myFunc(1, 2, 3)    // 6
myFunc(1, 2, 3, 4) // 6 (fourth parameter is not destructured)
```

### Spread Operators
Spread operator is used to expand elements of an iterable (like an array) into places where multiple elements can fit.

```js
function myFunc(x, y, ...params) { // used rest operator here
  console.log(x);
  console.log(y);
  console.log(params);
}

var inputs = ["a", "b", "c", "d", "e", "f"];
myFunc(...inputs); // used spread operator here
// "a"
// "b"
// ["c", "d", "e", "f"]
```

```js
const featured = ['Deep Dish', 'Pepperoni', 'Hawaiian'];
const specialty = ['Meatzza', 'Spicy Mama', 'Margherita'];

const pizzas = [...featured, 'veg pizza', ...specialty];

console.log(pizzas); // 'Deep Dish', 'Pepperoni', 'Hawaiian', 'veg pizza', 'Meatzza', 'Spicy Mama', 'Margherita'
```

```js
var obj1 = { foo: 'bar', x: 42 };
var obj2 = { foo: 'baz', y: 13 };

var clonedObj = { ...obj1 };
// Object { foo: "bar", x: 42 }

var mergedObj = { ...obj1, ...obj2 };
// Object { foo: "baz", x: 42, y: 13 }
```

```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
console.log(a); // 10 
console.log(b); // 20 
console.log(rest); // { c: 30, d: 40 }
```

```js
// An array of HTMLElement, not the annoying NodeList object
const array = [...document.querySelectorAll('div')]; 
```