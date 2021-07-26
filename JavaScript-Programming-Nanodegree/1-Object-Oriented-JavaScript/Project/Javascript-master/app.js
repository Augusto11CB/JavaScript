
// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.facts = [fact, `${species} lived in ${where}.`, `${species} lived during ${when}.`];
}

// Create Dino Objects
// async function createDinos() {
//     // const dinoJson = await fetch("./dino.json");
//     const dinoJson = await fetch("https://raw.githubusercontent.com/udacity/Javascript/master/dino.json")
//     const data = await dinoJson.json();

//     const dinosArray = data.Dinos.map(
//         // dino => new Dinosaur(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact))
//         dino => {
//             let { species, weight, height, diet, where, when, fact } = dino;
//             return new Dino(species, weight, height, diet, where, when, fact)
//         });

//     return dinosArray;
// }

async function createDinos() {
    let data = await fetch("https://raw.githubusercontent.com/udacity/Javascript/master/dino.json")
        .then(response => response.json())
        .catch(err => console.log(err))
    dinos = data.Dinos.map(
        dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact))
    return dinos
}

let dinos = createDinos();

// Create Human Object
let humanFactory = function (name, height, weight, diet) {
    let _name = name;
    let _height = height;
    let _weight = weight;
    let _diet = diet;

    let humamPrototype = {
        getName: function () {
            return _name;
        },

        getWeight: function () {
            return _weight;
        },

        getHeight: function () {
            return _height;
        },

        getDiet: function () {
            return _diet;
        }
    }

    return humamPrototype;
}

// function Human(name, height, weight, diet) {
//     let name = name;
//     let weight = weight;
//     let height = height;
//     let diet = diet;

//     function getName() {
//         return this.name;
//     }

//     function getWeight() {
//         return this.weight;
//     }

//     function getHeight() {
//         return this.height;

//     }

//     function getDiet() {
//         return this.diet;
//     }

//     return {
//         getName: getName,
//         getDiet: getDiet,
//         getHeight: getHeight,
//         getWeight: getWeight

//     };

// }

// Use IIFE to get human data from form

const humanData = (function () {
    let human = humanFactory(
        document.getElementById("name").value,
        parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value),
        parseInt(document.getElementById("weight").value),
        this.diet = document.getElementById("diet").value.toLowerCase()
    );

    return human;
})();

// const humanData = (function createHuman() {
//     let human =  new Human(
//         document.getElementById("name").value,
//         parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value),
//         parseInt(document.getElementById("weight").value),
//         this.diet = document.getElementById("diet").value.toLowerCase()
//     );

//     return {

//     }
// })();




// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


Dino.prototype.compareHeight = function (human) {
    const factor = Math.round(parseFloat(this.height) / parseFloat(human.getHeight()))

    let comparison = ""

    if (this.height > human.getHeight()) {
        comparison = `${this.species} is ${factor} times taller than ${human.getName()}`
    } else if (this.height < human.getHeight()) {
        comparison = `${this.species} is ${factor} times shorter than ${human.getName()}`
    } else {
        comparison = `${this.species} is as tall as ${human.getName()}`
    }
    this.facts.push(comparison)
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function (human) {
    const factor = Math.round(parseFloat(this.weight) / parseFloat(human.getWeight()))

    let comparison = ""

    if (this.weight > human.getWeight()) {
        comparison = `${this.species} is ${factor} times taller than ${human.getName()}`
    } else if (this.height < human.getWeight()) {
        comparison = `${this.species} is ${factor} times shorter than ${human.getName()}`
    } else {
        comparison = `${this.species} is as tall as ${human.getName()}`
    }
    this.facts.push(comparison)
}


Dino.prototype.compareDiet = function (human) {
    const humanDiet = human.getDiet().toLowerCase()
    let comparison = ""
    if (this.diet === humanDiet) {
        comparison = `${this.species} has the same diet (${this.diet}) as ${human.getName()}"`
    } else {
        comparison = `${this.species} has different diet (${this.diet}) from ${human.getName()} (${humanDiet})`
    }
    this.facts.push(comparison)
}


// Generate Tiles for each Dino in Array
// Add tiles to DOM
function addTiles(objects) {
    const grid = document.getElementById("grid")
    objects.map(obj => {
        let gridItem = document.createElement("div")
        gridItem.className = "grid-item"


        // Name
        let gridItemH = document.createElement("h3")
        let name = (obj.species) ? obj.species : obj.getName()
        gridItemH.appendChild(document.createTextNode(name))
        gridItem.appendChild(gridItemH)

        let gridItemImg = document.createElement("img")
        gridItemImg.src = (obj.species) ? `./images/${name.toLowerCase()}.png` : `./images/human.png`
        gridItem.appendChild(gridItemImg)

        let gridItemFact = document.createElement("p")
        let fact = ""
        if (obj.species) {
            if (name.toLowerCase() === "pigeon") fact = obj.facts[0]
            else fact = obj.facts[Math.floor(Math.random() * obj.facts.length)]
        }
        gridItemFact.appendChild(document.createTextNode(fact))
        gridItem.appendChild(gridItemFact)

        grid.append(gridItem)
    })
}


// Remove form from screen

function removeForm() {
    let form = document.getElementById("dino-compare")
    form.innerHTML = ""
}


// On button click, prepare and display infographic
const button = document.getElementById("btn")

button.addEventListener("click", (function () {
    // Create human object
    //const human = new createHuman()
    const human = humanData;

    // Compare
    dinos.map(dino => {
        dino.compareWeight(human)
        dino.compareHeight(human)
        dino.compareDiet(human)
    })
    // Remove form
    removeForm()
    // Add tiles
    dinos.splice(4, 0, human)
    addTiles(dinos)
}))