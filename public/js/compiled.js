"use strict";const products=JSON.parse(localStorage.getItem("cart"))||[];0===products.length&&(renderDivCartEmpty(),$(".shoping__checkout").remove());function renderDivCartEmpty(){$(".products__cart").append(`
    <div class="cart__empty">
      <span>Seu carrinho de compras está vazio</span>
      <a href="/"><button class="button__black">Ver produtos</button>
    </div>
  `)}products.forEach(function(a){let b=(a.quantity*a.price).toFixed(2);$(".products__cart").append(`
    <div class="item__cart">
      <span style="display: none;">${a.id}</span>
      <div class="header__item">
        <img src="${a.image}" />
        <span>${a.name}</span>
      </div>
      <div class="item__content">
        <div class="item__price">
          <span>Preço</span>
          <span>R$ <span id="product_price">${a.price.toFixed(2)}</span></span>
        </div>
        <div class="item__quantity">
          <span>Quantidade</span>
          <div class="quantity_actions">
            <button class="any__less action-btn">-</button>
            <span class="quantity__value">${a.quantity}</span>
            <button class="more action-btn">+</button>
          </div>
        </div>
        <div class="item__subtotal">
          <span>Subtotal</span>
          <span>R$ <span id="subtotal">${b}</span></span>
        </div>
      </div>
      <div class="item__actions">
        <button class="delete button__black">Excluir</button>
      </div>
    </div>
  `)});// Atualiza subtotal e total do carinho
function updateTotalAndSubtotalPrice(a,b){let c=a.parentElement.parentElement.parentElement,d=c.querySelector("#subtotal"),e=c.querySelector(".quantity__value"),f=document.querySelector("#cart-total-price"),g=document.querySelector("#checkout_total"),h=+f.innerHTML,i=+c.querySelector("#product_price").innerHTML,j=+d.innerHTML,k=+e.innerHTML;"subtraction"===b?1<k&&(d.innerHTML=(j-i).toFixed(2),f.innerHTML=(h-i).toFixed(2),g.innerHTML=(h-i).toFixed(2),e.innerHTML=k-1):"addition"===b?(d.innerHTML=(j+i).toFixed(2),f.innerHTML=(h+i).toFixed(2),g.innerHTML=(h+i).toFixed(2),e.innerHTML=k+1):void 0}// Atualiza dados do produto no carrinho
function updateLocalStorageCart(a){let b=a.parentElement.parentElement.parentElement.parentElement,c=+b.querySelector(".quantity__value").innerHTML,d=JSON.parse(localStorage.getItem("cart")),e=b.querySelector("span").innerHTML,f=d.map(function(a){return e==a.id&&(a.quantity=c),a});localStorage.setItem("cart",JSON.stringify(f))}function updatePriceTotalCart(a){let b=a.parentElement.parentElement,c=document.querySelector("#cart-total-price"),d=document.querySelector("#checkout_total"),e=+c.innerHTML,f=+b.querySelector("#subtotal").innerHTML;c.innerHTML=(e-f).toFixed(2),d.innerHTML=(e-f).toFixed(2)}// Remove produto do carrinho
// Aumenta a quantidade de um produto da lista
// Diminui a quantidade de um produto da lista
$(".item__actions .delete").click(function(a){a.preventDefault();let b=JSON.parse(localStorage.getItem("cart")),c=this.parentElement.parentElement,d=c.querySelector("span").innerHTML,e=document.querySelector("#cart-quantity"),f=+e.innerHTML,g=b.filter(function(a){if(a.id!=d)return a});localStorage.setItem("cart",JSON.stringify(g)),e.innerHTML=f-1,updatePriceTotalCart(this),c.remove(),0==e.innerHTML&&(renderDivCartEmpty(),$(".shoping__checkout").remove())}),$(".quantity_actions .more").click(function(a){a.preventDefault(),updateTotalAndSubtotalPrice(this,"addition"),updateLocalStorageCart(this)}),$(".quantity_actions .any__less").click(function(a){a.preventDefault(),updateTotalAndSubtotalPrice(this,"subtraction"),updateLocalStorageCart(this)});
"use strict";let cartProducts=JSON.parse(localStorage.getItem("cart"))||[];cartProducts.forEach(function(a){let b=(a.price*a.quantity).toFixed(2);$("#list_products").append(`
    <li>- ${a.quantity}x ${a.name}   <span>R$ ${b}</span></li>
  `)}),$("#order-details-form").submit(function(a){a.preventDefault();let b=this.querySelector("#client_name").value,c=this.querySelector("#addres").value,d=this.querySelector("#complement").value,e=this.querySelector("#telephone").value.replace(/[^\d]/g,"");$.ajax({url:"/order",type:"post",data:{clientInfo:{name:b,addres:c,complement:d,telephone:e},products:cartProducts}}).done(function(a,b,c){let d=c.status;200===d&&(localStorage.removeItem("cart"),$(".loader").fadeOut(),$(".modal__information").fadeIn(),$(".modal__information span").text("Pedido realizado com sucesso, dentro de alguns minutos seus produtos ser\xE3o entregues."))}).fail(function(){$(".loader").fadeOut(),$(".modal__information").fadeIn(),$(".modal__information span").text("Desculpe, um erro aconteceu, tente novamente dentro de alguns minutos")}),$(".loader").fadeIn(),$(".loader__checkout").delay(200).fadeIn("slow")});function maskTelephone(a){let b=a.value.replace(/[^\d]/g,"");switch(b.length){case 2:return a.value=b.replace(/(\d{2})/g,"($1)");case 3:return a.value=b.replace(/(\d{2})(\d{1})/g,"($1) $2");case 7:return a.value=b.replace(/(\d{2})(\d{1})(\d{4})/g,"($1) $2 $3-");case 11:return a.value=b.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g,"($1) $2 $3-$4");}}
