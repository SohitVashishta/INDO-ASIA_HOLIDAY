$(document).ready(function(){
    $('.auth_login_submit').hide();
    $("#auth_login").on('submit',function(e){
        e.preventDefault();var data=$(this).serialize();
        if($('#auth_login input[name="userName"]').val()==''){
            $('.login_msg').html('Please enter your email id');
            $('#auth_login input[name="userName"]').focus();return false;
        }
        if($('#auth_login input[name="userPassword"]').val()==''){
            $('.login_msg').html('Please enter your password');
            $('#auth_login input[name="userPassword"]').focus();return false;
        }
        $('.loging').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/userlogin',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.loging').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Authentication...');},
            success:function(result){
                if(result.status){
                    $('.login_msg_success').html(result.message);
                    $('.loging').hide();
                    $('#AgencySysId_').val(result.AgencySysId);
                    $('#CustomerSysId').val(result.CustomerSysId);
                    $('#EmailId').val(result.EmailId);
                    $('#FirstName').val(result.FirstName);
                    $('#LastName').val(result.LastName);
                    $('#Password_cu').val(result.Password);
                    $('#Contacts').val(result.Contacts);
                    $('#auth_login_submit').submit();
                }else{
                    $('.loging').html('Login');
                    $('.loging').removeAttr('disabled','disabled');
                    $('.login_msg').html(result.message);return false;
                }
            },
            error:function(){
                $('.loging').html('Login');
                $('.loging').removeAttr('disabled','disabled');
                alert('Oops unable to connect with server!!');
            }
        });
    });
    
    
    
    $("#user_signup").on('submit',function(e){
        e.preventDefault();var data=$(this).serialize();
        if($('#user_signup input[name="EmailId"]').val()==''){
            $('.signuperror_msg').html('Please enter your Email Id');
            $('#user_signup input[name="EmailId"]').focus();return false;
        }
        if($('#user_signup input[name="mobilenum"]').val()==''){
            $('.signuperror_msg').html('Please enter your mobile number');
            $('#user_signup input[name="mobilenum"]').focus();return false;
        }
        if($('#user_signup input[name="password"]').val()==''){
            $('.signuperror_msg').html('Please enter your password');
            $('#user_signup input[name="password"]').focus();return false;
        }
        if($('#user_signup input[name="copassword"]').val()==''){
            $('.signuperror_msg').html('Please enter your confirm password');
            $('#user_signup input[name="copassword"]').focus();return false;
        }
        
        $('.signup').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/usersignup',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.signup').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');},
            success:function(result){
                console.log(result);
                if(result.status){
                    $('.signuperror_msg').hide();
                    $('.signupsuccess_msg').html(result.message);
                    $('#AgencySysId_').val(result.data.AgencySysId);
                    $('#CustomerSysId').val(result.data.CustomerSysId);
                    $('#EmailId').val(result.data.EmailId);
                    $('#FirstName').val(result.data.FirstName);
                    $('#LastName').val(result.data.LastName);
                    $('#Password_cu').val(result.data.Password);
                    $('#auth_login_submit').submit();
                }else{
                    $('.signup').html('Sign Up');
                    $('.signup').removeAttr('disabled','disabled');
                    $('.signuperror_msg').html(result.message);
                    return false;
                }
            },
            error:function(){
                $('.signup').html('Sign Up');
                $('.signup').removeAttr('disabled','disabled');
                alert('Oops unable to connect with server!!');
            }
        });
    });

