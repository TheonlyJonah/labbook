// Simple and reliable recruitment screening tool
console.log('Loading recruitment screening tool...');

// Job criteria (can be easily modified)
const JOB_CRITERIA = {
    minimumAge: 18,
    minimumExperience: 2,
    jobTitle: "Software Developer",
    department: "Information Technology"
};

// Initialize when page is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - initializing app');
    initializeApp();
});

// Backup initialization
window.addEventListener('load', function() {
    console.log('Window loaded - ensuring initialization');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    displayJobCriteria();
    
    // Ensure button is ready
    const button = document.getElementById('screenBtn');
    if (button) {
        console.log('Button found and ready');
        // Make sure click handler is attached
        button.onclick = function() {
            console.log('Button clicked!');
            startScreening();
        };
    } else {
        console.error('Button not found!');
    }
}

function displayJobCriteria() {
    const criteriaDiv = document.getElementById('criteriaDisplay');
    if (!criteriaDiv) {
        console.error('Criteria display div not found');
        return;
    }
    
    criteriaDiv.innerHTML = `
        <div class="criteria-item">
            <span class="criteria-label">Job Title:</span>
            <span class="criteria-value">${JOB_CRITERIA.jobTitle}</span>
        </div>
        <div class="criteria-item">
            <span class="criteria-label">Department:</span>
            <span class="criteria-value">${JOB_CRITERIA.department}</span>
        </div>
        <div class="criteria-item">
            <span class="criteria-label">Minimum Age:</span>
            <span class="criteria-value">${JOB_CRITERIA.minimumAge} years</span>
        </div>
        <div class="criteria-item">
            <span class="criteria-label">Minimum Experience:</span>
            <span class="criteria-value">${JOB_CRITERIA.minimumExperience} years</span>
        </div>
    `;
    console.log('Job criteria displayed');
}

function startScreening() {
    console.log('Starting screening process...');
    
    const resultDiv = document.getElementById('result');
    const button = document.getElementById('screenBtn');
    
    if (!resultDiv) {
        alert('Error: Result area not found');
        return;
    }
    
    // Update button state
    button.disabled = true;
    button.textContent = 'Processing...';
    
    try {
        // Get applicant age
        const ageInput = prompt("Enter the applicant's age:", "");
        if (ageInput === null) {
            resetButton(button);
            return; // User cancelled
        }
        
        // Get applicant experience
        const experienceInput = prompt("Enter the applicant's years of experience:", "");
        if (experienceInput === null) {
            resetButton(button);
            return; // User cancelled
        }
        
        // Validate inputs
        const age = parseInt(ageInput);
        const experience = parseInt(experienceInput);
        
        if (isNaN(age) || isNaN(experience)) {
            showError(resultDiv, "Please enter valid numbers for age and experience.");
            resetButton(button);
            return;
        }
        
        if (age <= 0 || age > 120) {
            showError(resultDiv, "Age must be between 1 and 120 years.");
            resetButton(button);
            return;
        }
        
        if (experience < 0 || experience > 50) {
            showError(resultDiv, "Experience must be between 0 and 50 years.");
            resetButton(button);
            return;
        }
        
        // Check if experience makes sense with age
        if (experience > (age - 16)) {
            showError(resultDiv, "Years of experience cannot exceed working age (age - 16).");
            resetButton(button);
            return;
        }
        
        // Evaluate applicant
        const meetsAge = age >= JOB_CRITERIA.minimumAge;
        const meetsExperience = experience >= JOB_CRITERIA.minimumExperience;
        const isSelected = meetsAge && meetsExperience;
        
        // Show results
        showResults(resultDiv, age, experience, isSelected, meetsAge, meetsExperience);
        
    } catch (error) {
        console.error('Error during screening:', error);
        showError(resultDiv, "An error occurred during screening. Please try again.");
    }
    
    resetButton(button);
}

function showResults(resultDiv, age, experience, isSelected, meetsAge, meetsExperience) {
    const statusClass = isSelected ? 'status-selected' : 'status-rejected';
    const statusText = isSelected ? 'SELECTED' : 'NOT SELECTED';
    
    let reasons = '';
    if (!isSelected) {
        const reasonsList = [];
        if (!meetsAge) {
            reasonsList.push(`Age requirement not met (minimum: ${JOB_CRITERIA.minimumAge} years)`);
        }
        if (!meetsExperience) {
            reasonsList.push(`Experience requirement not met (minimum: ${JOB_CRITERIA.minimumExperience} years)`);
        }
        
        if (reasonsList.length > 0) {
            reasons = `
                <div class="error-message">
                    <strong>Reasons for rejection:</strong>
                    <ul>
                        ${reasonsList.map(reason => `<li>${reason}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    resultDiv.innerHTML = `
        <h3>Screening Results</h3>
        <div class="applicant-details">
            <h4>Applicant Information</h4>
            <p><strong>Age:</strong> ${age} years</p>
            <p><strong>Experience:</strong> ${experience} years</p>
            <p><strong>Position:</strong> ${JOB_CRITERIA.jobTitle}</p>
            <p><strong>Department:</strong> ${JOB_CRITERIA.department}</p>
        </div>
        
        ${reasons}
        
        <div class="${statusClass}">
            <strong>Applicant Status: ${statusText}</strong>
        </div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    
    console.log(`Screening complete: ${statusText} (Age: ${age}, Experience: ${experience})`);
}

function showError(resultDiv, message) {
    resultDiv.innerHTML = `
        <h3>Input Error</h3>
        <div class="error-message">
            <strong>Error:</strong> ${message}
        </div>
        <p>Please try again with valid input.</p>
    `;
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetButton(button) {
    button.disabled = false;
    button.textContent = 'Start Screening Process';
}

// Alternative function name for HTML onclick
function screenApplicant() {
    startScreening();
}

// Test function
function testFunction() {
    alert('JavaScript is working correctly!');
    console.log('Test function called successfully');
}

console.log('Recruitment screening tool loaded successfully!');