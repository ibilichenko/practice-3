import filterTable from './task-3';
import renderTable from './render';
import albums from './albums.json';

const table = document.getElementById('table-task-3');
const tbody = table.querySelector('tbody');
const filterButton = table.querySelector('button');
const filterInputs = [...table.querySelectorAll('input')];

renderTable(tbody, albums, ['album', 'performer', 'genre', 'year']);

filterButton.addEventListener('click', () => {
  const filters = filterInputs.reduce((acc, input) => {
    if (input.value) {
      acc[input.dataset.field] = input.value;
    }
    
    return acc;
  }, {});

  filterTable(tbody, filters);
});
