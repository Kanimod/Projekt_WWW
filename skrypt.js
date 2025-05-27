const showLogin = () => {
  document.getElementById("login-container").className = "shown";
}
  
const hideLogin = () => {
  document.getElementById("login-container").className = "hidden";
}  

const czas_zap = localStorage.getItem('zapis_czasu');

window.addEventListener('beforeunload', function(){
  this.localStorage.setItem('zapis_czasu', new Date());
})

document.getElementById("czas").innerHTML = czas_zap;

const toggleButton = document.getElementById('tryb');
const cialo = document.getElementById('cialo');
const glowa = document.getElementById('glowa');

const zapiszTryb = localStorage.getItem('them');

if (zapiszTryb){
  cialo.classList.add(zapiszTryb);
  glowa.classList.add(zapiszTryb);
} else{
  cialo.classList.add('jasno');
  glowa.classList.add('jasno');
};

toggleButton.addEventListener('click', () => {
    if (cialo.classList.contains('jasno')) {
        cialo.classList.replace('jasno', 'ciemno');
        glowa.classList.replace('jasno', 'ciemno');
        localStorage.setItem('them', 'ciemno');
    } else {
        cialo.classList.replace('ciemno', 'jasno');
        glowa.classList.replace('ciemno', 'jasno');
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
    alert("nie znaleziono")
  }

  document.getElementById("wyszukiwanie").value = "";
};

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




