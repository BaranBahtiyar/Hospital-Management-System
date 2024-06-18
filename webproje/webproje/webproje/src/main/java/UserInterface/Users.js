async function checkLogin() {
    const userId = parseInt(document.getElementById("id").value) || null;
    const userType = document.getElementById("type").value;

    var userTypes = {
        'Patient' : 'patients',
        'Doctor': 'doctors'
    }

    if (userId === null) {
        alert('Please enter a valid ID.');
        return;
    }


    try {
        const response = await fetch(`http://localhost:8080/api/${userTypes[userType]}/${userId}`);

        const user = await response.json();

        if (user) {
            localStorage.setItem('User', JSON.stringify(user));
            if(userType === "Patient"){
                window.location.href = `Patient.html`;
            }
            else{
                window.location.href = `Doctor.html`;
            }
        }


    } catch (error) {
        alert("User not found.");
    }
}