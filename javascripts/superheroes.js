const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    myRequest.addEventListener("error", executeThisIfXHRFails);
    myRequest.open("GET","/db/superheros.json")
    myRequest.send();
}

startApplication();

function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    const domString = buildDomString(data.superheroes);
    printToDom(domString,"supers");
} 

function executeThisIfXHRFails (){
    console.log("error");
}

const buildDomString = (superheroesArray) => {
    let domString = '';
    superheroesArray.forEach((superheroes) => {
        domString += `<div class="supers">
                        <h3>${superheroes.id}</h3>
                     </div>`
                     console.log(buildDomString);
    })
    return domString;
}


const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString
}