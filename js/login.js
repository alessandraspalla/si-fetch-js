document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await login();
});

async function login(){
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    try {
        const response = await fetch('http://localhost:8080/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();

            console.log('Login avvenuto con successo!');
            const token = data.token;
            console.log('Token JWT salvato:', token);
            
            window.location.href = `dashboard.html?jwt=${token}`;
        } else {
            console.error('Errore durante il login:', response.status);
            alert('Credenziali non valide. Riprova.');
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante il login.');
    }
}
