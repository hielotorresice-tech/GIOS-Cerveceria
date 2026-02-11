const UI = {

updateSubtotal(){

const total = Cart.subtotal();
const bar = document.querySelector(".subtotal-bar");

document.getElementById("subtotalValue").innerText =
total>0
? `Ir a pagar $${total.toLocaleString("es-CL")}`
: "Selecciona productos";

bar.style.pointerEvents = total>0 ? "auto":"none";
bar.style.opacity = total>0 ? "1":".4";

},

openOrderModal(){

const items = Cart.items();
if(!items.length) return alert("Agrega productos 🙂");

const list = document.getElementById("orderList");
list.innerHTML="";

let total=0;

items.forEach(p=>{
list.innerHTML+=`
<div style="display:flex;justify-content:space-between">
<span>${p.name} x${p.qty}</span>
<strong>$${(p.price*p.qty).toLocaleString()}</strong>
</div>`;
total+=p.price*p.qty;
});

document.getElementById("orderTotal").innerText="$"+total.toLocaleString();
document.getElementById("orderModal").classList.add("active");

},

openCheckout(){
document.getElementById("orderModal").classList.remove("active");
document.getElementById("checkoutModal").classList.add("active");
},

close(){
document.querySelectorAll(".overlay")
.forEach(m=>m.classList.remove("active"));
}

};
