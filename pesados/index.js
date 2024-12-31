// AIzaSyDEr-ilMHNaFKRicCxrkYoBRzCAN1rlnwU

// ID de tu Google Sheets y el nombre de la hoja
const spreadsheetId = '12pZlTW89lSduw2DRP3mwvP79FwoteghrO7qAHweS3KM';  // Reemplázalo con el ID de tu hoja
const range = 'Respuestas de formulario 1!B:B';  // Asegúrate de cambiar el rango a la columna que desees (ej. A:A para la columna A)

const apiKey = 'AIzaSyDEr-ilMHNaFKRicCxrkYoBRzCAN1rlnwU';  // Reemplázalo con tu clave de API

// Función para cargar los datos desde Google Sheets
function loadSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows.length) {
                let items = parseRows(rows);
                displayData(items);
            } else {
                console.log('No se encontraron datos.');
            }
        })
        .catch(error => console.error('Error al leer los datos:', error));
}

// Función para mostrar los datos en la página
function displayData(rows) {
    const select = document.getElementById('vehiculos');
    rows.forEach(row => {
        if(row.toUpperCase() != 'VEHICULOS' && row.toUpperCase() != 'VEHICULO'){
            const option = document.createElement('option');
            option.value = row;
            option.textContent = row;  // Asumiendo que estamos leyendo solo la primera columna
            select.appendChild(option);
        }
        
    });
}

function parseRows(rows){
    let columnData = rows.map(row =>row[0]);
    let uniqueData = [...new Set(columnData)].sort();
    console.log(uniqueData)
    return uniqueData;
}

// Cargar los datos al cargar la página
window.onload = loadSheetData;
