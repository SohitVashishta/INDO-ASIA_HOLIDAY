function rvMoneyFormatINR(n, prec, currSign) {
    if (prec == null)
        prec = 2;
    var n = ('' + parseFloat(n).toFixed(prec).toString()).split('.');
    var num = n[0];
    var dec = n[1];
    var r, s, t;
    if (num.length > 3) {
        s = num.length % 3;
        if (s) {
            t = num.substring(0, s);
            num = t + num.substring(s).replace(/(\d{3})/g, ",$1");
        } else {
            num = num.substring(s).replace(/(\d{3})/g, ",$1").substring(1);
        }
    }
//    return(currSign == null ? "" : currSign + "") + num + '.' + dec;
    return(currSign == null ? "" : currSign + "") + num ;
}
function countTotalValues(element_class)
{
    var totalNumber = 0;
    $('.' + element_class).each(function (i, element) {
        totalNumber += parseInt($(this).val());
    });
    return totalNumber;
}
function countTotalTravelers() {
    var totalAdults = countTotalValues('traveler_adult');
    var totalKids = countTotalValues('traveler_child');
    var totalInfant = countTotalValues('traveler_infant');
    return parseInt(totalAdults) + parseInt(totalKids) + parseInt(totalInfant);
}
function test()
{
    alert('');
}
function showLoader(id , type)
{
    var imgname;
    if(type == 'sm') {
        imgname = 'loader-sm';
    } else {
        imgname = 'loader';
    }
    
    $('#overlay').css({'display': 'block'});
    $("#" + id).html('<div align="center"><img src="'+SITEURL+'public/images/'+imgname+'.gif" alt="Loading..." /></div>');
}
function hideLoader(id)
{
    $('#overlay').css({'display': 'none'});
    $("#" + id).html('');
}
/*
function moreless(type, e)
{
    if (type == null) {
        $(e).parent().find('a.limore').toggleClass("hidee");
    }
    else if (type == 'li') {
        $(e).parent().parent().find('li.limore').toggleClass("hidee")
    }
    $(e).html(($(e).text() == '-') ? '+' : '-');
}
*/
function resetfilter() {
    //console.log('reset');
    showLoader('resetloaderspan' , 'sm');
    
    $('.filtercheckbox').each(function(element,v) {

        var isChecked = $(this).is(':checked');
        
        if(isChecked == true) {
            //document.getElementsByClassName('filtercheckbox')[0].click();
            $(this).trigger('click');
        }
    });
    hideLoader('resetloaderspan');
}

function checkTravellers( that , rownumber ) {

    var div = $(that).closest('.room-rows-container');

//    console.log( div );

    var totalpax=0;
    var adults  = div.find('#traveler_adult_'+rownumber).val();
    var kids    = div.find('#traveler_kids_'+rownumber).val();
    var infant  = div.find('#traveler_infant_'+rownumber).val();
    totalpax    = parseInt(adults) + parseInt(kids) + parseInt(infant);

    if( parseInt(totalpax) > 4) {
        alert("Total pax can not be more than 4 in a room. Please modify travellers in room "+rownumber);
        
        if($(that).hasClass('traveler_adult')){
          $(that).val(1); // reset the current value
            div.find('#room-row-adult-bedtype-'+rownumber).hide(); // hide all select box
        }else if($(that).hasClass('traveler_infant')){
            $(that).val(0); // reset the current value    
        }else{
            $(that).val(0); // reset the current value
            div.find('.room-row-child-bedtype-'+rownumber).hide(); // hide all select box  
            div.find('.room-row-child-bedtype-'+ rownumber+ "-1").val('');
            div.find('.room-row-child-bedtype-'+ rownumber+ "-2").val('');
        }
        return false;
    }
    else {
        if(parseInt(adults) == 3) {
            div.find('#room-row-adult-bedtype-'+ rownumber).show();
            div.find('#room-row-adult-bedtype-'+ rownumber+ "-1").val('extrabed');
        } else {
            div.find('#room-row-adult-bedtype-'+ rownumber).hide();
            div.find('#room-row-adult-bedtype-'+ rownumber + "-1").val('');
        }

        div.find('.room-row-child-bedtype-'+rownumber).hide(); // hide all select box
        $('.room-row-child-bedtype-'+ rownumber+ "-1").val('');
        $('.room-row-child-bedtype-'+ rownumber+ "-2").val('');
        if(parseInt(kids) > 0 ) {
            for(var i=1; i<=parseInt(kids); i++) {
               div.find('#room-row-child-bedtype-'+ rownumber + i ).show();
               div.find('.room-row-child-bedtype-'+ rownumber+ "-"+ i).val('extrabed');
            }
        }
    }
    
}

function checkTravellers2( that , rownumber ) {

    var div = $(that).closest('.room-rows-container2');

//    console.log( div );

    var totalpax=0;
    var adults  = div.find('#traveler_adult1_'+rownumber).val();
    var kids    = div.find('#traveler_kids1_'+rownumber).val();
    var infant  = div.find('#traveler_infant1_'+rownumber).val();
    totalpax    = parseInt(adults) + parseInt(kids) + parseInt(infant);

    if( parseInt(totalpax) > 4) {
        alert("Total pax can not be more than 4 in a room. Please modify travellers in room "+rownumber);
        
        if($(that).hasClass('traveler_adult'))
          $(that).val(1); // reset the current value
        else
          $(that).val(0); // reset the current value
            
        return false;
    }
    else {
        if(parseInt(adults) == 3) {
            div.find('#room-row-adult-bedtype1-'+ rownumber).show();
            div.find('#room-row-adult-bedtype1-'+ rownumber + ' select').val('extrabed');
        } else {
            div.find('#room-row-adult-bedtype1-'+ rownumber).hide();
            div.find('#room-row-adult-bedtype1-'+ rownumber + ' select').val('');
        }

        div.find('.room-row-child-bedtype-'+rownumber).hide(); // hide all select box
        if(parseInt(kids) > 0 ) {
            for(var i=1; i<=parseInt(kids); i++) {
              div.find('#room-row-child-bedtype1-'+ rownumber + "-"+ i ).show();
            }
        }
    }
    
}

 
var costThreadJSON = '';
$("document").ready(function() {
setTimeout(function() {
    $(".CustomClick").trigger('click');
},10);
});

