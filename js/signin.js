document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    registrazione();
});

async function registrazione() {
    try {
        const response = await fetch('http://localhost:8080/api/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: document.getElementById('nome').value,
                cognome: document.getElementById('cognome').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }),
        });

        if (!response.ok) {
            throw new Error('Errore durante la richiesta POST');
        }

       console.log('Registrazione avvenuta con successo!');
       alert('Registrazione avvenuta con successo!');


    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante la registrazione. Riprova più tardi.');
    }
}

// // Definizione della funzione asincrona che effettua la chiamata REST
// async function getDatiDalServer() {
//     try {
//         // Effettua una chiamata GET all'endpoint fittizio
//         const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

//         //console.log(response)

//         // Verifica che la risposta sia ok (status 200)
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         // Estrae il JSON dalla risposta
//         const dati = await response.json();
//         // Stampa i dati nella console
//         console.log(dati);

//     }
//     catch (error) {
//         // Gestisce eventuali errori
//         console.error('Errore durante la chiamata REST:', error);
//     }
// }

// async function post(){

//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST', // Metodo HTTP per la richiesta POST
//         headers: {
//             'Content-Type': 'application/json', // Imposta l'intestazione del contenuto come JSON
//         },
//         body: JSON.stringify({
//             "userId": 1,
//             "id": 1,
//             "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//             "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//         }),
//     })
//         .then(async response => await response.json()) // Converte la risposta in JSON
//         .then(data => console.log(data)) // Gestisce i dati della risposta
//         .catch((error) => console.error('Errore:', error)); // Gestisce eventuali errori
// }

// // Chiama la funzione per effettuare la chiamata REST
// getDatiDalServer();
// post();
