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

function actualizarSubtotal() {
  const subtotal = calcularSubtotal();
  document.getElementById("subtotalValue").innerText =
    subtotal > 0 ? `Ir a pagar $ ${subtotal.toLocaleString()}` : "Ir a pagar $ 0";
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

