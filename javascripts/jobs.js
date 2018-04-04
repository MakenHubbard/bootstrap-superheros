
const genericHeroRequest = (successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", successFunction);
    myRequest.addEventListener("error", executeThisIfXHRFails);
    myRequest.open("GET", "/db/superheros.json")
    myRequest.send();
}

const startApplication = () => {
    genericHeroRequest(executeThisCodeAfterFileLoaded);
}
startApplication();
function executeThisCodeAfterFileLoaded() {
    const data = JSON.parse(this.responseText);
    const domString = buildDomString(data.superheroes);
}



function executeThisIfXHRFails() {
    console.log("error");
}

const buildDomString = (superheroesArray) => {
    let domString = '';
    superheroesArray.forEach((superheroes) => {
        domString += `<li>
                        <a class="hero-name" data-hero-id="${superheroes.id}"> ${superheroes.name}</a>
                      </li>`
        console.log(buildDomString);

    })
    printToDom(domString, "awesome-dropdown");
    addHeroSelectionEventListeners();
}

const selectHero = (e) => {
    selectedHero = ("clicked a hero",e.target.dataset.heroId);
    document.getElementById('awesome-button').classList.add('hide');
    genericHeroRequest(loadFileforSingleHero);
}

const addHeroSelectionEventListeners = () => {
   const heroNames = document.getElementsByClassName('hero-name');
    for (i=0; i<heroNames.length; i++){
        heroNames[i].addEventListener('click', selectHero);
    }
};

const displaySuperhero = heroes => {
    let domString = "";
    heroes.forEach(hero => {
      if (hero.id === selectedHero) {
        domString += `<div class="row">`;
        domString += `<div class="col-sm-4">`;
        if (hero.gender === "Male") {
          domString += `<img class="charImage maleImage" src="${
            hero.image
          }">`;
        } else {
          domString += `<img class="charImage femaleImage" src="${
            hero.image
          }">`;
        }
        domString += `</div>`;
        domString += `<div class="col-sm-6">`;
        domString += `<h2>Selected Hero: ${hero.name}</h2>`;
        domString +=     `<p class='charDescription'>${hero.description}</p>`;
        domString += `</div>`;
      }
    });
    printToDom(domString, "selectHero");
  };

function loadFileforSingleHero(){
    const data = JSON.parse(this.responseText);
    displaySuperhero(data.superheroes);
}


const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString
}
