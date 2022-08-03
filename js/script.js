// OBTENGO TODOS LOS BOTONES "AÑADIR AL CARRITO"
const boton = document.querySelectorAll('.button')
const bodyCarrito = document.querySelector('.tbody');
const totalCarrito = document.getElementById('totalCarrito');
let carrito = []

const addCarrito = (e) => {
    const button = e.target;
    const item = button.closest(".card") // OBTENGO EL ELEMENTO MAS CERCANO A LA CLASE CARD
    // OBTENGO LOS ATRIBUTOS DE ESE ELEMENTO
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    console.log(itemPrice);
    const itemImagen = item.querySelector('.card-img-top').src;


    // CREO UN OBJETO PARA LOS NUEVOS ITEMS
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        imagen: itemImagen,
        cantidad: 1
    }

    addItemCarrito(newItem)

}

function muestraCarrito() {
    bodyCarrito.innerHTML = '';
    carrito.map(item => {
        const tr = document.createElement('TR')
        tr.classList.add('itemCarrito')

        //SE CREA EL CONTENIDO DEL CARRITO CON LAS VARIABLES DEL OBJETO NEWITEM

        const contenido = ` <th scope="row">1</th>
            <td class="table__productos">
                <img src="${item.imagen}" alt="">
                <h6 class="title">${item.title}</h6>
            <td class="table__precio">
                <p>${item.precio}</p>
            </td>
            <td class="table__cantidad">
                <input type="number" min="1" value="${item.cantidad}" class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>`

            //AGREGO A LA TABLA EL CONTENIDO CREADO Y POR ULTIMO AGREGO AL BODY LA TABLA CARGADA
            tr.innerHTML = contenido;
            bodyCarrito.appendChild(tr);

            tr.querySelector('.delete').addEventListener('click', removerItemCarrito);
            tr.querySelector('.input__elemento').addEventListener('change', updateItemCarrito);
    })
    sumarTotal();
}

const updateItemCarrito = (e)=>{
    const update = e.target;
    const tr = update.closest('.itemCarrito');
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            update.value < 1 ? (update.value = 1) : update.value;
            item.cantidad = update.value;
            sumarTotal();
        }
    })

}

// ESTA FUNCION VIENE CON UN EVENTO COMO PARAMETRO
const removerItemCarrito = (e)=>{
    // RECIBO EL BOTON AL QUE HICE CLICK, EN ESTE CASO EL DE ELIMINAR
    const botonEliminar = e.target;
    const tr = botonEliminar.closest('.itemCarrito');
    const title = tr.querySelector('.title').textContent;
    for(let i = 0; i < carrito.length; i++){
            if(carrito[i].title.trim() === title.trim()){
                carrito.splice(i,1)
            }
    }

    const alert = document.querySelector('.remove');

    setTimeout(()=>{
        alert.classList.add('remove')
    }, 2000)
        alert.classList.remove('remove')

    tr.remove();
    sumarTotal();
}



// DENTRO DEL ARREGLO CARRITO GUARDO EL NUEVO ITEM Y 

function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert');

    setTimeout(()=>{
        alert.classList.add('hide')
    }, 2000)
        alert.classList.remove('hide')

    const inputElemento = bodyCarrito.getElementsByClassName('input__elemento');

    // VALIDO SI YA EXISTE EL ITEM EN EL CARRITO, SI EXISTE SUMO LA CANTIDAD 
    // ACTUAL, SI NO EXISTE LO AGREGO AL CARRITO.

    for(let i =0; i<carrito.length; i++){
            if(carrito[i].title.trim() === newItem.title.trim()){
                carrito[i].cantidad  ++;
                const valueElemento = inputElemento[i]
                valueElemento.value ++;
                sumarTotal();
                return null;
            }   
    }


    carrito.push(newItem);
    
    muestraCarrito()
}

function sumarTotal(cantidad, precio){
    let total = 0;
    carrito.forEach(item =>{
        const precio = Number(item.precio.replace("$",''))
        total = total + precio * item.cantidad;
    })

    totalCarrito.innerText = `Total: $${total}`;
    addLocalStorage();
}

// RECORRO TODOS LOS BOTONES Y CADA VEZ QUE HAGO CLICK QUE AGREGUE AL CARRITO

boton.forEach(btn => {
    btn.addEventListener('click', addCarrito)
})

/*
* LOCALSTORAGE
*/

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}


window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        muestraCarrito();
    }
}
