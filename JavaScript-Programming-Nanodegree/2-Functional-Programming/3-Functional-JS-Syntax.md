## Array Methods
- `map` resulting **new array** will always be the same lenght as the original, with the same action applied to all items
- `filter` resulting array will always be a subset of the original, values are unchanged
- `reduce` result will be one value, the accumulated total of a property or value shared by every item in the original array


```
const captains = ['Picard', 'Adama', 'Reynolds', 'Beeblebrox']

// create new array
const titles = captains.map(cap => `Captain ${cap}`)

// equivalent to
const titles = captains.map(cap => {
    return `Captain ${cap}`
})

console.log('Resulting Array: ', titles)
// expected output: Resulting Array: ['Captain Picard', 'Captain Adama', 'Captain Reynolds', 'Captain Beeblebrox']
console.log('Original Array:', captains)
// is unchanged, expected output: Original Array: ['Picard', 'Adama', 'Reynolds', 'Beeblebrox']
```

### Examples - `map`
```js
// 1. Write a map function to reverse this array:
const start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

start.map((val, index, array) => array[array.length -1 - index])

start.map(item => item).reverse();

start.slice(0).reverse();

start.map(function (el, index, coll) {
    console.log(el + " " + index+ " " + coll + " -----" )
});
```

```js

// 2. Write a map function to print the Job: Name:
const shipMates = [["Mal", "Captain"], ["Wash", "Pilot"], ["Zoey", "1st Mate"], ["Jayne", "Public Relations"]]

// your code
shipMates.map( array => {
 return array[1] + ": " + array[0]  
});

const result = shipMates.map(arr => arr.reverse().join(': '))

// expected output: Array ["Captain: Mal", etc...]

```

```js
// 3. Write a map function that prints the name: even|odd
const awayTeam = ["Picard", "Riker", "Troy", "Data"]

// your code

awayTeam.map(name => name + ": " + ((name.length % 2)  == 0 ? "even" : "odd"));

const result = awayTeam.map((name, i) => `${name}: ${i % 2 === 0 ? 'even' : 'odd'}`)


// expected output: Array: ["Picard: even", "Riker: odd", etc...]

```

```js
// 4. Create a multidimensional array of each item and its index in the original Array.

const sci_fi_shows = ['Manedlorian', 'Enterprise', 'Firefly', 'Battlestar Galactica']

// your code

sci_fi_shows.map((el, ind) => [el, ind]);


// expected output: Array [['Manedlorian', 0], ['Enterprise', 1], ['Firefly', 2], ['Battlestar Galactica', 3]]

```

```js
// 5. For each item in this array, create a multidimensional array containing the entire original array.

const numbers = [1, 2, 3, 4]

// your code
numbers.map((i, x, arryy) => arryy);

// expected output: Array [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]


```


### The `map` and Callback Function

```js
// Callback function
map(callbackFn)
map(callbackFn, thisArg)
```

#### Example
```js
var numbers = [1,2,3,4,5,6,7,8,9,10];

function callback(element) {
  return element + this.add;
};

var mapped = numbers.map(callback, {
  add: 10
});

console.log(mapped);
```

```js
var array = ['one', 'two', 'skip-a-few', 'three', 'four']

console.log(
    array.map(function (element) {
        return original('other', 'variables', element)
    })
)


// this function doesn't matter, just an example
function original(a, b, c) {
    return a + ' ' + b + ' ' + c
}



// One common thing we use `map` for in real life is to reformat objects to have a shape that is better for our purposes. For instance, we only care about the name and first three characters of the id for the races below. Use `map` to grab those values and create a new array with them.

var index = [
    {key: 1, sector: 10, t_score: 18, id: '1236n7e8', value: 'Klingon'},
    {key: 4, sector: 145, t_score: 12, id: '293847hs8', value: 'Minbari'},
    {key: 8, sector: 214, t_score: 5, id: '283hy8347', value: 'Cylon'},
    {key: 3, sector: 8346, t_score: 10, id: 'n9837ks857', value: 'Jawa'},
]

const result = index.map((race) => {
    return { name: race.value, idFirstThree: race.id.substring(0,3)}
})
```

### The `filter` Function
The filter method is a separator. Give it a function with the logic to distinguish the items. In the end, it creates a new array that contains only the elements that our function allowed. So the ONLY difference between filter and map is that map performs a function on every item in an array, and filter uses a true or false conditional on every item in the array to decide if that value should be kept or discarded. This means that one key differentiator of the filter method is its callback method must return either true or false.

#### Examples `filter`

```js
const words = ['tardis', 'grok', 'frak', 'blaster', 'klingon', 'shepherd'];
const result = words.filter(word => word.length > 7);
```

### The `reduce` Method
This method boils our array down to a single value. For example, if you have an array of products, each with a price, you could use reduce to sum the price values of each item and return a single total cost. 

The `reduce` only passes the callback **two** arguments, the total so far - or accumulator, and the current item.

```js

const sales = [120.00, 19.99, 3.50, 4.00];

const total = sales.reduce((runningTotal, currentValue) => {
    console.log(runningTotal, currentValue)
    return runningTotal + currentValue
})

// cycle 1: 120 19.99
// cycle 2: 139.99 3.5
// cycle 3: 143.49 4

// expected output: 147.49
```

```js
// 2. Return the winning team
const scores = [
    {
        team: 'A',
        score: 20
    },
    {
        team: 'B',
        score: 17
    },
    {
        team: 'C',
        score: 23
    },
    {
        team: 'D',
        score: 13
    }
]

const high = scores.reduce((highValue, currentValue) => {
   if (currentValue.score > highValue.score)
     return currentValue;
   else
     return highValue;
})
```

### Summary

Map - The map method iterates over every item in the array it is called on, and performs one action on each item. The action logic is held in a callback function. The map method returns a new array that is the same length as the original array, but with the items updated according to the callback function logic.

Filter - The filter method iterates over every item in the array it is called on, and runs each item through a pass or fail checking logic. The logic is held in a callback function which must return either true or false. The filter method returns a new array that is shorter than the original array (or potentially the same length, if all values passed successfully through the callback), but the values that pass through will be unchanged.

Reduce - The reduce method iterates over every item in the array it is called on, and keeps one value (for instance, the sum of all prices). Each item in the array is forgotten, and the end result is a single value. The uses of reduce vary greatly depending on your need, and it is typically the hardest one of the three array methods to master because though its logic is not complicated, its use cases can be very creative.

### The `flat` Method
"`flat` method is a tool that allows you to undo array nesting to exactly the level you want."

```js
var nestedArr = [1, 2, [3, 4, [5, 6]]];
nestedArr.flat();
console.log(nestedArr)
// expected output: [1, 2, 3, 4, [5, 6]]

var moreNested = [1, 2, [3, 4, [5, 6]]];
moreNested.flat(2);
console.log(moreNested)
// expected output: [1, 2, 3, 4, 5, 6]
```

###  The `find` Method 
`find` returns the value of the first element in the provided array that satisfies the provided testing function.

"It is best to use find when you want to see if any item in array meets a criteria. find is a little bit simpler in that it only passes a single argument (the current value) and returns a single value from the array (the first one to pass the function’s test)"

### The `include` Method
`includes` determines whether an array contains a certain value among its entries, returning true or false as appropriate.

```
const ids = [
    'ADHKE',
    'ANFKM',
    'QIMVU',
    'PQMFU',
    'ABCKO',
    'IUABC'
]

const abc = ids.find(x => x.includes('ABC'))
console.log(abc) // expected output: ABCKO
// IUABC also includes 'ABC' but the find method won't change the output for any additional occurances of finding 'ABC'.

```