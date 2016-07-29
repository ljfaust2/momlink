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
                    "agency": "",
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
                        { "name": "Danna Shanley", "email": "shanley@gmail.com", "phone": "920-655-1875", "image": "../img/temp/pncc1.jpg" },
                        { "name": "Lydia Cady", "email": "cady@gmail.com", "phone": "", "image": "../img/temp/pncc2.jpg" },
                        { "name": "Jane Marston", "email": "", "phone": "555-555-5555", "image": "../img/temp/pncc3.jpg" },
                        { "name": "Kendra Venne", "email": "", "phone": "", "image": "../img/temp/pncc4.jpg" }
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
                            "title": 'Smoking Cessation Program',
                            "category": 'Referral',
                            "day": '2016-07-27',
                            "start": '2016-07-27T10:11',
                            "end": '2016-07-27T14:11',
                            "venue": '',
                            "description": '',
                            "color": 'red',
                            "scheduledBy": '0',
                            "viewed": '0',
                            "survey":
                                [
                                ['Please rate your experience', ['Satisfactory', 'Unsatisfactory']],
                                ['How likely are you to reccommend us to a friend?', ['Unlikely', 'Likely', 'Very Likely']]
                                ],
                            "dateSurveyGiven": '7/27/2016',
                            "dateSurveyTaken": '',
                            "questions": []
                        }
                    ],
                    "questions":
                        {
                            '1': `How can I tell if the symptoms I'm having are normal?`,
                            '2': `When should I call a doctor?`,
                            '3': `Is there anything I should do to prepare?`
                        }
                });
            }
        });
        db.get('goals').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "goals",
                    'goals': [
                        {
                            'id': '12345', 'name': 'Attend a Safety Class', 'type': 'class', 'classes': {
                                '07/16/2016': ['Venue1', '12:00', '15:00', 'Instructor1'],
                                '07/17/2016': ['Venue2', '12:00', '15:00', 'Instructor2'],
                                '07/18/2016': ['Venue3', '12:00', '15:00', 'Instructor3'],
                                '07/19/2016': ['Venue4', '12:00', '15:00', 'Instructor4']
                            }, 'eventID': '', 'completed': 'false'
                        },
                        {
                            'id': '12346', 'name': 'Attend a BABE Class', 'type': 'class', 'classes': {
                                '07/27/2016': ['Venue1', '12:00', '15:00', 'Instructor 1'],
                                '07/28/2016': ['Venue2', '12:00', '15:00', 'Instructor 2'],
                                '07/29/2016': ['Venue3', '12:00', '15:00', 'Instructor 3'],
                                '07/30/2016': ['Venue4', '12:00', '15:00', 'Instructor 4']
                            }, 'eventID': '', 'completed': 'false'
                        },
                        {
                            'id': '12347', 'name': 'Meet with a PNCC', 'type': 'meet', 'eventID': '', 'completed': 'false'
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
        db.get('nutrition').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "nutrition",
                    'fruits': [],
                    "vegetables": [],
                    "proteins": [],
                    "grains": [],
                    "dairy": [],
                    "fluids": [],
                    "sweets": [],
                    "fats/oils": [],
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
                            "format": "Website",
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
                            "format": "Website",
                            "dateShared": "6/28/2016",
                            "lastRead": "",
                            "readHistory": {},
                            "quizHistory": {},
                            "quiz":
                                [
                                ['Pregnant women with high blood pressure may have an increased risk for metabolic syndrome.', ['True', 'False'], '0'],
                                ['The study found that women with high blood pressure were twice as likely to develop metabolic syndrome.', ['True', 'False'], '1'],
                                ['Metabolic syndrome increases the risk of heart disease.', ['True', 'False'], '0']
                                ]
                        },
                        {
                            "id": "3",
                            "title": "Folic Acid Now Added to Corn Masa Flour: FDA",
                            "description": "Adding folic acid to corn masa flour could help reduce birth defects among Hispanic babies in the United States, the U.S. Food and Drug Administration says.",
                            "category": "Diet",
                            "link": "http://www.webmd.com/baby/news/20160617/folic-acid-now-added-to-corn-masa-flour-fda",
                            "format": "Website",
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
                            "title": "Are Mom’s Diet Drinks Boosting Baby’s Weight?",
                            "description": "Pregnant women who drink artificially sweetened drinks every day may be more likely to give birth to heavier babies who are then more likely to become overweight children, researchers report.",
                            "category": "Diet",
                            "link": "http://www.webmd.com/baby/news/20160509/artificial-sweeteners-during-pregnancy-may-make-for-heavier-infants",
                            "format": "Website",
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
                            "title": "Lots of Fish in Pregnancy and Kids' Obesity Risk",
                            "description": "Babies whose mothers eat high amounts of fish during pregnancy appear to be at raised risk for obesity in childhood, and pollutants in the fish may drive the effect, a new study finds.",
                            "category": "Diet",
                            "link": "http://www.webmd.com/baby/news/20160215/lots-of-fish-in-pregnancy-tied-to-higher-obesity-risk-in-kids",
                            "format": "Website",
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
                            "name": "Active Health & Wellness Center",
                            "address": "South Bend, Indiana",
                            "phone": "877-826-7357",
                            "email": "",
                            "date": "7/5/2016",
                            "meeting": "",
                            "img": "../img/referrals/ahwc.png"
                        },
                        {
                            "id": "2",
                            "name": "Smoking Cessation Program",
                            "address": "South Bend, Indiana",
                            "phone": "574-647-6880",
                            "email": "greene@gmail.com",
                            "date": "7/1/2016",
                            "meeting": "",
                            "img": "../img/referrals/smokingCessation.PNG"
                        },
                        {
                            "id": "3",
                            "name": "Childbirth Center Classes",
                            "address": "South Bend, Indiana",
                            "phone": "574-647-3540",
                            "email": "",
                            "date": "6/28/2016",
                            "meeting": "",
                            "img": "../img/referrals/mh.PNG"
                        },
                        {
                            "id": "4",
                            "name": "Karissa Morelock",
                            "address": "South Bend, Indiana",
                            "phone": "574-318-3412",
                            "email": "morelock@gmail.com",
                            "date": "6/25/2016",
                            "meeting": "",
                            "img": "../img/referrals/morelock.jpg"
                        },
                        {
                            "id": "5",
                            "name": "Andrew McMahon",
                            "address": "Concord, Massachusetts",
                            "phone": "555-555-5555",
                            "email": "amitw@gmail.com",
                            "date": "6/22/2016",
                            "meeting": "",
                            "img": "../img/referrals/amm.jpg"
                        },
                    ],
                });
            }
        });
        db.get('userData').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "userData",
                    "userData": []
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

        });
    }*/

    $scope.getInformation = function (which_script, update_type, reg_log, reg_pss, reg_pss, reg_sec, reg_ans, first_time_user) {
        /*
            which_script:
                Determines which set of information is updated
                1 => update
                2 => register
                3 => first_time_user

            update_type:
                1 => Update All
                2 => Update Referrals Only
                3 => Update Topics Only
                4 => Update Messages Only
                5 => Update Events Only
                6 => Update PNCC Only

            reg_log:
                if new registration, the login id of new user

            reg_pss:
                if new registration, the password of new user

            reg_sec:
                if new registration, the security question of the new user

            reg_ans:
                if new registration, the security question answer of the new user

            first_time_user:
                the username of the first time app user

            The following is the default:
                which_script = 1
                update_type = 1
                reg_log = ""
                reg_pss = ""
                reg_sec = ""
                reg_ans = ""
                first_time_user = ""
        */
        // Default Parameters
        var which_script = typeof which_script !== 'undefined' ? which_script : 1;
        var update_type = typeof update_type !== 'undefined' ? update_type : 1;
        var reg_log = typeof reg_log !== 'undefined' ? reg_log : "";
        var reg_pss = typeof reg_pss !== 'undefined' ? reg_pss : "";
        var reg_sec = typeof reg_sec !== 'undefined' ? reg_sec : "";
        var reg_ans = typeof reg_ans !== 'undefined' ? reg_ans : "";
        var first_time_user = typeof first_time_user !== 'undefined' ? first_time_user : "";

        // TEMP SET CLIENT ID: 9999 FOR TESTING
        // UPDATE AGENCY ID AS WELL FROM DATABASE
        var client_id = 9999;
        var agency_id = 9999;

        var db = PouchDB('momlink');

        if (navigator.connection.type == Connection.NONE) {
            $ionicPopup.alert({ title: 'No network connection' });
        }
        else {
            switch (which_script) {
                case 1:
                    // Update
                    db.get('login').then(function (doc) {
                        var post_information = { 'client_id': client_id, 'type': update_type, 'agency': agency_id };
                        $.ajax({
                            url: 'https://momlink.crc.nd.edu/~jonathan/current/update.php',
                            type: 'POST',
                            dataType: 'json',
                            data: post_information,
                            complete: function (data) {
                                data = JSON.parse(data['responseText']);
                                switch (update_type) {
                                    case 1:
                                        update_all(data);
                                        break;
                                    case 2:
                                        update_referrals(data['referrals']);
                                        break;
                                    case 3:
                                        update_topics(data['topics']);
                                        break;
                                    case 4:
                                        update_messages(data['messages']);
                                        break;
                                    case 5:
                                        update_events(data['events']);
                                        break;
                                    case 6:
                                        update_pncc(data['pncc']);
                                        break;
                                }
                            }
                        });
                    });
                    break;
                case 2:
                    // New User Registration
                    // TODO: Think more about this registration process...should there be some sort of output?
                    // I still believe there should be a login script...
                    //           On login, call the login script which will fetch the login information...
                    //           The app will then auto call update...
                    if (reg_log != "" && reg_pss != "" && reg_sec != "" && reg_ans != "") {
                        var post_information = { 'username': reg_log, 'password': reg_pss, 'sec_question': reg_sec, 'answer': reg_ans };
                        $.ajax({
                            url: 'https://momlink.crc.nd.edu/~jonathan/current/register.php',
                            type: 'POST',
                            dataType: 'json',
                            data: post_information,
                            complete: function (data) {
                                update_login_table(data);
                            }
                        });
                    } else {
                        $ionicPopup.alert({ title: 'Please complete each field to continue' });
                    }
                    break;
                case 3:
                    // First time user
                    // Still unhappy with this method....create a login script which gets rid of this need
                    if (first_time_user !== "") {
                        var post_information = { 'username': first_time_user };
                        $.ajax({
                            url: 'https://momlink.crc.nd.edu/~jonathan/current/first_time_user.php',
                            type: 'POST',
                            dataType: 'json',
                            data: post_information,
                            success: function (data) {
                                // Insert this information into local login table
                                update_login_table(data);
                                $ionicPopup.alert({ title: 'Login Information Retrieved To Phone' });
                            }
                        });
                    } else {
                        $ionicPopup.alert({ title: 'Please enter a username' });
                    }
                    break;
                default:
                    console.log("Improper Call");
                    break;
            }
            //}

            /*
                Updating Retrives a json that looks like the following:
    
                {
                    "referrals" : [
                                        0 => { "success" : value, "message" : value }
                                        1 => { information ... }
                                        ...
                                        n => { information ... }
                                  ],
                    "topics" : [ ... ],
                    "messages" : [ ... ],
                    "events" : [ ... ],
                    "pnccs" : [ ... ]
                }
            */
            // Helper Functions:
            function update_all(data) {
                // Expects a json file, cascades
                console.log(data);
                update_referrals(data['referrals']);
                update_topics(data['topics']);
                update_messages(data['messages']);
                update_events(data['events']);
                update_pnccs(data['pncc']);
            }

            function update_referrals(data) {
                if (data[0]['success'] == 0) {
                    // New information here, input into local database
                    db.get('referrals').then(function (doc) {
                        for (line in data) {
                            if (!line.hasOwnProperty('success')) {
                                db.post({
                                    "encounter_code": line['encounter_code'],
                                    "client_id": line['client_id'],
                                    "pncc_id": line['pncc_id'],
                                    "encounter_date": line['encoutner_date'],
                                    "next_homevisit_date": line['next_homevisit_date'],
                                    "assessment_id": line['assessment_id'],
                                    "evaluation_code": line['evaluation_code'],
                                    "meeting_type": line['meeting_type'],
                                    "meeting_desc": line['meeting_desc'],
                                    "babe_coupon": line['babe_coupon'],
                                    "status": line['status'],
                                    "referral_status": line['status'],
                                    "referral_id": line['referral_id'],
                                    "id": line['id'],
                                    "rtype": line['rtype'],
                                    'name': line['name'],
                                    'address': line['address'],
                                    'phone': line['phone'],
                                    'phone2': line['phone2'],
                                    'email': line['email'],
                                    'url': line['url'],
                                    'description': line['description'],
                                    'hours': line['hours'],
                                    'fax': line['fax'],
                                    'county': line['county']
                                });
                            }
                        }
                    });
                } else {
                    $ionicPopup.alert({ title: data[0]['message'] });
                }
            }
            function update_topics(data) {
                if (data[0]['success'] == 0) {
                    // New information here, input into local database
                    db.get('articles').then(function (doc) {
                        for (line in data) {
                            if (!line.hasOwnProperty('success')) {
                                db.post({
                                    "encounter_code": line['encounter_code'],
                                    "encounter_date": line['encounter_date'],
                                    "filename": line['filename'],
                                    "id": line['id'],
                                    "image": line['image'],
                                    "meeting_desc": line['meeting_desc'],
                                    "meeting_type": line['meeting_type'],
                                    "path": line['path'],
                                    "pncc_id": line['pncc_id'],
                                    "status": line['status'],
                                    "title": line['title'],
                                    "topic": line['topic'],
                                    "topic_id": line['topic_id'],
                                    "topic_status": line['topic_status'],
                                    "upload_date": line['upload_date'],
                                    "uploader": line['uploader']
                                });
                            }
                        }
                    });
                } else {
                    // Nothing new, or something went wrong, check data[0]['message'] for details
                    $ionicPopup.alert({ title: data[0]['message'] });
                }
            }
            function update_messages(data) {
                if (data[0]['success'] == 0) {
                    db.get('inbox').then(function (doc) {
                        for (line in data) {
                            if (!line.hasOwnProperty('success')) {
                                db.post({
                                    "content": line['content'],
                                    "detail_type": line['detail_type'],
                                    "excerpt": line['excerpt'],
                                    "mdate": line['mdate'],
                                    "method": line['method'],
                                    "msgid": line['msgid'],
                                    "sender": line['sender'],
                                    "subject": line['subject']
                                });
                            }
                        }
                    });
                } else {
                    $ionicPopup.alert({ title: data[0]['message'] });
                }
            }
            function update_events(data) {
                if (data[0]['success'] == 0) {
                    // New information here, input into local database
                    db.get('events').then(function (doc) {
                        for (line in data) {
                            if (!line.hasOwnProperty('success')) {
                                db.post({
                                    'agency': line['agency'],
                                    'allDay': line['allDay'],
                                    'description': line['description'],
                                    'edate': line['edate'],
                                    'end': line['end'],
                                    'id': line['id'],
                                    'start': line['start'],
                                    'title': line['title'],
                                    'url': line['url'],
                                    'venue': line['venue']
                                });
                            }
                        }
                    });
                } else {
                    // Nothing new, or something went wrong, check data[0]['message'] for details
                    $ionicPopup.alert({ title: data[0]['message'] });
                }
            }
            function update_pnccs(data) {
                if (data[0]['success'] == 0) {
                    // New information here, input into local database
                    db.get('pncc').then(function (doc) {
                        for (line in data) {
                            if (!line.hasOwnProperty('success')) {
                                db.post({
                                    'about': line['about'],
                                    'agency': line['agency'],
                                    'email': line['email'],
                                    'fax': line['fax'],
                                    'first_name': line['first_name'],
                                    'image_path': line['image_path'],
                                    'last_name': line['last_name'],
                                    'middle_name': line['middle_name'],
                                    'office': line['office'],
                                    'phone': line['phone']
                                });
                            }
                        }
                    });
                } else {
                    // Nothing new, or something went wrong, check data[0]['message'] for details
                    $ionicPopup.alert({ title: data[0]['message'] });
                }
            }
            function update_login_table(data) {
                db.get('login').then(function (doc) {
                    db.put({
                        "_id": "user_info",
                        "login_code": data[1]['login_code'],
                        "username": data[1]['username'],
                        "password": data[1]['password'],
                        "reset_code": data[1]['reset_code'],
                        "answer": data[1]['answer'],
                        "sec_question": data[1]['sec_question'],
                        "client_id": data[1]['client_id'],
                        "agency": data[1]['agency']
                    }).catch(function (err) {
                        console.log(err);
                    });
                });
            }
        }
    }

    $scope.clientUpdates = function () {
        // Which fetches are repeatable.
        // All sends are repeatable.
        document.addEventListener("deviceready", function () {

        });
    }
    $scope.toggleRightSideMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    //ion-subheader
    $scope.renderSubheaderDate = function () {
        today = moment().format('MMMM Do YYYY');
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
                    todaysEvents.push([startingTime, events[i]['id'], events[i]['category']]);
                }
            }
            //elements in todaysEvents are comprised of [time, id, category]
            todaysEvents = sortTimes(todaysEvents)
            for (j in todaysEvents) {
                html += `<div class="col">`;
                html += `<img src="` + $scope.getEventImg(todaysEvents[j][2]) + `" ng-click="viewEvent('` + todaysEvents[j][1] + `', 'home.html', 'Momlink')" style="height:60%;"><br>`;
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
    $scope.getEventImg = function (type) {
        switch (type) {
            case 'OB Appt':
                return '../img/eventCategories/obAppt.png';
            case 'Lab':
                return '../img/eventCategories/lab.png';
            case 'Referral':
                return '../img/eventCategories/referral.png';
            case 'PNCC':
                return '../img/eventCategories/pncc.png';
            case 'Ultra':
                return '../img/eventCategories/ultra.png';
            case 'Class':
                return '../img/eventCategories/class.png';
            case 'Other':
                return '../img/mainIcons/momlink_icon-19.png';
        }
    };

    $scope.resetArticleHeader = function () {
        var db = PouchDB('momlink');
        cycle1 = 0;
        db.get('articles').then(function (doc) {
            articles = doc['shared'];
            if (articles == '') {
                $('#articlesHeader').html('No New Articles');
                $compile($('#articlesHeader'))($scope);
            }
            else {
                articleHtml = `<div class="row centerWhite" ng-controller="EducationCtrl">`;
                var img;
                if (articles[cycle1]['category'] == 'Smoking') { img = '../img/articles/smoking.png' }
                if (articles[cycle1]['category'] == 'Blood Pressure') { img = '../img/articles/bloodpressure.png' }
                if (articles[cycle1]['category'] == 'Diet') { img = '../img/articles/diet.png' }
                articleHtml += `<div class="col-15" align="left"><img src="` + img + `" style="height:60%;"></div>`;
                articleHtml += `<div class="col no-padding" align="left">`;
                articleHtml += `<span style="display: inline-block; max-height:75%; overflow:hidden">` + articles[cycle1]['description'] + `</span>`;
                articleHtml += `<button class="button button-small button-stable" ng-click="renderArticle('shared',` + String(articles[cycle]['id']) + `)">Read More</button>&nbsp;`;
                articleHtml += `<button class="button button-small button-stable" ng-click="renderQuiz('shared',` + String(articles[cycle]['id']) + `)">Take Quiz</button>`;
                articleHtml += `</div></div>`;
                $('#articlesHeader').html(articleHtml);
                $compile($('#articlesHeader'))($scope);
            }
        })
    };
    $scope.renderArticlesHeader = function () {
        var db = PouchDB('momlink');
        cycle = 0;
        db.get('articles').then(function (doc) {
            articles = doc['shared'];
            if (articles == '') {
                $('#articlesHeader').html('No New Articles');
                $compile($('#articlesHeader'))($scope);
            }
            else {
                renderHeaderArticle = function () {
                    articleHtml = `<div class="row centerWhite" ng-controller="EducationCtrl">`;
                    var img;
                    if (articles[cycle]['category'] == 'Smoking') { img = '../img/articles/smoking.png' }
                    if (articles[cycle]['category'] == 'Blood Pressure') { img = '../img/articles/bloodpressure.png' }
                    if (articles[cycle]['category'] == 'Diet') { img = '../img/articles/diet.png' }
                    articleHtml += `<div class="col-15" align="left"><img src="` + img + `" style="height:60%;"></div>`;
                    articleHtml += `<div class="col no-padding" align="left">`;
                    articleHtml += `<span style="display: inline-block; max-height:75%; overflow:hidden">` + articles[cycle]['description'] + `</span>`;
                    articleHtml += `<button class="button button-small button-stable" ng-click="renderArticle('shared',` + String(articles[cycle]['id']) + `)">Read More</button>&nbsp;`;
                    articleHtml += `<button class="button button-small button-stable" ng-click="renderQuiz('shared',` + String(articles[cycle]['id']) + `)">Take Quiz</button>`;
                    articleHtml += `</div></div>`;
                    $('#articlesHeader').fadeOut("slow", function () {
                        $('#articlesHeader').html(articleHtml);
                        $compile($('#articlesHeader'))($scope);
                        $('#articlesHeader').fadeIn("slow");
                    });
                    if (cycle == (articles.length - 1)) {
                        cycle = 0;
                    }
                    else {
                        cycle++;
                    }
                }
                renderHeaderArticle();
                //cycle through new/unread articles    
                (function cycleTodaysEvents(i) {
                    setTimeout(function () {
                        renderHeaderArticle();
                        if (--i) cycleTodaysEvents(i);
                    }, 9000)
                })(Number.POSITIVE_INFINITY);
            }
        })
    };
    $scope.getAppointmentImg = function (type) {
        switch (type) {
            case 'OB Appt':
                return '';
            case 'Lab':
                return '';
            case 'Referral':
                return '';
            case 'PNCC':
                return '';
            case 'Ultra':
                return '';
            case 'Class':
                return '';
            case 'Other':
                return '';
        }
    };
    pageHistory = [];
    $scope.backButtonListener = function () {
        document.addEventListener("backbutton", function (event) {
            //if on homepage then exit app
            if ($('#headline').html() == 'Momlink') {
                navigator.app.exitApp();
            }
            else {
                $scope.clickTracker('backButton');
                lastPage = pageHistory.pop();
                //console.log(pageHistory)
                headline = lastPage[0];
                page = lastPage[1];
                $scope.toNewPage(page, headline, true)
                navigator.app.preventDefault();
            }
        }, false);
    }

    //the first page in history should always be home.html
    var currentPage = 'home.html';
    $scope.toNewPage = function (nextPage, nextHeadline, history) {
        //prevents adding pages to history when using the back button
        if (history != true || nextPage == 'home.html') {
            //empty pageHistory
            if (nextPage == 'home.html') {
                pageHistory = [];
                $scope.currentPage = 'home.html';
            }
            //save current page and headline to history before moving to requested page
            if (document.getElementById('headline') != null) {
                var currentHeadline = $('#headline').html();
            }
            pageHistory.push([currentHeadline, currentPage])
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

    //clickTracker handles popups that cannot be tracked via clickListener
    $scope.clickListener = function () {
        var db = PouchDB('momlink');
        document.addEventListener("click", function myListener(event) {
            clickFunction = event.target.getAttribute("ng-click");
            if (clickFunction != null && clickFunction != '$buttonTapped(button, $event)') {
                //grab modal headline first, if that doesn't exist then grab app headline
                if ($('#modalHeadline').html() != null) {
                    currentPage = $('#modalHeadline').html();
                }
                else {
                    currentPage = $('#headline').html();
                }
                db.get('userData').then(function (doc) {
                    date = new moment().format('MM/DD/YYYY');
                    time = new moment().format('hh:mm:ssa');
                    console.log([currentPage, clickFunction, date, time]);
                    doc['userData'].push([currentPage, clickFunction, date, time])
                    return db.put(doc);
                })
            }
        }, false);
    };
    $scope.clickTracker = function (event) {
        //grab modal headline first, if that doesn't exist then grab app headline
        currentPage = $('#headline').html();
        var db = PouchDB('momlink');
        db.get('userData').then(function (doc) {
            date = new moment().format('MM/DD/YYYY');
            time = new moment().format('hh:mm:ssa');
            console.log([currentPage, event, date, time]);
            doc['userData'].push([currentPage, event, date, time])
            return db.put(doc);
        })
    };

    $scope.autoLogin = function () {
        //if they've logged in previously, skip the login screen
        document.addEventListener("deviceready", function () {
            if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
                window.localStorage.setItem('currentPage', 'home.html')
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
    $scope.renderBadges = function () {
        var db = PouchDB('momlink');
        var countSurveys = 0;
        var countArticles = 0;
        var countMessages = 0;
        var countReferrals = 0;
        var countEvents = 0;
        //Survey Badge
        db.get('events').then(function (doc) {
            events = doc['events'];
            for (i in events) {
                if (events[i]['survey'] != null) {
                    if (moment(events[i]['end']) < moment() && events[i]['survey'].length > 0 && events[i]['survey'][0].length < 3) {
                        countSurveys++;
                    }
                }
            }
            if (countSurveys > 0) {
                html = `<img src="../img/mainIcons/momlink_icon-19.png" ng-click="toNewPage('survey.html', 'Survey')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + countSurveys + `</span><p>Survey</p>`;
                $('#survey').html(html);
                $compile($('#survey'))($scope);
            }
        }).then(function (doc) {
            //Education Badge
            db.get('articles').then(function (doc) {
                for (i in doc['shared']) {
                    if (doc['shared'][i]['lastRead'] == '') {
                        countArticles++;
                    }
                }
                if (countArticles > 0) {
                    html = `<img src="../img/mainIcons/momlink_icon-21.png" ng-click="toNewPage('education.html', 'Education')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + countArticles + `</span><p>Education</p>`;
                    $('#education').html(html);
                    $compile($('#education'))($scope);
                }
            });
        }).then(function () {
            //Referrals Badge
            db.get('referrals').then(function (doc) {
                for (i in doc['referrals']) {
                    if (doc['referrals'][i]['meeting'] == '') {
                        countReferrals++;
                    }
                }
                if (countReferrals > 0) {
                    html = `<img src="../img/mainIcons/momlink_icon-18.png" ng-click="toNewPage('referrals.html', 'Referrals')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + countReferrals + `</span><p>Referrals</p>`;
                    $('#referrals').html(html);
                    $compile($('#referrals'))($scope);
                }
            })
        }).then(function (doc) {
            //Calendar Badge
            db.get('events').then(function (doc) {
                for (i in doc['events']) {
                    if (doc['events'][i]['viewed'] == '0') {
                        countEvents++;
                    }
                }
                if (countEvents > 0) {
                    html = `<img src="../img/mainIcons/momlink_icon-17.png" ng-click="toNewPage('calendar.html', 'Calendar')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + countEvents + `</span><p>Calendar</p>`;
                    $('#calendar').html(html);
                    $compile($('#calendar'))($scope);
                }
            })
        }).then(function (doc) {
            //Inbox Badge
            /*SMS.listSMS({ box: 'inbox', maxCount: 100000 }, function (data) {
                for (i in data) {
                    if (data[i].read != 1) {
                        countMessages++;
                    }
                }
                if (countMessages > 0) {
                    html = `<img src="../img/mainIcons/momlink_icon-16.png" ng-click="toNewPage('inbox.html', 'Inbox')" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">` + countMessages + `</span><p>Inbox</p>`;
                    $('#inbox').html(html);
                    $compile($('#inbox'))($scope);
                }
            }, function (error) { console.log(error) });*/
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
        window.localStorage.setItem('currentPage', $scope.trackType + ".html");
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
        window.localStorage.setItem('currentPage', 'addActivityTime.html');
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
                        text: 'Call', onTap: function (e) {
                            $scope.clickTracker('call');
                            window.location.href = "tel://" + '1-' + phone;
                            return 'call';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Text', onTap: function (e) {
                            $scope.clickTracker('text');
                            text();
                            return 'text';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Email', onTap: function (e) {
                            $scope.clickTracker('email');
                            mail();
                            return 'email';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Cancel', onTap: function (e) {
                            $scope.clickTracker('cancelMessage');
                            return 'cancel';
                        },
                        type: 'button-stable'
                    }
                ],
            });
        }
        else if (email == '' && phone != '') {
            $ionicPopup.show({
                title: 'Contact via',
                cssClass: 'popup-vertical-buttons',
                buttons: [
                    {
                        text: 'Call', onTap: function (e) {
                            $scope.clickTracker('call');
                            window.location.href = "tel://" + '1-' + phone;
                            return 'call';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Text', onTap: function (e) {
                            $scope.clickTracker('text');
                            text();
                            return 'text';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'Cancel', onTap: function (e) {
                            $scope.clickTracker('cancelMessage');
                            return 'cancel';
                        },
                        type: 'button-stable'
                    }
                ],
            });
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
                "category": $("#type").val(),
                "day": $('#date').val(),
                "start": start,
                "end": end,
                "venue": $('#venue').val(),
                "description": $('#description').val(),
                "questions": questions,
                "color": $scope.getColor($('#type').val()),
                "viewed": '1',
                "scheduledBy": '0'
            };
            doc['events'].push(event);
            return db.put(doc);
        }).then(function (doc) {
            //update referral meeting
            referral = window.localStorage.getItem('referralID');
            if (referral != null) {
                db.get('referrals').then(function (doc) {
                    //i = doc['referrals'].findIndex(function (e) { return e.id === referral });
                    for (i in doc['referrals']) {
                        if (doc['referrals'][i]['id'] === referral) {
                            break;
                        }
                    }
                    doc['referrals'][i]['meeting'] = $scope.eventID;
                    return db.put(doc);
                }).then(function (doc) {
                    $scope.toNewPage('referrals.html', 'Referrals');
                    $scope.closeModal();
                    window.localStorage.removeItem('referralID')
                });
            }
            else if ($scope.returnTitle == 'Goals') {
                //attach eventID to goal 
                id = window.localStorage.getItem('goalID');
                db.get('goals').then(function (doc) {
                    for (i in doc['goals']) {
                        if (doc['goals'][i]['id'] == id) {
                            doc['goals'][i]['eventID'] = $scope.eventID;
                            return db.put(doc);
                        }
                    }
                }).then(function () {
                    console.log(window.localStorage.getItem('goalID'))
                    delete $scope.eventID;
                    $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                    delete $scope.returnLink;
                    delete $scope.returnTitle;
                    $scope.closeModal();
                    window.localStorage.removeItem('goalID')
                })
            }
            else {
                $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                delete $scope.returnLink;
                delete $scope.returnTitle;
                $scope.closeModal();
            }
        });
    }
    $scope.viewEvent = function (eventID, link, title) {
        $scope.returnLink = link;
        $scope.returnTitle = title;
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            //i = doc['events'].findIndex(function (e) { return e.id === eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === eventID) {
                    break;
                }
            }
            var year = String(doc['events'][i]['day']).substring(0, 4);
            var month = String(doc['events'][i]['day']).substring(5, 7);
            var day = String(doc['events'][i]['day']).substring(8, 10);
            var date = month + '/' + day + '/' + year;
            var startTime = $scope.parseTime(doc['events'][i]['start']);
            var endTime = $scope.parseTime(doc['events'][i]['end']);
            //render template
            templateHTML = '<p><b>' + doc['events'][i]['category'] + '</b></p>';
            templateHTML += '<p><b>Date</b>: ' + date + '</p>';
            templateHTML += '<p><b>Start</b>: ' + $scope.convert24to12(startTime) + '</p>';
            templateHTML += '<p><b>End</b>: ' + $scope.convert24to12(endTime) + '</p>';
            if (doc['events'][i].venue != '') {
                templateHTML += '<p><b>Venue</b>: ' + doc['events'][i]['venue'] + '</p>'
            }
            if (doc['events'][i].description != '') {
                templateHTML += '<p><b>Description</b>: ' + doc['events'][i]['description'] + '</p>'
            }
            if (doc['events'][i]['questions'].size != 0) {
                templateHTML += '<p><b>Questions</b>:</p>'
                for (j in doc['events'][i].questions) {
                    templateHTML += doc['events'][i]['questions'][j] + '<br>';
                }
            }
            //view event
            var alertPopup = $ionicPopup.show({
                title: doc['events'][i]['title'],
                template: templateHTML,
                buttons: [
                    {
                        text: 'Edit', onTap: function (e) {
                            $scope.clickTracker('editEvent');
                            $scope.editEvent(eventID);
                            return 'Cancel';
                        },
                        type: 'button-positive'
                    },
                  {
                      text: 'Close', onTap: function (e) {
                          $scope.clickTracker('closeEvent');
                          return 'Cancel';
                      },
                      type: 'button-positive'
                  }
                ],
            });
            doc['events'][i]['viewed'] = '1';
            return db.put(doc);
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
            //i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            $('#title').val(doc['events'][i]['title']);
            $('#type').val(doc['events'][i]['category']);
            document.getElementById(doc['events'][i]['category']).classList.add('activeBorder');
            $('#date').val(doc['events'][i]['day']);
            $('#start').val($scope.parseTime(doc['events'][i]['start']));
            $('#end').val($scope.parseTime(doc['events'][i]['end']));
            $('#venue').val(doc['events'][i]['venue']);
            $('#description').val(doc['events'][i]['description']);
            //populate all current questiions
            for (j in doc['events'][i]['questions']) {
                console.log(doc['events'][i]['questions'][j])
            }
            //grab extra questions from db
            for (j in doc['events'][i]['questions']) {
                $("input[name=Q]").each(function () {
                    if (doc['events'][i]['questions'][j] == $(this).val()) {
                        //console.log(doc['events'][i]['questions'][j])
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
            //i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            doc['events'][i]['title'] = $('#title').val();
            doc['events'][i]['category'] = $('#type').val();
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
            //i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            doc['events'].splice(i, 1)
            return db.put(doc);
        }).then(function () {
            //if attached to referral, update meeting ID
            db.get('referrals').then(function (doc) {
                //i = doc['referrals'].findIndex(function (e) { return e.meeting === $scope.eventID });
                for (i in doc['referrals']) {
                    if (doc['referrals'][i]['meeting'] === $scope.eventID) {
                        doc['referrals'][i]['meeting'] = '';
                        break;
                    }
                }
                return db.put(doc);
            }).then(function () {
                db.get('goals').then(function (doc) {
                    //i = doc['referrals'].findIndex(function (e) { return e.meeting === $scope.eventID });
                    for (i in doc['goals']) {
                        if (doc['goals'][i]['eventID'] == $scope.eventID) {
                            doc['goals'][i]['eventID'] = '';
                            break;
                        }
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
        })
    };
    $scope.goToEventPart2 = function () {
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
        //checks if all necessary fields have been filled before moving to part 2
        if (pass == true) {
            $('#eventPart1').css('display', 'none')
            $('#eventPart2').css('display', '')
        }
    }
    $scope.goToEventPart1 = function () {
        $('#eventPart1').css('display', '')
        $('#eventPart2').css('display', 'none')
    }
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            //window.localStorage.removeItem('referralID');
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

    $scope.speak = function (text) {
        console.log(text)
        responsiveVoice.speak(text)
        var msg = new SpeechSynthesisUtterance();
    }

    $scope.inspectDB = function () {
        var db = PouchDB('momlink');
        db.allDocs({ include_docs: true }).then(function (res) {
            var docs = res.rows.map(function (row) { return row.doc; });
            console.log(docs);
        }).catch(console.log.bind(console));
        /*db.get('userData').then(function (doc) {
            for (i in doc['userData']) {
                console.log(String(doc['userData'][i]))
            }
        })*/
    }

    $scope.sendLog = function () {
        var db = PouchDB('momlink');
        var log = '';
        db.get('userData').then(function (doc) {
            console.log(doc);
            for (i in doc['userData']) {
                for (j in doc['userData'][i]) {
                    log += doc['userData'][i][j];
                    log += ',';
                }
                log += ' @@@@@ ';
                log += '\n';
            }
        }).then(function () {
            //console.log(log)
            window.cordova.plugins.email.open({
                to: 'lfaust@nd.edu',
                subject: 'Click Log',
                body: log
            });
        })
    }
})

.controller('NutritionCtrl', function ($scope, $ionicPopup, $ionicModal, $compile) {
    $scope.refreshNutritionPage = function () {
        //clean canvases
        var categories = ['fruits', 'vegetables', 'proteins', 'grains', 'dairy', 'fluids', 'sweets', 'fats/oils'];
        for (i in categories) {
            var bg = document.getElementById(categories[i]);
            var ctx = bg.getContext('2d');
            ctx.clearRect(0, 0, 1000, 1000);
        }
        //redraw circles
        $scope.nutritionCircle('fruits', '5', '10');
        $scope.nutritionCircle('vegetables', '5', '10');
        $scope.nutritionCircle('proteins', '5', '10');
        $scope.nutritionCircle('grains', '5', '10');
        $scope.nutritionCircle('dairy', '5', '10');
        $scope.nutritionCircle('fluids', '5', '10');
        $scope.nutritionCircle('sweets', '5', '10');
        $scope.nutritionCircle('fats/oils', '5', '10');
    };
    $scope.nutritionCircle = function (id, min, max) {
        var db = PouchDB('momlink');
        var size = 0;
        db.get('nutrition').then(function (doc) {
            //only count those where the day matches
            for (i in doc[id]) {
                if (moment($scope.currentDate).format('MM/DD/YYYY') == doc[id][i]['date']) {
                    size += doc[id][i]['value'];
                }
            }
        }).then(function (doc) {
            var bg = document.getElementById(id);
            var ctx = bg.getContext('2d');
            var image = new Image();
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var draw = function (current) {
                ctx.beginPath();
                //need to center based on height and width
                ctx.arc(bg.width / 2, bg.height / 2, 70, -(quart), ((circ) * current) - quart, false);
                ctx.stroke();
            }
            if (size >= min && (id != 'sweets' && id != 'fats/oils')) {
                image.src = '../img/food/star.png';
                image.onload = function () {
                    ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
                }
            }
            if (size == 100 && (id != 'sweets' && id != 'fats/oils')) {
                image.src = '../img/food/crown.png';
                ctx.clearRect(0, 0, bg.width, bg.height);
                image.onload = function () {
                    ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
                }
            }
            if ((size >= min || size == 100) && (id == 'sweets' || id == 'fats/oils')) {
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
            if (id == 'sweets' || id == 'fats/oils') {
                ctx.strokeStyle = '#bb1a1d';
            }
            else { ctx.strokeStyle = '#2486ae'; }
            draw(size / max);
        });
    };
    $scope.showFoodFluid = function (category, food, fluid, hp1, hp2, f1, f2) {
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
                                   '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  {
                      text: 'Save', onTap: function (e) {
                          $scope.saveAmount(category, 'solid');
                      },
                      type: 'button-positive'
                  },
                  {
                      text: 'Cancel', onTap: function (e) {
                          $scope.clickTracker('cancelAmount(' + category + ')');
                      },
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
                                   '<div class="col text-center"><img src="../img/handportions/' + f1 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;"/></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                               '<div class="col text-center">' +
                                   '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                                   '<div class="col text-center"><img src="../img/handportions/' + f2 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;" /></div>' +
                                   '<div class="row">' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                       '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>',
                title: 'How much?',
                buttons: [
                  {
                      text: 'Save', onTap: function (e) {
                          $scope.saveAmount(category, 'fluid');
                      },
                      type: 'button-positive'
                  },
                  {
                      text: 'Cancel', onTap: function (e) {
                          $scope.clickTracker('cancelAmount(' + category + ')');
                      },
                      type: 'button-positive'
                  }
                ]
            });
            ffAmountPopup.then(function (res) {
                $scope.choice.close();
            });
        };
    };
    $scope.showAmount = function (category, type, hp1, hp2) {
        $ionicPopup.show({
            template: '<div class="row" ng-controller="TrackCtrl">' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count12" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp1 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;"/></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count12\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                           '<div class="col text-center">' +
                               '<div class="col text-right"><p id="count1" style="font-size: 30px; line-height: 30px;">0</p></div>' +
                               '<div class="col text-center"><img src="../img/handportions/' + hp2 + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;" /></div>' +
                               '<div class="row">' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\'minus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                                   '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\'plus\',\'count1\')" style="width:30px;height:30px;"></div>' +
                               '</div>' +
                           '</div>' +
                       '</div>',
            title: 'How much did you ' + type + '?',
            buttons: [
              {
                  text: 'Save', onTap: function (e) {
                      var consistency;
                      if (category == 'fluids') {
                          consistency = 'liquid';
                      }
                      else {
                          consistency = 'solid';
                      }
                      $scope.saveAmount(category, consistency);
                  },
                  type: 'button-positive'
              },
              {
                  text: 'Cancel', onTap: function (e) { return 'Cancel'; },
                  type: 'button-positive'
              }
            ]
        });
    };
    $scope.saveAmount = function (category, consistency) {
        $scope.clickTracker('saveAmount(' + category + ',' + consistency + ')');
        var db = PouchDB('momlink');
        value = $('#count').html();
        db.get('nutrition').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment($scope.currentDate).format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "value": parseInt($('#count1').html()) + parseInt($('#count12').html()) / 2,
                "consistency": consistency
            };
            doc[category].push(element);
            return db.put(doc);
        }).then(function (doc) {
            var bg = document.getElementById(category);
            var ctx = bg.getContext('2d');
            ctx.clearRect(0, 0, 1000, 1000);
            $scope.nutritionCircle(category, '5', '10');
        });
    };
    $scope.formatDate = function (d) {
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
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.decreaseDate = function () {
        var d = new Date($scope.currentDate);
        d.setDate(d.getDate() - 1)
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.renderNutritionHistory = function (category) {
        $scope.modal = $ionicModal.fromTemplateUrl('nutritionHistoryModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
            var db = PouchDB('momlink');
            db.get('nutrition').then(function (doc) {
                var html = '';
                for (i in doc[category]) {
                    if (moment($scope.currentDate).format('MM/DD/YYYY') == doc[category][i]["date"]) {
                        html += `<center><div class="item" on-hold="deleteElement('` + category + `','` + doc[category][i]["id"] + `')">` + $scope.convert24to12(doc[category][i]["time"]) + `&nbsp; &nbsp; &nbsp; ` + doc[category][i]["value"] + `</div></center>`;
                    }
                }
                console.log(html)
                $('#nutritionHistory').html(html);
                $compile($('#nutritionHistory'))($scope);
            })
        })
    };
    $scope.closeModal = function () {
        $scope.refreshNutritionPage();
        $scope.modal.hide().then(function () {
            $scope.modal.remove();
        });
    };
    $scope.deleteElement = function (category, id) {
        $ionicPopup.show({
            title: 'Are you sure you want to delete this?',
            scope: $scope,
            buttons: [
              {
                  text: 'Delete',
                  type: 'button-assertive',
                  onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('nutrition').then(function (doc) {
                          for (i in doc[category]) {
                              if (doc[category][i]['id'] === id) {
                                  break;
                              }
                          }
                          doc[category].splice(i, 1)
                          return db.put(doc);
                      }).then(function () {
                          var db = PouchDB('momlink');
                          db.get('nutrition').then(function (doc) {
                              var html = '';
                              for (i in doc[category]) {
                                  if (moment($scope.currentDate).format('MM/DD/YYYY') == doc[category][i]["date"]) {
                                      html += `<center><div class="item" on-hold="deleteElement('` + doc[category] + `','` + doc[category][i]["id"] + `')">` + $scope.convert24to12(doc[category][i]["time"]) + `&nbsp; &nbsp; &nbsp; ` + doc[category][i]["value"] + `</div></center>`;
                                  }
                              }
                              $('#nutritionHistory').html(html);
                              $compile($('#nutritionHistory'))($scope);
                          })
                      })
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };
})

.controller('CalendarCtrl', function ($scope, $ionicPopup, $compile) {
    $scope.showCalendar = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            $('#calendar').fullCalendar({
                height: "auto",
                header: {
                    left: 'prev,next,today',
                    center: 'title',
                    right: 'basicDay,basicWeek,month'
                },
                defaultView: 'basicDay',
                events: doc['events'],
                eventRender: function (event, element) {
                    element.click(function () {
                        $scope.clickTracker(`viewEvent(` + event.id + ', calendar.html' + ', Calendar' + `)`);
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
    $scope.renderEventQuestions = function () {
        var questionsHtml = '';
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in doc['questions']) {
                questionsHtml += `<div class="item item-checkbox item-icon-right item-text-wrap" on-hold="deleteQuestion('` + i + `')">` + doc['questions'][i] + `<label class="checkbox"><input type="checkbox" name="Q" value="` + doc['questions'][i] + `"></label></div>`;
            }
            $('#eventQuestions').html(questionsHtml);
            $compile($('#eventQuestions'))($scope);
        })
    };
    $scope.addQuestion = function () {
        $ionicPopup.show({
            template: `<input id="question" type="text">`,
            title: 'Add question',
            scope: $scope,
            buttons: [
              {
                  text: 'Add',
                  type: 'button-positive',
                  onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('events').then(function (doc) {
                          doc['questions'][moment().format('MM-DD-YYYYThh:mm:ssa')] = $('#question').val();
                          return db.put(doc);
                      }).then(function () {
                          $scope.renderEventQuestions();
                          $scope.repopulateQuestions();
                      })
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };
    $scope.deleteQuestion = function (index) {
        $ionicPopup.show({
            title: 'Are you sure you want to delete this question?',
            scope: $scope,
            buttons: [
              {
                  text: 'Delete',
                  type: 'button-assertive',
                  onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('events').then(function (doc) {
                          //doc['questions'][index].remove();
                          delete doc['questions'][index]
                          return db.put(doc);
                      }).then(function () {
                          $scope.renderEventQuestions();
                          $scope.repopulateQuestions();
                      })
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };
    $scope.repopulateQuestions = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            for (j in doc['events'][i]['questions']) {
                $("input[name=Q]").each(function () {
                    if (doc['events'][i]['questions'][j] == $(this).val()) {
                        $(this).prop('checked', true);
                    }
                });
            }
        });
    };
    $scope.selectCategory = function (category) {
        document.getElementById('OB Appt').classList.remove('activeBorder');
        document.getElementById('Lab').classList.remove('activeBorder');
        document.getElementById('Referral').classList.remove('activeBorder');
        document.getElementById('PNCC').classList.remove('activeBorder');
        document.getElementById('Ultra').classList.remove('activeBorder');
        document.getElementById('Class').classList.remove('activeBorder');
        document.getElementById('Other').classList.remove('activeBorder');
        document.getElementById(category).classList.add('activeBorder');
        $('#type').val(category);
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
                html += `<div class="item item-thumbnail-left" ng-click="renderConversation('referrals` + `','` + referrals[i]['name'] + `','` + referrals[i]['phone'] + `','` + referrals[i]['email'] + `')">`;
                html += `<img src="` + referrals[i]['img'] + `">`;
                html += '<h2>' + referrals[i]['name'] + '</h2>';
                if (referrals[i]['phone'] != '') {
                    html += '<p>' + referrals[i]['phone'] + '</p>';
                }
                if (referrals[i]['email'] != '') {
                    html += '<p>' + referrals[i]['email'] + '</p>';
                }
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
                html += `<div class="item item-thumbnail-left" ng-click="renderConversation('pncc'` + `,'` + pncc[i]['name'] + `','` + pncc[i]['phone'] + `','` + pncc[i]['email'] + `')">`;
                html += `<img src="` + pncc[i]['image'] + `">`;
                html += '<h2>' + pncc[i]['name'] + '</h2>';
                if (pncc[i]['phone'] != '') {
                    html += '<p>' + pncc[i]['phone'] + '</p>';
                }
                if (pncc[i]['email'] != '') {
                    html += '<p>' + pncc[i]['email'] + '</p>';
                }
                html += '</div>';
            }
            html += '</div>';
            $("#pncc").html(html);
            $compile($("#pncc"))($scope);
        });
    };
    $scope.renderConversation = function (type, name, phone, email) {
        var html = '';
        if (type == 'referrals') { show = 'showReferralContacts()'; }
        else { show = 'showPNCCContacts()'; }
        html += `<div class="bar bar-header"><button class ="button button-icon icon ion-reply" ng-click="` + show + `"></button><div class="title">` + name + `</div><button class ="button button-icon icon ion-email" ng-click="newMessage('` + email + `','` + phone + `')"></button></div>`
        html += '<div class="list has-header">';
        //for loop through inbox sms, if empty, no messages to display
        SMS.listSMS({ box: '', address: '+'.concat(phone), maxCount: 100000 }, function (data) {
            for (i in data.reverse()) {
                if (data[i].type == 1) {
                    html += '<div class="item item-text-wrap" style="color: #e6005c;">' + data[i].body + '</div>';
                }
                else {
                    html += '<div class="item item-text-wrap" style="color: #0866c6;">' + data[i].body + '</div>';
                }
            }
            html += '</div>';
            $("#".concat(type)).html(html);
            $compile($("#".concat(type)))($scope);
        }, function (error) { console.log(error) });
    };
})

/*.controller('CouponCtrl', function ($scope, $ionicPopup, $timeout, $compile) {
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
                      `<div ng-controller="CouponCtrl">
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
    };
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

.controller('GoalsCtrl', function ($scope, $compile, $ionicPopup) {
    $scope.renderGoalsGrid = function () {
        goals = [];
        var db = PouchDB('momlink');
        //check if any classes have been completed
        db.get('goals').then(function (doc) {
            for (i in doc['goals']) {
                //check for any class related goals not yet completed
                if ((doc['goals'][i]['type'] == 'class' || doc['goals'][i]['type'] == 'meet') && doc['goals'][i]['completed'] == 'false') {
                    goals.push(doc['goals'][i])
                }
            }
        }).then(function () {
            if (goals.length > 0) {
                db.get('events').then(function (doc) {
                    for (i in goals) {
                        for (j in doc['events']) {
                            //get the corresponding event
                            if (doc['events'][j]['id'] == goals[i]['eventID']) {
                                //check if the event has passed
                                if (moment(doc['events'][j]['end']) < moment()) {
                                    //if event has passed, change 'completed' to true
                                    goals[i]['completed'] = 'true';
                                }
                            }
                        }
                    }
                }).then(function () {
                    //update db
                    db.get('goals').then(function (doc) {
                        for (i in goals) {
                            for (j in doc['goals']) {
                                if (doc['goals'][j]['id'] == goals[i]['id'] && goals[i]['completed'] == 'true') {
                                    doc['goals'][j]['completed'] = 'true';
                                }
                            }
                        }
                        return db.put(doc);
                    }).then(function () {
                        //draw grid
                        var counter = 1;
                        //get start/end date
                        db.get('goals').then(function (doc) {
                            var html = '';
                            html += '<div class="row" style="padding-right:0; padding-left:0; padding-top:0">';
                            for (i in doc['goals']) {
                                //event has been completed
                                if (doc['goals'][i]['completed'] == 'true') {
                                    html += `<div class="col-33 text-center padding nonActiveWeek" ng-click="viewEvent('` + doc['goals'][i]['eventID'] + `','goals.html','Goals')" style="background-color: #528ef4; color:white;"><b>` + doc['goals'][i]['name'] + `<br><i class="icon ion-checkmark-round"></i></b></div>`;
                                }
                                    //event has been registered
                                else if (doc['goals'][i]['eventID'] != '' && doc['goals'][i]['eventID'] != null) {
                                    html += `<div class="col-33 text-center padding nonActiveWeek" ng-click="viewEvent('` + doc['goals'][i]['eventID'] + `','goals.html','Goals')" style="background-color: #528ef4; color:white;"><b>` + doc['goals'][i]['name'] + `</b></div>`;
                                }
                                    //event has not been started
                                else {
                                    if (doc['goals'][i]['type'] == 'class') {
                                        html += `<div class="col-33 text-center padding nonActiveWeek" ng-click="viewClasses('` + doc['goals'][i]['name'] + `','` + doc['goals'][i]['id'] + `')"><b>` + doc['goals'][i]['name'] + `</b></div>`;
                                    }
                                    if (doc['goals'][i]['type'] == 'meet') {
                                        html += `<div class="col-33 text-center padding nonActiveWeek" ng-click="setGoalID('` + doc['goals'][i]['id'] + `');createEvent('goals.html', 'Goals');"><b>` + doc['goals'][i]['name'] + `</b></div>`;
                                    }
                                }
                                //3 items per column
                                if (counter % 3 == 0) {
                                    html += '</div><div class="row" style="padding-right:0; padding-left:0">';
                                }
                                counter++;
                            }
                            html += '</div>'
                            //render grid
                            $('#goalsGrid').html(html);
                            $compile($('#goalsGrid'))($scope);
                        })
                    });
                })
            }
        })
    }
    $scope.viewClasses = function (name, id) {
        var db = PouchDB('momlink');
        //check if any classes have been completed
        db.get('goals').then(function (doc) {
            //get goal
            for (i in doc['goals']) {
                if (doc['goals'][i]['id'] == id) {
                    break;
                }
            }
            //pull class dates from goal
            html = `<div class="list">`;
            for (var j in doc['goals'][i]['classes']) {
                html += `<div class="item item-button-right">` + j + `<button class="button button-small button-positive" ng-click="showInfo('` + id + `','` + name + `','` + doc['goals'][i]['classes'][j] + `','` + j + `')">View</button></div>`;
            }
            html += `</div>`;
            //show dates
            $scope.choice = $ionicPopup.show({
                template: html,
                title: 'Available Classes',
                buttons: [{ text: 'Cancel', onTap: function (e) { return 'Cancel'; } }],
                scope: $scope
            });
        })
    }
    //show info for date
    $scope.showInfo = function (id, name, classInfo, date) {
        classInfo = classInfo.split(',');
        html2 = `<div class="list">`;
        html2 += `<div class="item">Venue: ` + classInfo[0] + `</div>`;
        html2 += `<div class="item">Time: ` + classInfo[1] + ' - ' + classInfo[2] + `</div>`;
        html2 += `<div class="item">Instructor: ` + classInfo[3] + `</div>`;
        html2 += `</div>`;
        infoPopup = $ionicPopup.show({
            template: html2,
            title: date,
            buttons: [
              {
                  text: 'Register', onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('events').then(function (doc) {
                          date = moment(date).format('YYYY-MM-DD')
                          var eID = moment().format('MM-DD-YYYYThh:mm:ssa');
                          $scope.eventID = eID;
                          var start = date + "T" + classInfo[1];
                          var end = date + "T" + classInfo[2];
                          var event = {
                              "id": eID,
                              "title": name,
                              "category": 'Class',
                              "day": date,
                              "start": start,
                              "end": end,
                              "venue": classInfo[0],
                              "description": 'Class held by '.concat(classInfo[3]),
                              "questions": [],
                              "color": $scope.getColor('Class'),
                              "viewed": '1',
                              "scheduledBy": '0'
                          };
                          console.log(events);
                          doc['events'].push(event);
                          return db.put(doc);
                      }).then(function () {
                          //attach eventID to goal 
                          db.get('goals').then(function (doc) {
                              for (i in doc['goals']) {
                                  if (doc['goals'][i]['id'] == id) {
                                      doc['goals'][i]['eventID'] = $scope.eventID;
                                      return db.put(doc);
                                  }
                              }
                          }).then(function () {
                              delete $scope.eventID;
                              $scope.renderGoalsGrid();
                              $scope.choice.close();
                          })
                      })
                  },
                  type: 'button-positive'
              },
              { text: 'Cancel' }
            ]
        });
    };
    $scope.setGoalID = function (id) {
        window.localStorage.setItem('goalID', id);
    }
})

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
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','All');clickTracker('renderCategories(All)')" style="position:relative">
                     <img class="autoSize" src="../img/articles/all.png">
                     <span class ="badge badge-positive topRightBadge">` + totalUnreadArticles + `</span>All</div>`;
            }
            else {
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','All');clickTracker('renderCategories(All)')" style="position:relative">
                     <img class ="autoSize" src="../img/articles/all.png">All</div>`;
            }
            for (i in categories) {
                //add column
                html += `<div class="col-33 text-center padding" ng-click="renderArticles('` + type + `','` + i + `');clickTracker('renderCategories(` + i + `)')" style="position:relative">`;
                var img;
                if (i == 'Smoking') { img = '../img/articles/smoking.png' }
                if (i == 'Blood Pressure') { img = '../img/articles/bloodpressure.png' }
                if (i == 'Diet') { img = '../img/articles/diet.png' }
                html += `<image class="autoSize" src="` + img + `">`;
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
                    html += `<div class="item item-thumbnail-left item-text-wrap">`;
                    html += `<img ng-click="renderArticle('` + type + `','` + article['id'] + `','` + category + `')" src="` + $scope.getFormatImg(article['format']) + `">`;
                    //bold if the article has not been read
                    if (article['lastRead'] == '') { html += '<h2><b>' + article['title'] + '</b></h2>'; }
                    else { html += '<h2>' + article['title'] + '</h2>'; }
                    html += '<p>' + article['description'] + '</p>';
                    html += '<p>Shared: ' + article['dateShared'] + '</p>';
                    var bestScore = 0;
                    html += '<p>Quiz Attempts: ' + Object.keys(article['quizHistory']).length + '</p>';
                    for (j in article['quizHistory']) {
                        if (article['quizHistory'][j][0].substring(0, 1) > String(bestScore).substring(0, 1)) {
                            bestScore = article['quizHistory'][j][0];
                        }
                    }
                    html += '<p>Best Score: ' + bestScore + '</p>';
                    if (type == 'shared') {
                        html += `<button class="button button-small button-positive" ng-click="renderQuiz('` + type + `','` + article['id'] + `','` + category + `')">Take Quiz</button>`;
                    }
                    else {
                        html += `<button class="button button-small button-stable" ng-click="renderQuiz('` + type + `','` + article['id'] + `','` + category + `')">Take Quiz</button>`;
                    }
                    html += '</div>';
                }
            }
            html += '</div>';
            $('#' + type).html(html);
            $compile($('#' + type))($scope);
        });
    };
    $scope.getFormatImg = function (type) {
        switch (type) {
            case 'Website':
                return '../img/formats/website.png';
            case 'PDF':
                return '../img/formats/pdf.png';
            case 'Image':
                return '../img/formats/image.png';
            case 'Audio':
                return '../img/formats/audio.png';
            case 'Video':
                return '../img/formats/video.png';
        }
    };
    $scope.renderArticle = function (type, id, category) {
        $ionicPopup.show({
            title: 'Have you read this article before?',
            buttons: [
                {
                    text: 'Yes', onTap: function (e) {
                        //take quiz
                        $scope.renderQuiz(type, id, category);
                    },
                    type: 'button-stable'
                },
                {
                    text: 'No', onTap: function (e) {
                        //read article
                        var db = PouchDB('momlink');
                        var html = '';
                        db.get('articles').then(function (doc) {
                            sharedArticles = doc[type];
                            for (i in sharedArticles) {
                                article = sharedArticles[i]
                                if (article['id'] == id) {
                                    html += `<ion-modal-view>`;
                                    html += `<div class="bar bar-footer" ng-init="startSessionTimer()">`;
                                    html += `<button class="button button-icon icon ion-close-round" ng-click="recordTime('` + id + `'); renderArticles('` + type + `','` + category + `'); closeModal();">&nbsp;Close</button>`;
                                    html += `<button class="button button-icon icon ion-help" ng-click="recordTime('` + id + `'); closeModal(); renderQuiz('` + type + `','` + id + `','` + category + `');">&nbsp;Take Quiz</button>`;
                                    html += `</div>`;
                                    html += `<div class="float-button-hasFooter"><span class="height-fix"><button class="button button-light button-rounded content" ng-click="readText()"><i class="icon ion-volume-medium" style="color: black !important;"></i></button></span></div>`;
                                    //if category is set to local and network is not available then
                                    var networkState = navigator.connection.type;
                                    articleCategory = String(article['category']).replace(/\s/g, '');
                                    if (window.localStorage.getItem(articleCategory) == 'true' && networkState == Connection.NONE) {
                                        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
                                            dir.getFile(id.concat('.html'), { create: false }, function (fileEntry) {
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
                                            }, function (error) { console.log(error) });
                                        });
                                    }
                                        //if network is available
                                    else {
                                        html += `<iframe id="frame" src="` + article['link'] + `" style="width:100%; height: 100%;"></iframe>`;
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
                    },
                    type: 'button-stable'
                }
            ],
        });
    };

    $scope.renderQuiz = function (type, articleID, category) {
        var db = PouchDB('momlink');
        var html = '<div ng-controller="HeaderCtrl">';
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
                        html += `<div class="item item-text-wrap item-divider item-icon-right">` + question + `<i class="icon ion-volume-medium" ng-click="speak('` + question + `')"></i></div>`;
                        //render answers
                        html += `<form id="` + String(j) + `">`
                        html += `<ion-list>`
                        for (k = 0; k < answers.length; k++) {
                            answer = quiz[j][1][k];
                            html += `<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="` + String(j) + `" value="` + String(answer) + `">` + answer + `</ion-radio><button class="col icon ion-volume-medium" ng-click="speak('` + answer + `')"></button></div>`;
                        }
                        html += `</ion-list>`
                        html += `</form>`
                    }
                }
            }
            html += '</div>';
            $ionicPopup.show({
                title: 'Quiz',
                template: html,
                buttons: [
            {
                text: 'Grade', onTap: function (e) {
                    //score the quiz
                    $scope.clickTracker('finishQuiz');
                    $scope.gradeQuiz(type, articleID, category);
                    return 'Create';
                },
                type: 'button-positive'
            },
            {
                text: 'Cancel', onTap: function (e) {
                    $scope.clickTracker('cancelQuiz');
                    return 'Close';
                },
                type: 'button-stable'
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
            var usersAnswers = [];
            sharedArticles = doc[type];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    quiz = article['quiz'];
                    for (j in quiz) {
                        selectedAnswer = $(`input[name="` + String(j) + `"]:checked`, `#`.concat(j)).val();
                        usersAnswers.push(selectedAnswer);
                        correctAnswer = quiz[j][1][quiz[j][2]];
                        if (selectedAnswer == correctAnswer) {
                            score++;
                        }
                    }
                    finalScore = score + '/' + quiz.length;
                    //also need to record answers selected
                    article['quizHistory'][String(moment().format('YYYY-MM-DDThh:mm:ssa'))] = [finalScore, usersAnswers];
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
                    $scope.clickTracker('closeQuizResults');
                    return 'Create';
                },
                type: 'button-positive'
            }
                ],
            })
        }).then(function () {
            if (type == 'shared' && score == article['quiz'].length) {
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
            $scope.clickTracker('downloadArticles(' + category + ')');
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
            $scope.clickTracker('deleteArticles(' + category + ')');
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
        $scope.clickTracker('updateArticles(' + category + ')');
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
        //File name of our important data file we didn't ship with the app
        var fileName = articleID.concat('.html');
        //Check for the file. 
        window.resolveLocalFileSystemURL(store + fileName, doNothing, downloadAsset);
        function downloadAsset() {
            var fileTransfer = new FileTransfer();
            console.log("About to start transfer");
            fileTransfer.download(articleURL, store + fileName,
                function (entry) {
                    console.log(entry);
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

    $scope.readText = function () {
        var text = "";
        var iframe = document.getElementById('frame');
        var idoc = iframe.contentDocument || iframe.contentWindow.document; // ie compatibility
        if (idoc.getSelection) {
            text = idoc.getSelection().toString();
            if (text == '') {
                $ionicPopup.alert({
                    title: 'Please highlight an area of text to listen to.',
                });
            }
            $scope.speak(text);
        }
        /*else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
            $scope.speak(text);
        }*/
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
                        html += `<a class="item" ng-click="renderSurvey('` + events[i]['id'] + `')">` + events[i]['title'] + ` follow-up` + ' <p> Given on: ' + events[i]['dateSurveyGiven'] + `</p></a>`;
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
                        html += `<a class="item" ng-click="">` + events[i]['title'] + ` follow-up` + ' <p> Taken on: ' + events[i]['dateSurveyTaken'] + `</p></a>`;
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
        var html = '<div ng-controller="HeaderCtrl">';
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
                        html += `  <div class="item item-text-wrap item-icon-right item-divider">` + question + `<i class="icon ion-volume-medium" ng-click="speak('` + question + `')"></i></div>`;
                        //render answers
                        html += `<form id="` + String(j) + `">`;
                        html += `<ion-list>`;
                        for (k = 0; k < answers.length; k++) {
                            answer = survey[j][1][k];
                            html += `<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="` + String(j) + `" value="` + String(answer) + `">` + answer + `</ion-radio><button class="col icon ion-volume-medium" ng-click="speak('` + answer + `')"></button></div>`;
                        }
                        html += `</ion-list>`;
                        html += `</form>`;
                    }
                }
            }
            html += '</div>';
            $ionicPopup.show({
                title: 'Survey',
                template: html,
                buttons: [
            {
                text: 'Finish', onTap: function (e) {
                    $scope.clickTracker('finishSurvey');
                    $scope.saveSurvey(eventID);
                    return 'Create';
                },
                type: 'button-positive'
            },
            {
                text: 'Cancel', onTap: function (e) {
                    $scope.clickTracker('cancelSurvey');
                },
                type: 'button-stable'
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
                    event['dateSurveyTaken'] = moment().format('MM/DD/YYYY');
                    return db.put(doc)
                }
            }
        }).then(function () {
            var db = PouchDB('momlink');
            db.get('events').then(function (doc) {
                events = doc['events'];
            })
        }).then(function () {
            $scope.toNewPage('survey.html', 'Surveys')
        })
    };
})

.controller('ReferralCtrl', function ($scope, $ionicPopup, $ionicModal, $timeout, $compile) {
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
                        html += `<a class="item item-thumbnail-left item-text-wrap" ng-click="schedule('` + referrals[i]['id'] + `')">`;
                        html += `<img src="` + referrals[i]['img'] + `">`;
                        html += '<h2 style="display:inline; vertical-align: text-bottom">' + referrals[i]['name'] + '</h2>&nbsp;'
                        html += '<p>Referred on ' + referrals[i]['date'] + '</p>';
                        if (referrals[i]['address'] != '') {
                            html += '<p>Address: ' + referrals[i]['address'] + '</p>';
                        }
                        if (referrals[i]['phone'] != '') {
                            html += '<p>Phone: ' + referrals[i]['phone'] + '</p>';
                        }
                        if (referrals[i]['email'] != '') {
                            html += '<p>Email: ' + referrals[i]['email'] + '</p>';
                        }
                        html += '</a>';
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
        var db = PouchDB('momlink');
        db.get('referrals').then(function (doc) {
            for (i in doc['referrals']) {
                if (doc['referrals'][i]['id'] === id) { break; }
            }
            if (doc['referrals'][i]['meeting'] == '') {
                $ionicPopup.show({
                    title: 'Have you contacted this referral?',
                    cssClass: 'popup-vertical-buttons',
                    buttons: [
                {
                    text: 'Yes', onTap: function (e) {
                        $scope.clickTracker('contactedReferral(yes)');
                        scheduleMeeting(doc['referrals'][i]['email'], doc['referrals'][i]['phone']);
                    },
                    type: 'button-positive'
                },
                {
                    text: 'No', onTap: function (e) {
                        $scope.clickTracker('contactedReferral(no)');
                        $scope.newMessage(doc['referrals'][i]['email'], doc['referrals'][i]['phone']);
                    },
                    type: 'button-positive'
                },
                {
                    text: 'Cancel', onTap: function (e) {
                        $scope.clickTracker('contactedReferral(cancel)');
                        return 'cancel';
                    },
                    type: 'button-stable'
                }
                    ],
                })
            }
            else {
                $scope.viewEvent(doc['referrals'][i]['meeting'], 'referrals.html', 'Referrals')
            }
        })
        scheduleMeeting = function () {
            $ionicPopup.show({
                title: 'Have you scheduled a meeting with this referral?',
                buttons: [
            {
                text: 'Yes', onTap: function (e) {
                    window.localStorage.setItem('referralID', id);
                    $scope.clickTracker('scheduledReferralMeeting(yes)');
                    $scope.createEvent('referrals.html', 'Referrals');
                },
                type: 'button-positive'
            },
            {
                text: 'No', onTap: function (e) {
                    $scope.clickTracker('scheduledReferralMeeting(no)');
                    $scope.newMessage();
                },
                type: 'button-positive'
            }
                ],
            });
        }
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
            var html = '';
            var weekCounter = 1;
            //convert start/end date to moment
            today = moment()
            displayStart = moment(start)
            if (end == '') {
                displayEnd = today
            }
            else {
                displayEnd = moment(end)
            }
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
            } while (displayStart <= today || displayStart <= displayEnd)
            html += '</div>'
            //keep current week for saving photos, decrement 1 to keep consistent
            weekCounter--;
            $scope.currentWeek = weekCounter;
            $('#photoJournal').html(html);
            $compile($('#photoJournal'))($scope);
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
        var html = '<div class="list">';
        db.get('journal').then(function (doc) {
            notes = doc['notes'];
            for (i in notes) {
                html += `<a class="item" ng-click="editNote('` + notes[i]['id'] + `')">`;
                html += '<h2 style="display:inline">Note: ' + notes[i]['subject'] + '</h2> &nbsp;';
                html += '<p style="display:inline">' + notes[i]['date'] + '</p>';
                html += '<p>Personal Note</p>';
                html += '<p>' + notes[i]['description'] + '</p>';
                html += '</a>';
            }
        }).then(function () {
            db.get('events').then(function (doc) {
                for (i in doc['events']) {
                    if (doc['events'][i]['notes'] != '') {
                        html += `<a class="item" ng-click="editEventNotes('` + doc['events'][i]['id'] + `')">`;
                        html += '<h2 style="display:inline">' + doc['events'][i]['title'] + '</h2> &nbsp;';
                        var year = String(doc['events'][i]['day']).substring(0, 4);
                        var month = String(doc['events'][i]['day']).substring(5, 7);
                        var day = String(doc['events'][i]['day']).substring(8, 10);
                        var date = month + '/' + day + '/' + year;
                        html += '<p style="display:inline">' + date + '</p>';
                        html += '<p>Event Note</p>';
                        html += '<p>' + doc['events'][i]['description'] + '</p>';
                        html += '</a>';
                    }
                }
                html += '</div>';
                $('#notes').html(html);
                $compile($('#notes'))($scope);
            });
        })

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
                "date": moment().format('MM/DD/YYYY'),
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
    $scope.editEventNotes = function (eventID) {
        $scope.clickTracker('openEventNotes');
        $scope.eventID = eventID;
        $scope.modal = $ionicModal.fromTemplateUrl('editEventNoteModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    }
    $scope.pullEventNotes = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            //i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
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
    $scope.updateEventNotes = function () {
        var db = PouchDB('momlink');
        var questions = [];
        $("input[name=Q]:checked").each(function () {
            questions.push($(this).val())
        });
        db.get('events').then(function (doc) {
            //i = doc['events'].findIndex(function (e) { return e.id === $scope.eventID });
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            doc['events'][i]['description'] = $('#description').val();
            doc['events'][i]['questions'] = questions;
            return db.put(doc);
        }).then(function () {
            $scope.closeModal();
        })
    }
    $scope.pullNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            //i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            for (i in doc['notes']) {
                if (doc['notes'][i]['id'] === $scope.noteID) { break; }
            }
            $('#subject').val(doc['notes'][i]['subject']);
            $('#description').val(doc['notes'][i]['description']);
        })
    };
    $scope.updateNote = function () {
        var db = PouchDB('momlink');
        db.get('journal').then(function (doc) {
            //i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            for (i in doc['notes']) {
                if (doc['notes'][i]['id'] === $scope.noteID) {
                    break;
                }
            }
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
            //i = doc['notes'].findIndex(function (e) { return e.id === $scope.noteID });
            for (i in doc['notes']) {
                if (doc['notes'][i]['id'] === $scope.noteID) {
                    break;
                }
            }
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

.controller('TrackCtrl', function ($scope, $ionicModal, $ionicPopup, $compile) {
    $scope.formatDate = function (d) {
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
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.decreaseDate = function () {
        var d = new Date($scope.currentDate);
        d.setDate(d.getDate() - 1)
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.loadHistory = function () {
        var db = PouchDB('momlink');
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
        else if (el == 'addPill') {
            db.get('track').then(function (doc) {
                var hist = '';
                pills = doc['pill'];
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getDirectory('MomLink', { create: false, exclusive: false },
                    function (directory) {
                        //array containing arrays for each pill made up of [id, name, timeTaken, dosage, meal]
                        var todaysPills = [];
                        for (var i in pills) {
                            for (j in pills[i]['daysTaken']) {
                                if (String($scope.currentDate).substring(0, 3) == pills[i]['daysTaken'][j]) {
                                    for (k in pills[i]["timesTaken"]) {
                                        time = pills[i]["timesTaken"][k];
                                        todaysPills.push([pills[i]['id'], pills[i]['name'], time, pills[i]['dosage'], pills[i]['meal']])
                                    }
                                }
                            }
                        }
                        //get picture for each pill
                        directory.createReader().readEntries(
                            function (entries) {
                                for (k in todaysPills) {
                                    for (l = 0; l < entries.length; l++) {
                                        if (entries[l].name == todaysPills[k][0] + '.jpg') {
                                            todaysPills[k].push(entries[l].toURL());
                                        }
                                    }
                                }
                                //sort pills in array by time
                                todaysPills = sortTimes(todaysPills);
                                //build string
                                for (m in todaysPills) {
                                    if (todaysPills[m][5] == '' || todaysPills[m][5] == null) {
                                        hist += `<div class="item item-thumbnail-left" on-hold="deleteElement('pill','` + todaysPills[m][0] + `')"><img src='../img/trackers/pill.png' >`;
                                    }
                                    else {
                                        hist += `<div class="item item-thumbnail-left" on-hold="deleteElement('pill','` + todaysPills[m][0] + `')"><img src=` + todaysPills[m][5] + `>`;
                                    }
                                    hist += `<h2>` + todaysPills[m][1] + `</h2>`;
                                    hist += `<p>Take at ` + $scope.convert24to12(todaysPills[m][2]) + `</p>`;
                                    hist += `<p>Amount:  ` + todaysPills[m][3] + `</p>`;
                                    if (todaysPills[m][4] != '') {
                                        hist += `<img src="` + $scope.getPillMealImg(todaysPills[m][4]) + `" style="max-height:25px;max-width:auto"></img>`;
                                    }
                                    hist += `</div>`;
                                }
                                if (hist == '') {
                                    hist += `<div class="row">`;
                                    hist += `<div class="col text-center">`;
                                    hist += 'No Pills Today';
                                    hist += `</div></div>`;
                                }
                                $('#history').html(hist);
                                $compile($('#history'))($scope);
                            }
                        );
                    },
                    resOnError);
                },
                resOnError);
            })
            function sortTimes(array) {
                return array.sort(function (a, b) {
                    if (parseInt(a[2].split(":")[0]) - parseInt(b[2].split(":")[0]) === 0) {
                        return parseInt(a[2].split(":")[1]) - parseInt(b[2].split(":")[1]);
                    } else {
                        return parseInt(a[2].split(":")[0]) - parseInt(b[2].split(":")[0]);
                    }
                })
            }
            function resOnError(error) {
                if (error.code != '1' && error.code != '5') {
                    console.log(error.code);
                }
            }
        }
        else {
            var type;
            var img;
            switch ($scope.trackType) {
                case 'addActivity':
                    type = 'activity';
                    img = '../img/trackers/activity.png';
                    break;
                case 'addBabyHeartRate':
                    type = 'babyHeartRate';
                    img = '../img/trackers/babyHeartRate.png';
                    break;
                case 'addBloodGlucose':
                    type = 'bloodGlucose';
                    img = '../img/trackers/bloodGlucose.png';
                    break;
                case 'addBloodIron':
                    type = 'bloodIron';
                    img = '../img/trackers/bloodIron.png';
                    break;
                case 'addBloodPressure':
                    type = 'bloodPressure';
                    img = '../img/trackers/bloodPressure.png';
                    break;
                case 'addCaffeine':
                    type = 'caffeine';
                    img = '../img/trackers/caffeine.png';
                    break;
                case 'addCigarette':
                    type = 'cigarette';
                    img = '../img/trackers/cigarette.png';
                    break;
                case 'addNutrition':
                    type = 'nutrition';
                    img = '../img/trackers/nutrition.png';
                    break;
                case 'addKicks':
                    type = 'kicks';
                    img = '../img/trackers/kicks.png';
                    break;
                case 'addMood':
                    type = 'mood';
                    img = '../img/trackers/mood.png';
                    break;
                case 'addPain':
                    type = 'pain';
                    img = '../img/trackers/pain.png';
                    break;
                case 'addStress':
                    type = 'stress';
                    img = '../img/trackers/stress.png';
                    break;
                case 'addWeight':
                    type = 'weight';
                    img = '../img/trackers/weight.png';
                    break;
            }
            db.get('track').then(function (doc) {
                var date = new Date($scope.currentDate);
                date = ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) + '/' + date.getFullYear();
                var hist = '';
                elements = doc[type]
                for (var i in elements) {
                    if (date == elements[i]["date"]) {
                        //get images
                        if (type == 'activity') {
                            img = $scope.getActivityImg(elements[i]["act"]);
                        }
                        if (type == 'mood') {
                            img = $scope.getMoodImg(elements[i]["value"]);
                        }
                        //add element
                        time = elements[i]["time"].substring(0, elements[i]["time"].length - 3);
                        hist += `<div class="item item-thumbnail-left" on-hold="deleteElement('` + type + `','` + elements[i]["id"] + `')"><img src='` + img + `' ><h2>` + elements[i]["value"] + `</h2><p>Time: ` + $scope.convert24to12(time) + `</p></div>`;
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
                $compile($('#history'))($scope);
            })
        };
    }
    $scope.getPillMealImg = function (type) {
        switch (type) {
            case 'withFood':
                return '../img/pills/withFood.jpg';
            case 'withoutFood':
                return '../img/pills/withoutFood.jpg';
            case 'beforeMeal':
                return '../img/pills/beforeMeal.jpg';
            case 'AfterMeal':
                return '../img/pills/afterMeal.jpg';
        }
    };
    $scope.getActivityImg = function (type) {
        switch (type) {
            case 'Bike':
                return '../img/activities/bike.png';
            case 'Clean':
                return '../img/activities/clean.png';
            case 'Dance':
                return '../img/activities/dance.png';
            case 'Exercise':
                return '../img/activities/exercise.png';
            case 'Run':
                return '../img/activities/run.png';
            case 'Shop':
                return '../img/activities/shop.png';
            case 'Walk':
                return '../img/activities/walk.png';
            case 'Walk Dog':
                return '../img/activities/walk_dog.png';
        }
    };
    $scope.getMoodImg = function (type) {
        switch (type) {
            case 'Bored':
                return '../img/moods/bored.png';
            case 'Calm':
                return '../img/moods/calm.png';
            case 'Cheerful':
                return '../img/moods/cheerful.png';
            case 'Excited':
                return '../img/moods/excited.png';
            case 'Irritated':
                return '../img/moods/irritated.png';
            case 'Neutral':
                return '../img/moods/neutral.png';
            case 'Relaxed':
                return '../img/moods/relaxed.png';
            case 'Sad':
                return '../img/moods/sad.png';
            case 'Tense':
                return '../img/moods/tense.png';
        }
    };
    /*$scope.getPainImg = function () {

    }
    $scope.getStressorImg = function () {

    };*/
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
    var totalMinutes = $('#minute');
    totalHours = $('#hour');
    totalHours.value = 0;
    console.log(totalHours)
    $scope.actAddHour = function () {
        totalHours.value++;
        $('#hour').html(("0" + totalHours.value).slice(-2));
    }
    $scope.actSubtractHour = function () {
        if (totalHours.value > 0) {
            totalHours.value--;
            $('#hour').html(("0" + totalHours.value).slice(-2));
        }
    }
    $scope.actClear = function () {
        totalMinutes.value = 0;
        $('#minute').html(("0" + totalMinutes.value).slice(-2));
        totalHours = $('#hour');
        totalHours.value = 0;
        $('#hour').html(("0" + totalHours.value).slice(-2));
    }
    $scope.selectDay = function (day) {
        if (document.getElementById(day).classList.contains('activeBorder')) {
            document.getElementById(day).classList.remove('activeBorder')
        }
        else {
            document.getElementById(day).classList.add('activeBorder')
        }
    };
    $scope.selectHow = function (how) {
        document.getElementById('withFood').classList.remove('activeBorder');
        document.getElementById('withoutFood').classList.remove('activeBorder');
        document.getElementById('beforeMeal').classList.remove('activeBorder');
        document.getElementById('afterMeal').classList.remove('activeBorder');
        document.getElementById(how).classList.add('activeBorder');
        $('#meal').val(how);
    };

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
    $scope.submitPill = function () {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            var id = moment().format('MM-DD-YYYYThhmmssa');
            var daysTaken = [];
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (i in days) {
                if (document.getElementById(days[i]).classList.contains('activeBorder')) {
                    daysTaken.push(days[i]);
                }
            }
            //save image
            window.resolveLocalFileSystemURL(document.getElementById('pillImg').src, resolveOnSuccess, resOnError);
            function resolveOnSuccess(entry) {
                fileName = id + ".jpg";
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getDirectory('MomLink', { create: true, exclusive: false },
                    function (directory) {
                        console.log(fileName)
                        entry.moveTo(directory, fileName, successMove, resOnError);
                    }, resOnError);
                }, resOnError);
            }
            function successMove(entry) {
                console.log(entry.toURL())
            }
            function resOnError(error) {
                console.log(error.code);
            }
            //add alert for pill
            /*if ($scope.notify == true) {
                document.addEventListener('deviceready', function () {

                }, false);
            }*/
            var element = {
                "id": id,
                "date": moment().format('MM/DD/YYYY'),
                "time": moment().format('HH:mm:ss'),
                "name": $('#pillName').val(),
                "dosage": $('#dosage').val(),
                "meal": $('#meal').val(),
                "timesTaken": $scope.pillTimes,
                "daysTaken": daysTaken
            };
            doc['pill'].push(element);
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.renderPillTimes = function () {
        var timesHtml = '';
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in $scope.pillTimes) {
                timesHtml += `<div class="item item-icon-right">` + $scope.convert24to12($scope.pillTimes[i]) + `<i class="button-icon icon ion-close-round" ng-click="deletePillTime('` + $scope.pillTimes[i] + `')" style="color:red"></i></div>`;
            }
            $('#times').html(timesHtml);
            $compile($('#times'))($scope);
        })
    };
    $scope.pillTimes = [];
    $scope.addTime = function () {
        $ionicPopup.show({
            template: `<input id="time" type="time">`,
            title: 'Add time to take pill',
            scope: $scope,
            buttons: [
              {
                  text: 'Add',
                  type: 'button-positive',
                  onTap: function () {
                      $scope.pillTimes.push($('#time').val())
                      $scope.renderPillTimes();
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };
    $scope.deletePillTime = function (time) {
        for (i in $scope.pillTimes) {
            if ($scope.pillTimes[i] == time) {
                $scope.pillTimes.splice(i, 1);
                break;
            }
        }
        $scope.renderPillTimes();
    };
    $scope.deleteElement = function (category, id) {
        $ionicPopup.show({
            title: 'Are you sure you want to delete this?',
            scope: $scope,
            buttons: [
        {
            text: 'Delete',
            type: 'button-assertive',
            onTap: function (e) {
                var db = PouchDB('momlink');
                db.get('track').then(function (doc) {
                    for (i in doc[category]) {
                        if (doc[category][i]['id'] === id) {
                            break;
                        }
                    }
                    doc[category].splice(i, 1)
                    return db.put(doc);
                }).then(function () {
                    if (category == 'pill') {
                        //if its a pill, delete it's associated picture
                        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                            dir.getDirectory('MomLink', { create: false, exclusive: false },
                            function (directory) {
                                directory.createReader().readEntries(
                                    function (entries) {
                                        for (j = 0; j < entries.length; j++) {
                                            if (entries[j].name == id + '.jpg') {
                                                entries[j].remove();
                                            }
                                        }
                                    }
                                );
                            }, resOnError);
                        }, resOnError);
                    }
                    $scope.clickTracker(`deleteElement('` + category + `')`)
                    $scope.loadHistory();
                })
            }
        },
        { text: 'Cancel' }
            ]
        });
        function resOnError(error) {
            //if (error.code != '1' && error.code != '5') {
            console.log(error.code);
            //}
        }
    };
})

.controller('ProfileCtrl', function ($scope) {
    $scope.updateProfile = function () {
        var db = PouchDB('momlink');
        db.get('profile').then(function (doc) {
            window.resolveLocalFileSystemURL(document.getElementById('profilePic').src, resolveOnSuccess, resOnError);
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
                console.log(error.code);
            }

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
            console.log(error.code);
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
            document.getElementById('profilePic').src = imageData;
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
                console.log(error.code);
            }
        }
    }
    $scope.takePillPhoto = function () {
        navigator.camera.getPicture(function (imageData) {
            onPhotoDataSuccess(imageData)
        }, $scope.onFail, {
            quality: 40,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            targetWidth: 300,
            targetHeight: 300,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true
        });
        onPhotoDataSuccess = function (imageData) {
            document.getElementById('pillImg').src = imageData;
        }
    }
    $scope.onFail = function (message) {
        if (message != 'Camera cancelled.') {
            alert('Failed because: ' + message);
        }
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