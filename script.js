// Get the reference to the HTML element with the id "input-box"
const inputBox = document.getElementById("input-box");

// Get the reference to the HTML element with the id "list-container"
const listContainer = document.getElementById("list-container");

// Add an event listener for the "Enter" key press on the inputBox
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Call the addTask function when "Enter" is pressed
        addTask();
    }
});

// Function to add a task to the list
function addTask() {
    // Check if the input box is empty
    if (inputBox.value === '') {
        // Show a SweetAlert if the input box is empty
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You must write something!",
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#4361ee',
        });
    } else {
        // Create a new list item element
        let li = document.createElement("li");

        // Set the inner HTML of the list item to the value entered in the input box
        li.innerHTML = inputBox.value;

        // Append the new list item to the list container. Display list
        listContainer.appendChild(li);

        // Create a new span element with an X mark icon
        let span = document.createElement("span");
        span.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        
        // Append the span to the list item
        li.appendChild(span);
    }

    // Clear the input box after adding a task
    inputBox.value = "";

    // Save the updated list to local storage
    saveData();
}

// Add a click event listener to the "listContainer" element
listContainer.addEventListener("click", function (e) {
    // Check if the clicked element's tag name is "LI"
    if (e.target.tagName === "LI") {
        // Toggle the "checked" class on the clicked "LI" element
        e.target.classList.toggle("checked");

        // Save the updated list to local storage
        saveData();
    }
    // Check if the clicked element's tag name is "SPAN"
    else if (e.target.tagName === "SPAN") {
        // If the parent "LI" is not checked, ask for confirmation before removing
        if (!e.target.parentElement.classList.contains("checked")) {
            // Show a confirmation alert
            Swal.fire({
                title: 'Confirm Deletion',
                text: 'This task is not checked. Are you sure you want to delete it?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'No, keep it',
                confirmButtonColor: '#c1121f',
                cancelButtonColor: '#4361ee',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    // If the user clicks "Yes," remove the task
                    e.target.parentElement.remove();
                    // Save the updated list to local storage
                    saveData();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your task has been removed.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6', // Set the color to blue
                    });
                    
                } else {
                    // If the user clicks "No," do nothing
                }
            });
        } else {
            // If the parent "LI" is checked, simply remove the task without confirmation
            e.target.parentElement.remove();
            // Save the updated list to local storage
            saveData();
        }
    }
}, false);

// Function to save the current state of the list to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to retrieve and display tasks from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display tasks from local storage
showTask();
