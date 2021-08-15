# JS Variables Functional Programming

## `let`
`let` is like var in that a value can be edited after it has been declared, but the scoping rules are different between the two.

## `const`
`const` does not go far enough to really be considered functional.

```js
const currentBook = 'The Time Machine'

const bookDetails = {
   title: 'The Time Machine',
   author: 'H. G. Wells',
   totalPages: 84,
   currentPage: 42
}

const library = ['Dune', 'Nineteen Eighty-Four', 'Ender`s Game', 'Hyperion', 'Fahrenheit 451']

currentBook = 'Stranger in a Strange Land'
// results in error, can't edit const value

bookDetails = {
   title: 'I, Robot',
   author: 'Isaac Asimov',
   totalPages: 253,
   currentPage: 21
}
// results in error, bookDetails is read-only

bookDetails.currentPage = 75
// this works! We can update values within a const object

library = ['Dune', 'Nineteen Eighty-Four']
// results in error, can't redeclare library

library.concat('The Hitchiker`s Guide to the Galaxy')
// this works! We can update items in the array or add to it
// Note that concat is the best non-mutative way to add items to an array
```

## `freeze`
Object Freeze is one way to deal with the shortcomings of const to ensure that objects cannot be changed. 

**This is the Mozilla definition object freeze:**

> A frozen object can no longer be changed.” A frozen object can have no properties added to it, removed from it, or its values edited. It effectively makes an immutable object.

```js
// ----------------------------------------------------------
// OBJECT FREEZE EXAMPLES
// ----------------------------------------------------------

const currentShow = {
    title: 'Dr. Who',
    seasons: 11,
    currentSeason: 4
}

// as a const, we can do this:
currentShow.currentSeason = 5
// expected output: { title: 'Dr. Who', seasons: 11, currentSeasons: 5 }

// but if we freeze the object
Object.freeze(currentShow);

currentShow.currentSeason = 6;
// this would actually cause an error

console.log(currentShow)
// expected output: {title: 'Dr. Who', seasons: 11, currentSeasons: 5 }
// now that it is frozen we can not update the current season of the current show
```

## `keys`
This method returns an array of strings of all an object’s property names.

```js
const character = {
    id: '12mn18udcbv9823',
    name: 'Chewbacca',
    race: 'Wookie',
    planet: 'Kashyyyk',
    job: 'First Mate'
};

console.log(Object.keys(character));
// expected output: Array ["id","name","race","planet","job"]
```

## `assign`
The object `assign` method **copies the properties from a source object to a target object**. All **properties in the source object that aren’t in the target will be created on the target**, and any **property** both objects **share**, the **values will be updated to match the source object**. 

```js
let state = {
    name: 'Wash',
    ship: {
        name: 'Serenity',
        class: 'Firefly'
    }
    role: 'Pilot',
    favoriteThing: { 
        item: "Toy", 
        details: {
                type: 'Toy Tyrannosaurus Rex'
        }
    }
}

const newState = {
    name: 'Mal',
    role: 'Captain',
    favoriteThing: {
        item: "Not complicated"
    },
    history: ["Browncoat sergeant"]
}

state = Object.assign(state, newState);
// Object.assign(state, newState)

console.log(state)
// expected output:
// { name: 'Mal',  ship: { name: 'Serenity', class: 'Firefly' },
//  role: 'Captain',
//  favoriteThing: { item: 'Not complicated' },
//  history: [ 'Browncoat sergeant' ] }
```