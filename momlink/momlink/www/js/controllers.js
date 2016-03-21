angular.module('starter.controllers', [])

.controller('HeaderBarController', function ($scope, $ionicPopup, $location, $document) {
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
    $scope.login = function (user, pass) {
        var db = PouchDB('http://localhost:5984/momlink');
        db.get('loginInfo').then(function (doc) {
            if (user == doc['username'] && pass == doc['password']) {
                window.location = "templates/main.html";
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Your username or password is incorrect'
                });
            }
        });
    };
    $scope.register = function (value) {
        window.location = "templates/main.html";
    };
    $scope.logout = function () {
        window.location = "../index.html";
    };
    //Other Links
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
      { type: "Clean", image: "../img/activities/clean.png" },
      { type: "Dance", image: "../img/activities/dance.png" },
      { type: "Exercise", image: "../img/activities/exercise.png" },
      { type: "Run", image: "../img/activities/run.png" },
      { type: "Shop", image: "../img/activities/shop.png" },
      { type: "Walk", image: "../img/activities/walk_dog.png" },
      { type: "Walk Dog", image: "../img/activities/walk.png" }
    ]
    $scope.trackList = [
      { type: "Activity", link: "addActivity", image: "../img/activities/run.png" },
      { type: "Baby Heart Rate", link: "addBabyHeartRate", image: "../img/buttons/btn-12.png" },
      { type: "Blood Glucose", link: "addBloodGlucose", image: "../img/temp/bloodGlucose.png" },
      { type: "Blood Iron", link: "addBloodIron", image: "../img/temp/bloodDrop.png" },
      { type: "Blood Pressure", link: "addBloodPressure", image: "../img/temp/blood-pressure.jpg" },
      { type: "Caffeine", link: "addCaffeine", image: "../img/temp/coffee.jpg" },
      { type: "Cigarettes", link: "addCigarette", image: "../img/temp/cigarette.png" },
      { type: "Diet", link: "addFood", image: "../img/buttons/btn_t-03.png" },
      { type: "Kicks", link: "addKicks", image: "../img/temp/kicks.png" },
      { type: "Mood", link: "addMood", image: "../img/moods/cheerful.png" },
      { type: "Pain", link: "addPain", image: "../img/buttons/btn_t-05.png" },
      { type: "Pills", link: "addPill", image: "../img/buttons/btn_t-04.png" },
      { type: "Weight", link: "addWeight", image: "../img/temp/scale.jpg" }
    ]
})

.controller('DietController', function ($scope) {
    $scope.dietCircle = function (id, size, min) {
        var bg = document.getElementById(id);
        var ctx = ctx = bg.getContext('2d');
        var image = new Image();
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        var draw = function (current) {
            ctx.beginPath();
            //need to center based on height and width
            ctx.arc(bg.width/2, bg.height/2, 70, -(quart), ((circ) * current) - quart, false);
            ctx.stroke();
        }       
        if (size >= min && (id != 'sweets' && id != 'fatsoils')) {
            image.src = '../img/food/star.png';
            image.onload = function () {
                ctx.drawImage(image, (bg.width / 2)/2, (bg.height / 2)/2, bg.width / 2, bg.height / 2);
            }
        }
        if (size == 100 && (id != 'sweets' && id != 'fatsoils')) {
            image.src = '../img/food/crown.png';
            ctx.clearRect(0, 0, bg.width, bg.height);
            image.onload = function () {
                ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
            }
        }
        if ((size >= min || size == 100) && (id == 'sweets' || id == 'fatsoils')) {
            image.src = '../img/food/sadface.png';
            image.onload = function () {
                ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
            }
        }
        ctx.lineWidth = 10.0;
        //draw background line
        ctx.strokeStyle = '#b5b5b5';
        draw(1);
        //draw progress line
        if (id == 'sweets' || id == 'fatsoils') {
            ctx.strokeStyle = '#bb1a1d';
        }
        else { ctx.strokeStyle = '#2486ae'; }    
        draw(size / 100);

    };
})

.controller('ContentController', function ($scope, $ionicSideMenuDelegate) {
    $scope.toggleLeft = function () {
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

    $scope.showFoodFluid = function (food, fluid, hp1, hp2, f1, f2) {
        $scope.choice = $ionicPopup.show({
            template: '<style>.popup { height:400px; }</style>' +
                        '<div class="text-center">' +
                        '<img src="../img/food/' + food + '" ng-click="showFoodAmount()" style="width:100px; height:100px" />' +
                        '<img src="../img/food/' + fluid + '" ng-click="showFluidAmount()" style="width:100px; height:100px" />' +
                      '</div>',
            title: 'What did you eat?',
            scope: $scope
        });
        $scope.showFoodAmount = function () {
            ffAmountPopup = $ionicPopup.show({
                template: '<style>.popup { height:400px; }</style>' +
                          '<div class="row" ng-controller="AddSubController">' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="width:75px; height:100px;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="width:75px; height:100px;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  { text: 'Save', onTap: function (e) { return 'Saved'; } },
                  { text: 'Cancel', onTap: function (e) { return 'Cancel'; } }
                ]
            });
            ffAmountPopup.then(function (res) {
                $scope.choice.close();
            });
        };
        $scope.showFluidAmount = function () {
            ffAmountPopup = $ionicPopup.show({
                template: '<style>.popup { height:400px; }</style>' +
                          '<div class="row" ng-controller="AddSubController">' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + f1 + '" style="width:75px; height:100px;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + f2 + '" style="width:75px; height:100px;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  { text: 'Save', onTap: function (e) { return 'Saved'; } },
                  { text: 'Cancel', onTap: function (e) { return 'Cancel'; } }
                ]
            });
            ffAmountPopup.then(function (res) {
                $scope.choice.close();
            });
        };
    };
    $scope.showAmount = function (type, hp1, hp2) {
        $ionicPopup.show({
            template: '<style>.popup { height:400px; }</style>' +
                      '<div class="row" ng-controller="AddSubController">' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="width:75px; height:100px;"/></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="width:75px; height:100px;" /></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/tanminus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/tanplus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                       '</div>',
            title: 'How much did you ' + type + '?',
            buttons: [
              { text: 'Save', onTap: function (e) { return 'Saved'; } },
              { text: 'Cancel', onTap: function (e) { return 'Cancel'; } }
            ]
        });
    };
})

.controller('PopOverController', function ($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    $scope.$on('popover.removed', function () {
        // Execute action
    });
})

.controller('AddSubController', function ($scope) {
    $scope.plusMinus = function (pm, id) {
        var countEl = document.getElementById(id).innerHTML;
        if (pm == 'plus') {
            countEl++;
            document.getElementById(id).innerHTML = countEl;
        }
        if (pm == 'minus' && countEl > 0) {
            countEl--;
            document.getElementById(id).innerHTML = countEl;
        }
    }
    $scope.clear = function (id, num) {
        document.getElementById(id).innerHTML = num;
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
        if (totalHours.value > 0) {
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
        document.getElementById("face").src = "../img/painScale/" + face + ".png";
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
})

.controller('CameraController', function ($scope) {
    $scope.takePicture = function () {
        console.log('e');
        navigator.camera.getPicture(function (imageURI) {
            // imageURI is the URL of the image that we can use for
            // an <img> element or backgroundImage.
            var image = document.getElementById("image");
            image.src = imageURI;
        }, function (err) {
            console.log('error');
        }, cameraOptions);
    }
});