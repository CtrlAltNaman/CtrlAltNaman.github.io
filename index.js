let csvData = [];

// Load the CSV file initially and set up the periodic refresh
document.addEventListener('DOMContentLoaded', (event) => {
  loadCSV();
  setInterval(loadCSV, 500); // Refresh every 0.5 seconds
});

function loadCSV() {
  fetch('data.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      csvData = parseCSV(text);
      displayTable('table1', csvData);
      displayTable('table2', csvData);
      renderGraph1(csvData);
      renderGraph2(csvData);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Function to parse CSV text
function parseCSV(text) {
  const rows = text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
  return rows;
}

// Function to display CSV data in a table
function displayTable(tableId, data) {
  const table = document.getElementById(tableId);
  table.innerHTML = '';

  data.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

// Function to render the first graph
function renderGraph1(data) {
  const labels = data[0].slice(1);
  const values = data.slice(1).map(row => parseFloat(row[1]));

  const ctx = document.getElementById('chart1').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Dataset 1',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Function to render the second graph
function renderGraph2(data) {
  const labels = data[0].slice(1);
  const values = data.slice(1).map(row => parseFloat(row[2]));

  const ctx = document.getElementById('chart2').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Dataset 2',
        data: values,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
