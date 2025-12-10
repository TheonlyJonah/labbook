// script.js 
let studentCount = 0; 
document.getElementById('addStudentBtn').addEventListener('click', () => { 
const name = prompt('Enter the student name:'); 
if (!name) { 
alert('Name cannot be empty!'); 
return; 
} 
const age = prompt('Enter the student age:'); 
if (!age || isNaN(age)) { 
alert('Please enter a valid age!'); 
return; 
} 
const grade = prompt('Enter the student grade:'); 
if (!grade) { 
alert('Grade cannot be empty!'); 
return; 
} 
// Increment student count 
studentCount++; 
// Add student details to the table 
const tableBody = document.querySelector('#studentTable tbody'); 
const row = document.createElement('tr'); 
row.innerHTML = ` 
<td>${studentCount}</td> 
<td>${name}</td> 
<td>${age}</td> 
<td>${grade}</td> 
`; 
tableBody.appendChild(row); 
});