$(document).on('click', '.CustomClick', function () {
    var PkgSysId = $(this).attr('data-rv');
    var PackageType = $('#packagetype_' + PkgSysId).val();
    var GTXPkgId = $('#gtxpackage_' + PkgSysId).val();
    var BookingValidUntil = $('#gtxpackagebookingvaliduntil_' + PkgSysId).val();
    var hotelcategoryid = $('#hotelcategoryid_' + PkgSysId).val();
    var packagetpid = $('#packagetpid_' + PkgSysId).val();
    var tourtype = $('#tourtype_' + PkgSysId).val();
    var packagenamemodal = $('#packagename_' + PkgSysId).val();
    var mealplantype = $('#mealplantype_' + PkgSysId).val();
    var packagedesname = $('#packagedesname_' + PkgSysId).val();
    $('.msg').hide().html('');
    $("#leadsend").val('0');
    $('#expandsave_').hide();
    $('#packagesys_id_').val(PkgSysId);
    $('#packagetype_id_').val(PackageType);
    $('#package_sid_').val(GTXPkgId);
    $('#package_hotelcategoryid_').val(hotelcategoryid);
    $('#package_mealplantypeid_').val(mealplantype);
    $('#packagedesname_').val(packagedesname);
    $('#package_tpid_').val(packagetpid);
    $('#package_tourtype_id_').val(tourtype);
    $('#packagenamemodal_').html(packagenamemodal);
    $('#mpackage_name').val(packagenamemodal);
    $('#displaySendEnquiryForm_').show();
    $('.hidebutton_').find('.sending').show().html('Submit').attr('disabled', false);
    $('.package_enquiry_ #displaySendEnquiryThanks_, .package_enquiry_ #tableCost_, .class-modify-enquiry_').hide();
    
    $('.package_enquiry_').find('.en_customerfromdestination_, .from_destination_id, .en_customertripdate_').val('').attr('disabled', false);
    $('.package_enquiry_ .smsg_').html('');
    $('.inserted-room-row_').remove();
    $('.addmore').show();
    $('.package_enquiry_ #traveler_adult_1').val(1);
    $('.package_enquiry_ #traveler_kids_1 , .package_enquiry_ #traveler_infant_1').val(0);
    $('#itinerary_inputs_').val(1);
    $('#itinerary_rooms_').val(2);
    $('.hidebutton').find('.class-modify-enquiry_').hide();
});
$(document).on('click', '.wsend', function () {
    var PkgSysId = $(this).attr('data-rv');
    var PackageType = $('#packagetype_' + PkgSysId).val();
    var GTXPkgId = $('#gtxpackage_' + PkgSysId).val();
    var BookingValidUntil = $('#gtxpackagebookingvaliduntil_' + PkgSysId).val();
    var hotelcategoryid = $('#hotelcategoryid_' + PkgSysId).val();
    var packagetpid = $('#packagetpid_' + PkgSysId).val();
    var tourtype = $('#tourtype_' + PkgSysId).val();
    var packagenamemodal = $('#packagename_' + PkgSysId).val();
    var mealplantype = $('#mealplantype_' + PkgSysId).val();
    var packagedesname = $('#packagedesname_' + PkgSysId).val();
    $('.msg').hide().html('');
    $("#leadsend").val('0');
    $('#expandsave').hide();
    $('#packagesys_id').val(PkgSysId);
    $('#packagetype_id').val(PackageType);
    $('#package_sid').val(GTXPkgId);
    $('#package_hotelcategoryid').val(hotelcategoryid);
    $('#package_mealplantypeid').val(mealplantype);
    $('#package_tpid').val(packagetpid);
    $('#package_tourtype_id').val(tourtype);
    $('#packagenamemodal').html(packagenamemodal);
    $('#mpackage_name').val(packagenamemodal);
    $('#packagedesname').val(packagedesname);
    $('#displaySendEnquiryForm').show();
    $('.hidebutton').find('.sending').show().html('Submit').attr('disabled', false);
    $('.package_enquiry #displaySendEnquiryThanks, .package_enquiry #tableCost, .class-modify-enquiry').hide();
    
    $('.package_enquiry').find('.en_customerfromdestination, .from_destination_id, .en_customertripdate').val('').attr('disabled', false);
    $('.package_enquiry .smsg').html('');
    $('.inserted-room-row').remove();
    $('.addmore').show();
    $('.package_enquiry #traveler_adult_1').val(1);
    $('.package_enquiry #traveler_kids_1 , .package_enquiry #traveler_infant_1').val(0);
    $('#itinerary_inputs').val(1);
    $('#itinerary_rooms').val(2);
    $('.hidebutton').find('.class-modify-enquiry').hide();
});

