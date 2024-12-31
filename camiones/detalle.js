
// PARAMETROS
const URI = new URL(window.location.href);
const PARAMS = new URLSearchParams(URI.search);
const vehiculoId = PARAMS.get('vehiculo');

// GOOGLE SHEET
const spreadsheetId = '1HW550EJzFdhlM8xFaSVRLlaiLDoxXpdOlTl2y_uj044';  // Reemplázalo con el ID de tu hoja
const range = 'Respuestas de formulario 1!A:Z';
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
    // Buscamos las filas que tienen el ID de vehículo en la columna C (índice 2)
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

    document.getElementById('frenos').innerText = ultimo[4];
    document.getElementById('frenosEst').innerText = ultimo[5];
    document.getElementById('direccion').innerText = ultimo[6];
    document.getElementById('ruedas').innerText = ultimo[7];
    document.getElementById('cabina').innerText = ultimo[8];
    document.getElementById('ac').innerText = ultimo[9];
    document.getElementById('coment1').innerText = ultimo[10] == null ? 'Sin Comentarios' : ultimo[10];

    document.getElementById('fluidos').innerText = ultimo[11];
    document.getElementById('aceite').innerText = ultimo[12];
    document.getElementById('radiador').innerText = ultimo[13];
    document.getElementById('combustible').innerText = ultimo[14];
    document.getElementById('mangueras').innerText = ultimo[15];
    document.getElementById('coment2').innerText = ultimo[16] == null ? 'Sin Comentarios' : ultimo[16];

    document.getElementById('cinturon').innerText = ultimo[17];
    document.getElementById('luces').innerText = ultimo[18];
    document.getElementById('camara').innerText = ultimo[19];
    document.getElementById('bocina').innerText = ultimo[20];
    document.getElementById('matafuego').innerText = ultimo[21];
    document.getElementById('cuñas').innerText = ultimo[22]; 
    document.getElementById('coment3').innerText = ultimo[23]  == null ? 'Sin Comentarios' : ultimo[23];

    document.getElementById('batea').innerText = ultimo[24];
    document.getElementById('barandas').innerText = ultimo[25];
    document.getElementById('paragolpes').innerText = ultimo[26];
    document.getElementById('cadenas').innerText = ultimo[27];
    document.getElementById('elasticos').innerText = ultimo[28];
    document.getElementById('eje').innerText = ultimo[29];
    document.getElementById('coment4').innerText = ultimo[30]== null ? 'Sin Comentarios' : ultimo[30];
    
}

function convertToDate(dateStr){
    return new Date(dateStr);
}

 window.onload = loadSheetData;