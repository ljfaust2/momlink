angular.module('momlink.controllers', [])
/**
 *The header controller handles login, navigation, splash screen, back button, events
 */
.controller('HeaderCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $location, $document, $compile) {
    $scope.initializeDB = function () {
        var db = new PouchDB('momlink')
        db.get('login').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "login",
                    "login_code": "6",
                    "username": "u",
                    "password": "p",
                    "reset_code": "595",
                    "answer": "Yes",
                    "sec_question": "?",
                    "client_id": "08798a24b703fb7b9d5d231ab30008d3"
                });
            }
        });
        db.get('profile').catch(function (err) {
            if (err.status === 404) {
                //start date will be the day they create their account
                db.put({
                    "_id": "profile",
                    "name": "",
                    "email": "",
                    "age": "",
                    "startDate": "5/20/2016",
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
                        { "name": "PNCC1", "email": "pncc1@gmail.com", "phone": "555-555-5555", "image": "../img/temp/pncc1.jpg" },
                        { "name": "PNCC2", "email": "pncc2@gmail.com", "phone": "", "image": "../img/temp/pncc2.jpg" },
                        { "name": "PNCC3", "email": "", "phone": "555-555-5555", "image": "../img/temp/pncc3.jpg" },
                        { "name": "PNCC4", "email": "", "phone": "", "image": "../img/temp/pncc3.jpg" }
                    ]
                });
            }
        });
        db.get('events').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "events",
                    "events": [
                        {
                            "id": '06-20-2016T10:53:29am',
                            "title": 'test',
                            "type": 'Lab',
                            "day": '2016-06-20',
                            "start": '2016-06-20T10:11',
                            "end": '2016-06-20T11:11',
                            "venue": 'asdfasd',
                            "description": 'sdfadsf',
                            "color": 'red',
                            "scheduledBy": '0',
                            "survey":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer']],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer']],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer']]
                                ]
                        }
                    ]
                });
            }
        });
        db.get('track').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "track",
                    'activity': [],
                    "babyHeartRate": [],
                    "bloodGlucose": [],
                    "bloodIron": [],
                    "bloodPressure": [],
                    "caffeine": [],
                    "cigarette": [],
                    "nutrition": [],
                    "kicks": [],
                    'mood': [],
                    'pain': [],
                    'pill': [],
                    'stress': [],
                    "weight": [],
                });
            }
        });
        db.get('articles').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "articles",
                    "shared": [
                        {
                            "id": "1",
                            "title": "Smoking During Pregnancy",
                            "description": "Smoking during pregnancy may increase the risk that a child could develop schizophrenia, new research suggests.",
                            "category": "Smoking",
                            "link": "http://www.webmd.com/baby/news/20160527/is-smoking-during-pregnancy-tied-to-offsprings-schizophrenia-risk",
                            "dateShared": "6/28/2016",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer'], '0'],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer'], '1'],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer'], '2']
                                ]
                        },
                        {
                            "id": "2",
                            "title": "BP Problems During Pregnancy, Heart Trouble Later?",
                            "description": "Pregnant women who have blood pressure in the high-normal range may have an increased risk for metabolic syndrome after they give birth, a new study indicates.",
                            "category": "Blood Pressure",
                            "link": "http://www.webmd.com/baby/news/20160627/blood-pressure-problems-during-pregnancy-heart-trouble-later",
                            "dateShared": "6/28/2016",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer'], '0'],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer'], '1'],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer'], '2']
                                ]
                        },
                        {
                            "id": "3",
                            "title": "Title 3",
                            "description": "Description 3",
                            "category": "Category 1",
                            "link": "http://www.webmd.com/baby/news/20160527/is-smoking-during-pregnancy-tied-to-offsprings-schizophrenia-risk",
                            "dateShared": "",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer'], '0'],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer'], '1'],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer'], '2']
                                ]
                        },
                        {
                            "id": "4",
                            "title": "Title 4",
                            "description": "Description 4",
                            "category": "Category 2",
                            "link": "http://www.webmd.com/baby/news/20160527/is-smoking-during-pregnancy-tied-to-offsprings-schizophrenia-risk",
                            "dateShared": "",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer'], '0'],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer'], '1'],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer'], '2']
                                ]
                        },
                        {
                            "id": "5",
                            "title": "Title 5",
                            "description": "Description 5",
                            "category": "Category 2",
                            "link": "http://www.webmd.com/baby/news/20160527/is-smoking-during-pregnancy-tied-to-offsprings-schizophrenia-risk",
                            "dateShared": "",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['This is question 1', ['1First answer', '1Second Answer', '1Third Answer'], '0'],
                                ['This is question 2', ['2First answer', '2Second Answer', '2Third Answer'], '1'],
                                ['This is question 3', ['3First answer', '3Second Answer', '3Third Answer'], '2']
                                ]
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
                    "referrals": [
                        {
                            "id": "1",
                            "name": "First Last",
                            "address": "555 Chicago",
                            "phone": "555-555-5555",
                            "email": "first@email.com",
                            "date": "3/22/2016",
                            "meeting": ""
                        },
                        {
                            "id": "2",
                            "name": "First Last1",
                            "address": "555 Chicago1",
                            "phone": "",
                            "email": "first@email.com1",
                            "date": "3/23/2016",
                            "meeting": ""
                        },
                        {
                            "id": "3",
                            "name": "First Last2",
                            "address": "555 Chicago2",
                            "phone": "555-555-5555",
                            "email": "first@email.com2",
                            "date": "3/24/2016",
                            "meeting": ""
                        },
                        {
                            "id": "4",
                            "name": "First Last3",
                            "address": "555 Chicago3",
                            "phone": "555-555-5555",
                            "email": "first@email.com3",
                            "date": "3/24/2016",
                            "meeting": ""
                        },
                        {
                            "id": "5",
                            "name": "First Last4",
                            "address": "555 Chicago4",
                            "phone": "555-555-5555",
                            "email": "first@email.com4",
                            "date": "3/25/2016",
                            "meeting": ""
                        }
                    ],
                });
            }
        });
        /*db.get('classes').catch(function (err) {
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
        });*/
        //db.destroy();
    }

    /*$scope.getInformation = function () {
        // Which fetches are repeatable.
        // All sends are repeatable.
        document.addEventListener("deviceready", function () {

            client_referral_education_fetched = false;
            pncc_fetched = false;
            if (navigator.network.connection.type == Connection.NONE) {
                alert('No network connection.');
            } else {
                // fetch pncc information
                if (!pncc_fetched) {
                    // PNCC INFORMATION. FETCH ONCE.
                    pncc_fetched = true;

                    // Hard-Coded pncc_id - depends on username
                    var pncc_data = { 'pncc_id': 9888 };

                    $.ajax({
                        url: 'https://momlink.crc.nd.edu/~jonathan/send_pncc.php',
                        type: 'POST',
                        dataType: 'json',
                        data: pncc_data,
                        success: function (data) {
                            alert("Successfully Retrieved Data.");
                            console.log(data)
                        }
                    });
                }
            }
        });
    }*/
    $scope.toggleRightSideMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    //ion-subheader
    $scope.renderSubheaderDate = function () {
        today = moment().format('MMMM Do YYYY')
        document.getElementById("todaysDate").innerHTML = "Today, " + today;
        //used by History subheader
        var date = new Date()
        $scope.currentDate = date;
    };

    //ion-slides
    $scope.renderAppointmentsHeader = function () {
        var db = PouchDB('momlink');
        var todaysEvents = []
        html = '<div class="row">'
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                if (events[i]['day'] == moment().format('YYYY-MM-DD')) {
                    startingTime = String(events[i]['start']).substr(String(events[i]['start']).indexOf("T") + 1);
                    todaysEvents.push([startingTime, [events[i]['id']]]);
                }
            }
            todaysEvents = sortTimes(todaysEvents)
            for (j in todaysEvents) {
                html += `<div class="col" ng-click="viewEvent('` + todaysEvents[j][1] + `', 'home.html', 'Momlink')">`;
                html += `<img src="../img/mainIcons/momlink_icon-16.png" style="height:60%;"><br>`;
                html += $scope.convert24to12(todaysEvents[j][0]) + `</div>`;
                eventsToday = true;
            }
            html += '</div>';
            if (todaysEvents == 0) {
                html = '<div class="row; centerVH;"><br>No Events Today</div>'
            }
            $('#appointmentsHeader').html(html);
            $compile($('#appointmentsHeader'))($scope);
        })
        function sortTimes(array) {
            return array.sort(function (a, b) {
                if (parseInt(a[0].split(":")[0]) - parseInt(b[0].split(":")[0]) === 0) {
                    return parseInt(a[0].split(":")[1]) - parseInt(b[0].split(":")[1]);
                } else {
                    return parseInt(a[0].split(":")[0]) - parseInt(b[0].split(":")[0]);
                }
            })
        }
    };
    $scope.renderArticlesHeader = function () {
        var db = PouchDB('momlink');
        var k = 0;
        db.get('articles').then(function (doc) {
            articles = doc['shared'];
            if (articles == '') {
                $('#articlesHeader').html('No New Articles');
                $compile($('#articlesHeader'))($scope);
            }
            else {
                function renderArticle(index) {
                    for (j in articles) {
                        articleHtml = `<div class="row centerWhite" ng-controller="EducationCtrl">`;
                        articleHtml += `<div class="col-15" align="left"><img src="../img/mainIcons/momlink_icon-16.png" style="height:60%;"></div>`;
                        articleHtml += `<div class="col no-padding" align="left">`;
                        articleHtml += `<span style="display: inline-block; max-height:50%; line-height: 95%; overflow:hidden">` + articles[k]['description'] + `</span>`;
                        articleHtml += `<br /><a ng-click="renderArticle('shared','` + articles[k]['id'] + `')" style="color:white"><u>Read More</u></a>&nbsp;<a ng-click="renderQuiz('shared','` + articles[k]['id'] + `')" style="color:white"><u>Take Quiz</u></a>`;
                        articleHtml += `</div></div>`;
                        $('#articlesHeader').fadeOut("slow", function () {
                            $('#articlesHeader').html(articleHtml);
                            $compile($('#articlesHeader'))($scope);
                            $('#articlesHeader').fadeIn("slow");
                        });
                    }
                    k++;
                    if (k == articles.length) {
                        k = 0;
                    }
                }
                renderArticle(k);
                //cycle through new/unread articles    
                (function cycleTodaysEvents(i) {
                    setTimeout(function () {
                        renderArticle(k);
                        if (--i) cycleTodaysEvents(i);
                    }, 7000)
                })(Number.POSITIVE_INFINITY);
            }
        })
    };

    pageHistory = [];
    $scope.addBackButtonListener = function () {
        document.addEventListener("backbutton", function (event) {
            //if on homepage then exit app
            if ($('#headline').html() == 'Momlink') {
                navigator.app.exitApp();
            }
            else {
                lastPage = pageHistory.pop();
                //console.log(pageHistory)
                headline = lastPage[0];
                page = lastPage[1];
                $scope.toNewPage(page, headline, true)
                navigator.app.preventDefault();
            }
        }, false);
    }

    //function for registration
    /*
    $scope.register = function () {
        call initialize db
        add info to login table
        use current day as starting date for profile
    };
    */

    //the first page in history should always be home.html
    currentPage = 'home.html';
    $scope.toNewPage = function (nextPage, nextHeadline, history) {
        //prevents adding pages to history when using the back button
        if (history != true || nextPage == 'home.html') {
            //empty pageHistory
            if (nextPage == 'home.html') {
                pageHistory = [];
                currentPage = 'home.html';
            }
            //save current page and headline to history before moving to requested page
            if (document.getElementById('headline') != null) {
                var currentHeadline = $('#headline').html();
            }
            pageHistory.push([currentHeadline, currentPage])
            //console.log(pageHistory)
            currentPage = nextPage;
        }
        //load in the requested page      
        var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', nextPage, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById("content").innerHTML = xhr.responseText;
                if (nextHeadline != null) {
                    document.getElementById('headline').innerHTML = nextHeadline;
                }
                $compile(document.getElementById('content'))($scope);
            }
        }
        xhr.send();
    };

    $scope.autoLogin = function () {
        //if they've logged in previously, skip the login screen
        document.addEventListener("deviceready", function () {
            if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
                $scope.renderArticlesHeader();
                window.location = "templates/main.html";
            }
            else {
                //add this in to remove white flash
                //$(window).bind("load", function () {
                $scope.renderArticlesHeader();
                navigator.splashscreen.hide()
                //});
            }
        });
    };
    $scope.renderSurveyBadge = function () {
        var db = PouchDB('momlink');
        var count = 0;
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                if (events[i]['survey'] != null) {
                    if (moment(events[i]['end']) < moment() && events[i]['survey'].length > 0 && events[i]['survey'][0].length < 3) {
                        count++;
                    }
                }
            }
            if (count > 0) {
                html = `<img src="../img/mainIcons/momlink_icon-19.png" ng-click="toNewPage('survey.html', 'Survey')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + count + `</span><p>Survey</p>`;
                $('#survey').html(html);
                $compile($('#survey'))($scope);
            }
        })
    };
    $scope.removeSplash = function () {
        //wait until the page has loaded to remove the splash screen{
        document.addEventListener("deviceready", function () {
            navigator.splashscreen.hide()
        });
    };
    $scope.login = function (user, pass) {
        var db = PouchDB('momlink');
        db.get('login').then(function (doc) {
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
        delete $scope.trackType;
        delete $scope.selectAct;
        delete $scope.eventID;
        delete $scope.currentWeek;
        delete $scope.currentDate;
        window.location = "../index.html";
    };
    //Tracking
    $scope.goToHistory = function (type) {
        $scope.trackType = type;
        if (type == 'addNutrition') {
            $scope.toNewPage('addNutrition.html', 'Nutrition')
        } else {
            $scope.toNewPage('history.html', 'History')
        }

    };
    $scope.goToAddEvent = function () {
        title = $scope.trackType.split(/(?=[A-Z])/).splice(1, 100)
        title = title.join(' ')
        $scope.modal = $ionicModal.fromTemplateUrl($scope.trackType + ".html", {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    };
    $scope.goToAct = function (act) {
        $scope.selectAct = act;
        $.ajax({
            url: 'addActivityTime.html',
            success: function (data) {
                $('#activity').html(data);
                $compile($('#activity'))($scope);
            }
        });
    };

    $scope.newMessage = function (email, phone) {
        if (email != '' && phone != '') {
            $ionicPopup.show({
                title: 'Contact via',
                cssClass: 'popup-vertical-buttons',
                buttons: [
                    {
                        text: 'Text', onTap: function (e) {
                            text();
                            return 'text';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Email', onTap: function (e) {
                            mail();
                            return 'email';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Cancel', onTap: function (e) {
                            return 'cancel';
                        },
                        type: 'button-stable'
                    }
                ],
            });
        }
        else if (email == '' && phone != '') {
            text();
        }
        else if (phone == '' && email != '') {
            mail();
        }
        else {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Contact has not provided any information'
            });
        }
        function text() {
            var message = '';
            var options = {
                android: {
                    intent: 'INTENT'  // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                }
            };
            sms.send(phone, message, options);
        }
        function mail() {
            window.cordova.plugins.email.open({
                to: [email],
            }, console.log('Email Sent'), $scope)
        }
    };

    $scope.openFile = function (file, type) {
        cordova.plugins.fileOpener2.open(file, type);
    }
    $scope.shareImage = function (file) {
        console.log(file);
        window.plugins.socialsharing.share(null, null, file, null, null, null)
    }

    //event functions
    $scope.createEvent = function (link, title) {
        $scope.returnLink = link;
        $scope.returnTitle = title;
        $scope.modal = $ionicModal.fromTemplateUrl('eventModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    }
    $scope.saveEvent = function () {
        //checks if all necessary fields have been filled
        var pass = true;
        var fields = { '#title': 'title', '#type': 'type', '#date': 'date', '#start': 'start time', '#end': 'end time' };
        for (var key in fields) {
            if ($(key).val() == null || $(key).val() == '') {
                var alertPopup = $ionicPopup.alert({
                    title: 'Please select a ' + fields[key],
                });
                alertPopup;
                pass = false;
                return;
            }
        }
        if ($('#start').val() > $('#end').val()) {
            var alertPopup = $ionicPopup.alert({
                title: 'Starting time must occur before ending time',
            });
            alertPopup;
            pass = false;
        }
        if (pass == true) {
            var db = PouchDB('momlink');
            start = $('#date').val() + "T" + $('#start').val();
            end = $('#date').val() + "T" + $('#end').val();
            var questions = [];
            $("input[name=Q]:checked").each(function () {
                questions.push($(this).val())
            });
            db.get('events').then(function (doc) {
                var id = moment().format('MM-DD-YYYYThh:mm:ssa')
                $scope.eventID = id;
                var event = {
                    "id": id,
                    "title": $('#title').val(),
                    "type": $("#type").val(),
                    "day": $('#date').val(),
                    "start": start,
                    "end": end,
                    "venue": $('#venue').val(),
                    "description": $('#description').val(),
                    "questions": questions,
                    "color": $scope.getColor($('#type').val()),
                    "scheduledBy": '0'
                };
                doc['events'].push(event);
                return db.put(doc);
            }).then(function (doc) {
                //update referral meeting
                referral = window.localStorage.getItem('referralID');
                if (referral != null) {
                    db.get('referrals').then(function (doc) {
                        i = doc['referrals'].findIndex(function (e) { return e.id === referral });
                        doc['referrals'][i]['meeting'] = $scope.eventID;
                        return db.put(doc);
                    }).then(function (doc) {
                        $scope.toNewPage('referrals.html', 'Referrals');
                        $scope.closeModal();
                        window.localStorage.removeItem('referralName')
                    });
                }
                else {
                    $scope.toNewPage('calendar.html', 'Calendar');
                    $scope.closeModal();
                }
            });
        }
    }
    $scope.viewEvent = function (eventID, link, title) {
        $scope.returnLink = link;
        $scope.returnTitle = title;
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            i = doc['events'].findIndex(function (e) { return e.id === eventID });
            var year = String(doc['events'][i]['day']).substring(0, 4);
            var month = String(doc['events'][i]['day']).substring(5, 7);
            var day = String(doc['events'][i]['day']).substring(8, 10);
            var date = month + '/' + day + '/' + year;
            var startTime = $scope.parseTime(doc['events'][i]['start']);
            var endTime = $scope.parseTime(doc['events'][i]['end']);
            //render template
            templateHTML = '<p><b>' + doc['events'][i]['type'] + '</b></p>';
            templateHTML += '<p><b>Date</b>: ' + date + '</p>';
            templateHTML += '<p><b>Start</b>: ' + $scope.convert24to12(startTime) + '</p>';
            templateHTML += '<p><b>End</b>: ' + $scope.convert24to12(endTime) + '</p>';
            if (doc['events'][i].venue != '') {
                templateHTML += '<p><b>Venue</b>: ' + doc['events'][i]['venue'] + '</p>'
            }
            if (doc['events'][i].description != '') {
                templateHTML += '<p><b>Description</b>: ' + doc['events'][i]['description'] + '</p>'
            }
            //view event
            var alertPopup = $ionicPopup.show({
                title: doc['events'][i]['title'],
                template: templateHTML,
                buttons: [
                    {
                        text: 'Edit', onTap: function (e) {
                            $scope.editEvent(eventID);
                            return 'Cancel';
                        },
                        type: 'button-positive'
                    },
                  {
                      text: 'Close', onTap: function (e) { return 'Cancel'; },
                      type: 'button-positive'
                  }
                ],
            });
        });
    }
    $scope.editEvent = function (eventID) {
        $scope.modal = $ionicModal.fromTemplateUrl('editEventModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
        $scope.eventID = eventID;
    }
    $scope.pullEvent = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            $('#title').val(doc['events'][i]['title']);
            $('#type').val(doc['events'][i]['type']);
            $('#date').val(doc['events'][i]['day']);
            $('#start').val($scope.parseTime(doc['events'][i]['start']));
            $('#end').val($scope.parseTime(doc['events'][i]['end']));
            $('#venue').val(doc['events'][i]['venue']);
            $('#description').val(doc['events'][i]['description']);
            for (j in doc['events'][i]['questions']) {
                $("input[name=Q]").each(function () {
                    if (doc['events'][i]['questions'][j] == $(this).val()) {
                        $(this).prop('checked', true);
                    }
                });
            }
        });
    }
    $scope.updateEvent = function () {
        var db = PouchDB('momlink');
        var questions = [];
        $("input[name=Q]:checked").each(function () {
            questions.push($(this).val())
        });
        db.get('events').then(function (doc) {
            i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            doc['events'][i]['title'] = $('#title').val();
            doc['events'][i]['type'] = $('#type').val();
            doc['events'][i]['day'] = $('#date').val();
            start = $('#date').val() + "T" + $('#start').val();
            end = $('#date').val() + "T" + $('#end').val();
            doc['events'][i]['start'] = start;
            doc['events'][i]['end'] = end;
            doc['events'][i]['venue'] = $('#venue').val();
            doc['events'][i]['description'] = $('#description').val();
            doc['events'][i]['questions'] = questions,
            doc['events'][i]['color'] = $scope.getColor($('#type').val());
            return db.put(doc);
        }).then(function () {
            if ($scope.returnLink != '' && $scope.returnTitle != '') {
                $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                delete $scope.returnLink;
                delete $scope.returnTitle;
            }
            $scope.closeModal();
        })
    }
    $scope.deleteEvent = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            doc['events'].splice(i, 1)
            return db.put(doc);
        }).then(function () {
            //if attached to referral, update meeting ID
            db.get('referrals').then(function (doc) {
                i = doc['referrals'].findIndex(function (e) { return e.meeting === $scope.eventID });
                if (i >= 0) {
                    doc['referrals'][i]['meeting'] = '';
                }
                return db.put(doc);
            }).then(function () {
                if ($scope.returnLink != '' && $scope.returnTitle != '') {
                    $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                    delete $scope.returnLink;
                    delete $scope.returnTitle;
                }
                $scope.closeModal();
            })
        })
    };
    $scope.goToEventPart2 = function () {
        $('#eventPart1').css('display', 'none')
        $('#eventPart2').css('display', '')
    }
    $scope.goToEventPart1 = function () {
        $('#eventPart1').css('display', '')
        $('#eventPart2').css('display', 'none')
    }
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            $scope.modal.remove();
        });
    };
    //helper functions
    $scope.getColor = function (type) {
        switch (type) {
            case 'OB Appt':
                type = 'blue';
                return type;
            case 'Referral':
                type = 'teal';
                return type;
            case 'Lab':
                type = 'red';
                return type;
            case 'PNCC':
                type = 'green';
                return type;
            case 'Ultra':
                type = 'orange';
                return type;
            case 'Class':
                type = 'purple';
                return type;
            case 'Other':
                type = 'black';
                return type;
        }
    }
    $scope.convert24to12 = function (time) {
        if (parseInt(time.substring(0, 2)) >= 12) {
            if (parseInt(time.substring(0, 2)) > 12) {
                hour = time.slice(0, 2) % 12;
                time = String(hour).concat(time.slice(2, 5))
            }
            time += 'pm'
        }
        else {
            time += 'am'
        }
        return time;
    }
    $scope.parseTime = function (time) {
        time = String(time).substr(String(time).indexOf("T") + 1);
        return time;
    }
})

.controller('NutritionCtrl', function ($scope, $ionicPopup) {
    $scope.nutritionCircle = function (id, size, min) {
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
                template: '<div class="row" ng-controller="TrackCtrl">' +
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
                template: '<div class="row" ng-controller="TrackCtrl">' +
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
            template: '<div class="row" ng-controller="TrackCtrl">' +
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

.controller('CalendarCtrl', function ($scope, $ionicPopup) {
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
                events: doc['events'],
                eventRender: function (event, element) {
                    element.click(function () {
                        $scope.viewEvent(event.id, 'calendar.html', 'Calendar');
                    })
                    return ['all', event.scheduledBy].indexOf($('#filter').html()) >= 0
                }
            })
        });
    };
    $scope.filterEvents = function (num) {
        $('#filter').html(num)
        $('#calendar').fullCalendar('rerenderEvents');
    };
})

.controller('InboxCtrl', function ($scope, $compile, $ionicPopup) {
    $scope.showReferralContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('referrals').then(function (doc) {
            referrals = doc['referrals'];
            html += '<div class="list">';
            for (i in referrals) {
                html += `<div class="item item-thumbnail-left" ng-click="newMessage('` + referrals[i]['email'] + `','` + referrals[i]['phone'] + `')">`;
                html += `<img src="">`;
                html += '<h2>' + referrals[i]['name'] + '</h2>';
                html += '<p>' + referrals[i]['phone'] + '</p>';
                html += '<p>' + referrals[i]['email'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            $("#referrals").html(html);
            $compile($("#referrals"))($scope);
        });
    };
    $scope.showPNCCContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('inbox').then(function (doc) {
            pncc = doc['pncc'];
            html += '<div class="list">';
            for (i in pncc) {
                html += `<div class="item item-thumbnail-left" ng-click="newMessage('` + pncc[i]['email'] + `','` + pncc[i]['phone'] + `')">`;
                html += `<img src="` + pncc[i]['image'] + `">`;
                html += '<h2>' + pncc[i]['name'] + '</h2>';
                html += '<p>' + pncc[i]['email'] + '</p>';
                html += '<p>' + pncc[i]['phone'] + '</p>';
                html += '</div>';
            }
            html += '</div>';
            $("#pncc").html(html);
            $compile($("#pncc"))($scope);
        });
    };
})

/*.controller('CouponController', function ($scope, $ionicPopup, $timeout, $compile) {
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
})*/

.controller('EducationCtrl', function ($scope, $ionicPopup, $ionicModal, $timeout, $compile) {
    var timer;
    var sessionTime = 0;
    $scope.renderCategories = function (type) {
        var db = PouchDB('momlink');
        var html = '';
        var colSpacer = 2;
        var categories = {};
        db.get('articles').then(function (doc) {
            //get all unique categories
            sharedArticles = doc[type];
            //generates a dictionary where keys are categories 
            //and values are the number of articles per category not read
            for (i in sharedArticles) {
                articleCategory = sharedArticles[i]['category'];
                articleRead = sharedArticles[i]['lastRead'];
                if (articleCategory in categories && articleRead == '') {
                    categories[articleCategory]++;
                }
                else {
                    if (articleRead == '') {
                        categories[articleCategory] = 1;
                    }
                    else {
                        categories[articleCategory] = 0;
                    }
                }
            }
            //get total unread artciles for 'ALL' category
            var totalUnreadArticles = 0;
            for (i in categories) {
                totalUnreadArticles += categories[i];
            }
            //render categories
            html += '<div class="row has-header" style="padding-right:0;padding-left:0;padding-top:0">'
            if (type == 'shared') {
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','All')" style="position:relative">
                     <img class="autoSize" src="../img/mainIcons/momlink_icon-16.png">
                     <span class ="badge badge-positive topRightBadge">` + totalUnreadArticles + `</span>All</div>`;
            }
            else {
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','All')" style="position:relative">
                     <img class="autoSize" src="../img/mainIcons/momlink_icon-16.png">All</div>`;
            }
            for (i in categories) {
                //add column
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','` + i + `')" style="position:relative">`;
                html += '<image class="autoSize" src="../img/mainIcons/momlink_icon-16.png">'
                if (categories[i] > 0) {
                    html += '<span class="badge badge-positive topRightBadge">' + categories[i] + '</span>';
                }
                html += i;
                html += '</div>';
                //add row if 3 elements have been placed
                if (colSpacer % 3 == 0) {
                    html += `</div><div class="row" style="padding-right:0; padding-left:0; padding-top:0">`;
                }
                colSpacer++;
            }
            html += '</div>';
            $('#' + type).html(html);
            $compile($('#' + type))($scope);
        })
    };
    $scope.renderArticles = function (type, category) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('articles').then(function (doc) {
            sharedArticles = doc[type];
            html += `<div class="bar bar-header"><button class ="button button-icon icon ion-reply" ng-click="renderCategories('` + type + `')"></button><div class ="title">` + category + `</div></div>`
            html += '<div class="list has-header">';
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['category'] == category || category == 'All') {
                    html += `<div class="item item-thumbnail-left">`;
                    html += `<img ng-click="renderArticle('` + type + `','` + article['id'] + `','` + category + `')" src="../img/temp/article.jpg">`;
                    //bold if the article has not been read
                    if (article['lastRead'] == '') { html += '<h2><b>' + article['title'] + '</b></h2>'; }
                    else { html += '<h2>' + article['title'] + '</h2>'; }
                    html += '<p>' + article['description'] + '</p>';
                    html += '<p>Shared: ' + article['dateShared'] + '</p>';
                    if (type == 'history') {
                        var bestScore = 0;
                        html += '<p>Quiz Attempts: ' + Object.keys(article['quizHistory']).length + '</p>';
                        for (j in article['quizHistory']) {
                            if (article['quizHistory'][j].substring(0, 1) > String(bestScore).substring(0, 1)) {
                                bestScore = article['quizHistory'][j]
                            }
                            //console.log(article['quizHistory'][j])
                        }
                        html += '<p>Best Score: ' + bestScore + '</p>';
                    }
                    html += `<button class="button button-small button-stable" ng-click="renderQuiz('` + type + `','` + article['id'] + `','` + category + `')">Take Quiz</button>`;
                    html += '</div>';
                }
            }
            html += '</div>';
            $('#' + type).html(html);
            $compile($('#' + type))($scope);
        });
    };
    $scope.renderArticle = function (type, id, category) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('articles').then(function (doc) {
            sharedArticles = doc[type];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == id) {
                    html += `<ion-modal-view>`;
                    html += `<div class="bar bar-footer" ng-init="startSessionTimer()">`;
                    html += `<button class ="button button-icon icon ion-close-round" ng-click="recordTime('` + article['id'] + `'); renderArticles('` + type + `','` + category + `'); closeModal();">Close</button>`;
                    html += `<button class ="button button-icon icon icon-right ion-help" ng-click="recordTime('` + article['id'] + `'); closeModal(); renderQuiz('` + type + `','` + article['id'] + `','` + category + `');">Take Quiz &nbsp;</button>`;
                    html += `</div>`;
                    //if category is set to local and network is not available then
                    var networkState = navigator.connection.type;
                    articleCategory = String(article['category']).replace(/\s/g, '');
                    if (window.localStorage.getItem(articleCategory) == 'true' && networkState == Connection.NONE) {
                        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
                            dir.getFile(article['id'].concat('.html'), { create: false }, function (fileEntry) {
                                console.log(fileEntry.toURL())
                                html += `<iframe src="` + fileEntry.toURL() + `" style="width:100%; height: 100%;"></iframe>`;
                                html += `</ion-modal-view>`
                                //updated last time article was read
                                article['lastRead'] = String(moment().format('MM-DD-YYYY'));
                                $scope.modal = $ionicModal.fromTemplate(html, {
                                    scope: $scope,
                                    animation: 'slide-in-up'
                                });
                                $scope.openModal();
                                return db.put(doc)
                            });
                        });
                    }
                        //if network is available
                    else {
                        html += `<iframe src="` + article['link'] + `" style="width:100%; height: 100%;"></iframe>`;
                        html += `</ion-modal-view>`
                        //updated last time article was read
                        article['lastRead'] = String(moment().format('MM-DD-YYYY'));
                        $scope.modal = $ionicModal.fromTemplate(html, {
                            scope: $scope,
                            animation: 'slide-in-up'
                        });
                        $scope.openModal();
                        return db.put(doc)
                    }
                }
            }
        })
    };
    $scope.renderQuiz = function (type, articleID, category) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('articles').then(function (doc) {
            sharedArticles = doc[type];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    //get article's related quiz
                    quiz = article['quiz'];
                    for (j in quiz) {
                        question = quiz[j][0];
                        answers = quiz[j][1];
                        //render question
                        html += `  <div class="item item-divider">` + question + `</div>`;
                        //render answers
                        html += `<form id="` + String(j) + `">`
                        html += `<ion-list>`
                        for (k = 0; k < answers.length; k++) {
                            answer = quiz[j][1][k];
                            html += `<ion-radio name="` + String(j) + `" value="` + String(answer) + `">` + answer + `</ion-radio>`;
                        }
                        html += `</ion-list>`
                        html += `</form>`
                    }
                }
            }
            $ionicPopup.show({
                title: 'Quiz',
                template: html,
                buttons: [
                  {
                      text: 'Finish', onTap: function (e) {
                          //score the quiz
                          $scope.gradeQuiz(type, articleID, category);
                          return 'Create';
                      },
                      type: 'button-positive'
                  }
                ],
            });
        });
    };
    $scope.gradeQuiz = function (type, articleID, category) {
        var db = PouchDB('momlink');
        var score = 0;
        var finalScore;
        db.get('articles').then(function (doc) {
            sharedArticles = doc[type];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    quiz = article['quiz'];
                    for (j in quiz) {
                        selectedAnswer = $(`input[name="` + String(j) + `"]:checked`, `#`.concat(j)).val();
                        correctAnswer = quiz[j][1][quiz[j][2]];
                        if (selectedAnswer == correctAnswer) {
                            score++;
                        }
                    }
                    finalScore = score + '/' + quiz.length;
                    article['quizHistory'][String(moment().format('YYYY-MM-DDThh:mm:ssa'))] = finalScore;
                    return db.put(doc)
                }
            }
        }).then(function () {
            $ionicPopup.show({
                title: 'Results',
                template: '<div style="text-align:center">Your Score: ' + finalScore + '</div>',
                buttons: [
                  {
                      text: 'Finish', onTap: function (e) {
                          return 'Create';
                      },
                      type: 'button-positive'
                  }
                ],
            })
        }).then(function () {
            if (type == 'shared') {
                $scope.moveToHistory(type, articleID, category);
            }
            else {
                $scope.renderArticles(type, category)
            }
        })
    };
    $scope.recordTime = function (articleID) {
        //end timer
        clearInterval(timer);
        var db = PouchDB('momlink');
        db.get('articles').then(function (doc) {
            sharedArticles = doc['shared'];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    //convert time to minutes and seconds
                    var minutes = Math.floor(sessionTime / 60);
                    var seconds = sessionTime - minutes * 60;
                    if (seconds < 10) {
                        seconds = '0'.concat(seconds);
                    }
                    var finalSessionTime = minutes + ':' + seconds;
                    article['readHistory'][String(moment().format('YYYY-MM-DDThh:mm:ssa'))] = finalSessionTime;
                    return db.put(doc)
                }
            }
        });
    };
    $scope.startSessionTimer = function () {
        timer = setInterval(function () { sessionTime++; }, 1000);
    };
    $scope.moveToHistory = function (type, articleID, category) {
        var db = PouchDB('momlink');
        db.get('articles').then(function (doc) {
            sharedArticles = doc['shared'];
            for (i in sharedArticles) {
                if (sharedArticles[i]['id'] == articleID) {
                    article = sharedArticles[i];
                    sharedArticles.splice(i, 1);
                }
            }
            return db.put(doc);
        }).then(function () {
            db.get('articles').then(function (doc) {
                doc['history'].push(article);
                return db.put(doc)
            })
        }).then(function () {
            $scope.renderArticles(type, category)
        })
    };
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            $scope.modal.remove();
        });
    };

    var downloadSuccess = true;
    var deleteSuccess = true;
    var updateSuccess = true;
    $scope.renderDownloadCategories = function () {
        var db = PouchDB('momlink');
        var htmlSaved = '';
        var categories = {};
        db.get('articles').then(function (doc) {
            //get all unique categories
            for (i in doc['shared']) {
                categories[doc['shared'][i]['category']] = 0;
            }
            for (i in doc['history']) {
                categories[doc['shared'][i]['category']] = 0;
            }
            for (i in categories) {
                noSpaces = String(i).replace(/\s/g, '');
                htmlSaved += `<div class="row item">`
                htmlSaved += `<div class="col no-padding">`
                htmlSaved += `<ion-toggle ng-model="` + noSpaces + `" ng-checked="` + localStorage.getItem(noSpaces) + `" ng-click="toggleChange('` + String(noSpaces) + `',` + noSpaces + `)" style="border:none">` + i + `</ion-toggle>`;
                htmlSaved += `</div>`
                htmlSaved += `<div class="col-10 no-padding">`
                htmlSaved += `<a class="button button-icon icon ion-loop" ng-click="updateArticles('` + String(noSpaces) + `')"></a>`;
                htmlSaved += `</div>`
                htmlSaved += `</div>`
            }
            $('#Saved').html(htmlSaved);
            $compile($('#Saved'))($scope);
        })
    };
    $scope.toggleChange = function (category, state) {
        if (state == true) {
            localStorage.setItem(category, true);
            //download all articles for that category
            document.addEventListener("deviceready", function () {
                var db = PouchDB('momlink');
                db.get('articles').then(function (doc) {
                    for (i in doc['shared']) {
                        articleCategory = String(doc['shared'][i]['category']).replace(/\s/g, '');
                        if (articleCategory == category) {
                            $scope.downloadArticle(doc['shared'][i]['link'], doc['shared'][i]['id']);
                        }
                    }
                    for (i in doc['history']) {
                        articleCategory = String(doc['history'][i]['category']).replace(/\s/g, '');
                        if (articleCategory == category) {
                            $scope.downloadArticle(doc['history'][i]['link'], doc['history'][i]['id']);
                        }
                    }
                })
            })
        }
        else {
            //delete all local articles for that category
            localStorage.setItem(category, false);
            document.addEventListener("deviceready", function () {
                var db = PouchDB('momlink');
                db.get('articles').then(function (doc) {
                    //get all unique categories
                    for (i in doc['shared']) {
                        articleCategory = String(doc['shared'][i]['category']).replace(/\s/g, '');
                        if (articleCategory == category) {
                            $scope.deleteArticle(doc['shared'][i]['id']);
                        }
                    }
                    for (i in doc['history']) {
                        articleCategory = String(doc['history'][i]['category']).replace(/\s/g, '');
                        if (articleCategory == category) {
                            $scope.deleteArticle(doc['history'][i]['id']);
                        }
                    }
                })
            })
        }
    }
    $scope.updateArticles = function (category) {
        if (localStorage.getItem(category) == 'true') {
            var db = PouchDB('momlink');
            db.get('articles').then(function (doc) {
                /*for (i in doc['shared']) {
                    articleCategory = String(doc['shared'][i]['category']).replace(/\s/g, '');
                    if (articleCategory == category) {
                        $scope.deleteArticle(doc['shared'][i]['id']);
                    }
                }
                for (i in doc['history']) {
                    articleCategory = String(doc['history'][i]['category']).replace(/\s/g, '');
                    if (articleCategory == category) {
                        $scope.deleteArticle(doc['history'][i]['id']);
                    }
                }*/
                for (i in doc['shared']) {
                    articleCategory = String(doc['shared'][i]['category']).replace(/\s/g, '');
                    if (articleCategory == category) {
                        $scope.downloadArticle(doc['shared'][i]['link'], doc['shared'][i]['id']);
                    }
                }
                for (i in doc['history']) {
                    articleCategory = String(doc['history'][i]['category']).replace(/\s/g, '');
                    if (articleCategory == category) {
                        $scope.downloadArticle(doc['history'][i]['link'], doc['history'][i]['id']);
                    }
                }
            })
        }
    }
    $scope.downloadArticle = function (articleURL, articleID) {
        //The directory to store data
        var store = cordova.file.dataDirectory;
        //URL of our asset
        var assetURL = articleURL;
        //File name of our important data file we didn't ship with the app
        var fileName = articleID.concat('.html');
        //Check for the file. 
        window.resolveLocalFileSystemURL(store + fileName, doNothing, downloadAsset);
        function downloadAsset() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(assetURL, store + fileName,
                function (entry) {
                    console.log("Success!");
                },
                function (err) {
                    console.log(err);
                });
        }
        function doNothing(entry) {
            //this should not fire on download
            console.log('deletion was not successful')
        }
    }
    $scope.deleteArticle = function (articleID) {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
            dir.getFile(articleID.concat('.html'), { create: false }, function (fileEntry) {
                fileEntry.remove(function (file) {
                    console.log("deletion successful");
                }, function (error) {
                    console.log(articleID)
                    console.log("error " + error.code);
                }, function () {
                    console.log("cannot access file system");
                });
            });
        });
    }
})

