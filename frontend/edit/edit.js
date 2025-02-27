const accessToken = localStorage.getItem("access");

const tableConfigs = {
    employees: {
        endpoint: "http://127.0.0.1:8000/api/employees",
        fields: [
            { name: "firstName", label: "First Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "age", label: "Age", type: "number" },
            { name: "position", label: "Position", type: "text" },
            { name: "isActive", label: "Is Active", type: "checkbox" } 
        ]
    },
    horses: {
        endpoint: "http://127.0.0.1:8000/api/horses",
        fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "age", label: "Age", type: "number" },
            { name: "breed", label: "Breed", type: "text" },
            { name: "color", label: "Color", type: "text" },
            { name: "price", label: "Price", type: "number" },
            { name: "isAlive", label: "Is Alive", type: "checkbox"}
        ]
    },
    products: {
        endpoint: "http://127.0.0.1:8000/api/products",
        fields: [
            { name: "id", label: "ID", type: "text", readonly: true },
            { name: "name", label: "Name", type: "text"},
            { name: "price", label: "Price", type: "number" },
            { name: "sort", label: "Sort", type: "text"},
            { name: "stock", label: "Stock", type: "number"}
        ]
    }
};

