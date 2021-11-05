const disponibilidad = document.getElementById('disponibilidad');

const enlace = document.getElementById("comprobar");
const lista = document.getElementById("lista");


enlace.addEventListener("click", function(){
    let login = new FormData(document.getElementById("formulario"));

    fetch('http://fran.loc/compruebaDisponibilidadJSON.php', {
        method: 'POST',
        body: login
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        const datosjson = JSON.parse(datos);
        let disponibleLogin = datosjson.disponible;
        let disponibilidadPorPantalla = document.createElement('p');
        let texto = document.createTextNode(disponibleLogin);
        disponibilidadPorPantalla.appendChild(texto);
        disponibilidad.appendChild(disponibilidadPorPantalla);    

        let alternativas = datosjson.getElementsByTagName('login');
        for (let i = 0; i < alternativas.length; i++) {
            let unaAlternativa = alternativas[i];
            let alternativasList = document.createElement('li');
            alternativasList.textContent = unaAlternativa.textContent;
            lista.appendChild(alternativasList);
        }
    })
    .catch(response => console.log(response.error));
})
