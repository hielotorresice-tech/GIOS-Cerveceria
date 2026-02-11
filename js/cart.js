const Cart = {

add(id){
const p = PRODUCTS.find(x=>x.id===id);
p.qty++;
UI.updateSubtotal();
},

remove(id){
const p = PRODUCTS.find(x=>x.id===id);
if(p.qty>0) p.qty--;
UI.updateSubtotal();
},

subtotal(){
return PRODUCTS.reduce((t,p)=>t+p.price*p.qty,0);
},

items(){
return PRODUCTS.filter(p=>p.qty>0);
}

};
