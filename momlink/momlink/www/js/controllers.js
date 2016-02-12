angular.module('starter.controllers', [])

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
        window.location = "inbox.html";
    };
    $scope.calendar = function () {
        window.location = "calendar.html";
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
//Other Links
    $scope.event = function () {
        window.location = "event.html";
    };
    $scope.today = function () {
        window.location = "today.html";
    };
    $scope.trackFood = function () {
        window.location = "trackFood.html";
    };
    $scope.trackPills = function () {
        window.location = "trackPills.html";
    };
    $scope.trackMoods = function () {
        window.location = "trackMoods.html";
    };
    $scope.addPill = function () {
        window.location = "addPill.html";
    };
    $scope.myPills = function () {
        window.location = "myPills.html";
    };
    $scope.addFood = function () {
        window.location = "addFood.html";
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

    $scope.uploadFood = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Your meals have been sent'
        });
        alertPopup.then(function (res) {
            //sendMeals
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

    $scope.uploadPill = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Your pills have been sent'
        });
        alertPopup.then(function (res) {
            //sendPills
        });
    };

    $scope.addEvent = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Event added'
        });
        alertPopup.then(function (res) {
            //addEvent
            window.location = "calendar.html"
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

.controller('EventController', function ($scope, $ionicPopover) {
    $scope.select = function (eventType) {
        document.getElementById(eventType).style.border = "1px solid black";
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
