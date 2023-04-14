"use strict";
const DEFAULT_COLOR = '#FFF000';
const EMPTY_COLOR = '#00000000';
const MYAPP = {
    isMouseDown: false,
    color: DEFAULT_COLOR,
};
window.onload = function () {
    initializeColorPicker();
    createListnerForColorPicker();
    addEventListenersForSliderValues();
};
function initializeColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    colorPicker.value = DEFAULT_COLOR;
}
function createListnerForColorPicker() {
    const colorPicker = document.getElementById('color-picker');
    addEventListener('input', () => {
        MYAPP.color = colorPicker.value;
    });
}
function addEventListenersForSliderValues() {
    const heightValue = document.getElementById('grid-height-value');
    const widthValue = document.getElementById('grid-width-value');
    const widthSlider = document.getElementById('grid-width');
    const heightSlider = document.getElementById('grid-height');
    widthSlider.addEventListener('input', (e) => {
        const sliderElement = e.target;
        widthValue.innerHTML = String(sliderElement.value);
    });
    heightSlider.addEventListener('input', (e) => {
        const sliderElement = e.target;
        heightValue.innerHTML = String(sliderElement.value);
    });
}
function createGridWithSpecificSize(rows, cols) {
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    for (let row = 0; row < rows; row++) {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('gridRow');
        for (let col = 0; col < cols; col++) {
            const tableCell = document.createElement('td');
            tableCell.classList.add('gridCell');
            tableRow.appendChild(tableCell);
        }
        table.appendChild(tableRow);
    }
    return table;
}
function changeBackgroundColorOfCell(event) {
    const cell = event.target;
    cell.style.backgroundColor = MYAPP.color;
}
function handleMouseDown(e) {
    changeBackgroundColorOfCell(e);
    MYAPP.isMouseDown = true;
}
function handleMouseUp(e) {
    MYAPP.isMouseDown = false;
}
function handleMouseOver(e) {
    if (!MYAPP.isMouseDown) {
        return;
    }
    changeBackgroundColorOfCell(e);
}
function applyFunctionToEveryCell(grid, f) {
    for (let row of grid.rows) {
        for (let cell of row.cells) {
            f(cell);
        }
    }
}
function addEventListenersToCells(grid) {
    applyFunctionToEveryCell(grid, (cell) => {
        cell.addEventListener('mousedown', handleMouseDown);
        cell.addEventListener('mouseup', handleMouseUp);
        cell.addEventListener('mouseover', handleMouseOver);
    });
}
// Button onclick functions
function createGrid() {
    //  remove existing grid
    const existingTable = document.getElementById('table');
    if (existingTable) {
        existingTable.remove();
    }
    //  add new grid
    const gridWidthEl = document.getElementById('grid-width');
    const gridWidth = Number(gridWidthEl.value);
    const gridHeightEl = document.getElementById('grid-height');
    const gridHeight = Number(gridHeightEl.value);
    const gridContainer = document.getElementById('grid-container');
    const grid = createGridWithSpecificSize(gridWidth, gridHeight);
    addEventListenersToCells(grid);
    gridContainer.appendChild(grid);
}
function clearGrid() {
    const grid = document.getElementById('table');
    if (!grid) {
        return;
    }
    applyFunctionToEveryCell(grid, (cell) => {
        cell.style.backgroundColor = EMPTY_COLOR;
    });
}