.controller('SurveyCtrl', function ($scope, $ionicPopup, $ionicModal, $compile) {
    $scope.renderSurveys = function () {
        var db = PouchDB('momlink');
        var html = '<div class="list">';
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                if (events[i]['survey'] != null) {
                    if (moment(events[i]['end']) < moment() && events[i]['survey'].length > 0 && events[i]['survey'][0].length < 3) {
                        html += `<a class="item" ng-click="renderSurvey('` + events[i]['id'] + `')">` + events[i]['title'] + ` follow-up</a>`
                    }
                }
            }
            html += '</div>';
            $('#recent').html(html);
            $compile($('#recent'))($scope);
        })
    };
    $scope.renderPastSurveys = function () {
        var db = PouchDB('momlink');
        var html = '<div class="list">';
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                if (events[i]['survey'] != null) {
                    if (moment(events[i]['end']) < moment() && events[i]['survey'].length > 0 && events[i]['survey'][0].length > 2) {
                        html += `<a class="item" ng-click="">` + events[i]['title'] + ` follow-up</a>`
                    }
                }
            }
            html += '</div>';
            $('#history').html(html);
            $compile($('#history'))($scope);
        })
    };
    $scope.renderSurvey = function (eventID) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                event = events[i]
                if (event['id'] == eventID) {
                    //get event's related survey
                    survey = event['survey'];
                    for (j in survey) {
                        question = survey[j][0];
                        answers = survey[j][1];
                        //render question
                        html += `  <div class="item item-divider">` + question + `</div>`;
                        //render answers
                        html += `<form id="` + String(j) + `">`
                        html += `<ion-list>`
                        for (k = 0; k < answers.length; k++) {
                            answer = survey[j][1][k];
                            html += `<ion-radio name="` + String(j) + `" value="` + String(answer) + `">` + answer + `</ion-radio>`;
                        }
                        html += `</ion-list>`
                        html += `</form>`
                    }
                }
            }
            $ionicPopup.show({
                title: 'Survey',
                template: html,
                buttons: [
                  {
                      text: 'Finish', onTap: function (e) {
                          $scope.saveSurvey(eventID);
                          return 'Create';
                      },
                      type: 'button-positive'
                  }
                ],
            });
        });
    };
    $scope.saveSurvey = function (eventID) {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                event = events[i]
                if (event['id'] == eventID) {
                    for (j in event['survey']) {
                        selectedAnswer = $(`input[name="` + String(j) + `"]:checked`, `#`.concat(j)).val();
                        event['survey'][j].push(selectedAnswer);
                    }
                    return db.put(doc)
                }
            }
        }).then(function () {
            var db = PouchDB('momlink');
            db.get('events').then(function (doc) {
                events = doc['events'];
            })
        }).then(function () {
            $scope.toNewPage('survey.html', 'Survey')
        })
    };
})

