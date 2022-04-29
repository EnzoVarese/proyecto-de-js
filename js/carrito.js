// CARRITO
let carritoIcono = document.querySelector("#cart-icon")
let carrito = document.querySelector(".cart")
let carritoCerrado = document.querySelector("#close-cart")
let listaDeCarrito = [];
// CHECKEA EL CARRITO LOCAL STORAGE 
document.addEventListener('DOMContentLoaded', () => {
    checkCarritoLocalStorage();
})
// CARRITO EN LOCAL STORAGE
const checkCarritoLocalStorage = () => {
    const carritoStorage = localStorage.getItem("Carrito")
    if (carritoStorage) {
        listaDeCarrito = JSON.parse(carritoStorage)
        listaDeCarrito.forEach(producto => {
            if (producto) {
                agregarProductoAlCarrito(producto.nombreProducto,producto.precio,producto.img);
                actualizarTotal();  
            }
        });
    }
}
// CARRITO ABIERTO
carritoIcono.onclick = () =>{
    carrito.classList.add("active")
}
// CARRITO CERRADO
carritoCerrado.onclick = () =>{
    carrito.classList.remove("active")
}
// CARRITO WORKING JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else{
    ready();
}
// FUNCTION DEL CARRITO
function ready() {
    // PARA REMOVER PRODUCTOS DEL CARRITO
    const removerCarritoBotones = document.getElementsByClassName("cart-remove")
    for (let i = 0; i < removerCarritoBotones.length; i++) {
        const btn = removerCarritoBotones[i]
        btn.addEventListener("click", removerCarritoItem)
    }
    // CANTIDAD ARTICULOS CAMBIOS
    const inputsCantidad = document.getElementsByClassName("cart-quantity")
    for (let i = 0; i < inputsCantidad.length; i++) {
        const input = inputsCantidad[i]
        input.addEventListener("change", cambiosCantidad)
    }
    // AGREGAR AL CARRITO
    const agregarCarrito = document.getElementsByClassName("add-cart")
    for (let i = 0; i < agregarCarrito.length; i++){
        const btn = agregarCarrito[i]
        btn.addEventListener("click", agregarCarritoClicked)
    }
    // BOTON COMPRAR
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", () => {
        swal({
            title: "Tu compra ha sido existosa!",
            icon: "success",
            button: "Ok",
          });
        localStorage.clear()
        const contenidoCarrito = document.getElementsByClassName("cart-content")[0]
        while (contenidoCarrito.hasChildNodes()) {
            contenidoCarrito.removeChild(contenidoCarrito.firstChild)
        }
        actualizarTotal();
    })
}
// REMOVER PRODUCTOS DEL CARRITO
function removerCarritoItem(event) {
    const btnClicked = event.target
    btnClicked.parentElement.remove()
    actualizarTotal()
}
// CAMBIOS EN CANTIDAD PRODUCTOS 
function cambiosCantidad(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    actualizarTotal();
}
function agregarCarritoClicked(event) {
    const btn = event.target
    const compraProductos = btn.parentElement
    const titulo = compraProductos.getElementsByClassName("product-title")[0].innerText
    const precio = compraProductos.getElementsByClassName("price")[0].innerText
    const imagenProducto = compraProductos.getElementsByClassName("product-img")[0].src
    const idProducto = compraProductos.querySelector('.productsContainer__item__button').dataset.id
    const producto = {
        id : idProducto,
        nombreProducto : titulo,
        precio : precio,
        img : imagenProducto
    }
    listaDeCarrito[producto.id] = { ...producto }
    localStorage.setItem("Carrito", JSON.stringify(listaDeCarrito))
    agregarProductoAlCarrito(titulo, precio, imagenProducto);
    actualizarTotal();
}
// AGREGAR PRODUCTO AL CARRITO
function agregarProductoAlCarrito(titulo, precio, imagenProducto) {
    const contenedorCompraCarrito = document.createElement("div")
    contenedorCompraCarrito.classList.add("cart-box")
    const itemsCarrito = document.getElementsByClassName("cart-content")[0]
    const nombresItemsCarrito = itemsCarrito.getElementsByClassName("cart-product-title")
    for (let i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText == titulo) {
            swal({
                title: "Ya tienes este producto en tu carrito!",
                text: "Si deseas agregar mas unidades puedes hacerlo desde el carrito!",
                icon: "error",
                button: "Ok",
              });
              return;
        }
    }
    const contenedorContenidoCarrito = `
                        <img src="${imagenProducto}" alt="" height="150px" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${titulo}</div>
                            <div class="cart-price">${precio}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- REMOVER CARRITO -->
                        <i class='bx bxs-trash-alt cart-remove'></i>`;
    contenedorCompraCarrito.innerHTML = contenedorContenidoCarrito
    itemsCarrito.append(contenedorCompraCarrito)
    contenedorCompraCarrito.getElementsByClassName("cart-remove")[0].addEventListener("click", removerCarritoItem)
    contenedorCompraCarrito.getElementsByClassName("cart-quantity")[0].addEventListener("change", cambiosCantidad)
}



// ACTUALIZAR PRECIO TOTAL
function actualizarTotal() {
    const contenidoCarrito = document.getElementsByClassName("cart-content")[0]
    const contenedoresCarrito = contenidoCarrito.getElementsByClassName("cart-box")
    let total = 0;
    for (let i = 0; i < contenedoresCarrito.length; i++){
        const contenedorCarrito = contenedoresCarrito[i];
        const elementoPrecio = contenedorCarrito.getElementsByClassName("cart-price")[0];
        const elementoCantidad = contenedorCarrito.getElementsByClassName("cart-quantity")[0];
        const precio = parseFloat(elementoPrecio.innerText.replace("$", ""));
        const cantidad = elementoCantidad.value
        total = total + (precio * cantidad);
    }
        // SI EL PRECIO TIENE ALGUNOS CENTAVOS
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}