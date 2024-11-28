/*
 * These functions below are for various webpage functionalities. 
 * Each function serves to process data on the frontend:
 *      - Before sending requests to the backend.
 *      - After receiving responses from the backend.
 * 
 * To tailor them to your specific needs,
 * adjust or expand these functions to match both your 
 *   backend endpoints 
 * and 
 *   HTML structure.
 * 
 */


// This function checks the database connection and updates its status on the frontend.
async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    // Hide the loading GIF once the response is received.
    loadingGifElem.style.display = 'none';
    // Display the statusElem's text in the placeholder.
    statusElem.style.display = 'inline';

    response.text()
        .then((text) => {
            statusElem.textContent = text;
        })
        .catch((error) => {
            statusElem.textContent = 'connection timed out';  // Adjust error handling if required.
        });
}

// Fetches data from the demotable and displays it.
async function fetchAndDemoTable() {
    const tableElement = document.getElementById('demotable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/demotable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const demotableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    demotableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// Fetches data from the usersTable and displays it.
async function fetchAndDisplayUsers() {
    const tableElement = document.getElementById('usersTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/usersTable', {
        method: 'GET'
    });

    const responseData = await response.json();
    const usersTableContent = responseData.data;

    // Always clear old, already fetched data before new fetching process.
    if (tableBody) {
        tableBody.innerHTML = '';
    }

    usersTableContent.forEach(user => {
        const row = tableBody.insertRow();
        user.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field;
        });
    });
}

// This function resets or initializes the demotable.
async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "demotable initiated successfully!";
        fetchTableData();
    } else {
        alert("Error initiating table!");
    }
}

// This function inserts test user data.
async function insertTestData() {
    const response = await fetch("/insertTestData", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('insertTestDataMsg');
        messageElement.textContent = "test data inserted successfully!";
        fetchTableData();
    } else {
        alert("Error inserting users!");
    }
}

// Inserts new records into the demotable.
async function insertDemotable(event) {
    event.preventDefault();

    const idValue = document.getElementById('insertId').value;
    const nameValue = document.getElementById('insertName').value;

    const response = await fetch('/insert-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error inserting data!";
    }
}

// Updates names in the demotable.
async function updateNameDemotable(event) {
    event.preventDefault();

    const oldNameValue = document.getElementById('updateOldName').value;
    const newNameValue = document.getElementById('updateNewName').value;

    const response = await fetch('/update-name-demotable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldNameValue,
            newName: newNameValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('updateNameResultMsg');

    if (responseData.success) {
        messageElement.textContent = "Name updated successfully!";
        fetchTableData();
    } else {
        messageElement.textContent = "Error updating name!";
    }
}

// Counts rows in the demotable.
// Modify the function accordingly if using different aggregate functions or procedures.
async function countDemotable() {
    const response = await fetch("/count-demotable", {
        method: 'GET'
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('countResultMsg');

    if (responseData.success) {
        const tupleCount = responseData.count;
        messageElement.textContent = `The number of tuples in demotable: ${tupleCount}`;
    } else {
        alert("Error in count demotable!");
    }
}

async function submitSurveyQuestionAnswers(event) {
    event.preventDefault();

    const name = document.getElementById('inseertName').value
    const email = document.getElementById('insertEmail').value
    const likelyToGoOut = document.getElementById('question-1').value
    const gut = document.getElementById('question-2').value
    const emotions = document.getElementById('question-3').value
    const planWeek = document.getElementById('question-4').value
    const stressed = document.getElementById('question-5').value
    const gender = document.getElementById('question-6').value
    const PostalCode = document.getElementById('question-7').value
    const age = document.getElementById('question-8').value
    const nickname = document.getElementById('question-9').value
    const sexuality = document.getElementById('question-10').value
    const vacation = document.getElementById('question-11').value
    const hobby = document.getElementById('question-12').value
    const sport = document.getElementById('question-13').value
    const musicGenre = document.getElementById('question-14')

    const response = await fetch('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            name: name,
            gender: gender,
            age: age,
            postalCode: PostalCode,
            nickname: nickname,
            sexuality: sexuality,
            dreamVacation: vacation,
            favHobby: hobby,
            favSport: sport,
            favMusicGenre: musicGenre,
            extravertedness: likelyToGoOut,
            intuitive: gut,
            feeling: emotions,
            judging: planWeek,
            turbulence: stressed
        })
    });


    const responseData = await response.json();
    const message = document.getElementById('addUserUpdateMsg')

    if (responseData.success) {
        message.textContent = "Added User Successfully!"
    } else {
        alert("Error adding User");
    }
}


// slider logic
document.addEventListener("DOMContentLoaded", () => {
    // Update slider value display
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const valueSpan = document.getElementById(slider.id + '-value');
        slider.addEventListener('input', () => {
            valueSpan.textContent = slider.value;
        });
    });
});
// ---------------------------------------------------------------
// Initializes the webpage functionalities.
// Add or remove event listeners based on the desired functionalities.
window.onload = function () {
    checkDbConnection();
    fetchTableData();
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertDemotable").addEventListener("submit", insertDemotable);
    document.getElementById("updataNameDemotable").addEventListener("submit", updateNameDemotable);
    document.getElementById("insertTestData").addEventListener("click", insertTestData);
    document.getElementById("countDemotable").addEventListener("click", countDemotable);
    document.getElementById("survey-questions").addEventListener("click", submitSurveyQuestionAnswers)
};

// General function to refresh the displayed table data. 
// You can invoke this after any table-modifying operation to keep consistency.
function fetchTableData() {
    fetchAndDisplayUsers();
    fetchAndDemoTable();
}
