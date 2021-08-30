const urllogin = `${API_URL}/api/login`;
const urlregister = `${API_URL}/api/authusers`;
const urlParams = new URLSearchParams(window.location.search);
const launch = urlParams.get('launch');
  var login= new Vue({
      el: '#loginform',
      data () {
      return {
      email:"",
      password:""
       }
    },
 mounted () {

 },
 methods: {
    toggle:function() {  
        var x = document.getElementById("fid-pass-login");
        if (x.type === "password") {
            x.type = "text";
            $('#password-hide-l').hide()
           $('#password-show-l').show()
        } else {
            $('#password-hide-l').show()
            $('#password-show-l').hide()
            x.type = "password";
        }
    },
   sendResetLink:function(){
    Swal.fire({
                title: 'Recover Password',
                input: 'email',
                inputPlaceholder: 'Enter your email address',
                showCancelButton: true,
                confirmButtonText: 'Email me Recovery link',
                showLoaderOnConfirm: true,
                preConfirm: async (email) => {
                    try {
                        const response = await fetch(`${API_URL}/api/passwordrequest/${email}`);
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return await response.json();
                    } catch (error) {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        );
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.value.status =='success') {
                    Swal.fire({
                        title: 'success',
                        text: 'Reset link is successfully sent to your email.open the link to reset password',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }else if(result.value.status =='fail'){
                    Swal.fire({
                        title: 'Error',
                        text: 'Account does not exist',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })

                }
                })   
   },
   login: function(){
        $( "#login-progress" ).show();
        $( "#button-login" ).hide();
        let login={ "email":this.email,"password":this.password}
        axios.post(urllogin,login).then(function (response) {
            $( "#login-progress" ).hide();
            $( "#button-login" ).show();
         if(response.data.status ==='success'){
            localStorage.setItem('token', response.data.token)
            localStorage.setItem("firstname",response.data.data.firstname)
            localStorage.setItem("lastname",response.data.data.lastname)
            localStorage.setItem("email",response.data.data.email)
            if(launch==='checkout'){
                window.open ('checkout.html','_self',false)					
            }else{
                window.open ('index.html','_self',false)	
            }
                const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
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
            $( "#login-progress" ).hide();
            $( "#button-login" ).show();
            Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
            confirmButtonText: 'Ok'
            })    
        });
    },

      }
})

new Vue({
      el: '#registerform',
      data () {
      return {
      firstname:"",
      lastname:"",
      remail:"",
      rpassword:"",
      repeatpassword:"",
      tel:"",
      mismatcherror:false,
      textmismatch:"",
      error:false,
      options:[]
       }
    },
 mounted () {


 },
 methods: {
     toggle:function() {  
        var x = document.getElementById("fid-pass-reg");
        if (x.type === "password") {
            x.type = "text";
            $('#password-hide').hide()
           $('#password-show').show()
        } else {
            $('#password-hide').show()
            $('#password-show').hide()
            x.type = "password";
        }
    },
    register: function(){
        $( "#register-progress" ).show();
        $( "#button-register" ).hide();
    let	users={ "firstname":this.firstname,"lastname":this.lastname, "email":this.remail, "password":this.rpassword ,"phone":this.tel}
    axios.post(urlregister,users).then(function (response) {
            if(response.data.status=='success'){
            window.open ('info.html','_self',false)					
            }else if(response.data.status=='fail'){
            $( "#register-progress" ).hide();
            $( "#button-register" ).show();
            Swal.fire({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
            })
            }else{
            $( "#register-progress" ).hide();
            $( "#button-register" ).show();
            Swal.fire({
            title: 'Error',
            text: 'Fail to register',
            icon: 'error',
            confirmButtonText: 'Ok'
            })
            }
        }).catch(function (error) {
            $( "#register-progress" ).hide();
            $( "#button-register" ).show();
            Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error',
            confirmButtonText: 'Ok'
            })
            console.log(error);
        })
    } 
      }
})
