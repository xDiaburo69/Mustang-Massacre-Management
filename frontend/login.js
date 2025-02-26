function login() {
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;

    fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
    })
    .then((response) => {
        console.log("Antwort-Status:", response.status); 

        if (!response.ok) {
            return response.json().then(err => { throw err });
        }
        return response.json();
    })
    .then((data) => {
        console.log("Server response:", data);

        if (data.access) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            window.location.href = './';
        } else {
            console.warn("Login failed: No access token received.");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("Login failed: " + (error.detail || "Unknown error"));
    });

    return false;
}