function abrirResumenPedido(){

  const items = productos.filter(p => p.qty > 0);

  if(items.length === 0){
    alert("Agrega productos antes de continuar 🙂");
    return;
  }

  document.getElementById("orderModal").classList.add("active");
}

function enviarPedidoWhatsApp(){
  let mensaje = "🍺 *NUEVO PEDIDO - GIOS*\n\n";

  productos.forEach(p=>{
    if(p.qty>0){
      mensaje += `- ${p.nombre} x${p.qty}\n`;
    }
  });

  mensaje += `\nTOTAL: $ ${calcularSubtotal().toLocaleString()}`;
  mensaje += `\n\n⚠️ Enviar comprobante de pago`;

  const url = `https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`;
  window.open(url,"_blank");
}

function abrirCheckout(){
  cerrar();
  document
    .getElementById("checkoutModal")
    .classList.add("active");
}

function confirmarCheckout(){

  const nombre = document
    .getElementById("clienteNombre").value.trim();

  const telefono = document
    .getElementById("clienteTelefono").value.trim();

  const direccion = document
    .getElementById("clienteDireccion").value.trim();

  const zona = document
    .getElementById("clienteZona").value;

  if(!nombre || !telefono || !direccion || !zona){
    alert("Completa todos los datos obligatorios 🙂");
    return;
  }

  enviarPedidoWhatsApp(nombre,telefono,direccion,zona);
}

