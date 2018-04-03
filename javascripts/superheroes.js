const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisIfXHRFails);
    myRequest.open("GET", "/db/superheros.json")
    myRequest.send();
}

startApplication();

function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    const domString = buildDomString(data.superheroes);
    printToDom(domString, "supers");
}

function executeThisIfXHRFails() {
    console.log("error");
}

const buildDomString = (superheroesArray) => {
    let domString = '';
    superheroesArray.forEach((superheroes) => {
        domString += `<div class="col-sm-3"> 
                         <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 class="panel-title">${superheroes.name}</h3>
                            </div>
                        <div class="panel-body">`;
                        if (superheroes.gender === 'Male'){
                            domString += `<img class="charImage maleImage" src="${superheroes.image}">`
                        } else {
                            domString += `<img class="charImage femaleImage" src="${superheroes.image}">`
                        }
                            domString += `<p class="charDescription">${superheroes.description}</p>
                        </div>
                        </div>
                     </div>`
        console.log(buildDomString);

    })
    return domString;
}


const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString
}