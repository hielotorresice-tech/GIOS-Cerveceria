document.addEventListener("DOMContentLoaded", function(){

function abrirResumenPedido(){

  const items = productos.filter(p => p.qty > 0);

  if(items.length === 0){
    alert("Agrega productos antes de continuar");
    return;
  }

  const lista = document.getElementById("orderList");
  const total = document.getElementById("orderTotal");

  lista.innerHTML = "";

  let suma = 0;

  items.forEach(p=>{
    lista.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin:6px 0;">
        <span>${p.nombre} x${p.qty}</span>
        <strong>$${(p.precio * p.qty).toLocaleString()}</strong>
      </div>
    `;
    suma += p.precio * p.qty;
  });

  total.innerText = "$" + suma.toLocaleString();

  document.getElementById("orderModal").classList.add("active");
}

function abrirCheckout(){

  document
    .getElementById("orderModal")
    .classList.remove("active");

  document
    .getElementById("checkoutModal")
    .classList.add("active");
}

function confirmarCheckout(){

  const nombre = clienteNombre.value.trim();
  const telefono = clienteTelefono.value.trim();
  const direccion = clienteDireccion.value.trim();
  const zona = clienteZona.value;

  if(!nombre || !telefono || !direccion || !zona){
    alert("Completa todos los datos obligatorios 🙂");
    return;
  }

  const despacho = parseInt(zona) || 0;
  const subtotal = calcularSubtotal();
  const totalFinal = subtotal + despacho;

  enviarPedidoWhatsApp(nombre, telefono, direccion, zona, despacho, totalFinal);
}

function enviarPedidoWhatsApp(nombre, telefono, direccion, zona, despacho, totalFinal){

  let mensaje = "🍺 *NUEVO PEDIDO - GIOS*\n\n🛒 *DETALLE:*\n";

  productos.forEach(p=>{
    if(p.qty>0){
      mensaje += `• ${p.nombre} x${p.qty}\n`;
    }
  });

  mensaje += `\n💵 Subtotal: $${calcularSubtotal().toLocaleString()}`;
  mensaje += `\n🚚 Despacho: $${despacho.toLocaleString()}`;
  mensaje += `\n💰 TOTAL: $${totalFinal.toLocaleString()}`;

  mensaje += `\n\n👤 Cliente: ${nombre}`;
  mensaje += `\n📞 Teléfono: ${telefono}`;
  mensaje += `\n📍 Dirección: ${direccion}`;

  mensaje += `\n\n⚠️ Enviar comprobante de pago.`;

  const url = `https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
}
