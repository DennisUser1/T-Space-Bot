const formDataElement = document.getElementById("data-info");
const localStorageFormData = localStorage.getItem("form-data");
const formData = JSON.parse(localStorageFormData);

console.log(formData);
function renderFormData() {
  for (let data in formData) {
    const div = document.createElement("div");
    div.className = `data-contact data-${data}`;
    div.textContent = formData[data];
    formDataElement.appendChild(div);
  }
}

renderFormData();