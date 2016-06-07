angular.module('momlink.controllers', [])

.controller('HeaderBarController', function ($scope, $ionicPopup, $location, $document, $compile) {
    backHistory = [];
    $scope.initializeBack = function () {
        document.addEventListener("backbutton", $scope.handleBack, false);
    }
    $scope.handleBack = function () {
        //create queue of previous pages to navigate back through
        //if backHistory is empty exit app
        if (backHistory.length == 0) {
            //exit app
        }
        else {
            lastPage = backHistory.pop();
            title = lastPage[0];
            page = lastPage[1];
            $scope.goToLink(page, title, false)
        }
    };

    $scope.showDate = function () {
        var d = new Date()
        date = d.getDate(),
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
        document.getElementById("todaysDate").innerHTML = "Today, " + month + " " + date + nth(date) + " " + d.getFullYear();
    };

    $scope.showDate = function () {
        var d = new Date()
        date = d.getDate(),
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
        document.getElementById("todaysDate").innerHTML = "Today, " + month + " " + date + nth(date) + " " + d.getFullYear();
    };

    currentPage = 'home.html';
    $scope.goToLink = function (page, title, history) {
        //will not include history when tabbing back
        if (history != false) {
            //get current page and title before moving to new page
            if (document.getElementById('title') != null) {
                var histPage = currentPage;
                var histTitle = document.getElementById('title').innerHTML
                //add page to history
                backHistory.push([histTitle, histPage])
                currentPage = page;
            }
        }
        //move to new page       
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', page, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("content").innerHTML = xhr.responseText;
                if (title != null) {
                    document.getElementById('title').innerHTML = title;
                }
                $compile(document.getElementById('content'))($scope);
            }
        }
        xhr.send();
    };

    $scope.toggleTopMenu = function () {
        var menu = document.getElementsByTagName('ion-top-menu')[0];
        var pane = document.getElementsByTagName('ion-pane')[0];
        //change icon color
        if (document.getElementById('menuIcon').classList.contains('menu-icon')) {
            document.getElementById('menuIcon').classList.remove('menu-icon')
        }
        else {
            document.getElementById('menuIcon').classList.add('menu-icon')
        }
        //raise/lower menu
        menu.style.height = pane.style.top = (menu.offsetHeight == 0) ? '340px' : '0px';
    };
    $scope.closeTopMenu = function () {
        var menu = document.getElementsByTagName('ion-top-menu')[0];
        if (menu.offsetHeight == 340) {
            $scope.toggleTopMenu();
        }
    };

    //Menu Links
    $scope.autoLogin = function () {
        //if they've logged in previously, skip the login screen
        document.addEventListener("deviceready", function () {
            if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
                window.location = "templates/main.html";
            }
            else {
                //add this in to remove white flash
                //$(window).bind("load", function () {
                navigator.splashscreen.hide()
                //});
            }
        });
    };
    $scope.removeSplash = function () {
        //wait until the page has loaded to remove the splash screen{
        document.addEventListener("deviceready", function () {
            navigator.splashscreen.hide()
        });
    };
    $scope.login = function (user, pass) {
        var db = PouchDB('momlink');
        db.get('loginInfo').then(function (doc) {
            if (user == doc['username'] && pass == doc['password']) {

                window.localStorage.setItem('username', doc['username'])
                window.localStorage.setItem('password', doc['password'])

                //set username and password variables
                window.location = "templates/main.html";
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Your username or password is incorrect'
                });
            }
        });
    };
    $scope.logout = function () {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        window.localStorage.removeItem('trackType');
        window.localStorage.removeItem('date');
        window.location = "../index.html";
    };
    //Track Links
    $scope.goToHistory = function (type) {
        window.localStorage.setItem('trackType', type)
        $scope.goToLink('history.html', 'History')
    };
    $scope.goToAddEvent = function () {
        var type = window.localStorage.getItem('trackType');
        title = type.split(/(?=[A-Z])/).splice(1, 100)
        title = title.join(' ')
        $scope.goToLink(type + ".html", 'Add ' + title);
    };
    $scope.goToAct = function (act) {
        window.localStorage.setItem('selectAct', act)
        $scope.goToLink('addActivityTime.html', 'Add Activity Time');
    };
    //Inbox Link
    $scope.goToMessage = function (email, link, title) {
        window.localStorage.setItem('recipient', email);
        $ionicPopup.show({
            title: email,
            templateUrl: 'messagePopup.html',
            buttons: [
              {
                  text: 'Send', onTap: function (e) {
                      $scope.goToLink(link, title);
                      return 'Create';
                  },
                  type: 'button-positive'
              },
            {
                text: 'Cancel', onTap: function (e) { return 'Close'; },
                type: 'button-stable'
            }
            ],
        });
    };
    //Create Event
    $scope.createEvent = function (link, title) {
        $ionicPopup.show({
            title: 'Create Event',
            templateUrl: 'eventPopup.html',
            buttons: [
              {
                  text: 'Create Event', onTap: function (e) {
                      var db = PouchDB('momlink');
                      switch ($("#type").val()) {
                          case 'OB Appt':
                              color = 'blue';
                              break;
                          case 'Test':
                              color = 'red';
                              break;
                          case 'Visit':
                              color = 'green';
                              break;
                          case 'Ultra':
                              color = 'orange';
                              break;
                          case 'Class':
                              color = 'purple';
                              break;
                          case 'Other':
                              color = 'black';
                              break;
                      }
                      start = $('#date').val() + "T" + $('#start').val();
                      end = $('#date').val() + "T" + $('#end').val();
                      db.get('events').then(function (doc) {
                          var event = {
                              "title": $('#name').val(),
                              "type": $("#type").val(),
                              "start": start,
                              "end": end,
                              "venue": $('#venue').val(),
                              "description": $('#description').val(),
                              "color": color,
                              "scheduledBy": '0'
                          };
                          doc['E'].push(event);
                          return db.put(doc);
                      }).then(function (doc) {
                          $scope.goToLink(link, title);
                      });
                      return 'Create';
                  },
                  type: 'button-positive'
              },
            {
                text: 'Cancel', onTap: function (e) { return 'Close'; },
                type: 'button-stable'
            }
            ],
        });
    };
})

