document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.table-container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Add Button erzeugen
    const addButton = document.createElement('button');
    addButton.textContent = "Add";
    addButton.classList.add('add-button');
    addButton.addEventListener('click', () => {
        // Übergibt den aktuellen Table als Parameter in der URL.
        window.location.href = "http://127.0.0.1:5501/frontend/edit/edit.html?table=horses";
    });

    // Back-Button erzeugen
    const backButton = document.createElement('button');
    backButton.textContent = "Back to Landing Page";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = "http://127.0.0.1:5501/frontend/landingpage/landingpage.html"; 
    });

    // Buttons zum Container hinzufügen
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(backButton);

    // Füge den Button-Container oberhalb der Tabelle ein.
    pageContainer.insertBefore(buttonContainer, pageContainer.firstChild);

    fetchHorseList();
});

function fetchHorseList() {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        console.error("No access token found! User is not logged in.");
        return;
    }

    fetch("http://127.0.0.1:8000/api/horses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        renderTable(data);  // data sollte hier ein Array von horses sein
    })
    .catch(error => console.error("Error loading the horses:", error));
}

function renderTable(horses) {
    const accessToken = localStorage.getItem("access"); // Token hier abrufen
    let horsesTable = document.getElementById("table-body");
    horsesTable.innerHTML = "";

    horses.forEach(horse => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${horse.image_url}" alt="${horse.name}" style="width:100px"></td>
            <td>${horse.name}</td>
            <td>${horse.age}</td>
            <td>${horse.breed}</td>
            <td>${horse.color}</td>
            <td>${horse.price}</td>
            <td>${horse.is_alive ? "sausage soon" : "yummy sausage"}</td>
        `;

        // Edit-Button
        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.style.backgroundColor = 'rgb(185, 94, 32)';
        editButton.addEventListener('click', () => {
            const horseData = {
                id: horse.id,
                image: product.image,
                name: horse.name,
                age: horse.age,
                breed: horse.breed,
                color: horse.color,
                price: horse.price,
                is_alive: horse.is_alive,
            };

            localStorage.setItem('editHorse', JSON.stringify(horseData));
            window.location.href = `http://127.0.0.1:5501/frontend/edit/edit.html?table=horses&id=${horse.id}`;
        });
        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        // Delete-Button
        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('del-button');
        deleteButton.style.backgroundColor = 'rgb(190, 0, 0)';

        deleteButton.addEventListener('click', () => {
            Swal.fire({
                title: "Are you sure?",
                text: `Do you really want to delete ${horse.name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Yes, delete it!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://127.0.0.1:8000/api/horses/${horse.id}/`, {
                        method: "DELETE",
                        headers: { 
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error("Deletion failed");
        
                        Swal.fire("Deleted!", "The horse has been removed.", "success");
                        fetchHorseList();
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        Swal.fire("Error", "Delete failed!", "error");
                    });
                }
            });
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        horsesTable.appendChild(row);
    });
}

function add(){
    window.location.href= '../edit/edit.html';
  }