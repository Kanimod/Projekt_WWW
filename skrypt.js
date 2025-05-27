const showLogin = () => {
    document.getElementById("login-container").className = "shown";
  }
  
  const hideLogin = () => {
    document.getElementById("login-container").className = "hidden";
  }  


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

document.getElementById("przycisk_wy").addEventListener("click", function(){
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
});








