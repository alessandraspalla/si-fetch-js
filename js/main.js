document.getElementById('showUsersButton').addEventListener('click', getDatiUtenti);
document.getElementById('searchButton').addEventListener('click', searchUserByEmail);

async function searchUserByEmail() {
    const searchEmail = document.getElementById('emailInput').value.trim();
    console.log('Email di ricerca:', searchEmail);
    await getDati(searchEmail);
}

async function getDati(searchEmail = '') {
    console.log('Email di ricerca in getDatiUtenti:', searchEmail);
    try {
        const response = await fetch('http://localhost:8080/api/user/');

        if (!response.ok) {
            throw new Error('Errore durante la richiesta GET');
        }

        const userData = await response.json();

        const filteredUsers = userData.filter(user => {
            return user.email.toLowerCase().includes(searchEmail.toLowerCase());
        });        

        renderUsers(filteredUsers);

        document.getElementById('userTable').style.display = 'table';
        console.log('Utenti filtrati:', filteredUsers);

    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore.');
    }
}

async function getDatiUtenti() {
    try {
        const response = await fetch('http://localhost:8080/api/user/');

        if (!response.ok) {
            throw new Error('Errore durante la richiesta GET');
        }

        const userData = await response.json();

        renderUsers(userData);

        document.getElementById('userTable').style.display = 'table';
        console.log('Utenti:', userData);

    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore.');
    }
}


async function deleteUserByEmail(email) {
    try {
        const response = await fetch(`http://localhost:8080/api/user/${email}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Errore durante la richiesta DELETE');
        }

        getDatiUtenti();

        alert('Utente eliminato con successo.');

    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore.');
    }
}

function renderUsers(users) {
    const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    for (let user of users) {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);

        cell1.innerHTML = user.id;
        cell2.innerHTML = user.nome;
        cell3.innerHTML = user.cognome;
        cell4.innerHTML = user.email;
        cell5.innerHTML = user.ruoli.map(role => role.tipologia).join(', ');

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButton.className = 'btn btn-danger mx-1';
        deleteButton.onclick = function() {
            deleteUserByEmail(user.email);
        };
        cell6.appendChild(deleteButton);

        let updateButton = document.createElement('button');
        updateButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        updateButton.className = 'btn btn-warning';
        updateButton.onclick = function() {
            window.location.href = `update.html?email=${user.email}`;
        };
        cell6.appendChild(updateButton);

        let infoButton = document.createElement('button');
        infoButton.innerHTML = `<i class="fa-solid fa-info"></i>`;
        infoButton.className = 'btn btn-info mx-1';
        infoButton.onclick = function() {
            window.location.href = `info.html?email=${user.email}`;
        };
        cell6.appendChild(infoButton);

    }
}