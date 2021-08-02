const API_URL = 'https://sv2.muhindimweusi.co.ke';
//const API_URL='http://127.0.0.1'
const DEPARMENT_URL=`${API_URL}/api/alldeparments`
const FEATURED_URL=`${API_URL}/api/featured`
const VIEWS_URL=`${API_URL}/api/views`
const IDENTIFY_URL=`${API_URL}/api/identifyuser`
const ADVERT_URL=`${API_URL}/api/adverts`
;(function ($) {
  var $ul = $("<ul class='menu clone-main-menu' id='vertical-menu-365'></ul>");
  function getList($list) {
    $.get(DEPARMENT_URL, function(response) {
    $.each(response, function(key, value) {
      var $li = $('<li />').addClass("menu-item menu-item-has-children has-child");
      var href1="products.html?query=" +encodeURIComponent(value.name)
      $li.append($('<a href="'+href1+'" class="menu-name" data-title="' + value.name +'">' + value.name + '</a>'));
        var div1= $("<div/>").addClass("wrap-megamenu lg-width-900 md-width-750");
        var div2= $("<div/>").addClass("mega-content");
        var $subul = $("<div/>").addClass("row");
        div2.append($subul)
        div1.append(div2)
      $.each(value.child1[0], function(k,v) {
        var subli = $('<div/>').addClass("col-lg-3 col-md-3 col-sm-12 xs-margin-bottom-25 md-margin-bottom-0")
        var div4= $('<div/>').addClass("wrap-custom-menu vertical-menu") 
        var href2="products.html?query=" +encodeURIComponent(v.name)
        var h4=$('<h4/>').addClass("menu-title").append($('<a href="'+href2+'" >' + v.name + '</a>'));
        var ul=$('<ul/>').addClass("menu")
        div4.append(h4)
        div4.append(ul)
        subli.append(div4)
        subli.appendTo($subul)
        $.each(v.child2[0],function(j,m){  
          var subli = $('<li/>')
          var href3="products.html?query=" +encodeURIComponent(m.name)
          subli.append($('<a href="'+href3+'" >' + m.name + '</a>'));
          subli.appendTo(ul); 
        });
      });
      $li.append(div1).appendTo($list); 
    });

    });

  }
  getList($ul);
  $ul.appendTo(".wrap-menu");
}( jQuery ));

/**  ad 1 cauresel */

$.get(ADVERT_URL, function(response) {
  $.each(response, function(key, value) {
      $(".ad1-carousel").slick('slickAdd','<li>'+
      '<div class="slide-contain slider-opt05">'+
          '<div class="media">'+
              '<div class="img-moving"><img src="'+value.image+'" width="374" height="372" alt=""></div>'+
          '</div>'+
          '<div class="text-content">'+
              '<h3 class="second-line">'+value.title+'</h3>'+
              '<p class="buttons">'+
                  '<a href="'+value.link+'" class="btn btn-bold">Shop now</a>'+
              '</p>'+
          '</div>'+
      '</div>'+
  '</li>');
  });
});


