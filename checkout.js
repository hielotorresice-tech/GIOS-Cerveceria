document.addEventListener("DOMContentLoaded", function(){

function abrirResumenPedido(){

  const resumen = document.getElementById("resumenItems");
  const totalBox = document.getElementById("totalResumen");

  resumen.innerHTML = "";

  let total = 0;

  productos.forEach(p=>{
    if(p.qty > 0){

      resumen.innerHTML += `
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span>${p.nombre} x${p.qty}</span>
          <strong>$${(p.precio*p.qty).toLocaleString()}</strong>
        </div>
      `;

      total += p.precio * p.qty;
    }
  });

  totalBox.innerText = "$" + total.toLocaleString();

  document.getElementById("checkoutModal").classList.add("active");
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
