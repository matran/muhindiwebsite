const email=localStorage.getItem("email")
const url = `${API_URL}/api/orderscustomer/${email}`;
   new Vue({
   el: '#orders-table',
   data () {
   return {
   orders:[]
   }
 },
 mounted () {
    axios.get(url).then(response => {
        this.orders = response.data
        if(this.orders.length ==0){
         $('#h-no-orders').show()
      }else{
       $('#h-no-orders').hide()
     }
 })	
 },
methods: {
   openOrder: function(index){
   var cart=this.orders[index].cart
   var total=this.orders[index].total
   var quantity=this.orders[index].totalquantity
   var shippingcost=this.orders[index].shippingcost
   sessionStorage.setItem("order",cart)
   sessionStorage.setItem("total",total)
   sessionStorage.setItem("totalquantity",quantity)
   sessionStorage.setItem("shippingcost",shippingcost)
    window.open ('order.html','_self',false)
   },

   }
})

new Vue({
   el: '#more-info-order',
   data () {
   return {
   cart:[],
   items:0,
   quantity:0,
   shipping:0,
   total:0
   }
 },
 mounted () {
    this.cart=JSON.parse(sessionStorage.getItem("order") || "[]");
    this.total=sessionStorage.getItem("total")
    this.quantity=sessionStorage.getItem("totalquantity")
    this.shipping=sessionStorage.getItem("shippingcost")
    this.items=this.cart.length;
   
 },
methods: {
 

   }
})