fetchProductsList();

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
    productsTable.innerHTML = "";

    products.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
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
                name: product.name,
                price: product.price,
                sort: product.sort,
                stock: product.stock,
            };

            localStorage.setItem('editProduct', JSON.stringify(productData));
            window.location.href = `http://127.0.0.1:5500/dashboard/edit/edit.html?id=${product.id}`
        });

        editButtonCell.appendChild(editButton);
        row.appendChild(editButtonCell);

        const deleteButtonCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('del-button');
        deleteButton.style.backgroundColor = 'red';

        deleteButton.addEventListener('click', () => {
            fetch(`http://127.0.0.1:8000/api/horses/${horse.id}/`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${accessToken}`,
                }
            })
            .then(response => {
                if (!response.ok) throw new Error(`Deletion error`);
                    console.log(`Employee with ID ${product.id} was deleted.`);
                    renderTable(updatedProductData)
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Delete failed!");
            });
        });

        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);
        productsTable.appendChild(row);
    });
}