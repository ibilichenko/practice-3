
export default function filterTable(tbody, filters) {
  const table = tbody.children;
  deleteClasses(table);
  filter(table, filters);
  updateNumeration(table)
  updateStrips(table)
}

function deleteClasses(tableElements) {
  for (const row of tableElements) {
    row.classList.remove('d-none', 'table-row-even')
  }
}

function filter(elements, filters) {
  for (const el of elements) {
    let counter = 0;
    for (const [key, value] of Object.entries(filters)) {
      const wantedEl = el.querySelector(`td[data-field-name=${key}]`);
      if (wantedEl && wantedEl.textContent.includes(value)) {
        counter++;
      }
    }
    if (counter !== Object.keys(filters).length) {
      el.classList.add('d-none')
    }
  }
}

function updateNumeration(elements) {
  let numerationCounter = 1;
  for (const element of elements) {
    if (!element.classList.contains('d-none')) {
      element.firstElementChild.textContent = numerationCounter;
      numerationCounter++;
    }
  }
}
function getVisibleElements(elements) {
  const visibleEl = []
  for (const el of elements) {
    if (!el.classList.contains('d-none')) {
      visibleEl.push(el);
    }
  }

  return visibleEl
}
function updateStrips(elements) {
  let counter = 1;
  for (const element of getVisibleElements(elements)) {
    if (counter % 2 === 0) {
      element.classList.add('table-row-even')
    }
    counter++;
  }
}
