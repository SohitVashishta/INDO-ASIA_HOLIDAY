/**
 * Create by Ranvir singh 03 Aug 2017
 * Updated on 23 Aug 2017
 */

// params : element class | returns : total sum of values
function countTotalValuesOfSelected( element_class )
{
    var totalNumber = 0;
    
    $('.'+element_class).each( function(i, element){
        if(this.checked == true) {
            totalNumber += parseInt($(this).val());
        }
    });

    return totalNumber;
}

function redirect_to_newurl()
{
    var currenturl , hotelcategory , packagetourtype , newurl , url , base_url , host , urlparams , mealplantype;
    
    currenturl = $('body').find('#change_category_form #currenturl').val();
    packagetourtype = $('body').find('#change_category_form #packagetourtype').val();
    hotelcategory = $('body').find('#change_category_form #hotelcategory').val();
    mealplantype = $('body').find('#change_category_form #mptype_pop').val();
    
    
    base_url= (window.location.origin);
    host    = (window.location.host);
    urlparams   = (window.location.pathname);

    url = urlparams.split('/');

    var countryname = url[url.length-2];
    
    var getallidstr = (url[url.length-1]).slice(0, -5);


    var getallidstrArry = getallidstr.split('-');

    var packagename = getallidstrArry[0];
    var destname = getallidstrArry[1];
    var pkgid = getallidstrArry[(getallidstrArry.length-5)];
//    var catid = getallidstrArry[2];
    var gtxid = getallidstrArry[(getallidstrArry.length-3)];
    var tourtype = getallidstrArry[(getallidstrArry.length-2)];
	var mealplantype_old = getallidstrArry[(getallidstrArry.length-1)];

    var packagenameArr = [];
    for(var i =0; i<=(getallidstrArry.length-6); i++){
        packagenameArr.push(getallidstrArry[i]);
    }
    packagename = packagenameArr.join('-');
	
	if(mealplantype_old !== mealplantype){
		$.ajax({
			 
			url : SITEURL + 'detail/index/write-session-modifytrue' ,
			type : 'POST',
			async : false ,
			data : { mealplantype : mealplantype } ,
			dataType : 'json',
			
			success : function(result) {
				//console.log(result);
			},
			error : function(result) {
			}

		});
	}
	
    newurl = base_url;
    
    if( host === 'localhost' ) {
      newurl += '/'+ countryname + '/' + packagename  + '-'+ destname+ '-' + pkgid + '-' + hotelcategory + '-' + gtxid + '-' + tourtype + '-' + mealplantype + '.html';
    }
    else if( appmode === 'MODE_BETA' ) {
      newurl += '/beta/'+ countryname + '/' + packagename + '-' + destname + '-' + pkgid + '-' + hotelcategory + '-' + gtxid + '-' + tourtype + '-' + mealplantype + '.html';
    } else {
      newurl += '/' +countryname + '/' + packagename + '-' + destname + '-' + pkgid + '-' + hotelcategory + '-' + gtxid + '-' + tourtype + '-' + mealplantype + '.html';
    }
    

    window.location.href = newurl;
}

// add activity / sightseeing / services | all multi items
function add_options_into_package( that )
{
    
    // start : ask for confirmation
    if( !askforconfirmation() ) {
        return false;
    }
    // end : ask for confirmation
   
    var packageid , os_price , price , old_price , divbody , modaltype , itemid , daynumber , type , itinerary , tourtype , catid ;
    var mp = '';
    
    divbody     = $(that).closest('.sidebar-2');
//    packageid   = divbody.find('.modal-body .otherservices').attr('data-packageid');
//    packageid   = divbody.find('.data-packageid').val();
    packageid   = divbody.find('.changeoption').attr('data-packageid');

    itemid      = divbody.find('.changeoption:checked').val(); // checked item 
    daynumber   = divbody.find('.changeoption').attr('data-day');
    type        = divbody.find('.changeoption').attr('data-type'); //this is below used
    itinerary   = divbody.find('.changeoption').attr('data-itinerary');
    tourtype    = divbody.find('.changeoption').attr('data-tourtype');
    catid       = divbody.find('.changeoption').attr('data-catid');
    price       = divbody.find('.changeoption:checked').attr('data-price'); // get the checked radio value

    modaltype   = divbody.find('#modaltype_'+packageid ).val();


    update_recent_session_price ( packageid );
    
    old_price   = $('.updated_pkgprice_'+packageid ).val();

     
    // update price on UI
    update_price( old_price , price , packageid );
    
    
    type = modaltype.toLowerCase(); // get the type
    
//    console.log(type);
    
    // update Options on UI | last param [group rate = yes]
    update_ui( type , packageid, daynumber , itinerary , itemid , 'add' , '');

    // update Checkbox UI
    update_ui_checkbox( type , packageid , daynumber , itemid , 'add' );

    // update the session variables
    update_session ( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price , 'add' , 'yes' , mp );

    $("#expanddetail_"+daynumber).slideUp('slow');
    //close_modal( 'myModalActSS' ); // pass id of madal to close

}

