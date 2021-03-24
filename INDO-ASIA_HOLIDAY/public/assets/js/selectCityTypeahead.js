// start : Code is added by Er Amit kumar Dubey on 10 April 2017 at 4:23 PM copied from ranvir singh's code for city

function get_city_autosuggest(inputId , hiddenInputId, countryInputId) {

    $('#'+inputId).typeahead({
        items: 'all',
        source: function(query, process) {
            $('#'+hiddenInputId).val('');
            var countryId   = (countryInputId) ? $("#"+countryInputId).val() : '';
            return $.ajax({
                //url: '/general/suggest-city',
                url: '/buyhotel/autosuggest',
                type: 'post',
                async: true,
                data: {query: query, countryId : countryId},
                dataType: 'json',
                success: function (result) {
                    var resultList = result.map(function (item) {
                        var aItem = {  CityId: item.CityId, label: item.label, CityName: item.CityName};
                        return JSON.stringify(aItem);
                    });
                    return process(resultList);
                }
            });
        },
        sorter: function (items) {          
           var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (aItem = items.shift()) {
                var item = JSON.parse(aItem);
                if (!item.label.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(JSON.stringify(item));
                else if (~item.label.indexOf(this.query)) caseSensitive.push(JSON.stringify(item));
                else caseInsensitive.push(JSON.stringify(item));
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function (obj) {
            var item = JSON.parse(obj);
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.label.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>'
            })
        },
        updater: function(item) {
            var item = JSON.parse(item);
//            var otherlocationcity = $('#otherlocationcity').val();
//            if(otherlocationcity === ''){
//                var s1=[['Sony',7],['Samsung',5],['LG',8]];
//                var data = [{CityId:item.CityId,Title:item.label}];
//                $('#otherlocationcity').val('fgdsfgsd');
//                //$("#otherlocationcity").attr("data-selectize-values", data);
//                
//                console.log(data);
//                console.log(item.CityId);
//            }
            
            $('#'+hiddenInputId).val(item.CityId + '__' + item.CityName);
            return item.label;
        },
        minLength:2,
//        displayField: 'Title',
    }).focus();
}

function get_city_autosuggest_country(inputId , hiddenInputId, countryInputId,hiddencountryInputId) {

    $('#'+inputId).typeahead({
        items: 'all',
        source: function(query, process) {
            $('#'+hiddenInputId).val('');
            var countryId   = (countryInputId) ? $("#"+countryInputId).val() : '';
            return $.ajax({
                //url: '/general/suggest-city',
                url: '/buyhotel/autosuggest',
                type: 'post',
                async: true,
                data: {query: query, countryId : countryId},
                dataType: 'json',
                success: function (result) {
                    var resultList = result.map(function (item) {
                        var aItem = {  CityId: item.CityId, label: item.label,ContId:item.ContId, CityName: item.CityName};
                        return JSON.stringify(aItem);
                    });
                    return process(resultList);
                }
            });
        },
        sorter: function (items) {          
           var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (aItem = items.shift()) {
                var item = JSON.parse(aItem);
                if (!item.label.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(JSON.stringify(item));
                else if (~item.label.indexOf(this.query)) caseSensitive.push(JSON.stringify(item));
                else caseInsensitive.push(JSON.stringify(item));
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function (obj) {
            var item = JSON.parse(obj);
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.label.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>'
            })
        },
        updater: function(item) {
            var item = JSON.parse(item);
            $('#'+hiddenInputId).val(item.CityId + '__' + item.CityName);
			$('#'+hiddencountryInputId).val(item.ContId);
            return item.label;
        },
        minLength:2,
//        displayField: 'Title',
    }).focus();
}
function get_state_autosuggest_country(inputId , hiddenInputId, countryInputId,hiddencountryInputId) {

    $('#'+inputId).typeahead({
        items: 'all',
        source: function(query, process) {
            $('#'+hiddenInputId).val('');
            var countryId   = (countryInputId) ? $("#"+countryInputId).val() : '';
            return $.ajax({
                //url: '/general/suggest-city',
                url: '/customer/state-auto-suggest',
                type: 'post',
                async: true,
                data: {query: query, countryId : countryId},
                dataType: 'json',
                success: function (result) {
                    var resultList = result.map(function (item) {
                        var aItem = {  StateId: item.StateId, label: item.label,ContId:item.ContId, StateName: item.StateName};
                        return JSON.stringify(aItem);
                    });
                    return process(resultList);
                }
            });
        },
        sorter: function (items) {          
           var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (aItem = items.shift()) {
                var item = JSON.parse(aItem);
                if (!item.label.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(JSON.stringify(item));
                else if (~item.label.indexOf(this.query)) caseSensitive.push(JSON.stringify(item));
                else caseInsensitive.push(JSON.stringify(item));
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function (obj) {
            var item = JSON.parse(obj);
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.label.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>'
            })
        },
        updater: function(item) {
            var item = JSON.parse(item);
            $('#'+hiddenInputId).val(item.StateId + '__' + item.StateName);
			$('#'+hiddencountryInputId).val(item.ContId);
            return item.label;
        },
        minLength:2,
//        displayField: 'Title',
    }).focus();
}
function get_city_autosuggest_country_selectize(inputId , hiddenInputId, countryInputId,hiddencountryInputId) {

    $('#'+inputId).typeahead({
        items: 'all',
        source: function(query, process) {
            $('#'+hiddenInputId).val('');
            var countryId   = (countryInputId) ? $("#"+countryInputId).val() : '';
            return $.ajax({
                //url: '/general/suggest-city',
                url: '/buyhotel/autosuggest',
                type: 'post',
                async: true,
                data: {query: query, countryId : countryId},
                dataType: 'json',
                success: function (result) {
                    var resultList = result.map(function (item) {
                        var aItem = {  CityId: item.CityId, label: item.label,ContId:item.ContId, CityName: item.CityName};
                        return JSON.stringify(aItem);
                    });
                    return process(resultList);
                }
            });
        },
        sorter: function (items) {          
           var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
            while (aItem = items.shift()) {
                var item = JSON.parse(aItem);
                if (!item.label.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(JSON.stringify(item));
                else if (~item.label.indexOf(this.query)) caseSensitive.push(JSON.stringify(item));
                else caseInsensitive.push(JSON.stringify(item));
            }
            return beginswith.concat(caseSensitive, caseInsensitive)
        },
        highlighter: function (obj) {
            var item = JSON.parse(obj);
            var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
            return item.label.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
                return '<strong>' + match + '</strong>'
            })
        },
        updater: function(item) {
            var item = JSON.parse(item);
            $('#'+hiddenInputId).val(item.CityId + '__' + item.CityName);
			 var $select = $('#'+hiddencountryInputId).selectize();
			 var selectize = $select[0].selectize;
			var selectedValue=selectize.setValue(item.ContId);
			$('#'+hiddencountryInputId).val(item.ContId);
            return item.label;
        },
        minLength:2,
//        displayField: 'Title',
    }).focus();
}