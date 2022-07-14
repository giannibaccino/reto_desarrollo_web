//Declaracion de variables
const d = document,
    $title = d.getElementById("nombre-lista"),
    $crear = d.getElementById("crear"),
    body = d.querySelector('.tbody1'),
    $input = d.getElementById('inputTarea').value
const url = 'http://localhost:8080';
let resultado = ''
let resultadoSub = ''
let subtarea = {};

//Funcion boton crear , permite guardar en el input el nombre de la nueva lista a crear
$crear.addEventListener('click', (e) => {
    e.preventDefault();
    crearList(d.getElementById('inputTarea').value);
    d.getElementById('inputTarea').value = "";
})
//Funcion crear pero al apretar 'Enter'
d.getElementById("principal").addEventListener('keypress', (e) => {
    if(e.keyCode == 13 && d.getElementById('inputTarea').value != ""){
    crearList(d.getElementById('inputTarea').value);
    d.getElementById('inputTarea').value = "";
    }
})
//Funcion crear lista , consulta la ruta del fetch y realiza el metodo post con los datos 
async function crearList(lista) {
    if (lista) {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                name: lista
            })
        },
            res = await fetch(`${url}/task`, options)
        mostrarList();
    } else {
        alert("Ingrese una tarea por favor!")
    }
}
//Muestra las listas en la BD
async function mostrarList() {
    let res = await fetch(`${url}/listas`)
    let data = await res.json()
        .catch(error => console.log(error))
    mostrar(data)  
}
mostrarList()
//Muesta la lista creada mediante 2 busquedas para mostra
const mostrar = (listas) => {
    listas.forEach(lista => {
        resultadoSub = ''
        lista.listTask.forEach(sub => {
            resultadoSub += ` <tr>
                <td class="id">${sub.id}</td>
                <td class="Tarea">${sub.name}</td>
                <td class="completado">
                    <input class="validar form-check-input" id="validar${sub.id}" type="checkbox" id="flexSwitchCheckDefault" ${sub.completed ? "checked" : ""}>
                    <label class="form-check-label" for="flexSwitchCheckDefault"></label>
                </td>
                <td class="opciones">
                    <button class="editar btn btn-info" value="${sub.id}" type="button" id="editar${sub.id}" class="editar btn btn-secondary" ${sub.completed ? "disabled" : "enabled"}>Editar</button>
                    <button class="eliminar btn btn-danger" type="button" id="eliminar${sub.id}" >Eliminar</button>
                </td>
            </tr>`
        })
        resultado += ` <hr>
        <div  id="${lista.id}">
            <div class="input-group " id = "${lista.id}">
                <h3 id="nombre-lista">Tarea : ${lista.name}</h3>
                <button class="EliminarTarea btn btn-danger" type="submit" id="borrar${lista.id}" ">Eliminar</button>
            </div>
            <input class="form-control me-sm-2" type="text" id="inputTarea${lista.id}" placeholder="¿Que piensas hacer?">
            <button class="agregarSubList btn btn-success my-2 my-sm-0" type="submit" id="crear${lista.id}" value="${lista.id}">Crear</button>
            <button style="display:none;" class="actualizarSubList btn btn-success my-2 my-sm-0" type="submit" id="Actualizar${lista.id}" value="${lista.id}">Actualizar</button>
            <br>
            <table class="table" id="${lista.id}">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Tarea</th>
                    <th>¿completado?</th>
                    <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${resultadoSub}
                </tbody>
            </table>
        </div>
        `
    })
    document.querySelector('.tbody1').innerHTML = resultado;
    resultado = "";
}
//Reacciones tras el evento click en un boton
body.addEventListener("click", (e) => {
    if (e.target.classList[0] == "EliminarTarea") {
        eliminarTarea(e.target.parentElement.parentElement.id)
    }
    if (e.target.classList[0] == "agregarSubList") {

        let dato = {
            nombre: e.target.previousElementSibling.value,
            id: e.path[0].value
        }
        crearSubLista(dato)
    }   
    /**
     * eliminar subtarea
    */
    if (e.target.classList[0] == "eliminar") {
        eliminarSubTarea(e.target.parentElement.parentElement.children[0].textContent)
    }
    /**
     * editar subtarea , al pulsar el boton editar , muestra en el input con nombre de la tare actual
     * me permite 
    */
    if (e.target.classList[0] == "editar") {
        e.preventDefault()
        subtarea.id = e.path[0].value
        subtarea.name = e.path[2].children[1].textContent;
        subtarea.idpadre = e.path[4].id;
        subtarea.editing = true;

        let input = e.path[5].children[1];
        let btncrear = d.getElementById('crear' + e.path[4].id)
        let boton = d.getElementById('Actualizar' + e.path[4].id)
        btncrear.style.display = "none";
        boton.style.display = "";
        input.value = subtarea.name;
    }
    /**
     * actualizar subtarea, al pulsar el boton actualizar confirma la edicion
     */
    if (e.target.classList[0] == "actualizarSubList") {
        editarSubTarea(e.path[1].children[5].id, subtarea.id, e.path[1].children[1].value);
    }
    /**
     * function validar , verifica el estado del check para cambiar el estado del boton editar
     */
    if (e.target.classList[0] == "validar") {
        let btnvalidar = d.getElementById('editar' + e.path[2].children[3].children[0].value)
        let check = d.getElementById('validar' + e.path[2].children[3].children[0].value).checked
        if (check) {
            btnvalidar.disabled = true;
            completarTarea(e.path[5].id, e.path[2].children[0].innerText, e.path[2].children[1].innerText);
        } else {
            btnvalidar.disabled = false;
            descompletarTarea(e.path[5].id, e.path[2].children[0].innerText, e.path[2].children[1].innerText);
        }
    }
})
//Reacciones tras el evento keypress en 'Enter'
body.addEventListener("keypress", (e) => {
    console.log(e);
    if(e.keyCode == 13 && !subtarea.editing){
        let datos = {
            nombre: e.path[0].value,
            id: e.path[1].id};
        crearSubLista(datos);
    }
    if(e.keyCode == 13 && subtarea.editing){
        editarSubTarea(e.path[1].id, subtarea.id, e.path[0].value);
        subtarea.editing = false;
    }
})
//Funcion eliminar , recibe como parametro el ID
async function eliminarTarea(id) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
    },
        res = await fetch(`${url}/task/${id}`, options)

    mostrarList()
}
//Crear SubTarea
async function crearSubLista({ nombre, id }) {
    if (nombre) {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                completed: false,
                name: nombre,
                listaid: {
                    id: id
                }
            })
        },
        res = await fetch(`${url}/listTask`, options)
        mostrarList()
    } else {
        alert("Ingrese una Tarea porfavor!")
    }
}
//Eliminar subTarea
async function eliminarSubTarea(id) {
    let options = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=utf-8"
        },
    },
        res = await fetch(`${url}/listTask/${id}`, options)
    mostrarList()
}
//Editar sub lista 
async function editarSubTarea(id1, id2, nombre){
    if(nombre) {
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                completed: false,
                name: nombre,
                listaid: {
                    id:id1
                }
            })
        },
        res = await fetch(`${url}/listTask/${id2}`, options)
    } else {
        alert("Ingrese un nuevo nombre valido!")
    }
    mostrarList();
}
//Checkear SubTarea
async function completarTarea(id1, id2, nombre){
    if(nombre) {
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                completed: true,
                name: nombre,
                listaid: {
                    id: id1
                }
            })
        },
        res = await fetch(`${url}/listTask/${id2}`, options)
    }
}
//Descheckear SubTarea
async function descompletarTarea(id1, id2, nombre){
    if(nombre) {
        let options = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                completed: false,
                name: nombre,
                listaid: {
                    id:id1
                }
            })
        },
        res = await fetch(`${url}/listTask/${id2}`, options)
    }
}