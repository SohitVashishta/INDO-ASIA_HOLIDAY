$('.addmoredes').click(function () {
    var count = 1;
    var des = 2;
    count = parseInt($('#itinerary_inputs').val());
    des = parseInt($('#itinerary_des').val());

    var itinerary_destination = 2;
    itinerary_destination = parseInt($('#itinerary_destination').val());
    CONST_PACKAGE_TRAVELER_MAX_ROOM = parseInt(CONST_PACKAGE_TRAVELER_MAX_ROOM);
    if (itinerary_destination > CONST_PACKAGE_TRAVELER_MAX_ROOM) {
        alert("Can not add more than " + CONST_PACKAGE_TRAVELER_MAX_ROOM + " destination.");
        return false;
    }
    $('.destination-rows-container').append('<div class="inserted-destination-row' + des + '"><div class="sightseeing-count2 ">' + '<div class="col-lg-10">' + '<div class="right-Cont-step1">' +
            '<h4> <strong>Next Destination Going with  : </strong> <span class="genderBox"><span class="maleIcon nextdes' + count + '" >Flight</span>    <span class="maleIcon nextdes' + count + '">Train</span> <span class="maleIcon nextdes' + count + '">Bus</span> <span class="maleIcon nextdes' + count + '">Car</span> <span class="maleIcon nextdes' + count + '">Cruise</span></span></h4>' +
            '<input type="hidden" class="form-control mr-sm-2 next_des' + count + '" name="next_des[]" value="" index="' + count + '">' +
            '</div>' + '</div> <div class="col-md-2">' +
            ' <button type="button" class="pull-right rounded text-danger removeit3" aria-hidden="true" title="Remove Room" onclick="removeit3(' + des + ')">x</button>' +
            ' </div>' + '<div class="cl"></div>' + '</div>' +
            '<div class="sightseeing-count">' + '<div class="col-lg-4">' + '<label>Destination <span class="Destination_count' + des + '">' + itinerary_destination + '<span></label>' +
            '<input name="destination[]" class="form-control mr-sm-2 destinationBoxTmx" id="destinationBoxTmx' + des + '" index="' + des + '" placeholder="To Destination " type="text">' +
            '<input type="hidden" class="form-control mr-sm-2 cityid' + des + '" name="destination_id[]" value="" >' +
            '</div>' + '<div class="col-lg-4">' +
            '<label>Nights</label>' + '<input class="form-control mr-sm-2" name="nights[]" placeholder="Nights" type="text">' + '</div>' +
            '<div class="cl"></div>' + '<div class="col-lg-12">' +
            '<div id="showAct' + des + '"></div> <div id="showShight' + des + '"></div> </div>' + '<div class="cl"></div>' + '<div class="col-lg-12"><div class="right-Cont-step1"><h5> <strong>Hotel Preference  : </strong><span class="genderBox">' +
            '<span class="maleIcon nexthotel' + des + '">3 Star</span><span class="maleIcon nexthotel' + des + '">4 Star</span>' +
            '<span class="maleIcon nexthotel' + des + '">5 Star</span></span></h5></div></div><input type="hidden" class="form-control mr-sm-2 next_hotel' + des + '" name="next_hotel[]" value="" index="' + des + '"><div class="cl"></div></div></div>');

//    $('.destination_image_div').append('<div class="destination_image_remove"><div class="col-md-12">&nbsp;</div><div class="destination_image_' + des + '"></div></div>');
    $('.nextdes' + count).click(function () {
        $(this).toggleClass('maleIconActive');
        $(this).toggleClass('nextdesActive' + count);
        var val = [];
        $('.nextdesActive' + count).each(function (i) {
            val[i] = $(this).html();
        });
        $(".next_des" + count).val(val);
    });
    $('.nexthotel' + des).click(function () {
        $(this).toggleClass('maleIconActive');
        $(this).toggleClass('nexthotelActive' + des);
        var val = [];
        $('.nexthotelActive' + des).each(function (i) {
            val[i] = $(this).html();
        });
        $(".next_hotel" + des).val(val);
    });

    $('#itinerary_inputs').val(parseInt(count) + 1);
    $('#itinerary_des').val(parseInt(des) + 1);
    $('#itinerary_destination').val(parseInt(itinerary_destination) + 1);
    $('#total_des').val(des);
});


$('.nexthotel1').click(function () {

    $(this).toggleClass('maleIconActive');
    $(this).toggleClass('nexthotelActive1');
    var val = [];
    $('.nexthotelActive1').each(function (i) {
        val[i] = $(this).html();
    });
    $(".next_hotel1").val(val);
});