// add activity / sightseeing / services | all multi items
function remove_options_from_package( that , packageid , itemid , daynumber , itinerary , tourtype , catid , price , type , myaction )
{
    // start : ask for confirmation
    if( !askforconfirmation() ) {
        return false;
    }
    // end : ask for confirmation
    
    var os_price , price , old_price , divbody , modaltype , priceResponse  ;
    var mp ='';

    // update the session variables
    priceResponse   = update_session ( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price , myaction , '' , mp );  // get filtered accurate price here

//console.log(priceResponse.responseJSON);

    price = (priceResponse.responseJSON).price;
    
    if(myaction==='remove') {
//        price = '-'+(price=='') ? 0 : price;
        price = '-'+price;
    }
    
//    update_recent_session_price ( packageid );
    
    old_price   = $('#updated_pkgprice_'+packageid ).val();


    // update price on UI
    update_price( old_price , price , packageid );
    


    // update Options on UI
    update_ui( type , packageid, daynumber , itinerary , itemid , 'remove' , '');


    // update Checkbox UI
    update_ui_checkbox( type , packageid , daynumber , itemid , 'remove' );
 

}

// add activity / sightseeing / services | all multi items
function add_services_into_package( that )
{
    // start : ask for confirmation
    if( !askforconfirmation() ) {
        return false;
    }
    // end : ask for confirmation
   
    var packageid , divbody , modaltype , itemid , daynumber , type , itinerary , tourtype , catid , priceResponse ;
    var os_price , price , old_price , priceTotal = 0;
    var mp = '';

    divbody     = $(that).closest('.modal-content');
    
    var ids = ''; // get all check ids array
    
    divbody.find('.modal-body input[name="otherservices"]:checked').each(function(index) {

        price = $(this).attr('data-price'); // get itinerary price
        priceTotal = parseInt(priceTotal) + parseInt(price);

        ids += ((index==0) ? '' : ',') + $(this).val();
    });
    // checked items 
    
    tourtype    = divbody.find('.modal-body .otherservices').attr('data-tourtype'); 
    catid       = divbody.find('.modal-body .otherservices').attr('data-catid');
    
    packageid   = divbody.find('.modal-body #modaltype_pkgid').val();
    modaltype   = divbody.find('.modal-body #modaltype_'+ packageid ).val();

    type = modaltype.toLowerCase(); // get the type

    
//    console.log(packageid);

    itemid  = ids; // get multi ids
    price   = priceTotal; // get total price

    old_price   = $('.updated_pkgprice_'+packageid ).val();
//    console.log('add service ' + old_price + ' || ');

    update_recent_session_price( packageid );


    // update the session variables
    priceResponse = update_session ( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price , 'add' , '' , mp ); // get filtered accurate price here

    price = (priceResponse.responseJSON).price;
    
//    console.log(price);
    
    // update price on UI
    update_price( old_price , price , packageid );
    

    close_modal( 'myModalAddServices' ); // pass id of madal to close

}

