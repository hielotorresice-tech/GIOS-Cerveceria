const Checkout = {

sendOrder(){

const nombre = clienteNombre.value.trim();
const telefono = clienteTelefono.value.trim();
const direccion = clienteDireccion.value.trim();
const zona = clienteZona.value;

if(!nombre || !telefono || !direccion || !zona){
return alert("Completa los datos 🙂");
}

const despacho = parseInt(zona);
const subtotal = Cart.subtotal();
const total = subtotal + despacho;

let msg = "🍺 *NUEVO PEDIDO*\n\n";

Cart.items().forEach(p=>{
msg+=`• ${p.name} x${p.qty}\n`;
});

msg+=`\nSubtotal: $${subtotal.toLocaleString()}`;
msg+=`\nDespacho: $${despacho.toLocaleString()}`;
msg+=`\nTOTAL: $${total.toLocaleString()}`;

msg+=`\n\nCliente: ${nombre}`;
msg+=`\nTel: ${telefono}`;
msg+=`\nDirección: ${direccion}`;

window.open(
`https://wa.me/56927731874?text=${encodeURIComponent(msg)}`
);

}

};
