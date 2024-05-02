const url = new URL(window.location.href);
const userEmail = url.searchParams.get('email');
if (userEmail) {
    getUserByEmail(userEmail)
        .then(userData => {
            document.getElementById('updateNomeInput').value = userData.nome;
            document.getElementById('updateCognomeInput').value = userData.cognome;
            document.getElementById('updateEmailInput').value = userData.email;
            document.getElementById('updateRuoloInput').value = userData.idRuolo;
        })
        .catch(error => {
            console.error('Si è verificato un errore durante il recupero dei dati dell\'utente:', error);
            alert('Si è verificato un errore.');
        });
}

document.getElementById('updateUserForm').addEventListener('submit', function(e) {
    e.preventDefault();
    updateUser();
});

async function updateUser() {
    try {
        const nome = document.getElementById('updateNomeInput').value;
        const cognome = document.getElementById('updateCognomeInput').value;
        const email = document.getElementById('updateEmailInput').value;
        const idRuolo = document.getElementById('updateRuoloInput').value;

        const updatedUserData = {
            nome: nome,
            cognome: cognome,
            email: email,
            idRuolo: idRuolo
        };

        const response = await fetch('http://localhost:8080/api/user/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        });

        if (!response.ok) {
            throw new Error('Errore durante la richiesta PUT');
        }

        alert('Utente aggiornato con successo.');

        document.getElementById('updateNomeInput').value = '';
        document.getElementById('updateCognomeInput').value = '';
        document.getElementById('updateEmailInput').value = '';
        document.getElementById('updateRuoloInput').value = '';

        window.location.href = "index.html"
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore.');
    }
}

async function getUserByEmail(userEmail) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/getByEmail?email=${userEmail}`);
        if (!response.ok) {
            throw new Error('Errore durante la richiesta GET');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}