function addMoreRoom() {
    var count = 1;
    var room = 2;
    count = parseInt($('#itinerary_inputs').val());
    room = parseInt($('#itinerary_rooms').val());
    CONST_PACKAGE_TRAVELER_MAX_ROOM = parseInt(CONST_PACKAGE_TRAVELER_MAX_ROOM);
    if (room > CONST_PACKAGE_TRAVELER_MAX_ROOM) {
        alert("Can not add more than " + CONST_PACKAGE_TRAVELER_MAX_ROOM + " room.");
        return false;
    }
    $('.add_remove_add_room').html('');
    $('.tmxroom-rows-container').append('<div class="col-md-12 no-padding room-row inserted-room-row"><div class="col-md-7">' + '<div class="cl"></div>' + '<div class="room-1">' +
            '<h1>Room ' + room + ': </h1><div class="col-md-4">' +
            ' <label><strong>Adults </strong><span>(Above 12 years)</span></label>' +
            '<div class="count-input space-bottom"> <a class="incr-btn" id="adult' + room + '" data-action="decrease_adult" href="#">–</a>' +
            '<input class="quantity" type="text" name="adult[]" value="1" index="' + room + '" readonly/>' +
            '<a class="incr-btn" data-action="increase_adult" id="adult' + room + '" href="javascript:void(0);">&plus;</a> </div>' +
            '<div class="cl">&nbsp;</div></div>' +
            '<div class="col-md-4">' +
            '<label><strong>Children</strong> <span>(Below 12 years)</span></label>' +
            '<div class="count-input space-bottom"> <a class="incr-btn" id="adult' + room + '" data-action="decrease_child" href="#">–</a>' +
            ' <input class="quantity" type="text" name="child[]" value="0" index="' + room + '" readonly/>' +
            '<a class="incr-btn" data-action="increase_child" id="adult' + room + '" href="javascript:void(0);">&plus;</a> </div>' +
            ' <div class="cl">&nbsp;</div> </div>' +
            '<div class="col-md-4">' +
            '<label><strong>Infant</strong> <span>(Below 3  years)</span></label>' +
            '<div class="count-input space-bottom"> <a class="incr-btn" id="adult' + room + '" data-action="decrease_infant" href="#">–</a>' +
            '<input class="quantity" type="text" name="infant[]" value="0" index="' + room + '" readonly/>' +
            '<a class="incr-btn" data-action="increase_infant" id="adult' + room + '" href="javascript:void(0);">&plus;</a> </div>' +
            ' <div class="cl">&nbsp;</div></div></div> </div><div class="col-md-2">' +
            '<div class="add-margin"></div>' +
            '<a href="javascript:void(0);" class=" btn btn-group-sm btn-outline btt-btn removeit4" aria-hidden="true" title="Remove Room">Remove room</a>' +
            '</div><div class="col-md-2 add_remove_add_room" id="add_remove_add_room' + room + '"><div class="add-margin"></div><a href="javascript:void(0);" class=" btn btn-group-sm btn-outline addmoreroom btt-btn " onclick="addMoreRoom()">Add room</a></div></div>');

    $('#itinerary_inputs').val(parseInt(count) + 1);
    $('#itinerary_rooms').val(parseInt(room) + 1);
    $('#total_rooms').val(room);

}

function removeit3(id) {

    var count = $('#itinerary_inputs').val();
    var rooms = $('#itinerary_des').val();
    var total_des = $('#total_des').val();
    var itinerary_destination = $('#itinerary_destination').val();
    if (count == 1) {
        return false;
    }
//    $('#itinerary_inputs').val(parseInt(count) - 1);
//    $('#itinerary_des').val(parseInt(rooms) - 1);
//    $('#total_des').val(parseInt(total_des) - 1);
    $('#itinerary_destination').val(parseInt(itinerary_destination) - 1);
    $('.destination-rows-container').find('.inserted-destination-row' + id).remove();
//      $('.destination_image_div').find('.destination_image_remove:last').remove();
    $("span[class^='Destination_count']").each(function (i) {
        $(this).html((parseInt(i) + 2));
    });
}

$(document).on('click', '.removeit4', function () {
    var count = $('#itinerary_inputs').val();
    var rooms = $('#itinerary_rooms').val();
    var total_rooms = $('#total_rooms').val();
    if (count == 1) {
        return false;
    }
    $('#itinerary_inputs').val(parseInt(count) - 1);
    $('#itinerary_rooms').val(parseInt(rooms) - 1);
    $('#total_rooms').val(parseInt(total_rooms) - 1);
    $('.tmxroom-rows-container').find('.inserted-room-row:last').remove();
    $('.add_remove_add_room').html('');
//    alert(total_rooms);
    $('#add_remove_add_room' + (parseInt(total_rooms) - 1)).html('<div class="add-margin"></div><a href="javascript:void(0);" class=" btn btn-group-sm btn-outline addmoreroom btt-btn " onclick="addMoreRoom()">Add room</a>');
});