.controller('ReferralCtrl', function ($scope, $ionicPopup, $timeout, $compile) {
    $scope.showReferrals = function (type) {
        var db = PouchDB('momlink');
        var html = '<div class="list">';
        var meetingTime = '';
        db.get('referrals').then(function (doc) {
            referrals = doc['referrals'];
            db.get('events').then(function (doc) {
                for (i in referrals) {
                    for (j in doc['events']) {
                        if (doc['events'][j]['id'] == referrals[i]['meeting']) {
                            meetingTime = doc['events'][j]['day'];
                        }
                    }
                    var today = moment().format('YYYY-MM-DD')
                    if ((type == 'recent' && (meetingTime == '' || moment(meetingTime) >= moment(today))) || (type == 'previous' && (moment(meetingTime) < moment(today)))) {
                        html += '<div class="item item-thumbnail-left">';
                        html += `<img src="">`;
                        html += '<h2 style="display:inline; vertical-align: text-bottom">' + referrals[i]['name'] + '</h2>&nbsp;'
                        html += `<a class="button button-small button-positive icon ion-ios-telephone-outline" ng-href="tel: ` + '1-' + referrals[i]['phone'] + `" style="display:inline"></a>&nbsp;`
                        html += `<a class="button button-small button-positive icon ion-ios-email-outline" ng-click="newMessage('` + referrals[i]['email'] + `','` + referrals[i]['phone'] + `')" style="display:inline"></a>`
                        html += '<p>Referred on ' + referrals[i]['date'] + '</p>';
                        html += '<p>Address: ' + referrals[i]['address'] + '</p>';
                        html += '<p>Phone: ' + referrals[i]['phone'] + '</p>';
                        html += '<p>Email: ' + referrals[i]['email'] + '</p>';
                        if (referrals[i]['meeting'] == '') {
                            html += `<button class="button button-small button-positive" ng-click="schedule('` + referrals[i]['id'] + `')">Schedule Meeting</button>`;
                        }
                        else {
                            html += `<button class="button button-small button-stable" ng-click="viewEvent('` + referrals[i]['meeting'] + `', 'referrals.html', 'Referrals')">View Meeting</button>`;
                        }
                        html += '</div>';
                    }
                    meetingTime = '';
                }
            }).then(function () {
                html += '</div>';
                $('#' + type).html(html);
                $compile($('#' + type))($scope);
            })
        });
    };
    $scope.schedule = function (id) {
        window.localStorage.setItem('referralID', id);
        $scope.createEvent('referrals.html', 'Referrals');
    }
})

