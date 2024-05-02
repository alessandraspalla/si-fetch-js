document.getElementById('showCoursesButton').addEventListener('click', getAllCourses);

const url = new URL(window.location.href);
const token = url.searchParams.get('jwt');

async function getAllCourses(token) {
    try {
        const response = await fetch('http://localhost:8080/api/corso/corsi', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const courses = await response.json();
            console.log('Corsi:', courses);
        } else {
            console.error('Errore durante il recupero dei corsi:', response.status);
            alert('Si è verificato un errore durante il recupero dei corsi.');
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore durante il recupero dei corsi.');
    }
}

function renderCourses(courses) {
    const tableBody = document.getElementById('courseTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    for (let course of courses) {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);

        cell1.innerHTML = course.nomeCorso;
        cell2.innerHTML = course.descrizioneBreve;
        cell3.innerHTML = course.descrizioneCompleta;
        cell4.innerHTML = course.durata;
        cell5.innerHTML = course.idCategoria;

    }
}