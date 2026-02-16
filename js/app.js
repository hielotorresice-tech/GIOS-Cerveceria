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

let carrito = {};

const guardado = localStorage.getItem("carrito");

if(guardado){
    carrito = JSON.parse(guardado);
    productos.forEach(p=>{
        if(carrito[p.id]){
            p.qty = carrito[p.id];
        }
    });
}

const catalogo = document.getElementById("catalogo");

renderCatalogo();
actualizarTotal();

function renderCatalogo(){
    catalogo.innerHTML = "";
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
}

function cambiarCantidad(id, cambio){
    if(!carrito[id]) carrito[id] = 0;

    carrito[id] += cambio;
    if(carrito[id] < 0) carrito[id] = 0;

    const producto = productos.find(p => p.id === id);
    producto.qty = carrito[id];

    document.getElementById("qty-"+id).innerText = carrito[id];

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarTotal();
}

function subtotal(){
    return productos.reduce((s,p)=> s + p.precio*p.qty,0);
}

function actualizarTotal(){
    const total = subtotal();
    const btn = document.getElementById("btnPagar");

    if(total > 0){
        btn.innerText = `Ir a pagar — $${total.toLocaleString()}`;
        btn.classList.add("activo");
    }else{
        btn.innerText = "Agrega productos";
        btn.classList.remove("activo");
    }
}

function abrirCheckout(){
    const items = document.getElementById("items");
    items.innerHTML = "";

    productos.forEach(p=>{
        if(p.qty > 0){
            items.innerHTML += `
            <div class="item-resumen">
                ${p.nombre} x${p.qty} — $${(p.precio*p.qty).toLocaleString()}
            </div>
            `;
        }
    });

    document.getElementById("total")
    .innerText = "Total: $" + subtotal().toLocaleString();

    document.getElementById("modal").classList.add("active");
}

function cerrarModal(){
    document.getElementById("modal").classList.remove("active");
}

function irAPagar(){
    if(subtotal() === 0){
        mostrarMensaje("⚠️ Agrega productos ⚠️", 3000);
        return;
    }
    abrirCheckout();
}

function enviarPedido(){

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const pago = document.getElementById("pago").value;

    if(!nombre || !telefono || !direccion || !pago){
        mostrarMensaje("❗Completa los datos❗", 3000);
        return;
    }

    let mensaje = `🛒 NUEVO PEDIDO\n\n`;

    productos.forEach(p=>{
        if(p.qty > 0){
            mensaje += `${p.nombre} x${p.qty} — $${(p.precio*p.qty).toLocaleString()}\n`;
        }
    });

    mensaje += `\nTOTAL: $${subtotal().toLocaleString()}\n\n`;
    mensaje += `Cliente: ${nombre}\n`;
    mensaje += `Tel: ${telefono}\n`;
    mensaje += `Dir: ${direccion}\n`;
    mensaje += `Pago: ${pago}`;

    window.open(`https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`, "_blank");

    cerrarModal();

    carrito = {};
    productos.forEach(p=>p.qty=0);
    localStorage.removeItem("carrito");

    renderCatalogo();
    actualizarTotal();

    localStorage.setItem("pedidoEnviado","true");
}

document.addEventListener("visibilitychange", () => {

    if (document.visibilityState === "visible") {

        const enviado = localStorage.getItem("pedidoEnviado");

        if (enviado === "true") {

            mostrarMensaje("✅ Pedido enviado correctamente ✅", 3000);
            localStorage.removeItem("pedidoEnviado");

        }
    }
});

function mostrarMensaje(texto, duracion=3000){
    const toast = document.getElementById("toast");
    toast.innerText = texto;
    toast.classList.add("show");

    clearTimeout(toast._timer);

    toast._timer = setTimeout(()=>{
        toast.classList.remove("show");
    }, duracion);
}
