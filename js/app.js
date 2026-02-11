document.addEventListener("DOMContentLoaded",()=>{

const container = document.getElementById("products");

PRODUCTS.forEach(p=>{

container.innerHTML+=`

<div class="card">

<img src="${p.img}">

<h4>${p.name}</h4>
<strong>$${p.price.toLocaleString()}</strong>

<div class="qty">
<button onclick="Cart.remove(${p.id})">-</button>
<span id="q${p.id}">${p.qty}</span>
<button onclick="Cart.add(${p.id})">+</button>
</div>

</div>
`;

});

});
