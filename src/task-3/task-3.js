
export default function filterTable(tbody, filters) {
  const table = tbody.children;
  for (const row of table) {
    row.classList.remove('d-none', 'table-row-even')
  }
  let numberingCounter = 1;
  for (const row of table) {
    let counter = 0;
    for (const [key, value] of Object.entries(filters)) {
      if (row.querySelector(`td[data-field-name=${key}]`) && row.textContent.includes(value)) {
        counter++;
      }
    }
    if (counter !== Object.keys(filters).length) {
      row.classList.add('d-none')
    } else {
      row.firstElementChild.textContent = numberingCounter;
      if (numberingCounter % 2 === 0) {
        row.classList.add('table-row-even')
      }
      numberingCounter++;
    }
  }
}