function change_options( that )
{
    
    // start : ask for confirmation
    if( !askforconfirmation() ) {
        return false;
    }
    // end : ask for confirmation
    
    var packageid , os_price , price , old_price , divbody , itemid, daynumber , type , itinerary , tourtype , catid , group , mp ;
    
    divbody     = $(that).closest('.sidebar-2');
    packageid   = divbody.find('.changeoption').attr('data-packageid');
    itemid      = divbody.find('.changeoption:checked').val(); // checked item 
    daynumber   = divbody.find('.changeoption').attr('data-day');
    type        = divbody.find('.changeoption').attr('data-type');
    itinerary   = divbody.find('.changeoption').attr('data-itinerary');
    tourtype    = divbody.find('.changeoption').attr('data-tourtype');
    catid       = divbody.find('.changeoption').attr('data-catid');
    group       = divbody.find('.changeoption').attr('data-group');
    mp       = divbody.find('.changeoption').attr('data-mp');
    price       = divbody.find('.changeoption:checked').attr('data-price'); // get the checked radio value


//    packageid = $("#packageid").val();
//    itemid = $("#itemid").val();
//    daynumber = $("#day").val();
//    type = $("#type").val();
//    itinerary = $("#itinerary").val();
//    tourtype = $("#tourtype").val();
//    catid = $("#catid").val();
//    group = 'yes';
//    mp = $("#mp").val();
  //price = $("#price").val();
    if( type === 'cc') {
        redirect_to_newurl();
        return;
    }

    if( group === 'yes') {

        update_recent_session_price ( packageid );

        old_price   = $('#recent_pkgprice_'+packageid ).val();

        // update price on UI
        update_price( old_price , price , packageid );

        // update Options on UI
        update_ui( type , packageid, daynumber , itinerary , itemid , 'add' , 'yes');

        update_ui_hidden_value (  type , packageid , daynumber , itinerary , itemid );

        // update the session variables
        update_session ( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price ,'add' , 'yes' , mp );
    }
    else {
        update_recent_session_price ( packageid );

        old_price   = $('#recent_pkgprice_'+packageid ).val();

        // update price on UI
        update_price( old_price , price , packageid );

        // update Options on UI
        update_ui( type , packageid, daynumber , itinerary , itemid , 'add' , '' );

        update_ui_hidden_value (  type , packageid , daynumber , itinerary , itemid );

        // update the session variables
        update_session ( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price ,'add' ,'' , mp );
    }
        $("#expanddetail_"+daynumber).slideUp('slow');
    //close_modal( 'hotelDetailViewList1' ); // pass id of madal to close
    
}

function change_hotel_category(that) {
    var category = that.value;
    var categoryTitle = that.title;
    var tourtype = $(that).attr('data-tourtype');
    
    $('#hotelcategory').val(category);

    var mp = $('.mptype-'+that.value).val();
    $('#mptype_pop').val((mp) ? mp : 0);

//    console.log(rv.ratecard);
//    console.log(categoryTitle);
//    console.log(tourtype);
//    console.log(mp);
    

    // get category rate for dynamic package
    var tourtypeChar = (tourtype ==1) ? 'P' : 'G'
    var price = getRateCategoryPopUp( rv.ratecard , tourtypeChar , categoryTitle , mp );
//    console.log(price);
    $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(price) , 2 ,'') );

    $('.div-mptype').hide();
    $('#div-mptype-'+that.value).show();
}

function change_mealplan( that ){
    var mpid = that.value;
    var elem = $(that).closest('td');
    var node = $(elem).find('input.changeoption');
    
    var categoryTitle = $(node).attr('title');
    var tourtype = $(node).attr('data-tourtype');
    var tourtypeChar = (tourtype ==1) ? 'P' : 'G'

    
    $('#mptype_pop').val(mpid);
    
    // get category rate for dynamic package
    var tourtypeChar = (tourtype ==1) ? 'P' : 'G'
    var price = getRateCategoryPopUp( rv.ratecard , tourtypeChar , categoryTitle , mpid );

    $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(price) , 2 ,'') );
}

function getRateCategoryPopUp (array , tourtype, category, mptype) 
{
    var a = array[tourtype][category];
//    console.log(a);
    if(isNaN(mptype)) {
        price= a.price[0].PricePerPerson;
    }
    else {
        var b = a.mptype[mptype];
        var price = b.price[0].PricePerPerson;
    }
    return parseInt(price);
}


