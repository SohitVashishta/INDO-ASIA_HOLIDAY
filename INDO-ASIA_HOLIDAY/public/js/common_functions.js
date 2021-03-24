
$(document).on('click' , '.moreless_anchor', function(){
    if($(this).hasClass('expand')) {
        $(this).css({'right':'20px','bottom':'0' ,'position':'absolute' }).addClass('collapse-act').removeClass('expand').html('+More');
        $(this).parent().css({'height':'110px','overflow':'hidden' });
    }else {
        $(this).css({'right':'auto','bottom':'auto' ,'position':'relative' }).addClass('expand').addClass('collapse-act').html('-Less');
        $(this).parent().css({'height':'auto','overflow':'auto' });
    }
});


$(document).on('click' , '.iamplusminus', function(){
    if($(this).hasClass('expand')) {
        $(this).html('<i class="fa fa-plus"></i>').addClass('collepse').removeClass('expand').attr('title','More...');
        $(this).parent().css({'height':'180px'});
    } else {
        $(this).html('<i class="fa fa-minus"></i>').addClass('expand').removeClass('collepse').attr('title','Less...');;
        $(this).parent().css({'height':'auto'});
    }
});


$(document).on('click' , '.close-pop-timeout', function(){
//    alert('1');
    $.ajax({
        url : SITEURL + 'index/write-session-popup' ,
        type : 'POST',
        async : false ,
        data : {} ,
        dataType : 'json',
        success : function(result) {
            if(result.status == 'success') {
                return (result.price);
            }
        },
        error : function(result) {
        }
    });
});


//if( !Call_Back ) {
//    setTimeout(function () {
////        $("#myModa1Enquiry").modal('show');
//    }, 30000);
//}
function trimcontent( showChar )
{

    var moretext = "+More";
    var lesstext = "-Less";

    $('.more_').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = '<span class="defaultcontent" >' + c + '</span><span class="morecontent">' + h + '</span>\n\
                &nbsp;&nbsp;&nbsp;<span style="color:#ea272d;font-size:15px;cursor:pointer;" href="javascript:void();" class="morelink">' + moretext + '</span>';
            $(this).html(html);
        }
    });
 
    $(".morelink").click(function(){
       
        if($(this).hasClass("less")) {
            $(this).removeClass("less").html(moretext);
        } else {
            $(this).addClass("less").html(lesstext);
        }
        $(this).prev().toggle();
        return false;
    });
    
    $('span.morecontent').hide();
    $('.defaultcontent , .morecontent').css({'font-size':'15px' ,'text-transform':'none' ,'font-weight':'normal' });
}


function trimcontentTst( showChar )
{

    var moretext = "+More";
    var lesstext = "-Less";

    $('.more1').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = '<span class="defaultcontent" >' + c + '</span>';
            $(this).html(html);
        }
    });

}
function trimcontentBlog( showChar )
{

    var moretext = "+More";
    var lesstext = "-Less";

    $('.moreblog').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = '<span class="defaultcontent" >' + c + '</span>';
            $(this).html(html);
        }
    });

}



function trimcontentUnforgettableTrip( showChar )
{

    var moretext = "+More";
    var lesstext = "-Less";

    $('.readyMore').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = '<span class="defaultcontent" >' + c + '</span><span class="morecontent">' + h + '</span>\n\
                &nbsp;&nbsp;&nbsp;<a style="cursor:pointer;" href="javascript:void();" class="rmorelink">' + moretext + '</a>';
            $(this).html(html);
        }
    });
 
    $(".rmorelink").click(function(){
       
        if($(this).hasClass("less")) {
            $(this).removeClass("less").html(moretext);
        } else {
            $(this).addClass("less").html(lesstext);
        }
        $(this).prev().toggle();
        return false;
    });
    
    $('span.morecontent').hide();
    $('.defaultcontent , .morecontent').css({'font-size':'15px' ,'text-transform':'none' ,'font-weight':'normal' });
}


function trimcontentNew( showChar )
{
    var moretext = "+More";
    var lesstext = "-Less";

    $('.more_html---').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
            var html = '<span class="defaultcontent" >' + c + '</span><span class="morecontent">' + h + '</span>\n\
                &nbsp;&nbsp;&nbsp;<a style="color:#ea272d" href="javascript:void();" class="morelink">' + moretext + '</a>';
            $(this).html(html);
        }
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less").html(moretext);
        } else {
            $(this).addClass("less").html(lesstext);
        }
        $(this).prev().toggle();
        return false;
    });
    
    $('span.morecontent').hide();
    $('.defaultcontent , .morecontent').css({'font-size':'12px' ,'text-transform':'none' ,'font-weight':'normal' });
}


