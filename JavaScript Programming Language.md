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

augusto;
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

	// This console.log is printend!
	console.log(true);
}

```



