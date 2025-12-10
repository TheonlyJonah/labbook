// script.js 
const parser = new DOMParser(); 
const serializer = new XMLSerializer(); 
let employeeXML = ''; // Will be loaded from file

// Function to load XML from file
async function loadXML() {
  try {
    const response = await fetch('employees.xml');
    if (response.ok) {
      employeeXML = await response.text();
    } else {
      throw new Error('Failed to load XML');
    }
  } catch (error) {
    console.error('Error loading XML:', error);
    employeeXML = `<employees></employees>`; // Fallback
  }
}

// Function to save XML to file
async function saveXML() {
  try {
    const response = await fetch('save.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml'
      },
      body: employeeXML
    });
    if (!response.ok) {
      throw new Error('Failed to save XML');
    }
  } catch (error) {
    console.error('Error saving XML:', error);
  }
}
// Function to display employees 
function displayEmployees() { 
const xmlDoc = parser.parseFromString(employeeXML, "application/xml"); 
const employees = xmlDoc.getElementsByTagName("employee"); 
const tableBody = document.querySelector("#employeeTable tbody"); 
tableBody.innerHTML = ""; // Clear existing rows 
Array.from(employees).forEach((employee) => { 
const id = employee.getElementsByTagName("id")[0].textContent; 
const name = employee.getElementsByTagName("name")[0].textContent; 
const age = employee.getElementsByTagName("age")[0].textContent; 
const department = 
employee.getElementsByTagName("department")[0].textContent; 
const row = document.createElement("tr"); 
row.innerHTML = ` 
<td>${id}</td> 
<td>${name}</td> 
<td>${age}</td> 
<td>${department}</td> 
`; 
tableBody.appendChild(row); 
}); 
} 
// Function to add a new employee 
document.getElementById("addEmployeeBtn").addEventListener("click", async () => { 
const id = prompt("Enter Employee ID:"); 
if (!id) { 
alert("Employee ID is required!"); 
return; 
} 
const name = prompt("Enter Employee Name:"); 
if (!name) { 
alert("Employee Name is required!"); 
return; 
} 
const age = prompt("Enter Employee Age:"); 
if (!age || isNaN(age)) { 
alert("Please enter a valid age!"); 
return; 
} 
const department = prompt("Enter Employee Department:"); 
if (!department) { 
alert("Department is required!"); 
return; 
} 
// Update XML Database 
const xmlDoc = parser.parseFromString(employeeXML, "application/xml"); 
const newEmployee = xmlDoc.createElement("employee"); 
const idElement = xmlDoc.createElement("id"); 
idElement.textContent = id; 
newEmployee.appendChild(idElement); 
const nameElement = xmlDoc.createElement("name"); 
nameElement.textContent = name; 
newEmployee.appendChild(nameElement); 
const ageElement = xmlDoc.createElement("age"); 
ageElement.textContent = age; 
newEmployee.appendChild(ageElement); 
const departmentElement = xmlDoc.createElement("department"); 
departmentElement.textContent = department; 
newEmployee.appendChild(departmentElement); 
xmlDoc.documentElement.appendChild(newEmployee); 
employeeXML = serializer.serializeToString(xmlDoc); 
await saveXML();
// Refresh table 
displayEmployees(); 
}); 
// Initial Display 
(async () => { 
  await loadXML(); 
  displayEmployees(); 
})();