$(document).on('keyup', '.destinationBoxTmx', function () {
    var index = $(this).attr('index');
    $.getJSON('public/data/dynamic/package_destinations.json', function (destinations) {
        $(".destinationBoxTmx").autocomplete({
            source: destinations,
            minLength: 2,
            autoFocus: true,
            select: function (event, ui) {
                var cityid = ui.item.id;
//                console.log(ui.item);
                if(ui.item.TypeTitle !== 'Country'){
                    $.getJSON("tmx/index/get-sightseeing?cityid=" + cityid + "", function (data) {
                         var html1 = '';
                         if(data.Sigharray){
                            html1 = '<label>  Select Sightseeing  </label> ';
                         }
                        var html2 = '';
                        var html3 = '';
    //                    console.log(data);
                        $.each(data.Sigharray, function (i, val) {
                            html2 += '<div class="box-activities">' +
                                    '   <span class="genderBox">  <span data="' + val.SSSysId + '" dataname="' + val.Title + '" class="check-signtseeing check-signt' + i + index + '"></span></span> ' +
                                    '   <a href="#" data-target="#myModa1sighview' + i + index +'" data-toggle="modal"> <span class="act' + i + index + '">' + val.Title + ' </span></a>' +
                                    '</div>  ' +
                                    ' <div class="modal fade" id="myModa1sighview' + i + index +'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                    '<div class="modal-dialog modal-lg">' +
                                    '<div class="modal-content">' +
                                    '<button type="button" class="close pull-right" data-dismiss="modal" aria-hidden="true">×</button>' +
                                    '<div class="modal-body">' +
                                    '<div class="panel-body" >' +
                                    '<div class="col-md-12 mob-pad col-sm-12 package_det_hotel">' +
                                    ' <div class="col-md-8 no-padding">' +
                                    ' <h3 class="no-margin">' + val.Title + '</h3>' +
                                    ' <p>&nbsp;</p>' +
                                    ' <p>' + val.WriteUp + '</p>' +
                                    '</div>' +
                                    '<div class="col-md-4"><img src="' + val.DetailImg + '" class="img-responsive"></div>' +
                                    ' </div>' +
                                    '<p></p>' +
                                    '<div> </div>' +
                                    '</div>' +
                                    '<div class="clear"></div>' +
                                    ' </div></div></div></div>';
    //                        console.log(val);


                            $(document).on('click', '.check-signt' + i + index, function (e) {
    //                              $('.check-signt'+ i + index).click(function() {
                                $(this).toggleClass('check-signtseeing-Active');
                                $(this).toggleClass('check-signtseeing' + index);
    //                            $('.act' + i + index).toggleClass('check-signt-Active' + index);
                                var val3 = [];
                                var val4 = [];
                                $('.check-signtseeing' + index).each(function (i) {
                                    val3[i] = $(this).attr('data');
                                    val4[i] = $(this).attr('dataname');
                                });
                                $(".selected_Sight" + index).val(val3);
                                $(".selected_Sightname" + index).val(val4);
    //                            console.log(val1);
                            });
                        });
                        html3 = '<input type="hidden" class="form-control mr-sm-2 selected_Sight' + index + '" name="selected_Sight[]" value="" index="' + index + '"><input type="hidden" class="form-control mr-sm-2 selected_Sightname' + index + '" name="selected_Sightname[]" value="" index="' + index + '">';
                        $('#showShight' + index).html(html1 + html2 + html3);
                    });
                }
                $("#destinationBoxTmx" + index).val('');
                $(".cityid" + index).val(cityid);
//                getDestinationImage(ui.item.value,index);
            }

        });
    });
});


//$(document).on('keyup', '.destinationBoxTmxFrom', function() {
//console.log('hereeeee');
//    var index = $(this).attr('index');
//    $.getJSON('tmx/index/get-citydata', function(destinations) {
//        console.log(destinations);
//        $(".destinationBoxTmxFrom").autocomplete({
//            source: destinations,
//            minLength: 2,
//            select: function(event, ui) {
//                var cityid = ui.item.id;
//                console.log(ui.item.value);
//
//                $("#destinationBoxTmx" + index).val('');
//                $(".cityid" + index).val(cityid);
//            }
//        });
//    });
//});

