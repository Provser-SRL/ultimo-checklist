
// PARAMETROS
const URI = new URL(window.location.href);
const PARAMS = new URLSearchParams(URI.search);
const vehiculoId = PARAMS.get('vehiculo');

// GOOGLE SHEET
const spreadsheetId = '1B9fyL5jVDhPJplemN_rECSMxZ77_DqmxWBp84wD-sXs';  // Reemplázalo con el ID de tu hoja
const range = 'RESPUESTAS!A:AZ';
const apiKey = 'AIzaSyDEr-ilMHNaFKRicCxrkYoBRzCAN1rlnwU'; 


function loadSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            if (rows.length) {
                const matchingRows = findMatchingRows(rows, vehiculoId);
                console.log(matchingRows)
                displayData(matchingRows);
            } else {
                console.log('No se encontraron datos.');
            }
        })
        .catch(error => console.error('Error al leer los datos:', error));
}

function findMatchingRows(rows, vehiculoId) {
    // Buscamos las filas que tienen el ID de vehículo en la columna B (índice 1)
    return rows.filter(row => row[1] && row[1] === vehiculoId);
}

function displayData(rows) {
    
    console.log(rows)
    rows.sort((a,b) => convertToDate(a[0]) - convertToDate(b[0]) );
    let idx = rows.length - 1;
    console.log('ULTIMO ==> ',rows[idx])
    // Agregar los datos a la tabla
    let ultimo = rows[idx];
    document.getElementById('fecha').innerText = ultimo[0];
    document.getElementById('vehiculo').innerText = ultimo[1];
    document.getElementById('operario').innerText = ultimo[2];
    document.getElementById('horometro').innerText = ultimo[3];
    document.getElementById('mandos').innerText = ultimo[4];
    document.getElementById('frenos').innerText = ultimo[5];
    document.getElementById('transmision').innerText = ultimo[6];
    document.getElementById('ruedas').innerText = ultimo[7];
    document.getElementById('fijacion').innerText = ultimo[8];
    document.getElementById('coment1').innerText = ultimo[9] == null ? 'Sin Comentarios' : ultimo[9];
    document.getElementById('fugas').innerText = ultimo[10];
    document.getElementById('aceite').innerText = ultimo[11];
    document.getElementById('coment2').innerText = ultimo[12] == null ? 'Sin Comentarios' : ultimo[12];
    document.getElementById('bocina').innerText = ultimo[13];
    document.getElementById('luces').innerText = ultimo[14];
    document.getElementById('extintor').innerText = ultimo[15];
    document.getElementById('asientos').innerText = ultimo[16];
    document.getElementById('retroceso').innerText = ultimo[17];
    document.getElementById('cinturon').innerText = ultimo[18];
    document.getElementById('espejos').innerText = ultimo[19];
    document.getElementById('coment3').innerText = ultimo[20] == null ? 'Sin Comentarios' : ultimo[20];
    
}

function convertToDate(dateStr){
    return new Date(dateStr);
}

 window.onload = loadSheetData;