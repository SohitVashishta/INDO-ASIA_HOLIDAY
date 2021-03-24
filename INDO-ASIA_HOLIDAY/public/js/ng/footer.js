  
app.controller("FooterController", ["$scope", "$http", function( $scope, $http ) {

    $scope.resultsetOurPartner , $scope.resultsetSocialLinks , $scope.resultsetDestination , $scope.resultsetFooterCategory , $scope.resultsetContactQuery = [];

    $http({
        method: 'GET',
        url: conf.SITEURL + 'index/displayfooter/displayfooter', 
        headers: {'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET ', 
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With', } 
//         cache: true
     }).
        then(function successCallback(response) {
        $scope.resultsetSocialLinks = response.data.social_links;
        $scope.resultsetOurPartner = response.data.ourpartner;
        $scope.resultsetDestination = response.data.footer_destination;
        $scope.resultsetContactQuery = response.data.contactquery;
//        $scope.resultsetFooterCategory = response.data.footer_category;
        //console.log($scope.resultsetOurPartner);
    }, function errorCallback(response) {
    }). finally(function() {
        
    });
    
    $scope.lowercase = function(str) {
        return angular.lowercase(str);
    };
         
}]);

 