.controller('DietController', function ($scope, $ionicPopup) {
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
    $scope.showFoodFluid = function (food, fluid, hp1, hp2, f1, f2) {
        $scope.choice = $ionicPopup.show({
            template: '<div class="text-center">' +
                        '<img src="../img/food/' + food + '" ng-click="showFoodAmount()" style="width:100px; height:100px" />' +
                        '<img src="../img/food/' + fluid + '" ng-click="showFluidAmount()" style="width:100px; height:100px" />' +
                      '</div>',
            title: 'What did you eat?',
            scope: $scope
        });
        $scope.showFoodAmount = function () {
            ffAmountPopup = $ionicPopup.show({
                template: '<div class="row" ng-controller="AddSubController">' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="width:75px; height:100px;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="width:75px; height:100px;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  {
                      text: 'Save', onTap: function (e) { return 'Saved'; },
                      type: 'button-positive'
                  },
                  {
                      text: 'Cancel', onTap: function (e) { return 'Cancel'; },
                      type: 'button-positive'
                  }
                ]
            });
            ffAmountPopup.then(function (res) {
                $scope.choice.close();
            });
        };
        $scope.showFluidAmount = function () {
            ffAmountPopup = $ionicPopup.show({
                template: '<div class="row" ng-controller="AddSubController">' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + f1 + '" style="width:75px; height:100px;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + f2 + '" style="width:75px; height:100px;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  {
                      text: 'Save', onTap: function (e) { return 'Saved'; },
                      type: 'button-positive'
                  },
                  {
                      text: 'Cancel', onTap: function (e) { return 'Cancel'; },
                      type: 'button-positive'
                  }
                ]
            });
            ffAmountPopup.then(function (res) {
                $scope.choice.close();
            });
        };
    };
    $scope.showAmount = function (type, hp1, hp2) {
        $ionicPopup.show({
            template: '<div class="row" ng-controller="AddSubController">' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="width:75px; height:100px;"/></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="width:75px; height:100px;" /></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/handportions/tanminus.PNG" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/handportions/tanplus.PNG" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                       '</div>',
            title: 'How much did you ' + type + '?',
            buttons: [
              {
                  text: 'Save', onTap: function (e) { return 'Saved'; },
                  type: 'button-positive'
              },
              {
                  text: 'Cancel', onTap: function (e) { return 'Cancel'; },
                  type: 'button-positive'
              }
            ]
        });
    };
})

.controller('CalendarController', function ($scope, $ionicPopup) {
    $scope.showCalendar = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            $('#calendar').fullCalendar({
                height: "auto",
                header: {
                    left: 'prev,next, today',
                    center: 'title',
                    right: 'basicDay, basicWeek, month'
                },
                defaultView: 'basicDay',
                events: doc['E'],
                eventRender: function (event, element) {
                    element.click(function () {
                        //format date and time
                        var date = String(event.start._d).split(' ').slice(0, 4);
                        date = String(date).split(',').join(' ');
                        var startTime = String(event.start._i).substr(String(event.start._i).indexOf("T") + 1);
                        var endTime = String(event.end._i).substr(String(event.end._i).indexOf("T") + 1);
                        //view event
                        var alertPopup = $ionicPopup.show({
                            title: event.title,
                            template:
                                '<p><b>' + event.type + '</b></p>' +
                                '<p><b>Date</b>: ' + date + '</p>' +
                                '<p><b>Start</b>: ' + startTime + '</p>' +
                                '<p><b>End</b>: ' + endTime + '</p>' +
                                '<p><b>Venue</b>: ' + event.venue + '</p>' +
                                '<p><b>Description</b>: ' + event.description + '</p>',
                            buttons: [
                              {
                                  text: 'Close', onTap: function (e) { return 'Cancel'; },
                                  type: 'button-positive'
                              }
                            ],
                        });
                    })
                    return ['all', event.scheduledBy].indexOf($('#filter').val()) >= 0
                }
            })
        });

        $('#filter').on('change', function () {
            $('#calendar').fullCalendar('rerenderEvents');
        })
    };
})

