var user;

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve user data from localStorage
    user = JSON.parse(localStorage.getItem('User'));


    var selectElement = document.getElementById("doctor");

    // Fetch doctors data from the server
    fetch("http://localhost:8080/api/doctors/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch doctors data.');
            }
            return response.json();
        })
        .then(doctors => {
            // Populate the doctor select dropdown with fetched data
            for (const doctor of doctors) {
                var option = document.createElement("option");
                option.value = doctor.id;
                option.text = doctor.nameSurname;
                selectElement.appendChild(option);
            }
        })
        .catch(error => {
            console.error("Error fetching doctors:", error);
            // Display a user-friendly error message or handle the error appropriately
        });
});

async function createAppointments() {
    var selectElement = document.getElementById("doctor").value;
    var appDate = document.getElementById("appDate").value;


    // Validate selected doctor ID and appointment date
    if (!selectElement || !appDate) {
        console.error('Doctor and appointment date are required.');
        // Display a user-friendly error message or handle the error appropriately
        return;
    }

    // Create data object for the POST request
    var data = {
        appointment_date_time: appDate,
        doctor_id: parseInt(selectElement),
        patient_id: parseInt(user.id)
    };

    var new_id;

    // Make a POST request to create appointment
    await createApp(data, `http://localhost:8080/api/appointments/`).then(r => new_id = r.id);

    const response = await fetch(`http://localhost:8000/api/appointments/`);

    const app = await response.json();

    for (a of app){
        new_id = a.id;
    }


    var bill= {
        appointment_id: new_id,
        issue_date_time: appDate,
        patient_id: user.id,
        amount: 100
    }

    createApp(bill, `http://localhost:8080/api/bills/`).then(r => console.log(r));


}

async function createApp(data, url) {
    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorMessage = `An error has occurred: ${response.status}`;
            throw new Error(errorMessage);
        }

        // Parse the JSON response
        // Log or handle the updated user data
        return await response.json();
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error); // Log fetch error
        throw error;
    }
}
