
function clearAllRows(tbody) {
    for (const row of tbody.children) {
        row.classList.remove("d-none", "table-row-even");
    }
}

function filterRows(tbody, filters) {
    for (const [prop, filter] of Object.entries(filters)) {
        const tds = tbody.querySelectorAll(`td[data-field-name="${prop}"]`);

        for (const td of tds) {
            if (!td.innerHTML.includes(filter)) {
                td.parentElement.classList.add("d-none");
            }
        }
    }
}

function makePretty(tbody) {
    let index = 1;
    for (const row of tbody.children) {
        if (row.classList.contains("d-none")) {
            continue;
        }

        if (!(index % 2)) {
            row.classList.add("table-row-even");
        }
        row.children[0].innerHTML = index;

        index++;
    }
}

export default function filterTable(tbody, filters) {
    clearAllRows(tbody);

    filterRows(tbody, filters);

    makePretty(tbody);
}
