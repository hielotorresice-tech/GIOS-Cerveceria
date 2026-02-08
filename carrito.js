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
