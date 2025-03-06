// Felder referenzieren
const idField = document.getElementById("")

document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const table = urlParams.get('table'); // z.B. employee, products, horses
  document.body.setAttribute("data-table", table);
  const id = urlParams.get('id'); // Wenn vorhanden, Bearbeitungsmodus
  const isEditMode = id !== null;

  const forms = {
    employee: {
      title: "Employees",
      fields: [
        { label: "First Name", type: "text", name: "first_name" },
        { label: "Last Name", type: "text", name: "last_name" },
        { label: "Age", type: "number", name: "age" },
        { label: "Position", type: "text", name: "position" },
        { label: "Is Active", type: "checkbox", name: "is_active" }
      ],
      endpoint: "http://127.0.0.1:8000/api/employees/"
    },
    products: {
      title: "Products",
      fields: [
        { label: "Name", type: "text", name: "name" },
        { label: "Sort", type: "text", name: "sort" },
        { label: "Price", type: "number", name: "price" },
        { label: "Stock", type: "number", name: "stock" }
      ],
      endpoint: "http://127.0.0.1:8000/api/products/"
    },
    horses: {
      title: "Horses",
      fields: [
        { label: "Name", type: "text", name: "name" },
        { label: "Breed", type: "text", name: "breed" },
        { label: "Age", type: "number", name: "age" },
        { label: "Color", type: "text", name: "color" },
        { label: "Price", type: "number", name: "price" },
        { label: "Is Alive", type: "checkbox", name: "is_alive" }

      ],
      endpoint: "http://127.0.0.1:8000/api/horses/"
    }
  };

  if (!table || !forms[table]) {
    document.getElementById('formContainer').innerHTML = "<p>Invalid table name.</p>";
    return;
  }

  const formConfig = forms[table];
  document.getElementById('formTitle').textContent = isEditMode
    ? `Edit ${formConfig.title}`
    : `Add ${formConfig.title}`;

  const formContainer = document.getElementById('formContainer');
  formContainer.innerHTML = "";

  // Erzeuge die Formularelemente
  formConfig.fields.forEach(field => {
    const group = document.createElement('div');
    group.className = "form-group";

    const label = document.createElement('label');
    label.setAttribute('for', field.name);
    label.textContent = field.label;

    const input = document.createElement('input');
    input.type = field.type;
    input.name = field.name;
    input.id = field.name;

    group.appendChild(label);
    group.appendChild(input);
    formContainer.appendChild(group);
  });

  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  // Funktion zum Vorbefüllen des Formulars
  function prefillForm(data) {
    console.log("prefillForm");
    formConfig.fields.forEach(field => {
      const element = document.getElementById(field.name);
      if (element) {
        if (field.type === "checkbox") {
          element.checked = data[field.name];
        } else {
          element.value = data[field.name] !== undefined ? data[field.name] : "";
        }
      }
    });
  }

  // Im Bearbeitungsmodus Daten aus dem Backend holen
  if (isEditMode) {
    const fetchUrl = formConfig.endpoint + id + "/";
    console.log(fetchUrl);
    fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      })
      .then(response => {
        if (!response.ok) throw new Error("Error fetching data");
        return response.json();
      })
      .then(data => {
        prefillForm(data);
      })
      .catch(error => {
        console.error("Error loading data:", error);
      });
  }

  // Beim Klick auf "Speichern" werden die Daten an das Backend gesendet
  document.getElementById('saveBtn').addEventListener('click', function(e) {
    const formData = new FormData(); // alle felder werden in formData gespeichert und an das Backend gesendet
    const data = {};
    formConfig.fields.forEach(field => {
      const element = document.getElementById(field.name);
      if (field.type === "checkbox") {
        data[field.name] = element.checked;
      } else {
        data[field.name] = element.value;
      }
    });

    // Foto hochladen
    const photoInput = document.getElementById("photo");
    if (photoInput && photoInput.files.length > 0) {
      formData.append("image", photoInput.files[0]);
    }

    // Verwende PUT im Bearbeitungsmodus, POST zum Hinzufügen
    const method = isEditMode ? "PUT" : "POST";
    let endpoint = formConfig.endpoint;
    if (isEditMode) {
      endpoint += id + "/";
    }

    for (const key in data) {
      formData.append(key, data[key]);
    }    

    fetch(endpoint, {
        method: method,
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
        body: formData,
      })
      .then(response => {
        if (!response.ok) throw new Error("Error saving data");
        return response.json();
      })
      .then(savedData => {
        console.log("Saved data:", savedData);
        // Leite zum Referrer weiter, falls vorhanden, ansonsten auf das entsprechende Dashboard
        if (document.referrer) {
          window.history.back();
        } else {
          const dashboardMapping = {
            horses: "/frontend/horses/horse_dashboard.html",
            employees: "/frontend/employees/employees_dashboard.html",
            products: "/frontend/products/products_dashboard.html"
          };
          window.location.href = dashboardMapping[table] || "/index.html";
        }
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  });
});
