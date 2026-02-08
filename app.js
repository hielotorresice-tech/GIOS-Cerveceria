document.addEventListener("DOMContentLoaded",()=>{

const productos = [

/*************** COCA COLA ****************/

{cat:"Coca-Cola",name:"Báltica Vidrio 1000cc",precio:1000,img:"baltica-1000.png",qty:0},
{cat:"Coca-Cola",name:"Becker Lata 473cc",precio:800,img:"becker-473.png",qty:0},
{cat:"Coca-Cola",name:"Becker Latón 710cc",precio:1000,img:"becker-710.png",qty:0},
{cat:"Coca-Cola",name:"Budweiser Latón 710cc",precio:1200,img:"bud-710.png",qty:0},
{cat:"Coca-Cola",name:"Corona Botellín 330cc",precio:1200,img:"corona-330.png",qty:0},
{cat:"Coca-Cola",name:"Corona Sin Alcohol 330cc",precio:1100,img:"corona-cero.png",qty:0},
{cat:"Coca-Cola",name:"Corona Botellín 620cc",precio:1600,img:"corona-620.png",qty:0},
{cat:"Coca-Cola",name:"Corona Lata 473cc",precio:1000,img:"corona-473.png",qty:0},
{cat:"Coca-Cola",name:"Cusqueña Latón 710cc",precio:1200,img:"cusquena.png",qty:0},
{cat:"Coca-Cola",name:"Quilmes Latón 710cc",precio:1000,img:"quilmes.png",qty:0},
{cat:"Coca-Cola",name:"Stella Botellín 660cc",precio:1200,img:"stella.png",qty:0},


/*************** CCU ****************/

{cat:"CCU",name:"Coors Botellín 355cc",precio:1100,img:"coors.png",qty:0},
{cat:"CCU",name:"Cristal Cero 350cc",precio:850,img:"cristal-cero.png",qty:0},
{cat:"CCU",name:"Cristal 1.2Lt",precio:1600,img:"cristal-12.png",qty:0},
{cat:"CCU",name:"Cristal Lata 350cc",precio:850,img:"cristal-350.png",qty:0},
{cat:"CCU",name:"Cristal Lata 470cc",precio:900,img:"cristal-470.png",qty:0},
{cat:"CCU",name:"Cristal Latón 710cc",precio:1300,img:"cristal-710.png",qty:0},
{cat:"CCU",name:"Cristal Ultra 710cc",precio:1100,img:"ultra.png",qty:0},
{cat:"CCU",name:"Escudo Ret 1.2Lt",precio:1600,img:"escudo-ret.png",qty:0},
{cat:"CCU",name:"Escudo Lata Roja 330cc",precio:850,img:"roja-330.png",qty:0},
{cat:"CCU",name:"Escudo Lata Roja 470cc",precio:950,img:"roja-470.png",qty:0},
{cat:"CCU",name:"Escudo Silver Lata 470cc",precio:800,img:"silver-470.png",qty:0},
{cat:"CCU",name:"Escudo Silver Latón 710cc",precio:1000,img:"silver-710.png",qty:0},
{cat:"CCU",name:"Heineken Cero Lata 470cc",precio:1000,img:"heineken-cero.png",qty:0},
{cat:"CCU",name:"Heineken Botellín 330cc",precio:1100,img:"heineken-330.png",qty:0},
{cat:"CCU",name:"Heineken Lata 470cc",precio:1000,img:"heineken-470.png",qty:0},
{cat:"CCU",name:"Lemon Stone Lata 470cc",precio:1100,img:"lemon.png",qty:0},
{cat:"CCU",name:"Manquehito 1.5Lt",precio:3301,img:"manquehito.png",qty:0},
{cat:"CCU",name:"Morenita 1.2Lt",precio:1800,img:"morenita.png",qty:0},
{cat:"CCU",name:"Morenita Lata 470cc",precio:1100,img:"morenita-470.png",qty:0},
{cat:"CCU",name:"Royal 1Lt",precio:1700,img:"royal1.png",qty:0},
{cat:"CCU",name:"Royal Botellín 355cc",precio:1100,img:"royal-355.png",qty:0},
{cat:"CCU",name:"Royal Botellín 650cc",precio:1400,img:"royal-650.png",qty:0},
{cat:"CCU",name:"Royal Guard Lata 470cc",precio:1000,img:"royal-guard.png",qty:0},
{cat:"CCU",name:"Royal Guard Golden Lager 355cc",precio:1000,img:"golden.png",qty:0},
{cat:"CCU",name:"Royal Latón 710cc",precio:1300,img:"royal-710.png",qty:0},
{cat:"CCU",name:"Sol Botellín 330cc",precio:1000,img:"sol-330.png",qty:0},
{cat:"CCU",name:"Sol Botellín 650cc",precio:1300,img:"sol-650.png",qty:0},
{cat:"CCU",name:"Torobayo Botellín 500cc",precio:2300,img:"torobayo.png",qty:0},
{cat:"CCU",name:"Tres Erres",precio:1000,img:"treserres.png",qty:0},

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
