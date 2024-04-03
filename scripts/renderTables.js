
function sortme(column){
    const table = document.getElementById('csvTable');
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const sortOrder = table.querySelectorAll('thead th')[column].dataset.order || 'asc';

    // Reset order for all headers
    table.querySelectorAll('thead th').forEach(th => {
      th.dataset.order = '';
      th.querySelector('.sort-icon').className = 'sort-icon unselected';
    });

    // Set new order
    if (sortOrder === 'asc') {
      table.querySelectorAll('thead th')[column].dataset.order = 'desc';
      table.querySelectorAll('thead th')[column].querySelector('.sort-icon').className = 'sort-icon desc';
    } else if (sortOrder === 'desc') {
      table.querySelectorAll('thead th')[column].dataset.order = '';
      table.querySelectorAll('thead th')[column].querySelector('.sort-icon').className = 'sort-icon unselected';
    } else {
      table.querySelectorAll('thead th')[column].dataset.order = 'asc';
      table.querySelectorAll('thead th')[column].querySelector('.sort-icon').className = 'sort-icon asc';
    }
    // Sort table
    rows.sort((a, b) => {
      const aValue = a.children[column].textContent.trim();
      const bValue = b.children[column].textContent.trim();

      // Convert values to numbers (or NaN)
      const aNumeric = parseFloat(aValue);
      const bNumeric = parseFloat(bValue);

      // If both are numeric, compare as numbers
      // If only one is numeric, place it before
      // If none are numeric, compare as strings
      if (!isNaN(aNumeric) && !isNaN(bNumeric)) {
          // Both are numeric
          return (sortOrder === 'asc' ? aNumeric - bNumeric : bNumeric - aNumeric) || aValue.localeCompare(bValue);
      } else if (!isNaN(aNumeric)) {
          // Only aValue is numeric
          return -1;
      } else if (!isNaN(bNumeric)) {
          // Only bValue is numeric
          return 1;
      } else {
          // Neither are numeric, compare as strings
          return (sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue));
      }
    });
    rows.forEach(row => table.querySelector('tbody').appendChild(row));
}

const sheetname = document.getElementById("pookie").textContent;
fetch(sheetname)
.then(response => response.text())
.then(csv => {
    // Parse CSV
    const rows = csv.split('\r');
    const headers = rows[0].split(',');

    // Sort by header
    const sortByIndex = -1;

    // Sort data based on specified column
    rows.shift(); // Remove header row
    const sortedRows = rows.sort((a, b) => {
    const aValue = isNaN(parseFloat(a.split(',')[sortByIndex])) ? a.split(',')[sortByIndex] : parseFloat(a.split(',')[sortByIndex]);
    const bValue = isNaN(parseFloat(b.split(',')[sortByIndex])) ? b.split(',')[sortByIndex] : parseFloat(b.split(',')[sortByIndex]);
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
    });
    
    // Generate table
    const table = document.getElementById('csvTable');
    const thead = document.createElement('thead');
    let i=0;
    headers.forEach(cell => {
    const th = document.createElement('th');
    th.setAttribute("id", `header${i}`)
    th.setAttribute("onclick", `sortme(${i++})`)
    th.textContent = cell;
    const sp = document.createElement('span');
    sp.setAttribute("class", "sort-icon unselected");
    th.appendChild(sp);
    thead.appendChild(th);
    })
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    sortedRows.forEach(row => {
    const cells = row.split(',');
    if(cells.length > 1){
        const tr = document.createElement('tr');
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
    });

    if(sheetname=="../assets/investmentCALC.csv"){
      for(let i=4; i<=6; i++){
        let temp = document.getElementById(`header${i}`);
        temp.removeAttribute("onclick");
        temp.querySelector("span").style.display = "none";
      }
    }
})
.catch(error => console.error('Error fetching CSV:', error));

