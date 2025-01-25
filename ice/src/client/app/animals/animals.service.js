/*
    Name: Johnvy Wilson
    filename: app.js
    Course: INFT 2202
    Date: Januiary 24, 2025
    Description: This is my general animal service script.
*/ 

/*
 *  Service constructor
 */
function AnimalService() {
    // if there is no entry for animals data in local storage
    if (!localStorage.getItem('animals')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // it creates a new entry in local storage and place an empty array.
        localStorage.setItem('animals', JSON.stringify([]))
    }    
}

AnimalService.prototype.getAnimals = function() {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('animals'));
}

AnimalService.prototype.saveAnimal = function(animal) {
    // fetch the list of animals
    const animals = this.getAnimals();
    // see if this animal already exists in the list
    if (animals.find(a => a.name == animal.name)) {
        // tell the user we cannot save this
        throw new Error('An animal with that name already exists!');
    }
    // if it doesn't, add it to the array
    animals.push(animal);
    // and save it in storage again
    localStorage.setItem('animals', JSON.stringify(animals));
    // tell the user all is well
    return true;
}

AnimalService.prototype.findAnimal = function(animalName) {
    return null;
}


AnimalService.prototype.updateAnimal = function(animal) {

    return false;
}


AnimalService.prototype.deleteAnimal = function(animal) {
    const animals = this.getAnimals();
    const idx = animals.findIndex(a => a.name == animal.name);
    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }
    animals.splice(idx, 1);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

const animalService = new AnimalService();