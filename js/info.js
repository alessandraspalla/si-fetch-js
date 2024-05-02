try {
    const url = new URL(window.location.href);
    const userEmail = url.searchParams.get('email');
    console.log(userEmail);
    
    fetch(`http://localhost:8080/api/user/getByEmail?email=${userEmail}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore durante la richiesta GET');
        }
        return response.json();
    })
    .then(userData => {
        const infoTable = document.getElementById('infoTable').getElementsByTagName('tbody')[0];
        infoTable.innerHTML = '';

        let row = infoTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = userData.id;
        cell2.innerHTML = userData.nome;
        cell3.innerHTML = userData.cognome;
        cell4.innerHTML = userData.email;
        cell5.innerHTML = userData.ruoli.map(role => role.tipologia).join(', ');

        document.getElementById('infoTable').style.display = 'table';
    })
    .catch(error => {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore.');
    });
} catch (error) {
    console.error('Si è verificato un errore:', error);
    alert('Si è verificato un errore.');
}
