document.addEventListener("DOMContentLoaded", function () {
  // Retrieve student records from localStorage or initialize an empty array
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
  loadTable(); // Load the table with existing records from localStorage

  // Function to load table data
  function loadTable() {
    // Get the table body where records will be displayed
    const tableBody = document
      .getElementById("studentTable")
      .getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear the existing table body to avoid duplication

    // Populate the table with records
    records.forEach((record, index) => {
      // Check that each field is defined to avoid displaying incomplete data
      if (
        record.studentName &&
        record.studentID &&
        record.emailId &&
        record.contactNo
      ) {
        const row = tableBody.insertRow(); // Create a new row for each valid record
        row.insertCell(0).innerHTML = record.studentName; // Insert student name into the row
        row.insertCell(1).innerHTML = record.studentID; // Insert student ID into the row
        row.insertCell(2).innerHTML = record.emailId; // Insert email ID into the row
        row.insertCell(3).innerHTML = record.contactNo; // Insert contact number into the row
        row.insertCell(4).innerHTML = `
          <button onclick="editRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        `; // Create Edit and Delete buttons for each record
      }
    });
  }

  // Function to delete a record from the list
  window.deleteRecord = function (index) {
    // Remove the record at the specified index from the records array
    records.splice(index, 1);
    // Update localStorage to reflect the deletion
    localStorage.setItem("studentRecords", JSON.stringify(records));
    loadTable(); // Reload the table to show updated records
  };

  // Function to edit an existing record
  window.editRecord = function (index) {
    // Retrieve the current record to edit
    const record = records[index];

    // Prompt user for new values to update the record
    const newStudentName = prompt(
      "Enter new student name:",
      record.studentName
    );
    const newStudentID = prompt("Enter new student ID:", record.studentID);
    const newEmailId = prompt("Enter new email ID:", record.emailId);
    const newContactNo = prompt("Enter new contact number:", record.contactNo);

    // Validate that all fields have new values before updating
    if (newStudentName && newStudentID && newEmailId && newContactNo) {
      // Update the record with new values provided by the user
      records[index] = {
        studentName: newStudentName,
        studentID: newStudentID,
        emailId: newEmailId,
        contactNo: newContactNo,
      };
      // Update localStorage with the modified records array
      localStorage.setItem("studentRecords", JSON.stringify(records));
      loadTable(); // Reload the table to reflect changes
    }
  };
});
