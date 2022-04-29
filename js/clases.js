// CONSTRUCTOR DE OBJETOS
class Producto {
    constructor (nombreProducto,precio,img,id) {
        this.nombreProducto = nombreProducto;
        this.precio = parseFloat(precio);
        this.img = img;
        this.id = parseInt(id)
    }
}
// CREANDO OBJETOS GRACIAS AL CONSTRUCTOR
const polleraInglesa = new Producto("Pollera inglesa", 7000, "pollera.jpg", 1);
const tapadoIngles = new Producto("Tapado claro ingles", 15500, "tapado.jpg", 2);
const zapatillas = new Producto("Zapatillas", 9500, "zapatillas.jpg", 3);
const pantalonClaro = new Producto("Pantalon claro", 11500, "pantalon_jean.jpg", 4);
const campera = new Producto("Campera negra cuero", 12500, "campera_negra.jpg", 5);
const tapadoMarron = new Producto("Tapado marron", 15000, "tapado_marron.jpg", 6);
const camperaUrbanaBlanca = new Producto("Campera urbana blanca", 14000, "campera_urbana.jpg", 7);
const sweaterMarron = new Producto("Sweater marron", 7500, "sueter_marron.jpg",8)
const pantalonCuadrilleClaro= new Producto ("Pantalon cuadrille claro", 10500,"pantalon_cuadrille.jpg", 9)