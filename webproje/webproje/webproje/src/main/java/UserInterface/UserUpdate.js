document.addEventListener("DOMContentLoaded", function() {
    user = JSON.parse(localStorage.getItem('User'));
    console.log('User loaded from localStorage:', user); // Log user details
    if (user) {
        document.getElementById("gender").value = user.gender;
        document.getElementById("age").value = user.age;
        document.getElementById("nameSurname").value = user.nameSurname;
    }
});

async function updateUser() {
    var new_gender = user.gender;
    var new_age = document.getElementById("age").value;
    var new_name = document.getElementById("nameSurname").value;
    var id = user.id;

    console.log('Updated values:', { new_gender, new_age, new_name, id }); // Log updated values

    var data = {
        id: id,
        nameSurname: new_name,
        gender: new_gender,
        age: new_age,
    };

    var usertype = JSON.parse(localStorage.getItem('Usertype'));
    console.log('User type loaded from localStorage:', usertype); // Log user type

    let url;
    if (usertype === "Patient") {
        url = `http://localhost:8080/api/patients/${id}`;
    } else {
        url = `http://localhost:8080/api/doctors/${id}`;
    }
    console.log('URL for PUT request:', url); // Log URL

    try {
        const updatedName = await putMethod(data, url);
        alert(`User updated successfully: ${updatedName}`);

        // Update localStorage and DOM after successful update
        user.nameSurname = new_name;
        user.gender = new_gender;
        user.age = new_age;
        localStorage.setItem('User', JSON.stringify(user));

        if (usertype === "Patient") {
            window.location.href="Patient.html"
        } else {
            window.location.href="Doctor.html"
        }

    } catch (error) {
        console.error('Error updating user:', error); // Log error
        alert(`Error updating user: ${error}`);
    }
}

async function deleteUser() {


    var usertype = JSON.parse(localStorage.getItem('Usertype'));

    let url;
    if (usertype === "Patient") {
        url = `http://localhost:8080/api/patients/${user.id}`;
    } else {
        url = `http://localhost:8080/api/doctors/${user.id}`;
    }

    try {
        await deleteMethod(url);
        alert("User removed successfully: " + user.nameSurname)
        window.location.href="Login.html"
    } catch (error) {
        alert(`Error deleting user: ${error}`);
    }
}


async function putMethod(data, url) {
    try {
        const response = await fetch(url, {
            method: 'PUT', // Specify the method
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

async function deleteMethod(url) {
    try {
        const response = await fetch(url, {
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

        console.log('Response from server:', response); // Log server response
    } catch (error) {
        // Handle fetch errors
        console.error('Fetch error:', error); // Log fetch error
        throw error;
    }
}
