(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{enumerable:!0,get:d})},b.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},b.t=function(a,c){if(1&c&&(a=b(a)),8&c)return a;if(4&c&&'object'==typeof a&&a&&a.__esModule)return a;var d=Object.create(null);if(b.r(d),Object.defineProperty(d,'default',{enumerable:!0,value:a}),2&c&&'string'!=typeof a)for(var e in a)b.d(d,e,function(b){return a[b]}.bind(null,e));return d},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s='./checkout.js')})({"./checkout.js":function(){function a(a){a.style.opacity=1,function b(){0>(a.style.opacity-=.1)?a.style.display='none':requestAnimationFrame(b)}()}function b(a,b){a.style.opacity=0,a.style.display=b||'block',function b(){var c=parseFloat(a.style.opacity);1<(c+=.1)||(a.style.opacity=c,requestAnimationFrame(b))}()}var c=JSON.parse(localStorage.getItem('cart'))||[];c.forEach(function(a){var b=(a.price*a.quantity).toFixed(2);document.querySelector('#list_products').innerHTML+='\n    <li>- '.concat(a.quantity,'x ').concat(a.name,'   <span>R$ ').concat(b,'</span></li>\n  ')}),document.querySelector('#order-details-form').addEventListener('submit',function(d){d.preventDefault();var e=this.querySelector('#client_name').value,f=this.querySelector('#addres').value,g=this.querySelector('#complement').value,h=this.querySelector('#telephone').value.replace(/[^\d]/g,'');fetch('/order',{method:'POST',headers:{"Content-Type":'application/json'},body:JSON.stringify({clientInfo:{name:e,addres:f,complement:g,telephone:h},products:c})}).then(function(c){200===c.status?(localStorage.removeItem('cart'),a(document.querySelector('.loader')),b(document.querySelector('.modal__information'),'flex'),document.querySelector('.modal__information span').innerHTML='\n        Pedido realizado com sucesso, dentro de alguns minutos seus produtos ser\xE3o entregues.\n      '):(a(document.querySelector('.loader')),b(document.querySelector('.modal__information'),'flex'),document.querySelector('.modal__information span').innerHTML='\n        Desculpe, um erro aconteceu, tente novamente dentro de alguns minutos.\n      ')}),b(document.querySelector('.loader__checkout')),b(document.querySelector('.loader'))})}});
//# sourceMappingURL=checkout.js.map