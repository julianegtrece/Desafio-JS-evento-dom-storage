const botonComprar = document.querySelector('#botonComprar');
const botonSumaTotal = document.querySelector('#botonSumaTotal');
const botonListaProductos = document.querySelector('#botonListaProductos');
const botonCambiarColor = document.querySelector('#botonCambiarColor')

botonCambiarColor.addEventListener('click', cambiarColorRandom);
botonComprar.addEventListener('click', comprar);
botonSumaTotal.addEventListener('click', sumaTotal);
botonListaProductos.addEventListener('click', listaProductos);


function Producto(id, descripcion, precio, stock){

    this.id = id;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock

}


let productos2 =[
    {
        id: 0,
        descripcion: "Pizza Congelada",
        precio : 300,
        stock : 9999
    },
    {
        id: 1,
        descripcion: "Papas Fritas",
        precio : 50,
        stock : 9999
    },
    {
        id: 2,
        descripcion: "Queso Cremoso",
        precio : 100,
        stock : 9999
    },
    {
        id: 3,
        descripcion: "Coca-cola Zero",
        precio : 120,
        stock : 9999
    },
    {
        id: 4,
        descripcion: "Saladix",
        precio : 60,
        stock : 9999
    }
];

const Compras=[];

function iniciarListaProductosStorage(){
    let productosJson = JSON.stringify(productos2);
    localStorage.setItem('productoStorage', productosJson);
}

function cargarListaProductosStorage(producto){
//lo capturo un json del storage
    productos = JSON.parse(localStorage.productoStorage);
    productos.push(producto);
    console.log(productos);

    let productosJson2 = JSON.stringify(productos);


    localStorage.setItem('productoStorage', productosJson2);


}


function obtenerListaProductosStorage(){
    return JSON.parse(localStorage.productoStorage);
}


function verificarProducto(idComprado,listaProductos){
    for (i=0; i<listaProductos.length;i++){
        if (listaProductos[i].id == idComprado){
            return true;
        }
    }
    return false;
}


function obtenerPrecioProducto(id){
    for (i=0; i < obtenerListaProductosStorage().length; i++){
        if(obtenerListaProductosStorage()[i].id == id){
            return obtenerListaProductosStorage()[i].precio;
        }
    }

}






function comprar(){

    let id = parseInt(document.getElementById(`ID`).value);
    let cantidad = parseInt(document.getElementById(`unidades1`).value);


    if(verificarProducto(id,obtenerListaProductosStorage()) && isNaN(cantidad)==false){
        console.log(obtenerListaProductosStorage());
        alert('producto encontrado');
        Compras.push(obtenerPrecioProducto(id)*cantidad);
        alert(obtenerPrecioProducto(id)*cantidad);
        console.log(Compras);
    }else{
        alert('Producto invalido y/o unidades invalidas');
    }

}

function sumaTotal(){
    let total=0;
    if (Compras.length > 0){
        console.log(Compras);
        for(i=0; i<Compras.length; i++){
            total = total + Compras[i];
        }
        alert(`Usted gasto en total $ ${total}`);
        total=0;
    }else{
        alert('Usted no compro nada');
    }
}


function listaProductos(){
    productos = obtenerListaProductosStorage();
    console.log(productos);
    if (productos.length==0){
        alert('No existe');
    }else{
        let cadena='';
        for (i=0; i<productos.length; i++){
            console.log(productos[i]);
            cadena = cadena + ' ID:  ' + productos[i].id + ' Producto: ' + productos[i].descripcion + ' Precio: $ ' + productos[i].precio + '\n';
        }
        alert(cadena);

    }

}


function altaProducto(){
    let descripcion = document.getElementById(`descripcion1`).value;
    let precio = parseInt(document.getElementById(`precio1`).value);
    
    if (precio <= 0 || isNaN(precio)==true){
        alert("Ingrese valores correctos")
    }else{
        let productos = obtenerListaProductosStorage();
        let nuevoProducto = {id: productos.length, descripcion: descripcion, precio : precio, stock : 9999};
        console.log(nuevoProducto);
        cargarListaProductosStorage(nuevoProducto);

        alert(`Producto: ${descripcion}  Precio: $${precio}`);
    }

}


// INICIA EL CODIGOOO


iniciarListaProductosStorage();


//CAMBIAR ESTILOS CSS

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  



function cambiarColorRandom(){
    let documento = document.getElementById('contenedor-color');
    documento.style.backgroundColor = getRandomColor();


}