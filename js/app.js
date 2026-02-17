const productos = [

{ id:1, nombre:"Báltica Vidrio 1000cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:2, nombre:"Becker Lata 473cc", precio:800, img:"img/gios.png", qty:0 },
{ id:3, nombre:"Becker Laton 710cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:4, nombre:"Budweiser Laton 710cc", precio:1200, img:"img/gios.png", qty:0 },
{ id:5, nombre:"Corona Botellin 330cc", precio:1200, img:"img/gios.png", qty:0 },
{ id:6, nombre:"Corona Sin Alcohol 330cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:7, nombre:"Corona Botellin 620cc", precio:1600, img:"img/gios.png", qty:0 },
{ id:8, nombre:"Corona Lata 473cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:9, nombre:"Cusqueña Latón 710cc", precio:1200, img:"img/gios.png", qty:0 },
{ id:10, nombre:"Quilmes Latón 710cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:11, nombre:"Stella Botellin 660cc", precio:1200, img:"img/gios.png", qty:0 },
{ id:12, nombre:"Coors Botellin 355cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:13, nombre:"Cristal Cero 350cc", precio:850, img:"img/gios.png", qty:0 },
{ id:14, nombre:"Cristal 1.2", precio:1600, img:"img/gios.png", qty:0 },
{ id:15, nombre:"Cristal Lata 350cc", precio:850, img:"img/gios.png", qty:0 },
{ id:16, nombre:"Cristal Lata 470cc", precio:900, img:"img/gios.png", qty:0 },
{ id:17, nombre:"Cristal Laton 710cc", precio:1300, img:"img/gios.png", qty:0 },
{ id:18, nombre:"Cristal Ultra 470cc", precio:850, img:"img/gios.png", qty:0 },
{ id:19, nombre:"Cristal Ultra 710cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:20, nombre:"Escudo Ret 1.2Lt.", precio:1600, img:"img/gios.png", qty:0 },
{ id:21, nombre:"Escudo Lata Roja 350cc", precio:850, img:"img/gios.png", qty:0 },
{ id:22, nombre:"Escudo Lata Roja 470cc", precio:950, img:"img/gios.png", qty:0 },
{ id:23, nombre:"Escudo Silver Lata 470cc", precio:800, img:"img/gios.png", qty:0 },

// 🔥 CON IMAGEN REAL
{ id:24, nombre:"Escudo Silver 710cc", precio:1000, img:"img/escudo-silver.png", qty:0 },

{ id:25, nombre:"Heineken Cero Lata 470cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:26, nombre:"Heineken Botellin 330cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:27, nombre:"Heineken Lata 470cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:28, nombre:"Lemon Stone Lata 350cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:29, nombre:"Manquehito 1.500 ml", precio:3301, img:"img/gios.png", qty:0 },
{ id:30, nombre:"Morenita 1.2", precio:1800, img:"img/gios.png", qty:0 },
{ id:31, nombre:"Morenita Lata 470cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:32, nombre:"Royal 1.0", precio:1700, img:"img/gios.png", qty:0 },
{ id:33, nombre:"Royal Botellin 355cc", precio:1100, img:"img/gios.png", qty:0 },
{ id:34, nombre:"Royal Botellin 650cc", precio:1400, img:"img/gios.png", qty:0 },
{ id:35, nombre:"Royal Guard Lata 470cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:36, nombre:"Royal Guard Golden Lager 355cc", precio:1000, img:"img/gios.png", qty:0 },
{ id:37, nombre:"Royal Laton 710cc", precio:1300, img:"img/gios.png", qty:0 },

// 🔥 CON IMAGEN REAL
{ id:38, nombre:"Sol Botellin 330cc", precio:1000, img:"img/sol-330.png", qty:0 },

{ id:39, nombre:"Sol Botellin 650cc", precio:1300, img:"img/gios.png", qty:0 },
{ id:40, nombre:"Torobayo Botellin 500cc", precio:2300, img:"img/gios.png", qty:0 },
{ id:41, nombre:"Tres Erres", precio:1000, img:"img/gios.png", qty:0 },
{ id:42, nombre:"Miller 330cc", precio:1500, img:"img/gios.png", qty:0 }

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

const catalogo = .getElementById("catalogo");

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
    <button class="btn-cant" onclick="cambiarCantidad(${p.id}, -1)">−</button>
    <div class="qty-box" id="qty-${p.id}">${p.qty}</div>
    <button class="btn-cant" onclick="cambiarCantidad(${p.id}, 1)">+</button>
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

    .getElementById("qty-"+id).innerText = carrito[id];

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarTotal();
}

function subtotal(){
    return productos.reduce((s,p)=> s + p.precio*p.qty,0);
}

function actualizarTotal(){

  let total = 0;

  productos.forEach(p => {

    total += p.precio * p.qty;

    const card = .getElementById("card-" + p.id);

    if(card){
      if(p.qty > 0){
        card.classList.add("activa");
      }else{
        card.classList.remove("activa");
      }
    }

  });

  .getElementById("totalGeneral").innerText =
    "$" + total.toLocaleString("es-CL");

}

function cerrarModal(){
    .getElementById("modal").classList.remove("active");
}

function irAPagar(){
    if(subtotal() === 0){
        mostrarMensaje("⚠️Agrega productos⚠️", 4000);
        return;
    }
    abrirCheckout();
.body.classList.add("modal-open");
}


function abrirCheckout(){

    const items = .getElementById("items");
    items.innerHTML = "";

    productos.forEach(p=>{
        if(p.qty > 0){
            items.innerHTML += `
            <div class="item-resumen">
                <span>${p.nombre} x${p.qty}</span>
                <strong>$${(p.precio*p.qty).toLocaleString("es-CL")}</strong>
            </div>
            `;
        }
    });

   document.getElementById("total").innerText =
    "$" + subtotal().toLocaleString("es-CL");

    document.getElementById("modal").classList.add("active");
}

function enviarPedido(){

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const pago = document.getElementById("pago").value;

    if(!nombre || !telefono || !direccion || !pago){
        mostrarMensaje("❗Completar Datos❗", 4000);
        return;
    }

    let mensaje = `🛒 *NUEVO PEDIDO GIOS* 🛒\n\n`;

productos.forEach(p=>{
    if(p.qty > 0){
        mensaje += `• ${p.nombre}\n   ${p.qty} x $${p.precio.toLocaleString()} = $${(p.precio*p.qty).toLocaleString()}\n`;
    }
});

mensaje += `\n*TOTAL:* $${subtotal().toLocaleString()}\n\n`;
mensaje += `👤 *Cliente:* ${nombre}\n`;
mensaje += `📞 *Tel:* ${telefono}\n`;
mensaje += `📍 *Dirección:* ${direccion}\n`;
mensaje += `💳 *Pago:* ${pago}`;

    window.open(`https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`, "_blank");

    cerrarModal();
    document.body.classList.remove("modal-open");

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

            mostrarMensaje("✅Pedido enviado correctamente✅", 4000);
            localStorage.removeItem("pedidoEnviado");

        }
    }
});

function mostrarMensaje(texto, duracion=4000){
    const toast = document.getElementById("toast");
    toast.innerText = texto;
    toast.classList.add("show");

    clearTimeout(toast._timer);

    toast._timer = setTimeout(()=>{
        toast.classList.remove("show");
    }, duracion);
}
