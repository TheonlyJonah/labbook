function showEmployee() { 
    // Create JavaScript object 
    let employee = { 
        number: document.getElementById("empNo").value, 
        name: document.getElementById("empName").value, 
        salary: document.getElementById("salary").value 
    }; 
 
    // Display results 
    document.getElementById("output").innerHTML = 
        `<p><strong>Employee Number:</strong> ${employee.number}</p> 
         <p><strong>Employee Name:</strong> ${employee.name}</p> 
         <p><strong>Salary:</strong> ${employee.salary}</p>`; 
}