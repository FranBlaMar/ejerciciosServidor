const disponibilidad = document.getElementById('disponibilidad');

const enlace = document.getElementById("comprobar");
enlace.addEventListener("click", function(){
    fetch('http://fran.loc/compruebaDisponibilidad.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    
    .then(datos =>{
        let respuesta = document.createElement('p');
        let texto = document.createTextNode(datos);
        respuesta.appendChild(texto);
        disponibilidad.appendChild(respuesta);    
    })
    .catch(response => console.log(response.error));
})
