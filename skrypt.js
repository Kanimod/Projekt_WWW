const showLogin = () => {
  document.getElementById("login-container").className = "shown";
}
  
const hideLogin = () => {
  document.getElementById("login-container").className = "hidden";
}  

const czas_zap = localStorage.getItem('zapis_czasu');

const czasss = new Date();

const dzien = czasss.toLocaleDateString('en-GB');

window.addEventListener('beforeunload', () => {
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  if (navType !== 'reload') {
    localStorage.setItem('zapis_czasu', dzien);
  }
});

document.getElementById("czas").innerHTML = czas_zap;


const toggleButton = document.getElementById('tryb');
const cialo = document.getElementById('cialo');
const glowa = document.getElementById('glowa');
const navbar = document.getElementById('navbar')
const zapiszTryb = localStorage.getItem('them');

if (zapiszTryb){
  cialo.classList.add(zapiszTryb);
  glowa.classList.add(zapiszTryb);
  navbar.classList.add(zapiszTryb);
} else{
  cialo.classList.add('jasno');
  glowa.classList.add('jasno');
  navbar.classList.add('jasno');
};

toggleButton.addEventListener('click', () => {
    if (cialo.classList.contains('jasno')) {
        cialo.classList.replace('jasno', 'ciemno');
        glowa.classList.replace('jasno', 'ciemno');
        navbar.classList.replace('jasno', 'ciemno');
        localStorage.setItem('them', 'ciemno');
    } else {
        cialo.classList.replace('ciemno', 'jasno');
        glowa.classList.replace('ciemno', 'jasno');
        navbar.classList.replace('ciemno', 'jasno');
        localStorage.setItem('them', 'jasno');
    }
});

function odapalWyszuk(){
  const zapyt = document.getElementById("wyszukiwanie").value.toLocaleLowerCase();
  const sekcje = document.getElementById("gryy").querySelectorAll("h2");
  let zanelzione = false;

  sekcje.forEach(function(sekcja){
    if (sekcja.textContent.toLocaleLowerCase().includes(zapyt)){
      sekcja.scrollIntoView({ behavior: "smooth", block: "center" })
      zanelzione = true;
    }
  });

  if (!zanelzione){
    document.getElementById("nieznaleziono").className="shown";
    document.getElementById("komunikat").innerHTML=zapyt;
  }

  document.getElementById("wyszukiwanie").value = "";
};
const zamknijPopUp = () =>{
  document.getElementById("nieznaleziono").className="hidden";
}

const wyszukiwanie = document.getElementById("wyszukiwanie");

if (wyszukiwanie) {
  wyszukiwanie.addEventListener("keydown", function(event) {
    if(event.key == "Enter"){
      odapalWyszuk();
    }
  });
}

document.getElementById('formularz_f').addEventListener('submit', function(event){
  event.preventDefault();

  const dane_f = new FormData(this);
  const dane = {
    jakosc: dane_f.get('jakosc'),
    ile_gier: dane_f.get('ile_gier'),
    ulub_gra: dane_f.get('ulub_gra'),
    opinia: dane_f.get('opinia')
  };

  fetch('http://localhost:3000/opinie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dane)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Form submitted:', result);
    alert('Dziękujemy za opinię!');
  })
  .catch(error => {
    console.error('Błąd podczas wysyłania:', error);
  });
});


fetch('db.json')
  .then(response => response.json())
  .then(data=>{
    const opiniLista = document.getElementById('zbior_opini');
    let licznik = 1;
    data.opinie.forEach(opinia =>{
      const li = document.createElement('li');
      li.textContent = `${licznik}. Jakość: ${opinia.jakosc} Ulubiona Gra: ${opinia.ulub_gra} Opinia: ${opinia.opinia}`;
      licznik += 1;
      opiniLista.appendChild(li);
    });
  })
  
  .catch(error => console.error('Error loading JSON:', error));