function update_recent_session_price ( packageid )
{
    var recent_pkgprice_ = $('#recent_pkgprice_'+ packageid).val();
//    alert(recent_pkgprice_);
    $('#updated_pkgprice_'+ packageid).val( parseInt(recent_pkgprice_) );
}

function update_session( type , packageid , tourtype , catid , itinerary , daynumber , itemid , price , myaction , group , mp)
{
    var org_price , pkgid ;
    
    pkgid = packageid;

    return $.ajax({
         
        url : SITEURL + 'detail/index/write-session' ,
        type : 'POST',
        async : false ,
        data : { type : type , pkgid : pkgid , tourtype : tourtype , catid : catid , itinerary : itinerary , itemid : itemid, price : price , myaction : myaction  , group : group , mp : mp } ,
        dataType : 'json',
        
        success : function(result) {
            
            if(result.status == 'success')
            {
                return (result.price);
            }
        },
        error : function(result) {
        }

    });
    
}

// update hidden values on UI
function update_ui_hidden_value( type , packageid , daynumber , itinerary , itemid )
{
//    $('#itinerary_'+ type + '_'+ packageid + '_' + daynumber).val(itemid);
    $('.itinerary_'+ type + '_'+ packageid + '_' + itinerary).val(itemid);
}

// update UI only
function update_ui( type , packageid , daynumber , itinerary , itemid , action , group )
{
    
    if( group === 'yes' ) {
        if(type === 'h') {
            $('.'+ type + '_option_'+ packageid + '_' + daynumber ).addClass('hidee').removeClass('showw');
            $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).removeClass('hidee').addClass('showw');

            // for changing the related itinerary
            $('.' + 'group_'+ itinerary ).addClass('hidee').removeClass('showw');
            $('.' + 'group_'+ itinerary + '_'+ itemid  ).addClass('showw').removeClass('hidee');
        }
    }
    else {
        if(type === 'h') {
            $('.'+ type + '_option_'+ packageid + '_' + daynumber ).addClass('hidee').removeClass('showw');
            $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).removeClass('hidee').addClass('showw');
        }
        else if( type === 'a' ||  type === 's' ) {

            if( action === 'remove' ) {

                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.add-button').show();
                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.remove-button').hide();
                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.INCLUDED-OPTIONAL').text('(OPTIONAL)');

            } else {
                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.add-button').hide();
                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.remove-button').show();
                $('#'+ type + '_option_'+ packageid + '_' + daynumber + '_' + itemid ).find('.INCLUDED-OPTIONAL').text('(INCLUDED)');
            }
        }
    }
}

// update UI only
function update_ui_checkbox( type , packageid , daynumber , itemid , action )
{
    $('#itinerary_' + type + '_' + packageid + '_' + daynumber + '_' + itemid ).trigger('click');
}

// update price on UI
function update_price( old_price , price , packageid )
{
    var new_price;
   
    new_price   = parseInt(old_price) + parseInt(price);
    
    $( '.updated_pkgprice_'+ packageid ).val( new_price );
    $( '.pkgprice_html_'+ packageid ).text( rvMoneyFormatINR(new_price , 2 ,'') );
    
}


function askforconfirmation()
{
//    return true; // this is temporary only , need to remove this line
    
    var isconfirm = confirm('Are you sure for this change in package?');
    
    if(isconfirm === false)
        return false;
    else
        return true;
}

function close_modal( modalid )
{
    $( '#'+ modalid ).modal('hide');
}

function pick_itemprice( modalBody )
{
    return modalBody.find('#new_item_price').val();
}
function show_loader_price( classname )
{
    $('.'+ classname ).html('<img src="'+SITEURL+'/public/images/loader-sm.gif" width="20" />');
}