$("#selectDestination").autocomplete({
    source: function (request, response) {
        var query = $("#selectDestination").val();
        var countryId = '';
        $.getJSON("tmx/index/get-citydata", {query: query, countryId: countryId},
        response);
    },
    minLength: 2,
    autoFocus: true,
    select: function (event, ui) {
        var CityId = ui.item.CityId;
        var CityName = ui.item.CityName;
        $("#hidden_selected_hotel_cityid").val(CityId);
        $("#hidden_selected_city_name").val(CityName);
    }
});

//function get_hotelcity_autosuggest(inputId, hiddenInputId, countryInputId, hiddenselectedcityname) {
//
//                $('#' + inputId).typeahead({
//                    items: 'all',
//                    source: function (query, process) {
//                        $('#' + hiddenInputId).val('');
//                        var countryId = (countryInputId) ? $("#" + countryInputId).val() : '';
//                        return $.ajax({
//                            //url: '/general/suggest-city',
//                            url: 'tmx/index/get-citydata',
//                            type: 'post',
//                            async: true,
//                            data: {query: query, countryId: countryId},
//                            dataType: 'json',
//                            success: function (result) {
//                                console.log(result);
//                                var resultList = result.map(function (item) {
//                                    var aItem = {CityId: item.CityId, label: item.label, CityName: item.CityName, ContId: item.ContId};
//                                    return JSON.stringify(aItem);
//                                });
//                                return process(resultList);
//                            }
//                        });
//                    },
//                    sorter: function (items) {
//                        var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
//                        while (aItem = items.shift()) {
//                            var item = JSON.parse(aItem);
//                            if (!item.label.toLowerCase().indexOf(this.query.toLowerCase()))
//                                beginswith.push(JSON.stringify(item));
//                            else if (~item.label.indexOf(this.query))
//                                caseSensitive.push(JSON.stringify(item));
//                            else
//                                caseInsensitive.push(JSON.stringify(item));
//                        }
//                        return beginswith.concat(caseSensitive, caseInsensitive)
//                    },
//                    highlighter: function (obj) {
//                        var item = JSON.parse(obj);
//                        var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
//                        return item.label.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
//                            return '<strong>' + match + '</strong>'
//                        })
//                    },
//                    updater: function (item) {
//                        var item = JSON.parse(item);
//                        $('#' + hiddenInputId).val(item.CityId);
//                        $('#' + hiddenselectedcityname).val(item.CityName);
//                        //            $('#hidden_selected_hotel_id').val(item.TBBCityId);
//                        //			$('#'+hiddencountryInputId).val(item.ContId);
//                        return item.label;
//                    },
//                    minLength: 2,
//                    //        displayField: 'Title',
//                }).focus();
//            }


$(document).on('click', '.incr-btn', function (e) {

    var $button = $(this);
    var oldValue = $button.parent().find('.quantity').val();

//    $button.parent().find('.incr-btn[data-action="decrease"]').removeClass('inactive');
    if ($button.data('action') == "increase_adult") {
        if (oldValue < CONST_PACKAGE_TRAVELER_MAX_ADULT_IN_ROOM) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            return false;
        }
    } else if ($button.data('action') == "increase_child") {
        if (oldValue < CONST_PACKAGE_TRAVELER_MAX_CHILD_IN_ROOM) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            return false;
        }
    }

    else if ($button.data('action') == "increase_infant") {
        if (oldValue < CONST_PACKAGE_TRAVELER_MAX_INFANT_IN_ROOM) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            return false;
        }
    } else if ($button.data('action') == "decrease_adult") {
        if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 1;
            $button.addClass('inactive');
        }
    } else if ($button.data('action') == "decrease_child") {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
            $button.addClass('inactive');
        }
    } else if ($button.data('action') == "decrease_infant") {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
            $button.addClass('inactive');
        }
    }
//    else {
//        // Don't allow decrementing below 1
//        if (oldValue > 0) {
//            var newVal = parseFloat(oldValue) - 1;
//        } else {
//            newVal = 0;
//            $button.addClass('inactive');
//        }
//    }
    $button.parent().find('.quantity').val(newVal);
    e.preventDefault();
});

$(document).on('click', '.femaleIcon', function (e) {
    //$(".maleIcon").removeClass('maleIconActive');
    //$(".femaleIcon").toggleClass('femaleIconActive');
});

//  $(document).on('click', '.check-signtseeing', function (e) {
//    $(this).toggleClass('check-signtseeing-Active');
// });