$(document).on('click', '.HotelsEnquiry', function () {
    var PkgSysId = $(this).attr('data-sa');
    //alert(PkgSysId);
    var XRefAccoSysId = $('#XRefAccoSysId_' + PkgSysId).val();
    var hotelcategory = $('#hotelcategory_' + PkgSysId).val();
    var hotelprice = $('#hotelprice_' + PkgSysId).val();
    $('#XRefAccoSysId_').val(XRefAccoSysId);
    $('#hotelprice_').val(hotelprice);
    $('#hotelcategory_').val(hotelcategory);
    $('#expandsavehotels').hide();
    $("#leadsend_").val('0');
    $('.smsg2').hide();
    $('#displaySendEnquiryFormHotels').show();
    $('.sending2').show();
    $('.sending2').html('Submit').attr('disabled', false);
    $('.hidebutton').find('.sending').show().html('Submit').attr('disabled', false);
    $('.hotel_enquiry #displaySendEnquiryThanks, .hotel_enquiry #tableCost, .class-modify-enquiry').hide();
});

$(document).on('click', '.activitysend', function () {
    var PkgSysId = $(this).attr('data-rv');
    var GTXPkgId = $('#gtxpackage_' + PkgSysId).val();
    var packagetpid = $('#packagetpid_' + PkgSysId).val();
    var packagenamemodal = $('#packagename_' + PkgSysId).val();

    $('.activity_enquiry .msg').hide().html('');
    $("#leadsend_act").val('0');
    $('.activity_enquiry .expandsave').hide();
    $('#packagesys_id_act').val(PkgSysId);
    $('#package_sid_act').val(GTXPkgId);
    $('#package_tpid_act').val(packagetpid);
    $('#packagenamemodal_act').html(packagenamemodal);
    $('#mpackage_name').val(packagenamemodal);

    $('.activity_enquiry #displaySendEnquiryForm_act').show();
    $('.activity_enquiry .hidebutton').find('.sending').show().html('Submit').attr('disabled', false);
    $('.activity_enquiry .displaySendEnquiryThanks, .activity_enquiry .tableCost, .class-modify-enquiry').hide();
    $('.activity_enquiry').find('input , select').attr('disabled', false);
    $('.activity_enquiry').find('.en_customerfromdestination, .from_destination_id, .en_customertripdate').val('').attr('disabled', false);
    $('.activity_enquiry .smsg').html('');
    $('.hidebutton').find('.class-modify-enquiry').hide();
});


$(".activity_enquiry").on('submit', function (e) {
    var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    e.preventDefault();
    var data = $(this).serialize();
    var leadsend = $("#leadsend_act").val();
    
    if ($('.activity_enquiry input[name="email"]').val() == '') {
        $('.msg').show().html('Please enter your email address');
        $('.activity_enquiry input[name="email"]').focus();
        return false;
    }
    if (!EmailReg.test($('.activity_enquiry input[name="email"]').val())) {
        $('.msg').show().html('Please enter valid email address!!!');
        $('.activity_enquiry input[name="email"]').focus();
        return false;
    }
    if ($('.activity_enquiry input[name="mobile"]').val() == '') {
        $('.msg').show().html('Please enter your mobile number');
        $('.activity_enquiry input[name="mobile"]').focus();
        return false;
    }
    if ($('.activity_enquiry input[name="mobile"]').val().length != '10') {
        $('.msg').show().html('Mobile should be 10 digit?');
        $('.activity_enquiry input[name="mobile"]').focus();
        return false;
    }
    if (!$.isNumeric($('.activity_enquiry input[name="mobile"]').val())) {
        $('.msg').show().html('Mobile should be numeric!!');
        $('.activity_enquiry input[name="mobile"]').focus();
        return false;
    }
    if (leadsend == '0') {
        $.ajax({url:'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.activity_enquiry .msg').hide().html('');
                $('.activity_enquiry .sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', 'disabled');
            }, success: function (result) {
                $(".activity_enquiry #leadsend_act").val('1');
                $('.activity_enquiry .sending').html(' Submit').attr('disabled', false);
                $('.activity_enquiry .expandsave').show();
            }, error: function (result) {
                $('.activity_enquiry .smsg').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
            }});
    } else {
        if ($('.activity_enquiry input[name="from_destination"]').val() == '') {
            $('.activity_enquiry .msg').show().html('Please enter traveling from');
            $('.activity_enquiry input[name="from_destination"]').focus();
            return false;
        }
        if ($('.activity_enquiry input[name="date"]').val() == '') {
            $('.activity_enquiry .msg').show().html('Please enter travel date');
            $('.activity_enquiry input[name="date"]').focus();
            return false;
        }
        $('.activity_enquiry .msg').hide().html('');
        $.ajax({url:'gtxwebservices/send-enquiry-activity/post', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.activity_enquiry .sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Getting Cost...').attr('disabled', 'disabled');
            }, success: function (result) {
//                console.log(result);
                if ((result.status == 'success') && (result.availability == true)) {
                    $('.activity_enquiry .smsg').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
                    var priceTax = result.addtional['GSTAmount']; // Tax
                    var sumRoomWise = result.addtional['MyCost']; // TotalPrice
                    var priceGT = result.addtional['AmountWithGST']; // GrandTotal
                    if (priceTax == 0) {
                        $('.activity_enquiry .totalBasicCostTR , .activity_enquiry .totalTaxCostTR').hide();
                        $('.activity_enquiry .GSTI').show().html('GST (Included)');
                    } else {
                        $('.activity_enquiry .totalBasicCostTR , .activity_enquiry .totalTaxCostTR').show();
                        $('.activity_enquiry .GSTI').hide().html('');
                    }
                    var priceTaxFormatted, priceBCFormatted, priceGTFormatted = '';
                    priceTaxFormatted = rvMoneyFormatINR(priceTax, 2, null);
                    priceBCFormatted = rvMoneyFormatINR(sumRoomWise, 2, null);
                    priceGTFormatted = rvMoneyFormatINR((priceGT), 2, null);
                    $('.activity_enquiry .totalBasicCost').html(priceBCFormatted);
                    $('.activity_enquiry .totalTaxCost').html(priceTaxFormatted);
                    $('.activity_enquiry .totalGrandCost').html(priceGTFormatted);
                    $('.activity_enquiry .tableCost').slideDown();
//                    $('.activity_enquiry').find('input , select ').attr('disabled', 'disabled');
                }
                else if ((result.status == 'success') && (result.availability == "false")) {
                    $('.activity_enquiry .smsg').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
//                    $('.activity_enquiry').find('input , select ').attr('disabled', 'disabled');
                    $('.activity_enquiry .sending').hide();
                }
                else if ((result.status == false) && (result.availability == "false")) {
                    $('.activity_enquiry .smsg').show().html('Sorry, This package is not available on selected date.\n\ But we will revert back with suitable suggestions.').css({'color': '#5cb85c'});
//                    $('.activity_enquiry').find('input , select ').attr('disabled', 'disabled');
                    $('.activity_enquiry .sending').hide();
                }
                else {
                    $('.activity_enquiry .smsg').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
                    $('.activity_enquiry .sending').hide();
                }
                
                /* Conversion Tracking Start */
                /* Event snippet for Website Conversions conversion page */

                gtag('event', 'conversion', {'send_to': 'AW-820571186/BnQxCJHEv3sQstijhwM'});

                /* Conversion Tracking End */
                
                $('.activity_enquiry .hidebutton').find('.sending').hide();
            }, error: function (result) {
                $('.activity_enquiry .smsg').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
                $('.activity_enquiry .sending').hide();
            }});
    }
});