$.get(VIEWS_URL, function(response) {
  $.each(response, function(key, value) {

    var $li=$('<li/>').addClass("product-item")
    var $div1=$('<div/>').addClass("contain-product layout-default")
    if(value.offerprice==0){
      $div1.append( '<div class="product-thumb" onclick="load(\'' +value.id+ '\', \'' +value.name+ '\', \'' +value.sku+ '\',  \'' +value.description+ '\',\'' +value.details+ '\', \'' +value.price+ '\',\'' +value.image+ '\',\'' +value.price+'\',\'' +false+ '\')" >'+
      '<a style="cursor: pointer;" class="link-to-product">'+
          '<img src="'+value.image+'" alt="'+value.name+'" width="270" height="270" class="product-thumnail">'+
      '</a>'+
     '</div>')
    }else if(value.offerprice!=0){
      $div1.append( '<div class="product-thumb" onclick="load(\'' +value.id+ '\', \'' +value.name+ '\', \'' +value.sku+ '\',  \'' +value.description+ '\',\'' +value.details+ '\', \'' +value.offerprice+ '\',\'' +value.image+ '\',\'' +value.price+'\',\'' +true+ '\')" >'+
      '<a style="cursor: pointer;" class="link-to-product">'+
          '<img src="'+value.image+'" alt="'+value.name+'" width="270" height="270" class="product-thumnail">'+
      '</a>'+
     '</div>')
    }
    var $info=$('<div/>').addClass("info")
    $info.append('<h4 class="product-title"><a href="#" class="pr-name">'+value.name+'</a></h4>')
     
    if(value.offerprice==0){
      $info.append('<div class="price" style="position: relative;">'+ 
      '<ins><span class="price-amount"><span class="currencySymbol">KSh</span>'+value.price+'</span></ins>'+
      '</div>')
      $info.append('<div class="slide-down-box">'+
      '<div class="buttons">'+
          '<a onclick="addtocart(\'' +value.id+ '\', \'' +value.name+ '\',\'' +value.description+ '\',\'' +value.price+ '\',\'' +value.image+ '\',\'' +value.price+'\',\'' +false+ '\')" class="btn add-to-cart-btn"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>add to cart</a>'+
      '</div>'+
      '</div>')
    }else if(value.offerprice!=0){
      $info.append('<div class="price" style="position: relative;">'+ 
      '<ins><span class="price-amount"><span class="currencySymbol">Ksh&nbsp;</span><span>'+value.offerprice+'</span></span></ins>'+
      '<del style="position: absolute;"><span class="price-amount"><span class="currencySymbol">Ksh&nbsp;</span><span>'+value.price+'</span></span></del>'+
      '</div>')
      $info.append('<div class="slide-down-box">'+
      '<div class="buttons">'+
          '<a onclick="addtocart(\'' +value.id+ '\', \'' +value.name+ '\',\'' +value.description+ '\',\'' +value.offerprice+ '\',\'' +value.image+ '\',\'' +value.price+'\',\'' +true+ '\')" class="btn add-to-cart-btn"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i>add to cart</a>'+
      '</div>'+
      '</div>')
    }

     $div1.append($info).appendTo($li)
      $(".most-viewed-carousel").slick('slickAdd',$li);
   
  });
});


/** sets views for products*/
function setViews(id){
  identify()
  let user=""
  let userid=localStorage.getItem("user_id")
  let email=localStorage.getItem("email")
  if(email==null){
   user=userid
  }else{
    user=email
  }
  let data={ "user":user, "productid":id}
  axios.post(VIEWS_URL,data).then(response => {
  }).catch(function (error) {   
    });
}
/** identify user*/

function identify(){
  axios.get(IDENTIFY_URL).then(response => {
     localStorage.setItem("user_id",response.data.user_id)
    
}).catch(function (error) {   
    });
}


let userid=localStorage.getItem("user_id")
if(userid==null){
 identify()
}

