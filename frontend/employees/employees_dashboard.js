document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.table-container');
    const addButton = document.createElement('button');
    addButton.textContent = "Add";
    addButton.classList.add('add-button');
    addButton.addEventListener('click', () => {
        // Hier wird der aktuelle Table als Parameter in der URL übergeben.
        window.location.href = "http://127.0.0.1:5501/frontend/edit/edit.html?table=employee";
    });
    // Füge den Add Button oberhalb der Tabelle ein.
    pageContainer.insertBefore(addButton, pageContainer.firstChild);

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
            fetch(`http://127.0.0.1:8000/api/employees/${employee.id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                if (!response.ok) throw new Error("Deletion error");

                console.log(`Employee with ID ${employee.id} was deleted.`);
                renderTable(updatedEmployeeData);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Delete failed!");
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