.controller('JournalCtrl', function ($scope, $ionicPopup, $ionicModal, $compile) {
    $scope.renderPhotoJournal = function () {
        var start;
        var end;
        var db = PouchDB('momlink');
        //get start/end date
        db.get('profile').then(function (doc) {
            start = doc['startDate'];
            end = doc['deliveryDate'];
            if (end == '') {
                $('#photoJournal').html('Please set your expected delivery date in the "My Profile" section');
                $compile($('#photoJournal'))($scope);
            }
            else {
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
                        html += `<div class="col-33 text-center padding activeWeek" ng-click="renderGallery('` + displayDate + `',` + weekCounter + `)"><b>Week:</b> ` + weekCounter + `<br>` + displayDate + `</div>`;
                    }
                        //normal week
                    else {
                        html += `<div class="col-33 text-center padding nonActiveWeek" ng-click="renderGallery('` + displayDate + `',` + weekCounter + `)"><b>Week:</b> ` + weekCounter + `<br>` + displayDate + `</div>`;
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
                $scope.currentWeek = weekCounter;
                $('#photoJournal').html(html);
                $compile($('#photoJournal'))($scope);
            }
        });
    }
    $scope.renderGallery = function (displayDate, week) {
        var weeksPhotos = [];
        var selectedWeek = 'Week' + String(week);
        var counter = 1;
        var colSpacer = 1;
        html = `<div class="bar bar-header"><button class ="button button-icon icon ion-reply" ng-click="renderPhotoJournal()"></button><div class ="title">` + displayDate + `</div></div>`;
        html += '<div class="list has-header">';
        html += '<div class="row" style="padding-right:0; padding-left:0; padding-top:0;">';
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            dir.getDirectory('MomLink', { create: false, exclusive: false },
            function (directory) {
                directory.createReader().readEntries(
                    function (entries) {
                        //get urls of photos for the week
                        for (i = 0; i < entries.length; i++) {
                            if (entries[i].name.substr(0, entries[i].name.indexOf('T')) == selectedWeek) {
                                weeksPhotos.push(entries[i].toURL())
                            }
                        }
                        //get render weeks photos
                        for (j = 0; j < weeksPhotos.length; j++) {
                            html += `<div class="col-33 photoJournalBorder"><image src="` + weeksPhotos[j] + `" ng-click="openFile('` + String(weeksPhotos[j]) + `','image/jpeg')" style="max-width:100%;height:auto%;">`
                            html += `<button class="button button-small button-full button-positive" ng-click="shareImage('` + weeksPhotos[j] + `')">SHARE</button></div>`;
                            if (colSpacer % 3 == 0) {
                                html += `</div><div class="row" style="padding-right:0; padding-left:0; padding-top:0">`;
                            }
                            colSpacer++;
                            counter++;
                        }
                        html += '</div>';
                        html += '</div>';
                        $('#photoJournal').html(html);
                        $compile($('#photoJournal'))($scope);
                    }
                );
            });
        });
    };
    $scope.renderNotes = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('journal').then(function (doc) {
            notes = doc['notes'];
            html += '<div class="list">';
            for (i in notes) {
                html += `<a class="item" ng-click="editNote('` + notes[i]['id'] + `')">`;
                html += '<h2 style="display:inline">' + notes[i]['subject'] + '</h2> &nbsp;';
                html += '<p style="display:inline">' + notes[i]['date'] + '</p>';
                html += '<p>' + notes[i]['description'] + '</p>';
                html += '</a>';
            }
            html += '</div>';
            $('#notes').html(html);
            $compile($('#notes'))($scope);
        });
    };
    $scope.createNote = function (link, title) {
        $scope.modal = $ionicModal.fromTemplateUrl('noteModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    };
    $scope.saveNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            var note = {
                "id": new Date(),
                "date": moment().format('MMMM Do YYYY'),
                "subject": $('#subject').val(),
                "description": $("#description").val()
            };
            doc['notes'].push(note);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('journal.html', 'My Journal');
            $scope.closeModal();
        });
    };
    $scope.editNote = function (noteID) {
        $scope.modal = $ionicModal.fromTemplateUrl('editNoteModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
        $scope.noteID = noteID;
    };
    $scope.pullNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            $('#subject').val(doc['notes'][i]['subject']);
            $('#description').val(doc['notes'][i]['description']);
        })
    };
    $scope.updateNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            doc['notes'][i]['subject'] = $('#subject').val();
            doc['notes'][i]['description'] = $('#description').val();
            return db.put(doc);
        }).then(function () {
            $scope.toNewPage('journal.html', 'My Journal');
            $scope.closeModal();
        })
    };
    $scope.deleteNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            doc['notes'].splice(i, 1)
            return db.put(doc);
        }).then(function () {
            $scope.toNewPage('journal.html', 'My Journal');
            $scope.closeModal();
        })
    };
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            $scope.modal.remove();
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
            $('#pnccVisits').html(html);
            $compile($('#pnccVisits'))($scope);
        });
    };
})