$(".package_enquiry").on('submit', function (e) {
    var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    e.preventDefault();
    var data = $(this).serialize();

    var leadsend = $("#leadsend").val();
    
    if ($('.package_enquiry input[name="name"]').val() == '') {
        $('.msg').show().html('Please enter your name');
        $('.package_enquiry input[name="name"]').focus();
        return false;
    }
    if ($('.package_enquiry input[name="email"]').val() == '') {
        $('.msg').show().html('Please enter your email address');
        $('.package_enquiry input[name="email"]').focus();
        return false;
    }
    if (!EmailReg.test($('.package_enquiry input[name="email"]').val())) {
        $('.msg').show().html('Please enter valid email address!!!');
        $('.package_enquiry input[name="email"]').focus();
        return false;
    }
    if ($('.package_enquiry input[name="mobile"]').val() == '') {
        $('.msg').show().html('Please enter your mobile number');
        $('.package_enquiry input[name="mobile"]').focus();
        return false;
    }
    if ($('.package_enquiry input[name="mobile"]').val().length != '10') {
        $('.msg').show().html('Mobile should be 10 digit?');
        $('.package_enquiry input[name="mobile"]').focus();
        return false;
    }
    if (!$.isNumeric($('.package_enquiry input[name="mobile"]').val())) {
        $('.msg').show().html('Mobile should be numeric!!');
        $('.package_enquiry input[name="mobile"]').focus();
        return false;
    }

    if (leadsend == '0') {
        $.ajax({url:'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
            $('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', 'disabled');
        }, success: function (result) {
            $("#leadsend").val('1');
            $('.package_enquiry').find('.msg').html('');
            $('.sending').html('Send Enquiry').attr('disabled', false);
            $('#expandsave').show();
            console.log('before')
            gtag('event', 'conversion', { 'send_to': 'AW-954359114/LvTyCPGLiMQBEMq6iccD', });
             console.log('after')
        }, error: function (result) {
            $('.sending').html('Submit');
            $('.smsg').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
        }});
    } else {
//        if ($('.package_enquiry input[name="from_destination"]').val() == '') {
//            $('.msg').show().html('Please enter traveling from');
//            $('.package_enquiry input[name="from_destination"]').focus();
//            return false;
//        }
        if ($('.package_enquiry input[name="date"]').val() == '') {
            $('.msg').show().html('Please enter travel date');
            $('.package_enquiry input[name="date"]').focus();
            return false;
        }
        $('.msg').hide().html('');
        $.ajax({url:'gtxwebservices/send-enquiry/post', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Getting Cost...').attr('disabled', 'disabled');
            }, success: function (result) {

                if ( (result.status == 'success') && (result.availability == true) ) {
                    $('.package_enquiry .smsg').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
                    var priceTax = result.addtional['GSTAmount']; // Tax
                    var sumRoomWise = result.addtional['MyCost']; // TotalPrice
                    var priceGT = result.addtional['AmountWithGST']; // GrandTotal
                    if (priceTax == 0) {
                        //$('#totalBasicCostTR , #totalTaxCostTR').hide();
                        //$('#GSTI').show().html('GST (Included)');
                    } else {
                        //$('#totalBasicCostTR , #totalTaxCostTR').show();
                        //$('#GSTI').hide().html('');
                    }
                    var priceTaxFormatted, priceBCFormatted, priceGTFormatted = '';
                    priceTaxFormatted = rvMoneyFormatINR(priceTax, 2, null);
                    priceBCFormatted = rvMoneyFormatINR(sumRoomWise, 2, null);
                    priceGTFormatted = rvMoneyFormatINR((priceGT), 2, null);
                    $('#totalBasicCost').html(priceBCFormatted);
                    $('#totalTaxCost').html(priceTaxFormatted);
                    $('#totalGrandCost').html(priceGTFormatted);
                    //$('#tableCost').slideDown();
//                    $('.package_enquiry').find('input , select ').attr('disabled', 'disabled');
//                    $('.addmore').hide();
//                    $('#itinerary_inputs').val(1);
//                    $('#itinerary_rooms').val(2);
                }
                else if ((result.status == 'success') && (result.availability == "false")) {
                    $('.smsg').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
                        $('.sending').html('Send Enquiry');
                }
                else if ((result.status == false) && (result.availability == "false")) {
                    $('.package_enquiry .smsg').show().html('Sorry, This package is not available on selected date.\n\ But we will revert back with suitable suggestions.').css({'color': '#5cb85c'});
                        $('.sending').html('Send Enquiry');
                }
                else {
                    $('.smsg').show().html('Thanks! Your enquiry submitted successfully.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
                        $('.sending').html('Send Enquiry');
                }
                
                $('.hidebutton').find('.sending').hide();
                $('.hidebutton').find('.class-modify-enquiry').show();
                
            }, error: function (result) {
                 $('.sending').html('Send Enquiry');
                $('.smsg').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
            }});
    }
});


