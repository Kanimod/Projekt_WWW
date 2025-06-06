document.querySelectorAll('.podglad').forEach(video => {
  const container = video.parentElement;

  container.addEventListener('mouseenter', () => {
    video.play();
  });

  container.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });
});

const showLogin = () => {
  document.getElementById("login-container").className = "shown";
}
  
const hideLogin = () => {
  document.getElementById("login-container").className = "hidden";
}  

let czyZalog = false;
let ktoZalog = "";

const logowanie_f = document.getElementById("logowanie");

if(logowanie_f){
  if(czyZalog == false){
    console.log(czyZalog);
    const loginButt = document.getElementById('zalog');
    const rejestrButt = document.getElementById('rejestr');

    loginButt.addEventListener('click', async () => {
    const loginWej = document.getElementById("login_t").value;
    const hasloWej = document.getElementById("haslo_t").value;

    try {
      const response = await fetch('http://localhost:3000/uzytkownicy');
      const uzytkownicy = await response.json();

      const dopasowanie = uzytkownicy.find(
        uzyt => uzyt.login === loginWej && uzyt.haslo === hasloWej
      );

      if (dopasowanie) {
        alert('Logowanie udane!');
        czyZalog = true;
        ktoZalog = loginWej;
        document.getElementById('czas-log').className = 'shown';
        hideLogin();
        logowanie_f.reset();
        console.log(czyZalog);
        document.getElementById("button-login").innerHTML = "Wyloguj sie";
      } else {
        alert('Logowanie nieudane :(');
        logowanie_f.reset();
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      logowanie_f.reset();
    }
  });
    
    rejestrButt.addEventListener('click', async () => {
    const loginWej = document.getElementById("login_t").value;
    const hasloWej = document.getElementById("haslo_t").value;
    const kalendarz = new Date();

    try {
      const response = await fetch('http://localhost:3000/uzytkownicy');
      const uzytkownicy = await response.json();

      const dopasowanie = uzytkownicy.find(uzyt => uzyt.login === loginWej);

      if (dopasowanie) {
        alert('Taki użytkownik już istnieje :(');
        logowanie_f.reset();
      } else {
        const dane = {
          login: loginWej,
          haslo: hasloWej,
          czas: kalendarz
        };

        const postResponse = await fetch('http://localhost:3000/uzytkownicy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dane)
        });

        if (postResponse.ok) {
          hideLogin();
          alert('Utworzyłeś konto!');
          czyZalog = true;
          ktoZalog = loginWej;
        } else {
          console.error("Błąd serwera przy dodawaniu użytkownika.");
        }
      }
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      logowanie_f.reset();
    }
  });
} else{
  const wylogBtn = document.getElementById('button-login');
};
}

if(czyZalog){
  const wylogBtn = document.getElementById('button-login');

  wylogBtn.addEventListener('clikc', async () => {
    console.log("wylogowanie");
    czyZalog = false;
  })
}


document.getElementById("czas").innerHTML = "aaaaa";
/*const czas_zap = localStorage.getItem('zapis_czasu');

const czasss = new Date();

const dzien = czasss.toLocaleDateString('en-GB');

window.addEventListener('beforeunload', () => {
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  if (navType !== 'reload') {
    localStorage.setItem('zapis_czasu', dzien);
  }
});

document.getElementById("czas").innerHTML = czas_zap;
*/

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

const opiniLista = document.getElementById('zbior_opini');

if(opiniLista){
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
}

const wyslijBtn = document.getElementById('wyslij_btn');
const formularz_f = document.getElementById('formularz_f');

if (wyslijBtn && formularz_f) {
  wyslijBtn.addEventListener('click', async () => {
    const dane_f = new FormData(formularz_f);
    const dane = {
      jakosc: dane_f.get('jakosc'),
      ile_gier: dane_f.get('ile_gier'),
      ulub_gra: dane_f.get('ulub_gra'),
      opinia: dane_f.get('opinia')
    };

    try {
      const response = await fetch('http://localhost:3000/opinie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dane)
      });

      if (response.ok) {
        formularz_f.reset();
        alert('dziekujemy za opienie')
      } else {
        console.error("Błąd serwera");
      }
    } catch (error) {
      console.error('Przesłanie nieudane', error);
    }
  });
}

