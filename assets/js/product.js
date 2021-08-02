let name=localStorage.getItem('name')
let price=localStorage.getItem('price')
let sku=localStorage.getItem('sku')
let description=localStorage.getItem('description')
let code=localStorage.getItem('code')
let image=localStorage.getItem('image')
let details=localStorage.getItem('details')
let query=localStorage.getItem('query')
let offer=localStorage.getItem('offer')
let originalprice=localStorage.getItem("originalprice")
$('#tab_1st').append(details)
$('#title-prod').text(localStorage.getItem('name'))
$('#tot-prod-price').text(localStorage.getItem('price'))
$('#current-page-link').text(name)
$('.excerpt').text(description)
$('.sku').text("Sku: " + sku)
if(offer=='true'){
    $('#wrap_price').append('<ins><span class="price-amount"><span class="currencySymbol">Ksh&nbsp;</span><span id="price-prod">' + price+ '</span></ins>')  
    $('#wrap_price').append(' <del><span class="price-amount"><span class="currencySymbol">Ksh&nbsp;</span><span id="original-price">' + originalprice + '</span></span></del>')  
}else if(offer=='false'){
  $('#wrap_price').append('<ins><span class="price-amount"><span class="currencySymbol">Ksh&nbsp;</span><span id="price-prod">' + price + '</span></ins>')  
}
let id=localStorage.getItem('code')
const PRODUCT_URL=`${API_URL}/api/productimage/${id}`
const REVIEW_URL=`${API_URL}/api/review`;
const RELATED_URL=`${API_URL}/api/relatedproduct/${query}/${name}`
const RATING_REVIEW_URL=`${API_URL}/api/reviewproduct/${id}`
$.get(RATING_REVIEW_URL, function(response) {
    $("#h-review-count").text(response.count +" Reviews")
    $("#h-see-all").text(response.count +" Reviews")
    $('#h-total-reviews').text(response.count)
    let totext=5
    if(response.count>5){
      totext=5
    }else {
      totext=response.count
    }
    $('#h-to-text').text("1-" +totext)
    $("#sup-rev").text("(" + response.count +")" )
    $("#h-rating").text(response.average)
    $("#h-5star").text(response.star5)
    $("#h-4star").text(response.star4)
    $("#h-3star").text(response.star3)
    $("#h-2star").text(response.star2)
    $("#h-1star").text(response.star1)
    let totalstar=response.star5 + response.star4 + response.star3 + response.star2 + response.star1
    let star5percent=Math.round(((response.star5 / totalstar) * 100) / 10) * 10 
    let star4percent=Math.round(((response.star4 / totalstar) * 100) / 10) * 10 
    let star3percent=Math.round(((response.star3 / totalstar) * 100) / 10) * 10 
    let star2percent=Math.round(((response.star2 / totalstar) * 100) / 10) * 10 
    let star1percent=Math.round(((response.star1 / totalstar) * 100) / 10) * 10 
    let  starline=Math.round(((response.average / 5) * 100) / 10) * 10 
    $( "#h-line5star" ).addClass( "width-"+star5percent+"percent");
    $( "#h-line4star" ).addClass( "width-"+star4percent+"percent");
    $( "#h-line3star" ).addClass( "width-"+star3percent+"percent");
    $( "#h-line2star" ).addClass( "width-"+star2percent+"percent");
    $( "#h-line1star" ).addClass( "width-"+star1percent+"percent");
    $( "#h-star-line" ).addClass( "width-"+starline+"percent");
    $( "#prod-star-line").addClass( "width-"+starline+"percent");
   $.each(response.reviews, function(key, value) {
    let  starline=Math.round(((value.rating / 5) * 100) / 10) * 10 
    console.log(starline)
    let starclass="width-"+starline+"percent"
    $(".commentlist").append('<li class="review">'+
    '<div class="comment-container">'+
        '<div class="row">'+
            '<div class="comment-content col-lg-8 col-md-9 col-sm-8 col-xs-12">'+
                '<p class="comment-in"><span class="post-name">'+value.title+'</span><span class="post-date">'+value.date+'</span></p>'+
                '<div class="rating"><p class="star-rating"><span class="'+starclass+'"></span></p></div>'+
                '<p class="author">by: <b>'+value.name+'</b></p>'+
                '<p class="comment-text">'+value.review+'</p>'+
            '</div>'+
          
        '</div>'+
    '</div>'+
'</li>');
   });

  console.log(response)
});

$.get(PRODUCT_URL, function(response) {
    $.each(response, function(key, value) {
        $(".prod-carousel").slick('slickAdd','<li><img src="'+value.image+'" alt="" width="500" height="500"></li>');
    });
});

$.get(RELATED_URL, function(response) {
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
        $(".related-products").slick('slickAdd',$li);
    });
});

  $("#qty12554").bind('keyup mouseup', function () {
    var bla = $("#qty12554").val();  
    let vl=Number(bla)
    let price=$('#price-prod').text()
    if(vl > 0 ){
    let amount=Number(price) * vl
    $('#tot-prod-price').text(amount)  
    }
});


$('.btn-up').click(function(){
    var bla = $("#qty12554").val();
    let vl=Number(bla) +1
    let price=$('#price-prod').text()
    if(vl >0){
    let amount=Number(price) * vl
    $('#tot-prod-price').text(amount)
    }
});

$('.btn-down').click(function(){
    var bla = $("#qty12554").val();
    let vl=Number(bla) - 1
    if(vl ==0)
        vl=1
    let price=$('#price-prod').text()
    if(v1 > 0){
    let amount=Number(price) * vl
    $('#tot-prod-price').text(amount)
    }
});

$('.add-to-cart-btn').click(function(){
let subtotal=$('#tot-prod-price').text()
let quantity=$("#qty12554").val()
this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
this.cart.push({code: code,name: name, description: description,price: price,originalprice:originalprice,offer:offer,image:image,quantity:quantity ,subtotal:subtotal});  
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
});

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



 var review=new Vue({
    el: '#reviewform',
    data () {
    return {
    name:"",
    title:"",
    email:"",
    review:"",
    stars:0
     }
  },
mounted () {

},
methods: {
    setStar(stars){
       this.stars=stars
    },
 submit: function(){
      if(this.stars!=0){
      let data={"stars":this.stars,"productid":code, "name":this.name, "title":this.title,"email":this.email,"review":this.review,"stars":this.stars}
      axios.post(REVIEW_URL,data).then(function (response) {
       if(response.data.status ==='success'){
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
            })
       }else if(response.data.status ==='fail'){
          Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'Ok'
          })
       }else{
          Swal.fire({
          title: 'Error',
          text: 'Network error',
          icon: 'error',
          confirmButtonText: 'Ok'
          })
       }
      })
      .catch(function (error) {
          Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          confirmButtonText: 'Ok'
          })    
      });
    }else{
        Swal.fire({
            title: 'Info',
            text: 'Give a star rating first',
            icon: 'info',
            confirmButtonText: 'Ok'
            })  
    }
  }

    }
})


$('.comment-form-rating').each(function(index,element){
    $('.comment-form-rating').on('click', '.btn-rating', function (e) {
        e.preventDefault();
        let btn = $(this);
        if( !btn.hasClass('selected')){
            btn.siblings().removeClass('selected');
            btn.addClass('selected');
            btn.parents('span').addClass('rated');
        }
       var vl= e.target.getAttribute('data-value');
       review.setStar(vl)
    });
 
});