$(".package_enquiry_").on('submit', function (e) {
    var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    e.preventDefault();
    var data = $(this).serialize();
	console.log(data);
    var leadsend = $("#leadsend_").val();
    if ($('.package_enquiry_ input[name="name"]').val() == '') {
        $('.msg').show().html('Please enter your name');
        $('.package_enquiry_ input[name="name"]').focus();
        return false;
    }
    if ($('.package_enquiry_ input[name="email"]').val() == '') {
        $('.msg').show().html('Please enter your email address');
        $('.package_enquiry_ input[name="email"]').focus();
        return false;
    }
    //console.log(data);return false;
    if (!EmailReg.test($('.package_enquiry_ input[name="email"]').val())) {
        $('.msg').show().html('Please enter valid email address!!!');
        $('.package_enquiry_ input[name="email"]').focus();
        return false;
    }
    if ($('.package_enquiry_ input[name="mobile"]').val() == '') {
        $('.msg').show().html('Please enter your mobile number');
        $('.package_enquiry_ input[name="mobile"]').focus();
        return false;
    }
    if ($('.package_enquiry_ input[name="mobile"]').val().length != '10') {
        $('.msg').show().html('Mobile should be 10 digit?');
        $('.package_enquiry_ input[name="mobile"]').focus();
        return false;
    }
    if (!$.isNumeric($('.package_enquiry_ input[name="mobile"]').val())) {
        $('.msg').show().html('Mobile should be numeric!!');
        $('.package_enquiry_ input[name="mobile"]').focus();
        return false;
    }
    if (leadsend == '0') {
        $.ajax({url:'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
            $('.sending_').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', 'disabled');
        }, success: function (result) {
            $("#leadsend_").val('1');
            $('.package_enquiry_').find('.msg').html('');
            $('.sending_').html('Send Enquiry').attr('disabled', false);
            $('#expandsave_').show();
        }, error: function (result) {
             $('.sending').html('Submit');
            $('.smsg_').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
        }});
    } else {
//        if ($('.package_enquiry_ input[name="from_destination"]').val() == '') {
//            $('.msg').show().html('Please enter traveling from');
//            $('.package_enquiry_ input[name="from_destination"]').focus();
//            return false;
//        }
        if ($('.package_enquiry_ input[name="date"]').val() == '') {
            $('.msg').show().html('Please enter travel date');
            $('.package_enquiry_ input[name="date"]').focus();
            return false;
        }
        $('.msg').hide().html('');
        $.ajax({url:'gtxwebservices/send-enquiry/post', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sending_').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Getting Cost...').attr('disabled', 'disabled');
            }, success: function (result) {

                if ( (result.status == 'success') && (result.availability == true) ) {
                    $('.package_enquiry_ .smsg_').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
                    var priceTax = result.addtional['GSTAmount']; // Tax
                    var sumRoomWise = result.addtional['MyCost']; // TotalPrice
                    var priceGT = result.addtional['AmountWithGST']; // GrandTotal
//                    if (priceTax == 0) {
//                        $('#totalBasicCostTR_ , #totalTaxCostTR_').hide();
//                        $('#GSTI_').show().html('GST (Included)');
//                    } else {
//                        $('#totalBasicCostTR_ , #totalTaxCostTR_').show();
//                        $('#GSTI_').hide().html('');
//                    }
                    var priceTaxFormatted, priceBCFormatted, priceGTFormatted = '';
                    priceTaxFormatted = rvMoneyFormatINR(priceTax, 2, null);
                    priceBCFormatted = rvMoneyFormatINR(sumRoomWise, 2, null);
                    priceGTFormatted = rvMoneyFormatINR((priceGT), 2, null);
                    $('#totalBasicCost_').html(priceBCFormatted);
                    $('#totalTaxCost_').html(priceTaxFormatted);
                    $('#totalGrandCost_').html(priceGTFormatted);
                    //$('#tableCost_').slideDown();
//                    $('.package_enquiry').find('input , select ').attr('disabled', 'disabled');
//                    $('.addmore').hide();
//                    $('#itinerary_inputs').val(1);
//                    $('#itinerary_rooms').val(2);
                }
                else if ((result.status == 'success') && (result.availability == "false")) {
                     $('.sending').html('Send Enquiry');
                    $('.smsg_').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
//                    $('.package_enquiry').find('input , select ').attr('disabled', 'disabled');
//                    $('.addmore').hide();
//                    $('#itinerary_inputs').val(1);
//                    $('#itinerary_rooms').val(2);
                }
                else if ((result.status == false) && (result.availability == "false")) {
                     $('.sending').html('Send Enquiry');
                    $('.package_enquiry_ .smsg_').show().html('Sorry, This package is not available on selected date.\n\ But we will revert back with suitable suggestions.').css({'color': '#5cb85c'});

                }
                else {
                     $('.sending').html('Send Enquiry');
                    $('.smsg_').show().html('Thanks! Your enquiry submitted successfully.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});

                }
                
                /* Conversion Tracking Start */
                /* Event snippet for Website Conversions conversion page */

                gtag('event', 'conversion', {'send_to': 'AW-820571186/BnQxCJHEv3sQstijhwM'});

                /* Conversion Tracking End */
                
                $('.hidebutton').find('.sending_').hide();
                $('.hidebutton').find('.class-modify-enquiry_').show();
                
            }, error: function (result) {
                $('.sending').html('Send Enquiry');
                $('.smsg_').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
            }});
    }
});

