# 4 - Functional Programming JS

## Higher-Order Functions
In JavaScript, you can say that a function is Higher-Order if it:

- Takes in a function as an argument (a callback)
- Returns a function

### Example
```
weaponsWithNoises = [
        {name: 'Phaser', noise: 'bssszzsssss', universe: 'Star Trek'},
    {name: 'Blaster', noise: 'Pew Pew', universe: 'Star Wars'},
    {name: 'Sonic Screwdriver', noise: 'Pew Pew', universe: 'Dr. Who'},
    {name: 'Lightsaber', noise: 'Pew Pew', universe: 'Star Wars'},
    {name: 'Noisy Cricket', noise: 'Pew Pew', universe: 'Men in Black'}
]

function weaponsFromUniverse(universe) {
    const useableWeapons = weaponsWithNoises.filter(w => w.universe == universe)

    const useWeapon = (weaponName) => {
          const weapon = useableWeapons.find(w => weaponName == w.name)

          if (weapon) {
                console.log(`used ${weapon.name}: ${weapon.noise}`)
          } else {
                console.log(`${weaponName} is not a part of the ${universe} universe`)
          }
    }

    return useWeapon
}

const useStarWarsWeapon = weaponsFromUniverse('Star Wars')

useStarWarsWeapon('Blaster') // console logs 'used Blaster: Pew Pew'
useStarWarsWeapon('Noisy Cricket') // console logs 'Noisy Cricket is not a part of the Star Wars universe'

```