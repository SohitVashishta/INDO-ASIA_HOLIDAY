$(document).ready(function () {
 $('.focusOnPageFunction').click(function() {
  $('#panelTabFocusId').focus();
});
 
    $('.talktous input[name="mobile"]').keypress(function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
    $(".talktous").on('submit', function (e) {
        e.preventDefault();
        var formname = $(this).attr('name');
        var msgError = (formname === 'talktous_footer') ? 'errormsg' : 'msg';
        var data = $(this).serialize();
        var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if ($('.talktous input[name="name"]').val() == '') {
            $('.' + msgError).html('Please enter your name');
            $('.talktous input[name="name"]').focus();
            return false;
        }
        if ($('.talktous input[name="email"]').val() == '') {
            $('.' + msgError).html('Please enter your email id');
            $('.talktous input[name="email"]').focus();
            return false;
        }
        if (!EmailReg.test($('.talktous input[name="email"]').val())) {
            $('.' + msgError).html('Please enter valid email address!!!');
            $('.talktous input[name="email"]').focus();
            return false;
        }
        if ($('.talktous input[name="mobile"]').val() == '') {
            $('.' + msgError).html('Please enter your Mobile');
            $('.talktous input[name="mobile"]').focus();
            return false;
        }
        if (!$.isNumeric($('.talktous input[name="mobile"]').val())) {
            $('.' + msgError).html('Mobile should be numeric!!');
            $('.talktous input[name="mobile"]').focus();
            return false;
        }
        if ($('.talktous input[name="mobile"]').val().length != '10') {
            $('.' + msgError).html('Mobile should be 10 digit?');
            $('.talktous input[name="mobile"]').focus();
            return false;
        }
        if ($('.talktous textarea[name="message"]').val() == '') {
            $('.' + msgError).html('Please enter your query!');
            $('.talktous textarea[name="message"]').focus();
            return false;
        }
        if (($(".talktous input[name='authoriseme']:checked").length) <= 0) {
            $('.' + msgError).html('Please accept and authorize me for contact you?');
            $('.talktous input[name="authoriseme"]').focus();
            return false;
        }
        $('.' + msgError).html('');
        $('.sending').attr('disabled', 'disabled');
        $.ajax({url: SITEURL + 'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...');
            }, success: function (result) {
                if (result.status) {
                    $('.' + msgError).html('Your Query sent successfully.').css({'color': '#5cb85c'});
//                    $('#successmsg').html("<center>Thank you <br>Your enquiry send successfully.<br> we'll be in touch with you shortly.</center>");
                    $('.talktous input, .talktous textarea').val('');
                    $('.talktous input[name="authoriseme"]').attr('checked', false);
                    $('.sending').attr('disabled', false).html('Send');
                    gtag('event', 'conversion', { 'send_to': 'AW-954359114/LvTyCPGLiMQBEMq6iccD', });
                    setTimeout(function () {
                        $('.' + msgError).html('').css({'color': '#ff0000'});
                    }, 5000);
                } else {
                    $('.sending').html('Send').attr('disabled', false);
                    $('.' + msgError).html(result.message)
                }
                
                /* Conversion Tracking Start */
                var google_conversion_id = 846085580;
                var google_conversion_language = "en";
                var google_conversion_format = "3";
                var google_conversion_color = "ffffff";
                var google_conversion_label = "_hYECI7vnnMQzPu4kwM";
                var google_remarketing_only = false;

                $.getScript('//www.googleadservices.com/pagead/conversion.js');

                var image = new Image(1, 1);
                image.src = "//www.googleadservices.com/pagead/conversion/846085580/?label=_hYECI7vnnMQzPu4kwM&amp;guid=ON&amp;script=0";
                /* Conversion Tracking End */
                
                
            }, error: function (result) {
                $('.sending').html('Send').attr('disabled', false);
                alert('Some error occured.');
            }});
    });
    
    
    
    $(".talktousContactBtn").on('click', function (e) {

        e.preventDefault();
        var formname = $(this).attr('name');
        var msgError = 'msg';
        $('.'+ msgError).html('');
        var data = $('.talktousContact').serialize();
        var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if ($('.talktousContact input[name="name"]').val() == '') {
            $('.' + msgError).html('Please enter your name').css({'color':'red'});
            $('.talktousContact input[name="name"]').focus();
            return false;
        }
        if ($('.talktousContact input[name="email"]').val() == '') {
            $('.' + msgError).html('Please enter your email id').css({'color':'red'});
            $('.talktousContact input[name="email"]').focus();
            return false;
        }
        if (!EmailReg.test($('.talktousContact input[name="email"]').val())) {
            $('.' + msgError).html('Please enter valid email address!!!').css({'color':'red'});
            $('.talktousContact input[name="email"]').focus();
            return false;
        }
        
        if ($('.talktousContact textarea[name="message"]').val() == '') {
            $('.' + msgError).html('Please enter your query!').css({'color':'red'});
            $('.talktousContact textarea[name="message"]').focus();
            return false;
        }
          if ($('.talktousContact input[name="captcha"]').val() == '') {
            $('.msg').html('Please enter captcha code!').css('color', 'red').css({'color':'red'});
            $('.talktousContact input[name="captcha"]').focus();
            return false;
        }
       
        $('.' + msgError).html('');
        $('.talktousContactBtn').attr('disabled', 'disabled');
        $.ajax({url: SITEURL + 'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.talktousContactBtn').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...');
            }, success: function (result) {
                if (result.status) {
                    
                    if(result.status =='captcha'){
                          $('.talktousContactBtn').html('Send').attr('disabled', false);
                        $('.'+ msgError).show().html(result.message).css({'color': 'red'}).css({'color':'red'});
                         return false;
                    }else{
                    $('.' + msgError).html('Your Query sent successfully.').css({'color': '#5cb85c'});
//                    $('#successmsg').html("<center>Thank you <br>Your enquiry send successfully.<br> we'll be in touch with you shortly.</center>");
                    $('.talktousContact input, .talktousContact textarea').val('');
                  
                    $('.talktousContactBtn').attr('disabled', false).html('Send');
                    gtag('event', 'conversion', { 'send_to': 'AW-954359114/LvTyCPGLiMQBEMq6iccD', });
                    setTimeout(function () {
                        $('.' + msgError).html('').css({'color': '#ff0000'});
                    }, 8000);
                }
                } else {
                    $('.talktousContactBtn').html('Send').attr('disabled', false);
                    $('.' + msgError).html(result.message)
                } 
            }, error: function (result) {
                $('.talktousContactBtn').html('Send').attr('disabled', false);
                alert('Some error occured.');
            }});
    });
    
    
      $(".blog_detail_query").on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
        var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if ($('.blog_detail_query input[name="name"]').val() == '') {
            $('.errorMsg').html('Please enter your name').css({'color':'red'});
            $('.blog_detail_query input[name="name"]').focus();
            return false;
        }
        if ($('.blog_detail_query input[name="email"]').val() == '') {
            $('.errorMsg').html('Please enter your email id').css({'color':'red'});
            $('.blog_detail_query input[name="email"]').focus();
            return false;
        }
        if (!EmailReg.test($('.blog_detail_query input[name="email"]').val())) {
            $('.errorMsg').html('Please enter valid email address!!!').css({'color':'red'});
            $('.blog_detail_query input[name="email"]').focus();
            return false;
        }
        if ($('.blog_detail_query input[name="mobile"]').val() == '') {
            $('.errorMsg').html('Please enter your Mobile').css({'color':'red'});
            $('.blog_detail_query input[name="mobile"]').focus();
            return false;
        }
        if (!$.isNumeric($('.blog_detail_query input[name="mobile"]').val())) {
            $('.errorMsg').html('Mobile should be numeric!!').css({'color':'red'});
            $('.blog_detail_query input[name="mobile"]').focus();
            return false;
        }
        if ($('.blog_detail_query input[name="mobile"]').val().length != '10') {
            $('.errorMsg').html('Mobile should be 10 digit?').css({'color':'red'});
            $('.blog_detail_query input[name="mobile"]').focus();
            return false;
        }
        