$(".hotel_enquiry").on('submit', function (e) {
    var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    e.preventDefault();
    var data = $(this).serialize();
    //alert('hotel');return false;
    var leadsend = $("#leadsend_").val();
    if ($('.hotel_enquiry input[name="email"]').val() == '') {
        $('.msg').show().html('Please enter your email address');
        $('.hotel_enquiry input[name="email"]').focus();
        return false;
    }
    if (!EmailReg.test($('.hotel_enquiry input[name="email"]').val())) {
        $('.msg').show().html('Please enter valid email address!!!');
        $('.hotel_enquiry input[name="email"]').focus();
        return false;
    }
    if ($('.hotel_enquiry input[name="mobile"]').val() == '') {
        $('.msg').show().html('Please enter your mobile number');
        $('.hotel_enquiry input[name="mobile"]').focus();
        return false;
    }
    if ($('.hotel_enquiry input[name="mobile"]').val().length != '10') {
        $('.msg').show().html('Mobile should be 10 digit?');
        $('.hotel_enquiry input[name="mobile"]').focus();
        return false;
    }
    if (!$.isNumeric($('.hotel_enquiry input[name="mobile"]').val())) {
        $('.msg').show().html('Mobile should be numeric!!');
        $('.hotel_enquiry input[name="mobile"]').focus();
        return false;
    }
    if (leadsend == '0') {
        $.ajax({url:'cms/index/sendenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
            $('.sending2').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', 'disabled');
        }, success: function (result) {
            $("#leadsend_").val('1');
            $('.hotel_enquiry').find('.msg2').html('');
            $('.sending2').html('Submit').attr('disabled', false);
            $('#expandsavehotels').show();
        }, error: function (result) {
            $('.smsg2').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
        }});
    } else {
        if ($('.hotel_enquiry input[name="from_destination"]').val() == '') {
            $('.msg2').show().html('Please enter traveling from');
            $('.hotel_enquiry input[name="from_destination"]').focus();
            return false;
        }
        if ($('.hotel_enquiry input[name="chekInDate"]').val() == '') {
            $('.msg2').show().html('Please enter checkin date');
            $('.hotel_enquiry input[name="chekInDate"]').focus();
            return false;
        }
        $('.msg2').hide().html('');
        $.ajax({url:'gtxwebservices/send-enquiry/posthotel', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sending2').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Please wait...').attr('disabled', 'disabled');
            }, success: function (result) {

                if ( (result.status === 'success') ) {
                    $('.hotel_enquiry .smsg2').show().html("Thanks! Your enquiry submitted successfully. Soon our expert will contact you.").css({'color': '#5cb85c'});
                    
                }
                else {
                    $('.smsg2').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
                     $('.sending2').html('Submit');
                }
                
                /* Conversion Tracking Start */
                /* Event snippet for Website Conversions conversion page */

                gtag('event', 'conversion', {'send_to': 'AW-820571186/BnQxCJHEv3sQstijhwM'});

                /* Conversion Tracking End */
                
                $('.hidebutton').find('.sending2').hide();
                $('.hidebutton').find('.class-modify-enquiry').show();
                
            }, error: function (result) {
                $('.smsg2').show().html('Sorry, System encountered some error.\n\ We will revert back with suitable suggestions.').css({'color': '#ff0000'});
            }});
    }
});