function moreless(type, e)
{
    if (type == null) {
        $(e).parent().find('li.limore').toggleClass("hidee");
    }
    else if (type == 'li') {
        $(e).parent().parent().find('li.limore').toggleClass("hidee")
    }
    $(e).html(($(e).html() == '<img src="public/img/minus.png">') ? '<img src="public/img/pluse.png">' : '<img src="public/img/minus.png">');
}

function modify_enquiry(that)
{
    $(that).hide();
    $('.sending').html('Send Enquiry').attr('disabled', false).show();
}


function checkCityIdData(){
    
    var McityId = $('#cityid').val();
    if(McityId == ''){
        $('.destinationBox').addClass('package-search-error');
        return false;
    }
}



function trimcontentDomestic( showChar )
{
    var moretext = "Read More";
    var lesstext = "-Less";

    $('.readMore').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = '<div class="defaultcontent" >' + c + '</div><div class="morecontent">' + h + '</div>'+
                '&nbsp;&nbsp;&nbsp;<a style="cursor:pointer;" href="javascript:void();" class="readlesslink readmorebl">' + moretext + '</a>';
            $(this).html(html);
        }
    });
 
    $(".readlesslink").click(function(){
       
        if($(this).hasClass("less")) {
            $(this).removeClass("less").html(moretext);
        } else {
            $(this).addClass("less").html(lesstext);
        }
        $(this).prev().toggle();
        return false;
    });
    
    $('div.morecontent').hide();
    $('.defaultcontent , .morecontent').css({'font-size':'15px' ,'text-transform':'none' ,'font-weight':'normal' });
}




    function viewMoreDestinations(type){
    $.ajax({
        url : '/index/get-all-ajax-destination' ,
        type : 'POST',
        async : false ,
        data : {'type':type} ,
        dataType : 'html',
       
        success : function(result) {
            if(result){
              $('#successDestination').val(1);
              $('.AllDestinationHtml').html(result);
              
//              $('.preDestinationDiv').hide();
//              $('.moreDestinationDiv').show();
          }
        },
        error : function(result) {
        }
    });
};
function checkMoreDestinations(type){
if($('#successDestination').val() == 1 && $('.AllDestinationHtml').html() !=''){
 $('.moreDestinationDiv').show();  
 $('.viewmore').hide();
}else{
  viewMoreDestinations(type);  
}   
}

function checkMoreSightseeings(){
    $('.moreSightseeingsDiv').show();
    $('.moreSightseeingsBtn').hide();
    $('.lessSightseeingsBtn').show();
}
function checkLessSightseeings(){
    $('.moreSightseeingsDiv').hide();
     $('.moreSightseeingsBtn').show();
      $('.lessSightseeingsBtn').hide();
}
 function getSeoName1(str) {
       str = str.replace( /\s\s+/g, ' ' ).toLowerCase();
            str = str.replace(/#|(|)|,|\/|_|  +/g, '');
            str = str.split(',').join('-');
            str = str.split(' ').join('-');
            return str.replace('--', '-');
    } 
    
    
    function showHideWriteUp(id){
        $('.showHideWriteUp'+parseInt(id)).toggleClass('show-hide-sightseeing')
        $('.showWriteUpBtn'+parseInt(id)).toggleClass('show-attractions-sightseeing-btn')
        $('.hideWriteUpBtn'+parseInt(id)).toggleClass('hide-attractions-sightseeing-btn')
    }
    function showHideTravelGuideDescription(){
        $('.showHideTravelGuideDescription').toggleClass('show-hide-travel-guide-description')
        $('.showHideTravelGuideDescriptionLess').toggleClass('show-hide-travel-guide-description-less')
        $('.showTravelGuideDescriptionBtn').toggleClass('show-travel-guide-description-btn')
        $('.hideTravelGuideDescriptionBtn').toggleClass('hide-travel-guide-description-btn')
    }
    
        function showHidePageDescription(){
        $('.showHidePageDescription').toggleClass('show-hide-page-description')
        $('.showHidePageDescriptionLess').toggleClass('show-hide-page-description-less')
        $('.showPageDescriptionBtn').toggleClass('show-page-description-btn')
        $('.hidePageDescriptionBtn').toggleClass('hide-page-description-btn')
    }