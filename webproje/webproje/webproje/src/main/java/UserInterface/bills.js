var user;
document.addEventListener("DOMContentLoaded", function() {
    user = JSON.parse(localStorage.getItem('User'));
    getBills().then(r => console.log(r));

    document.getElementById("userName").innerHTML = user.nameSurname;
});

async function getBills(){
    var usertype = JSON.parse(localStorage.getItem('Usertype'));
    var response;

    response = await fetch(`http://localhost:8080/api/bills/user/${user.id}`);

    const bills = await response.json();

    const tableBody = document.getElementById('table-body');

    // Store patient IDs to avoid duplicate rows
    const addedPatientIds = new Set();

    for (const bill of bills) {
        let pId = bill.patient_id;

        // Check if the patient ID has already been added
        if (addedPatientIds.has(pId)) {
            continue; // Skip this iteration
        }

        // Fetch patient details
        const responseP = await fetch(`http://localhost:8080/api/patients/${pId}`);
        const P = await responseP.json();

        // Create and append row
        const row = document.createElement('tr');

        const patientNameCell = document.createElement('td');
        patientNameCell.textContent = P.nameSurname; // Patient's name

        const amountCell = document.createElement('td');
        amountCell.textContent = bill.amount; // Amount

        const billDateCell = document.createElement('td');
        billDateCell.textContent = bill.issueDateTime; // Bill issue date

        row.appendChild(patientNameCell);
        row.appendChild(amountCell);
        row.appendChild(billDateCell);

        tableBody.appendChild(row);

        // Add patient ID to the set to avoid duplicate rows
        addedPatientIds.add(pId);
    }
}
