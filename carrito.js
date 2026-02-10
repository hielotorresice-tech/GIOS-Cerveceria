function agregarProducto(id) {
  const prod = productos.find(p => p.id === id);
  if (prod) prod.qty++;
  actualizarSubtotal();
}

function quitarProducto(id) {
  const prod = productos.find(p => p.id === id);
  if (prod && prod.qty > 0) prod.qty--;
  actualizarSubtotal();
}

function calcularSubtotal() {
  return productos.reduce((sum, p) => sum + p.precio * p.qty, 0);
}

function actualizarSubtotal()
{

  const subtotal = calcularSubtotal();
  const barra = document.querySelector(".subtotal-bar");

  document.getElementById("subtotalValue").innerText =
    subtotal > 0 
      ? `Ir a pagar $ ${subtotal.toLocaleString()}`
      : "Ir a pagar $ 0";

  // 🔥 botón inteligente
  if(subtotal === 0){
    barra.style.opacity = "0.4";
    barra.style.pointerEvents = "none";
  }else{
    barra.style.opacity = "1";
    barra.style.pointerEvents = "auto";
  }
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

  enviarPedidoWhatsApp(nombre, telefono, direccion, zona);
}

function abrirResumenPedido(){

  const subtotal = calcularSubtotal();
  const PEDIDO_MINIMO = 5000;

  if(subtotal === 0){
    alert("Agrega productos 🙂");
    return;
  }

  if(subtotal < PEDIDO_MINIMO){
    alert("El pedido mínimo es de $" + PEDIDO_MINIMO.toLocaleString());
    return;
  }

  document.getElementById("orderModal").classList.add("active");
}

function enviarPedidoWhatsApp(){

  let mensaje = "🍺 *NUEVO PEDIDO - GIOS*\n\n";

  productos.forEach(p=>{
    if(p.qty>0){
      mensaje += `- ${p.name} x${p.qty}\n`;
    }
  });

  mensaje += `\nTOTAL: $${calcularSubtotal().toLocaleString()}`;
  mensaje += `\n\n⚠️ Enviar comprobante de pago`;

  const url = `https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`;

  window.open(url,"_blank");
}

