var app = angular.module('AppCayCanh', []);
app.controller("SanPhamController", function ($scope, $http) {
    $scope.listsp; 
    $scope.GetSanPham = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-all'
        }).then(function (response) {
            $scope.listsp = response.data;
        });
        
       
    };
    $scope.GetSanPham();
})