angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HeaderBarController', function ($scope, $location, $document) {
    $scope.goBack = function (value) {
        window.history.back();
    };
    $scope.home = function () {
        window.location = "main.html";
    };
    $scope.toggleTopMenu = function () {
        var menu = document.getElementsByTagName('ion-top-menu')[0];
        var pane = document.getElementsByTagName('ion-pane')[0];
        menu.style.height = pane.style.top = (menu.offsetHeight == 0) ? '340px' : '0px';
    };
//Menu Links
    $scope.mail = function () {
        window.location = "mail.html";
    };
    $scope.communities = function () {
        window.location = "communities.html";
    };
    $scope.track = function () {
        window.location = "track.html";
    };
    $scope.coupons = function () {
        window.location = "coupons.html";
    };
    $scope.content = function () {
        window.location = "content.html";
    };
    $scope.myProfile = function () {
        window.location = "myProfile.html";
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
            if (res) {
                    var db = new PouchDB('http://localhost:5984/' + imageId);
                    db.info().then(function (info) {
                        console.log("check1")
                    });

                    var doc = {
                        "_id": "userInfo",
                        "profileimage": imageId,
                        "password": "",
                        "name": "",
                        "age": "",
                        "psd": "",
                        "edd": ""
                    };
                    db.put(doc);
                    db.info().then(function (info) {
                        console.log("check2")
                    });

                    document.getElementById(imageId).style.border = "none";
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

    $scope.uploadMood = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Your moods have been sent'
        });
        alertPopup.then(function (res) {
            //sendMoods
        });
    };

})

.controller('PopOverController', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    $scope.$on('popover.hidden', function() {
        // Execute action
    });
    $scope.$on('popover.removed', function() {
        // Execute action
    });
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
    $scope.create = function () {
        if ($scope.passcode.length == 6) {
            //get db by imageid
            //add password to imageid doc
            window.location = "main.html";
        }
    }
    $scope.confirm = function () {
        if ($scope.passcode.length == 6) {
            window.location = "main.html";
        }
    }
});
