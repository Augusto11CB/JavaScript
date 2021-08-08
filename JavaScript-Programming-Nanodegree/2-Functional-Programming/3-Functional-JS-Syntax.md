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