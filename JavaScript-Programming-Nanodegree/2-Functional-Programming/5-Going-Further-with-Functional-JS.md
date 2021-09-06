# 5 Going Further with Functional JS

## Immutable Data Structure vs. Persistent Data Structures

- persistent data structures: once a value is created it can never be changed. Persistant data Structure is a data structure that always preserves the previous version of itself when it is modified. Such data structures are effectively **immutable**, as their operations do not (visibly) update the structure in-place, but instead always yield a new updated structure.

## ImmutableJS  
ImmutableJS is a library that gives us Persistent Data Structures in JavaScript


### Map
```js
const Immutable = require('immutable');

// Map
const map = Immutable.Map({ 
  name: 'Wash',
  ship: {
      name: 'Serenity',
      class: 'Firefly'
  },
  role: 'Pilot',
});

// Map - Set operation

map.set('name','Augusto')
   .set('role','Commander');


console.log(map.toJS())

// Merge Maps

const mergedMap = map.merge(anotherRandomMap1, anotherRandomMap2);

```

### List
```js

const numbersList = Immutable.List([1, 2, 3])

console.log(Array.from(numbersList));

const myList1 = numbersList.set(0, '-1');
const myList1 = numbersList.set(1, '-2');
const myList1 = numbersList.set(2, '-3');
const myList2 = myList1.push('-4')
const myList2 = myList1.delete(3) // removing -4

```