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
        window.localStorage.removeItem('trackType');
        window.localStorage.removeItem('date');
        window.location = "../index.html";
    };
    //Inbox Footer Links
    $scope.inboxAsk = function () {
        window.location = "inboxAsk.html";
    };
    //Track Link
    $scope.goToHistory = function (type) {
        window.localStorage.setItem('trackType', type)
        window.location = 'history.html';
    };
    $scope.goToAct = function (act) {
        window.localStorage.setItem('selectAct', act)
        window.location = 'addActivityTime.html';
    };
    $scope.goToAddEvent = function (type) {
        window.location = type + ".html";
    };
    //Inbox Link
    $scope.goToMessage = function (type) {
        window.localStorage.setItem('recipient', type)
        window.location = "message.html";
    };
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
            ctx.arc(bg.width / 2, bg.height / 2, 70, -(quart), ((circ) * current) - quart, false);
            ctx.stroke();
        }
        if (size >= min && (id != 'sweets' && id != 'fatsoils')) {
            image.src = '../img/food/star.png';
            image.onload = function () {
                ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
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

.controller('CouponController', function ($scope, $ionicPopup, $timeout, $compile) {
    $scope.showClasses = function () {
        var db = PouchDB('http://localhost:5984/momlink');
        var html = '';
        db.get('classes').then(function (doc) {
            classes = doc['class'];
            statuses = doc['status'];
            html += '<div class="list">';
            for (i in classes) {
                if (i == 0) {
                    //if all statuses != register? set innerHTML = Complete
                    html += '<div class="item item-divider">Prenatal Platinum Plan - Crib</div>'
                }
                if (i == 12) {
                    html += '<div class="item item-divider">Prenatal Platinum Plan - Infant Carrier</div>'
                }
                html += '<div class="item item-button-right">';
                html += classes[i];
                if (statuses[i] == 'Register') {
                    color = 'button-positive';
                }
                else {
                    color = 'button-stable';
                }
                html += `<button class="button button-small ` + color + `" ng-click="showDates(` + `'` + classes[i] + `'` + `,'` + statuses[i] + `'` + `)">` + statuses[i] + '</button>';
                console.log();
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('classes').innerHTML = html;
            $compile(document.getElementById('classes'))($scope);
        });
    };
    $scope.showDates = function (className, status) {
        //dates and info will be pulled from PNCCs
        var dates = ['04/16/2016', '04/17/2016', '04/18/2016', '04/19/2016']
        var info = {};
        info['04/16/2016'] = ['Venue1', '04/16/2016', '12:00', 'Instructor1'];
        info['04/17/2016'] = ['Venue1', '04/17/2016', '12:00', 'Instructor2'];
        info['04/18/2016'] = ['Venue1', '04/18/2016', '12:00', 'Instructor3'];
        info['04/19/2016'] = ['Venue1', '04/19/2016', '12:00', 'Instructor4'];

        if (status == 'Register') {
            //get dates based on class
            html = `<div class="list">`;
            for (var i in dates) {
                html += `<div class="item item-button-right">` + dates[i] + `<button class="button button-small button-positive" ng-click="showInfo(` + `'` + className + `'` + `,'` + dates[i] + `'` + `)">View</button></div>`;
            }
            html += `</div>`;
            //show dates
            $scope.choice = $ionicPopup.show({
                template: html,
                title: 'Classes',
                buttons: [{ text: 'Cancel', onTap: function (e) { return 'Cancel'; } }],
                scope: $scope
            });

            //show info for date
            $scope.showInfo = function (className, date) {
                //get info for date
                display = info[date];
                html2 = `<div class="list">`;
                html2 += `<div class="item">Venue: ` + display[0] + `</div>`;
                html2 += `<div class="item">Date: ` + display[1] + `</div>`;
                html2 += `<div class="item">Time: ` + display[2] + `</div>`;
                html2 += `<div class="item">Instructor: ` + display[3] + `</div>`;
                html2 += `</div>`;
                infoPopup = $ionicPopup.show({
                    template: html2,
                    title: 'Information',
                    buttons: [
                      {
                          text: 'Register', onTap: function (e) {
                              //database stuff
                              //get index of class
                              var db = PouchDB('http://localhost:5984/momlink');
                              db.get('classes').then(function (doc) {
                                  var index;
                                  classes = doc['class'];
                                  for (i in classes) {
                                      if (className == classes[i]) {
                                          index = i;
                                      }
                                  }
                                  doc['status'][index] = 'Registered';
                                  doc['venue'][index] = display[0];
                                  doc['date'][index] = display[1];
                                  doc['time'][index] = display[2];
                                  doc['instructor'][index] = display[3];
                                  return db.put(doc).then(function (doc) {
                                      $scope.showClasses();
                                  })
                              });
                              return 'Saved';
                          }
                      },
                      { text: 'Cancel', onTap: function (e) { return 'Cancel'; } }
                    ]
                });
                infoPopup.then(function (res) {
                    $scope.choice.close();
                });
            };
        }
        else {
            var html2;
            var db = PouchDB('http://localhost:5984/momlink');
            db.get('classes').then(function (doc) {
                var index;
                classes = doc['class'];
                for (i in classes) {
                    if (className == classes[i]) {
                        index = i;
                    }
                }
                html2 = `<div class="list">`;
                html2 += `<div class="item">Venue: ` + doc['venue'][index] + `</div>`;
                html2 += `<div class="item">Date: ` + doc['date'][index] + `</div>`;
                html2 += `<div class="item">Time: ` + doc['time'][index] + `</div>`;
                html2 += `<div class="item">Instructor: ` + doc['instructor'][index] + `</div>`;
                html2 += `</div>`;
            }).then(function (doc) {
                showInfo = $ionicPopup.show({
                    template: html2,
                    title: 'Information',
                    buttons: [
                      { text: 'Close', onTap: function (e) { return 'Close'; } }
                    ]
                });
            });
        };
    };
    $scope.showInventory = function () {
        $ionicPopup.show({
            template: '<style>.popup { height:400px; width:95%; }</style>' +
                      `<div ng-controller="DataController">
                       <div class="row">
                                <div class="col text-left">
                                    <u style="font-size:large;">Item</u>
                                </div>
                                <div class="col text-right">
                                    <u style="font-size:large;">Price</u>
                                </div>
                            </div>
                            <ul>
                                <li ng-repeat="item in inventoryList">
                                    <div class="row">
                                        <div class="col-75">
                                            <p style="font-size:large">{{item.item}}</p>
                                        </div>
                                        <div class="col-25 text-right">
                                            <p class="inline" style="font-size:large; vertical-align:middle;">{{item.price}} </p>
                                            <img class="inline" src="../img/mainIcons/momlink_icon-20.png" style="width:20px; height:20px;" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>`,
            title: 'Inventory',
            buttons: [
              { text: 'Close', onTap: function (e) { return 'Close'; } }
            ]
        });
    };
})

.controller('DBController', function ($scope) {
    var today = new Date();
    getDate = function () {
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        date = mm + '/' + dd + '/' + yyyy;
        return date;
    }
    getTime = function () {
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }
        var time = hour + ':' + minute + ':' + second;
        return time;
    }
    $scope.submit = function (type) {
        var db = PouchDB('http://localhost:5984/momlink');
        value = document.getElementById('count').innerHTML;
        db.get('track').then(function (doc) {
            var element = {
                "uniqueId": new Date().toJSON(),
                "date": getDate(),
                "time": getTime(),
                "value": value
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            window.location = 'history.html';
        });
    }
})

.controller('HistoryController', function ($scope) {
    formatDate = function (d) {
        var t
        var date = d.getDate(),
        month = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",")[d.getMonth()];
        window.localStorage.setItem('date', d);
        function nth(d) {
            if (d > 3 && d < 21) return 'th';
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        }
        today = new Date();
        if (String(d).substring(0, 15) == String(today).substring(0, 15)) {
            t = "Today, " + month + " " + date + nth(date) + " " + d.getFullYear();
        }
        else {
            t = month + " " + date + nth(date) + ", " + d.getFullYear();
        }
        return t;
    };
    $scope.increaseDate = function () {
        var d = new Date(window.localStorage.getItem('date'));
        d.setDate(d.getDate() + 1)
        document.getElementById("todaysDate").innerHTML = formatDate(d);
    };
    $scope.decreaseDate = function () {
        var d = new Date(window.localStorage.getItem('date'));
        d.setDate(d.getDate() - 1)
        document.getElementById("todaysDate").innerHTML = formatDate(d);
    };

    $scope.loadHistory = function () {
        var type;
        switch (window.localStorage.getItem('trackType')) {
            case 'addBabyHeartRate':
                type = 'BHR';
                break;
            case 'addBloodGlucose':
                type = 'BG';
                break;
            case 'addBloodIron':
                type = 'BI';
                break;
            case 'addBloodPressure':
                type = 'BP';
                break;
            case 'addKicks':
                type = 'K';
                break;
            case 'addWeight':
                type = 'W';
                break;
        }
        var db = PouchDB('http://localhost:5984/momlink');
        db.get('track').then(function (doc) {
            var date = new Date(window.localStorage.getItem('date'));
            date = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
            var hist = '';
            elements = doc[type]
            for (var i in elements) {
                if (date == elements[i]["date"]) {
                    hist += '<center><div class="item">Time: ' + elements[i]["time"] + '&nbsp; &nbsp; &nbsp; ' + type + ': ' + elements[i]["value"] + '</div></center>';
                }
            }
            //if date has no values, then display default image
            if (hist == '') {
                hist += `<div class="row">`;
                hist += `<div class="col text-center">`;
                hist += '<img src="../img/temp/downArrow.png" style="height:auto;width:auto"/>'
                hist += `</div></div>`;
            }
            document.getElementById('history').innerHTML = hist;
        })
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
})

.controller('DataController', function ($scope, $ionicSideMenuDelegate) {
    $scope.updateAmount = function () {
        document.getElementById('amount').innerHTML = Object.keys($scope.couponList).length + 'x';
    }
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
    $scope.articleList = [
      { image: "../img/temp/article.jpg", description: "Article 1 Description...", link: "" },
      { image: "../img/temp/article.jpg", description: "Article 2 Description...", link: "" },
      { image: "../img/temp/article.jpg", description: "Article 3 Description...", link: "" },
      { image: "../img/temp/article.jpg", description: "Article 4 Description...", link: "" },
    ]
    $scope.couponList = [
      { date: "4/15/2016", plan: "Platinum", recieved: "BABE Class" },
      { date: "4/15/2016", plan: "Platinum", recieved: "BABE Class" },
      { date: "4/15/2016", plan: "Platinum", recieved: "BABE Class" },
      { date: "4/15/2016", plan: "Platinum", recieved: "BABE Class" }
    ]
    $scope.notesList = [
      { subject: "Note Subject", description: "This is a description" }
    ]
    $scope.stressList = [
      { type: "Family/Relationships", image: "" },
      { type: "Housing", image: "" },
      { type: "Finances", image: "" },
      { type: "Domestic Violence", image: "" },
      { type: "Material Needs", image: "" }
    ]
    $scope.referList = [
      { name: "First Last", referDate: "3/22/2016", address: "123 Street, Chicago IL, 60290", phone: "555-555-5555", email: "firstLast@email.com" },
      { name: "First Last", referDate: "3/22/2016", address: "123 Street, Chicago IL, 60290", phone: "555-555-5555", email: "firstLast@email.com" }
    ]
    $scope.pnccList = [
      { name: "PNCC1", email: "pncc1@gmail.com", image: "../img/temp/pncc1.jpg" },
      { name: "PNCC2", email: "pncc2@gmail.com", image: "../img/temp/pncc2.jpg" },
      { name: "PNCC3", email: "pncc3@gmail.com", image: "../img/temp/pncc3.jpg" }
    ]
    $scope.inventoryList = [
      { item: "Baby Carrier", price: "7" },
      { item: "Baby Wipes", price: "1" },
      { item: "Baby Lotion", price: "1" },
      { item: "Baby Wash", price: "1" },
      { item: "Bath Tub", price: "7" },
      { item: "Bibs", price: "1" },
      { item: "Blankets - Large", price: "2-3" },
      { item: "Blankets - Small", price: "1" },
      { item: "Booster Seat", price: "7" },
      { item: "Boppy", price: "8" },
      { item: "Breastfeeding Pads", price: "2" },
      { item: "Breastfeeding Cover Ups", price: "3" },
      { item: "Breastfeeding Storage Bags", price: "2" },
      { item: "Breastfeeding Lotion", price: "2" },
      { item: "Cabinet Locks", price: "1" },
      { item: "Clothing - New", price: "2-4" },
      { item: "Clothing - Old", price: "1" },
      { item: "Crib Sheets", price: "2" },
      { item: "Diapers", price: "1" },
      { item: "Diaper Bags - Large", price: "8" },
      { item: "Diaper Bags - Small", price: "7" },
      { item: "High Chairs", price: "14" },
      { item: "Hooded Towels", price: "3" },
      { item: "Nail Clippers", price: "1" },
      { item: "Nasal Aspirator", price: "1" },
      { item: "Outlet Covers", price: "1" },
      { item: "Pack-N-Play", price: "14" },
      { item: "Pack-N-Play Sheets", price: "2" },
      { item: "Potty Chair - Large", price: "7" },
      { item: "Potty Chair - Small", price: "6" },
      { item: "Scratch Mittens", price: "1" },
      { item: "Sippy Cups", price: "1" },
      { item: "Snack Cups", price: "1" },
      { item: "Strollers", price: "14" },
      { item: "Thermometers", price: "1" },
      { item: "Underwear", price: "1" },
      { item: "Washcloths", price: "2" }
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
      { type: "Stressors", link: "addStress", image: "../img/temp/stress.png" },
      { type: "Weight", link: "addWeight", image: "../img/temp/scale.jpg" }
    ]
});
