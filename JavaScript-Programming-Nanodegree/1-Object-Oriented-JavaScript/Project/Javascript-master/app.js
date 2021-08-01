
class Animal {
    constructor(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet.toLowerCase();
    }

    getImageURL() {
        return `./images/${this.species.toLowerCase()}.png`
    }
}

class Dino extends Animal {
    constructor(species, weight, height, diet, where, when, fact) {
        super(species, weight, height, diet);
        this.where = where;
        this.when = when;
        this.facts = [fact, `${species} lived in ${where}.`, `${species} lived during ${when}.`];
    }

    getGrid() {
        let factToShow = null;
        
        if (this.species.toLowerCase() === "pigeon") factToShow = this.facts[0]
        else factToShow = this.facts[Math.floor(Math.random() * this.facts.length)]
        
        return `
            <div class='grid-item'>
                <h3>${this.species}</h3>
                <img src='${this.getImageURL()}' alt='Image of a ${this.species}'>
                <h4>${factToShow}</h4>
            </div>
        `
    }
}

class Human extends Animal {
    constructor(name, weight, height, diet) {
        super('human', weight, height, diet);
        this.name = name;
    }

    getGrid() {
        return `
            <div class='grid-item'>
                <h3>${this.name}</h3>
                <img src='${this.getImageURL()}' alt='Image of a ${this.species}'>
            </div>
        `
    }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (human) {
    const factor = Math.round(parseFloat(this.height) / parseFloat(human.height))

    let comparison = ""

    if (this.height > human.height) {
        comparison = `${this.species} is ${factor} times taller than ${human.name}`
    } else if (this.height < human.height) {
        comparison = `${this.species} is ${factor} times shorter than ${human.name}`
    } else {
        comparison = `${this.species} is as tall as ${human.name}`
    }
    this.facts.push(comparison)
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function (human) {
    const factor = Math.round(parseFloat(this.weight) / parseFloat(human.weight))

    let comparison = ""

    if (this.weight > human.weight) {
        comparison = `${this.species} is ${factor} times taller than ${human.name}`
    } else if (this.height < human.weight) {
        comparison = `${this.species} is ${factor} times shorter than ${human.name}`
    } else {
        comparison = `${this.species} is as tall as ${human.name}`
    }
    this.facts.push(comparison)
}


Dino.prototype.compareDiet = function (human) {
    const humanDiet = human.diet.toLowerCase()
    let comparison = ""
    if (this.diet === humanDiet) {
        comparison = `${this.species} has the same diet (${this.diet}) as ${human.name}"`
    } else {
        comparison = `${this.species} has different diet (${this.diet}) from ${human.name} (${humanDiet})`
    }
    this.facts.push(comparison)
}


// async function createDinos() {
//     let data = await fetch("https://raw.githubusercontent.com/udacity/Javascript/master/dino.json")
//         .then(response => response.json())
//         .catch(err => console.log(err))
//     dinos = data.Dinos.map(
//         dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact))
//     return dinos
// }

// let dinos = createDinos();


const getDinos = async () => {
    try {
        // const data = await fetch('dino.json'); // i am having cors problem here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        const data = await fetch("https://raw.githubusercontent.com/udacity/Javascript/master/dino.json")
        const json = await data.json();
        const dinos = [];
        json.Dinos.map(dino => {
            // abrindo o objeto dino e salvando atributos em constantes
            const { species, weight, height, diet, where, when, fact } = dino;
            dinos.push(new Dino(species, weight, height, diet, where, when, fact));
        });
        return dinos;
    } catch (error) {
        console.error(error);
    }
}

const handleCompare = async () => {

    const name = document.querySelector('#name').value.trim();
    const feet = document.querySelector('#feet').value.trim();
    const inches = document.querySelector('#inches').value.trim();
    const weight = document.querySelector('#weight').value.trim();
    const diet = document.querySelector('#diet').value.trim();


    if (!name || !feet || !inches || !weight || !diet) {
        alert('All the fields of the form must be filled');
        return;
    }

    document.querySelector('#dino-compare').style.display = 'none';
    document.querySelector('#compare-again').style.display = 'block';

    let human = new Human(name, weight, ((feet * 12) + inches), diet);
    let dinos = await getDinos();

    dinos.map(dino => {
        dino.compareWeight(human)
        dino.compareHeight(human)
        dino.compareDiet(human)
    });

    displayGrid(human, dinos);
}

function displayGrid(human, dinos){

    const [firstDino, secondDino, thirdDino, fourthDino, ...restDinos] = dinos;
    const animals = [firstDino, secondDino, thirdDino, fourthDino, human, ...restDinos];
    
    const grid = document.querySelector('#grid');
    let HTMLGrid = '';
    
    for (animal of animals) {
        HTMLGrid = HTMLGrid.concat(animal.getGrid());
    }
    grid.innerHTML = HTMLGrid;
}

const handleCompareAgain = () => {
    document.querySelector('#grid').innerHTML = '';
    document.querySelector('#dino-compare').style.display = 'block';
    document.querySelector('#compare-again').style.display = 'none';
}

(() => {
    document.querySelector('#compare').addEventListener('click', handleCompare);
    document.querySelector('#compare-again').addEventListener('click', handleCompareAgain);
})();

// Create Human Object
// let humanFactory = function (name, height, weight, diet) {
//     let _name = name;
//     let _height = height;
//     let _weight = weight;
//     let _diet = diet;

//     let humamPrototype = {
//         getName: function () {
//             return _name;
//         },

//         getWeight: function () {
//             return _weight;
//         },

//         getHeight: function () {
//             return _height;
//         },

//         getDiet: function () {
//             return _diet;
//         }
//     }

//     return humamPrototype;
// }

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

// const humanData = (function () {
//     let human = humanFactory(
//         document.getElementById("name").value,
//         parseInt(document.querySelector('#feet').value) * 12 + parseInt(document.querySelector('#inches').value),
//         parseInt(document.getElementById("weight").value),
//         this.diet = document.getElementById("diet").value.toLowerCase()
//     );

//     return human;
// })();

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


// Generate Tiles for each Dino in Array
// Add tiles to DOM
// function addTiles(objects) {
//     const grid = document.getElementById("grid")
//     objects.map(obj => {
//         let gridItem = document.createElement("div")
//         gridItem.className = "grid-item"


//         // Name
//         let gridItemH = document.createElement("h3")
//         let name = (obj.species) ? obj.species : obj.getName()
//         gridItemH.appendChild(document.createTextNode(name))
//         gridItem.appendChild(gridItemH)

//         let gridItemImg = document.createElement("img")
//         gridItemImg.src = (obj.species) ? `./images/${name.toLowerCase()}.png` : `./images/human.png`
//         gridItem.appendChild(gridItemImg)

//         let gridItemFact = document.createElement("p")
//         let fact = ""
//         if (obj.species) {
//             if (name.toLowerCase() === "pigeon") fact = obj.facts[0]
//             else fact = obj.facts[Math.floor(Math.random() * obj.facts.length)]
//         }
//         gridItemFact.appendChild(document.createTextNode(fact))
//         gridItem.appendChild(gridItemFact)

//         grid.append(gridItem)
//     })
// }


// // Remove form from screen

// function removeForm() {
//     let form = document.getElementById("dino-compare")
//     form.innerHTML = ""
// }


// // On button click, prepare and display infographic
// const button = document.getElementById("btn")

// button.addEventListener("click", (function () {
//     // Create human object
//     //const human = new createHuman()
//     const human = humanData;

//     // Compare
//     dinos.map(dino => {
//         dino.compareWeight(human)
//         dino.compareHeight(human)
//         dino.compareDiet(human)
//     })
//     // Remove form
//     removeForm()
//     // Add tiles
//     dinos.splice(4, 0, human)
//     addTiles(dinos)
// }))
