// Event listener for form submission
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get form data and trim any extra spaces
  const studentName = document.getElementById("studentName").value.trim();
  const studentID = document.getElementById("studentID").value.trim();
  const emailId = document.getElementById("emailId").value.trim();
  const contactNo = document.getElementById("contactNo").value.trim();

  // Validate form inputs before proceeding
  if (!validateInputs(studentName, studentID, emailId, contactNo)) {
    return; // If validation fails, stop form submission
  }

  // Retrieve existing student records from localStorage or create an empty array if none exist
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

  // Create a new student record object
  const newRecord = { studentName, studentID, emailId, contactNo };

  // Add new record to the records array and update localStorage
  if (studentName && studentID && emailId && contactNo) {
    records.push(newRecord);
    localStorage.setItem("studentRecords", JSON.stringify(records)); // Save updated records to localStorage
    window.location.href = "records.html"; // Redirect to records page
  }
});

// Function to validate input fields
function validateInputs(studentName, studentID, emailId, contactNo) {
  const nameRegex = /^[A-Za-z\s]+$/; // Regex to allow only letters and spaces for student name
  const idRegex = /^\d+$/; // Regex for numeric student ID
  const contactRegex = /^\d+$/; // Regex for numeric contact number
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex for valid email format

  // Validate student name
  if (!studentName || !nameRegex.test(studentName)) {
    alert("Please enter a valid name (letters only).");
    return false;
  }

  // Validate student ID
  if (!studentID || !idRegex.test(studentID)) {
    alert("Please enter a valid student ID (numbers only).");
    return false;
  }

  // Validate email
  if (!emailId || !emailRegex.test(emailId)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate contact number
  if (!contactNo || !contactRegex.test(contactNo)) {
    alert("Please enter a valid contact number (numbers only).");
    return false;
  }

  return true; // Return true if all validations pass
}
