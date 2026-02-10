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

  const nombre = document.getElementById("clienteNombre").value.trim();
  const telefono = document.getElementById("clienteTelefono").value.trim();
  const direccion = document.getElementById("clienteDireccion").value.trim();
  const zona = document.getElementById("clienteZona").value;

  if(!nombre || !telefono || !direccion || !zona){
    alert("Completa todos los datos 🙂");
    return;
  }

  let mensaje = "🍺 *NUEVO PEDIDO - GIOS*\n\n";

  productos.forEach(p=>{
    if(p.qty>0){
      mensaje += `- ${p.name} x${p.qty}\n`;
    }
  });

  mensaje += `\nTOTAL: $${calcularSubtotal().toLocaleString()}`;
  mensaje += `\n\n⚠️ Enviar comprobante de pago`;

  const url = `https://wa.me/56927731874?text=${encodeURIComponent(mensaje)}`;
  
});
