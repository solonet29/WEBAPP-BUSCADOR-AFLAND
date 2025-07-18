$(document).ready(function() {
    // Esta función se ejecuta en cuanto la página ha cargado completamente.

    // 1. Pedimos los datos a tu archivo local script.json
    fetch('script.json')
        .then(response => {
            // Se comprueba si el archivo se encontró y la respuesta es correcta
            if (!response.ok) {
                throw new Error('Error al cargar script.json. Estado: ' + response.status);
            }
            return response.json(); // Se convierten los datos a formato JSON
        })
        .then(data => {
            // 2. Una vez tenemos los datos, se los pasamos a la función que los mostrará
            displayEvents(data);
        })
        .catch(error => {
            // Si ocurre cualquier error en el proceso, se muestra un mensaje en la pantalla
            console.error('Hubo un problema con la operación fetch:', error);
            $('#container_artist').html('<p>No se pudieron cargar los eventos.</p>');
        });

    // 3. Esta es la función que sabe cómo "dibujar" cada tarjeta
    function displayEvents(events) {
        const resultsContainer = $('#container_artist');
        resultsContainer.empty(); // Limpiamos el contenedor por si había algo antes

        if (!events || events.length === 0) {
            resultsContainer.html('<p>No se encontraron eventos.</p>');
            return;
        }

        // 4. Recorremos cada evento de la lista y creamos una tarjeta para él
        events.forEach(event => {
            // ¡AQUÍ ESTÁ LA MAGIA!
            // Usamos los nombres exactos de tu script.json: event.name, event.artist, etc.
            
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
            
            // Se añade la tarjeta recién creada al contenedor en la página
            resultsContainer.append(cardHTML);
        });
    }
});