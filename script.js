function checkDay() { 
let userInput = document.getElementById("dayInput").value; 
let result = document.getElementById("result"); 
 
    // Validate input 
    if (isNaN(userInput) || userInput < 1 || userInput > 7) { 
        result.textContent = "Please enter a valid number between 1 and 7."; 
        result.style.color = "red"; 
        return; 
    } 
 
    // Load XML file 
    fetch("days.xml") 
        .then(response => response.text()) 
        .then(data => { 
            let parser = new DOMParser(); 
            let xml = parser.parseFromString(data, "text/xml"); 
 
            let dayName; 
 
            // Switch statement 
            switch (parseInt(userInput)) { 
                case 1: 
                    dayName = xml.querySelector('day[number="1"]').textContent; 
                    break; 
                case 2: 
                    dayName = xml.querySelector('day[number="2"]').textContent; 
                    break; 
                case 3: 
                    dayName = xml.querySelector('day[number="3"]').textContent; 
                    break; 
                case 4: 
                    dayName = xml.querySelector('day[number="4"]').textContent; 
                    break; 
                case 5: 
                    dayName = xml.querySelector('day[number="5"]').textContent; 
                    break; 
                case 6: 
                    dayName = xml.querySelector('day[number="6"]').textContent; 
                    break; 
                case 7: 
                    dayName = xml.querySelector('day[number="7"]').textContent; 
                    break; 
            } 
 
            result.textContent = "The day is: " + dayName; 
            result.style.color = "green"; 
}); 
}