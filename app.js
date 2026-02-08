document.addEventListener("DOMContentLoaded",()=>{

const productos=[
{name:"Escudo Silver",precio:1000,img:"escudo-silver.png",qty:0},
{name:"Escudo Roja",precio:950,img:"escudo-roja470.avif",qty:0},
{name:"Cristal 470cc",precio:900,img:"cristal-473.png",qty:0},
{name:"Sol 330cc",precio:1000,img:"sol-330.png",qty:0}
];

const contenedor=document.getElementById("products");

productos.forEach((p,i)=>{

contenedor.innerHTML+=`

<div class="card">

<img src="${p.img}">

<h4>${p.name}</h4>
<strong>$${p.precio}</strong>

<div class="qty">
<button onclick="restar(${i})">-</button>
<span id="q${i}">0</span>
<button onclick="sumar(${i})">+</button>
</div>

</div>
`;
});

window.sumar=(i)=>{
productos[i].qty++;
document.getElementById("q"+i).innerText=productos[i].qty;
calcular();
}

window.restar=(i)=>{
if(productos[i].qty>0){
productos[i].qty--;
document.getElementById("q"+i).innerText=productos[i].qty;
calcular();
}
}

window.calcular=()=>{

let total=0;

productos.forEach(p=>{
total+=p.qty*p.precio;
});

document.getElementById("subtotalValue").innerText=
total>0
? "Ir a pagar $" + total.toLocaleString("es-CL")
: "Selecciona productos";

}

window.abrirResumenPedido=()=>{

let pedido=productos
.filter(p=>p.qty>0)
.map(p=>`${p.name} x${p.qty}`)
.join("%0A");

if(!pedido){
alert("Agrega productos 🙂");
return;
}

window.open(
`https://wa.me/56927731874?text=Hola,%20quiero:%0A${pedido}`
);

}

window.abrirMP=()=>{
alert("Tras pagar, envía el comprobante por WhatsApp 🙂");
window.open("https://link.mercadopago.cl/torresice");
}

window.abrirTransferencia=()=>{
alert("Datos de transferencia enviados por WhatsApp");
window.open("https://wa.me/56927731874");
}

});
