document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("bpForm");
    const tableBody = document.querySelector("#recordsTable tbody");
    const storageKey = "bloodPressureRecords";

    function loadRecords() {
        const records = JSON.parse(localStorage.getItem(storageKey)) || [];
        records.forEach(addRecordToTable);
    }

    function addRecordToTable(record, index) {
        const row = document.createElement("tr");
        let color = "white"
        if(record.systolic < 110){
            color = "#acace3"
        }else if(record.systolic >= 110 && record.systolic <= 130){
            color= "#6cf76c"
        }else if(record.systolic >= 130 && record.systolic <= 150){
            color= "#f5b5b5"
        }
        else if(record.systolic > 150){
            color= "#ff5f5f"
        }else{
            color="white"
        }
        row.innerHTML = `
            <td>${record.dateTime}</td>
            <td style="background-color: ${color}">${record.diastolic} / ${record.systolic} mmHg</td>
            <td><button data-index="${index}" class="delete-btn">Delete</button></td>`
        ;
        tableBody.appendChild(row);
    }

    function saveRecord(record) {
        const records = JSON.parse(localStorage.getItem(storageKey)) || [];
        records.push(record);
        localStorage.setItem(storageKey, JSON.stringify(records));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const systolic = document.getElementById("systolic").value;
        const diastolic = document.getElementById("diastolic").value;
        const dateTime = new Date().toLocaleString();

        const record = { systolic, diastolic, dateTime };

        saveRecord(record);
        addRecordToTable(record, JSON.parse(localStorage.getItem(storageKey)).length - 1);

        form.reset();
    });

    tableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.dataset.index;
            const records = JSON.parse(localStorage.getItem(storageKey)) || [];
            records.splice(index, 1);
            localStorage.setItem(storageKey, JSON.stringify(records));
            tableBody.innerHTML = "";
            loadRecords();
        }
    });

    loadRecords();
});