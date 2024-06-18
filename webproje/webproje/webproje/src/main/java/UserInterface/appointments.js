var user;
document.addEventListener("DOMContentLoaded", function() {
    user = JSON.parse(localStorage.getItem('User'));
    getAppointments().then(r => console.log(r));

    document.getElementById("userName").innerHTML = user.nameSurname;
});

var userTypes = {
    'Patient' : 'patients',
    'Doctor': 'doctors'
}

async function getAppointments(){
    var usertype = JSON.parse(localStorage.getItem('Usertype'));
    var response;

    if (usertype === "Patient"){
        response = await fetch(`http://localhost:8080/api/appointments/patient/${user.id}`);
    }
    else {
        response = await fetch(`http://localhost:8080/api/appointments/doctor/${user.id}`);
    }
    const appointments = await response.json();

    const tableBody = document.getElementById('table-body');

    for (const appointment of appointments) {
        let pId = appointment.patient_id;
        let dId = appointment.doctor_id;

        // Fetch patient and doctor details concurrently
        const [responseP, responseD] = await Promise.all([
            fetch(`http://localhost:8080/api/patients/${pId}`),
            fetch(`http://localhost:8080/api/doctors/${dId}`)
        ]);

        const P = await responseP.json();
        const D = await responseD.json();

        const row = document.createElement('tr');

        const doctorNameCell = document.createElement('td');
        doctorNameCell.textContent = D.nameSurname; // Doctor's name

        const patientNameCell = document.createElement('td');
        patientNameCell.textContent = P.nameSurname; // Patient's name

        const appointmentDateCell = document.createElement('td');
        appointmentDateCell.textContent = appointment.appointmentDateTime;

        const deleteCell = document.createElement('td');
        if(usertype === "Patient"){
            const deleteButton = document.createElement('a');
            deleteButton.className = 'btn btn-danger';
            deleteButton.textContent = 'Sil';
            deleteButton.id = `delete_${appointment.id}`
            deleteButton.href = '#';
            deleteButton.onclick = () => deleteAppointment(appointment.id);
            deleteCell.appendChild(deleteButton);
        }

        row.appendChild(doctorNameCell);
        row.appendChild(patientNameCell);
        row.appendChild(appointmentDateCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    }
}

async function deleteAppointment(id){
    try {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}`, {
            method: 'DELETE', // Specify the method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            }
        });

        if (!response.ok) {
            // Handle HTTP errors
            const errorMessage = `An error has occurred: ${response.status}`;
            throw new Error(errorMessage);
        }

        location.reload();

        console.log('Response from server:', response); // Log server response
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error); // Log fetch error
        throw error;
    }
}