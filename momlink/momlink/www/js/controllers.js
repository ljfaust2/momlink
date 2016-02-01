angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HeaderBarController', function ($scope, $location, $document) {
    $scope.goBack = function (value) {
        window.history.back();
    };
    $scope.toggleTopMenu = function () {
        var menu = document.getElementsByTagName('ion-top-menu')[0];
        var pane = document.getElementsByTagName('ion-pane')[0];
        menu.style.height = pane.style.top = (menu.offsetHeight == 0) ? '340px' : '0px';
    };
    $scope.logout = function () {
        window.location = "../index.html";
    };
})

.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {
    /*pass in image id*/
    $scope.createImage = function(imageId) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'Is this the picture you would like to use?'
        });
            document.getElementById(imageId).style.border = "1px solid black";
        confirmPopup.then(function (res) {
            if(res) {
                window.location = "pin-create.html";
            }
            else {
                document.getElementById(imageId).style.border = "none";
            }
        });
    };
    $scope.selectImage = function (imageId) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm',
            template: 'Is this your profile picture?'
        });
        document.getElementById(imageId).style.border = "1px solid black";
        confirmPopup.then(function (res) {
            if (res) {
                window.location = "pin-unlock.html";
            }
            else {
                document.getElementById(imageId).style.border = "none";
            }
        });
    };
})

.controller('SliderController', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    }
})

.controller('UnlockController', function ($scope, $location) {
    $scope.init = function () {
        $scope.passcode = "";
    }
    $scope.add = function (value) {
        if ($scope.passcode.length < 6) {
            $scope.passcode = $scope.passcode + value;
        }
    }
    $scope.delete = function () {
        if ($scope.passcode.length > 0) {
            $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
        }
    }
    $scope.confirm = function () {
        if ($scope.passcode.length == 6) {
            window.location = "main.html";
        }
    }
});
