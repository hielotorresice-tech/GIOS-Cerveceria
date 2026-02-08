function abrirResumenPedido(){
  const items = productos.filter(p => p.qty > 0);
  if(items.length === 0){
    alert("Agrega productos antes de continuar");
    return;
  }
  document.getElementById("checkout").style.display = "block";
}
