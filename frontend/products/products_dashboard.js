document.addEventListener('DOMContentLoaded', () => {
    const pageContainer = document.querySelector('.table-container');


    //Erzeugt ein Button Container, leichter fürs css
    const buttonContainer = document.createElement('div'); //erzeugt ein div
    buttonContainer.classList.add('button-container'); // klasse wird vergeben

    //Erzeugt den Add Button
    const addButton = document.createElement('button');
    addButton.textContent = "Add"; //was im Button stehen soll
    addButton.classList.add('add-button');
    // aktion wenn der Button geklickt wird
    addButton.addEventListener('click', () => {
        // Hier wird der aktuelle Table als Parameter in der URL übergeben.
        window.location.href = "http://127.0.0.1:5501/frontend/edit/edit.html?table=products";
    });


    // Back-Button
    const backButton = document.createElement('button');   
    backButton.textContent = "Back to Landing Page";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', () => {
        window.location.href = "http://127.0.0.1:5501/frontend/landingpage/landingpage.html";
    });
    
    buttonContainer.appendChild(addButton);
    buttonContainer.appendChild(backButton);
    
    
    // Füge den Add Button oberhalb der Tabelle ein.
    pageContainer.insertBefore(buttonContainer, pageContainer.firstChild);

    fetchProductsList();
});

function fetchProductsList() {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        console.error("No access token found! User is not logged in.");
        return;
    }

    fetch("http://127.0.0.1:8000/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        renderTable(data);
    })
    .catch(error => console.error("Error loading the products:", error));
}

function renderTable(products) {
    let productsTable = document.getElementById("table-body");
    const accessToken = localStorage.getItem("access");
    productsTable.innerHTML = "";

    products.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image_url}" alt="${product.name}" style="width:100px"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.sort}</td>
            <td>${product.stock}</td>
        `;

        const editButtonCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');

        editButton.addEventListener('click', () => {
            const productData = {
                id: product.id,
                image: product.image,
                name: product.name,
                price: product.price,
                sort: product.sort,
                stock: product.stock,
            };

            localStorage.setItem('editProduct', JSON.stringify(productData));
            window.location.href = `http://127.0.0.1:5501/frontend/edit/edit.html?table=products&id=${product.id}`
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
                text: `Do you really want to delete ${product.name}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Yes, delete it!"
            })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`http://127.0.0.1:8000/api/products/${product.id}/`, {
                        method: "DELETE",
                        headers: { 
                            "Authorization": `Bearer ${accessToken}`,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error("Deletion failed");
        
                        Swal.fire("Deleted!", "The product has been removed.", "success");
                        fetchProductsList();
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

        productsTable.appendChild(row);
    });
}

function add(){
    window.location.href= '../edit/edit.html';
  }