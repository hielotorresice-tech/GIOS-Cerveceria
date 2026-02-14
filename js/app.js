const productos = [
{
id:1,
nombre:"Escudo Silver 710cc",
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

let carrito = {}; // ← debe ir antes de cambiarCantidad

const catalogo = document.getElementById("catalogo");

productos.forEach(p=>{

catalogo.innerHTML += `
<div class="card">
<img src="${p.img}">
<h4>${p.nombre}</h4>
<p>$${p.precio.toLocaleString()}</p>

<div class="control-cantidad">
  <button onclick="cambiarCantidad(${p.id}, -1)">-</button>
  <span id="qty-${p.id}">${p.qty}</span>
  <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
</div>
</div>
`;
});

function cambiarCantidad(producto, cambio){
    if(!carrito[producto]) carrito[producto] = 0;

    carrito[producto] += cambio;
    if(carrito[producto] < 0) carrito[producto] = 0;

    // Actualizar la card
    const span = document.getElementById("qty-" + producto);
    if(span) span.innerText = carrito[producto];

    // Actualizar qty en productos para subtotal
    const p = productos.find(x => x.id === producto);
    if(p) p.qty = carrito[producto];

    // Actualizar barra inferior
    actualizarTotal();
}

function subtotal(){
return productos.reduce((s,p)=> s + p.precio*p.qty,0);
}

function actualizarTotal(){

    let total = subtotal();
    let totalItems = productos.reduce((acc,p)=>acc+p.qty,0);

    const btnPagar = document.getElementById("btnPagar");
    if(!btnPagar) return;

    if(total > 0){
        btnPagar.innerText = `Ir a pagar — $${total.toLocaleString()}`;
        btnPagar.classList.add("activo");
    }else{
        btnPagar.innerText = "Agrega productos";
        btnPagar.classList.remove("activo");
    }

    // 👇 NUEVO
    localStorage.setItem("carrito", JSON.stringify(productos));
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
  document.getElementById("modal").classList.remove("active");
}

function irAPagar(){

    let totalItems = productos.reduce((acc,p)=>acc+p.qty,0);

    if(totalItems === 0){
        mostrarMensaje("Debes agregar primero productos", "error");
        return;
    }

    abrirCheckout(); // 👈 ahora NO va a WhatsApp
}

function enviarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const pago = document.getElementById("pago").value;

  if(!nombre || !telefono || !direccion || !pago){
    mostrarMensaje("Por favor ingreasa los datos");
    return; // Aquí se bloquea hasta que complete
  }

function mostrarMensaje(texto, tipo="info"){

    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.className = "toast"; // reset

    if(tipo === "error") toast.classList.add("error");
    if(tipo === "ok") toast.classList.add("ok");

    toast.innerText = texto;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2500);
}

const btn = event.target;
btn.disabled = true;
btn.innerText = "Enviando...";

  // Armamos el mensaje
  let mensaje = `🛒 *Pedido GIOS*\n\n`;
  productos.forEach(p => {
    if(p.qty > 0){
      mensaje += `${p.nombre} x${p.qty} — $${(p.precio*p.qty).toLocaleString()}\n`;
    }
  });

  mensaje += `\n💰 Total: $${subtotal().toLocaleString()}\n`;
  mensaje += `👤 Cliente: ${nombre}\n📞 WhatsApp: ${telefono}\n📍 Dirección: ${direccion}\n💳 Pago: ${pago}`;

  // Abrimos WhatsApp
  window.open(`https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// ================================
// MENSAJES TIPO TOAST
// ================================
function mostrarMensaje(texto){

    const toast = document.getElementById("toast");
    if(!toast) return;

    toast.innerText = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
actualizarTotal();
