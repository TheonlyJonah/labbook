// script.js 
const parser = new DOMParser(); 
const serializer = new XMLSerializer(); 
// Initial XML Database 
let salesXML = ` 
<sales> 
</sales> 
`; 
// Function to load sales from server
async function loadSales() {
    try {
        const response = await fetch('save_sales.php');
        if (response.ok) {
            salesXML = await response.text();
        }
    } catch (error) {
        console.error('Error loading sales:', error);
    }
}
// Function to save sales to server
async function saveSales() {
    try {
        const response = await fetch('save_sales.php', {
            method: 'POST',
            body: salesXML,
            headers: {
                'Content-Type': 'application/xml'
            }
        });
        if (!response.ok) {
            console.error('Error saving sales');
        }
    } catch (error) {
        console.error('Error saving sales:', error);
    }
}
// Function to display sales data 
function displaySales() { 
const xmlDoc = parser.parseFromString(salesXML, "application/xml"); 
const sales = xmlDoc.getElementsByTagName("sale"); 
const tableBody = document.querySelector("#salesTable tbody"); 
tableBody.innerHTML = ""; // Clear existing rows 
Array.from(sales).forEach((sale) => { 
const id = sale.getElementsByTagName("productID")[0].textContent; 
const name = 
sale.getElementsByTagName("productName")[0].textContent; 
const quantity = sale.getElementsByTagName("quantity")[0].textContent; 
const price = sale.getElementsByTagName("price")[0].textContent; 
const row = document.createElement("tr"); 
row.innerHTML = ` 
<td>${id}</td> 
<td>${name}</td> 
<td>${quantity}</td> 
<td>${price}</td> 
`; 
tableBody.appendChild(row); 
}); 
} 
// Function to add a new sale 
document.getElementById("addSaleBtn").addEventListener("click", () => { 
const productID = prompt("Enter Product ID:"); 
if (!productID) { 
alert("Product ID is required!"); 
return; 
} 
const productName = prompt("Enter Product Name:"); 
if (!productName) { 
alert("Product Name is required!"); 
return; 
} 
const quantity = prompt("Enter Quantity Sold:"); 
if (!quantity || isNaN(quantity) || Number(quantity) <= 0) { 
alert("Please enter a valid quantity!"); 
return; 
} 
const price = prompt("Enter Price:"); 
if (!price || isNaN(price) || Number(price) <= 0) { 
alert("Please enter a valid price!"); 
return; 
} 
// Update XML Database 
const xmlDoc = parser.parseFromString(salesXML, "application/xml"); 
const newSale = xmlDoc.createElement("sale"); 
const idElement = xmlDoc.createElement("productID"); 
idElement.textContent = productID; 
newSale.appendChild(idElement); 
const nameElement = xmlDoc.createElement("productName"); 
nameElement.textContent = productName; 
newSale.appendChild(nameElement); 
const quantityElement = xmlDoc.createElement("quantity"); 
quantityElement.textContent = quantity; 
newSale.appendChild(quantityElement); 
const priceElement = xmlDoc.createElement("price"); 
priceElement.textContent = price; 
newSale.appendChild(priceElement); 
xmlDoc.documentElement.appendChild(newSale); 
salesXML = serializer.serializeToString(xmlDoc); 
// Save to server
saveSales();
// Refresh table 
displaySales(); 
}); 
// Initial Display 
(async () => {
    await loadSales();
    displaySales();
})();