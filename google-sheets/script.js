document.addEventListener('DOMContentLoaded', () => {
    const rows = 10, cols = 10;
    const table = document.getElementById('spreadsheet');

    // Create initial grid
    for (let i = 0; i <= rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j <= cols; j++) {
            const cell = document.createElement(i === 0 || j === 0 ? 'th' : 'td');
            cell.contentEditable = i > 0 && j > 0; // Only data cells editable
            if (i === 0 && j > 0) cell.textContent = String.fromCharCode(64 + j); // Column headers
            if (j === 0 && i > 0) cell.textContent = i; // Row headers
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Apply formatting functions
    window.applyBold = () => applyStyle('fontWeight', 'bold');
    window.applyItalic = () => applyStyle('fontStyle', 'italic');

    function applyStyle(styleProp, value) {
        const selection = document.getSelection();
        const element = selection.anchorNode.parentElement;
        if (element.tagName === 'TD') {
            element.style[styleProp] = value;
        }
    }

    window.applyUpperCase = () => applyCase('upper');
    window.applyLowerCase = () => applyCase('lower');

    function applyCase(type) {
        const selection = document.getSelection();
        const element = selection.anchorNode.parentElement;
        if (element.tagName === 'TD') {
            element.textContent = type === 'upper' ? element.textContent.toUpperCase() : element.textContent.toLowerCase();
        }
    }

    window.findAndReplace = () => {
        const find = prompt('Enter text to find:');
        const replace = prompt('Enter replacement text:');
        const cells = document.querySelectorAll('#spreadsheet td');
        cells.forEach(cell => {
            if (cell.textContent.includes(find)) {
                cell.textContent = cell.textContent.replace(new RegExp(find, 'g'), replace);
            }
        });
    };
});
