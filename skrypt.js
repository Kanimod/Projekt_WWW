const showLogin = () => {
    document.getElementById("login-container").className = "shown";
  }
  
  const hideLogin = () => {
    document.getElementById("login-container").className = "hidden";
  }  

const toggleButton = document.getElementById('tryb');
const body = document.body;

const zapiszTryb = localStorage.getItem('them');

if (zapiszTryb){
  body.classList.add(zapiszTryb)
} else{
  body.classList.add('jasno');
}

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('jasno')) {
        body.classList.replace('jasno', 'ciemno');
        localStorage.setItem('them', 'ciemno')
    } else {
        body.classList.replace('ciemno', 'jasno');
        localStorage.setItem('them', 'jasno')
    }
});