'use strict';(function(a){// Load quantity card
function b(){const b=JSON.parse(localStorage.getItem("cart"))||[],c=b.length;let d=0;b.forEach(function(a){d+=+(a.price*a.quantity).toFixed(2)}),a("#cart-quantity").text(c),a("#cart-total-price").text(d.toFixed(2)),a("#checkout_total").text(d.toFixed(2))}/*------------------
			Preloader
	--------------------*/ /*------------------
			Background Set
	--------------------*/ //Humberger Menu
/* ------------------
	Navigation
	-------------------- */a(window).on("load",function(){// Load cart info
a(".loader").fadeOut(),a("#preloder").delay(200).fadeOut("slow"),b()}),a(".set-bg").each(function(){var b=a(this).data("setbg");a(this).css("background-image","url("+b+")")}),a(".humberger__open").on("click",function(){a(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper"),a(".humberger__menu__overlay").addClass("active"),a("body").addClass("over_hid")}),a(".humberger__menu__overlay").on("click",function(){a(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper"),a(".humberger__menu__overlay").removeClass("active"),a("body").removeClass("over_hid")}),a(".mobile-menu").slicknav({prependTo:"#mobile-menu-wrap",allowParentLinks:!0})})(jQuery);
"use strict";const products=document.querySelectorAll(".product__item");// Percorre todos os produtos para adicionar eventos de click
// products.forEach(loadProducts)
addEventInElements(products);function addEventInElements(a){a.forEach(function(a){const b=a.querySelector(".product__quantity .any__less"),c=a.querySelector(".product__quantity .more"),d=a.querySelector(".product__quantity .quantity__value"),e=a.querySelector("#add__product__to__cart");b.addEventListener("click",function(){let a=+d.innerHTML;1<a&&(d.innerHTML=a-1)}),c.addEventListener("click",function(){let a=+d.innerHTML;d.innerHTML=a+1}),e.addEventListener("click",function(){// Informações do carrinho
const b=document.querySelector("#cart-quantity"),c=document.querySelector("#cart-total-price"),e=a.querySelector(".id__product").innerHTML,f=a.querySelector(".product__item__text h6 a").innerHTML,g=+a.querySelector(".product__item__text h5 span").innerHTML,h=a.querySelector(".product__item .product__item__pic img").getAttribute("src"),i=+d.innerHTML,j=+b.innerHTML,k=+c.innerHTML,l=JSON.parse(localStorage.getItem("cart"))||[];let m=!1;const n=l.map(function(a){return a.id==e&&(m=!0,a.quantity+=i),a}),o=+(g*i).toFixed(2);if(m)localStorage.setItem("cart",JSON.stringify(n)),c.innerHTML=(k+o).toFixed(2),d.innerHTML=1;else{const a=[...l,{id:e,name:f,price:g,image:h,quantity:i}];localStorage.setItem("cart",JSON.stringify(a)),b.innerHTML=j+1,c.innerHTML=(k+o).toFixed(2),d.innerHTML=1}})})}// Carrega mais produtos
$("#btn-more").click(function(a){a.preventDefault();const b=+$("#btn-more").attr("name"),c=+$("#total-pages").text();$.ajax(`/products?page=${b}`).then(function(a){if(b<=c){b===c?$("#btn-more").toggleClass("hide"):$("#btn-more").attr("name",b+1),renderProducts(a);const d=document.querySelectorAll(".product__item");addEventInElements(d)}})});function renderProducts(a){a.forEach(function(a){$("#list-products").append(`
      <div class="col-lg-4 col-md-6 col-sm-6 col-6">
        <div class="product__item">
          <span class="id__product" style="display: none;">${a.id}</span>
          <div class="product__item__pic">
            <img src="/uploads/${a.image}" />
          </div>
          <div class="product__item__text">
            <h6>
              <a href="#">${a.name}</a>
            </h6>
            <h5>R$ <span>${a.price.toFixed(2)}</span></h5>
          </div>
          <div class="product__quantity">
            <button class="any__less action-btn">-</button>
            <span class="quantity__value">1</span>
            <button class="more action-btn">+</button>
          </div>
          <button class="button__black" id="add__product__to__cart">ADICIONAR</button>
        </div>
      </div>
    `)})}
