document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.table-container');


    // Erstelle einen Button-Container für die Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Erzeuge den Add Button
    const addButton = document.createElement('button');
    addButton.textContent = "Add";
    addButton.classList.add('add-button');
    addButton.addEventListener('click', () => {
        // Hier wird der aktuelle Table als Parameter in der URL übergeben.
        window.location.href = "http://127.0.0.1:5501/frontend/edit/edit.html?table=employee";
    });

    // Back-Button
    const backButton = document.createElement('button');
    backButton.textContent = "Back to Landing Page";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = "http://127.0.0.1:5501/frontend/landingpage/landingpage.html"; 
    });

    // Buttons zum Container hinzufügen
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(backButton);

    // Füge den Add Button oberhalb der Tabelle ein.
    pageContainer.insertBefore(buttonContainer, pageContainer.firstChild);

    fetchEmployeeList();
});

function fetchEmployeeList() {
    console.log('hello');
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        console.error("No access token found! User is not logged in.");
        return;
    }

    fetch("http://127.0.0.1:8000/api/employees", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
    })
    .then(Response => Response.json())
    .then(data => {
        renderTable(data);
    })
    .catch(error => console.error("Error loading the employees:", error));
}

function renderTable(employees) {
    let employeesTable = document.getElementById("table-body");
    const accessToken = localStorage.getItem("access");
    employeesTable.innerHTML = "";

    employees.forEach(employee => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.first_name}</td>
            <td>${employee.last_name}</td>
            <td>${employee.age}</td>
            <td>${employee.position}</td>
            <td>${employee.is_active ? "still feeling the whip" : "couldn't stand the whip"}</td>
        `;

        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = "Edit";
        editButton.classList.add('edit-button');

        editButton.addEventListener('click', () => {
            const employeeData = {
                id: employee.id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                age: employee.age,
                position: employee.position,
                is_active: employee.is_active,
            };

            localStorage.setItem('editEmployee', JSON.stringify(employeeData));
            window.location.href = `http://127.0.0.1:5501/frontend/edit/edit.html?table=employee&id=${employee.id}`;
        });

        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('del-button');
        deleteButton.style.backgroundColor = 'red';

        deleteButton.addEventListener('click', () => {
            Swal.fire({
                title: "Are you sure?",
                text: `Do you really want to delete ${employee.first_name} ${employee.last_name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://127.0.0.1:8000/api/employees/${employee.id}`, {
                        method: "DELETE",
                        headers: { 
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error("Deletion failed");
        
                        Swal.fire("Deleted!", "The employee has been removed.", "success");
                        fetchEmployeeList(); // Tabelle aktualisieren
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

        employeesTable.appendChild(row);
    });
}


function add(){
    window.location.href= '../edit/edit.html';
  }