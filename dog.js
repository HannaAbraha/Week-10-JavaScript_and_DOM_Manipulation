class Member {
    constructor(name, breed) {
        this.name = name;
        this.breed = breed;
    }
}
 //array will put all the members
class Dog {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.member = [];
    }
 //to add a member
    addMember(member) {
        this.members.push(member);
    }
 //to remove one member at a time
    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}
 //array of all dogs, and to increment ID each time 
let dogs = [];
let dogId = 0;
 //this will create a new value everytime it got clicked
onClick('new-dog', () =>{
    dogs.push(new Dog(dogId++, getValue('new-dog-name')));
    drawDOM();
});
 //instead of write code each time it will callback an action to pass on the Id
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}
 //it will take the id in getValue and produce a new element
function getValue(id) {
    return document.getElementById(id).value;
}
 //this is to add or conect the div from the html
function drawDOM() {
    let dogDiv = document.getElementById('dogs');
    clearElement(dogDiv);
    for (Dog of dogs) {
        let table = createDogTable(Dog);
        let title = document.createElement('h2');
        title.innerHTML = Dog.name;
        title.appendChild(createDeleteDogButton(Dog));
        dogDiv.appendChild(title);
        dogDiv.appendChild(table);
        for (member of dog.members) {
            createMemberRow(dog, table, member);
        } 
    }
}
 //this will creat a member row 
function createMemberRow(dog, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.breed;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(dog, member));
}
 //this will delete the row button 
function createDeleteRowButton(dog, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = dog.members.indexOf(member);
        dog.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}
 //this will delete the dog element
function createDeleteDogButton(dog) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Dog';
    btn.onclick = () => {
        let index = dogs.indexOf(dog);
        dogs.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewMemberButton(dog) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        dog.members. push(new Member(getValue(`name-input-${dog.id}`), getValue(`breed-input-${dog.id}`)));
        drawDOM();
    };
    return btn;
}
 //this will build the table for each dog type
function createDogTable(dog) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let breedcolumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    breedcolumn.innerHTML = 'Breed';
    row.appendChild(nameColumn);
    row.appendChild(breedcolumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let breedTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${dog.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let breedInput = document.createElement('input');
    breedInput.setAttribute('id', `breed-input-${dog.id}`);
    breedInput.setAttribute('type', 'text');
    breedInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(dog);
    nameTh.appendChild(nameInput);
    breedTh.appendChild(breedInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(breedTh);
    formRow.appendChild(createTh);
    return table;
}
 //this will clear the new element
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}