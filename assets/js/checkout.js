new Vue({
    el: '#checkout-vue',
      data () {
        return {
       email:"",
       shipping:"",
       shippingcost:0,
       phoneno:"",
       options:[],
       error:true,
       cart:[],
       total:0,
       quantity:0,
       items:0,
       amount:0,
       totaltext:"KSh 0",
       quantitytext:"0 items",
       amounttext:"KSh 0",
       shippingcosttext:"KSh 0",
       X:"x"
       }
    },
   mounted () {
    this.cart=JSON.parse(localStorage.getItem("cart") || "[]");
    let firstname=localStorage.getItem("firstname")
    let lastname=localStorage.getItem("lastname")
    if(firstname == null){
      $('#h-guest').show()
    }else{
      $('#h-customer').show()
      $('#c-first-name').text(firstname)
      $('#c-last-name').text(lastname)
      this.email="set"
      $('#h-step-1').removeClass("active")
      $('#h-step-2').addClass("active")
    }
    this.getShipLocations()
    this.getTotals()
    },
  methods: {
  setEmail: function(){
    localStorage.setItem("guestemail",this.email)
    $('#h-step-1').removeClass("active")
    $('#h-step-2').addClass("active")
   },
   setShipping: function(event){
    this.shippingcost=event.target.value
    this.shippingcosttext="KSh "+ this.shippingcost
    this.shipping = event.target.options[event.target.options.selectedIndex].text;
    this.calculateAmount()
    $('#h-step-2').removeClass("active")
    $('#h-step-3').addClass("active")
   },
   setPhone: function(){

   },
   getShipLocations: function(){
    const urllocations = `${API_URL}/api/locations`;
    axios.get(urllocations).then(response => {
      this.options = response.data
    }).catch(function (error) {  
      });	
   },
   getTotals: function(){
    let total=0
    let quantity=0
    this.cart.forEach(function(cart, index) {
      total+=parseFloat(cart.subtotal);	
      quantity+=parseFloat(cart.quantity);		
     });
    this.total=total
    this.totaltext="KSh " +total
    this.quantity=quantity
    this.quantitytext=quantity +" items"
    this.amount=total
    this.amounttext="KSh " + total
   },
   calculateAmount: function(){
     this.amount=Number(this.total) +  Number(this.shippingcost)
     this.amounttext="KSh " + this.amount
   },
   validate: function(){
		let d=/^\d{10}$/.test(this.phoneno)
    if(this.phoneno.substring(0, 1) != 0){
      d=false
     }
        if(this.shipping==''){
			  	this.error=true
			    var message="Shipping Location is required"
					Swal.fire({
					title: 'error',
					text: message,
					icon: 'error',
					confirmButtonText: 'Ok'
					})
		  }else if(this.email==''){
        this.error=true
        var message="Email is required"
        Swal.fire({
        title: 'error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
        })
      }
      else if(this.phoneno==''){
			  	this.error=true
			    var message="Please Enter Phone Number"
					Swal.fire({
					title: 'error',
					text: message,
					icon: 'error',
					confirmButtonText: 'Ok'
					})

		  }else if(!d){
			  	this.error=true
					var message="Invalid phone number. Must be 10 digits"
					Swal.fire({
					title: 'error',
					text: message,
					icon: 'error',
					confirmButtonText: 'Ok'
					})

		  }else{
			  this.error=false
		  }
   },
   placeOrder: function(){
    this.validate()
		if(this.error==false){
      $('#checkout-progress').show()
      $('.place-order').hide()
      let customer=""
      let email=""
      if(this.email!="set"){
       customer="Guest("+this.email+")"
       email=this.email
      }else {
       customer=localStorage.getItem("firstname") +" " + localStorage.getItem("lastname")
       email=localStorage.getItem("email")
      }
		let cart=localStorage.getItem("cart") || "[]";
		let phone=this.phoneno.replace(/^0+/, '254');
    const url = `${API_URL}/api/placeorder`;
		let order={"totalquantity":this.quantity,"email":email,"customer":customer,"phone":phone,"shipto":this.shipping,"shippingcost":this.shippingcost,"total":this.total,"amount":this.amount,"cart":cart}
    console.log(order)
			 axios.post(url,order).then(function(response){
         $('#checkout-progress').hide()
         $('.place-order').show()
				  if(response.data.status=='success'){
				  Swal.fire({
					title: 'Success',
					text: 'Order submitted.Stk push is initiated in your mobile number.Please Enter mpesa pin if prompt appears on your phone',
					icon: 'success',
					confirmButtonText: 'Ok'
					})
				  }else{
					var message=response.data.message
					Swal.fire({
					title: 'error',
					text: message,
					icon: 'error',
					confirmButtonText: 'Ok'
					})
				  }
				 console.log(response.data);
				}).catch(function (error) {
					$('#checkout-progress').hide()
          $('.place-order').show()
					Swal.fire({
					title: 'error',
					text: 'Failed to submit order',
					icon: 'error',
					confirmButtonText: 'Ok'
					})
					console.log(error);
				});
	   }
   }
    }
  })

  
