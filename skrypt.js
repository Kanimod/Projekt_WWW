const toggleButton = document.getElementById('tryb');
const body = document.body;

body.classList.add('jasno');

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('jasno')) {
        body.classList.replace('jasno', 'ciemno');
    } else {
        body.classList.replace('ciemno', 'jasno');
    }
});