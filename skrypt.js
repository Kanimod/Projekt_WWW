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


let ktoZalog = localStorage.getItem("ktoZalog");
let czyZalog = localStorage.getItem("czyZalog");
let zapisz = localStorage.getItem("zapsiz");

console.log(czyZalog);
console.log(zapisz);

if(czyZalog == "true" || zapisz == "true"){
  console.log(czyZalog);
  document.getElementById("button-login").innerHTML = "Wyloguj sie";
  document.getElementById('czas-log').className = 'shown';
  document.getElementById("czas").innerHTML = ktoZalog;
} else{
  ktoZalog = null; 
  czyZalog = null;
  this.localStorage.setItem("ktoZalog", ktoZalog);
  this.localStorage.setItem("czyZalog", czyZalog);
}


const logowanie_f = document.getElementById("logowanie");
const zalogWylog = document.getElementById('button-login')

console.log(czyZalog);

if(zalogWylog){
  zalogWylog.addEventListener('click', async () => {
    if(czyZalog == null){
      showLogin();
      const loginButt = document.getElementById('zalog');
      const rejestrButt = document.getElementById('rejestr');

      loginButt.addEventListener('click', async () => {
        
        const dane_log = new FormData(logowanie_f);
        const dane_l = {
          login: dane_log.get('login'),
          haslo: dane_log.get('haslo'),
          zapisz: dane_log.get('zapamietaj')
        }

        try {
          const response = await fetch('http://localhost:3000/uzytkownicy');
          const uzytkownicy = await response.json();

          const dopasowanie = uzytkownicy.find(
            uzyt => uzyt.login === dane_l.login && uzyt.haslo === dane_l.haslo
          );

          if (dopasowanie) {
            alert('Logowanie udane!');
            czyZalog = "true";
            ktoZalog = dane_l.login;
            localStorage.setItem("czyZalog", czyZalog);
            localStorage.setItem("ktoZalog", ktoZalog);
            document.getElementById('czas-log').className = 'shown';
            document.getElementById("czas").innerHTML = dane_l.login;
            hideLogin();
            logowanie_f.reset();
            console.log(czyZalog);
            document.getElementById("button-login").innerHTML = "Wyloguj sie";
            if(dane_l.zapisz == "true"){
              zapisz = "true"
              localStorage.setItem("zapsiz", zapisz);
            }
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
          const dane_log = new FormData(logowanie_f);
          const dane_l = {
          login: dane_log.get('login'),
          haslo: dane_log.get('haslo'),
          zapisz: dane_log.get('zapamietaj'),
          }

        try {
          const response = await fetch('http://localhost:3000/uzytkownicy');
          const uzytkownicy = await response.json();

          const dopasowanie = uzytkownicy.find(uzyt => uzyt.login === dane_l.login);

          if (dopasowanie) {
            alert('Taki użytkownik już istnieje :(');
            logowanie_f.reset();
          } else {
            const postResponse = await fetch('http://localhost:3000/uzytkownicy', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dane_l)
            });

            if (postResponse.ok) {
              hideLogin();
              alert('Utworzyłeś konto!');
              czyZalog = "true";
              ktoZalog = dane_l.login;
              localStorage.setItem("czyZalog", czyZalog);
              localStorage.setItem("ktoZalog", ktoZalog);
              document.getElementById('czas-log').className = 'shown';
              document.getElementById("czas").innerHTML = dane_l.login;
              document.getElementById("button-login").innerHTML = "Wyloguj sie";
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
    alert("Zostałes wylogowany");
    czyZalog = null;
    ktoZalog = null;
    localStorage.setItem("czyZalog", czyZalog);
    localStorage.setItem("ktoZalog", ktoZalog);
    document.getElementById('czas-log').className = 'hidden';
    document.getElementById("button-login").innerHTML = "Zaloguj sie";
    localStorage.clear();
  };
  }
)}

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
      li.textContent = `${licznik}. ${opinia.autor} - Jakość: ${opinia.jakosc}, Ulubiona Gra: ${opinia.ulub_gra}, Opinia: ${opinia.opinia}`;
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
    let dane = {};
    if(ktoZalog){
      dane = {
      autor: ktoZalog,
      jakosc: dane_f.get('jakosc'),
      ile_gier: dane_f.get('ile_gier'),
      ulub_gra: dane_f.get('ulub_gra'),
      opinia: dane_f.get('opinia')
    };
    }else{
      dane = {
        autor: "Gość",
        jakosc: dane_f.get('jakosc'),
        ile_gier: dane_f.get('ile_gier'),
        ulub_gra: dane_f.get('ulub_gra'),
        opinia: dane_f.get('opinia')
      };
    }

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

window.addEventListener('beforeunload', function () {
    if(zapisz == null){
      ktoZalog = null; 
      czyZalog = null;
      localStorage.setItem("ktoZalog", ktoZalog);
      localStorage.setItem("czyZalog", czyZalog);
      console.log('pameic wyczyszczona');
    }
});