//Continue_login();

    
   

    $("#forgot_password").on('submit',function(e){
        e.preventDefault();
        var data=$(this).serialize();
        if($('#forgot_password input[name="forget"]').val()==''){
            $('.forgot_msg').html('Please enter your registered email id');
            $('#forgot_password input[name="forget"]').focus();return false;
        }
        $('.forgot').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/forgotpassword',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){$('.forgot').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait..');},
            success:function(result){
                if(result.status){
                    $('#successmsg').html("<center color='green'><strong>Verification Link Sent</strong> <br>we will send a link to reset password to your registered email id. This link expire within 10 minutes.</center>")
                    $('.hidedivs').hide();
                    $('.forgot').removeAttr('disabled','disabled');
                }else{
                    $('.forgot').html('Submit');
                    $('.forgot').removeAttr('disabled','disabled');
                    $('.forgot_msg').html(result.message);return false;}
                },
            error:function(){
                $('.forgot').html('Submit');
                $('.forgot').removeAttr('disabled','disabled');
                alert('Oops unable to connect with server!!');}
        });
    });
    
    $("#reset_password").on('submit',function(e){
        e.preventDefault();
        var data=$(this).serialize();
        if($('#reset_password input[name="npass"]').val()===''){
            $('.passchange_msg').html('Please enter new password');
            $('#reset_password input[name="npass"]').focus();return false;
        }
        if($('#reset_password input[name="copass"]').val()===''){
            $('.passchange_msg').html('Please enter confirm password');
            $('#reset_password input[name="copass"]').focus();return false;
        }
        if($('#reset_password input[name="npass"]').val()!==$('#reset_password input[name="copass"]').val()){
            $('.passchange_msg').html('Confirm password does not match with new password');
            $('#reset_password input[name="copass"]').focus();return false;
        }
        $('.change').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/resetpassword',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.change').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');
            },
            success:function(result){
                if(result.status){
                    $('.change').html('Submit');
                    $('.change').removeAttr('disabled','disabled');
                    $('.passchange_msg').html(result.message);
                    window.location.href=SITEURL+"users/index//unsetresetdata";
                }else{
                    $('.change').html('Submit');
                    $('.change').removeAttr('disabled','disabled');
                    $('.passchange_msg').html(result.message);return false;
                }
            },
            error:function(){
                $('.change').html('Submit');
                $('.change').removeAttr('disabled','disabled');
                alert('Oops unable to connect with server!!');
            }
        });
    });
    
    $("#change_password").on('submit',function(e){
        e.preventDefault();
        var data=$(this).serialize();
        if($('#change_password input[name="opwd"]').val()===''){
            $('.passchange_msg').css('color','red').html('Please enter old password');
            $('#change_password input[name="opwd"]').focus();return false;
        }
        if($('#change_password input[name="npwd"]').val()===''){
            $('.passchange_msg').css('color','red').html('Please enter new password');
            $('#change_password input[name="npwd"]').focus();return false;
        }
        if($('#change_password input[name="cpwd"]').val()===''){
            $('.passchange_msg').css('color','red').html('Please enter confirm password');
            $('#change_password input[name="cpwd"]').focus();return false;
        }
        if($('#change_password input[name="npwd"]').val()!==$('#change_password input[name="cpwd"]').val()){
            $('.passchange_msg').css('color','red').html('Confirm password does not match with new password');
            $('#change_password input[name="cpwd"]').focus();return false;
        }
        $('.update').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/changepassword',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.update').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');
            },
            success:function(result){
                if(result.status){
                    $('.update').html('Submit');
                    $('.update').removeAttr('disabled','disabled');
                    $('.passchange_msg').html(result.message).css('color','green');
//                    window.location.href=SITEURL+"users/index/unsetchangedata";
                }else{
                    $('.update').html('Submit');
                    $('.update').removeAttr('disabled','disabled');
                    $('.passchange_msg').html(result.message).css('color','red');
                    return false;
                }
            },
            error:function(){
                $('.update').html('Submit');
                $('.update').removeAttr('disabled','disabled');
                alert('Oops unable to connect with server!!');
            }
        });
    });
    
    $( "#update_profile" ).on('submit',function(e){
         e.preventDefault();
        var data = $(this).serialize();
        //alert(SITEURL);
        console.log(data);
        if($('#update_profile input[name="FirstName"]').val() === ''){
            $('.alrt_msg').html('Please enter your first name');
            $('#update_profile input[name="FirstName"]').focus();return false;
        }
        if($('#update_profile input[name="LastName"]').val() === ''){
            $('.alrt_msg').html('Please enter your last name');
            $('#update_profile input[name="LastName"]').focus();return false;
        }
        if($('#update_profile input[name="contacts"]').val() === ''){
            $('.alrt_msg').html('Please enter your mobile number');
            $('#update_profile input[name="contacts"]').focus();return false;
        }
        if(!$.isNumeric($('#update_profile input[name="contacts"]').val()) ){
            $('.alrt_msg').html('Mobile should be numeric!!');
            $('#update_profile input[name="contacts"]').focus();return false;
        }
        if($('#update_profile input[name="contacts"]').val().length != '10'){
            $('.alrt_msg').html('Mobile should be 10 digit?');
            $('#update_profile input[name="contacts"]').focus();return false;
        }
        if($('#update_profile select[name="country"]').val() === ''){
            $('.alrt_msg').html('Please select country');
            $('#update_profile select[name="country"]').focus();return false;
        }
        if($('#update_profile select[name="city_id"]').val() === ''){
            $('.alrt_msg').html('Please select city');
            $('#update_profile select[name="city_id"]').focus();return false;
        }
        $('.change').attr('disabled', 'disabled');
        
        $.ajax({
            url:SITEURL+'users/index/updateprofile',
         
            type: 'POST',
            data: data,
            dataType: 'json',
            beforeSend: function(){ $('.change').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');},
            success:function(result){
                if(result.status){
                    //Thank you message
                    $('.change').html('Update Profile');
                    $('.change').removeAttr('disabled', 'disabled');
                    $('.alrt_msg p').css('color','#ff0000');
                    $('.alrt_msg').html(result.message).css('color','#ff0000');
                }else{
                    // error response
                    $('.change').html('Update Profile');
                    $('.change').removeAttr('disabled', 'disabled');
                    $('.alrt_msg').html(result.message);return false;
                }
            },
            error:function(result){
                $('.change').html('Update Profile');
                $('.change').removeAttr('disabled', 'disabled');
                alert('Oops unable to connect with server!!');
            }

        });
        //alert('fsdfds');return false;
    });
    
    $(document).on('click','.forgotpass', function(){
        $('#loginPanel').hide();
        $('#forgot_password').trigger("reset");
        $('#auth_login').trigger("reset");
        $('#forgot_password').show();
    });
    $(document).on('click','.login', function(){
        $('#loginPanel').show();
        $('#forgot_password').trigger("reset");
        $('#auth_login').trigger("reset");
        $('#forgot_password').hide();
    });
});

 function validateUpdateProfile(){
        if($('#FirstName').val() === ''){
            $('.alrt_msg').html('Please enter your first name');
            $('#FirstName').focus();return false;
        }
        if($('#LastName').val() === ''){
            $('.alrt_msg').html('Please enter your last name');
            $('#LastName').focus();return false;
        }
        if($('#contacts').val() === ''){
            $('.alrt_msg').html('Please enter your mobile number');
            $('#contacts').focus();return false;
        }
        if(!$.isNumeric($('#contacts').val()) ){
            $('.alrt_msg').html('Mobile should be numeric!!');
            $('#contacts').focus();return false;
        }
        if($('#contacts').val().length != '10'){
            $('.alrt_msg').html('Mobile should be 10 digit?');
            $('#contacts').focus();return false;
        }
        if($('#select-country').val() === ''){
            $('.alrt_msg').html('Please select country');
            $('#select-country').focus();return false;
        }
        if($('#select-city').val() === ''){
            $('.alrt_msg').html('Please select city');
            $('#select-city').focus();return false;
        }
        return true;
    }

