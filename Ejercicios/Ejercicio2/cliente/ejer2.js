const disponibilidad = document.getElementById('disponibilidad');

const enlace = document.getElementById("comprobar");
const lista = document.getElementById("lista");


enlace.addEventListener("click", function(){
    let login = new FormData(document.getElementById("formulario"));

    fetch('http://fran.loc/compruebaDisponibilidadXML.php', {
        method: 'POST',
        //No funciona, y no consigo averigurar por que...
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: login
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    
    fetch('http://fran.loc/compruebaDisponibilidadXML.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "application/xml");
        let disponibleLogin = xml.getElementsByTagName('disponible')[0];
        let disponibilidadPorPantalla = document.createElement('p');
        let texto = document.createTextNode(disponibleLogin.textContent);
        disponibilidadPorPantalla.appendChild(texto);
        disponibilidad.appendChild(disponibilidadPorPantalla);    

        let alternativas = xml.getElementsByTagName('login');
        for (let i = 0; i < alternativas.length; i++) {
            let unaAlternativa = alternativas[i];
            let alternativasList = document.createElement('li');
            alternativasList.textContent = unaAlternativa.textContent;
            lista.appendChild(alternativasList);
        }
    })
    .catch(response => console.log(response.error));
})