//        if ($('.blog_detail_query textarea[name="message"]').val().trim() == '') {
//            $('.errorMsg').html('Please enter your query!').css({'color':'red'});
//            $('.blog_detail_query textarea[name="message"]').focus();
//            return false;
//        }
        if ($('.blog_detail_query input[name="captcha"]').val().trim() == '') {
            $('.errorMsg').html('Please enter captcha!').css({'color':'red'});
            $('.blog_detail_query input[name="captcha"]').focus();
            return false;
        }

        $('.errorMsg').html('');
        $('.successMsg').html('');
        $('.sendingquery').attr('disabled', 'disabled');
        $.ajax({url: SITEURL + 'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sendingquery').val('Sending...');
            }, success: function (result) {
                if (result.status == true) {
                    $('.successMsg').html(result.message).css({'color': '#5cb85c'});
                    $('.sendingquery').attr('disabled', false).val('Submit');
                    gtag('event', 'conversion', { 'send_to': 'AW-954359114/LvTyCPGLiMQBEMq6iccD', });
                } else {
                    $('.sendingquery').val('Submit').attr('disabled', false);
                    $('.errorMsg' ).html(result.message).css({'color':'red'});
                }  
            }, error: function (result) {
                $('.sendingquery').val('Submit').attr('disabled', false);
                alert('Some error occured.');
            }});
    });
    
  
    
});
$(".talktousCareers").on('submit', function (e) {
        e.preventDefault();
        var formname = $(this).attr('name');
        var data = $(this).serialize();
        var msgError = 'errormsg';
        var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
      
        if ($('.talktousCareers input[name="name"]').val() == '') {
            $('.' + msgError).html('Please enter your name').css({'color':'red'});
            $('.talktousCareers input[name="name"]').focus();
            return false;
        }
        
        if ($('.talktousCareers input[name="mobile"]').val() == '') {
            $('.' + msgError).html('Please enter your Mobile').css({'color':'red'});
            $('.talktousCareers input[name="mobile"]').focus();
            return false;
        }
        if (!$.isNumeric($('.talktousCareers input[name="mobile"]').val())) {
            $('.' + msgError).html('Mobile should be numeric!!').css({'color':'red'});
            $('.talktousCareers input[name="mobile"]').focus();
            return false;
        }
        if ($('.talktousCareers input[name="mobile"]').val().length != '10') {
            $('.' + msgError).html('Mobile should be 10 digit?').css({'color':'red'});
            $('.talktousCareers input[name="mobile"]').focus();
            return false;
        }
        if ($('.talktousCareers input[name="email"]').val() == '') {
            $('.' + msgError).html('Please enter your email id').css({'color':'red'});
            $('.talktousCareers input[name="email"]').focus();
            return false;
        }
        if (!EmailReg.test($('.talktousCareers input[name="email"]').val())) {
            $('.' + msgError).html('Please enter valid email address!!!').css({'color':'red'});
            $('.talktousCareers input[name="email"]').focus();
            return false;
        }
          if ($('.talktousCareers input[name="currentEmployer"]').val() == '') {
             $('.' + msgError).html('Please enter current employer!').css({'color':'red'});
            $('.talktousCareers input[name="currentEmployer"]').focus();
            return false;
        }
          if ($('.talktousCareers input[name="jobtype"]').val() == '') {
             $('.' + msgError).html('Please enter job role!').css({'color':'red'});
            $('.talktousCareers input[name="jobtype"]').focus();
            return false;
        }
          if ($('.talktousCareers input[name="fileCV"]').val() == '') {
             $('.' + msgError).html('Please upload your CV!').css({'color':'red'});
            $('.talktousCareers input[name="fileCV"]').focus();
            return false;
        }
          if ($('.talktousCareers input[name="captchaCareer"]').val() == '') {
             $('.' + msgError).html('Please enter captcha code!').css({'color':'red'});
            $('.talktousCareers input[name="captchaCareer"]').focus();
            return false;
        }
        
       
        $('.' + msgError).html('');
        $('.submitCareerBtn').attr('disabled', true)
        
        $.ajax({
            url: 'cms/index/send-career-detail', 
            type: 'POST', 
            data: data, 
            dataType: 'json', 
            beforeSend: function () {
                $('.submitCareerBtn').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', false);
            }, success: function (result) {
                if (result.status) {
                   
                    if(result.status =='captcha'){
                        $('.submitCareerBtn').html('Submit');
                        $('.'+ msgError).show().html(result.message).css({'color': 'red'});
                         return false;
                    }else{
                        $('.'+ msgError).show().html(result.message).css({'color': 'green'});
                         $('.submitCareerBtn').attr('disabled', true);
                    }
                   
                  $('.submitCareerBtn').html('Submit');
                   
                } else {
                     $('.submitCareerBtn').html('Submit').attr('disabled', false);
                }
             
                
            }, error: function (result) {
               $('.submitCareerBtn').html('Submit').attr('disabled', false);
                alert('Some error occured.');
            }});
    });  
    
      function uploadCVImageFunc(that){

                  var fd = new FormData();
                  var files = $('#fileCV')[0].files[0];

                  fd.append('file1', files);
                  $.ajax({
                      url: 'cms/index/upload-cv-image',
                      type: 'post',
                      data: fd,
                      dataType: 'json',
                      contentType: false,
                      processData: false,
                      success: function (response) {
                          if (response.status == true) {

                          $('#CVFileName').val(response.fileName);
                          }
                          else if(response.status == false){
                          alert(response.msg);return false;    
                          } else {
                              alert('File not uploaded');
                          }
                      }
                  });
              }
              
              function getCaptchaImage(){
                  $.ajax({
                      url: 'cms/index/set-captcha-image',
                      type: 'post',
                      data: '',
                      dataType: 'json',
                      success: function (response) {
                          if (response.status == true) {

                          $('#changeCaptchaImage').html(response.img);
                          }
                          
                      }
                  });
                 
              }
                 function submitPayForm(){

                var formname = $(this).attr('name');
                var data = $('.payForm').serialize();
                var msgError = 'errormsg';
                var EmailReg = new
RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

                if ($('.payForm input[name="FullName"]').val() == '') {
                    $('.' + msgError).html('Please enter your name').css({'color':'red'});
                    $('.payForm input[name="FullName"]').focus();
                    return false;
                }

               if ($('.payForm input[name="Email"]').val() == '') {
                   $('.' + msgError).html('Please enter your email id').css({'color':'red'});
                   $('.payForm input[name="Email"]').focus();
                   return false;
                   }
              if (!EmailReg.test($('.payForm input[name="Email"]').val())) {
                  $('.' + msgError).html('Please enter valid email address!!!');
                  $('.payForm input[name="Email"]').focus();
                  return false;
                   }
             if ($('#Phone').val() == '') {
                 $('.' + msgError).html('Please enter your Mobile').css({'color':'red'});
                 $('.payForm input[name="Phone"]').focus();
                  return false;
                }

             if (!$.isNumeric($('#Phone').val())) {
                  $('.' + msgError).html('Mobile should be numeric!!');
                  $('.payForm input[name="Phone"]').focus();
                  return false;
                  }
             if ($('#Phone').val().length != '10') {
                 $('.' + msgError).html('Mobile should be 10 digit?'.css({'color':'red'}));
                 $('.payForm input[name="Phone"]').focus();
                 return false;
                   }
             if ($('.payForm input[name="InvoiceNumber"]').val() == '') {
                 $('.' + msgError).html('Please enter your InvoiceNumber').css({'color':'red'});
                 $('.payForm input[name="InvoiceNumber"]').focus();
                 return false;
                }
             if ($('.payForm select[name="invCurrency"]').val() == '') {
                 $('.' + msgError).html('Please enter your invoice Currency').css({'color':'red'});
                 $('.payForm select[name="invCurrency"]').focus();
                  return false;
                }
            if ($('.payForm input[name="Amount"]').val() < 50) {
                  $('.' + msgError).html('Amount should be more then 50?').css({'color':'red'});
                  $('.payForm input[name="Amount"]').focus();
                  return false;
              }

             if ($('.payForm input[name="Address"]').val() == '') {
                 $('.' + msgError).html('Please enter valid address').css({'color':'red'});
                 $('.payForm input[name="Address"]').focus();
                 return false;
                   }
             if ($('.payForm input[name="City"]').val() == '') {
                 $('.' + msgError).html('Please enter valid City').css({'color':'red'});
                 $('.payForm input[name="City"]').focus();
                 return false;
                   }
             if ($('.payForm input[name="Pincode"]').val() == '') {
                 $('.' + msgError).html('Please enter valid Pincode').css({'color':'red'});
                 $('.payForm input[name="Pincode"]').focus();
                 return false;
                   }
             if ($('.payForm input[name="Country"]').val() == '') {
                 $('.' + msgError).html('Please select Country').css({'color':'red'});
                 $('.payForm input[name="Country"]').focus();
                 return false;
                   }
              if (($(".payForm input[name='term']:checked").length) <= 0) {
                    $('.' + msgError).html('Please accept term & condition?').css({'color':'red'});
                    $('.payForm input[name="term"]').focus();
                    return false;
                }
               }