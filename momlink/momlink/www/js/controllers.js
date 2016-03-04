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
    $scope.login = function (value) {
        window.location = "templates/main.html";
    };
    $scope.register = function (value) {
        window.location = "templates/main.html";
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
    $scope.addPill = function () {
        window.location = "addPill.html";
    };
    $scope.addFood = function () {
        window.location = "addFood.html";
    };
})

.controller('ContentController', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {
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

.controller('AddSubController', function ($scope) {
    var count = 0;
    var countEl = document.getElementById("count");
    $scope.plus = function (label) {
        count++;
        countEl.value = count;
        document.getElementById("count").innerHTML = countEl.value + label;
    }
    $scope.minus =  function (label) {
        if (countEl.value > 0) {
            count--;
            countEl.value = count;
            document.getElementById("count").innerHTML = countEl.value + label;
        }
    }
    $scope.clear = function (label) {
        count = 0;
        document.getElementById("count").innerHTML = "0" + label;
    }
})

.controller('ActivityController', function ($scope) {
    var hour = 0;
    var minute = 0;
    var totalHours = document.getElementById("hour");
    var totalMinutes = document.getElementById("minute");
    $scope.addHour = function () {
        hour++;
        totalHours.value = hour;
        document.getElementById("hour").innerHTML = ("0" + totalHours.value).slice(-2);
    }
    $scope.addMinute = function () {
        minute++;
        totalMinutes.value = minute;
        document.getElementById("minute").innerHTML = ("0" + totalMinutes.value).slice(-2);
    }
    $scope.clear = function () {
        minute = 0;
        totalMinutes.value = minute;
        document.getElementById("minute").innerHTML = ("0" + totalMinutes.value).slice(-2);
        hour = 0;        
        totalHours.value = hour;    
        document.getElementById("hour").innerHTML = ("0" + totalHours.value).slice(-2);
    }
})

.controller('PainScaleController', function ($scope) {
    $scope.updateFace = function (value) {
        face = "";
        if (value == 1) {
            face = "noHurt";
        }
        if (value == 2) {
            face = "hurtsLittleBit";
        }
        if (value == 3) {
            face = "hurtsLittleMore";
        }
        if (value == 4) {
            face = "hurtsEvenMore";
        }
        if (value == 5) {
            face = "hurtsWholeLot";
        }     
        document.getElementById("face").src = "../img/temp/painScale/" + face + ".png";
    };
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
});