.controller('TrackCtrl', function ($scope, $ionicModal) {
    formatDate = function (d) {
        var selectedDate = moment(d).format('MMMM Do YYYY')
        today = moment().format('MMMM Do YYYY')
        $scope.currentDate = d;
        if (selectedDate == today) {
            selectedDate = "Today, ".concat(selectedDate);
        }
        return selectedDate;
    };
    $scope.increaseDate = function () {
        var d = new Date($scope.currentDate);
        d.setDate(d.getDate() + 1)
        $('#todaysDate').html(formatDate(d));
    };
    $scope.decreaseDate = function () {
        var d = new Date($scope.currentDate);
        d.setDate(d.getDate() - 1)
        $('#todaysDate').html(formatDate(d));
    };
    $scope.loadHistory = function () {
        //nutrition is handled differently
        var el = $scope.trackType;
        if (el == 'addNutrition') {
            $scope.modal = $ionicModal.fromTemplateUrl("addNutrition.html", {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            })
        }
        else {
            var type;
            switch ($scope.trackType) {
                case 'addActivity':
                    type = 'activity';
                    break;
                case 'addBabyHeartRate':
                    type = 'babyHeartRate';
                    break;
                case 'addBloodGlucose':
                    type = 'bloodGlucose';
                    break;
                case 'addBloodIron':
                    type = 'bloodIron';
                    break;
                case 'addBloodPressure':
                    type = 'bloodPressure';
                    break;
                case 'addCaffeine':
                    type = 'caffeine';
                    break;
                case 'addCigarette':
                    type = 'cigarette';
                    break;
                case 'addNutrition':
                    type = 'nutrition';
                    break;
                case 'addKicks':
                    type = 'kicks';
                    break;
                case 'addMood':
                    type = 'mood';
                    break;
                case 'addPain':
                    type = 'pain';
                    break;
                case 'addPill':
                    type = 'pill';
                    break;
                case 'addStress':
                    type = 'stress';
                    break;
                case 'addWeight':
                    type = 'weight';
                    break;
            }
            var db = PouchDB('momlink');
            db.get('track').then(function (doc) {
                var date = new Date($scope.currentDate);
                date = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
                var hist = '';
                elements = doc[type]
                for (var i in elements) {
                    if (date == elements[i]["date"]) {
                        if (type == 'activity') {
                            time = elements[i]["time"].substring(0, elements[i]["time"].length - 3);
                            hist += '<center><div class="item">' + $scope.convert24to12(time) + ' &nbsp; ' + elements[i]["act"] + ' &nbsp; Length: ' + elements[i]["value"] + '</div></center>';
                        }
                        else {
                            time = elements[i]["time"].substring(0, elements[i]["time"].length - 3);
                            hist += '<center><div class="item">' + $scope.convert24to12(time) + '&nbsp; &nbsp; &nbsp; ' + elements[i]["value"] + '</div></center>';
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
                $('#history').html(hist);
            })
        };
    }

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
        $('#description').html(description);
    };

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
        var countEl = $("#" + active).html();

        if (pm == 'plus') {
            countEl++;
            $("#" + active).html(countEl);
        }
        if (pm == 'minus' && countEl > 0) {
            countEl--;
            $("#" + active).html(countEl);
        }
    }
    $scope.plusMinus = function (pm, id) {
        var countEl = $("#" + id).html();
        if (pm == 'plus') {
            countEl++;
            $("#" + id).html(countEl);
        }
        if (pm == 'minus' && countEl > 0) {
            countEl--;
            $("#" + id).html(countEl);
        }
    }
    $scope.clear = function (id, num) {
        $("#" + id).html(num);
    }

    var hour = 0;
    var totalMinutes = $('#minute');
    var totalHours = $('#hour');
    $scope.actAddHour = function () {
        hour++;
        totalHours.value = hour;
        $('#hour').html(("0" + totalHours.value).slice(-2));
    }
    $scope.actSubtractHour = function () {
        if (totalHours.value > 0) {
            hour--;
            totalHours.value = hour;
            $('#hour').html(("0" + totalHours.value).slice(-2));
        }
    }
    $scope.actClear = function () {
        hour = 0;
        totalMinutes.value = 0;
        $('#minute').html(("0" + totalMinutes.value).slice(-2));
        totalHours.value = 0;
        $('#hour').html(("0" + totalMinutes.value).slice(-2));
    }

    $scope.submitAct = function (type) {
        var db = PouchDB('momlink');
        hour = $('#hour').html();
        min = $('#minute').html();
        value = String(hour + ":" + min);
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "act": $scope.selectAct,
                "value": value
            };
            doc['activity'].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.submit = function (type) {
        var db = PouchDB('momlink');
        value = $('#count').html();
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": value
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
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
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": value
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.submitBP = function () {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": $('#count').html() + "/" + $('#count2').html()
            };
            doc['bloodPressure'].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.submitAdd = function (type) {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": parseInt($('#count12').html()) * (.5) + parseInt($('#count1').html())
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.submitSet = function (value, type) {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": value
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
})

.controller('PopOverCtrl', function ($scope, $ionicPopover) {
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

.controller('ProfileCtrl', function ($scope) {
    $scope.updateProfile = function () {
        var db = PouchDB('momlink');
        db.get('profile').then(function (doc) {
            doc['name'] = $('#name').val(),
            doc['email'] = $('#email').val(),
            doc['age'] = $('#age').val(),
            doc['deliveryDate'] = $('#delivery').val(),
            doc['aboutMe'] = $('#about').val(),
            doc['doctorsName'] = $('#dName').val(),
            doc['doctorsEmail'] = $('#dEmail').val(),
            doc['doctorsPhone'] = $('#dNumber').val()
            return db.put(doc).then(function (doc) {
                $scope.toNewPage('home.html', 'Momlink');
            });
        });
    }
    $scope.getProfile = function () {
        var db = PouchDB('momlink');
        db.get('profile').then(function (doc) {
            $('#name').val(doc['name']);
            $('#email').val(doc['email']);
            $('#age').val(doc['age']);
            $('#delivery').val(doc['deliveryDate']);
            $('#about').val(doc['aboutMe']);
            $('#dName').val(doc['doctorsName']);
            $('#dEmail').val(doc['doctorsEmail']);
            $('#dNumber').val(doc['doctorsPhone']);
        });
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            dir.getDirectory('MomLink', { create: false, exclusive: false },
            function (directory) {
                directory.getFile("profilePic.jpg", { create: false, exclusive: false }, getPic);
            },
            resOnError);
        },
        resOnError);
        function getPic(pic) {
            var img = document.getElementById('profilePic');
            img.src = pic.toURL();
        }
        function resOnError(error) {
            if (error.code != '1') {
                alert(error.code);
            }
        }
    }
})

.controller('ClockCtrl', function () {
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
                    $('#minute').html(("0" + THIS.minute.value).slice(-2));
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

.controller('CameraCtrl', function ($scope) {
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
            saveToPhotoAlbum: false,
            correctOrientation: true
        });
        onPhotoDataSuccess = function (imageData) {
            window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
            //Callback function when the file system url has been resolved
            function resolveOnSuccess(entry) {
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getDirectory('MomLink', { create: true, exclusive: false },
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
                //$scope.toNewPage('myProfile.html', 'My Profile')
            }
            function resOnError(error) {
                alert(error.code);
            }
        }
    }
    $scope.takeJournalPhoto = function () {
        var name = moment().format('TMMDDYYYYhhmmss');
        week = 'Week' + $scope.currentWeek;
        navigator.camera.getPicture(function (imageData) {
            onPhotoDataSuccess(imageData)
        }, $scope.onFail, {
            quality: 50,
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
                fileName = week + name + ".jpg";
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getDirectory('MomLink', { create: true, exclusive: false },
                    function (directory) {
                        console.log(fileName)
                        entry.moveTo(directory, fileName, successMove, resOnError);
                    }, resOnError);
                }, resOnError);
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
        if (message != 'Camera cancelled.') {
            alert('Failed because: ' + message);
        }
    }
})

/*.controller('DataController', function ($scope, $compile) {
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
})*/