$('.addmore').click(function () {
    var count = 1;
    var room = 2;
    count = parseInt($('#itinerary_inputs').val());
    room = parseInt($('#itinerary_rooms').val());
    CONST_PACKAGE_TRAVELER_MAX_ROOM = parseInt(CONST_PACKAGE_TRAVELER_MAX_ROOM);
    if (room > CONST_PACKAGE_TRAVELER_MAX_ROOM) {
        alert("Can not add more than " + CONST_PACKAGE_TRAVELER_MAX_ROOM + " rooms.");
        return false;
    }
    $('.room-rows-container').append('<div class="col-lg-12 room-row inserted-room-row">' +
            '<div class="row">' + '<div class="table-bordered" style="margin-bottom: 10px;"></div><button type="button" class="pull-right rounded text-danger removeit" aria-hidden="true" title="Remove Room">x</button>'
            + '<div class="col-md-1 form-group frt-mob-pad" >' + '<label ><span class="label-stacked">&nbsp;</span> <span class="plain-select"> Room&nbsp;'
            + room + ' </span></label>'
            + ' <input type="hidden" name="room[]" value="' + room + '" />' + '</div>' + '  <div class="cl"></div>' + '<div class="col-md-2 form-group">'
            + '<label class="Lable">Adults(+12Yrs)</label>'
            + '<select name="adult[]" id="traveler_adult_'+room+'"  class="traveler_adult form-control" onchange="checkTravellers(this ,'+room+');">'
            + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '<option value="3"> 3</option>' + '</select>' + '  </div>' + '<div class="col-md-2 form-group" style="display: none" id="room-row-adult-bedtype-'+room+'"><label class="Lable">Adult Bedtype</label><select name="adult_bed_type[]" class="traveler_child form-control" id="room-row-adult-bedtype-'+room+'-1" onchange="checkAdultBedType(this);"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option></select></div><div class="col-md-2 form-group">' + '<label class="Lable">Kids(2 - 12Yrs)</label>' + '<select name="child[]" class="traveler_child form-control" id="traveler_kids_'+room+'" onchange="checkTravellers(this,'+room+');">' + '<option value="0"> 0</option>' + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '</select>' +' </div>' + '<div class="col-md-2 form-group room-row-child-bedtype-'+room+'" style="display: none" id="room-row-child-bedtype-'+room+'1"><label class="Lable">Child 1 Bedtype</label><select name="child1_bed_type[]" class="traveler_child form-control room-row-child-bedtype-'+room+'-1" id="room-row-child-bedtype-'+room+'-1" onchange="checkAdultBedType(this);"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option><option value="none">None</option></select></div><div class="col-md-2 form-group room-row-child-bedtype-'+room+'" style="display: none" id="room-row-child-bedtype-'+room+'2"><label class="Lable">Child 2 Bedtype</label><select name="child2_bed_type[]" class="traveler_child form-control room-row-child-bedtype-'+room+'-2" id="room-row-child-bedtype-'+room+'-2" onchange="checkAdultBedType(this);"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option><option value="none">None</option></select></div> <div class="col-md-2 form-group">' + '<label class="Lable">Infant(0 - 2Yrs)</label>' + '<select name="infant[]" class="traveler_infant form-control" id="traveler_infant_'+room+'" onchange="checkTravellers(this,'+room+');">' + '<option value="0"> 0</option>' + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '<option value="3"> 3</option>' + '<option value="4"> 4</option>' + '</select>' + '</div>' + '</div>');
    $('#itinerary_inputs').val(parseInt(count) + 1);
    $('#itinerary_rooms').val(parseInt(room) + 1);
});

$('.addmore2').click(function () {
    var count = 1;
    var room = 2;
    count = parseInt($('#itinerary_inputs_').val());
    room = parseInt($('#itinerary_rooms_').val());
    CONST_PACKAGE_TRAVELER_MAX_ROOM = parseInt(CONST_PACKAGE_TRAVELER_MAX_ROOM);
    if (room > CONST_PACKAGE_TRAVELER_MAX_ROOM) {
        alert("Can not add more than " + CONST_PACKAGE_TRAVELER_MAX_ROOM + " rooms.");
        return false;
    }
    $('.room-rows-container2').append('<div class="col-lg-12 room-row inserted-room-row">' + '<div class="row">' + '<div class="col-lg-12 colspan-booking">' + '<div class="table-bordered"></div>' + '<label >Room ' + room + ' </label><button type="button" class="pull-right rounded text-danger removeit2" aria-hidden="true" title="Remove Room">x</button>' + ' <input type="hidden" name="room[]" value="' + room + '" />' + '</div>' + '  <div class="cl"></div>' + '<div class="col-md-2 form-group">' + '<label class="Lable">Adults(+12Yrs)</label>' + '<select name="adult[]" id="traveler_adult1_'+room+'"  class="traveler_adult form-control" onchange="checkTravellers2(this ,'+room+');">' + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '<option value="3"> 3</option>' + '</select>' + '  </div>' + '<div class="col-md-2 form-group" style="display: none" id="room-row-adult-bedtype1-'+room+'"><label class="Lable">Adult Bedtype</label><select name="adult_bed_type[]" class="traveler_child form-control"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option><option value="none">None</option></select></div><div class="col-md-2 form-group">' + '<label class="Lable">Kids(2 - 12Yrs)</label>' + '<select name="child[]" class="traveler_child form-control" id="traveler_kids1_'+room+'" onchange="checkTravellers2(this,'+room+');">' + '<option value="0"> 0</option>' + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '</select>' +' </div>' + '<div class="col-md-2 form-group room-row-child-bedtype-'+room+'" style="display: none" id="room-row-child-bedtype1-'+room+'-1"><label class="Lable">Child 1 Bedtype</label><select name="child1_bed_type[]" class="traveler_child form-control"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option><option value="none">None</option></select></div><div class="col-md-2 form-group room-row-child-bedtype-'+room+'" style="display: none" id="room-row-child-bedtype1-'+room+'-2"><label class="Lable">Child 2 Bedtype</label><select name="child2_bed_type[]" class="traveler_child form-control"><option value="">Select</option><option value="withoutbed">Without Bed</option><option value="extrabed">With Bed</option><option value="none">None</option></select></div> <div class="col-md-2 form-group">' + '<label class="Lable">Infant(0 - 2Yrs)</label>' + '<select name="infant[]" class="traveler_infant form-control" id="traveler_infant1_'+room+'" onchange="checkTravellers2(this,'+room+');">' + '<option value="0"> 0</option>' + '<option value="1"> 1</option>' + '<option value="2"> 2</option>' + '<option value="3"> 3</option>' + '<option value="4"> 4</option>' + '</select>' + '</div>' + '</div>');
    $('#itinerary_inputs_').val(parseInt(count) + 1);
    $('#itinerary_rooms_').val(parseInt(room) + 1);
});

$(document).on('click', '.removeit', function () {
    var count = $('#itinerary_inputs').val();
    var rooms = $('#itinerary_rooms').val();
    if (count == 1) {
        return false;
    }
    $('#itinerary_inputs').val(parseInt(count) - 1);
    $('#itinerary_rooms').val(parseInt(rooms) - 1);
    $('.room-rows-container').find('.inserted-room-row:last').remove();
});

