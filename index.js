let csvData1 = [];
let csvData2 = [];
let chart1, chart2;

// Load both CSV files initially and set up the periodic refresh
document.addEventListener('DOMContentLoaded', (event) => {
  loadCSV1();
  loadCSV2();
  setInterval(loadCSV1, 1000); // Refresh CSV1 every 1 second
  setInterval(loadCSV2, 1000); // Refresh CSV2 every 1 second
});

function loadCSV1() {
  fetch('data1.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      csvData1 = parseCSV(text);
      displayTable('table1', csvData1);
      updateGraph1(csvData1);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation for data1.csv:', error);
    });
}

function loadCSV2() {
  fetch('data2.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      csvData2 = parseCSV(text);
      displayTable('table2', csvData2);
      updateGraph2(csvData2);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation for data2.csv:', error);
    });
}

// Function to parse CSV text
function parseCSV(text) {
  return text.split('\n').map(row => row.split(',').map(cell => cell.trim()));
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

// Function to update the first graph (data1.csv)
function updateGraph1(data) {
  const categories = data.slice(1).map(row => row[0]);
  const values = data.slice(1).map(row => parseFloat(row[1]));
  const ctx = document.getElementById('chart1').getContext('2d');

  if (chart1) {
    chart1.data.labels = categories;
    chart1.data.datasets[0].data = values;
    chart1.update();
  } else {
    chart1 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: categories,
        datasets: [{
          label: 'Value from data1.csv',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// Function to update the second graph (data2.csv)
function updateGraph2(data) {
  const categories = data.slice(1).map(row => row[0]);
  const values = data.slice(1).map(row => parseFloat(row[1]));
  const ctx = document.getElementById('chart2').getContext('2d');

  if (chart2) {
    chart2.data.labels = categories;
    chart2.data.datasets[0].data = values;
    chart2.update();
  } else {
    chart2 = new Chart(ctx, {
      type: 'line',
      data: {
        labels: categories,
        datasets: [{
          label: 'Value from data2.csv',
          data: values,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}