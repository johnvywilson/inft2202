/*
    Name: Johnvy Wilson
    filename: app.js
    Course: INFT 2202
    Date: January 24, 2025
    Description: This is my general create script.  
*/

javascript
console.log('we are on the add page');

document.getElementById('animal-form')
    .addEventListener('submit', submitAnimalForm);

async function submitAnimalForm(event) {
    event.preventDefault();
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm);
    if (valid) {
        console.log('were good');
        const formData = new FormData(animalForm);
        const animalObject = {};
        formData.forEach((value, key) => {
            if (key === 'eyes' || key === 'legs') {
                animalObject[key] = Number(value);
            } else {
                animalObject[key] = value;
            }
        });

        const eleNameError = animalForm.name.nextElementSibling;
        try {
            await animalService.saveAnimal(animalObject);
            eleNameError.classList.add('d-none');
            animalForm.reset();
            window.location = './list.html';
        } catch (error) {
            console.log(error);
            eleNameError.classList.remove('d-none');
            eleNameError.textContent = "This animal already exists!";
        }
    } else {
        console.log('were not good');
    }
}

function validateAnimalForm(form) {
    console.log('validating');
    let valid = true;

    const name = form.name.value.trim();
    const eleNameError = form.name.nextElementSibling;
    if (name === "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }

    const breed = form.breed.value.trim();
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "You must specify the breed!";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    const legs = form.legs.value.trim();
    const eleLegsError = form.legs.nextElementSibling;
    if (legs === "" || isNaN(legs) || Number(legs) < 0) {
        eleLegsError.classList.remove('d-none');
        eleLegsError.textContent = "Please enter a valid number of legs (0 or more).";
        valid = false;
    } else {
        eleLegsError.classList.add('d-none');
    }

    const eyes = form.eyes.value.trim();
    const eleEyesError = form.eyes.nextElementSibling;
    if (eyes === "" || isNaN(eyes) || Number(eyes) < 0) {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "Please enter a valid number of eyes (0 or more).";
        valid = false;
    } else {
        eleEyesError.classList.add('d-none');
    }

    const sound = form.sound.value.trim();
    const eleSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "Please specify the sound the animal makes.";
        valid = false;
    } else {
        eleSoundError.classList.add('d-none');
    }

    return valid;
}