$(document).on('click', '.removeit2', function () {
    var count = $('#itinerary_inputs_').val();
    var rooms = $('#itinerary_rooms_').val();
    if (count == 1) {
        return false;
    }
    $('#itinerary_inputs_').val(parseInt(count) - 1);
    $('#itinerary_rooms_').val(parseInt(rooms) - 1);
    $('.room-rows-container2').find('.inserted-room-row:last').remove();
});

$(".datepicker").datepicker({minDate: 0, dateFormat: 'dd/mm/yy'});

setTimeout(function () {
    //SITEURL + 'public/data/static/destinations.json'
$.getJSON('Home', function (destinations) {
    $(".destinations").autocomplete({source: destinations, minLength: 3, autoFocus: true, focus: function (event, ui) {
            event.preventDefault();
            console.log('type');
        }, select: function (event, ui) {
            this.value = ui.item.label;
            var v = ui.item.value;
            console.log(ui.item);
            $('#from_destination_id , #from_destination_id_act').val(v);
            return false;
        }});
});
 }, 10000);
$('.ui-autocomplete').keypress(function (event) {
});

function enquirenow()
{
    alert('enquire now wip...');
}
function changeTab(ths, tabname)
{
    var $id = $(ths).attr('data-id');
    $('.popup_' + $id + ' ul.demo li a').removeClass('active');
    $('.popup_' + $id + ' ul.demo li section').hide();
    $(ths).addClass('active');
    $(ths).next().show();
}
function show_content(index) {
    $('.tabs .content.visible').removeClass('visible');
    $('.tabs .content:nth-of-type(' + (index + 1) + ')').addClass('visible');
    $('.tabs nav a.selected').removeClass('selected');
    $('.tabs nav a:nth-of-type(' + (index + 1) + ')').addClass('selected');
}

function openHotelModal(ev) {
    var PkgSysId = $(ev).attr('data-pkgid');
    var hotelId = $(ev).attr('data-hotelid');
    var gtxID = $('#gtxpackage_' + PkgSysId).val();
    var type = 'H';
    var categoryId = $('#hotelcategoryid_' + PkgSysId).val();
    var packageId = PkgSysId;
    $.ajax({type: "POST", url:"tours/index/get-hotel-detail", async: true, data: "type=" + type + "&hotelId=" + hotelId + "&categoryId=" + categoryId + "&packageId=" + packageId + "&gtxID=" + gtxID, beforeSend: function () {
        $("#myModa1hotelview").modal('show');
        $('#hotelDetailViewList').html('<div align="center" style="margin-top:50px;"><img class="loaderimg"  id="loaderimg" src="~/public/images/ajax-loader.gif"/></div>');
    }, success: function (data) {
        $("#hotelDetailViewList").html(data);
    }});
}

function change_mealplan_listing(that ) {
    var PkgSysId = $(that).attr('data-pkgid');
    var mp = that.value;
    $('#mealplantype_'+ PkgSysId).val(mp);
}

$(window).scroll(function() {
    
    if( $(document).height() < $(window).scrollTop()+ $(window).height() +400 ) {
//        console.log($(window).height());
    $('#loadmorepaging').html('<img src="~/public/images/loader.gif" />');
    $('#loadmorepaging').trigger('click');
    }
});


function checkAdultBedType(that){
    if($(that).val() == ''){
        alert('Please select bed type');
        $(that).val('extrabed');
        return false;
    }
}
function setPackageCategorySession(that){
   
    var PkgSysId = $(that).attr('pkgsysid');
    var catid = $('#hotelcategoryid_' + PkgSysId).val();
    setPackageCategorySessionFunction(PkgSysId,catid);
}

$('.categoryCheckbox').on('ifChecked',function(e){
    var type = 1;
    if($('#tab2').is(":checked")){type = 2;}
    else if($('#tab3').is(":checked")){type = 3;}
    else if($('#tab4').is(":checked")){type = 4;}
    
    var countryname = $(this).attr('countryname');
    var name = $(this).attr('newurl');
    var TPId = $(this).attr('dataTpId');
    var PkgSysId = $(this).attr('PkgSysId');
    var catid = $(this).val();
    var TpSysId = $(this).attr('dataTpId');
        
    $.ajax({
            url: 'detail/index/index-ajax-data',
            type: 'POST',
            data: {countryname: countryname,name: name},
            dataType: 'html',
            beforeSend: function () {
                //            alert("hello");
            },
            success: function (result) {
                
                var getPrice = $("#getPrice" + TPId).val();
                $("#displayPrice").html(getPrice);
                $('#packagetpid_' + PkgSysId).val(TpSysId);
                $('#package_tpid_').val(TpSysId);
                $('#changeContentByajax').html('');
                $('#changeContentByajax').html(result);
               
                setPackageCategorySessionFunction(PkgSysId,catid);
                $('#tab'+parseInt(type)).attr('checked',true);
                return false;
            },
            error: function () {
                alert('Oops unable to connect with server!!');
                return false;
            }
        });
    
    
})
    
   function setPackageCategorySessionFunction(PkgSysId,catid){
   
    $.ajax({
            url: 'cms/index/set-session-for-category',
            type: 'POST',
            data: {catid: catid,PkgSysId: PkgSysId},
            dataType: 'html',
            beforeSend: function () {
                //            alert("hello");
            },
            success: function (result) {
                return true;
            },
            error: function () {
                alert('Oops unable to connect with server!!');
                return false;
            }
        });
}
    
   


    
   