const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');
let urlprod= `${API_URL}/api/products`
$('#nav-current').text(query)
var productsect= new Vue({
    el: '#product-list-section',
    data () {
    return {
     products: [],
     cart:[],
     showError:false,
     message:"",
     Ksh:"Ksh ",
     start:1,
     setDisabledN:true,
     setDisabledP:true,
     totalitems:0,
     perpage:12,
     alreadydisplayed:0,
     datalengh:0,
     fromdata:0,
     display:"none"
     }
  },
mounted () {
this.fetch(1)
this.setDisabledP	
},
methods: {
    replaceByDefault(e) {
        e.target.src = "assets/images/cart.svg"
      },
   fetch: function(num){
    $('#prod-loader').show()
  const pagenum=num
  const url = `${urlprod}/${query}/${pagenum}`; 
  axios.get(url).then(response => {
      $('#prod-loader').hide()
      $('#top-prod-loader').hide()
      this.products = response.data.products
      console.log( response.data.products)
      this.perpage=response.data.per_page
      this.totalitems=response.data.total
      this.datalengh=this.products.length
      if(num==1){
      this.alreadydisplayed=this.datalengh
      }else{
      this.alreadydisplayed=this.datalengh +(this.perpage * (num-1))	
      }
      this.fromdata=(this.alreadydisplayed - this.datalengh)+1
      if(this.totalitems > this.perpage){
          this.setDisabledN=false
      }else{
          this.setDisabledN=true
      }
      if(this.products.length < this.perpage){
          this.setDisabledN=true
      }
      if(this.alreadydisplayed == this.totalitems){
          this.setDisabledN=true
      }
      if(num > 1){
          this.setDisabledP=false
      }else{
          this.setDisabledP=true
      }
      console.log(this.alreadydisplayed)
      if(this.products.length <=0){
          $('#errorsection').show()
          $('#main').hide()
          $("#errortext").text("No Products found");
      }else{
        $('#errorsection').hide()
        $('#main').show()
      }
  }).catch(function (error) {
          $('#top-prod-loader').hide()
          $('#prod-loader').hide()
          $('#errorsection').show()
          $('#main').hide()
          $("#errortext").text(error);
      });

   },
      load: function (code,name,sku,description,details,price,image) {
      localStorage.setItem("sku",sku)
      localStorage.setItem("code",code)
      localStorage.setItem("name",name)
      localStorage.setItem("description",description)
      localStorage.setItem("details",details)
      localStorage.setItem("image",image)
      localStorage.setItem("price",price)
      localStorage.setItem("query",query)
      window.open ('product.html','_self',false)
      setViews(code)
      },
  opencart: function(){
      window.open ('checkout.html','_self',false)
  },
   next :function(){
    this.start=this.start +1
      this.products=[]
      this.fetch(this.start)
      this.scroll();
   },
   previous:function(){
     this.start=this.start -1
     this.products=[]
     this.fetch(this.start)
     this.alreadydisplayed=this.alreadydisplayed - this.datalengh
     console.log(this.alreadydisplayed)
     this.scroll();
   },
   scroll() {
    this.$nextTick(() => {
        $('html, body').animate({
            scrollTop: $("#product-list-section").offset().top
        }, 1000);
    });
  },
  addtocart: function(code,name,description,price,image){
      let quantity=1;
      let subtotal=price *  quantity
      this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
      this.cart.push({code:code,name: name, description: description,price: price,image:image,quantity:quantity,subtotal:subtotal});  
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


/**  product refine sorting */

$('.orderby').on('change', function() {
    if(this.value=='price-asc'){
      urlprod=`${API_URL}/api/productspriceasc`
      productsect.fetch(1)
      productsect.$forceUpdate();
    }else if(this.value=='menu_order'){
        urlprod=`${API_URL}/api/products`
        productsect.fetch(1)
    }else if(this.value=='price-desc'){
        urlprod=`${API_URL}/api/productspricedesc`
        productsect.fetch(1) 
    }else if(this.value=='date'){
        urlprod=`${API_URL}/api/bydate`
        productsect.fetch(1)  
    }else if(this.value=='rating'){
        urlprod=`${API_URL}/api/byrating`
        productsect.fetch(1)  
    }else if(this.value=='popularity'){
        urlprod=`${API_URL}/api/bypopularity`
        productsect.fetch(1)  
    }
  });


$biolife_select = $('select:not(.hidden)')

if( $biolife_select.length ){
    $biolife_select.niceSelect()
}



   