.controller('InboxController', function ($scope, $compile, $ionicPopup) {
    $scope.showReferralContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('referrals').then(function (doc) {
            referrals = doc['R'];
            html += '<div class="list">';
            for (i in referrals) {
                html += `<div class="item item-thumbnail-left" ng-click="goToMessage('` + referrals[i]['email'] + `', 'inbox.html', 'Inbox')">`;
                html += `<img src="">`;
                html += '<h2>' + referrals[i]['name'] + '</h2>';
                html += '<p>' + referrals[i]['email'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('referrals').innerHTML = html;
            $compile(document.getElementById('referrals'))($scope);
        });
    };
    $scope.showPNCCContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('inbox').then(function (doc) {
            pncc = doc['pncc'];
            html += '<div class="list">';
            for (i in pncc) {
                html += `<div class="item item-thumbnail-left" ng-click="goToMessage('` + pncc[i]['email'] + `', 'inbox.html', 'Inbox')">`;
                html += `<img src="` + pncc[i]['image'] + `">`;
                html += '<h2>' + pncc[i]['name'] + '</h2>';
                html += '<p>' + pncc[i]['email'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('pncc').innerHTML = html;
            $compile(document.getElementById('pncc'))($scope);
        });
    };
})

.controller('CouponController', function ($scope, $ionicPopup, $timeout, $compile) {
    $scope.showPlans = function () {
        html = `<div class="item item-divider">Plans</div>
                <div class="item item-thumbnail-left" ng-click="showClasses('crib')">
                <img src="../img/temp/crib.PNG">
                <h2>Prenatal Platinum Plan</h2>
                <p>Crib</p>
                </div>
                <div class="item item-thumbnail-left" ng-click="showClasses('infantCarrier')">
                <img src="../img/temp/infantCarrier.PNG">
                <h2>Prenatal Platinum Plan</h2>
                <p>Infant Carrier</p>
                </div>`
        document.getElementById('classes').innerHTML = html;
        $compile(document.getElementById('classes'))($scope);
    };
    $scope.showClasses = function (planType) {
        var db = PouchDB('momlink');
        var html = '';
        var type = 'Infant Carrier';
        if (planType == 'crib') {
            type = 'Crib';
        }
        db.get('classes').then(function (doc) {
            classes = doc[planType];
            html += '<div class="list">';
            html += '<div class="item item-button-left" style="background-color: #f5f5f5;">Prenatal Platinum Plan - ' + type + '<button class="button icon button-icon ion-ios-undo" ng-click="showPlans()"></button></div>';
            for (i in classes) {
                html += '<div class="item item-button-right">';
                html += classes[i]['class'] + ' ' + '(' + classes[i]['number'] + ')';
                if (classes[i]['status'] == 'Register') {
                    color = 'button-positive';
                }
                else {
                    color = 'button-stable';
                }
                html += `<button class="button button-small ` + color + `" ng-click="showDates(` + `'` + classes[i]['class'] + classes[i]['number'] + `'` + `,'` + classes[i]['status'] + `',` + `'` + planType + `'` + `)">` + classes[i]['status'] + '</button>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('classes').innerHTML = html;
            $compile(document.getElementById('classes'))($scope);
        });
    };
    $scope.showDates = function (className, status, planType) {
        //dates and info will be pulled from PNCCs
        var dates = ['04/16/2016', '04/17/2016', '04/18/2016', '04/19/2016']
        var info = {};
        info['04/16/2016'] = ['Venue1', '04/16/2016', '12:00', 'Instructor1'];
        info['04/17/2016'] = ['Venue2', '04/17/2016', '12:00', 'Instructor2'];
        info['04/18/2016'] = ['Venue3', '04/18/2016', '12:00', 'Instructor3'];
        info['04/19/2016'] = ['Venue4', '04/19/2016', '12:00', 'Instructor4'];
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
                              //get index of class
                              var db = PouchDB('momlink');
                              db.get('classes').then(function (doc) {
                                  var index;
                                  classes = doc[planType];
                                  for (i in classes) {
                                      if (className == (classes[i]['class'] + classes[i]['number'])) {
                                          classes[i]['status'] = 'Registered';
                                          classes[i]['venue'] = display[0];
                                          classes[i]['date'] = display[1];
                                          classes[i]['time'] = display[2];
                                          classes[i]['instructor'] = display[3];
                                      }
                                  }
                                  return db.put(doc).then(function (doc) {
                                      $scope.showClasses(planType);
                                  })
                              });
                              $scope.choice.close();
                              return 'Saved';
                          }
                      },
                      { text: 'Cancel', onTap: function (e) { return 'Cancel'; } }
                    ]
                });
                infoPopup.then(function (res) {

                });
            };
        }
        else {
            var html2;
            var db = PouchDB('momlink');
            db.get('classes').then(function (doc) {
                var index;
                classes = doc[planType];
                for (i in classes) {
                    if (className == (classes[i]['class'] + classes[i]['number'])) {
                        html2 = `<div class="list">`;
                        html2 += `<div class="item">Venue: ` + classes[i]['venue'] + `</div>`;
                        html2 += `<div class="item">Date: ` + classes[i]['date'] + `</div>`;
                        html2 += `<div class="item">Time: ` + classes[i]['time'] + `</div>`;
                        html2 += `<div class="item">Instructor: ` + classes[i]['instructor'] + `</div>`;
                        html2 += `</div>`;
                    }
                }
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
    $scope.recievedCoupons = function () {
        divStatus = document.getElementById('Recieved').innerHTML;
        if (divStatus == '') {
            //pull active coupons from database
            //html = database stuff
            var html = '';
            var db = PouchDB('momlink');
            db.get('coupons').then(function (doc) {
                coupons = doc['recieved'];
                for (i in coupons) {
                    html += `<div class="item item-divider">Coupon</div>`;
                    html += `<div class="item">Date: ` + coupons[i]['date'] + `</div>`;
                    html += `<div class="item">Plan: ` + coupons[i]['plan'] + `</div>`;
                    html += `<div class="item">Recieved: ` + coupons[i]['for'] + `</div>`;
                    html += `</div>`;
                }
            }).then(function (doc) {
                document.getElementById('Recieved').innerHTML = html;
                document.getElementById('bRecieved').innerHTML = 'Close';
            });
        }
        else {
            document.getElementById('Recieved').innerHTML = '';
            document.getElementById('bRecieved').innerHTML = 'View';
        }
    };
    $scope.usedCoupons = function () {
        divStatus = document.getElementById('Used').innerHTML;
        if (divStatus == '') {
            //pull active coupons from database
            //html = database stuff
            var html = '';
            var db = PouchDB('momlink');
            db.get('coupons').then(function (doc) {
                coupons = doc['used'];
                for (i in coupons) {
                    html += `<div class="item item-divider">Coupon</div>`;
                    html += `<div class="item">Date: ` + coupons[i]['date'] + `</div>`;
                    html += `<div class="item">Plan: ` + coupons[i]['plan'] + `</div>`;
                    html += `<div class="item">Recieved: ` + coupons[i]['for'] + `</div>`;
                    html += `</div>`;
                }
            }).then(function (doc) {
                document.getElementById('Used').innerHTML = html;
                document.getElementById('bUsed').innerHTML = 'Close';
            });
        }
        else {
            document.getElementById('Used').innerHTML = '';
            document.getElementById('bUsed').innerHTML = 'View';
        }
    };
    $scope.updateAmount = function () {
        var db = PouchDB('momlink');
        db.get('coupons').then(function (doc) {
            coupons = doc['recieved'];
        }).then(function (doc) {
            document.getElementById('amount').innerHTML = coupons.length + 'x';
        });
    }
})

.controller('EducationController', function ($scope, $ionicPopup, $timeout, $compile) {
    $scope.showShared = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('articles').then(function (doc) {
            shared = doc['shared'];
            html += '<div class="list">';
            for (i in shared) {
                html += '<div class="item item-thumbnail-left">';
                html += `<img onclick="window.open('` + shared[i]['link'] + `', '_system')" src="../img/temp/article.jpg">`;
                html += '<h2>' + shared[i]['title'] + '</h2>';
                html += '<p>' + shared[i]['description'] + '</p>';
                html += `<button class="button button-small button-positive" ng-click="read('` + shared[i]['link'] + `')">Read</button>&nbsp;&nbsp;<button class="button button-small button-calm" ng-click="didntRead('` + shared[i]['link'] + `')">Didn\'t Read</button>`;
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('shared').innerHTML = html;
            $compile(document.getElementById('shared'))($scope);
        });
    };
    $scope.showHistory = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('articles').then(function (doc) {
            history1 = doc['history'];
            html += '<div class="list">';
            for (i in history1) {
                html += '<div class="item item-thumbnail-left">';
                html += `<img onclick="window.open('` + history1[i]['link'] + `', '_system')" src="../img/temp/article.jpg">`;
                html += '<h2>' + history1[i]['title'] + '</h2>';
                html += '<p>' + history1[i]['description'] + '</p>';
                if (history1[i]['read'] == 'Yes') {
                    html += '<p>Read for: ' + history1[i]['length'] + ' minutes</p>';
                    html += '<p>' + history1[i]['date'] + '</p>';
                }
                else {
                    html += '<p>Didn\'t Read</p>';
                }
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('history').innerHTML = html;
            $compile(document.getElementById('history'))($scope);
        });
    };
    $scope.read = function (link) {
        var db = PouchDB('momlink');
        var index = 0;
        //ask how long they read
        $ionicPopup.prompt({
            title: 'Time Spent Reading Article (Minutes)',
            inputType: 'number',
        }).then(function (res) {
            //if they hit 'cancel' then do nothing
            if (String(res) != 'undefined') {
                db.get('articles').then(function (doc) {
                    //get article         
                    shared = doc['shared'];
                    for (i in shared) {
                        if (shared[i]['link'] == link) {
                            index = i;
                        }
                    }
                    //get date
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //January is 0
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    today = mm + '/' + dd + '/' + yyyy;
                    //add info
                    var article = {
                        "title": doc['shared'][index]['title'],
                        "description": doc['shared'][index]['description'],
                        "link": doc['shared'][index]['link'],
                        "read": 'Yes',
                        "length": res,
                        "date": today,
                    };
                    //move to history
                    doc['history'].push(article);
                    //delete from shared
                    doc['shared'].splice(index, 1);
                    return db.put(doc);
                }).then(function (doc) {
                    $scope.goToLink('education.html', 'Education');
                });
            }
        });
    };
    $scope.didntRead = function (link) {
        var db = PouchDB('momlink');
        var index = 0;
        db.get('articles').then(function (doc) {
            //get article         
            shared = doc['shared'];
            for (i in shared) {
                if (shared[i]['link'] == link) {
                    index = i;
                }
            }
            //add info
            var article = {
                "title": doc['shared'][index]['title'],
                "description": doc['shared'][index]['description'],
                "link": doc['shared'][index]['link'],
                "read": 'No',
                "length": '',
                "date": '',
            };
            //move to history
            doc['history'].push(article);
            //delete from shared
            doc['shared'].splice(index, 1);
            return db.put(doc);
        }).then(function (doc) {
            $scope.goToLink('education.html', 'Education');
        });
    };
})

.controller('ReferralController', function ($scope, $ionicPopup, $timeout, $compile) {
    $scope.showReferrals = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('referrals').then(function (doc) {
            referrals = doc['R'];
            html += '<div class="list">';
            for (i in referrals) {
                html += '<div class="item item-thumbnail-left">';
                html += `<img src="">`;
                html += '<h2 style="display:inline; vertical-align: text-bottom">' + referrals[i]['name'] + '</h2>&nbsp;'
                html += '<a class="button button-small button-positive icon ion-ios-telephone-outline" ng-href="tel: ' + ('1-' + referrals[i]['phone']) + '" style="display:inline"></a>&nbsp;'
                html += `<a class="button button-small button-positive icon ion-ios-email-outline" ng-click="goToMessage('` + referrals[i]['email'] + `', 'referrals.html', 'Referrals')" style="display:inline"></a>`
                html += '<p>Referred on ' + referrals[i]['date'] + '</p>';
                html += '<p>Address: ' + referrals[i]['address'] + '</p>';
                html += '<p>Phone: ' + referrals[i]['phone'] + '</p>';
                html += '<p>Email: ' + referrals[i]['email'] + '</p>';
                if (referrals[i]['meeting'] == 'no') {
                    html += `<button class="button button-small button-positive" ng-click="schedule('` + referrals[i]['name'] + `')">Schedule Meeting</button>`;
                }
                else {
                    html += `<button class="button button-small button-stable" ng-click="">View Meeting</button>`;
                }

                html += '</div>';
            }
            html += '</div>';
            document.getElementById('referrals').innerHTML = html;
            $compile(document.getElementById('referrals'))($scope);
        });
    };
    $scope.schedule = function (name) {
        $ionicPopup.show({
            title: 'Schedule By',
            cssClass: 'popup-vertical-buttons',
            buttons: [
            {
                text: '  Call', onTap: function (e) {
                    //$scope.createEvent('referrals.html', 'Referrals').then(function (res) {
                    updateDatabase();
                    //})
                    return 'Call';
                },
                type: 'ion-ios-telephone-outline button-positive'
            },
            {
                text: '  Email', onTap: function (e) {
                    //$scope.createEvent('referrals.html', 'Referrals').then(function (res) {
                    updateDatabase();
                    //})
                    return 'Email';
                },
                type: 'ion-ios-email-outline button-positive'
            },
            {
                text: 'Cancel', onTap: function (e) { return 'Cancel'; },
                type: 'button-stable'
            }
            ],
        });

        function updateDatabase() {
            var db = PouchDB('momlink');
            var index = 0;
            db.get('referrals').then(function (doc) {
                //get referral         
                referral = doc['R'];
                for (i in referral) {
                    if (referral[i]['name'] == name) {
                        index = i;
                    }
                }
                //updated meeting status
                referral[index]['meeting'] = 'yes'
                //update database
                return db.put(doc);
            }).then(function (doc) {
                $scope.goToLink('referrals.html', 'Referrals');
            });
        }
    }
})

