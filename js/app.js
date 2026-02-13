const productos = [
{
id:1,
nombre:"Escudo Silver Lata 710cc",
precio:1000,
img:"img/escudo-silver.png",
qty:0
},
{
id:2,
nombre:"Sol Botellín 330cc",
precio:1000,
img:"img/sol-330.png",
qty:0
}
];

const catalogo = document.getElementById("catalogo");

productos.forEach(p=>{

catalogo.innerHTML += `
<div class="card">
<img src="${p.img}">
<h4>${p.nombre}</h4>
<p>$${p.precio.toLocaleString()}</p>

<button onclick="agregar(${p.id})">+</button>
<button onclick="quitar(${p.id})">-</button>

</div>
`;

});

let carrito = {};

function cambiarCantidad(producto, cambio){

    if(!carrito[producto]){
        carrito[producto] = 0;
    }

    carrito[producto] += cambio;

    if(carrito[producto] < 0){
        carrito[producto] = 0;
    }

    document.getElementById("cant-" + producto).innerText = carrito[producto];

    actualizarTotal();
}

function subtotal(){
return productos.reduce((s,p)=> s + p.precio*p.qty,0);
}

function agregar(id){
const p = productos.find(x=>x.id===id);
p.qty++;
actualizarTotal();
}

function actualizarTotal(){

    let totalItems = productos.reduce((acc,p)=>acc+p.qty,0);

    let btnPagar = document.getElementById("btnPagar");
    if(!btnPagar) return;

    btnPagar.innerText = totalItems > 0 
        ? `Ir a pagar (${totalItems})`
        : "Agrega productos";
}

function quitar(id){
const p = productos.find(x=>x.id===id);
if(p.qty>0) p.qty--;
actualizarTotal();
}

function abrirCheckout(){

const items = document.getElementById("items");
items.innerHTML="";

productos.forEach(p=>{
if(p.qty>0){
items.innerHTML += `
<div class="item-resumen">
${p.nombre}  
x${p.qty}  —  $${(p.precio*p.qty).toLocaleString()}
</div>
`;

}
});

document.getElementById("total")
.innerText = "Total: $" + subtotal().toLocaleString();

document.getElementById("modal")
.classList.add("active");
}

function cerrarModal(){
document.getElementById("modal")
.classList.remove("active");
}

function irAPagar(){

    let totalItems = productos.reduce((acc,p)=>acc+p.qty,0);

    if(totalItems === 0){
        alert("Debes agregar productos primero");
        return;
    }

    abrirCheckout(); // 👈 ahora NO va a WhatsApp
}

function enviarPedido(){

const nombre = document.getElementById("nombre").value.trim();
const telefono = document.getElementById("telefono").value.trim();
const direccion = document.getElementById("direccion").value.trim();

mensaje+=`💳 Pago: ${pago}`;

<select id="pago">
<option value="">Seleccionar</option>
<option value="Efectivo">Efectivo</option>
<option value="Transferencia">Transferencia</option>
<option value="Débito / Crédito">Débito / Crédito</option>
</select>

if(!nombre || !telefono || !direccion || !pago){
    alert("Por favor completa todos los datos");
    return;
}

let mensaje="🛒 Pedido GIOS %0A%0A";

productos.forEach(p=>{
if(p.qty>0){
mensaje+=`${p.nombre} x${p.qty}\n`;
}
});

mensaje+=`\nTotal: $${subtotal().toLocaleString()}\n\n`;

mensaje+=`👤 Cliente: ${nombre}\n`;
mensaje+=`📞 WhatsApp: ${telefono}\n`;
mensaje+=`📍 Dirección: ${direccion}`;

window.open(
`https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`,
"_blank"
);

}