function update_price_onclick(that , packageid , type )
{
    var price , itemprice , _package_price = 0;
    
    var itemprice = $(that).attr('data-price'); // get itinerary price

    if(type === 'services' ) {
        $('.pop_pkgprice_updated').each( function(i, element){
            if( i == 0 ) {
                _package_price = parseInt( $(this).text().replace(',','') );
            }
        });    

        if( $(that).is(':checked') ) {
            price = parseInt(_package_price) + parseInt(itemprice);
        }
        else {
            price = parseInt(_package_price) - parseInt(itemprice);
        }
    }
    else if((type === 'car' ) || (type === 'h' )){
        $('.pop_pkgprice_').each( function(i, element){
            if( i == 0 ) {
                _package_price = parseInt( $(this).text().replace(',','') );
            }
        });
        price = parseInt(_package_price) + parseInt(itemprice);
    }

    $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(price) , 2 ,'') );
}

function update_popup_price( type , packageid , itemprice )
{
//    console.log(type);
//    console.log(packageid);
//    console.log(itemprice);

    var _package_price = $('#updated_pkgprice_'+packageid).val();
    $('.pop_pkgprice_').text( rvMoneyFormatINR (_package_price , 2 , ''));

    if( (type ==='a') || (type ==='s') ) {
        $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(_package_price) + parseInt(itemprice) , 2 ,'') );
    }
    else if( (type ==='services') ) {
        $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(_package_price) , 2 ,'') );
    }
    else if( (type ==='cc') ) {
        $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(_package_price) , 2 ,'') );
    }
    else if( (type === 'car' ) || (type === 'h' ) ) {
        $('.pop_pkgprice_updated').text( rvMoneyFormatINR( parseInt(_package_price) + parseInt(itemprice) , 2 ,'') );
    }

}


// this is just modal opener for hotel options available for any package
$(document).ready(function(){
  
    $(document).on('click' , '.modal-link' , function(e) {
        var modal = $('#myModalChangeOptions'), modalBody = $('#myModalChangeOptions .modal-body') , href , titleType;

//        var itinerary = $(this).attr('data-itinerary');
        titleType   = $(this).attr('data-pop');
        href = $(this).attr('href');
        
        if(titleType === 'changecar') {
            modal.find('.modal-title').text('Available Options');
            modal.find('.addorchange').hide();
        }
        if(titleType === 'change-category') {
            modal.find('.modal-title').text('Available Category Options');
            modal.find('.addorchange').hide();
        }
        
        modal.modal('show');
        modalBody.html('<div style="text-align:center;padding-top:30px;"><img src="' + SITEURL + 'public/images/loader.gif"/></div>');
        modalBody.load(href);
        e.preventDefault();
        
    });
    
    $(document).on('click' , '.modal-link-act-ss' , function(e) {
        var modal = $('#myModalActSS'), modalBody = $('#myModalActSS .modal-body') , href , titleType ;

        href        = $(this).attr('href');
        titleType   = $(this).attr('data-pop');
        
        if(titleType === 'view') {
            modal.find('.modal-title').text('Available Details');
            modal.find('.addorchange').hide();
        }
        else {
            modal.find('.modal-title').text('Available Options');
            modal.find('.addorchange').show();
        }

        modal.modal('show');
        modalBody.html('<div style="text-align:center;padding-top:30px;"><img src="' + SITEURL + 'public/images/loader.gif"/></div>');
        modalBody.load(href);
        
        show_loader_price( 'price-span' );

        e.preventDefault();
        
    });
    
    $(document).on('click' , '.modal-link-add-services' , function(e) {
        var modal = $('#myModalAddServices'), modalBody = $('#myModalAddServices .modal-body') , href , titleType;

        href        = $(this).attr('href');
        titleType   = $(this).attr('data-pop');
        
        if(titleType === 'view') {
            modal.find('.modal-title').text('Available Details');
            modal.find('.addorchange , .fa-pull-left').hide();
        }
        else {
            modal.find('.modal-title').text('Available Options');
            modal.find('.addorchange').show();
        }
        
        modal.modal('show');
        modalBody.html('<div style="text-align:center;padding-top:30px;"><img src="' + SITEURL + 'public/images/loader.gif"/></div>');
        modalBody.load(href);

        show_loader_price( 'price-span' );

        e.preventDefault();
        
    });
    
});