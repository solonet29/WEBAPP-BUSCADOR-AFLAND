// Se espera a que todo el documento HTML esté cargado y listo.
$(document).ready(function() {

    // 1. Se pide la información del archivo local 'script.json'.
    fetch('script.json')
        .then(response => {
            // Se comprueba si el archivo se encontró correctamente.
            if (!response.ok) {
                throw new Error('Error al cargar script.json. Estado: ' + response.status);
            }
            // Si se encontró, se convierte la respuesta a formato JSON.
            return response.json();
        })
        .then(data => {
            // 2. Una vez convertidos los datos, se llama a la función para mostrarlos en pantalla.
            displayEvents(data);
        })
        .catch(error => {
            // 3. Si ocurre algún error en todo el proceso, se muestra un mensaje en la consola y en la página.
            console.error('Hubo un problema con la operación de fetch:', error);
            $('#container_artist').html('<p>No se pudieron cargar los eventos. Revisa la consola para más detalles.</p>');
        });

    /**
     * Esta es la función que recibe la lista de eventos y los "dibuja" en la página.
     * @param {Array} events - La lista de eventos que viene del archivo script.json.
     */
    function displayEvents(events) {
        const resultsContainer = $('#container_artist');
        resultsContainer.empty(); // Se vacía el contenedor por si había algo antes.

        // Se comprueba si la lista de eventos está vacía.
        if (!events || events.length === 0) {
            resultsContainer.html('<p>No se encontraron eventos en el archivo de datos.</p>');
            return;
        }

        // Se recorre cada evento de la lista.
        events.forEach(event => {
            
            // Para cada evento, se crea el código HTML de su tarjeta.
            // ¡CORREGIDO! Ya no se incluye la etiqueta <img>.
            // Se usan los nombres de las propiedades de tu JSON: name, artist, description, city, date.
            const cardHTML = `
                <div class="card_artist">
                    <h2>${event.name}</h2>
                    <p><strong>${event.artist}</strong></p>
                    <p>${event.description}</p>
                    <p style="color: var(--color-texto-secundario); font-size: 0.8rem; margin-top: 10px;">
                        ${event.city} - ${event.date}
                    </p>
                </div>
            `;
            
            // Finalmente, se añade la tarjeta recién creada al contenedor principal.
            resultsContainer.append(cardHTML);
        });
    }
});