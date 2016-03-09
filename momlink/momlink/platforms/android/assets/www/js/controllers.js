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
    //Track Link
    $scope.goToAddEvent = function (type) {
        window.location = type + ".html";       
    };
})

.controller('DataController', function ($scope, $ionicSideMenuDelegate) {
    $scope.actList = [
      { type: "Bike", image: "../img/activities/bike.png" },
      {type: "Clean", image: "../img/activities/clean.png" },
      {type: "Dance", image: "../img/activities/dance.png" },
      {type: "Exercise", image: "../img/activities/exercise.png" },
      {type: "Run", image: "../img/activities/run.png" },
      {type: "Shop", image: "../img/activities/shop.png" },
      {type: "Walk", image: "../img/activities/walk_dog.png" },
      {type: "Walk Dog", image: "../img/activities/walk.png" }
    ]
    $scope.trackList = [
      {type: "Activity", link: "addActivity", image: "../img/activities/run.png"},
      {type: "Baby Heart Rate", link: "addBabyHeartRate", image: "../img/buttons/btn-12.png"},
      {type: "Blood Glucose", link: "addBloodGlucose", image: "../img/temp/bloodGlucose.png"},
      {type: "Blood Iron", link: "addBloodIron", image: "../img/temp/bloodDrop.png"},
      {type: "Blood Pressure", link: "addBloodPressure", image: "../img/temp/blood-pressure.jpg"},
      {type: "Diet", link: "addFood", image: "../img/buttons/btn_t-03.png"},
      {type: "Fluid", link: "addFluid", image: "../img/food/food-34.png"},
      {type: "Mood", link: "addMood", image: "../img/temp/moods/cheerful.png"},
      {type: "Pain", link: "addPain", image: "../img/buttons/btn_t-05.png"},
      {type: "Pills", link: "addPill", image: "../img/buttons/btn_t-04.png"},
      {type: "Weight", link: "addWeight", image: "../img/temp/scale.jpg"}
    ]
})

.controller('ContentController', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
})

.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {
    $scope.uploadTrack = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Your info has been sent'
        });
        alertPopup.then(function (res) {
            //dbSend tracking info
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
    var totalMinutes = document.getElementById("minute");
    var totalHours = document.getElementById("hour");
    $scope.addHour = function () {
        hour++;
        totalHours.value = hour;
        document.getElementById("hour").innerHTML = ("0" + totalHours.value).slice(-2);
    }
    $scope.subtractHour = function () {
        if(totalHours.value > 0){
            hour--;
            totalHours.value = hour;
            document.getElementById("hour").innerHTML = ("0" + totalHours.value).slice(-2);
        }
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

.controller('ClockController', function () {
    function Clock(IN_szContainerID, IN_objOptions) {
        this.init();
        $.extend(true, this, this.defaults);
        $.extend(true, this, IN_objOptions || {});
        this.holder = $('#' + IN_szContainerID);
        this.containerID = IN_szContainerID;
        this.create();
        this.draw();
    }
    Clock.prototype =
    {
        init: function () {
            this.defaults =
            {
                size: 150,
                centerColor: '#21344b',
                centerRadius: 5,
                centerStrokeWidth: 5,
                centerStrokeOpacity: 0.8,
                minuteColor: '#ff0000',
                minuteLength: 75,
                minuteStrokeWidth: 10,
                minuteStrokeOpacity: 0.8,
                speed: 100,
                allowMinuteFullRotation: false,
                minuteDraggable: true,
                minuteDragSnap: 1
            };
        },
        create: function () {
            this.paper = Raphael(this.containerID, this.size, this.size);
        },
        draw: function () {
            var objMinuteFullPath;
            var objMinutePath;
            var iMinuteLength;
            var objMinuteImage;
            var objCenterImage;
            this.minute = this.paper.set();
            // Draw the hand
            objMinuteFullPath = this.paper
                .path("M" + this.size / 2 + "," + this.size / 2 + "L" + this.size / 2 + ",0")
                .attr
                ({
                    'stroke-width': 0
                });
            iMinuteLength = objMinuteFullPath.getTotalLength();
            objMinutePath = this.paper
                .path(objMinuteFullPath.getSubpath(0, iMinuteLength * this.minuteLength / 100))
                .attr({
                    stroke: this.minuteColor,
                    'stroke-width': this.minuteStrokeWidth,
                    'stroke-opacity': this.minuteStrokeOpacity
                });
            this.minute.push(objMinutePath);
            // Draw the center circle of analog clock
            this.paper
                .circle(this.size / 2, this.size / 2, this.centerRadius)
                .attr({
                    fill: this.centerColor,
                    "stroke-width": this.centerStrokeWidth,
                    'stroke-opacity': this.centerStrokeOpacity
                });
            if (objCenterImage) {
                objCenterImage.toFront();
            }
            this.minute.angle = 0;
            this.minute.value = 0;
            this.minute.previousValue = 0;
            this.minute.allowFullRotation = this.allowMinuteFullRotation;
            this.assignEventHandlers();
        },
        assignEventHandlers: function () {
            var THIS;
            var fnMinute_OnDragMove;
            THIS = this;
            fnMinute_OnDragMove = function (dx, dy, x, y) {
                var x1, y1, x2, y2, iAngle, iAdditionalAngle, objOffset;
                objOffset = $('#' + THIS.containerID).offset();
                if (THIS.minuteDraggable) {
                    x1 = THIS.size / 2;
                    y1 = THIS.size / 2;
                    x2 = x - objOffset.left;
                    y2 = y - objOffset.top;
                    iAngle = Raphael.angle(x1, y1, x2, y2);
                    iAngle = iAngle - (iAngle % (THIS.minuteDragSnap * 6)) - 90;
                    if (iAngle < 0) {
                        iAngle = iAngle + 360;
                    }
                    THIS.minute.angle = iAngle;
                    THIS.minute.value = (THIS.minute.angle / 360 * 60).toFixed();
                    this.transform(['r', iAngle, x1, y1]);
                    document.getElementById("minute").innerHTML = ("0" + THIS.minute.value).slice(-2);
                    if (THIS.onMinuteDragMove) {
                        THIS.onMinuteDragMove.apply(THIS, arguments);
                    }
                }
            };
            this.minute.drag(fnMinute_OnDragMove);         
        }
    };
    $(document).ready(function () {
        objClock = new Clock('CLOCK_HOLDER');
    });
})

.controller('PainScaleController', function ($scope) {
    $scope.updateFace = function (value) {
        face = "";
        if (value == 1) {
            face = "noHurt";
            description = "No hurt";
        }
        if (value == 2) {
            face = "hurtsLittleBit";
            description = "Hurts little bit";
        }
        if (value == 3) {
            face = "hurtsLittleMore";
            description = "Hurts little more";
        }
        if (value == 4) {
            face = "hurtsEvenMore";
            description = "Hurts even more";
        }
        if (value == 5) {
            face = "hurtsWholeLot";
            description = "Hurts whole lot";
        }
        if (value == 6) {
            face = "hurtsWorst";
            description = "Hurts worst";
        }
        document.getElementById("face").src = "../img/temp/painScale/" + face + ".png";
        document.getElementById("description").innerHTML = description;
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