/** featured*/

 new Vue({
  el: '#index-page-featured',
  data () {
  return {
   products: [],
   cart:[],
   }
},
mounted () {
  axios.get(FEATURED_URL).then(response => {
    this.products = response.data
}).catch(function (error) {
      
    });
},
methods: {
    load: function (code,name,sku,description,details,price,image,originalprice,offer) {
    localStorage.setItem("sku",sku)
    localStorage.setItem("code",code)
    localStorage.setItem("name",name)
    localStorage.setItem("description",description)
    localStorage.setItem("details",details)
    localStorage.setItem("image",image)
    localStorage.setItem("price",price)
    localStorage.setItem("offer",offer)
    localStorage.setItem("originalprice",originalprice)
    localStorage.setItem("query","Featured")
    window.open ('product.html','_self',false)
    setViews(code)
    },
opencart: function(){
    window.open ('checkout.html','_self',false)
},
addtocart: function(code,name,description,price,image,originalprice,offer){
    let quantity=1;
    let subtotal=price *  quantity
    this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
    this.cart.push({code:code,name: name, description: description,price: price,originalprice:originalprice,offer:offer,image:image,quantity:quantity,subtotal:subtotal});  
    localStorage.setItem("cart", JSON.stringify(this.cart));
    minicart.setAll()
    Swal.fire({
        title: '<strong>Product has been added to cart</strong>',
        html:
        '<a style="font-size:15px" href="shopping-cart.html">View or edit cart</a>',
        showCloseButton: true,
        icon:'success',
        showCancelButton: true,
        confirmButtonColor: 'rgb(3 2 88)',
        cancelButtonColor: 'rgb(37 74 121 / 89%)',
        confirmButtonText: 'Checkout',
        cancelButtonText:'Continue Shopping',
        reverseButtons: true
        }).then((result) => {
        if (result.value) {		
                window.open ('checkout.html','_self',false)	
        }
        })
}
  }
})



function load(code,name,sku,description,details,price,image,originalprice,offer){
  localStorage.setItem("sku",sku)
  localStorage.setItem("code",code)
  localStorage.setItem("name",name)
  localStorage.setItem("description",description)
  localStorage.setItem("details",details)
  localStorage.setItem("image",image)
  localStorage.setItem("price",price)
  localStorage.setItem("offer",offer)
  localStorage.setItem("originalprice",originalprice)
  localStorage.setItem("query","Most Viewed")
  window.open ('product.html','_self',false)
  setViews(code)
}



 function addtocart(code,name,description,price,image,originalprice,offer){
      let quantity=1;
      let subtotal=price *  quantity
      this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
      this.cart.push({code:code,name: name, description: description,price: price,originalprice:originalprice,offer:offer,image:image,quantity:quantity,subtotal:subtotal});  
      localStorage.setItem("cart", JSON.stringify(this.cart));
      minicart.setAll()
      Swal.fire({
          title: '<strong>Product has been added to cart</strong>',
          html:
          '<a style="font-size:15px" href="shopping-cart.html">View or edit cart</a>',
          showCloseButton: true,
          icon:'success',
          showCancelButton: true,
          confirmButtonColor: 'rgb(3 2 88)',
          cancelButtonColor: 'rgb(37 74 121 / 89%)',
          confirmButtonText: 'Checkout',
          cancelButtonText:'Continue Shopping',
          reverseButtons: true
          }).then((result) => {
          if (result.value) {	
            window.open ('checkout.html','_self',false)	
          }
          })
  }
/** search */

new Vue({
  el: '#headersearch',
    data () {
      return {
  query:"",
     }
  },
 mounted () {

},
methods: {
search: function(){
  window.open ('search.html?query='+this.query,'_self',false) 
},
  }
})


/** mobile search */
new Vue({
  el: '#mobilesearch',
    data () {
      return {
  query:"",
     }
  },
 mounted () {

},
methods: {
search: function(){
  window.open ('search.html?query='+this.query,'_self',false) 
},
  }
})

/** account menu */
new Vue({
  el: '#account-menu',
    data () {
      return {
      showaccount:false,
      showlogin:true
     }
  },
 mounted () {
  let token=localStorage.getItem('token')
if(token==null){
  this.showlogin=true
  this.showaccount=false
}else{		
 this.showaccount=true
 this.showlogin=false
}
},
methods: {
  logout: function(){
    this.showaccount=false
    this.showlogin=true
    localStorage.clear()
    window.open ('index.html','_self',false)	
   }
  }
})
let firstname=localStorage.getItem('firstname')
$('.title-account').text(firstname)
$('#mobile-title-bottom').text(firstname)
/** account menu ----*/

