function register(){
    var nameSurname = document.getElementById("nameSurname").value || null;
    var age = document.getElementById("age").value || null;
    var type = document.getElementById("type").value || null;
    var gender = document.getElementById("gender").value || null;

    if (nameSurname === null || age === null){
        alert("Enter all values for register.");
        return;
    }

    var data = {
        nameSurname: nameSurname,
        age: age,
        gender:gender
    }

    if (type === "Patient"){
        createUser(data, `http://localhost:8080/api/patients/`).then(r => console.log(r));
    }
    else {
        createUser(data, `http://localhost:8080/api/doctors/`).then(r => console.log(r));
    }
}

async function createUser(data, url) {
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
        const updatedUser = await response.json();
        console.log('Response from server:', updatedUser); // Log server response

        // Log or handle the updated user data
        return updatedUser.nameSurname;
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error); // Log fetch error
        throw error;
    }
}