$(".tmx_enquiry").on('submit', function (e) {
//     var EmailReg = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);
    var number = new RegExp(/^[0-9]+$/);

    if ($('.tmx_enquiry input[name="from_destination_id"]').val() == '') {
        $('.msg').show().html('Please enter traveling from');
        $('.tmx_enquiry input[name="from_destination"]').focus();
        return false;
    }
    if ($('.tmx_enquiry input[name="depart_date"]').val() == '') {
        $('.msg').show().html('Please enter travel date');
        $('.tmx_enquiry input[name="depart_date"]').focus();
        return false;
    }

    var destination = $('.tmx_enquiry input[name="destination[]"]');
    for (i = 0; i < destination.length; i++) {
        if (destination[i].value === "") {
            $('.msg').show().html('Please enter destination');
            // alert('Please enter destination');
            destination[i].focus();
            return false;
        }
    }
    var nights = $('.tmx_enquiry input[name="nights[]"]');
    for (i = 0; i < nights.length; i++) {
        if (nights[i].value === '') {
            $('.msg').show().html('Please enter nights');
            nights[i].focus();
            return false;
        }
        if (!number.test(nights[i].value)) {
            $('.msg').show().html('Please enter numbers only');
            nights[i].focus();
            return false;
        }
    }

//    var isChecked = $('.icheck-black').is(':checked');
//    if (isChecked == false) {
//        $('.msg').show().html('Please checked airfares');
//        $('.icheck-black').focus();
//        return false;
//    }

    if ($('#customer_name').val() == '') {
        $('#myModa1TMX').modal('show');
        return false;
    } else {
        $('.msg').hide().html('');

        var data = $("#tmx_enquiry").serialize();
//    console.log(data);
        $.ajax({url: SITEURL + 'tmx/index/tmxenquiry', type: 'POST', data: data, dataType: 'json', beforeSend: function () {
                $('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i>Sending');
//            $('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i>Sending').attr('disabled', 'disabled');
            }, success: function (result) {

                if (result.status === true) {
                    $('#tmxSuccess').html('Your Query sent successfully.One of our executive will contact you soon.').css({'color': 'green', 'font-size': '16px'}).fadeOut(10000);
                    $('.sending').html('Submit');
                    setTimeout(function(){
                    location.reload(); 
                    }, 2500); 
                } else {
                    $('#tmxSuccess').html('Some error occurred, unable to send query.').css({'color': 'red'});
                    $('.sending').html('Submit');
                }
            }

        })
    }
});


$('.tmx_enquiry_custinfo_btn').click(function () {
    var EmailReg = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    var cust_name = $('#cust_name').val();
    var cust_email = $('#cust_email').val();
    var cust_mobile = $('#cust_mobile').val();
    if (cust_name == '') {
        $('.cust_msg').html('Plese enter name');
        $('#cust_name').focus();
        return false;
    } else if (cust_email == '') {
        $('.cust_msg').html('Plese enter email id');
        $('#cust_email').focus();
        return false;
    }else if (!EmailReg.test(cust_email)) {
        $('.cust_msg').html('Plese enter valid email id');
        $('#cust_email').focus();
        return false;
    } else if (cust_mobile == '') {
        $('.cust_msg').html('Plese enter mobile number');
        $('#cust_mobile').focus();
        return false;
    } else if (cust_mobile.length != '10') {
        $('.cust_msg').html('Mobile number should be 10 digit?');
        $('#cust_mobile').focus();
        return false;
    } else if (!$.isNumeric(cust_mobile)) {
        $('.cust_msg').html('Mobile number should be numeric!!');
        $('#cust_mobile').focus();
        return false;
    } else {
        $('#customer_name').val(cust_name);
        $('#customer_email').val(cust_email);
        $('#customer_phone').val(cust_mobile);
        $('#myModa1TMX').modal('hide');
        $(".submitTmxEnquiry").click();
    }


});

function getDestinationImage(dest, id) {


    $.ajax({url: SITEURL + 'tmx/index/get-destination-image',
        type: 'POST',
        data: {destination: dest},
        dataType: 'json',
        beforeSend: function () {
            //$('.sending').html('<i class="ace-icon fa fa-spinner fa-spin orange bigger-125"></i> Sending...').attr('disabled', 'disabled');
        }, success: function (result) {
            console.log(result.data.Image);
            if (result.data.Image != '') {
                $('.destination_image_' + id).html('<img src="public/upload/destinations/' + result.data.DesSysId + '/images/medium/' + result.data.Image + '" alt="" title="" height="160px;">');

            } else {
                $('.destination_image_' + id).html('<img src="public/img/not-available.jpg" alt="" title="" height="160px;">');
            }
        }

    })


}