/**bottom mobile menu navigation*/
$('#checkout-mobile-menu').click(function(){
  minicart.opencheckout()
});


new Vue({
  el: '#mobile-account-list',
    data () {
      return {
        showaccount:false,
        showlogin:true
     }
  },
 mounted () {
  let token=localStorage.getItem('token')
if(token==null){
  this.showlogin=true
  this.showaccount=false
}else{		
 this.showaccount=true
 this.showlogin=false
}
},
methods: {
    opencheckout: function(){
      minicart.opencheckout()
    },
    logout: function(){
      this.showaccount=false
      this.showlogin=true
      localStorage.clear()
      window.open ('index.html','_self',false)	
     }
  }
})
/** top bar cart section */
var minicart=new Vue({
  el: '#minicart-section',
    data () {
      return {
    cart:[],
    items:0,
    totalquantity:0
     }
  },
 mounted () {
  this.setAll()
},
methods: {
setCart: function(){
  this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
  this.items=this.cart.length;
 
},
setAll:function(){
  this.setCart()
  this.getTotalQuantity()
},
deleteItem: function(index){
  this.cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(this.cart));
  this.getTotalQuantity()
},
adjustQuantity: function(index){

},
getTotalQuantity: function(){
  let quantity=0
  this.cart.forEach(function(cart, index) {
    quantity+=parseFloat(cart.quantity);		
   });
  this.totalquantity=quantity
},
opencheckout: function(){	
  window.open ('checkout.html','_self',false)	

}
  }
})

var cartable=new Vue ({
 el:'#cart-table',
 data () {
  return {
cart:[],
cart2:[],
items:0,
total:0,
quantity:0
 }
},
mounted () {
this.setCart()
this.getTotal()
this.cart2= this.cart.map(o => ({...o}));
},
methods:{
 setCart:function(){
  this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
  this.items=this.cart.length;
 },
 getTotal:function(){
  let total=0
  let quantity=0
  this.cart.forEach(function(cart, index) {
    total+=parseFloat(cart.subtotal);	
    quantity+=parseFloat(cart.quantity);		
   });
  this.total=total
  this.quantity='('+quantity+' item(s))'
 },
clearAll:function(){
  this.cart=[]
  localStorage.setItem("cart", JSON.stringify(this.cart));
  this.getTotal()
  minicart.setAll()
},
deleteItem: function(index){
  this.cart.splice(index, 1);
  this.cart2.splice(index,1)
  localStorage.setItem("cart", JSON.stringify(this.cart));
  this.getTotal()
  minicart.setAll()
},
btnUpClickQuantity:function(price,index){
  let quantity=$("#qt254").val()
  let vl=Number(quantity) + 1
  let newtotal=vl * price
  this.cart[index].subtotal=newtotal
  this.cart[index].quantity=quantity
  this.cart2[index].subtotal=newtotal
  this.cart2[index].quantity=vl
  localStorage.setItem("cart", JSON.stringify(this.cart2));
  this.getTotal()
  minicart.setAll()
 
},
btnDownClickQuantity: function(price,index){
   let quantity=$("#qt254").val()
  let vl=Number(quantity) - 1
  if(vl ==0)
      vl=1
  let newtotal=vl * price
  this.cart[index].subtotal=newtotal
  this.cart[index].quantity=quantity

  this.cart2[index].subtotal=newtotal
  this.cart2[index].quantity=vl
  localStorage.setItem("cart", JSON.stringify(this.cart2));
  this.getTotal()
  minicart.setAll()
  
},
quantityChange: function(event,price,index){
  console.log("change")
  let quantity=event.target.value
  let newtotal=quantity * price
  this.cart[index].subtotal=newtotal
  this.cart[index].quantity=quantity
  localStorage.setItem("cart", JSON.stringify(this.cart));
  this.getTotal()
  minicart.setAll()
},
opencheckout: function(){		
  window.open ('checkout.html','_self',false)	
}
}
})




