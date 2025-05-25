const toggleButton = document.getElementById('tryb');
const body = document.body;

const showLogin = () => {
    document.getElementById("login-container").className = "shown";
  }
  
  const hideLogin = () => {
    document.getElementById("login-container").className = "hidden";
  }  

body.classList.add('jasno');

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('jasno')) {
        body.classList.replace('jasno', 'ciemno');
    } else {
        body.classList.replace('ciemno', 'jasno');
    }
});