.controller('JournalController', function ($scope, $ionicPopup, $compile) {
    $scope.renderPhotoJournal = function () {
        var start;
        var end;
        var db = PouchDB('momlink');
        //get start/end date
        db.get('profile').then(function (doc) {
            start = doc['startDate'];
            end = doc['deliveryDate'];
            //if these values are null, say they must set start and end dates
        }).then(function (doc) {
            var html = '';
            var weekCounter = 1;
            //convert start/end date to moment
            today = moment()
            displayStart = moment(start)
            displayEnd = moment(end)
            //generate weeks until end/current date
            html += '<div class="row" style="padding-right:0; padding-left:0; padding-top:0">'
            do {
                //display Date formats starting and ending dates for the week
                displayDate = String(moment(displayStart).format('ddd MMM Do') + ` - ` + moment(displayStart.add(6, 'days')).format('ddd MMM Do'))
                displayStart.subtract(6, 'days');
                //highlight the current week
                if (displayStart <= today && displayStart.add(6, 'days') >= today) {
                    html += `<div class="col-33 text-center padding activeWeek" stlye="padding-bottom:0" ng-click="renderGallery('` + displayDate + `',` + weekCounter + `)"><b>Week:</b> ` + weekCounter + `<br>` + displayDate + `</div>`;
                }
                    //normal week
                else {
                    html += `<div class="col-33 text-center padding nonActiveWeek" stlye="padding-bottom:0" ng-click="renderGallery('` + displayDate + `',` + weekCounter + `)"><b>Week:</b> ` + weekCounter + `<br>` + displayDate + `</div>`;
                }
                //3 dates per column
                if (weekCounter % 3 == 0) {
                    html += '</div><div class="row" style="padding-right:0; padding-left:0">'
                }
                displayStart.add(1, 'days')
                weekCounter++;
            } while (displayStart <= today && displayStart <= displayEnd)
            html += '</div>'
            //keep current week for saving photos, decrement 1 to keep consistent
            weekCounter--;
            window.localStorage.setItem('currentWeek', weekCounter);
            document.getElementById('photoJournal').innerHTML = html;
            $compile(document.getElementById('photoJournal'))($scope);
        });
    }
    $scope.renderGallery = function (displayDate, week) {
        var colSpacer = 1;
        //generate header
        html = '<div class="item item-button-left" style="background-color:#f5f5f5;"><b>' + displayDate + '</b><button class="button icon button-icon ion-ios-undo" ng-click="renderPhotoJournal()"></button></div>';

        //populate space with photos from selected week
        html += '<div class="row" style="padding-right:0; padding-left:0; padding-top:0">'

        //get filesystem/get all pictures for the week
        var A = function (callback) {
            setTimeout(function () {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFS)
                function getFS(fileSystem) {
                    selectedWeek = 'Week' + String(week)
                    fileSystem.root.getDirectory(selectedWeek, { create: true, exclusive: false }, getDir)
                }
                //get directory
                var dirSize;
                var counter = 1;
                var colSpacer = 1;
                function getDir(dir) {
                    //get all pictures in the directory
                    var directoryReader = dir.createReader();
                    directoryReader.readEntries(success, fail);
                    function success(entries) {
                        if (entries.length == 0) {
                            callback()
                        }
                        dirSize = entries.length;
                        for (var i = 0; i < entries.length; i++) {
                            dir.getFile(entries[i]['name'], { create: false, exclusive: false }, getPic)
                        }
                    }
                    function fail(entries) {
                        console.log('fail')
                    }
                }
                //get file
                function getPic(pic) {
                    //add html img and append pic to it
                    html += `<div class="col-33" stlye="padding-bottom:0"><image src="` + pic.toURL() + `" style="height:100px; width:100%"></div>`;
                    if (counter >= dirSize) {
                        callback();
                    }
                    if (colSpacer % 3 == 0) {
                        html += `</div><div class="row" style="padding-right:0; padding-left:0">`;
                    }
                    colSpacer++;
                    counter++;
                }
            }, 200);
        };
        //end html string and recompile page
        var B = function () {
            html += '</div>';
            console.log(html)
            document.getElementById('photoJournal').innerHTML = html;
            $compile(document.getElementById('photoJournal'))($scope);
        };
        //need to wait until function A has finished before calling B
        A(function () {
            B();
        });
    }
    $scope.createNote = function (link, title) {
        $ionicPopup.show({
            title: 'Add Note',
            templateUrl: 'notePopup.html',
            buttons: [
              {
                  text: 'Add Note', onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('journal').then(function (doc) {
                          var note = {
                              "date": moment().format('MMMM Do YYYY'),
                              "subject": $('#subject').val(),
                              "description": $("#description").val()
                          };
                          doc['notes'].push(note);
                          return db.put(doc);
                      }).then(function (doc) {
                          $scope.goToLink(link, title);
                      });
                      return 'Add';
                  },
                  type: 'button-positive'
              },
            {
                text: 'Discard', onTap: function (e) { return 'Discard'; },
                type: 'button-stable'
            }
            ],
        });
    };
    $scope.showNotes = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('journal').then(function (doc) {
            notes = doc['notes'];
            html += '<div class="list">';
            for (i in notes) {
                html += '<div class="item">';
                html += '<h2 style="display:inline">' + notes[i]['subject'] + '</h2> &nbsp;';
                html += '<p style="display:inline">' + notes[i]['date'] + '</p>';
                html += '<p>' + notes[i]['description'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('notes').innerHTML = html;
            $compile(document.getElementById('notes'))($scope);
        });
    };
    $scope.showVisits = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('journal').then(function (doc) {
            visits = doc['visits'];
            html += '<div class="list">';
            for (i in visits) {
                html += '<div class="item">';
                html += '<h2 style="display:inline">' + visits[i]['subject'] + '</h2> &nbsp;';
                html += '<p style="display:inline">' + visits[i]['date'] + '</p>';
                html += '<p>' + visits[i]['description'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            document.getElementById('pnccVisits').innerHTML = html;
            $compile(document.getElementById('pnccVisits'))($scope);
        });
    };
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
        //diet is handled differently
        var el = window.localStorage.getItem('trackType');
        if (el == 'addFood') {
            $scope.goToLink('addFood.html', 'Diet')
        }
        else {
            var type;
            switch (window.localStorage.getItem('trackType')) {
                case 'addActivity':
                    type = 'A';
                    break;
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
                case 'addCaffeine':
                    type = 'CA';
                    break;
                case 'addCigarette':
                    type = 'CI';
                    break;
                case 'addFood':
                    type = 'D';
                    break;
                case 'addKicks':
                    type = 'K';
                    break;
                case 'addMood':
                    type = 'M';
                    break;
                case 'addPain':
                    type = 'PA';
                    break;
                case 'addPill':
                    type = 'PI';
                    break;
                case 'addStress':
                    type = 'S';
                    break;
                case 'addWeight':
                    type = 'W';
                    break;
            }
            var db = PouchDB('momlink');
            db.get('track').then(function (doc) {
                var date = new Date(window.localStorage.getItem('date'));
                date = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
                var hist = '';
                elements = doc[type]
                for (var i in elements) {
                    if (date == elements[i]["date"]) {
                        if (type == 'A') {
                            hist += '<center><div class="item">' + elements[i]["time"] + ' &nbsp; Act: ' + elements[i]["act"] + ' &nbsp; Length: ' + elements[i]["value"] + '</div></center>';
                        }
                        else {
                            hist += '<center><div class="item">Time: ' + elements[i]["time"] + '&nbsp; &nbsp; &nbsp; ' + elements[i]["value"] + '</div></center>';
                        }
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
    }
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
    $scope.setActive = function (type) {
        document.getElementById('count').classList.remove('activeBorder')
        document.getElementById('count2').classList.remove('activeBorder')
        document.getElementById(type).classList.add('activeBorder')
    }

    $scope.plusMinusBP = function (pm) {
        if (document.getElementById('count').classList.contains('activeBorder')) {
            active = 'count'
        }
        else {
            active = 'count2'
        }
        var countEl = document.getElementById(active).innerHTML;

        if (pm == 'plus') {
            countEl++;
            document.getElementById(active).innerHTML = countEl;
        }
        if (pm == 'minus' && countEl > 0) {
            countEl--;
            document.getElementById(active).innerHTML = countEl;
        }
    }
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

.controller('ProfileController', function ($scope) {
    $scope.updateProfile = function () {
        var db = PouchDB('momlink');
        db.get('profile').then(function (doc) {
            doc['name'] = $('#name').val(),
            doc['email'] = $('#email').val(),
            doc['age'] = $('#age').val(),
            doc['startDate'] = $('#start').val(),
            doc['deliveryDate'] = $('#delivery').val(),
            doc['aboutMe'] = $('#about').val(),
            doc['doctorsName'] = $('#dName').val(),
            doc['doctorsEmail'] = $('#dEmail').val(),
            doc['doctorsPhone'] = $('#dNumber').val()
            return db.put(doc).then(function (doc) {
                $scope.goToLink('home.html', 'Momlink');
            });
        });
    }
    $scope.getProfile = function () {
        var db = PouchDB('momlink');
        //local storage
        //get filesystem
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getFS);
        function getFS(fileSystem) {
            fileSystem.root.getDirectory("photos", { create: false, exclusive: false }, getDir)
        }
        //get directory
        function getDir(dir) {
            dir.getFile("profilePic.jpg", { create: false, exclusive: false }, getPic)
        }
        //get file
        function getPic(pic) {
            //do things with file
            var img = document.getElementById('profilePic');
            img.src = pic.toURL();
        }
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

.controller('SliderController', function ($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function () {
        $ionicSlideBoxDelegate.next();
    }
})

.controller('CameraController', function ($scope) {
    var pictureSource;
    var destinationType; // sets the format of returned value
    // Wait for device API libraries to load
    $scope.initializeDevice = function () {
        document.addEventListener("deviceready", $scope.onDeviceReady, false);
    }
    // device APIs are available
    $scope.onDeviceReady = function () {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
    }
    $scope.takeProfilePhoto = function () {
        navigator.camera.getPicture(function (imageData) {
            onPhotoDataSuccess(imageData)
        }, $scope.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
        });
        onPhotoDataSuccess = function (imageData) {
            //local storage
            window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
            //Callback function when the file system url has been resolved
            function resolveOnSuccess(entry) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                    //The folder is created if doesn't exist
                    fileSys.root.getDirectory('photos',
                                    { create: true, exclusive: false },
                                    function (directory) {
                                        entry.moveTo(directory, 'profilePic.jpg', successMove, resOnError);
                                    },
                                    resOnError);
                },
                resOnError);
            }
            //Callback function when the file has been moved successfully - inserting the complete path
            function successMove(entry) {
                //reload page to see new entries
                console.log(entry.toURL())
            }
            function resOnError(error) {
                alert(error.code);
            }
        }
    }
    $scope.takeJournalPhoto = function () {
        var name = moment().format('YYYY-MM-DDhhmmssa');
        week = 'Week' + window.localStorage.getItem('currentWeek')
        navigator.camera.getPicture(function (imageData) {
            onPhotoDataSuccess(imageData)
        }, $scope.onFail, {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true
        });
        onPhotoDataSuccess = function (imageData) {
            //local storage
            window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
            //Callback function when the file system url has been resolved
            function resolveOnSuccess(entry) {
                fileName = name + ".jpg";
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                    //The folder is created if doesn't exist
                    fileSys.root.getDirectory(week,
                                    { create: true, exclusive: false },
                                    function (directory) {
                                        entry.moveTo(directory, fileName, successMove, resOnError);
                                    },
                                    resOnError);
                },
                resOnError);
            }
            //Callback function when the file has been moved successfully - inserting the complete path
            function successMove(entry) {
                //reload page to see new entries
                console.log(entry.toURL())
            }
            function resOnError(error) {
                alert(error.code);
            }
        }
    }
    $scope.onFail = function (message) {
        alert('Failed because: ' + message);
    }
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

    $scope.submitAct = function (type) {
        var db = PouchDB('momlink');
        hour = document.getElementById('hour').innerHTML;
        min = document.getElementById('minute').innerHTML;
        value = String(hour + ":" + min);
        db.get('track').then(function (doc) {
            var element = {
                "uniqueId": new Date().toJSON(),
                "date": getDate(),
                "time": getTime(),
                "act": window.localStorage.getItem('selectAct'),
                "value": value
            };
            doc['A'].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.goToLink('history.html', 'History');
        });
    }
    $scope.submit = function (type) {
        var db = PouchDB('momlink');
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
            $scope.goToLink('history.html', 'History');
        });
    }
    $scope.submitPain = function (type) {
        var db = PouchDB('momlink');
        var type;
        switch (document.getElementById('pain').value) {
            case '1':
                value = 'No hurt';
                break;
            case '2':
                value = 'Hurts little bit';
                break;
            case '3':
                value = 'Hurts little more';
                break;
            case '4':
                value = 'Hurts even more';
                break;
            case '5':
                value = 'Hurts whole lot';
                break;
            case '6':
                value = 'Hurts worst';
                break;
        }
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
            $scope.goToLink('history.html', 'History');
        });
    }
    $scope.submitBP = function () {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var element = {
                "uniqueId": new Date().toJSON(),
                "date": getDate(),
                "time": getTime(),
                "value": document.getElementById('count').innerHTML + "/" + document.getElementById('count2').innerHTML
            };
            doc['BP'].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.goToLink('history.html', 'History');
        });
    }
    $scope.submitAdd = function (type) {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var element = {
                "uniqueId": new Date().toJSON(),
                "date": getDate(),
                "time": getTime(),
                "value": parseInt(document.getElementById('count12').innerHTML) * (.5) + parseInt(document.getElementById('count1').innerHTML)
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.goToLink('history.html', 'History');
        });
    }
    $scope.submitSet = function (value, type) {
        var db = PouchDB('momlink');
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
            $scope.goToLink('history.html', 'History');
        });
    }

    $scope.initializeDB = function () {
        var db = new PouchDB('momlink');
        window.PouchDB = PouchDB;
        //db.destroy()
        db.get('loginInfo').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "loginInfo",
                    "userID": "",
                    "username": "u",
                    "password": "p",
                    "clientID": "08798a24b703fb7b9d5d231ab30008d3",
                    "answer": "Yes",
                    "securityQuestion": "?",
                    "resetCode": "595"
                });
            }
        });
        db.get('profile').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "profile",
                    "name": "",
                    "email": "",
                    "age": "",
                    "startDate": "",
                    "deliveryDate": "",
                    "aboutMe": "",
                    "doctorsName": "",
                    "doctorsEmail": "",
                    "doctorsPhone": ""
                });
            }
        });
        db.get('inbox').catch(function (err) {
            if (err.status === 404) {
                //php request
                db.put({
                    "_id": "inbox",
                    "pncc": [
                        { name: "PNCC1", email: "pncc1@gmail.com", image: "../img/temp/pncc1.jpg" },
                        { name: "PNCC2", email: "pncc2@gmail.com", image: "../img/temp/pncc2.jpg" },
                        { name: "PNCC3", email: "pncc3@gmail.com", image: "../img/temp/pncc3.jpg" }
                    ]
                });
            }
        });
        db.get('coupons').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "coupons",
                    "recieved": [
                        {
                            "date": "4/15/2016",
                            "plan": "Platinum",
                            "for": "BABE Class"
                        },
                        {
                            "date": "4/16/2016",
                            "plan": "Platinum",
                            "for": "BABE Class"
                        }
                    ],
                    "used": [
                        {
                            "date": "4/12/2016",
                            "plan": "Platinum",
                            "for": "BABE Class"
                        },
                        {
                            "date": "4/14/2016",
                            "plan": "Platinum",
                            "for": "BABE Class"
                        }
                    ]
                });
            }
        });
        db.get('events').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "events",
                    'E': [
                        /*{
                        "title": 'PNCC',
                        "type": 'OB Appt',
                        "start": new Date(),
                        "end": new Date(),
                        "venue": 'asdfadsf',
                        "description": 'asfadsfd',
                        "color": 'blue',
                        "scheduledBy": '1'
                        }*/
                    ]
                });
            }
        });
        db.get('track').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "track",
                    'A': [],
                    "BHR": [],
                    "BG": [],
                    "BI": [],
                    "BP": [],
                    "CA": [],
                    "CI": [],
                    "D": [],
                    "K": [],
                    'M': [],
                    'PA': [],
                    'PI': [],
                    'S': [],
                    "W": [],
                });
            }
        });
        db.get('articles').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "articles",
                    "shared": [
                        {
                            "title": "Pregnancy Center",
                            "description": "Pregnancy center description",
                            "link": "http://www.webmd.com/baby/",
                            "read": "",
                            "length": "",
                            "date": ""
                        },
                        {
                            "title": "Pregnancy Center2",
                            "description": "Pregnancy center description2",
                            "link": "something",
                            "read": "",
                            "length": "",
                            "date": ""
                        },
                        {
                            "title": "Pregnancy Center3",
                            "description": "Pregnancy center description3",
                            "link": "somethingElse",
                            "read": "",
                            "length": "",
                            "date": ""
                        },
                        {
                            "title": "Pregnancy Center4",
                            "description": "Pregnancy center description4",
                            "link": "something4",
                            "read": "",
                            "length": "",
                            "date": ""
                        },
                        {
                            "title": "Pregnancy Center5",
                            "description": "Pregnancy center description5",
                            "link": "something5",
                            "read": "",
                            "length": "",
                            "date": ""
                        }
                    ],
                    "history": [
                    ]
                });
            }
        });
        db.get('journal').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "journal",
                    "notes": [],
                    "visits": [
                        {
                            "subject": "Subject 1",
                            "description": "Description 1...",
                            "date": "6/1/2016"
                        },
                        {
                            "subject": "Subject 3",
                            "description": "Description 2...",
                            "date": "5/25/2016"
                        },
                    ]
                });
            }
        });
        db.get('referrals').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "referrals",
                    "R": [
                        {
                            "name": "First Last",
                            "address": "555 Chicago",
                            "phone": "555-555-5555",
                            "email": "first@email.com",
                            "date": "3/22/2016",
                            "meeting": "no"
                        },
                        {
                            "name": "First Last1",
                            "address": "555 Chicago1",
                            "phone": "555-555-5555",
                            "email": "first@email.com1",
                            "date": "3/23/2016",
                            "meeting": "no"
                        },
                        {
                            "name": "First Last2",
                            "address": "555 Chicago2",
                            "phone": "555-555-5555",
                            "email": "first@email.com2",
                            "date": "3/24/2016",
                            "meeting": "no"
                        },
                        {
                            "name": "First Last3",
                            "address": "555 Chicago3",
                            "phone": "555-555-5555",
                            "email": "first@email.com3",
                            "date": "3/24/2016",
                            "meeting": "no"
                        },
                        {
                            "name": "First Last4",
                            "address": "555 Chicago4",
                            "phone": "555-555-5555",
                            "email": "first@email.com4",
                            "date": "3/25/2016",
                            "meeting": "no"
                        }
                    ],
                });
            }
        });
        db.get('classes').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "classes",
                    "crib": [
                        {
                            "plan": "Crib",
                            "class": "Safe Sleep Class",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "Safety Class",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "BABE Class",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "BABE Class",
                            "number": "2",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "2",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "3",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "4",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "5",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "6",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "HUGS",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Crib",
                            "class": "HUGS",
                            "number": "2",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        }
                    ],
                    "infantCarrier": [
                        {
                            "plan": "Infant Carrier",
                            "class": "Safety Class",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Infant Carrier",
                            "class": "BABE Class",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Infant Carrier",
                            "class": "BABE Class",
                            "number": "2",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Infant Carrier",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "1",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Infant Carrier",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "2",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        },
                        {
                            "plan": "Infant Carrier",
                            "class": "PNCC (HUGS/face to face)",
                            "number": "3",
                            "status": "Register",
                            "venue": "",
                            "date": "",
                            "time": "",
                            "instructor": ""
                        }
                    ]
                });
            }
        });
    }
})

.controller('DataController', function ($scope, $ionicSideMenuDelegate, $compile) {
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
})