function Continue_login(){
    //$("#continue_login").on('submit',function(e){
        var data=$('#continue_login').serialize();
        //var regex = /^\+(?:[0-9] ?){1,4}[0-9]$/;
        
        
//        if($('#continue_login input[name="ountryCode"]').val()==''){
//            $('.signuperror_msg').html('Please enter your country code').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="ountryCode"]').focus();return false;
//        }
//        if (regex.test($('#continue_login input[name="ountryCode"]').val())){
//        }else{
//            $('.signuperror_msg').html('Please enter valid country code with + symbol!').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="ountryCode"]').focus();return false;
//        }
//        if($('#continue_login input[name="mobilenumber"]').val()==''){
//            $('.signuperror_msg').html('Please enter your mobile number').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="mobilenumber"]').focus();return false;
//        }
//        
//        if($('#continue_login input[name="mobilenumber"]').val().length != '10'){
//            $('.signuperror_msg').html('Mobile number should be 10 digits').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="mobilenumber"]').focus();return false;
//        }
        
        $('.signup').attr('disabled','disabled');
        $.ajax({
            url:'users/index/login',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
//                $('.signup').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');
            },
            success:function(result){
                console.log(result);
//                return false;
                if(result.status){
                    $('.signupsuccess_msg').html(result.message);
                    $('#AgencySysId_').val(result.AgencySysId);
                    $('#CustomerSysId').val(result.CustomerSysId);
                    $('#EmailId').val(result.EmailId);
                    $('#FirstName').val(result.FirstName);
                    $('#LastName').val(result.LastName);
                    $('#Password_cu').val(result.Password);
                    $('#auth_login_submit').submit();
                }else{
                    $('.signup').html('Continue');
                    $('.signup').removeAttr('disabled','disabled');
                    $('.signuperror_msg').html(result.message);return false;
                }
            },
            error:function(){
                $('.signup').html('Continue');
                $('.signup').removeAttr('disabled','disabled');
                $('.signuperror_msg').html('Oops unable to connect with server!!')
                //alert('Oops unable to connect with server!!');
            }
        });
    }
    
     function Continue_loginfacebook(){
    //$("#continue_login").on('submit',function(e){
        var data=$('#continue_login').serialize();
        //var regex = /^\+(?:[0-9] ?){1,4}[0-9]$/;
        
        
//        if($('#continue_login input[name="ountryCode"]').val()==''){
//            $('.signuperror_msg').html('Please enter your country code').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="ountryCode"]').focus();return false;
//        }
//        if (regex.test($('#continue_login input[name="ountryCode"]').val())){
//        }else{
//            $('.signuperror_msg').html('Please enter valid country code with + symbol!').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="ountryCode"]').focus();return false;
//        }
//        if($('#continue_login input[name="mobilenumber"]').val()==''){
//            $('.signuperror_msg').html('Please enter your mobile number').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="mobilenumber"]').focus();return false;
//        }
//        
//        if($('#continue_login input[name="mobilenumber"]').val().length != '10'){
//            $('.signuperror_msg').html('Mobile number should be 10 digits').fadeIn().delay(1000).fadeOut();
//            $('#continue_login input[name="mobilenumber"]').focus();return false;
//        }
        
        $('.signup').attr('disabled','disabled');
        $.ajax({
            url:SITEURL+'users/index/loginfacebook',
            type:'POST',
            data:data,
            dataType:'json',
            beforeSend:function(){
                $('.signup').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...');},
            success:function(result){
                //console.log(result.EmailId);return false;
                if(result.status){
                    $('.signupsuccess_msg').html(result.message);
                    $('#AgencySysId_').val(result.AgencySysId);
                    $('#CustomerSysId').val(result.CustomerSysId);
                    $('#EmailId').val(result.EmailId);
                    $('#FirstName').val(result.FirstName);
                    $('#LastName').val(result.LastName);
                    $('#Password_cu').val(result.Password);
                    $('#auth_login_submit').submit();
                }else{
                    $('.signup').html('Continue');
                    $('.signup').removeAttr('disabled','disabled');
                    $('.signuperror_msg').html(result.message);return false;
                }
            },
            error:function(){
                $('.signup').html('Continue');
                $('.signup').removeAttr('disabled','disabled');
                $('.signuperror_msg').html('Oops unable to connect with server!!')
                //alert('Oops unable to connect with server!!');
            }
        });
    }
$("#select-country").change();
function populateCity(e){
    var city_id = $('#city_id').val();
    var data = e.value;
    if(data !== ''){
        $.ajax({
            url:SITEURL+'users/index/getcitylist',
            type:'POST',
            dataType:'json',
            data: {country:data},
            success:function(result){
                if(result.status){
                    //console.log(result.countryId.cityArr);
                    var html = '<option value="">--Select--</option>';
                    $.each(result.countryId.cityArr, function(key, val) {
                        //console.log(val);
                        if(val.CityId === city_id){
                            html += '<option selected="selected" value="'+val.CityId+'">'+val.Title+'</option>';
                        }else{
                            html += '<option value="'+val.CityId+'">'+val.Title+'</option>';
                        }
                        
                     });
                     $('#select-city').html(html);
                }else{
                    alert(result.message);
                }
            },
            error:function(){
                    alert('Request not completed');
            }
    });
    }
    
}
   $("#search-form").on('submit',function(e){
    if($('#search-form input[name="key"]').val()==''){  
            $('#search-form input[name="key"]').focus();
            $('#search-form input[name="key"]').addClass("error");
            return false;
        }
 });
 
 $('#successMessage').fadeOut(6000);
 $('#errorMessage').fadeOut(6000);