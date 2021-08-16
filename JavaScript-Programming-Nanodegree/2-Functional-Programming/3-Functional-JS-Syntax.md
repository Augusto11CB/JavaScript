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

### Examples
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


### `map` and Callback function

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