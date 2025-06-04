const showLogin = () => {
  document.getElementById("login-container").className = "shown";
}
  
const hideLogin = () => {
  document.getElementById("login-container").className = "hidden";
}  


const logowanie_f = document.getElementById("logowanie");

if(logowanie_f){
  const loginWej = document.getElementById("login_t").value;
  const hasloWej = document.getElementById("haslo_t").value;

  logowanie_f.addEventListener('submit', function(e) {
    e.preventDefault();
      
    fetch("http://localhost:3000/uzytkownicy")
    .then(response => response.json())
    .then(uzytkownicy =>{
      const dopasowanie = uzytkownicy.find(uzytkownik => uzytkownik.login === loginWej && uzytkownik.haslo === hasloWej);

      if(dopasowanie){
        alert('udalo sie zalogowac');
        document.getElementById("login-container").className = "hidden";
      } else {
        alert(':(((');
        this.reset();
      }
    })
    .catch(error => {
      console.error("problemy z otczytanie JSON: ", error);
    });
  });

  document.getElementById('rejestr').addEventListener('click', () => {
    
    const dane_rej = {
      login: loginWej,
      haslo: hasloWej
    }

    fetch('http://localhost:3000/uzytkownicy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dane_rej)
    })
    .then(response => response.json())
    .then(result => {
      console.log('Zarejestrowany:', result);
    })
    .catch(error => {
      console.error('Błąd podczas wysyłania:', error);
    });
  });

    alert("zaresjtrowales sie");
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

const formularz_f = document.getElementById('formularz_f');
const opiniLista = document.getElementById('zbior_opini');

if (formularz_f){
  fetch('http://localhost:3000/opinie')
  .then(response => response.json())
  .then(data => {
    let licznik = 1;
    data.forEach(opinia => {
      const li = document.createElement('li');
      li.textContent = `${licznik}. Jakość: ${opinia.jakosc}, Ulubiona Gra: ${opinia.ulub_gra}, Opinia: ${opinia.opinia}`;
      opiniLista.appendChild(li);
      licznik++;
    });
  })
  .catch(error => {
    console.error('Błąd przy ładowaniu opinii:', error);
  });

  formularz_f.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("Form submitted via JS");

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
      document.getElementById("udane").className="shown";

      const li = document.createElement('li');
      const licznik = opiniLista.children.length + 1;
      li.textContent = `${licznik}. Jakość: ${dane.jakosc}, Ulubiona Gra: ${dane.ulub_gra}, Opinia: ${dane.opinia}`;
      opiniLista.appendChild(li);

      formularz_f.reset();
    })
    .catch(error => {
      console.error('Błąd podczas wysyłania:', error);
    });
  });

  const zamknijPopUp2 = () =>{
      document.getElementById("udane").className="hidden";
  };
}

/*
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
*/

