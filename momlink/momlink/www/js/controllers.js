angular.module('momlink.controllers', [])
/*
The header controller handles login, navigation, splash screen, back button, events
Event functions are handled by the HeaderCtrl since they are used
across the app instead of just the calendar page
*/
.controller('HeaderCtrl', function ($scope, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, $location, $document, $interval, $compile) {
    /*
    Creates all necessary tables on first login
    */
    $scope.initializeDB = function () {
        var db = new PouchDB('momlink')
        db.get('login').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "login",
                    "login_code": "6",
                    "username": "",
                    "password": "",
                    "triage_level": "",
                    "reset_code": "595",
                    "answer": "",
                    "agency": "",
                    "pncc_id": "",
                    "sec_question": "",
                    "client_id": "",
                    "token": ""
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
                        //{ "id": "5", "name": "Lydia Cady", "email": "cady@gmail.com", "phone": "920-655-1875", "image": "../img/temp/pncc2.jpg", "smsID": "0" }
                    ],
                    "messages": [],
                    "threads": [],
                    "clientMessages": [],
                });
            }
        });
        db.get('events').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "events",
                    "events": [
                        /*{
                            "id": '06-20-2016T10:53:29am',
                            "title": 'Smoking Cessation Program',
                            "category": '1',
                            "day": '2016-07-27',
                            "start": '2016-07-27T10:11',
                            "end": '2016-07-27T14:11',
                            "venue": '',
                            "description": '',
                            "share": '',
                            "color": 'red',
                            "scheduledBy": '0',
                            "viewed": '0',
                            "questions": []
                        }*/
                    ],
                    "questions":
                        {
                            "1": "How can I tell if the symptoms I'm having are normal?",
                            "2": "When should I call a doctor?",
                            "3": "Is there anything I should do to prepare?"
                        }
                });
            }
        });
        db.get('surveys').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "surveys",
                    "surveys": [
                        /*{
                            "id": '909',
                            "title": 'Follow-upTEST',
                            "questions":
                                {
                                    'Please rate your experience': ['Satisfactory', 'Unsatisfactory'],
                                    'How likely are you to reccommend us to a friend?': ['Unlikely', 'Likely', 'Very Likely']
                                },
                            "dateGiven": '10/19/2016',
                            "dateTaken": '',
                        }*/
                    ]
                });
            }
        });
        db.get('careplan').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "careplan",
                    'careplan': []
                });
            }
        });
        db.get('conditionsList').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "conditionsList",
                    'conditionsList': []
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
                    "conditions": [],
                    "kicks": [],
                    'mood': [],
                    'pain': [],
                    'pills': [],
                    'pillHistory': {},
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
                    "categories": [],
                    "articles": [],
                    "shared": [],
                    "history": [],
                    /*{
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
                    }*/
                });
            }
        });
        db.get('journal').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "journal",
                    "notes": [],
                    /*"visits": [
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
                    ]*/
                });
            }
        });
        db.get('referrals').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "referrals",
                    "referrals": [],
                });
            }
        });
        db.get('userData').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "userData",
                    "userData": [],
                    "pushNotfications": []
                });
            }
        });
        db.get('update').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "update",
                    'activity': '',
                    "babyHeartRate": '',
                    "bloodGlucose": '',
                    "bloodIron": '',
                    "bloodPressure": '',
                    "caffeine": '',
                    "cigarette": '',
                    "conditions": '',
                    "nutrition": '',
                    "kicks": '',
                    'mood': '',
                    'pain': '',
                    'pills': '',
                    'stress': '',
                    "weight": '',
                    "clientMessages": ''
                });
            }
        });
        db.get('progress').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "progress",
                    'Week 1': "Baby? What baby? This concept may be a little hard to wrap your head around, but even though you're technically in the first week of pregnancy, you're not quite expecting -- yet. Here's the deal: Because it's generally impossible to know the exact moment of conception, most healthcare providers count 40 weeks from the first day of your last menstrual period (LMP) to calculate your due date. According to this method, they date the beginning of 'pregnancy' from about two weeks before the sperm penetrates the egg -- which is where you are right now. Already spotted that pink line on a home pregnancy test? You're further along than you think, so skip ahead to Week 4. (Courtesy of www.parents.com)",
                    'Week 2': "So far your baby doesn't exist, but this is the week you ovulate. Your ovary releases a ripened egg (ovum) into your fallopian tube, where it will patiently await the sperm that have survived the 6- to 8-inch trek through your cervix and uterus. While 75 to 900 million sperm embark on this journey, less than a thousand actually make it past your cervix -- and only one lucky swimmer will have the honor of penetrating the egg at the moment of conception. (Courtesy of www.parents.com)",
                    'Week 3': "Amazingly, your child's sex and all of her inherited genetic characteristics -- such as eye color, hair color, skin, and body type -- have been set since the moment of conception. Your developing baby, now called a zygote, has 46 chromosomes -- 23 from you and 23 from your partner. These chromosomes help determine your baby's sex and traits such as eye and hair color, and, to some extent, personality and intelligence. After fertilization, the ball of cells, now an embryo, will wrap up its journey through the fallopian tube and burrow itself into the wall of your uterus for nourishment -- a process known as implantation. If you're having multiples, the deed has already been done. Fraternal twins occur when two separate eggs are fertilized by two different sperm and each baby has his own placenta and amniotic sac. If one fertilized egg splits and develops into two fetuses, the result is identical twins. They may share a placenta, but each baby usually has a separate amniotic sac. (Courtesy of www.parents.com)",
                    'Week 4': "So what's going on in your womb this week? Your embryo may be minuscule, but trust us: Super-important developments are already under way. This week the embryo splits into two parts. One half will become the placenta, a special tissue that delivers must-have nutrients and oxygen to your baby throughout your entire pregnancy. In the other half, the embryo itself continues to grow, and a sheet of cells has just begun to create the neural tube, where your baby's brain, spinal cord and backbone will ultimately form. (Courtesy of www.parents.com)",
                    'Week 5': "This week, your baby's ticker will start beating for the first time! (Neither you nor your doctor can hear it yet, but it may be possible to see the movement on an ultrasound.) And your little one has been really busy growing! The embryo now has three distinct layers: the outer ectoderm, which will form the nervous system, ears, eyes, inner ear and many connective tissues; the endoderm, or inner layer, which will grow into internal organs like the lungs, intestines and bladder; and the middle mesoderm, which will eventually make way for the heart and circulatory system. In the weeks to come, the mesoderm will also evolve into bones, muscles, kidneys and reproductive organs. (Courtesy of www.parents.com)",
                    'Week 6': "By the end of this week your baby will have tripled in size! His heart is now beating with a regular rhythm. It's still too faint to be picked up by your doctor's stethoscope, but if you have an ultrasound at some point over the next few weeks it will probably be visible as a tiny, pulsing dot in the middle of his mini body. Fun fact: From now until birth, your child's heart will beat about 150 times a minute -- twice the average adult rate. Also this week, your baby's brain hemispheres are forming -- and brain waves can now be recorded. (Courtesy of www.parents.com)",
                    'Week 7': "Your baby is already developing amazingly distinct facial features. Dark spots mark the areas where her eyes and nostrils will be, and a little mouth and ears are starting to form, too. Your baby's brain is also growing more complex; if you could take a peek, it would be clearly visible inside the transparent skull. In fact, nerve cells in your baby's brain are growing at an amazing rate -- 100,000 cells per minute! And she's started to move in small, jerky motions, although you won't feel these movements until about your fourth month of pregnancy. (Courtesy of www.parents.com)",
                    'Week 8': "Your baby's growth spurt continues: In the last two weeks he has quadrupled in size. As he gets bigger, his delicate facial features are becoming more refined, with his ears, upper lip, and the teeny tip of his nose all clearly visible. His eyelids will also take shape for the first time this week and his heart is growing stronger by the day. (Courtesy of www.parents.com)",
                    'Week 9': "Even though you still have to wait another eight weeks to find out if your new addition will be a boy or a girl, this week, your baby gets the goods she'll need to, well, make her own baby one day. That's right -- reproductive organs are beginning to form now, along with some other key organs, like the pancreas and gallbladder. At this point your baby has doubled in size and her head, which is about half the length of her entire body, is tucked down toward her chest. Her tiny fingers are growing longer, and the ends are slightly enlarged right now -- this is where those unique fingerprints will ultimately form. (Courtesy of www.parents.com)",
                    'Week 10': "Up until now your baby was classified as an embryo, but by the end of this week he will be a fetus and lots of changes are on the way. Paddle-like, or webbed, hands and feet will now separate into fingers and toes, bones will begin to harden and his kidneys are now producing urine. Most impressive? At this point your baby's brain is developing at astounding rates -- nearly 250,000 neurons are forming every minute! The end of the embryonic stage also marks a turning point for development dangers -- your baby is much less susceptible to them now. (Courtesy of www.parents.com)",
                    'Week 11': "Did you know your baby can breathe underwater? She's doing it right now. At weeks 10 and 11, the fetus will start to inhale and exhale small amounts of amniotic fluid, which helps your baby's lungs to grow and develop. Also this week, your baby's ears are scooting up to the sides of his head. Sure, your baby's head is still disproportionally large compared to the rest of his body, but this will even out as he continues to grow and develop in the womb. (Courtesy of www.parents.com)",
                    'Week 12': "As your baby's muscles start to bulk up at this stage, he's getting busy stretching and kicking. When you put your hand on your belly, your baby will likely wiggle in response because his reflexes are starting to develop -- though it's too early to feel his movements. He'll also start to open and close his fingers, curl his toes, and jerk and kick his arms and legs. (Courtesy of www.parents.com)",
                    'Week 13': "Your baby is constantly getting bigger and cuter, and his face is looking more human-like every day. His ears have moved up from his neck into place and his eyes -- which are looking more and more like your baby blues (or browns, or greens) -- have moved from the sides of the head to the front of the face. Up until now, his head has been outpacing his body, but now his body is growing faster. His legs still need to grow longer, but this week his arms will lengthen to be proportionate with his body, and he'll be able to stick his thumb in his mouth. Also by now, all of your baby's essential organs and systems have formed. (Courtesy of www.parents.com)",
                    'Week 14': "The roof of your baby's tiny mouth is fully formed now, and her constant sucking reflexes are helping to create full, cherubic cheeks. If you're having a boy, the prostate is forming, and if you're having a girl, her ovaries are moving down into her pelvis. (Courtesy of www.parents.com)",
                    'Week 15': "Lanugo, your baby's first ultrafine, downy hair, now covers his back, shoulders, ears, and forehead. It helps him retain body heat, but once he gains enough fat to do the job, this hair will fall off -- probably before birth. Facial expressions are your baby's newest trick -- he can frown, squint, grimace and wince. Don't worry -- he's just flexing his facial muscles, not indicating his mood. (Courtesy of www.parents.com)",
                    'Week 16': "Your baby's delicate skeleton continues to harden from rubbery cartilage to bone. Even so, his bones will remain somewhat flexible for an easier trip through the birth canal. The umbilical cord has fully matured with one vein and two arteries that are protected by Wharton's jelly (a thick substance that makes the cord slippery so it can move freely around your baby). By the way, if you're having a girl, hundreds of thousands of eggs are forming in her ovaries this week -- your future grandchildren! (Courtesy of www.parents.com)",
                    'Week 17': "Finally, your baby's arms, legs, and trunk have caught up to the size of his head. Baby starts plumping up this week, as body fat is deposited under his skin and sweat glands develop. Also worth noting: The placenta is almost as big as your baby. It provides vitamins, minerals, proteins, fats, and oxygen, along with removing waste and filtering carbon dioxide. (Courtesy of www.parents.com)",
                    'Week 18': "Do you and your partner talk to your baby? Well, with the bones and nerves in her ears now developed enough to function, she can hear all sorts of sounds -- including blood coursing through the umbilical cord, your growling tummy, and your heartbeat. In fact, sudden or loud noises may startle her. Go ahead and sing, tell stories or play music for your baby now. Even though your baby doesn't understand what these sounds are now, eventually she'll recognize your voice better than any other. (Courtesy of www.parents.com)",
                    'Week 19': "Vernix caseosa begins to coat the skin. The greasy, cheese-like white coating helps regulate body temperature and protects your baby's skin while it's submerged in amniotic fluid. By the time your baby is born, most of the vernix will be gone. Your baby's heartbeat is growing stronger now and it's about twice as fast as yours. (Courtesy of www.parents.com)",
                    'Week 20': "Your baby is as happy as a clam in your womb, as his well-developed limbs continue to explore by curling, flexing, and kicking. And as his hair, nails and eyebrows continue to sprout, your fetus is looking remarkably more and more like Mom and Dad every day. (Courtesy of www.parents.com)",
                    'Week 21': "Part of your baby's growth spurt at this point is likely because his stomach is now equipped to start absorbing energy-boosting nutrients from the amniotic fluid he's swallowing in there. Most of your baby's nourishment is still coming directly from the placenta, though. (Courtesy of www.parents.com)",
                    'Week 22': "Your baby's previously see-through skin will now become opaque. However, it will remain wrinkly, red, and covered in vernix until more fat helps to fill it out. Also this week, he's fine-tuning his sense of touch (thanks to maturing brain cells and nerve endings). Your baby may experiment with these newfound skills by feeling his face or anything else he can get his hands on. This week, your baby's eyebrows start growing and hair will start sprouting on the scalp, but this varies -- your baby may grow a thick head of dark hair or he may enter the world bald. (Courtesy of www.parents.com)",
                    'Week 23': "Billions of brain cells will develop in your baby's brain over the next couple of weeks. These will control all of your baby's movements and sensory, and basic life functions like breathing. Also around this time, some major changes are happening with your baby's lungs. Surfactant is being produced, a substance that enables the air sacs to inflate and the lungs to fully expand. Right now he's still breathing amniotic fluid, but when he's born he'll be ready for air. (Courtesy of www.parents.com)",
                    'Week 24': "You might notice that your baby is very busy during the next few weeks. Right now she's small enough to have plenty of room to move and groove in your belly. She may even respond to your soothing voice or the rubbing of your belly by calming down, while loud sounds or a tap on your belly could cause her to become alert. Also, because the balance-controlling inner ear has developed, your baby can finally tell if she's upside down or right side up, so moving around takes on new meaning. (Courtesy of www.parents.com)",
                    'Week 25': "Your baby's first bowel movement has been forming in the large intestine. The thick, dark poop is called meconium and it's typically excreted shortly after he's born. Occasionally babies pass this stool before they're born, which means it must be suctioned after birth to clear it from the lungs. (Courtesy of www.parents.com)",
                    'Week 26': "Your baby has settled into a distinct sleep-wake pattern. You may notice that sometimes he's very active and kicking or punching, and other times he sleeps. If you're lucky, these patterns will mimic yours. (Courtesy of www.parents.com)",
                    'Week 27': "Your baby has been hiccuping every once in a while for several weeks, and now you might actually feel these baby hiccups, which are triggered by the involuntary movements of his diaphragm. (In adults, this is followed by the quick closure of our vocal cords, which is what makes that familiar 'hic' sound.) But because your baby's trachea is filled with fluid instead of air, his fetal hiccups don't make a sound. They will make your belly jump though, which is fun to see and feel! (Courtesy of www.parents.com)",
                    'Week 28': "Until now, your baby's eyelids have been fused shut, but this week he'll begin to open and close his eyes. What's more, his irises are now filled with pigment. Even if you could peek at the color of his peepers now, though, they might not stay that color, as a baby's eyes can change up until he's 6 months to 1 year old (especially if your little guy is born with baby blues). (Courtesy of www.parents.com)",
                    'Week 29': "Your baby is getting stronger by the minute. This week, her pushes, kicks, and rolls will likely occur more frequently -- and forcefully. So don't be surprised if you feel an extra-strong karate chop or two! Around this time, the part of your baby's brain associated with intelligence and personality becomes far more complex. You can get to know your baby by paying attention to how she reacts to different foods, sounds, and lights. (Courtesy of www.parents.com)",
                    'Week 30': "From this point on your baby will gain about a half pound each week. All that baby weight is for more than filling out his chubby cheeks. Now that all of his major body systems are in place and functioning, he needs padding to protect and insulate his organs. His built-up fat tissue will also help him regulate his body temperature after birth and provide the energy he needs. Because your baby is adding fat and growing bigger, you might find his movements become less frequent -- it's getting harder for him to maneuver. But if you're not feeling any jabs or the occasional kick, tell your health care provider. (Courtesy of www.parents.com)",
                    'Week 31': "Your baby is gaining more weight than height at this point. Because she's too big to stretch out, she's now forced into the fetal position, which she'll stay in until birth. This this week also boasts some exciting reproductive developments. Having a boy? His testicles are moving through the groin on their way into the scrotum. And if you've got a girl in there, her clitoris is already relatively formed. (Courtesy of www.parents.com)",
                    'Week 32': "While a teeny part of you might be thinking 'Get this kid outta here ASAP!' we bet the rest is sincerely hoping he'll stay in there a while longer. That said, you can breathe a sigh of relief for this week's important milestone. Almost all babies born at this stage or later survive and go on to have very healthy, normal lives. By this time all of his major organs are fully functioning except the lungs, which need just a bit more time to mature completely. (Courtesy of www.parents.com)",
                    'Week 33': "Your baby doesn't have much elbow room these days -- and, happily, that's probably going to mean fewer elbow jabs to the ribs for you. Because space in your uterus is running out, your baby becomes less active at this point in the pregnancy. You may also notice that her movements are affected by your daily routine -- how much and when you eat, what position you are in and sounds from the world outside can all affect your baby's activity level. (Courtesy of www.parents.com)",
                    'Week 34': "Your baby's preparing for his arrival in just a few short weeks! This week, the protective vernix caseosa (that cheese-like, white, waxy coating that's keeping his skin safe) begins to thicken, ensuring that his birthday suit stays smooth and well-moisturized during D-day. Your baby will likely arrive covered in the stuff, especially in the folds under his arms, behind his ears, and in the groin area. But it'll all be washed off very shortly after birth -- during his first-ever bath. (Courtesy of www.parents.com)",
                    'Week 35': "At this point, your unborn baby should be positioned with her head facing down toward the cervix and vagina. About 97 percent of babies have adopted this position by this point; the rest remain in what's known as breech position -- when the butt or feet are in place to come out first. If your baby's among this minority, it does increase your odds of needing a C-section, but there's a good chance your healthcare provider can correct the problem by turning him around manually with pressure applied on your belly. Called an external version, this process has about a 65 percent success rate. (Courtesy of www.parents.com)",
                    'Week 36': "Your baby is working hard to accumulate all the fat he can at this point, and that layer of fat has now rounded out his face. This build-up of fat -- about 15 percent of his total weight--will help him maintain his body temperature and give him a store of energy. His sucking muscles, which are quite powerful, have also finished developing now, and are ready for their first real feeding -- your baby's going to be hungry soon after he arrives. (Courtesy of www.parents.com)",
                    'Week 37': "The umbilical cord begins passing antibodies to your baby in preparation for delivery. By stockpiling antibodies, your baby will be better prepared for the disease and germs he'll encounter outside the womb. Your baby's senses are also getting more time to hone their burgeoning skills. He can hear and recognize your voice. Once he's born you'll be able to see him turn his head in your direction when he hears you speak. He knows his mom! Along with his hearing, his eyesight is improving each day. His fingers are also becoming more coordinated. He can grasp his face or toes. And after birth he'll be able to grab onto your finger. (Courtesy of www.parents.com)",
                    'Week 38': "Your baby's hanging out, enjoying her last few weeks of snuggly comfort in your womb. However, if she were born today, she would still be considered a full-term infant. Her brain -- in charge of complicated jobs like regulating breathing, digestion, and circulation -- is functioning better every day. Babies come to term anywhere between 38 and 42 weeks; your 40-week due date simply marks the midpoint of this period. (Courtesy of www.parents.com)",
                    'Week 39': "By now your baby has likely reached his birth weight (typically between 6 and 9 pounds) and length (18 to 22 inches from head to toe). He's accumulated enough body fat to stay cozy after he's born, and your placenta continues to supply him with nutrients and antibodies that will help fend off illnesses. If you could sneak a peek at your baby's final moments before birth, you'd see that his head is down toward your pelvis (if he's not in the bottom-down or breech presentation, in which case your healthcare provider might suggest a cesarean section). Your baby's body will either be straight up and down, called longitudinal, or positioned at an angle, called oblique. Along with spying your baby's body position, if you could see his head, you'd notice that he's head-down and facing your spine, which is the most common position (called anterior presentation). But sometimes, babies present head-down but facing toward your abdomen. This is called occiput or cephalic posterior. Your baby might lean slightly to one side or the other, meaning that he is either 'right' or 'left' anterior, or 'right' or 'left' posterior. (Courtesy of www.parents.com)",
                    'Week 40': "When your baby arrives, he will be evaluated and graded (zero to two points each) on the following factors: activity and muscle tone, pulse (heart rate), grimace response (medically known as 'reflex irritability'), appearance (skin coloration) and respiration (breathing rate and effort). This sum will determine the baby's Apgar score -- an initial measure of his health. Most healthy babies have an Apgar between seven and nine (few babies get a 10). (Courtesy of www.parents.com)",
                    'Week 41': "As amazing as it is to meet your baby for the first time, don't be alarmed if she's not exactly, um, as good-looking as you imagined she would be. Those delivered vaginally tend to have temporarily misshapen heads and puffy eyes. And your baby will probably be coated with vernix caseosa, but most of it will be washed off during the first bath. It takes most newborns a few weeks to get that adorable, chubby-cheeked baby look down pat. (Courtesy of www.parents.com)",
                });
            }
        });
        db.get('client_trackers').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "client_trackers",
                    'activity': { 'status': '1', 'order': 0 },
                    "babyHeartRate": { 'status': '1', 'order': 1 },
                    "bloodGlucose": { 'status': '1', 'order': 2 },
                    "bloodIron": { 'status': '1', 'order': 3 },
                    "bloodPressure": { 'status': '1', 'order': 4 },
                    "caffeine": { 'status': '1', 'order': 5 },
                    "cigarette": { 'status': '1', 'order': 6 },
                    "conditions": { 'status': '1', 'order': 7 },
                    "nutrition": { 'status': '1', 'order': 8 },
                    "kicks": { 'status': '1', 'order': 9 },
                    'mood': { 'status': '1', 'order': 10 },
                    'pain': { 'status': '1', 'order': 11 },
                    'pills': { 'status': '1', 'order': 12 },
                    'stress': { 'status': '1', 'order': 13 },
                    "weight": { 'status': '1', 'order': 14 },
                });
            }
        });
        db.get('alerts').catch(function (err) {
            if (err.status === 404) {
                db.put({
                    "_id": "alerts",
                    'activity': [],
                    "babyHeartRate": [],
                    "bloodGlucose": [],
                    "bloodIron": [],
                    "bloodPressure": [],
                    "caffeine": [],
                    "cigarette": [],
                    "conditions": [],
                    "kicks": [],
                    'mood': [],
                    'pain': [],
                    'pills': [],
                    'stress': [],
                    "weight": [],
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
        //window.localStorage.setItem('cid', '555')
    }

    $scope.renderProgressBar = function () {
        var db = new PouchDB('momlink')
        var pbHtml = '';
        db.get('profile').then(function (doc) {
            if (doc['deliveryDate'] != '' && doc['startDate'] != '') {
                difference = moment.duration(moment().diff(moment(doc['startDate']))).asMonths();
                month = parseInt(difference) + 1;
                if (month > 9) {
                    pbHtml += ' <img src="../img/stages/postpartum.png" width="100%" style="max-width:100%; height:auto;vertical-align:middle"> ';
                }
                else {
                    pbHtml += ' <img src="../img/stages/month' + month + '.png" width="100%" style="max-width:100%; height:auto;vertical-align:middle"> ';
                }
                $('#progressBar').html(pbHtml);
                //$compile($('#progressBar'))($scope);
            }
        });
    }

    $scope.testPHP = function () {
        /*cordova.plugins.notification.badge.set(1);*/
        /*document.addEventListener("deviceready", function () {
            var date = new Date();
            var time = moment("2016-12-21T10:56", "YYYY-MM-DDTHH:mm:ssZ").toDate();
            var time2 = moment("2016-12-21T11:00", "YYYY-MM-DDTHH:mm:ssZ").toDate();
            var schedule = [
                {
                    id: 1,
                    title: "Local Notification Example 1",
                    text: "Multi Notification 1",
                    at: time
                },
            {
                id: 2,
                title: "Local Notification Example 2",
                text: "Multi Notification 2",
                at: time2
            }
            ]
            console.log(JSON.stringify(schedule))
            cordova.plugins.notification.local.schedule(schedule);
        })*/
    }

    $setReminder = function (title, time) {
        time = new moment(time);
        time = new Date(time);
        console.log(time)
        document.addEventListener("deviceready", function () {
            cordova.plugins.notification.local.schedule({
                title: title,
                at: time
            });
        });
    }
    //PHP
    /*
    Runs all php scripts
    */
    $scope.updateAll = function () {
        $scope.clickTracker('updateAll');
        $scope.getCategories()
        $scope.updateInbox();
        $scope.getEvents();
        $scope.updateClientEvents();
        $scope.deleteClientEvents();
        $scope.getReferrals();
        $scope.updateReferrals();
        $scope.getArticles();
        $scope.updateArticles();
        $scope.getSurveys();
        $scope.retrieveClientTrackers();
        $scope.uploadTrackers();
        $scope.getCareplan();
        $scope.updateCareplan();
        $scope.getConditions();
        $scope.getAlerts()
        $scope.sendClickData();
        $scope.sendPushData();
    };
    $scope.updateAllEvents = function () {
        $scope.getEvents();
        $scope.updateClientEvents();
        $scope.deleteClientEvents();
        $scope.sendClickData();
        $scope.toNewPage('calendar.html', 'Calendar');
    };
    $scope.updateAllReferrals = function () {
        $scope.getReferrals();
        $scope.updateReferrals();
        $scope.sendClickData();
        $scope.toNewPage('referrals.html', 'Referrals');
    };
    $scope.updateAllContent = function () {
        $scope.getArticles();
        $scope.updateArticles();
        $scope.sendClickData();
        $scope.toNewPage('education.html', 'Education');
    };
    $scope.updateAllSurveys = function () {
        $scope.getSurveys();
        $scope.sendClickData();
        $scope.toNewPage('survey.html', 'Survey');
    };
    $scope.updateAllGoals = function () {
        $scope.getCareplan();
        $scope.updateCareplan();
        $scope.sendClickData();
        $scope.toNewPage('careplan.html', 'Care Plan');
    };
    $scope.updateInboxButton = function () {
        $scope.updateInbox();
        $scope.sendClickData();
        $scope.toNewPage('inbox.html', 'Inbox');
    };
    //scrapped in favor of sendNewMesage and sendNewReply, may need later
    /*$scope.uploadMessages = function () {
        //similar to upload trackers but for clientMessages table
        var db = PouchDB('momlink');
        var recentID = '';
        //check update table to get the last element sent to server
        db.get('update').then(function (doc) {
            recentID = doc['clientMessages'];
        }).then(function () {
            //get new information since last update
            uploadData = [];
            db.get('inbox').then(function (doc) {
                for (var i in doc['clientMessages']) {
                    if (recentID < doc['clientMessages'][i]['id']) {
                        uploadData.push(doc['clientMessages'][i])
                    }
                }
            }).then(function () {
                //send this to the sever
                console.log(JSON.stringify(uploadData))
                if (uploadData.length > 0) {
                    var post_information = { 'data': JSON.stringify(uploadData), 'cid': window.localStorage.getItem('cid') };
                    $.ajax({
                        url: 'https://momlink.crc.nd.edu/~jonathan/current/sendMessages.php',
                        type: 'POST',
                        dataType: 'json',
                        data: post_information,
                        async: false,
                        success: function (data) {
                            if (data = true) {
                                console.log('message data successfully uploaded')
                                //run script to update record table
                                //upon success, get last element in uploadData and set it as entry in update table
                                db.get('update').then(function (doc) {
                                    doc['clientMessages'] = uploadData[uploadData.length - 1]['id'];
                                    return db.put(doc);
                                }).then(function () {
                                    console.log('message data successfully updated')
                                })
                            }
                        }
                    });
                }
                else {
                    console.log('messages already up to date');
                }
            })
        })
    };*/

    /*
      need to run these three functions asynchronously 
      getMessages is called inside the updateInbox function as it is dependent on pnccs in the db
      uploadSMSMessages is called inside the getMessages function
    */
    $scope.updateInbox = function () {
        //get PNCCs
        var db = PouchDB('momlink');
        var agency;
        db.get('login').then(function (doc) {
            agency = doc['agency']
        }).then(function () {
            var post_information = { 'cid': window.localStorage.getItem('cid'), 'agency': agency };
            console.log(JSON.stringify(post_information))
            $.ajax({
                url: 'https://momlink.crc.nd.edu/~jonathan/current/getPNCCs.php',
                type: 'POST',
                dataType: 'json',
                data: post_information,
                async: false,
                success: function (data) {
                    console.log(JSON.stringify(data))
                    db.get('inbox').then(function (doc) {
                        if (data.length > 0) {
                            for (i in data) {
                                //check if pncc is already in local db
                                var isUnique = true;
                                for (j in doc['pncc']) {
                                    if (data[i]['id'] == doc['pncc'][j]['id']) {
                                        isUnique = false;
                                    }
                                }
                                if (isUnique == true) {
                                    var pncc = {
                                        "id": data[i]['id'],
                                        "name": data[i]['first_name'] + ' ' + data[i]['last_name'],
                                        "phone": data[i]['phone'],
                                        "email": data[i]['email'],
                                        "smsID": 0,
                                    };
                                    doc['pncc'].push(pncc);
                                }
                            }
                            console.log('PNCCs downloaded')
                            return db.put(doc);
                        }
                        else {
                            console.log('No new PNCCs')
                        }
                    }).then(function () {
                        $scope.getMessages();
                    });
                }
            });
        })
    };
    $scope.getMessages = function () {
        var db = PouchDB('momlink');
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getThreads.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                console.log('MESSAGES')
                console.log(JSON.stringify(data))
                db.get('inbox').then(function (doc) {
                    if (data.length > 0 > 0 && data[0]['id'] != null) {
                        for (i in data) {
                            var isUnique = true;
                            for (j in doc['threads']) {
                                //if thread is already in the local db, update if new message has come in
                                if (data[i]['id'] == doc['threads'][j]['id']) {
                                    if (data[i]['excerpt'] != doc['threads'][j]['excerpt']) {
                                        doc['threads'][j]['excerpt'] = data[i]['excerpt'];
                                        doc['threads'][j]['mdate'] = data[i]['date'];
                                        doc['threads'][j]['read'] = 0;
                                    }
                                    isUnique = false;
                                }
                            }
                            if (isUnique == true) {
                                var thread = {
                                    "id": data[i]['id'],
                                    "date": data[i]['mdate'],
                                    "subject": data[i]['subject'],
                                    "excerpt": data[i]['excerpt'],
                                    "pncc_id": data[i]['pncc_id'],
                                    "msgid": data[i]['msgid'],
                                    "read": 0
                                };
                                doc['threads'].push(thread);
                            }
                        }
                        console.log('Threads downloaded')
                        return db.put(doc).then(function () {
                            $.ajax({
                                url: 'https://momlink.crc.nd.edu/~jonathan/current/getMessages.php',
                                type: 'POST',
                                dataType: 'json',
                                data: post_information,
                                async: false,
                                success: function (data) {
                                    db.get('inbox').then(function (doc) {
                                        if (data.length > 0 > 0 && data[0]['id'] != null) {
                                            for (i in data) {
                                                //check if message is already in local db
                                                var isUnique = true;
                                                for (j in doc['messages']) {
                                                    if (data[i]['id'] == doc['messages'][j]['id']) {
                                                        isUnique = false;
                                                    }
                                                }
                                                if (isUnique == true) {
                                                    var message = {
                                                        "id": data[i]['id'],
                                                        "date": data[i]['mdate'],
                                                        "sender": data[i]['sender'],
                                                        "subject": data[i]['subject'],
                                                        "content": data[i]['content'],
                                                        "pncc_id": data[i]['pncc_id'],
                                                        "msgid": data[i]['msgid'],
                                                    };
                                                    doc['messages'].push(message);
                                                }
                                            }
                                            console.log('Messages downloaded')
                                            return db.put(doc);
                                        }
                                    }).then(function () {
                                        $scope.uploadSMSMessages();
                                    });
                                }
                            });
                        })
                    }
                    else {
                        $scope.uploadSMSMessages();
                    }
                })
            }
        });
    };
    $scope.uploadSMSMessages = function () {
        var db = PouchDB('momlink');
        var uploadData = [];
        var smsUpdates = {};
        db.get('inbox').then(function (doc) {
            for (i in doc['pncc']) {
                pncc = doc['pncc'][i];
                phone = pncc['phone'];
                smsID = pncc['smsID'];
                //change box to sent only
                SMS.listSMS({ box: '', address: '+'.concat(phone), maxCount: 100000 }, function (data) {
                    //if data.length > 0
                    if (data != null && data.length != 0) {
                        for (j in data) {
                            if (parseInt(smsID) < parseInt(data[j]['_id'])) {
                                data[j]['date'] = new moment(data[j]['date']).format('MM/DD/YYYY')
                                data[j]['pncc_id'] = pncc['id']
                                uploadData.push(data[j])
                            }
                        }
                        smsUpdates[pncc['id']] = data[0]['_id'];
                    }
                })
            }
            return db.put(doc).then(function () {
                //send this to the sever
                if (uploadData.length > 0) {
                    var post_information = { 'data': JSON.stringify(uploadData), 'cid': window.localStorage.getItem('cid') };
                    $.ajax({
                        url: 'https://momlink.crc.nd.edu/~jonathan/current/sendSMSMessages.php',
                        type: 'POST',
                        dataType: 'json',
                        data: post_information,
                        async: false,
                        success: function (data) {
                            if (data = true) {
                                console.log('sms message data successfully uploaded')
                                //run script to update record table
                                //upon success, get update smsIDs to avoid repeats
                                db.get('inbox').then(function (doc) {
                                    for (k in smsUpdates) {
                                        //match pnccid to pncc in db
                                        for (n in doc['pncc']) {
                                            if (doc['pncc'][n]['id'] == k) {
                                                doc['pncc'][n]['smsID'] = smsUpdates[k];
                                            }
                                        }
                                    }
                                    return db.put(doc);
                                }).then(function () {
                                    console.log('sms message data successfully updated')
                                })
                            }
                        }
                    });
                }
                else {
                    console.log('sms messages already up to date');
                }
            });
        });
    }

    $scope.retrieveClientTrackers = function () {
        var db = PouchDB('momlink');
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getClientTrackers.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    db.get('client_trackers').then(function (doc) {
                        doc['activity']['status'] = data[0]['activity'];
                        doc['babyHeartRate']['status'] = data[0]['babyHeartRate'];
                        doc['bloodGlucose']['status'] = data[0]['bloodGlucose'];
                        doc['bloodIron']['status'] = data[0]['bloodIron'];
                        doc['bloodPressure']['status'] = data[0]['bloodPressure'];
                        doc['caffeine']['status'] = data[0]['caffeine'];
                        doc['cigarette']['status'] = data[0]['cigarettes'];
                        doc['nutrition']['status'] = data[0]['nutrition'];
                        doc['kicks']['status'] = data[0]['kicks'];
                        doc['mood']['status'] = data[0]['mood'];
                        doc['pain']['status'] = data[0]['pain'];
                        doc['pills']['status'] = data[0]['pills'];
                        doc['stress']['status'] = data[0]['stressors'];
                        doc['weight']['status'] = data[0]['weight'];
                        return db.put(doc);
                    });
                }
                else {
                    console.log('Could not access client_trackers')
                }
            }
        });
        console.log('client_trackers');
    };

    $scope.getEvents = function () {
        var db = PouchDB('momlink');
        var recentID = '';
        db.get('login').then(function (doc) {
            triage_level = doc['triage_level'];
        }).then(function () {
            db.get('events').then(function (doc) {
                var post_information = { 'cid': window.localStorage.getItem('cid'), 'triage_level': triage_level };
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/getEventIDs.php',
                    type: 'POST',
                    dataType: 'json',
                    data: post_information,
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        dbIDs = []
                        eventIDs = []
                        //get ids in db
                        for (j in doc['events']) {
                            dbIDs.push(doc['events'][j]['id'])
                        }
                        //check if events are already in database
                        for (i in data) {
                            //if event is not in the db flag as one to be added
                            if ($.inArray(data[i]['id'], dbIDs) == -1) {
                                eventIDs.push(data[i]['id'])
                            }
                        }
                        if (eventIDs.length != 0) {
                            var post_information2 = { 'ids': JSON.stringify(eventIDs) };
                            $.ajax({
                                url: 'https://momlink.crc.nd.edu/~jonathan/current/getEvents.php',
                                type: 'POST',
                                dataType: 'json',
                                data: post_information2,
                                async: false,
                                success: function (data) {
                                    console.log(JSON.stringify(data))
                                    db.get('events').then(function (doc) {
                                        for (i in data) {
                                            var dateFormatted = moment(data[i]['edate']);
                                            dateFormatted = dateFormatted.format('YYYY-MM-DD');
                                            //check that time is in the right format
                                            if (data[i]['start'] != "" && (data[i]['start'].indexOf("AM") >= 0 || data[i]['start'].indexOf("am") >= 0 || data[i]['start'].indexOf("PM") >= 0 || data[i]['start'].indexOf("pm") >= 0)) {
                                                var startTime = moment(data[i]['start'], ["h:mm A"]).format("HH:mm");
                                            }
                                            else {
                                                var startTime = data[i]['start'];
                                            }
                                            if (data[i]['end'] != "" && (data[i]['end'].indexOf("AM") >= 0 || data[i]['end'].indexOf("am") >= 0 || data[i]['end'].indexOf("PM") >= 0 || data[i]['end'].indexOf("pm") >= 0)) {
                                                var endTime = moment(data[i]['end'], ["h:mm A"]).format("HH:mm");
                                            }
                                            else {
                                                var endTime = data[i]['end'];
                                            }
                                            var event = {
                                                "id": data[i]['id'],
                                                "title": data[i]['title'],
                                                "category": data[i]['category'],
                                                "day": dateFormatted,
                                                "start": dateFormatted + 'T' + startTime,
                                                "end": dateFormatted + 'T' + endTime,
                                                "venue": data[i]['venue'],
                                                "description": data[i]['description'],
                                                "questions": [],
                                                "color": $scope.getColor(data[i]['category']),
                                                "viewed": '1',
                                                "scheduledBy": '1'
                                            };
                                            doc['events'].push(event);
                                        }
                                        return db.put(doc).then(function () {
                                            console.log('new events added')
                                        })
                                    });
                                }
                            });
                        }
                        else {
                            console.log('shared events already up to date')
                        }
                    }
                });
            })

        });
    };
    $scope.updateClientEvents = function () {
        var db = PouchDB('momlink');
        var uploadEvents = [];
        db.get('events').then(function (doc) {
            //get all events where share = 1 AND upload = 0 or 2 (2 means changes have been made that need to be sent)
            for (i in doc['events']) {
                if (doc['events'][i]['share'] == 1 && (doc['events'][i]['upload'] == 0 || doc['events'][i]['upload'] == 2)) {
                    uploadEvents.push(doc['events'][i])
                }
            }
            console.log(JSON.stringify(uploadEvents))
            //need to convert dates before uploading
            for (j in uploadEvents) {
                uploadEvents[j]['start'] = $scope.parseTime(uploadEvents[j]['start'])
                uploadEvents[j]['end'] = $scope.parseTime(uploadEvents[j]['end'])
                delete uploadEvents[j]['color'];
                delete uploadEvents[j]['viewed'];
                delete uploadEvents[j]['scheduledBy'];
                delete uploadEvents[j]['questions'];
            }

        }).then(function () {
            if (uploadEvents.length > 0) {
                var post_information = {};
                post_information.events = uploadEvents;
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/updateEvents.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log('output')
                        console.log(JSON.stringify(data))
                        //for each event in events, update uploaded value to 1
                        db.get('events').then(function (doc) {
                            index = 0;
                            for (k in uploadEvents) {
                                if (uploadEvents[k]['upload'] == 0) {
                                    //console.log(data[m]['LAST_INSERT_ID()'])
                                    //console.log(JSON.stringify(uploadEvents[k]['server_id']))
                                    uploadEvents[k]['server_id'] = data[index]['LAST_INSERT_ID()'];
                                    index++;
                                }
                            }
                            //set upload value so it is not reuploaded, set server id in case of modifications
                            for (k in uploadEvents) {
                                uploadEvents[k]['upload'] = '1';
                                for (m in doc['events']) {
                                    if (uploadEvents[k]['id'] == doc['events'][m]['id']) {
                                        doc['events'][m]['upload'] = '1';
                                        doc['events'][m]['server_id'] = uploadEvents[k]['server_id'];
                                    }
                                }
                            }
                            console.log('Events uploaded')
                            return db.put(doc);
                        });
                    }
                });
            }
            else {
                console.log('client events already up to date')
            }
        })
    };
    $scope.deleteClientEvents = function () {
        var db = PouchDB('momlink');
        var uploadEvents = [];
        db.get('events').then(function (doc) {
            //get all events where share = 0 AND upload = 1 || upload = 2
            for (i in doc['events']) {
                if (doc['events'][i]['share'] == 0 && (doc['events'][i]['upload'] == 1 || doc['events'][i]['upload'] == 2)) {
                    uploadEvents.push(doc['events'][i])
                }
            }
            console.log(JSON.stringify(uploadEvents))
            for (j in uploadEvents) {
                uploadEvents[j]['start'] = $scope.parseTime(uploadEvents[j]['start'])
                delete uploadEvents[j]['end'];
                delete uploadEvents[j]['color'];
                delete uploadEvents[j]['viewed'];
                delete uploadEvents[j]['scheduledBy'];
                delete uploadEvents[j]['questions'];
            }

        }).then(function () {
            if (uploadEvents.length > 0) {
                var post_information = {};
                post_information.events = uploadEvents;
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/deleteEvents.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: JSON.stringify(post_information) },
                    async: false,
                    success: function (data) {
                        //for each event in events, update uploaded value to 0
                        if (data == true) {
                            db.get('events').then(function (doc) {
                                for (k in uploadEvents) {
                                    uploadEvents[k]['upload'] = '1';
                                    for (m in doc['events']) {
                                        if (uploadEvents[k]['id'] == doc['events'][m]['id']) {
                                            doc['events'][m]['upload'] = '0';
                                        }
                                    }
                                }
                                console.log('Events deleted')
                                return db.put(doc);
                            });
                        }
                    }
                });
            }
            else {
                console.log('No events to delete')
            }
        })
    };
    $scope.getReferrals = function () {
        var db = PouchDB('momlink');
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getReferrals.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                console.log(JSON.stringify(data))
                if (data.length > 0 && data[0]['id'] != null) {
                    console.log(JSON.stringify(data[0]['id']))
                    db.get('referrals').then(function (doc) {
                        for (i in data) {
                            //check if referral is already in local db
                            var isUnique = true;
                            for (j in doc['referrals']) {
                                if (data[i]['id'] == doc['referrals'][j]['id']) {
                                    isUnique = false;
                                }
                            }
                            if (isUnique == true) {
                                var referral = {
                                    "id": data[i]['id'],
                                    "name": data[i]['name'],
                                    "address": data[i]['address'],
                                    "phone": data[i]['phone'],
                                    "email": data[i]['email'],
                                    "date": moment().format('MM/DD/YYYY'),
                                    "meeting": '',
                                    "upload": '1',
                                    "referral_status": '',
                                };
                                doc['referrals'].push(referral);
                            }
                        }
                        console.log('Referrals downloaded')
                        return db.put(doc);
                    });
                }
                else {
                    console.log('No new referrals')
                }
            }
        });
    };
    $scope.updateReferrals = function () {
        var db = PouchDB('momlink');
        var uploadReferrals = [];
        db.get('referrals').then(function (doc) {
            //get all referrals where upload == 0 and referral_status == 1 (referrals not previously updated but have meetings scheduled)
            for (i in doc['referrals']) {
                if (doc['referrals'][i]['upload'] == 0) {
                    uploadReferrals.push(doc['referrals'][i])
                }
            }
            //minimize data sent to sever
            for (j in uploadReferrals) {
                delete uploadReferrals[j]['name'];
                delete uploadReferrals[j]['address'];
                delete uploadReferrals[j]['phone'];
                delete uploadReferrals[j]['date'];
                delete uploadReferrals[j]['meeting'];
                delete uploadReferrals[j]['upload'];
            }
        }).then(function () {
            if (uploadReferrals.length > 0) {
                var post_information = {};
                post_information.referrals = uploadReferrals;
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/updateReferrals.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        //for each referral updated, update uploaded value to 1
                        if (data == true) {
                            db.get('referrals').then(function (doc) {
                                //set upload value so it is not reuploaded
                                for (k in uploadReferrals) {
                                    for (m in doc['referrals']) {
                                        if (uploadReferrals[k]['id'] == doc['referrals'][m]['id']) {
                                            doc['referrals'][m]['upload'] = '1';
                                        }
                                    }
                                }
                                console.log('Referrals updated')
                                return db.put(doc);
                            });
                        }
                    }
                });
            }
            else {
                console.log('Referrals already up to date')
            }
        })
    };
    $scope.getArticles = function () {
        var db = PouchDB('momlink');
        var downloads = [];
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getArticles.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                console.log(JSON.stringify(data))
                if (data.length > 0) {
                    db.get('articles').then(function (doc) {
                        for (i in data) {
                            //check if articleID is already in shared/history
                            if ($.inArray(data[i]['id'], doc['shared']) == -1 && $.inArray(data[i]['id'], doc['history'])) {
                                //check if article is already in local db
                                var isUnique = true;
                                for (j in doc['articles']) {
                                    if (data[i]['id'] == doc['articles'][j]['id']) {
                                        isUnique = false;
                                    }
                                }
                                if (isUnique == true) {
                                    //makes quiz suitable for json parse
                                    //data[i]['quiz'] = data[i]['quiz'].replace(/'/g, `"`);
                                    data[i]['quiz'] = JSON.stringify(data[i]['quiz']);
                                    var article = {
                                        "id": data[i]['id'],
                                        "title": data[i]['title'],
                                        "category": data[i]['category'],
                                        "description": data[i]['description'],
                                        "content_text": data[i]['path'],
                                        "filename": data[i]['filename'],
                                        "localPath": "",
                                        "dateShared": data[i]['share_date'],
                                        "lastRead": "",
                                        "readHistory": {},
                                        "quiz": JSON.parse(data[i]['quiz']),
                                        "quizAttempts": '0',
                                        "quizFollowup": '0',
                                        "lastAttempt": "",
                                        "bestScore": '0',
                                        "quizHistory": {},
                                        "upload": '0',
                                        "article_status": '0'
                                    };
                                    //console.log(JSON.stringify(article))
                                    doc['articles'].push(article);
                                    doc['shared'].push(data[i]['id']);
                                    if (article["content_text"].substring(0, 2) == './') {
                                        downloads.push(article);
                                    }
                                }
                                else {
                                    doc['shared'].push(data[i]['id']);
                                }
                            }
                        }
                        console.log('Articles downloaded')
                        return db.put(doc).then(function () {
                            //need this to run in a callback 
                            if (downloads.length > 0) {
                                var x = 0;
                                var loopDownloads = function (arr) {
                                    console.log(JSON.stringify(arr))
                                    downloadFile(arr[x], function () {
                                        x++;
                                        if (x < arr.length) {
                                            loopDownloads(arr);
                                        }
                                    });
                                }
                                function downloadFile(article, callback) {
                                    console.log(JSON.stringify(article))
                                    var downloadLink = String("https://momlink.crc.nd.edu/MomLink-PNCC/uploads/" + article['filename']);
                                    var uri = encodeURI(downloadLink);
                                    //remove spaces from filename
                                    filename = article['filename'].replace(/\s/g, '')
                                    var localPath = cordova.file.externalRootDirectory + "/MomLink/content/" + filename;
                                    console.log(uri)
                                    console.log(localPath)
                                    var fileTransfer = new FileTransfer();
                                    fileTransfer.download(uri, localPath,
                                        function (entry) {
                                            console.log("download complete: " + entry.toURL());
                                            db.get('articles').then(function (doc) {
                                                //get all articles where upload == 0 and articles_status == 1 (articles modified since last update)
                                                for (i in doc['articles']) {
                                                    if (doc['articles'][i]['id'] == article['id']) {
                                                        doc['articles'][i]['localPath'] = entry.toURL();
                                                        //remove spaces from filename
                                                        doc['articles'][i]['filename'] = doc['articles'][i]['filename'].replace(/\s/g, '')
                                                        console.log(entry.toURL())
                                                    }
                                                }
                                                return db.put(doc).then(function () {
                                                    callback();
                                                })
                                            })
                                        },
                                        function (error) {
                                            console.log("download error source " + error.source);
                                            console.log("download error target " + error.target);
                                            console.log("download error code" + error.code);
                                        },
                                        false,
                                        {
                                            headers: {
                                                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                            }
                                        }
                                    );
                                }
                                loopDownloads(downloads)
                            }
                        })
                    })
                }
                else {
                    console.log('No new articles')
                }
            }
        });
    };
    $scope.updateArticles = function () {
        var db = PouchDB('momlink');
        var uploadArticles = [];
        db.get('articles').then(function (doc) {
            //get all articles where upload == 0 and articles_status == 1 (articles modified since last update)
            for (i in doc['articles']) {
                if ((doc['articles'][i]['upload'] == 0 || doc['articles'][i]['upload'] == 2) && doc['articles'][i]['article_status'] == 1) {
                    uploadArticles.push(doc['articles'][i])
                }
            }
            //prune articles of uneccessary content before upload
            for (j in uploadArticles) {
                delete uploadArticles[j]['title'];
                delete uploadArticles[j]['category'];
                delete uploadArticles[j]['description'];
                delete uploadArticles[j]['content_text'];
                delete uploadArticles[j]['content_obj'];
                delete uploadArticles[j]['dateShared'];
                delete uploadArticles[j]['quiz'];
                delete uploadArticles[j]['article_status'];
                delete uploadArticles[j]['upload'];
            }
        }).then(function () {
            if (uploadArticles.length > 0) {
                var post_information = {};
                post_information.articles = uploadArticles;
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/updateArticles.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        //for each article updated, update uploaded value to 1
                        if (data == true) {
                            db.get('articles').then(function (doc) {
                                //set upload value so it is not reuploaded and clean local read/quiz history 
                                for (k in uploadArticles) {
                                    for (m in doc['articles']) {
                                        if (uploadArticles[k]['id'] == doc['articles'][m]['id']) {
                                            doc['articles'][m]['upload'] = '1';
                                            doc['articles'][m]['readHistory'] = {};
                                            doc['articles'][m]['quizHistory'] = {};
                                        }
                                    }
                                }
                                console.log('Articles updated')
                                return db.put(doc);
                            });
                        }
                    }
                });
            }
            else {
                console.log('Articles already up to date')
            }
        })
    };
    $scope.getSurveys = function () {
        var db = PouchDB('momlink');
        var downloads = [];
        var agency;
        db.get('login').then(function (doc) {
            agency = doc['agency']
        }).then(function () {
            var post_information = { 'cid': window.localStorage.getItem('cid'), 'agency': agency };
            console.log(JSON.stringify(post_information))
            $.ajax({
                url: 'https://momlink.crc.nd.edu/~jonathan/current/getSurveys.php',
                type: 'POST',
                dataType: 'json',
                data: post_information,
                async: false,
                success: function (data) {
                    console.log(JSON.stringify(data))
                    if (data.length > 0) {
                        db.get('surveys').then(function (doc) {
                            //console.log(JSON.stringify(doc['surveys']))
                            for (i in data) {
                                var add = true;
                                //check if survey is already in local db
                                for (j in doc['surveys']) {
                                    if (doc['surveys'][j]['id'] == data[i]['questionnaire_id']) {
                                        add = false;
                                        break;
                                    }
                                }
                                if (add) {
                                    //makes quiz suitable for json parse
                                    //data[i]['quiz'] = data[i]['quiz'].replace(/'/g, `"`);
                                    data[i]['quiz'] = JSON.stringify(data[i]['quiz']);
                                    var survey = {
                                        "id": data[i]['questionnaire_id'],
                                        "title": data[i]['title'],
                                        "content": JSON.parse(data[i]['quiz']),
                                        "responses": [],
                                        "upload": '0',
                                        "dateTaken": ''
                                    };
                                    //console.log(JSON.stringify(survey))
                                    doc['surveys'].push(survey);
                                }
                            }
                            return db.put(doc);
                            console.log('Surveys downloaded')
                        })
                    }
                    else {
                        console.log('No new surveys')
                    }
                }
            });
        }).then(function (doc) {
            var uploadSurveys = [];
            db.get('surveys').then(function (doc) {
                //get all referrals where upload == 0 and survey_status == 1 (surveys not previously updated but have been completed)
                for (i in doc['surveys']) {
                    if (doc['surveys'][i]['upload'] == 0 && doc['surveys'][i]['survey_status'] == 1) {
                        uploadSurveys.push([doc['surveys'][i]['id'], doc['surveys'][i]['responses']])
                    }
                }
            }).then(function () {
                if (uploadSurveys.length > 0) {
                    var post_information = {};
                    post_information.surveys = uploadSurveys;
                    post_information.cid = window.localStorage.getItem('cid');
                    $.ajax({
                        url: 'https://momlink.crc.nd.edu/~jonathan/current/updateSurveys.php',
                        type: 'POST',
                        dataType: 'json',
                        data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                        async: false,
                        success: function (data) {
                            //for each survey updated, update uploaded value to 1
                            if (data == true) {
                                db.get('surveys').then(function (doc) {
                                    //set upload value so it is not reuploaded
                                    for (k in uploadSurveys) {
                                        for (m in doc['surveys']) {
                                            if (uploadSurveys[k][0] == doc['surveys'][m]['id']) {
                                                doc['surveys'][m]['upload'] = '1';
                                            }
                                        }
                                    }
                                    console.log('Surveys updated')
                                    return db.put(doc);
                                });
                            }
                        }
                    });
                }
                else {
                    console.log('Surveys already up to date')
                }
            })
        })
    };

    $scope.uploadTrackers = function () {
        //each cell holds the table and php script
        var tables = [['activity', 'Activity'], ['bloodGlucose', 'Track'], ['babyHeartRate', 'Track'], ['bloodIron', 'Track'],
                      ['bloodPressure', 'BloodPressure'], ['caffeine', 'Track'], ['cigarette', 'Track'], ['conditions', 'Track'], ['kicks', 'Kicks'],
                      ['mood', 'Track'], ['nutrition', 'Nutrition'], ['pain', 'Track'], ['pills', 'Pills'], ['stress', 'Track'], ['weight', 'Track']];
        var x = 0;
        var loopTrackers = function (arr) {
            uploadTracker(arr[x], function () {
                x++;
                if (x < arr.length) {
                    loopTrackers(arr);
                }
            });
        }
        function uploadTracker(table, callback) {
            var db = PouchDB('momlink');
            var recentID = '';
            tableName = table[0];
            serverTableName = tableName;
            if (tableName == 'nutrition') {
                serverTableName = 'client_nutrition';
            }
            if (tableName == 'weight') {
                serverTableName = 'client_weight';
            }
            if (tableName == 'conditions') {
                serverTableName = 'client_conditions';
            }
            //check update table to get the last element sent to server
            db.get('update').then(function (doc) {
                recentID = doc[tableName];
            }).then(function () {
                //get new information since last update
                uploadData = [];
                docName = 'track';
                //need to pull from different database for nutrition
                if (table[0] == 'nutrition') {
                    docName = 'nutrition';
                }
                db.get(docName).then(function (doc) {
                    if (docName != 'nutrition') {
                        for (var i in doc[table[0]]) {
                            if (recentID < doc[tableName][i]['id']) {
                                uploadData.push(doc[tableName][i])
                            }
                        }
                    }
                    else {
                        var nutritionType = ['fruits', 'vegetables', 'proteins', 'grains', 'dairy', 'fluids', 'sweets', 'fats/oils']
                        for (var i in nutritionType) {
                            for (var j in doc[nutritionType[i]]) {
                                if (recentID < doc[nutritionType[i]][j]['id']) {
                                    uploadData.push(doc[nutritionType[i]][j]);
                                }
                            }
                        }
                    }
                }).then(function () {
                    //send this to the sever
                    console.log(JSON.stringify(uploadData))
                    if (uploadData.length > 0) {
                        var post_information = { 'data': JSON.stringify(uploadData), 'cid': window.localStorage.getItem('cid'), 'table': serverTableName };
                        $.ajax({
                            url: 'https://momlink.crc.nd.edu/~jonathan/current/send' + table[1] + '.php',
                            type: 'POST',
                            dataType: 'json',
                            data: post_information,
                            async: false,
                            success: function (data) {
                                //console.log(JSON.stringify(data))
                                if (data = true) {
                                    console.log('tracking data successfully uploaded')
                                    //run script to update record table
                                    //upon success, get last element in uploadData and set it as entry in update table
                                    db.get('update').then(function (doc) {
                                        doc[tableName] = uploadData[uploadData.length - 1]['id'];
                                        return db.put(doc);
                                    }).then(function () {
                                        var post_information = { 'success': '1', 'cid': window.localStorage.getItem('cid'), 'table': serverTableName };
                                        $.ajax({
                                            url: 'https://momlink.crc.nd.edu/~jonathan/current/updateRecords.php',
                                            type: 'POST',
                                            dataType: 'json',
                                            data: post_information,
                                            success: function (data) {
                                                callback();
                                            }
                                        });
                                    })
                                }
                                else {
                                    var post_information = { 'success': '0', 'cid': window.localStorage.getItem('cid'), 'table': tableName };
                                    $.ajax({
                                        url: 'https://momlink.crc.nd.edu/~jonathan/current/updateRecords.php',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: post_information,
                                        success: function (data) {
                                            callback();
                                        }
                                    });
                                }
                            }
                        });
                    }
                    else {
                        console.log(table[0] + ' already up to date');
                        var post_information = { 'success': '1', 'cid': window.localStorage.getItem('cid'), 'table': tableName };
                        $.ajax({
                            url: 'https://momlink.crc.nd.edu/~jonathan/current/updateRecords.php',
                            type: 'POST',
                            dataType: 'json',
                            data: post_information,
                            async: false,
                            success: function (data) {
                                callback();
                            }
                        });
                    }
                })
            })
        }
        loopTrackers(tables);
    };
    $scope.getCareplan = function () {
        var db = PouchDB('momlink');
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getCareplan.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    //&& data[0]['id'] != null
                    //console.log(JSON.stringify(data[0]['id']))
                    db.get('careplan').then(function (doc) {
                        for (i in data) {
                            //check if careplan is already in local db
                            var isUnique = true;
                            for (j in doc['careplan']) {
                                if (data[i]['record_id'] == doc['careplan'][j]['id']) {
                                    isUnique = false;
                                }
                            }
                            if (isUnique == true) {
                                var cp = {
                                    "id": data[i]['record_id'],
                                    "goal": data[i]['goal'],
                                    "status": data[i]['careplan_status'],
                                    "upload": '1'
                                };
                                doc['careplan'].push(cp);
                            }
                        }
                        console.log('Careplan downloaded')
                        return db.put(doc);
                    });
                }
                else {
                    console.log('No new goals for careplan')
                }
            }
        });
    };
    $scope.getConditions = function () {
        var db = PouchDB('momlink');
        //var post_information = { 'cid': window.localStorage.getItem('cid') };
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getConditions.php',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.length > 0) {
                    db.get('conditionsList').then(function (doc) {
                        //console.log(JSON.stringify(data))
                        for (i in data) {
                            //check if condition is already in local db
                            if ($.inArray(data[i]['name'], doc['conditionsList']) == -1) {
                                doc['conditionsList'].push(data[i]['name']);
                            }
                        }
                        console.log('Conditions downloaded')
                        return db.put(doc);
                    });
                }
            }
        });
    };
    $scope.getCategories = function () {
        var db = PouchDB('momlink');
        var agency;
        db.get('login').then(function (doc) {
            agency = doc['agency']
        }).then(function () {
            var post_information = { 'agency': agency };
            console.log(JSON.stringify(post_information))
            $.ajax({
                url: 'https://momlink.crc.nd.edu/~jonathan/current/getCategories.php',
                type: 'POST',
                dataType: 'json',
                data: post_information,
                async: false,
                success: function (data) {
                    console.log(JSON.stringify(data))
                    if (data.length > 0) {
                        db.get('articles').then(function (doc) {
                            for (i in data) {
                                //check if referral is already in local db
                                var isUnique = true;
                                for (j in doc['categories']) {
                                    if (data[i]['id'] == doc['categories'][j]['id']) {
                                        isUnique = false;
                                    }
                                }
                                if (isUnique == true) {
                                    filename = data[i]['image'].substring(data[i]['image'].lastIndexOf("/") + 1);
                                    var category = [data[i]['id'], data[i]['title'], filename, data[i]['ranking'], data[i]['description']]
                                    doc['categories'].push(category);
                                }
                            }
                            console.log('Categories downloaded')
                            return db.put(doc);
                        });
                    }
                    else {
                        console.log('No new categories')
                    }
                }
            });
        })
    };

    $scope.getAlerts = function () {
        var db = PouchDB('momlink');
        var post_information = { 'cid': window.localStorage.getItem('cid') };
        console.log(JSON.stringify(post_information))
        $.ajax({
            url: 'https://momlink.crc.nd.edu/~jonathan/current/getAlerts.php',
            type: 'POST',
            dataType: 'json',
            data: post_information,
            async: false,
            success: function (data) {
                console.log(JSON.stringify(data))
                if (data.length > 0) {
                    db.get('alerts').then(function (doc) {
                        console.log(JSON.stringify(doc))
                        for (i in data) {
                            console.log('check')
                            //check if alert is already in local db
                            var isUnique = true;
                            for (j in doc[data[i]['tracker']]) {
                                if (data[i]['id'] == doc[data[i]['tracker']][j]['id']) {
                                    isUnique = false;
                                }
                            }
                            if (isUnique == true) {
                                doc[data[i]['tracker']].push({ "id": data[i]['id'], "type": data[i]['type'], "value": data[i]['value'], "message": data[i]['message'] })
                            }
                        }
                        console.log('alerts downloaded')
                        return db.put(doc);
                    });
                }
                else {
                    console.log('No new alerts')
                }
            }
        });
    };

    $scope.updateCareplan = function () {
        var db = PouchDB('momlink');
        var uploadGoals = [];
        db.get('careplan').then(function (doc) {
            for (i in doc['careplan']) {
                if (doc['careplan'][i]['upload'] == 0) {
                    uploadGoals.push(doc['careplan'][i])
                }
            }
        }).then(function () {
            if (uploadGoals.length > 0) {
                var post_information = {};
                post_information.goals = uploadGoals;
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/updateCareplan.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        //for each goal updated, update uploaded value to 1
                        if (data == true) {
                            db.get('careplan').then(function (doc) {
                                //set upload value so it is not reuploaded
                                for (k in uploadGoals) {
                                    for (m in doc['careplan']) {
                                        if (uploadGoals[k]['id'] == doc['careplan'][m]['id']) {
                                            doc['careplan'][m]['upload'] = '1';
                                        }
                                    }
                                }
                                console.log('Careplan updated')
                                return db.put(doc);
                            });
                        }
                    }
                });
            }
            else {
                console.log('Goals already up to date')
            }
        })
    };
    $scope.sendClickData = function () {
        var db = PouchDB('momlink');
        db.get('userData').then(function (doc) {
            if (doc['userData'].length > 0) {
                var post_information = {};
                console.log(JSON.stringify(doc['userData']))
                post_information.clickData = doc['userData'];
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/uploadClicks.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        //clear out click log
                        if (data == true) {
                            db.get('userData').then(function (doc) {
                                doc['userData'] = []
                                return db.put(doc).then(function () {
                                    console.log('userData uploaded')
                                })
                            });
                        }
                    }
                });
            }
            else {
                console.log('userData already up to date')
            }
        })
    };
    $scope.sendPushData = function () {
        var db = PouchDB('momlink');
        db.get('userData').then(function (doc) {
            if (doc['pushNotfications'].length > 0) {
                var post_information = {};
                console.log(JSON.stringify(doc['pushNotfications']))
                post_information.clickData = doc['pushNotfications'];
                post_information.cid = window.localStorage.getItem('cid');
                $.ajax({
                    url: 'https://momlink.crc.nd.edu/~jonathan/current/uploadNotifications.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { data: encodeURIComponent(JSON.stringify(post_information)) },
                    async: false,
                    success: function (data) {
                        console.log(JSON.stringify(data))
                        //clear out click log
                        if (data == true) {
                            db.get('userData').then(function (doc) {
                                doc['pushNotfications'] = []
                                return db.put(doc).then(function () {
                                    console.log('pushNotfications uploaded')
                                })
                            });
                        }
                    }
                });
            }
            else {
                console.log('userData already up to date')
            }
        })
    };

    /*
    Opens side menu navigation page
    */
    $scope.toggleRightSideMenu = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    /*
    Shows current date on the home page and history pages
    */
    $scope.renderSubheaderDate = function () {
        today = moment().format('MMMM Do YYYY');
        document.getElementById("todaysDate").innerHTML = "Today, " + today;
        var date = new Date()
        window.localStorage.setItem('currentDate', date)
    };

    $scope.renderTrackSubheaderDate = function () {
        today = moment(window.localStorage.getItem('currentDate')).format('MMMM Do YYYY');
        document.getElementById("todaysDate").innerHTML = today;
    };

    /*
    Displays todays events in the slider of the home page
    */
    $scope.renderAppointmentsHeader = function () {
        var db = PouchDB('momlink');
        //elements in todaysEvents are comprised of [time, id, category]
        var todaysEvents = []
        html = '<div class="row">'
        db.get('events').then(function (doc) {
            events = doc['events'];
            //get all events occuring today
            for (i in events) {
                if (events[i]['day'] == moment().format('YYYY-MM-DD')) {
                    startingTime = String(events[i]['start']).substr(String(events[i]['start']).indexOf("T") + 1);
                    todaysEvents.push([startingTime, events[i]['id'], events[i]['category']]);
                }
            }
            //sort todays events chronologically
            todaysEvents = sortTimes(todaysEvents)
            //build html string
            for (j in todaysEvents) {
                html += '<div class="col">';
                //todasEvents[j][0] is the time, [1] is the eventID, [2] is the event category
                html += '<img src="' + $scope.getEventImg(todaysEvents[j][2]) + '" ng-click="viewEvent(&quot;' + todaysEvents[j][1] + '&quot;, &quot;home.html&quot;, &quot;Momlink&quot;)" style="height:60%;"><br>';
                html += $scope.convert24to12(todaysEvents[j][0]) + '</div>';
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


    /*
    Takes in an event category and returns the related category image
    */
    $scope.getEventImg = function (type) {
        switch (type) {
            case '1':
                return '../img/eventCategories/obAppt.png';
            case '2':
                return '../img/eventCategories/lab.png';
            case '3':
                return '../img/eventCategories/referral.png';
            case '4':
                return '../img/eventCategories/pncc.png';
            case '5':
                return '../img/eventCategories/ultra.png';
            case '6':
                return '../img/eventCategories/class.png';
            case '7':
                return '../img/mainIcons/momlink_icon-19.png';
        }
    };


    /*
    Displays unread articles in the slider of the home page
    */
    var cycleHandler;
    $scope.renderArticlesHeader = function () {
        //if function is already running, stop the previous instance before starting a new one
        if (angular.isDefined(cycleHandler)) {
            console.log('check')
            $interval.cancel(cycleHandler)
            cycleHandler = undefined;
        }
        var db = PouchDB('momlink');
        cycle = 0;
        db.get('articles').then(function (doc) {
            articles = doc['shared'];
            if (articles.length == 0) {
                html = '<div class="row; centerVH;"><br>No New Articles</div>';
                $('#articlesHeader').html(html);
                $compile($('#articlesHeader'))($scope);
            }
            else {
                renderHeaderArticle = function () {
                    articleHtml = '<div class="row centerWhite" ng-controller="EducationCtrl">';
                    var img = $scope.getCategoryImg(articles[cycle]['category']);
                    articleHtml += '<div class="col-15" align="left"><img src="' + img + '" style="height:60%;"></div>';
                    articleHtml += '<div class="col no-padding" align="left">';
                    articleHtml += '<p>' + articles[cycle]['title'] + '</p>'
                    if (articles[cycle]['description'] != '' && articles[cycle]['description'] != null) {
                        articleHtml += '<span style="display: inline-block; max-height:75%; overflow:hidden">' + articles[cycle]['description'] + '</span>';
                        articleHtml += '<br/>'
                    }
                    articleHtml += '<button class="button button-small button-stable" ng-click="openArticle(&quot;shared&quot;,&quot;' + String(articles[cycle]['id']) + '&quot;,&quot;' + articles[cycle]['category'] + '&quot;)">Read More</button>&nbsp;';
                    articleHtml += '</div></div>';
                    $('#articlesHeader').fadeOut("slow", function () {
                        $('#articlesHeader').html(articleHtml);
                        $compile($('#articlesHeader'))($scope);
                        $('#articlesHeader').fadeIn("slow");
                    });
                    //reset to the beginning of the set of articles
                    if (cycle == (articles.length - 1)) {
                        cycle = 0;
                    }
                    else {
                        cycle++;
                    }
                }
                renderHeaderArticle();
                cycleHandler = $interval(function () {
                    renderHeaderArticle();
                }, 9000);
            }
        })
    };
    $scope.getCategoryImg = function (type) {
        switch (type) {
            case 'Safe Sleep':
                return '../img/topics/sleep_big.png';
            case 'Safety':
                return '../img/formats/baby-proof-home.png';
            case 'HUGS':
                return '../img/topics/HUGS.jpg';
            case 'Nutrition':
                return '../img/formats/Nutrition.png';
            case 'First Time Moms':
                return '../img/topics/firstimemoms.jpg';
            case 'Parenting':
                return '../img/formats/WCC_south bend.jpg';
            case 'Abstinence':
                return '../img/topics/abstinence.jpg';
            case 'Anticipatory Guidance':
                return '../img/formats/nesting.jpg';
            case 'Breastfeeding':
                return '../img/topics/breastfeeding.jpg';
            case 'Child Abuse':
                return '../img/topics/childabuse.jpg';
            case 'Community Resources':
                return '../img/topics/communityresources.jpeg';
            case 'Coping Skills':
                return '../img/topics/coping.jpg';
            case 'Dental Health':
                return '../img/topics/dentalhealth copy.jpg';
            case 'Domestic Violence':
                return '../img/topics/domesticviolence.jpg';
            case 'HIV Risks':
                return '../img/topics/hivrisk.png';
            case 'Family Planning':
                return '../img/topics/familyplanning.jpg';
            case 'Financial Planning':
                return '../img/topics/financialplanning.jpg';
            case 'Drug Cessation':
                return '../img/topics/drugcessation.jpg';
            case 'General Advice':
                return '../img/topics/unnamed-chunk-5-1.png';
            case 'Prenatal Care':
                return '../img/topics/prenatalcare.jpg';
            case 'Prenatal Weight':
                return '../img/topics/prenatalweight.jpg';
            case 'Baby Growth':
                return '../img/topics/babygrowth.png';
            case 'Labor and Delivery':
                return '../img/topics/labor-delivery.jpg';
            case 'Managing Pregnancy Discomforts':
                return '../img/topics/pregdiscomforts.jpg';
            case 'Health Care':
                return '../img/topics/healthcare.jpg';
            case 'Infant Stimulation':
                return '../img/topics/infantstimulation.jpg';
            case 'Infant Feeding':
                return '../img/topics/infantfeeding.jpg';
        }
    };


    /*
    Back button handler, keeps a queue of pages to trace back through
    empties the stack whenever the homepage is visited
    */
    pageHistory = [];
    $scope.backButtonListener = function () {
        document.addEventListener("backbutton", function (event) {
            //if the homepage is the current page the app is closed
            if ($('#headline').html() == 'Momlink') {
                navigator.app.exitApp();
            }
            else {
                $scope.clickTracker('backButton');
                lastPage = pageHistory.pop();
                headline = lastPage[0];
                page = lastPage[1];
                $scope.toNewPage(page, headline, true)
                navigator.app.preventDefault();
            }
        }, false);
    };


    //need to explicity state 'home' is the first page in the stack
    var currentPage = 'home.html';
    /*
    Uses ajax to empty the contents of the 'content' div in the main page and repopulate with different html page
    nextPage: destination html
    nextHeadline: name used to populate the headline or title field of the new page
    history: indicates whether the page is a new page or one in history
    */
    $scope.toNewPage = function (nextPage, nextHeadline, history) {
        //prevents adding pages to history when using the back button to avoid an infinite cycle
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

    /*
    Tracks behavior by saving the function executed whenever the
    user clicks a button
    */
    $scope.clickListener = function () {
        var db = PouchDB('momlink');
        document.addEventListener("click", function myListener(event) {
            clickFunction = event.target.getAttribute("ng-click");
            if (clickFunction != null && clickFunction != '$buttonTapped(button, $event)') {
                //grab modal headline first, if that doesn't exist then grab page headline
                if ($('#modalHeadline').html() != null) {
                    currentPage = $('#modalHeadline').html();
                }
                else {
                    currentPage = $('#headline').html();
                }
                db.get('userData').then(function (doc) {
                    date = moment().format('YYYY/MM/DD');
                    time = moment().format('HH:mm:ss');
                    console.log([currentPage, clickFunction, date, time]);
                    doc['userData'].push([currentPage, clickFunction, date, time])
                    return db.put(doc);
                })
            }
        }, false);
    };

    /*
    Not all functions are caught by the click listener, therefore clickTracker is a 
    manual way of ensuring all user behaviors are tracked
    */
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

    /*
    Saves the users login data if they have already logged in, an auto login will not
    occur if the user has logged out of the app the last time they used it
    */
    $scope.autoLogin = function () {
        document.addEventListener("deviceready", function () {
            if (window.localStorage.getItem('username') != null && window.localStorage.getItem('password') != null) {
                window.localStorage.setItem('currentPage', 'home.html')
                window.location = "templates/main.html";
            }
            else {
                //add this in to remove white flash (if it occurs)
                //$(window).bind("load", function () {
                navigator.splashscreen.hide()
                //});
            }
        });
    };

    $scope.pushListener = function () {
        document.addEventListener("deviceready", function () {
            FCMPlugin.onNotification(function (data) {
                console.log(JSON.stringify(data))
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user.
                    $scope.pushTracker(data.title, data.body)
                    $ionicPopup.alert({
                        title: data.title,
                        template: data.body
                    });
                } else {
                    //Notification was received while the app was in the foreground.
                    $ionicPopup.alert({
                        title: data.title,
                        template: data.body
                    });
                }
            });
        });
    };

    $scope.pushTracker = function (title, body) {
        var db = PouchDB('momlink');
        db.get('userData').then(function (doc) {
            date = moment().format('YYYY/MM/DD'),
            time = moment().format('HH:mm:ss'),
            doc['pushNotfications'].push([title, body, date, time])
            return db.put(doc);
        })
    };

    /*
    Renders badges (numerical notifications) on the homepage
    */
    $scope.renderBadges = function () {
        var db = PouchDB('momlink');
        var countSurveys = 0;
        var countArticles = 0;
        var countMessages = 0;
        var countReferrals = 0;
        var countEvents = 0;
        //Survey Badge, number of surveys not taken
        db.get('surveys').then(function (doc) {
            for (i in doc['surveys']) {
                if (doc['surveys'][i]['dateTaken'] == '') {
                    countSurveys++;
                }
            }
            if (countSurveys > 0) {
                html = '<img src="../img/mainIcons/momlink_icon-19.png" ng-click="toNewPage(&quot;survey.html&quot;, &quot;Survey&quot;)" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">' + countSurveys + '</span><p>Survey</p>';
                $('#survey').html(html);
                $compile($('#survey'))($scope);
            }
        }).then(function (doc) {
            //Education Badge, number of articles unread
            db.get('articles').then(function (doc) {
                for (i in doc['shared']) {
                    if (doc['shared'][i]['lastRead'] == '') {
                        countArticles++;
                    }
                }
                if (countArticles > 0) {
                    html = '<img src="../img/mainIcons/momlink_icon-21.png" ng-click="toNewPage(&quot;education.html&quot;, &quot;Education&quot;)" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">' + countArticles + '</span><p>Education</p>';
                    $('#education').html(html);
                    $compile($('#education'))($scope);
                }
            });
        }).then(function () {
            //Referrals Badge, number of referrals not scheduled for a meeting
            db.get('referrals').then(function (doc) {
                for (i in doc['referrals']) {
                    if (doc['referrals'][i]['meeting'] == '') {
                        countReferrals++;
                    }
                }
                if (countReferrals > 0) {
                    html = '<img src="../img/mainIcons/momlink_icon-18.png" ng-click="toNewPage(&quot;referrals.html&quot;, &quot;Referrals&quot;)" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">' + countReferrals + '</span><p>Referrals</p>';
                    $('#referrals').html(html);
                    $compile($('#referrals'))($scope);
                }
            })
        }).then(function (doc) {
            //Calendar Badge, number of new events not viewed
            db.get('events').then(function (doc) {
                for (i in doc['events']) {
                    if (doc['events'][i]['viewed'] == '0') {
                        countEvents++;
                    }
                }
                if (countEvents > 0) {
                    html = '<img src="../img/mainIcons/momlink_icon-17.png" ng-click="toNewPage(&quot;calendar.html&quot;, &quot;Calendar&quot;)" style="max-width:100%;height:auto;vertical-align:middle"><span class="badge badge-positive topRightBadge">' + countEvents + '</span><p>Calendar</p>';
                    $('#calendar').html(html);
                    $compile($('#calendar'))($scope);
                }
            })
        }).then(function (doc) {
            //Inbox Badge, number of unread message
            //leave commented out when debugging, causes problems in the ripple emulator, but works when debugging on a device
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

    /*
    Removes the splash screen only after the main page has loaded
    */
    $scope.removeSplash = function () {
        document.addEventListener("deviceready", function () {
            navigator.splashscreen.hide()
        });
    };

    /*
    Checks the username and password against those in the login table
    */
    $scope.login = function (user, pass) {
        var db = PouchDB('momlink');
        db.get('login').then(function (doc) {
            //check if first-time user
            if (doc['client_id'] == "") {
                var networkState = navigator.connection.type;
                if (networkState == Connection.NONE) {
                    //alert must be connected to wifi
                    $ionicPopup.alert({
                        title: 'Please connect to WiFi before first-time login',
                    });
                }
                else {
                    //create all local databases here//
                    //get token for push notifications
                    document.addEventListener("deviceready", function () {
                        FCMPlugin.getToken(function (token) {
                            // save this server-side and use it to push notifications to this device
                            var post_information = { 'username': user, 'password': pass, 'token': token };
                            console.log(JSON.stringify(post_information))
                            $.ajax({
                                url: 'https://momlink.crc.nd.edu/~jonathan/current/firstTimeLogin.php',
                                type: 'POST',
                                dataType: 'json',
                                data: post_information,
                                success: function (data) {
                                    console.log(JSON.stringify(data))
                                    if (data[0]['success'] != 0) {
                                        doc['client_id'] = data[1]['client_id']
                                        doc['agency'] = data[1]['agency']
                                        doc['pncc_id'] = data[1]['pncc_id']
                                        doc['triage_level'] = data[1]['triage_level']
                                        doc['sec_question'] = data[1]['sec_question']
                                        doc['username'] = user;
                                        doc['password'] = pass;
                                        window.localStorage.setItem('cid', data[1]['client_id'])
                                        window.localStorage.setItem('username', user)
                                        window.localStorage.setItem('password', pass)
                                        return db.put(doc).then(function () {
                                            window.location = "templates/main.html";
                                        })
                                    }
                                    else {
                                        $ionicPopup.alert({
                                            title: 'Invalid Username/Password',
                                            subTitle: 'Usernames and passwords are case sensitive'
                                        });
                                    }
                                }
                            });
                        }, function (error) {
                            $ionicPopup.alert({
                                title: 'Error Generating FCM Token',
                                subTitle: error
                            });
                        });
                    });
                }
            }
            else {
                if (user == doc['username'] && pass == doc['password']) {
                    //save username and password for autologin
                    window.localStorage.setItem('username', doc['username'])
                    window.localStorage.setItem('password', doc['password'])
                    window.location = "templates/main.html";
                }
                else {
                    $ionicPopup.alert({
                        title: 'Invalid Username/Password',
                        subTitle: 'Usernames and passwords are case sensitive'
                    });
                }
            }
        });
    };

    /*
    Logs the user out and removes all local storage variables
    User must log in manually on next app visit
    */
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

    /*
    Renders the users security question
    */
    $scope.renderSecQuestion = function () {
        var db = PouchDB('momlink');
        var html;
        //check if any classes have been completed
        db.get('login').then(function (doc) {
            html = doc['sec_question']
        }).then(function () {
            $('#secQuestion').html(html);
            $compile($('#secQuestion'))($scope);
        });
    }

    /*
    Checks security question answer
    */
    $scope.checkSecQuestion = function () {
        var db = PouchDB('momlink');
        var client_id = '';
        var post_information;

        db.get('login').then(function (doc) {
            client_id = doc['client_id'];
            ans = $('#secAnswer').val();
            post_information = { 'ans': escape(ans), 'cid': escape(client_id) };
        }).then(function () {
            $.ajax({
                url: 'https://momlink.crc.nd.edu/~jonathan/current/forgotPassword.php',
                type: 'POST',
                dataType: 'json',
                data: post_information,
                success: function (data) {
                    if (data[0]['success'] != 0) {
                        //success, allow local password to be rewritten
                        console.log('success')
                        $ionicPopup.show({
                            template: '<input id="newpass" type="text">',
                            title: 'Enter Your New Password',
                            scope: $scope,
                            buttons: [
                              { text: 'Cancel' },
                              {
                                  text: '<b>Save</b>',
                                  type: 'button-positive',
                                  onTap: function (e) {
                                      db.get('login').then(function (doc) {
                                          doc['password'] = $('#newpass').val();
                                          return db.put(doc);
                                      }).then(function () {
                                          var alertPopup = $ionicPopup.alert({
                                              title: 'Password Updated Successfully',
                                          });
                                          alertPopup.then(function (res) {
                                              window.location = "templates/main.html";
                                          });
                                      });
                                  }
                              }
                            ]
                        });
                    }
                    else {
                        $ionicPopup.alert({
                            title: 'Invalid Response',
                            subTitle: 'That answer is incorret'
                        });
                    }
                }
            });

        })
    }

    /*
    History page is used by all trackers expect nutrtion, therefore, trackType
    variable needs to be set to tell the history page which data to pull
    */
    $scope.goToHistory = function (type) {
        $scope.trackType = type;
        if (type == 'addNutrition') {
            $scope.toNewPage('addNutrition.html', 'Nutrition')
        }
        else if (type == 'addPills') {
            $scope.toNewPage('history.html', "Today's Pills")
        }
        else {
            $scope.toNewPage('history.html', 'History')
        }
    };

    /*
    Opens a modal for the appropriate tracker from the history page
    */
    $scope.goToAddEvent = function () {
        window.localStorage.setItem('currentPage', $scope.trackType + ".html");
        console.log()
        $scope.modal = $ionicModal.fromTemplateUrl($scope.trackType + ".html", {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
            //add kicks loads dynamic content
            if ($scope.trackType == 'addKicks') {
                $scope.renderKicks()
            }
        })
    };
    $scope.renderKicks = function () {
        var kcHtml = '';
        if ($scope.kicks == null) {
            //render default page
            kcHtml += '<div class="row"><div class="col text-center">';
            kcHtml += '<p class="trackingText">Start Timer</p>';
            kcHtml += '</div></div>';
            kcHtml += '<div class="row padding"><div class="col text-center">';
            kcHtml += '<img type="button" src="../img/trackers/kicks.png" id="plus" ng-click="startKickCounter()" style="width:115px;height:115px;">';
            kcHtml += '</div></div>';
        }
        if ($scope.kicks > 0) {
            kcHtml += '<div class="row"><div class="col text-center">';
            kcHtml += '<p id="kickCounter" class="trackingText">' + String($scope.kicks + ' Kicks') + '</p>';
            kcHtml += '</div></div>';
            kcHtml += '<div class="row padding"><div class="col text-center">';
            kcHtml += '<img type="button" src="../img/temp/plus.png" id="plus" ng-click="increaseKickCounter()" style="width:115px;height:115px;">';
            kcHtml += '</div></div>';
            //cancel
            kcHtml += '<div class="row padding">';
            kcHtml += '<div class="col text-center">';
            kcHtml += '<input type="button" class="button button-block button-stable" value="CANCEL" ng-click="cancelKickCounter()">';
            kcHtml += '</div>';
            kcHtml += '</div>';
        }
        $('#kicks').html(kcHtml);
        $compile($('#kicks'))($scope);
    }
    $scope.startKickCounter = function () {
        navigator.vibrate(100);
        var kcHtml = '';
        $scope.kicksStart = new moment();
        $scope.kicks = 1;
        kcHtml += '<div class="row"><div class="col text-center">';
        kcHtml += '<p id="kickCounter" class="trackingText">1 Kick</p>';
        kcHtml += '</div></div>';
        kcHtml += '<div class="row padding"><div class="col text-center">';
        kcHtml += '<img type="button" src="../img/temp/plus.png" id="plus" ng-click="increaseKickCounter()" style="width:115px;height:115px;">';
        kcHtml += '</div></div>';
        //cancel
        kcHtml += '<div class="row padding">';
        kcHtml += '<div class="col text-center">';
        kcHtml += '<input type="button" class="button button-block button-stable" value="CANCEL" ng-click="cancelKickCounter()">';
        kcHtml += '</div>';
        kcHtml += '</div>';
        $('#kicks').html(kcHtml);
        $compile($('#kicks'))($scope);
    }
    $scope.increaseKickCounter = function () {
        navigator.vibrate(100);
        $scope.kicks++;
        if ($scope.kicks == 10) {
            var db = PouchDB('momlink');
            $scope.kicksEnd = new moment();
            difference = moment.duration(moment($scope.kicksEnd).diff(moment($scope.kicksStart)));
            length = pad(difference.hours()) + ':' + pad(difference.minutes()) + ':' + pad(difference.seconds());
            function pad(n) {
                return (n < 10) ? ("0" + n) : n;
            }
            db.get('track').then(function (doc) {
                var element = {
                    "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                    "date": moment($scope.kicksStart).format('YYYY/MM/DD'),
                    "time": moment().format('HH:mm:ss'),
                    "start": moment($scope.kicksStart).format('HH:mm:ss'),
                    "end": moment($scope.kicksEnd).format('HH:mm:ss'),
                    "value": length
                };
                doc['kicks'].push(element);
                return db.put(doc).then(function () {
                    delete $scope.kicks;
                    delete $scope.kicksStart;
                    delete $scope.kicksEnd;
                    $ionicPopup.alert({
                        title: 'Kick Count Complete!',
                    });
                    $scope.toNewPage('history.html', 'History');
                    $scope.closeModal();
                })
            });
        }
        else {
            $('#kickCounter').html(String($scope.kicks + ' Kicks'));
        }
    }
    $scope.cancelKickCounter = function () {
        delete $scope.kicks;
        delete $scope.kicksStart;
        var kcHtml = '';
        //render default page
        kcHtml += '<div class="row"><div class="col text-center">';
        kcHtml += '<p class="trackingText">Start Timer</p>';
        kcHtml += '</div></div>';
        kcHtml += '<div class="row padding"><div class="col text-center">';
        kcHtml += '<img type="button" src="../img/trackers/kicks.png" id="plus" ng-click="startKickCounter()" style="width:115px;height:115px;">';
        kcHtml += '</div></div>';
        $('#kicks').html(kcHtml);
        $compile($('#kicks'))($scope);
    }

    /*
    Tracking activities requires 2 pages: selecting the activity, and the amount of
    time spent doing that activity
    Keeps track of which activity was selected and generates the page for adding
    amount of time spent doing the activity
    */
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

    $scope.goToAddPill = function () {
        window.localStorage.setItem('currentPage', 'addNewPill.html');
        $.ajax({
            url: 'addNewPill.html',
            success: function (data) {
                $('#listPills').html(data);
                $compile($('#listPills'))($scope);
            }
        });
    };

    $scope.goToEditPill = function (pillID) {
        $scope.pillID = pillID;
        window.localStorage.setItem('currentPage', 'editPill.html');
        $.ajax({
            url: 'editPill.html',
            success: function (data) {
                $('#listPills').html(data);
                $compile($('#listPills'))($scope);
            }
        });
    };

    /*
    If the contact has provided their email address and phone number, 
    the user will get the option to text, call, or email
    If the contact provides only one of these, the user will only get the
    associated option
    If contact provides no information, the function will return the contact
    has provided no information
    */
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

    /*
    Opens the modal for creating events
    */
    $scope.createEvent = function (link, title, date) {
        //scope variables are used to return to the proper page after the event is created
        $scope.returnLink = link;
        $scope.returnTitle = title;
        if (date != null) {
            $scope.date = date;
        }
        $scope.modal = $ionicModal.fromTemplateUrl('eventModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    }

    /*
    Saves event to the db
    */
    $scope.saveEvent = function () {
        var db = PouchDB('momlink');
        var id = moment().format('MM-DD-YYYYThh:mm:ssa');
        start = $('#date').val() + "T" + $('#start').val();
        end = $('#date').val() + "T" + $('#end').val();
        var share = 0;
        if ($("input[name=share]:checked").val() == 1) {
            share = 1;
        }
        var reminder = 0;
        if ($("input[name=reminder]:checked").val() == 1) {
            reminder = 1;
        }
        //set reminder
        if (reminder == 1) {
            console.log(start)
            reminderTime = moment(start, "YYYY-MM-DDTHH:mm:ssZ").subtract($('#minsBefore').val(), 'minutes').toDate();
            console.log(reminderTime)
            timerID = $scope.decodeReminder(id);
            reminderText = String('Today at ' + $scope.convert24to12($scope.parseTime(start)));
            cordova.plugins.notification.local.schedule({
                id: timerID,
                title: String($('#title').val()),
                text: reminderText,
                at: reminderTime
            });
        }
        var questions = [];
        $("input[name=Q]:checked").each(function () {
            questions.push($(this).val())
        });
        db.get('events').then(function (doc) {
            $scope.eventID = id;
            //code event category
            console.log($('#minsBefore').val())
            var category;
            switch ($("#type").val()) {
                case 'OB Appt':
                    category = '1';
                    break;
                case 'Lab':
                    category = '2';
                    break;
                case 'Referral':
                    category = '3';
                    break;
                case 'PNCC':
                    category = '4';
                    break;
                case 'Ultra':
                    category = '5';
                    break;
                case 'Class':
                    category = '6';
                    break;
                case 'Other':
                    category = '7';
                    break;
            }
            var event = {
                "id": id,
                "title": $('#title').val(),
                "category": category,
                "day": $('#date').val(),
                "start": start,
                "end": end,
                "venue": $('#venue').val(),
                "share": share,
                "reminder": reminder,
                "minsBefore": $('#minsBefore').val(),
                "upload": "0",
                "description": $('#description').val(),
                "questions": questions,
                "color": $scope.getColor($('#type').val()),
                "viewed": '1',
                "scheduledBy": '0'
            };
            doc['events'].push(event);
            return db.put(doc);
        }).then(function (doc) {
            //if the event is for a referral, tie the referral to the event in the db
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
                    //doc['referrals'][i]['referral_status'] = 1;
                    return db.put(doc);
                }).then(function (doc) {
                    $scope.toNewPage('referrals.html', 'Referrals');
                    $scope.closeModal();
                    window.localStorage.removeItem('referralID')
                });
            }
                /*else if ($scope.returnTitle == 'Goals') {
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
                }*/
            else {
                $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                delete $scope.returnLink;
                delete $scope.returnTitle;
                $scope.closeModal();
            }
        });
    }

    /*
    View event given an eventID
    link and title are passed into editEvent if called
    */
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
            //decode category
            templateHTML = '<p><b>' + $scope.decodeCategory(doc['events'][i]['category']) + '</b></p>';
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
            //view event, do not allow editing if created by PNCC
            if (doc['events'][i].scheduledBy > 0) {
                $ionicPopup.show({
                    title: doc['events'][i]['title'],
                    template: templateHTML,
                    buttons: [
                      {
                          text: 'Close', onTap: function (e) {
                              $scope.clickTracker('closeEvent');
                              return 'Cancel';
                          },
                          type: 'button-positive'
                      }
                    ],
                });
            }
            else {
                $ionicPopup.show({
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
            }
            doc['events'][i]['viewed'] = '1';
            return db.put(doc);
        });
    }


    /*
    Opens the modal for editing events
    */
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


    /*
    Populates the edit event modal with the events data
    */
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
            $('#type').val($scope.decodeCategory(doc['events'][i]['category']));
            document.getElementById($scope.decodeCategory(doc['events'][i]['category'])).classList.add('activeBorder');
            $('#date').val(doc['events'][i]['day']);
            $('#start').val($scope.parseTime(doc['events'][i]['start']));
            $('#end').val($scope.parseTime(doc['events'][i]['end']));
            $('#venue').val(doc['events'][i]['venue']);
            $('#description').val(doc['events'][i]['description']);
            $('#minsBefore').val(doc['events'][i]['minsBefore']);
            //populate all current questiions
            /*for (j in doc['events'][i]['questions']) {
                console.log(doc['events'][i]['questions'][j])
            }*/
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

    /*
    If a date in calendar is clicked, the date field will be automatically populated
    */
    $scope.pullDate = function () {
        if ($scope.date != 'null') {
            //jquery won't work unless the db call is wrapped around it, look into later
            var db = PouchDB('momlink');
            db.get('events').then(function (doc) {
                $('#date').val($scope.date);
            });
        }
    }

    /*
    Updates db with new/changed data
    */
    $scope.updateEvent = function () {
        var db = PouchDB('momlink');
        start = $('#date').val() + "T" + $('#start').val();
        end = $('#date').val() + "T" + $('#end').val();
        var share = 0;
        if ($("input[name=share]:checked").val() == 1) {
            share = 1;
        }
        var reminder = 0;
        if ($("input[name=reminder]:checked").val() == 1) {
            reminder = 1;
        }
        //since we can't tell if the event already had a reminder, we need to cancel the previous
        //reminder if it existed and schedule a new one
        timerID = $scope.decodeReminder($scope.eventID);
        if (reminder == 1) {
            reminderText = String('Today at ' + $scope.convert24to12($scope.parseTime(start)));
            reminderTime = moment(start, "YYYY-MM-DDTHH:mm:ssZ").subtract($('#minsBefore').val(), 'minutes').toDate();
            //cancel previous event
            cordova.plugins.notification.local.cancel(timerID, function () {
                // Notification was cancelled
            });
            //set new event
            cordova.plugins.notification.local.schedule({
                id: timerID,
                title: String($('#title').val()),
                text: reminderText,
                at: reminderTime
            });
        }
        //cancel reminder if it existed
        if (reminder == 0) {
            cordova.plugins.notification.local.cancel(timerID, function () {
                // Notification was cancelled
            });
        }
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
            //code event category
            var category;
            switch ($("#type").val()) {
                case 'OB Appt':
                    category = '1';
                    break;
                case 'Lab':
                    category = '2';
                    break;
                case 'Referral':
                    category = '3';
                    break;
                case 'PNCC':
                    category = '4';
                    break;
                case 'Ultra':
                    category = '5';
                    break;
                case 'Class':
                    category = '6';
                    break;
                case 'Other':
                    category = '7';
                    break;
            }
            doc['events'][i]['title'] = $('#title').val();
            doc['events'][i]['category'] = category;
            doc['events'][i]['day'] = $('#date').val();
            doc['events'][i]['start'] = start;
            doc['events'][i]['end'] = end;
            doc['events'][i]['venue'] = $('#venue').val();
            doc['events'][i]['share'] = share;
            doc['events'][i]['reminder'] = reminder;
            doc['events'][i]['minsBefore'] = $('#minsBefore').val();
            //signal to server that event has been modified
            if (share == '1' && doc['events'][i]['upload'] == '1') {
                doc['events'][i]['upload'] = '2';
            }
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


    /*
    Removes event from db
    */
    $scope.deleteEvent = function () {
        var db = PouchDB('momlink');
        timerID = $scope.decodeReminder($scope.eventID);
        cordova.plugins.notification.local.cancel(timerID, function () {
            // Notification was cancelled
        });
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
                if ($scope.returnLink != '' && $scope.returnTitle != '') {
                    $scope.toNewPage($scope.returnLink, $scope.returnTitle)
                    delete $scope.returnLink;
                    delete $scope.returnTitle;
                }
                $scope.closeModal();
            })
        })
    };

    $scope.checkReferrals = function () {
        var db = PouchDB('momlink');
        var followups = []
        //get referrals to check
        db.get('referrals').then(function (doc) {
            for (i in doc['referrals']) {
                if (doc['referrals'][i]['referral_status'] == '') {
                    followups.push(doc['referrals'][i])
                }
            }
        }).then(function () {
            var x = 0;
            var loopReferrals = function (arr) {
                console.log(JSON.stringify(arr))
                checkReferral(arr[x], function () {
                    x++;
                    if (x < arr.length) {
                        loopReferrals(arr);
                    }
                    else {
                        console.log('finished!')
                    }
                });
            }
            function checkReferral(referral, callback) {
                //meeting has been setup with referral
                if (referral['meeting'] != '') {
                    var meetDay = '';
                    db.get('events').then(function (doc) {
                        for (j in doc['events']) {
                            if (doc['events'][j]['id'] == referral['meeting']) {
                                meetDay = moment(doc['events'][j]['day']);
                                break;
                            }
                        }
                    })
                    //check if event has passed
                    if (meetDay < moment()) {
                        //ask if they attended the event
                        $ionicPopup.show({
                            title: 'Did you meet with ' + referral['name'] + '?',
                            scope: $scope,
                            buttons: [
                              {
                                  text: 'Yes',
                                  type: 'button-stable',
                                  onTap: function (e) {
                                      db.get('referrals').then(function (doc) {
                                          for (k in doc['referrals']) {
                                              if (doc['referrals'][k]['id'] == referral['id']) {
                                                  console.log('hit')
                                                  break;
                                              }
                                          }
                                          console.log('continue')
                                          console.log(doc['referrals'][k]['referral_status'])
                                          console.log(doc['referrals'][k]['upload'])
                                          doc['referrals'][k]['referral_status'] = '1'
                                          doc['referrals'][k]['upload'] = '0'
                                          return db.put(doc).then(function () {
                                              callback();
                                          })
                                      })
                                  }
                              },
                              {
                                  text: 'No',
                                  type: 'button-stable',
                                  onTap: function (e) {
                                      db.get('referrals').then(function (doc) {
                                          for (k in doc['referrals']) {
                                              if (doc['referrals'][k]['id'] == referral['id']) {
                                                  console.log('hit')
                                                  break;
                                              }
                                          }
                                          console.log('continue')
                                          console.log(doc['referrals'][k]['referral_status'])
                                          console.log(doc['referrals'][k]['upload'])
                                          doc['referrals'][k]['referral_status'] = '0'
                                          doc['referrals'][k]['upload'] = '0'
                                          return db.put(doc).then(function () {
                                              callback();
                                          })
                                      })
                                  }
                              },
                            ]
                        });
                    }
                }
                else {
                    //check if 3 days have passed
                    if (moment(referral['date']).diff(moment(), 'days') <= -3) {
                        $ionicPopup.show({
                            title: 'Did you follow-up with ' + referral['name'] + '?',
                            scope: $scope,
                            buttons: [
                              {
                                  text: 'Yes',
                                  type: 'button-stable',
                                  onTap: function (e) {
                                      db.get('referrals').then(function (doc) {
                                          for (k in doc['referrals']) {
                                              if (doc['referrals'][k]['id'] == referral['id']) {
                                                  break;
                                              }
                                          }
                                          doc['referrals'][k]['referral_status'] = '1'
                                          doc['referrals'][k]['upload'] = '0'
                                          return db.put(doc).then(function () {
                                              callback();
                                          })
                                      })
                                  }
                              },
                              {
                                  text: 'No',
                                  type: 'button-stable',
                                  onTap: function (e) {
                                      db.get('referrals').then(function (doc) {
                                          for (k in doc['referrals']) {
                                              if (doc['referrals'][k]['id'] == referral['id']) {
                                                  break;
                                              }
                                          }
                                          doc['referrals'][k]['referral_status'] = '0'
                                          doc['referrals'][k]['upload'] = '0'
                                          return db.put(doc).then(function () {
                                              callback();
                                          })
                                      })
                                  }
                              },
                            ]
                        });
                    }
                }
            }
            loopReferrals(followups)
        })
    };

    $scope.checkQuizzes = function () {
        var db = PouchDB('momlink');
        db.get('articles').then(function (doc) {
            var x = 0;
            var loopQuizzes = function (arr) {
                //console.log(JSON.stringify(arr))
                checkQuiz(arr[x], function () {
                    x++;
                    if (x < arr.length) {
                        loopQuizzes(arr);
                    }
                    else {
                        console.log('finished!')
                    }
                });
            }
            function checkQuiz(article, callback) {
                quizTaken = moment(article['lastAttempt']);
                if (article['quiz'].length > 0 && article['lastAttempt'] != '' && quizTaken.add(14, 'days') < moment() && article['quizFollowup'] == '0') {
                    console.log(JSON.stringify(article))
                    //show popup and take quiz
                    $ionicPopup.show({
                        title: 'Check-up Quiz',
                        scope: $scope,
                        buttons: [
                          {
                              text: 'Ok',
                              type: 'button-stable',
                              onTap: function (e) {
                                  //show quiz
                                  var html = '<div ng-controller="HeaderCtrl">';
                                  quiz = article['quiz'];
                                  for (j in quiz) {
                                      question = quiz[j][0];
                                      answers = quiz[j][1];
                                      //render question
                                      html += '<div class="item item-text-wrap item-divider item-icon-right">' + question + '<i class="icon ion-volume-medium" ng-click="speak(&quot;' + question + '&quot;)"></i></div>';
                                      //render answers
                                      html += '<form id="' + String(j) + '">'
                                      html += '<ion-list>'
                                      for (k = 0; k < answers.length; k++) {
                                          answer = quiz[j][1][k][0];
                                          answerID = quiz[j][1][k][1];
                                          html += '<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="' + String(j) + '" value="' + String(answerID) + '">' + answer + '</ion-radio><button class="col icon ion-volume-medium" ng-click="speak(&quot;' + answer + '&quot;)"></button></div>';
                                      }
                                      html += '</ion-list>'
                                      html += '</form>'
                                      //render follow-up
                                      html += '<div class="item item-text-wrap item-divider item-icon-right">Please indicate how certain you are about the correctness of your response<i class="icon ion-volume-medium" ng-click="speak(&quot;Please indicate how certain you are about the correctness of your response&quot;)"></i></div>';
                                      //render follow-up answers
                                      html += '<form id="C' + String(j) + '">'
                                      html += '<ion-list>'
                                      responses = ['Highly uncertain', 'Uncertain', 'Somewhat uncertain', 'Neutral', 'Somewhat certain', 'Certain', 'Highly certain']
                                      for (m in responses) {
                                          answer = responses[m];
                                          html += '<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="C' + String(j) + '" value="' + String(answer) + '">' + answer + '</ion-radio><button class="col icon ion-volume-medium" ng-click="speak(&quot;' + answer + '&quot;)"></button></div>';
                                      }
                                      html += '</ion-list>';
                                      html += '</form>';
                                      html += '</div>';
                                  };
                                  $ionicPopup.show({
                                      title: 'Quiz',
                                      template: html,
                                      buttons: [
                                  {
                                      text: 'Grade', onTap: function (e) {
                                          //score the quiz
                                          var score = 0;
                                          var finalScore;
                                          var maxScore;
                                          var usersAnswers = [];
                                          quiz = article['quiz'];
                                          for (j in quiz) {
                                              selectedAnswer = $('input[name="' + String(j) + '"]:checked', '#'.concat(j)).val();
                                              confidenceAnswer = $('input[name="C' + String(j) + '"]:checked', '#C'.concat(j)).val();
                                              correctAnswer = quiz[j][1][quiz[j][2]];
                                              questionID = quiz[j][3];
                                              if (selectedAnswer == correctAnswer) {
                                                  usersAnswers.push([selectedAnswer, 1, confidenceAnswer, questionID]);
                                                  score++;
                                              }
                                              else {
                                                  usersAnswers.push([selectedAnswer, 0, confidenceAnswer, questionID]);
                                              }
                                          }
                                          finalScore = score;
                                          maxScore = quiz.length;
                                          //check if new score is best score
                                          var bestScore = 0;
                                          if (parseInt(article['bestScore']) < score) {
                                              article['bestScore'] = String(score);
                                          }
                                          //also need to record answers selected, prequiz value of 1 means the quiz was a prequiz
                                          db.get('articles').then(function (doc) {
                                              for (k in doc['articles']) {
                                                  if (doc['articles'][k]['id'] == article['id']) {
                                                      break;
                                                  }
                                              }
                                              doc['articles'][k]['quizAttempts'] = String(parseInt(article['quizAttempts']) + 1)
                                              //2 indicates a follow-up quiz
                                              doc['articles'][k]['quizHistory'][String(moment().format('YYYY-MM-DDTHH:mm:ss'))] = [finalScore, maxScore, usersAnswers, 2];
                                              doc['articles'][k]['lastAttempt'] = String(moment().format('YYYY-MM-DDTHH:mm:ss'));
                                              doc['articles'][k]['article_status'] = '1';
                                              doc['articles'][k]['quizFollowup'] = '1';
                                              doc['articles'][k]['upload'] = '0';
                                              return db.put(doc).then(function () {
                                                  $ionicPopup.show({
                                                      title: 'Results',
                                                      template: '<div style="text-align:center">Your Score: ' + finalScore + '</div>',
                                                      buttons: [
                                                  {
                                                      text: 'Finish', onTap: function (e) {
                                                          callback()
                                                      },
                                                      type: 'button-positive'
                                                  }
                                                      ],
                                                  })
                                              })
                                          })
                                      },
                                      type: 'button-positive'
                                  }
                                      ],
                                  });
                              }
                          }
                        ]
                    })
                }
                else {
                    console.log(JSON.stringify(article))
                    callback()
                }
            }
            loopQuizzes(doc['articles'])
        });
    }


    /*
    Events are composed of two pages, hides second page and returns to first
    */
    $scope.goToEventPart1 = function () {
        $('#eventPart1').css('display', '')
        $('#eventPart2').css('display', 'none')
    };


    /*
    Checks if all necessary fields have been filled before moving to part 2
    */
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
        if (pass == true) {
            $('#eventPart1').css('display', 'none')
            $('#eventPart2').css('display', '')
        }
    };


    $scope.toggleMinsBefore = function () {
        if ($("#minsBeforeDrop").css('display') == 'none') {
            $('#minsBeforeDrop').css('display', '')
        }
        else {
            $('#minsBeforeDrop').css('display', 'none')
        }
    };


    /*
    Closes modal and removes it from memory
    */
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            //window.localStorage.removeItem('referralID');
            $scope.modal.remove();
        });
    };


    /*
    Gets the appropriate event color to display in FullCalendar
    based on events category
    */
    $scope.getColor = function (type) {
        switch (type) {
            case '1':
                type = 'blue';
                return type;
            case '3':
                type = 'teal';
                return type;
            case '2':
                type = 'red';
                return type;
            case '4':
                type = 'green';
                return type;
            case '5':
                type = 'orange';
                return type;
            case '6':
                type = 'purple';
                return type;
            case '7':
                type = 'black';
                return type;
        }
    }


    /*
    Converts 24 hour to 12 and designates am/pm
    Example: 13:00 to 1:00pm
    */
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

    $scope.progress = function () {
        var db = PouchDB('momlink');
        var week;
        var html;
        var deliveryDate, startDate = '';
        //get current week
        db.get('profile').then(function (doc) {
            if (doc['deliveryDate'] != '' && doc['startDate'] != '') {
                deliveryDate = doc['deliveryDate'];
                startDate = doc['startDate'];
            }
        }).then(function () {
            db.get('progress').then(function (doc) {
                if (deliveryDate != '' && startDate != '') {
                    text = doc['Week ' + week];
                    console.log('Week ' + week)
                    difference = moment.duration(moment().diff(moment(startDate))).asWeeks();
                    week = parseInt(difference) + 1;
                    html = '<img src="../img/progress/week' + week + '.jpg" style="max-width:50%;height:auto;padding:0.5em;" align="left" ng-click="imagePopup(&quot;../img/progress/week' + week + '.jpg&quot;)">';
                    html += '<p>' + text + '</p>';
                    week = 'Week ' + week;
                }
                else {
                    html = '<img src="../img/progress/week1.jpg" style="max-width:50%;height:auto;padding:0.5em;" align="left" ng-click="imagePopup(&quot;../img/progress/week1.jpg&quot;)">';
                    html += '<p>' + doc['Week 1'] + '</p>';
                    console.log(html)
                    week = 'Week 1';
                }
                $('#week').html(week);
                $('#progress').html(html);
                $compile($('#progress'))($scope);
            })
        })
    }
    $scope.navProgress = function (nav) {
        var db = PouchDB('momlink');
        var week = $("#week").html().slice(-2);
        week = parseInt(week);
        if (nav == '+') {
            if (week > 40) {
                week = 41;
            }
            else {
                week++;
            }
        }
        else {
            if (week <= 1) {
                week = 1;
            }
            else {
                week--;
            }
        }
        db.get('progress').then(function (doc) {
            text = doc['Week ' + week];
            $('#week').html('Week ' + week);
            var html = '<img src="../img/progress/week' + week + '.jpg" style="max-width:50%;height:auto;padding:0.5em;" align="left" ng-click="imagePopup(&quot;../img/progress/week' + week + '.jpg&quot;)">';
            html += '<p>' + text + '</p>';
            $('#progress').html(html);
            $compile($('#progress'))($scope);
        })

    }

    $scope.imagePopup = function (image) {
        console.log(image)
        var template = '<ion-modal-view>';
        template += '<ion-header-bar align-title="middle" class="bar-positive">';
        template += '<button class="button button-icon icon ion-close-round" ng-click="closeModal();"></button>';
        //template += '<h1 class="title" id="modalHeadline">Serving Size Information</h1>';
        template += '</ion-header-bar>';
        template += '<ion-content overflow-scroll="true">';
        template += '<img class="col no-padding" src="' + image + '" style="max-width=100%;max-height=auto%">';
        //template += `<img class="col no-padding" src="../img/servingInfo/infoFruit.png" style="max-width=100%;max-height=auto">`;
        template += '</ion-content>';
        template += '</ion-modal-view>';
        $scope.modal = $ionicModal.fromTemplate(template, {
            scope: $scope,
            animation: 'slide-in-up'
        })
        $scope.modal.show();
    }

    /*
    Returns the time parameter from a date such as 08/01/2016T10:23
    */
    $scope.parseTime = function (time) {
        time = String(time).substr(String(time).indexOf("T") + 1);
        return time;
    }

    $scope.decodeCategory = function (category) {
        switch (category) {
            case '1':
                return 'OB Appt';
            case '2':
                return 'Lab';
            case '3':
                return 'Referral';
            case '4':
                return 'PNCC';
            case '5':
                return 'Ultra';
            case '6':
                return 'Class';
            case '7':
                return 'Other';
        }
    }

    $scope.decodeReminder = function (str) {
        str = str.replace(/:/gi, '');
        str = str.replace(/-/gi, '');
        str = str.replace(/T/gi, '');
        str = str.replace(/am/gi, '');
        str = str.replace(/pm/gi, '');
        return str;
    }

    /*
    Text to speech function using responsiveVoice.js
    */
    $scope.speak = function (text) {
        document.addEventListener('deviceready', function () {
            TTS.speak(text, function () {
                console.log(text);
            }, function (reason) {
                console.log(reason);
            });
        }, false);
    }

    /*
    Temporary function to see contents of db
    */
    $scope.inspectDB = function () {
        var db = PouchDB('momlink');
        db.allDocs({ include_docs: true }).then(function (res) {
            var docs = res.rows.map(function (row) { return row.doc; });
            console.log(JSON.stringify(docs));
            //console.log(docs);
        }).catch(console.log.bind(console));
        /*db.get('userData').then(function (doc) {
            for (i in doc['userData']) {
                console.log(String(doc['userData'][i]))
            }
        })*/
    }

    /*
    Temporary function for study, emails a log of user behavior
    */
    /*$scope.sendLog = function () {
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
    }*/
})


    /*
                    The inbox controller pulls referral and pncc contacts
                    allows user to call/text/email them and render sms conversations
                    */
.controller('InboxCtrl', function ($scope, $compile, $ionicPopup) {
    $scope.sendNewMessage = function (recipient) {
        if (navigator.connection.type == Connection.NONE && articles.length == 0) {
            //alert must be connected to wifi
            $ionicPopup.alert({
                title: "Please connect to WiFi and try again.",
            });
        }
        else {
            $ionicPopup.show({
                template: '<div>Subject</div><input id="msgSubject" type="text"><br><div>Body</div><textarea id="msgContent" rows="4"></textarea>',
                title: 'New Message',
                scope: $scope,
                buttons: [
                  {
                      text: 'Cancel',
                      onTap: function () {
                          $scope.clickTracker('cancelNewMMessage');
                      }
                  },
                  {
                      text: '<b>Send</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                          var message = {
                              "date": moment().format('MM/DD/YYYY'),
                              "subject": $('#msgSubject').val(),
                              "pncc_id": recipient,
                              "content": $('#msgContent').val(),
                          };
                          var post_information = { 'data': encodeURIComponent(JSON.stringify(message)), 'cid': window.localStorage.getItem('cid') };
                          $.ajax({
                              url: 'https://momlink.crc.nd.edu/~jonathan/current/sendNewMessage.php',
                              type: 'POST',
                              dataType: 'json',
                              data: post_information,
                              async: false,
                              success: function (data) {
                                  //need new message and thread data
                                  console.log(JSON.stringify(data))
                                  if (data.length > 0) {
                                      var db = PouchDB('momlink');
                                      db.get('inbox').then(function (doc) {
                                          threadData = data[0];
                                          console.log(JSON.stringify(threadData))
                                          var thread = {
                                              "id": threadData['id'],
                                              "date": threadData['mdate'],
                                              "subject": threadData['subject'],
                                              "excerpt": threadData['excerpt'],
                                              "pncc_id": threadData['pncc_id'],
                                              "msgid": threadData['msgid'],
                                              "read": 1
                                          };
                                          doc['threads'].push(thread);

                                          msgData = data[1];
                                          console.log(JSON.stringify(msgData))
                                          var message = {
                                              "id": msgData['id'],
                                              "date": msgData['mdate'],
                                              "sender": msgData['sender'],
                                              "subject": msgData['subject'],
                                              "content": msgData['content'],
                                              "pncc_id": msgData['pncc_id'],
                                              "msgid": msgData['msgid'],
                                          };
                                          doc['messages'].push(message);

                                          console.log('message sent successfully')
                                          return db.put(doc).then(function () {
                                              $scope.clickTracker('newMMessageSent');
                                          })
                                      })
                                  }
                              }
                          });

                      }
                  }
                ]
            });
        }
    }

    $scope.sendNewReply = function (recipient, msgID) {
        if (navigator.connection.type == Connection.NONE && articles.length == 0) {
            //alert must be connected to wifi
            $ionicPopup.alert({
                title: "Please connect to WiFi and try again.",
            });
        }
        else {
            $ionicPopup.show({
                template: '<textarea id="msgContent" rows="4"></textarea>',
                title: 'New Reply',
                scope: $scope,
                buttons: [
                  {
                      text: 'Cancel',
                      onTap: function () {
                          $scope.clickTracker('cancelReply');
                      }
                  },
                  {
                      text: '<b>Send</b>',
                      type: 'button-positive',
                      onTap: function (e) {
                          var message = {
                              "date": moment().format('MM/DD/YYYY'),
                              "pncc_id": recipient,
                              "content": $('#msgContent').val(),
                              "msgid": msgID
                          };
                          var post_information = { 'data': encodeURIComponent(JSON.stringify(message)), 'cid': window.localStorage.getItem('cid') };
                          console.log(JSON.stringify(post_information))
                          $.ajax({
                              url: 'https://momlink.crc.nd.edu/~jonathan/current/sendNewReply.php',
                              type: 'POST',
                              dataType: 'json',
                              data: post_information,
                              async: false,
                              success: function (data) {
                                  var db = PouchDB('momlink');
                                  console.log(JSON.stringify(data))
                                  if (data.length > 0) {
                                      console.log('message sent successfully')
                                      db.get('inbox').then(function (doc) {
                                          var message = {
                                              "id": data[0]['id'],
                                              "date": data[0]['mdate'],
                                              "sender": data[0]['sender'],
                                              "subject": data[0]['subject'],
                                              "content": data[0]['content'],
                                              "pncc_id": data[0]['pncc_id'],
                                              "msgid": data[0]['msgid'],
                                          };
                                          doc['messages'].push(message);
                                          console.log('Messages downloaded')
                                          return db.put(doc).then(function () {
                                              console.log('go here?')
                                              $scope.clickTracker('replySent');
                                              $scope.renderThreadList(recipient, msgID)
                                          })
                                      })
                                  }
                              }
                          });
                      }
                  }
                ]
            });
        }
    }

    $scope.newPNCCMessage = function (recipient, email, phone) {
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
                        text: 'MomLink Message', onTap: function (e) {
                            $scope.clickTracker('mmessage');
                            momlinkMessage();
                            return 'momlinkMessage';
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
                        text: 'MomLink Message', onTap: function (e) {
                            $scope.clickTracker('mmessage');
                            momlinkMessage();
                            return 'momlinkMessage';
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
            $ionicPopup.show({
                title: 'Contact via',
                cssClass: 'popup-vertical-buttons',
                buttons: [
                    {
                        text: 'Email', onTap: function (e) {
                            $scope.clickTracker('email');
                            mail();
                            return 'email';
                        },
                        type: 'button-positive'
                    },
                    {
                        text: 'MomLink Message', onTap: function (e) {
                            $scope.clickTracker('mmessage');
                            momlinkMessage();
                            return 'momlinkMessage';
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
        else {
            //$scope.toNewPage(momlinkmessage)
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
        function momlinkMessage() {
            //open modal to create new message
            var networkState = navigator.connection.type;
            if (networkState == Connection.NONE) {
                //alert must be connected to wifi
                $ionicPopup.alert({
                    title: 'Please Connect to WiFi to Send a Message.',
                });
            }
            else {
                $scope.sendNewMessage(recipient);
            }
        }
    };

    /*
    Pulls all referrals and assocaited contact information
    */
    $scope.showReferralContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('referrals').then(function (doc) {
            referrals = doc['referrals'];
            html += '<div class="list">';
            for (i in referrals) {
                html += '<div class="item item-thumbnail-left" ng-click="renderConversation(&quot;referrals' + '&quot;,&quot;' + referrals[i]['name'] + '&quot;,&quot;' + referrals[i]['phone'] + '&quot;,&quot;' + referrals[i]['email'] + '&quot;)">';
                html += '<img src="' + referrals[i]['img'] + '">';
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

    /*
    Pulls all pnncs and assocaited contact information
    */
    $scope.showPNCCContacts = function () {
        var db = PouchDB('momlink');
        var html = '';
        db.get('inbox').then(function (doc) {
            pncc = doc['pncc'];
            html += '<div class="bar bar-header"><button class ="button button-icon icon ion-arrow-left-a" ng-click="renderThreads()"></button><div class="title">Select Contact to Message</div></div>'
            html += '<div class="list has-header">';
            for (i in pncc) {
                html += '<div class="item item-thumbnail-left" ng-click="newPNCCMessage(&quot;' + pncc[i]['id'] + '&quot;,&quot;' + pncc[i]['email'] + '&quot;,&quot;' + pncc[i]['phone'] + '&quot;)">';
                html += '<img src="' + pncc[i]['image'] + '">';
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
            $("#threads").html(html);
            $compile($("#threads"))($scope);
        });
    };

    $scope.renderThreads = function () {
        var db = PouchDB('momlink');
        var allThreads = [];
        var thread = [];
        var html = '';
        db.get('inbox').then(function (doc) {
            html += '<div class="bar bar-header"><div class="title"></div><button class ="button button-icon icon ion-email" ng-click="showPNCCContacts()"></button></div>'
            html += '<div class="list has-header">';
            if (doc['threads'].size == 0) {
                html += '<div class="item item-text-wrap">No Threads to Show</div>';
            }
            else {
                for (i in doc['threads']) {
                    var pnccName = '';
                    for (j in doc['pncc']) {
                        if (doc['threads'][i]['pncc_id'] == doc['pncc'][j]['id']) {
                            pnccName = doc['pncc'][j]['name'];
                        }
                    }
                    //add all MM conversations to a list
                    thread = ['mm', doc['threads'][i]['pncc_id'], pnccName, doc['threads'][i]['id'], doc['threads'][i]['subject'], doc['threads'][i]['date'], doc['threads'][i]['excerpt'], doc['threads'][i]['read']]
                    allThreads.push(thread)
                    thread = [];
                }
            }
            for (k in doc['pncc']) {
                //check if the pncc has listed their number
                var phone = doc['pncc'][k]['phone'];
                if (phone != '') {
                    //check if they have an sms conversation going
                    SMS.listSMS({ box: '', address: '+'.concat(phone), maxCount: 100000 }, function (data) {
                        if (data.length > 0) {
                            var d = moment.utc(data[0].date).format('MM/DD/YYYY');
                            thread = ['sms', doc['pncc'][k]['id'], doc['pncc'][k]['name'], '', '', d, data[0].body]
                            allThreads.push(thread)
                            thread = [];
                        }
                    })
                }
            }
        }).then(function () {
            //sort by allThreads by date
            allThreads.sort((function (index) {
                return function (a, b) {
                    return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
                };
            })(5));
            //build thread string
            //allThreads [sms/mm, pnccID, pnccName, threadID (if applicable), subject (if applicable), date, message]
            for (t in allThreads) {
                if (allThreads[t][0] == 'mm') {
                    console.log()
                    html += '<div class="item item-text-wrap" ng-click="renderThreadList(' + allThreads[t][1] + ',' + allThreads[t][3] + ')">';
                    if (allThreads[t][7] == 0) {
                        html += '<h2><b>' + allThreads[t][2] + ' - ' + allThreads[t][4] + '</b></h2>';
                        html += '<p><b>' + allThreads[t][5] + ' - ' + allThreads[t][6] + '</b></p>';
                    }
                    else {
                        html += '<h2>' + allThreads[t][2] + ' - ' + allThreads[t][4] + '</h2>';
                        html += '<p>' + allThreads[t][5] + ' - ' + allThreads[t][6] + '</p>';
                    }
                    html += '</div>';
                }
                else if (allThreads[t][0] == 'sms') {
                    //else handle as text messsage
                    html += '<div class="item item-text-wrap" ng-click="renderPNCCConversation(' + allThreads[t][1] + ')">';
                    //html += '<div class="item item-text-wrap" ng-click="">';
                    html += '<h2>' + allThreads[t][2] + ' - Text Messages</h2>';
                    html += '<p>' + allThreads[t][5] + ' - ' + allThreads[t][6] + '</p>';
                    html += '</div>';
                }
            }
            html += '</div>';
            $("#".concat('threads')).html(html);
            $compile($("#".concat('threads')))($scope);
        })
    };

    $scope.renderThreadList = function (pncc_id, msgid) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('inbox').then(function (doc) {
            var pnccName = '';
            for (j in doc['pncc']) {
                if (pncc_id == doc['pncc'][j]['id']) {
                    pnccName = doc['pncc'][j]['name'];
                }
            }
            html += '<div class="bar bar-header"><button class ="button button-icon icon ion-arrow-left-a" ng-click="renderThreads()"></button><div class="title">' + pnccName + '</div><button class ="button button-icon icon ion-email" ng-click="sendNewReply(&quot;' + pncc_id + '&quot;,&quot;' + msgid + '&quot;)"></button></div>'
            html += '<div class="list has-header">';
            //loop through inbox for all messages containing the thread id
            for (i in doc['messages']) {
                if (doc['messages'][i]['msgid'] == msgid) {
                    if (doc['messages'][i]['sender'] == 1) {
                        html += '<div class="item item-text-wrap" style="color: #e6005c;">' + doc['messages'][i]['content'] + '</div>';
                    }
                    else {
                        html += '<div class="item item-text-wrap"><p style="text-align:right; color: #0866c6;">' + doc['messages'][i]['content'] + '</p></div>';
                    }
                }

            }
            for (j in doc['threads']) {
                if (doc['threads'][j]['id'] == msgid) {
                    doc['threads'][j]['read'] = 1;
                }
            }
            return db.put(doc).then(function () {
                html += '</div>';
                $("#".concat('threads')).html(html);
                $compile($("#".concat('threads')))($scope);
                $scope.clickTracker('renderThreadList(' + pncc_id + ')');
            })
        });
    };

    $scope.renderPNCCConversation = function (pncc_id) {
        var db = PouchDB('momlink');
        var html = '';
        db.get('inbox').then(function (doc) {
            for (i in doc['pncc']) {
                if (doc['pncc'][i]['id'] === pncc_id) {
                    break;
                }
            }
            pncc = doc['pncc'][i];
            name = pncc['name'];
            phone = pncc['phone'];
            email = pncc['email'];
        }).then(function () {
            html += '<div class="bar bar-header"><button class ="button button-icon icon ion-arrow-left-a" ng-click="renderThreads()"></button><div class="title">' + name + '</div><button class ="button button-icon icon ion-email" ng-click="newPNCCMessage(&quot;' + email + '&quot;,&quot;' + phone + '&quot;)"></button></div>'
            html += '<div class="list has-header">';
            //loop through inbox sms, if empty, no messages to display
            //will also need to display momlink messages
            SMS.listSMS({ box: '', address: '+'.concat(phone), maxCount: 100000 }, function (data) {
                reverse = data.reverse();
                if (reverse.length == 0) {
                    html += '<div class="col text-center" style="color:gray">No Messages to Show</div>';
                }
                else {
                    for (i in reverse) {
                        if (reverse[i]['type'] == 1) {
                            html += '<div class="item item-text-wrap" style="color: #e6005c;">' + reverse[i].body + '</div>';
                        }
                        else {
                            html += '<div class="item item-text-wrap"><p style="text-align:right; color: #0866c6;">' + data[i].body + '</p></div>';
                        }
                    }
                }
                html += '</div>';
                $("#".concat('threads')).html(html);
                $compile($("#".concat('threads')))($scope);
            }, function (error) { console.log(error) });
        });
    };

    /*
    Displays sms conversation between user and contact
    */
    $scope.renderConversation = function (type, name, phone, email) {
        var html = '';
        if (type == 'referrals') { show = 'showReferralContacts()'; }
        else { show = 'showPNCCContacts()'; }
        html += '<div class="bar bar-header"><button class ="button button-icon icon ion-reply" ng-click="' + show + '"></button><div class="title">' + name + '</div><button class ="button button-icon icon ion-email" ng-click="newMessage(&quot;' + email + '&quot;,&quot;' + phone + '&quot;)"></button></div>'
        html += '<div class="list has-header">';
        //loop through inbox sms, if empty, no messages to display
        SMS.listSMS({ box: '', address: '+'.concat(phone), maxCount: 100000 }, function (data) {
            console.log(data)
            if (data.reverse.length == 0) {
                html += '<div class="col text-center" style="color:gray">No Messages to Show</div>';
            }
            else {
                for (i in data.reverse()) {
                    if (data[i].type == 1) {
                        html += '<div class="item item-text-wrap" style="color: #e6005c;">' + data[i].body + '</div>';
                    }
                    else {
                        console.log('hit2')
                        html += '<div class="item item-text-wrap"><p style="text-align:right; color: #0866c6;">' + data[i].body + '</p></div>';
                    }
                }
            }
            html += '</div>';
            $("#".concat(type)).html(html);
            $compile($("#".concat(type)))($scope);
        }, function (error) { console.log(error) });
    };

    /*$scope.saveMessage = function (content) {
        var db = PouchDB('momlink');
        db.get('inbox').then(function (doc) {
            var message = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('MM/DD/YYYY'),
                "content": $('#messageContent').val()
            };
            doc['clientMessages'].push(message);
            return db.put(doc);
        }).then(function () {
            $scope.toNewPage('inbox.html', 'Inbox')
            $scope.closeModal();
        });
    }*/
})


/*
            The calendar controller implements fullCalendar.js to display events
            and handles event questions
            */
.controller('CalendarCtrl', function ($scope, $ionicPopup, $compile) {
    /*
    Displays fullCalendar and attaches the viewEvent function to each event
    */
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
                dayClick: function (date) {
                    $scope.clickTracker('createEvent');
                    $scope.createEvent('calendar.html', 'Calendar', date.format())
                },
                eventRender: function (event, element) {
                    element.click(function () {
                        $scope.clickTracker('viewEvent(' + event.id + ', calendar.html' + ', Calendar' + ')');
                        $scope.viewEvent(event.id, 'calendar.html', 'Calendar');
                    })
                    return ['all', event.scheduledBy].indexOf($('#filter').html()) >= 0
                }
            })
        });
    };


    /*
    Filter events between personal events and PNCC created events
    passing in 0 displays personal and 1 displays pncc
    */
    $scope.filterEvents = function (num) {
        $('#filter').html(num)
        $('#calendar').fullCalendar('rerenderEvents');
    };

    $scope.toggleShare = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            if (doc['events'][i]['share'] == 1) {
                $("input[name=share]").prop('checked', true);
            }
        });
    };

    $scope.toggleReminder = function () {
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in doc['events']) {
                if (doc['events'][i]['id'] === $scope.eventID) {
                    break;
                }
            }
            if (doc['events'][i]['reminder'] == 1) {
                $("input[name=reminder]").prop('checked', true);
                $('#minsBeforeDrop').css('display', '')
            }
        });
    };

    /*
    Displays all questions either initally present or user has added
    */
    $scope.renderEventQuestions = function () {
        var questionsHtml = '';
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in doc['questions']) {
                questionsHtml += '<div class="item item-checkbox item-icon-right item-text-wrap" on-hold="deleteQuestion(&quot;' + i + '&quot;)">' + doc['questions'][i] + '<label class="checkbox"><input type="checkbox" name="Q" value="' + doc['questions'][i] + '"></label></div>';
            }
            $('#eventQuestions').html(questionsHtml);
            $compile($('#eventQuestions'))($scope);
        })
    };


    /*
    User can add a question to the list of frequently asked questions
    */
    $scope.addQuestion = function () {
        $ionicPopup.show({
            template: '<input id="question" type="text">',
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


    /*
    Removes question from the list of frequently asked questions
    */
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


    /*
    Immediately regenerates the list of frequently asked questions after
    one has been added/removed
    */
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


    /*
    Selects category from grid of options to be saved as the events category
    may only select one
    */
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


/*
            The referral controller shows all referrals and option to schedule meetings with them
            */
.controller('ReferralCtrl', function ($scope, $ionicPopup, $ionicModal, $timeout, $compile) {
    /*
    Populate all users referrals
    */
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
                        html += '<a class="item item-thumbnail-left item-text-wrap" ng-click="schedule(&quot;' + referrals[i]['id'] + '&quot;)">';
                        html += '<img src="' + referrals[i]['img'] + '" ng-click="schedule(&quot;' + referrals[i]['id'] + '&quot;)">';
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
                        if (referrals[i]['referral_status'] == '1') {
                            html += '<p style="display: inline-block;">Status: Followed-up</p>&nbsp;<button class="button button-small" ng-click="changeStatus(&quot;' + referrals[i]['id'] + '&quot;); $event.stopPropagation();" style="display: inline-block;">Change Status?</button>';
                        }
                        else {
                            html += '<p style="display: inline-block;">Status: Have not followed-up</p>&nbsp;<button class="button button-small" ng-click="changeStatus(&quot;' + referrals[i]['id'] + '&quot;); $event.stopPropagation();" style="display: inline-block;">Change Status?</button>';
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

    $scope.changeStatus = function (id) {
        var db = PouchDB('momlink');
        db.get('referrals').then(function (doc) {
            for (i in doc['referrals']) {
                if (doc['referrals'][i]['id'] === id) { break; }
            }
            if (doc['referrals'][i]['referral_status'] == '1') {
                doc['referrals'][i]['referral_status'] = '0'
                doc['referrals'][i]['upload'] = '0'
                $scope.clickTracker('changeStatus(0)');
            }
            else {
                doc['referrals'][i]['referral_status'] = '1'
                doc['referrals'][i]['upload'] = '0'
                $scope.clickTracker('changeStatus(1)');
            }
            return db.put(doc).then(function () {
                $scope.toNewPage('referrals.html', 'Referrals');
            })
        })
    }

    /*
    Ask the user if they have already contacted/scheduled a meeting,
    if they have, then create an event for it
    */
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


/*
The education controller handles articles sent to the user by their pncc
Allows user to download articles for offline use
Articles are placed into two categories: shared and history, shared articles are 
those recently given to user, shared articles are then moved to the history section after
the articles quiz has been completed with a perfect score
*/
.controller('EducationCtrl', function ($scope, $ionicPopup, $ionicModal, $timeout, $compile) {
    var timer;
    var sessionTime = 0;
    /*
    Renders categories based on the categories assigned to articles given to the user
    */
    $scope.renderCategories = function (type) {
        var db = PouchDB('momlink');
        var html = '';
        var colSpacer = 2;
        var categories = {};
        var categoryCounts = {};
        var totalUnreadArticles = 0;
        db.get('articles').then(function (doc) {
            //get all article ids from shared or history
            sharedArticleIds = doc[type];
            //generates a dictionary where keys are categories 
            //and values are the number of articles per category not read
            for (i in sharedArticleIds) {
                for (j in doc['articles']) {
                    if (sharedArticleIds[i] == doc['articles'][j]['id']) {
                        if (categories[doc['articles'][j]['category']] == null) {
                            categories[doc['articles'][j]['category']] = [];
                            categories[doc['articles'][j]['category']].push(doc['articles'][j]['id']);
                        }
                        else {
                            categories[doc['articles'][j]['category']].push(doc['articles'][j]['id'])
                        }
                        if (doc['articles'][j]['lastRead'] == '') {
                            if (categoryCounts[doc['articles'][j]['category']] == null) {
                                categoryCounts[doc['articles'][j]['category']] = 1;
                            }
                            else {
                                categoryCounts[doc['articles'][j]['category']]++;
                            }
                            totalUnreadArticles++;
                        }
                    }
                }
            }
            //build string
            html += '<div class="row has-header" style="padding-right:0;padding-left:0;padding-top:0">'
            html += '<div class="col-33 text-center padding" ng-click="renderArticleList(&quot;' + type + '&quot;,&quot;All&quot;);clickTracker(&quot;renderCategories(All)&quot;)" style="position:relative"><img class="autoSize" src="../img/articles/all.png">';
            if (totalUnreadArticles > 0) {
                html += '<span class ="badge badge-positive topRightBadge">' + totalUnreadArticles + '</span>All</div>';
            }
            else {
                html += 'All</div>';
            }
            for (i in categories) {
                //add column              
                html += '<div class="col-33 text-center padding" ng-click="renderArticleList(&quot;' + type + '&quot;,&quot;' + i + '&quot;);clickTracker(&quot;renderCategories(' + i + ')&quot;)" style="position:relative">';
                //get category img
                for (k in doc['categories']) {
                    if (i == doc['categories'][k][1]) {
                        html += '<image class="autoSize" src="../img/topics/' + doc['categories'][k][2] + '">';
                    }
                }
                if (categoryCounts[i] > 0) {
                    html += '<span class="badge badge-positive topRightBadge">' + categoryCounts[i] + '</span>';
                }
                html += i;
                html += '</div>';
                //add row if 3 elements have been placed
                if (colSpacer % 3 == 0) {
                    html += '</div><div class="row" style="padding-right:0; padding-left:0; padding-top:0">';
                }
                colSpacer++;
            }
            html += '</div>';
            $('#' + type).html(html);
            $compile($('#' + type))($scope);
        })
    };

    $scope.renderArticleList = function (type, categoryName) {
        //articles is an array of article ids
        var db = PouchDB('momlink');
        var articleIDs = [];
        var html = '';
        db.get('articles').then(function (doc) {
            if (type == 'shared' || type == 'history') {
                html += '<div class="bar bar-header"><button class ="button button-icon icon ion-arrow-left-a" ng-click="renderCategories(&quot;' + type + '&quot;)"></button><div class="title">' + categoryName + '</div></div>';
                html += '<div class="list has-header">';
                if (categoryName == 'All') {
                    for (i in doc[type]) {
                        for (j in doc['articles']) {
                            if (doc[type][i] == doc['articles'][j]['id']) {
                                displayArticle(doc['articles'][j])
                            }
                        }
                    }
                }
                else {
                    for (i in doc[type]) {
                        for (j in doc['articles']) {
                            if (doc[type][i] == doc['articles'][j]['id'] && categoryName == doc['articles'][j]['category']) {
                                displayArticle(doc['articles'][j])
                            }
                        }
                    }
                }
                html += '</div></div>';
                $('#' + type).html(html);
                $compile($('#' + type))($scope);
            }
            else {
                html += '<div class="bar bar-header"><button class ="button button-icon icon ion-arrow-left-a" ng-click="renderLibrary()"></button><div class="title">' + categoryName + '</div><button class ="button button-icon icon ion-loop" ng-click="updateArticles(&quot;' + categoryName + '&quot;)"></button></div>';
                html += '<div class="list has-header">';
                for (j in doc['articles']) {
                    if (categoryName == doc['articles'][j]['category']) {
                        displayArticle(doc['articles'][j])
                    }
                }
                html += '</div></div>';
                $('#' + type).html(html);
                $compile($('#' + type))($scope);
            }

            function displayArticle(article) {
                console.log(JSON.stringify(article))
                html += '<div class="item item-thumbnail-left item-text-wrap">';
                if (article['filename'] != null) {
                    html += '<img src="' + $scope.getFormatImg(article['filename']) + '">';
                }
                //bold if the article has not been read
                if (article['lastRead'] == '') { html += '<h2><b>' + article['title'] + '</b></h2>'; }
                else { html += '<h2>' + article['title'] + '</h2>'; }
                //html += '<p>Shared: ' + article['dateShared'] + '</p>';
                if (article['description'] != null) {
                    html += '<p>' + article['description'] + '</p>';
                }
                //read more/take quiz buttons
                html += '<button class="button button-small button-positive" ng-click="openArticle(&quot;' + type + '&quot;,&quot;' + article['id'] + '&quot;,&quot;' + categoryName + '&quot;)">Read More... <i class="ion-ios-book-outline"></i></button>&nbsp;';
                if (article['quiz'].length != 0) {
                    html += '<button class="button button-small button-positive" ng-click="renderQuiz(&quot;' + type + '&quot;,&quot;' + article['id'] + '&quot;,&quot;' + categoryName + '&quot;)">Take Quiz <i class="ion-help"></i></button>';
                    html += '<p>Best Score: ' + article['bestScore'] + '</p>';
                    html += '<p>Quiz Attempts: ' + article['quizAttempts'] + '</p>';
                }
                html += '</div>';
            }
        });
    }

    $scope.renderLibrary = function () {
        var db = PouchDB('momlink');
        var html5 = '<div class="row">';
        var col = 0;
        db.get('articles').then(function (doc) {
            //sort categories by ranking
            function sortCategories(a, b) {
                if (parseInt(a[3]) === parseInt(b[3])) {
                    return 0;
                }
                else {
                    return (parseInt(a[3]) < parseInt(b[3])) ? -1 : 1;
                }
            }

            for (i in doc['categories'].sort(sortCategories)) {
                console.log(doc['categories'][i][3])
                html5 += '<div class="col text-center">';
                html5 += '<input type="image" src="../img/topics/' + doc['categories'][i][2] + '"ng-click="categoryHandler(&quot;' + doc['categories'][i][0] + '&quot;,&quot;' + doc['categories'][i][1] + '&quot;)" style="max-width:100%;height:auto;">';
                html5 += '<p>' + doc['categories'][i][1] + '</p>';
                html5 += '</div>';
                col++;
                if (col % 3 == 0) {
                    html5 += '</div>';
                    html5 += '<div class="row">';
                }
            }
            while (col % 3 != 0) {
                html5 += '<div class="col text-center">';
                html5 += '</div>';
                col++;
            }
        }).then(function () {
            html5 += '</div>'
            $('#library').html(html5);
            $compile($('#library'))($scope);
        })
    };

    $scope.categoryHandler = function (categoryID, categoryName) {
        var db = PouchDB('momlink');
        var articles = [];
        db.get('articles').then(function (doc) {
            //get all articles for category
            for (i in doc['articles']) {
                if (doc['articles'][i]['category'] == categoryName) {
                    articles.push(doc['articles'][i])
                }
            }
            if (navigator.connection.type == Connection.NONE && articles.length == 0) {
                //alert must be connected to wifi
                $ionicPopup.alert({
                    title: "Please connect to WiFi and try again.",
                });
            }
            else if (navigator.connection.type != Connection.NONE && articles.length == 0) {
                $ionicPopup.alert({
                    title: "Would you like to download these articles?",
                    buttons: [
                          {
                              text: '<b>Download</b>',
                              type: 'button-positive',
                              onTap: function () {
                                  $scope.downloadCategory(categoryID, categoryName);
                              }
                          },
                          {
                              text: 'Cancel'
                          },
                    ]
                });
            }
            else {
                $scope.renderArticleList('library', categoryName)
            }
        })
    };

    $scope.downloadCategory = function (categoryID, categoryName) {
        var db = PouchDB('momlink');
        var downloads = [];
        var post_information = { 'categoryID': categoryID };
        console.log(JSON.stringify(post_information))
        db.get('articles').then(function (doc) {
            $.ajax({
                url: 'https://momlink.crc.nd.edu/~jonathan/current/getCategoryArticles.php',
                type: 'POST',
                dataType: 'json',
                data: post_information,
                async: false,
                success: function (data) {
                    var downloads = [];
                    console.log(JSON.stringify(data))
                    if (data.length > 0) {
                        for (i in data) {
                            //check if article is already in local db
                            var isUnique = true;
                            for (j in doc['articles']) {
                                if (data[i]['id'] == doc['articles'][j]['id']) {
                                    isUnique = false;
                                }
                            }
                            if (isUnique == true) {
                                //makes quiz suitable for json parse
                                //data[i]['quiz'] = data[i]['quiz'].replace(/'/g, `"`);
                                data[i]['quiz'] = JSON.stringify(data[i]['quiz']);
                                var article = {
                                    "id": data[i]['id'],
                                    "title": data[i]['title'],
                                    "category": categoryName,
                                    "description": data[i]['description'],
                                    "content_text": data[i]['path'],
                                    "filename": data[i]['filename'],
                                    "localPath": "",
                                    "lastRead": "",
                                    "readHistory": {},
                                    "quiz": JSON.parse(data[i]['quiz']),
                                    "quizAttempts": '0',
                                    "bestScore": '0',
                                    "quizHistory": {},
                                    "upload": '0',
                                    "article_status": '0'
                                };
                                //console.log(JSON.stringify(article))
                                doc['articles'].push(article);
                                if (article["content_text"].substring(0, 2) == './') {
                                    downloads.push(article);
                                }
                            }
                        }
                        console.log('Articles downloaded')
                        return db.put(doc).then(function () {
                            //need this to run in a callback 
                            if (downloads.length > 0) {
                                var x = 0;
                                var loopDownloads = function (arr) {
                                    console.log(JSON.stringify(arr))
                                    downloadFile(arr[x], function () {
                                        x++;
                                        if (x < arr.length) {
                                            loopDownloads(arr);
                                        }
                                        else {
                                            var articleIds = new Array();
                                            console.log('hit')
                                            for (k in doc['articles']) {
                                                if (doc['articles'][k]['category'] == categoryName) {
                                                    articleIds.push(doc['articles'][k]['id'])
                                                }
                                            }
                                            console.log(articleIds)
                                            $scope.renderArticleList('library', categoryName)
                                            console.log('finished!')
                                        }
                                    });
                                }
                                function downloadFile(article, callback) {
                                    console.log(JSON.stringify(article))
                                    var downloadLink = String("https://momlink.crc.nd.edu/MomLink-PNCC/uploads/" + article['filename']);
                                    var uri = encodeURI(downloadLink);
                                    //remove spaces from filename
                                    filename = article['filename'].replace(/\s/g, '')
                                    var localPath = cordova.file.externalRootDirectory + "/MomLink/content/" + filename;
                                    console.log(uri)
                                    console.log(localPath)
                                    var fileTransfer = new FileTransfer();
                                    fileTransfer.download(uri, localPath,
                                        function (entry) {
                                            console.log("download complete: " + entry.toURL());
                                            db.get('articles').then(function (doc) {
                                                //get all articles where upload == 0 and articles_status == 1 (articles modified since last update)
                                                for (i in doc['articles']) {
                                                    if (doc['articles'][i]['id'] == article['id']) {
                                                        doc['articles'][i]['localPath'] = entry.toURL();
                                                        //remove spaces from filename
                                                        doc['articles'][i]['filename'] = doc['articles'][i]['filename'].replace(/\s/g, '');
                                                        console.log(entry.toURL())
                                                    }
                                                }
                                                return db.put(doc).then(function () {
                                                    callback();
                                                })
                                            })
                                        },
                                        function (error) {
                                            console.log("download error source " + error.source);
                                            console.log("download error target " + error.target);
                                            console.log("download error code" + error.code);
                                        },
                                        false,
                                        {
                                            headers: {
                                                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                            }
                                        }
                                    );
                                }
                                loopDownloads(downloads)
                            }
                        })
                    }
                    else {
                        console.log('No new articles')
                    }
                }
            });
        });
    }

    /*
    Checks whether the user has already read the article/taken the articles quiz
    */
    $scope.openArticle = function (type, id, category) {
        $ionicPopup.show({
            title: 'Have you read this article before?',
            buttons: [
                {
                    text: 'Yes', onTap: function (e) {
                        $scope.clickTracker('readArticleBefore(yes)');
                        $ionicPopup.show({
                            title: 'Have you taken the quiz before?',
                            buttons: [
                                {
                                    text: 'Yes', onTap: function (e) {
                                        $scope.clickTracker('takenQuizBefore(yes)');
                                        $scope.renderArticle(type, id, category);
                                    }
                                },
                                {
                                    text: 'No', onTap: function (e) {
                                        $scope.clickTracker('takenQuizBefore(no)');
                                        $scope.renderQuiz(type, id, category, 1)
                                    }
                                }
                            ]
                        })
                    },
                    type: 'button-stable'
                },
                {
                    text: 'No', onTap: function (e) {
                        $scope.clickTracker('readArticleBefore(no)');
                        $scope.renderQuiz(type, id, category, 1);
                    },
                    type: 'button-stable'
                }
            ],
        });
    };

    /*
    Opens the selected article
    */
    $scope.renderArticle = function (type, id, category) {
        var db = PouchDB('momlink');
        var html = '';
        var article;
        db.get('articles').then(function (doc) {
            sharedArticles = doc['articles'];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == id) {
                    break;
                }
            }
            console.log(id)
            console.log(JSON.stringify(article))
            html += '<ion-modal-view>';
            html += '<div class="bar bar-footer" ng-init="startSessionTimer()">';
            html += '<button class="button button-icon icon ion-close-round" ng-click="recordTime(&quot;' + id + '&quot;); renderArticleList(&quot;' + type + '&quot;,&quot;' + category + '&quot;); closeModal();">&nbsp;Close</button>';
            html += '<button class="button button-icon icon ion-help" ng-click="recordTime(&quot;' + id + '&quot;); closeModal(); renderQuiz(&quot;' + type + '&quot;,&quot;' + id + '&quot;,&quot;' + category + '&quot;);">&nbsp;Take Quiz</button>';
            html += '</div>';
            html += '<div class="float-button-hasFooter-topButton"><span class="height-fix"><button class="button button-positive button-rounded content" ng-click="readText()"><i class="icon ion-volume-low"></i></button></span></div>';
            html += '<div class="float-button-hasFooter"><span class="height-fix"><button class="button button-positive button-rounded content" ng-click="readAll()"><i class="icon ion-volume-medium"></i></button></span></div>';
            //if category is set to local and network is not available then
            //var networkState = navigator.connection.type;
            articleCategory = String(article['category']).replace(/\s/g, '');
            /*if (window.localStorage.getItem(articleCategory) == 'true' && networkState == Connection.NONE) {
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
            else {*/

            //if content is an object
            if (article["content_text"].substring(0, 2) == './') {
                document.addEventListener("pause", startFileTimer, false);
                document.addEventListener("resume", endFileTimer, false);
                console.log(JSON.stringify(article))
                console.log(article["localPath"])
                $scope.openFile(article["localPath"]);
                function startFileTimer() {
                    $scope.startSessionTimer();
                }
                function endFileTimer() {
                    $scope.recordTime(id);
                    document.removeEventListener("pause", startFileTimer, false);
                    document.removeEventListener("resume", endFileTimer, false);
                    //updated last time article was read
                    article['lastRead'] = String(moment().format('YYYY-MM-DD'));
                    return db.put(doc)
                }
            }
            else {
                //if content is a link
                if (article['content_text'].substring(0, 4) == 'http') {
                    html += '<iframe id="frame" src="' + article['content_text'] + '" style="width:100%; height: 100%;"></iframe>';
                }
                    //content is a string
                else {
                    html += '<div class="has-footer">';
                    html += '<p>';
                    html += article['content_text'];
                    html += '</p>';
                    html += '</div>';
                }
                html += '</ion-modal-view>';
                $scope.modal = $ionicModal.fromTemplate(html, {
                    scope: $scope,
                    animation: 'slide-in-up'
                });
                $scope.openModal();
                //updated last time article was read
                article['lastRead'] = String(moment().format('YYYY-MM-DD'));
                return db.put(doc)
            }

        })
    }

    /*
    Opens the selected quiz
    prequiz variable determines if the quiz is being taken prior to reading the article
    If prequiz is set to 1 the article will be opened after the quiz has been taken
    */
    $scope.renderQuiz = function (type, articleID, category, prequiz) {
        var db = PouchDB('momlink');
        var html = '<div ng-controller="HeaderCtrl">';
        db.get('articles').then(function (doc) {
            sharedArticles = doc['articles'];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    //get article's related quiz
                    quiz = article['quiz'];
                    for (j in quiz) {
                        question = quiz[j][0];
                        answers = quiz[j][1];
                        //render question
                        html += '<div class="item item-text-wrap item-divider item-icon-right">' + question + '<i class="icon ion-volume-medium" ng-click="speak(&quot;' + question + '&quot;)"></i></div>';
                        //render answers
                        html += '<form id="' + String(j) + '">'
                        html += '<ion-list>'
                        for (k = 0; k < answers.length; k++) {
                            answer = quiz[j][1][k][0];
                            answerID = quiz[j][1][k][1];
                            html += '<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="' + String(j) + '" value="' + String(answerID) + '">' + answer + '</ion-radio><button class="col icon ion-volume-medium" ng-click="speak(&quot;' + answer + '&quot;)"></button></div>';
                        }
                        html += '</ion-list>'
                        html += '</form>'
                        //render follow-up
                        html += '<div class="item item-text-wrap item-divider item-icon-right">Please indicate how certain you are about the correctness of your response<i class="icon ion-volume-medium" ng-click="speak(&quot;Please indicate how certain you are about the correctness of your response&quot;)"></i></div>';
                        //render follow-up answers
                        html += '<form id="C' + String(j) + '">'
                        html += '<ion-list>'
                        responses = ['Highly uncertain', 'Uncertain', 'Somewhat uncertain', 'Neutral', 'Somewhat certain', 'Certain', 'Highly certain']
                        for (m in responses) {
                            answer = responses[m];
                            console.log('C' + String(j))
                            console.log(String(answer))
                            html += '<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="C' + String(j) + '" value="' + String(answer) + '">' + answer + '</ion-radio><button class="col icon ion-volume-medium" ng-click="speak(&quot;' + answer + '&quot;)"></button></div>';
                        }
                        html += '</ion-list>'
                        html += '</form>'
                    }
                }
            }
            html += '</div>';
            if (prequiz == 1) {
                $ionicPopup.show({
                    title: 'The following is a pratice quiz taken before reading the article.',
                    buttons: [
                        {
                            text: 'OK', onTap: function (e) {
                                $ionicPopup.show({
                                    title: 'Pre-Quiz',
                                    template: html,
                                    buttons: [
                                {
                                    text: 'Grade', onTap: function (e) {
                                        //score the quiz
                                        $scope.clickTracker('finishQuiz');
                                        $scope.gradeQuiz(type, articleID, category, prequiz);

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
                            },
                            type: 'button-positive'
                        }
                    ],
                });
            }
            else {
                $ionicPopup.show({
                    title: 'Quiz',
                    template: html,
                    buttons: [
                {
                    text: 'Grade', onTap: function (e) {
                        //score the quiz
                        $scope.clickTracker('finishQuiz');
                        $scope.gradeQuiz(type, articleID, category, prequiz);

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
            }
        });
    };

    /*
    Grades the selected quiz, if a perfect score is achieved, the article is then moved to history
    */
    $scope.gradeQuiz = function (type, articleID, category, prequiz) {
        var db = PouchDB('momlink');
        var score = 0;
        var finalScore;
        var maxScore;
        db.get('articles').then(function (doc) {
            var usersAnswers = [];
            sharedArticles = doc['articles'];
            for (i in sharedArticles) {
                article = sharedArticles[i]
                if (article['id'] == articleID) {
                    quiz = article['quiz'];
                    for (j in quiz) {
                        selectedAnswer = $('input[name="' + String(j) + '"]:checked', '#'.concat(j)).val();
                        confidenceAnswer = $('input[name="C' + String(j) + '"]:checked', '#C'.concat(j)).val();
                        correctAnswer = quiz[j][1][quiz[j][2]];
                        questionID = quiz[j][3];
                        if (selectedAnswer == correctAnswer) {
                            usersAnswers.push([selectedAnswer, 1, confidenceAnswer, questionID]);
                            score++;
                        }
                        else {
                            usersAnswers.push([selectedAnswer, 0, confidenceAnswer, questionID]);
                        }
                    }
                    finalScore = score;
                    maxScore = quiz.length;
                    //prequiz will either be 1 or undefined, set as 0 to indicate the quiz was not a prequiz
                    if (prequiz != 1) {
                        prequiz = 0;
                    }
                    //check if new score is best score
                    var bestScore = 0;
                    if (parseInt(article['bestScore']) < score) {
                        article['bestScore'] = String(score);
                    }
                    //also need to record answers selected, prequiz value of 1 means the quiz was a prequiz
                    article['quizAttempts'] = String(parseInt(article['quizAttempts']) + 1)
                    article['quizHistory'][String(moment().format('YYYY-MM-DDTHH:mm:ss'))] = [finalScore, maxScore, usersAnswers, prequiz];
                    article['lastAttempt'] = String(moment().format('YYYY-MM-DDTHH:mm:ss'));
                    article['article_status'] = '1';
                    article['upload'] = '0';
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
                    //$scope.clickTracker('closeQuizResults');
                    if (prequiz == 1) {
                        $scope.clickTracker('renderArticle(' + type + ',' + articleID + ',' + category + ')');
                        $scope.renderArticle(type, articleID, category)
                    }
                },
                type: 'button-positive'
            }
                ],
            })
        }).then(function () {
            if (type == 'shared' && score == article['quiz'].length) {
                //Moves an article from the shared section to the history section
                db.get('articles').then(function (doc) {
                    //remove article id from shared
                    for (i in doc['shared']) {
                        if (doc['shared'][i] == articleID) {
                            article = doc['shared'][i];
                            doc['shared'].splice(i, 1);
                        }
                    }
                    //add article id to history
                    doc['history'].push(articleID)
                    return db.put(doc);
                }).then(function () {
                    $scope.renderArticleList(type, category)
                })
            }
            else {
                $scope.renderArticleList(type, category)
            }
        })
    };

    /*
    Returns image based on article format (text, audio, video, etc.)
    */
    $scope.getFormatImg = function (type) {
        if (type == 'Website') {
            return '../img/formats/website.png';
        }
        switch (type.substr(type.length - 3)) {
            case 'pdf':
                return '../img/formats/pdf.png';
            case 'png':
                return '../img/formats/image.png';
            case 'jpg':
                return '../img/formats/image.png';
            case 'peg':
                return '../img/formats/image.png';
            case 'iff':
                return '../img/formats/image.png';
            case 'mp3':
                return '../img/formats/audio.png';
            case 'mp4':
                return '../img/formats/video.png';
            case '3gp':
                return '../img/formats/video.png';
        }
    };

    /*
    Returns image based on article category
    */
    $scope.getCategoryImg = function (type) {
        switch (type) {
            case 'Safe Sleep':
                return '../img/topics/sleep_big.png';
            case 'Safety':
                return '../img/formats/baby-proof-home.png';
            case 'HUGS':
                return '../img/topics/HUGS.jpg';
            case 'Nutrition':
                return '../img/formats/Nutrition.png';
            case 'First Time Moms':
                return '../img/topics/firstimemoms.jpg';
            case 'Parenting':
                return '../img/formats/WCC_south bend.jpg';
            case 'Abstinence':
                return '../img/topics/abstinence.jpg';
            case 'Anticipatory Guidance':
                return '../img/formats/nesting.jpg';
            case 'Breastfeeding':
                return '../img/topics/breastfeeding.jpg';
            case 'Child Abuse':
                return '../img/topics/childabuse.jpg';
            case 'Community Resources':
                return '../img/topics/communityresources.jpeg';
            case 'Coping Skills':
                return '../img/topics/coping.jpg';
            case 'Dental Health':
                return '../img/topics/dentalhealth copy.jpg';
            case 'Domestic Violence':
                return '../img/topics/domesticviolence.jpg';
            case 'HIV Risks':
                return '../img/topics/hivrisk.png';
            case 'Family Planning':
                return '../img/topics/familyplanning.jpg';
            case 'Financial Planning':
                return '../img/topics/financialplanning.jpg';
            case 'Drug Cessation':
                return '../img/topics/drugcessation.jpg';
            case 'General Advice':
                return '../img/topics/unnamed-chunk-5-1.png';
            case 'Prenatal Care':
                return '../img/topics/prenatalcare.jpg';
            case 'Prenatal Weight':
                return '../img/topics/prenatalweight.jpg';
            case 'Baby Growth':
                return '../img/topics/babygrowth.png';
            case 'Labor and Delivery':
                return '../img/topics/labor-delivery.jpg';
            case 'Managing Pregnancy Discomforts':
                return '../img/topics/pregdiscomforts.jpg';
            case 'Health Care':
                return '../img/topics/healthcare.jpg';
            case 'Infant Stimulation':
                return '../img/topics/infantstimulation.jpg';
            case 'Infant Feeding':
                return '../img/topics/infantfeeding.jpg';
        }
    };

    /*
    Used in conjunction with record time, starts the timer
    */
    $scope.startSessionTimer = function () {
        timer = setInterval(function () { sessionTime++; }, 1000);
    };

    /*
    Records the amount of time the user has spent reading the quiz
    */
    $scope.recordTime = function (articleID) {
        //end timer
        clearInterval(timer);
        var db = PouchDB('momlink');
        db.get('articles').then(function (doc) {
            sharedArticles = doc['articles'];
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
                    article['readHistory'][String(moment().format('YYYY-MM-DDTHH:mm:ss'))] = finalSessionTime;
                    article['article_status'] = '1';
                    article['upload'] = '0';
                    return db.put(doc)
                }
            }
        });
    };

    /*
    Opens modal
    */
    $scope.openModal = function () {
        $scope.modal.show();
    };

    /*
    Closes modal and removes it from memory
    */
    $scope.closeModal = function () {
        $scope.modal.hide().then(function () {
            $scope.modal.remove();
        });
    };

    $scope.openFile = function (file) {
        console.log(JSON.stringify(file))
        var open = cordova.plugins.disusered.open;
        function success() {
            console.log('Success');
        }
        function error(code) {
            if (code === 1) {
                console.log('No file handler found');
            } else {
                console.log('Undefined error');
            }
        }
        open(file, success, error);
    }

    $scope.updateArticles = function (category) {
        var db = PouchDB('momlink');
        db.get('articles').then(function (doc) {
            //get category id
            for (i in doc['categories']) {
                if (category == doc['categories'][i][1]) {
                    categoryID = doc['categories'][i][0];
                    break;
                }
            }
            $scope.downloadCategory(categoryID, category)
        })
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

    $scope.readAll = function () {
        var text = "";
        var iframe = document.getElementById("frame");
        var text = iframe.contentWindow.document.body.innerHTML;
        //need to filter out html tags
        text = text.replace(/<.*?>/g, "");
        $scope.speak(text);
    }
})


/*
            
            */
.controller('TrackCtrl', function ($scope, $ionicModal, $ionicPopup, $compile) {
    $scope.showTrackers = function () {
        var db = PouchDB('momlink');
        var checked = [];
        var date;
        //db call to all trackers if tracking element shows up today, add to array
        db.get('track').then(function (doc) {
            date = new Date(window.localStorage.getItem('currentDate'));
            date = (date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2)) + '/' + ('0' + date.getDate()).slice(-2);
            var hist = '';
            for (j in doc) {
                if (j != '_rev' && j != '_id' && j != 'pillHistory') {
                    elements = doc[j]
                    for (var i in elements) {
                        if (date == elements[i]["date"]) {
                            checked.push(j)
                            break;
                        }
                    }
                }
            }
        }).then(function () {
            var html5 = '<div class="row">';
            var col = 0;
            db.get('client_trackers').then(function (doc) {
                //need to first "sort" the dictionary
                var sortTrackers = Object.keys(doc).map(function (key) { return [key, parseInt(doc[key]['status']), parseInt(doc[key]['order'])] });
                sortTrackers.splice(-2, 2)
                sortTrackers = sortTrackers.sort(sortFunction)
                function sortFunction(a, b) {
                    if (a[2] === b[2]) {
                        return 0;
                    }
                    else {
                        return (a[2] < b[2]) ? -1 : 1;
                    }
                }

                for (var i in sortTrackers) {
                    if (sortTrackers[i][1] == 1) {
                        html5 += '<div class="col text-center">';
                        if ($.inArray(sortTrackers[i][0], checked) != -1) {
                            html5 += '<input type="image" src="../img/trackersGray/' + sortTrackers[i][0] + '.png" ng-click="goToHistory(&quot;add' + capitalizeFirstLetter(sortTrackers[i][0]) + '&quot;)" name="type" style="max-width:100%;height:auto;">';
                        }
                        else {
                            html5 += '<input type="image" src="../img/trackers/' + sortTrackers[i][0] + '.png" ng-click="goToHistory(&quot;add' + capitalizeFirstLetter(sortTrackers[i][0]) + '&quot;,&quot;' + date + '&quot;)" name="type" style="max-width:100%;height:auto;">';
                        }
                        html5 += '<p>' + capitalizeFirstLetter(sortTrackers[i][0].replace(/([A-Z])/g, ' $1').trim()) + '</p>';
                        html5 += '</div>';
                        col++;
                    }
                    if (col % 3 == 0) {
                        html5 += '</div>';
                        html5 += '<div class="row">';
                    }
                }
                while (col % 3 != 0) {
                    html5 += '<div class="col text-center">';
                    html5 += '</div>';
                    col++;
                }
            }).then(function () {
                html5 += '</div>'
                $('#trackers').html(html5);
                $compile($('#trackers'))($scope);
            })
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        })
    }
    $scope.formatDate = function (d) {
        var selectedDate = moment(d).format('MMMM Do YYYY')
        today = moment().format('MMMM Do YYYY')
        window.localStorage.setItem('currentDate', d)
        if (selectedDate == today) {
            selectedDate = "Today, ".concat(selectedDate);
        }
        return selectedDate;
    };
    $scope.increaseDate = function () {
        var d = new Date(window.localStorage.getItem('currentDate'));
        d.setDate(d.getDate() + 1)
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.decreaseDate = function () {
        var d = new Date(window.localStorage.getItem('currentDate'));
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
        else if (el == 'addPills') {
            var todaysPills = [];
            var currentDate = moment(window.localStorage.getItem('currentDate')).format('YYYY/MM/DD');
            db.get('track').then(function (doc) {
                var hist = '';
                pills = doc['pills'];
                //get pills to display today
                for (var i in pills) {
                    for (j in pills[i]['daysTaken']) {
                        if (String(window.localStorage.getItem('currentDate')).substring(0, 3) == pills[i]['daysTaken'][j]) {
                            for (k in pills[i]["timesTaken"]) {
                                time = pills[i]["timesTaken"][k];
                                todaysPills.push([pills[i]['id'], pills[i]['name'], time, pills[i]['dosage'], pills[i]['meal'], pills[i]['imagePath']])
                            }
                        }
                    }
                }
                for (var k in todaysPills) {
                    if (doc['pillHistory'][currentDate] != undefined) {
                        var pillTaken = false
                        if ($.inArray(String(todaysPills[k][0] + todaysPills[k][2]), doc['pillHistory'][currentDate]) != -1) {
                            pillTaken = true;
                            todaysPills[k].push(pillTaken)
                        }
                        else {
                            todaysPills[k].push(pillTaken)
                        }
                    }
                    else {
                        todaysPills[k].push(pillTaken)
                    }
                }
                if (todaysPills.length == 0) {
                    hist += '<div class="row">';
                    hist += '<div class="col text-center">';
                    hist += 'No Pills Today';
                    hist += '</div></div>';
                }
                else {
                    //sort pills in array by time
                    todaysPills = sortTimes(todaysPills);
                    //build string
                    var timeBorders = [['18:00', '6pm - 12am'], ['12:00', '12pm - 6pm'], ['06:00', '6am - 12pm'], ['00:00', '12am - 6am']]
                    for (m in todaysPills) {
                        var t = timeBorders.length
                        while (t--) {
                            pillTime = moment(todaysPills[m][2], 'HH:mm')
                            borderTime = moment(timeBorders[t][0], 'HH:mm')
                            if (pillTime.isSameOrAfter(borderTime)) {
                                hist += '<div class="item item-divider">' + timeBorders[t][1] + '</div>';
                                timeBorders.splice(t, 1);
                            }
                        }
                        pillTime = moment(String(currentDate + 'T' + todaysPills[m][2]), 'YYYY/MM/DDTHH:mm')
                        currentTime = moment();
                        if (todaysPills[m][6] == true) {
                            hist += '<div class="item item-thumbnail-left"><img src="../img/pills/checkmark.png" >';
                        }
                        else if (pillTime.isBefore(currentTime)) {
                            hist += '<div class="item item-thumbnail-left"><img src="../img/pills/questionmark.PNG" >';
                        }
                        else {
                            hist += '<div class="item item-thumbnail-left" ng-click="pillTaken(&quot;' + todaysPills[m][0] + '&quot;,&quot;' + todaysPills[m][2] + '&quot;,&quot;' + window.localStorage.getItem('currentDate') + '&quot;)">';
                            //check if image for pill exists
                            if (todaysPills[m][5] == '' || todaysPills[m][5] == null) {
                                hist += '<img src="../img/trackers/pills.png" >';
                            }
                            else {
                                hist += '<img src=' + todaysPills[m][5] + '>';
                            }
                        }
                        hist += '<h2 style="display:inline">' + todaysPills[m][1] + '</h2>';
                        hist += '<p>Take at ' + $scope.convert24to12(todaysPills[m][2]) + '</p>';
                        hist += '<p>Amount:  ' + todaysPills[m][3] + '</p>';
                        if (todaysPills[m][4] != undefined) {
                            hist += '<p>' + todaysPills[m][4] + '</p>';
                        }
                        hist += '</div>';
                    }
                    for (n in timeBorders) {
                        hist += '<div class="item item-divider">' + timeBorders[n][1] + '</div>';
                    }
                }
                $('#history').html(hist);
                $compile($('#history'))($scope);
            });
            function sortTimes(array) {
                return array.sort(function (a, b) {
                    if (parseInt(a[2].split(":")[0]) - parseInt(b[2].split(":")[0]) === 0) {
                        return parseInt(a[2].split(":")[1]) - parseInt(b[2].split(":")[1]);
                    } else {
                        return parseInt(a[2].split(":")[0]) - parseInt(b[2].split(":")[0]);
                    }
                })
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
                case 'addConditions':
                    type = 'conditions';
                    img = '';
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
                var date = new Date(window.localStorage.getItem('currentDate'));
                date = (date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2)) + '/' + ('0' + date.getDate()).slice(-2);
                var hist = '';
                elements = doc[type]
                for (var i in elements) {
                    if (date == elements[i]["date"]) {
                        value = elements[i]["value"];
                        //get images
                        if (type == 'stress') {
                            img = $scope.getStressImg(elements[i]["value"]);
                        }
                        if (type == 'activity') {
                            img = $scope.getActivityImg(elements[i]["type"]);
                        }
                        if (type == 'mood') {
                            img = $scope.getMoodImg(elements[i]["value"]);
                        }
                        //decode numeric values
                        if (type == 'activity') {
                            switch (value) {
                                case '1':
                                    value = 'Bike';
                                    break;
                                case '2':
                                    value = 'Clean';
                                    break;
                                case '3':
                                    value = 'Dance';
                                    break;
                                case '4':
                                    value = 'Exercise';
                                    break;
                                case '5':
                                    value = 'Run';
                                    break;
                                case '6':
                                    value = 'Shop';
                                    break;
                                case '7':
                                    value = 'Walk';
                                    break;
                                case '8':
                                    value = 'Walk Dog';
                                    break;
                            }
                        }
                        if (type == 'mood') {
                            switch (value) {
                                case '1':
                                    value = 'Bored';
                                    break;
                                case '2':
                                    value = 'Calm';
                                    break;
                                case '3':
                                    value = 'Cheerful';
                                    break;
                                case '4':
                                    value = 'Excited';
                                    break;
                                case '5':
                                    value = 'Irritated';
                                    break;
                                case '6':
                                    value = 'Neutral';
                                    break;
                                case '7':
                                    value = 'Relaxed';
                                    break;
                                case '8':
                                    value = 'Sad';
                                    break;
                                case '9':
                                    value = 'Tense';
                                    break;
                            }
                        }
                        if (type == 'stress') {
                            switch (value) {
                                case '1':
                                    value = 'Family/Relationships';
                                    break;
                                case '2':
                                    value = 'Housing';
                                    break;
                                case '3':
                                    value = 'Finances';
                                    break;
                                case '4':
                                    value = 'Domestic Violence';
                                    break;
                                case '5':
                                    value = 'Material Needs';
                                    break;
                            }
                        }
                        if (type == 'pain') {
                            switch (value) {
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
                        }
                        if (type == 'bloodPressure') {
                            value = elements[i]["systolic"] + "/" + elements[i]["diastolic"]
                        }
                        //add element
                        time = elements[i]["time"].substring(0, elements[i]["time"].length - 3);
                        hist += '<div class="item item-thumbnail-left" on-hold="deleteElement(&quot;' + type + '&quot;,&quot;' + elements[i]["id"] + '&quot;)"><img src="' + img + '">';
                        hist += '<h2 style="display:inline">' + value + '</h2>';
                        //<i class="icon ion-trash-a" ng-click="deleteElement(&quot;' + type + '&quot;,&quot;' + elements[i]["id"] + '&quot;)" style="display:inline; color:red"></i>
                        hist += '<p>Time: ' + $scope.convert24to12(time) + '</p></div>';
                    }
                }
                //if date has no values, then display default image
                if (hist == '') {
                    if (date == moment().format('YYYY/MM/DD')) {
                        hist += '<div class="row">';
                        hist += '<div class="col text-center">';
                        hist += '<img src="../img/temp/downArrow.png" style="height:auto;width:auto"/>'
                        hist += '</div></div>';
                    }
                    else {
                        hist += '<div class="row">';
                        hist += '<div class="col text-center">';
                        hist += '<p>No Records to Show</p>'
                        hist += '</div></div>';
                    }
                }
                $('#history').html(hist);
                $compile($('#history'))($scope);
            })
        };
    }
    $scope.pillTaken = function (id, time, date) {
        date = moment(date).format('YYYY/MM/DD');
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            if (doc['pillHistory'][date] == undefined) {
                doc['pillHistory'][date] = [String(id + time)]
            }
            else {
                doc['pillHistory'][date].push(String(id + time))
            }
            return db.put(doc);
        }).then(function () {
            $scope.loadHistory();
        })
    };
    $scope.getPillMealImg = function (type) {
        switch (type) {
            case 'withFood':
                return '../img/pills/withFood.jpg';
            case 'withoutFood':
                return '../img/pills/withoutFood.jpg';
            case 'beforeMeal':
                return '../img/pills/beforeMeal.png';
            case 'afterMeal':
                return '../img/pills/afterMeal.png';
        }
    };
    $scope.getActivityImg = function (type) {
        switch (type) {
            case '1':
                return '../img/activities/bike.png';
            case '2':
                return '../img/activities/clean.png';
            case '3':
                return '../img/activities/dance.png';
            case '4':
                return '../img/activities/exercise.png';
            case '5':
                return '../img/activities/run.png';
            case '6':
                return '../img/activities/shop.png';
            case '7':
                return '../img/activities/walk.png';
            case '8':
                return '../img/activities/walk_dog.png';
        }
    };
    $scope.getMoodImg = function (type) {
        switch (type) {
            case '1':
                return '../img/moods/1.png';
            case '2':
                return '../img/moods/2.png';
            case '3':
                return '../img/moods/3.png';
            case '4':
                return '../img/moods/4.png';
            case '5':
                return '../img/moods/5.png';
            case '6':
                return '../img/moods/6.png';
            case '7':
                return '../img/moods/7.png';
            case '8':
                return '../img/moods/8.png';
            case '9':
                return '../img/moods/9.png';
        }
    };
    $scope.getStressImg = function (type) {
        switch (type) {
            case '1':
                return '../img/stressors/family.png';
            case '2':
                return '../img/stressors/housing.png';
            case '3':
                return '../img/stressors/finances.png';
            case '4':
                return '../img/stressors/domestic.png';
            case '5':
                return '../img/stressors/material.png';
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
            countEl = parseFloat(countEl) + 1;
            $("#" + id).html(countEl);
        }
        if (pm == 'minus' && parseFloat(countEl) > 0) {
            if (parseFloat(countEl) == 0.5) {
                countEl = 0;
                $("#" + id).html(countEl);
            }
            else {
                countEl = parseFloat(countEl) - 1;
                $("#" + id).html(countEl);
            }
        }
    }
    $scope.plusMinusHalf = function (pm, id) {
        var countEl = $("#" + id).html();
        if (pm == 'plus') {
            countEl = parseFloat(countEl) + .5;
            $("#" + id).html(countEl);
        }
        if (pm == 'minus' && parseFloat(countEl) > 0) {
            countEl = parseFloat(countEl) - .5;
            $("#" + id).html(countEl);
        }
    }
    $scope.plusMinusTwo = function (pm, id) {
        var countEl = $("#" + id).html();
        if (pm == 'plus') {
            countEl = parseFloat(countEl) + 2;
            $("#" + id).html(countEl);
        }
        if (pm == 'minus' && parseFloat(countEl) > 0) {
            if (parseFloat(countEl) <= 1.5) {
                countEl = 0;
                $("#" + id).html(countEl);
            }
            else {
                countEl = parseFloat(countEl) - 2;
                $("#" + id).html(countEl);
            }
        }
    }
    $scope.clear = function (id, num) {
        $("#" + id).html(num);
    }
    var totalMinutes = $('#minute');
    totalHours = $('#hour');
    totalHours.value = 0;
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
                "date": moment().format('YYYY/MM/DD'),
                "time": moment().format('HH:mm:ss'),
                "type": $scope.selectAct,
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
                "date": moment().format('YYYY/MM/DD'),
                "time": moment().format('HH:mm:ss'),
                "value": value
            };
            doc[type].push(element);
            return db.put(doc);
        }).then(function (doc) {
            db.get('alerts').then(function (doc) {
                if (doc[type].length > 0) {
                    for (i in doc[type]) {
                        console.log(JSON.stringify(doc[type][i]))
                        if (doc[type][i]['type'] == ">") {
                            if (parseInt(value) > parseInt(doc[type][i]['value'])) {
                                $ionicPopup.alert({
                                    title: doc[type][i]['message']
                                });
                            }
                        }
                        else if (doc[type][i]['type'] == "<") {
                            if (parseInt(value) < parseInt(doc[type][i]['value'])) {
                                $ionicPopup.alert({
                                    title: doc[type][i]['message']
                                });
                            }
                        }
                        else if (doc[type][i]['type'] == "1") {
                            $ionicPopup.alert({
                                title: doc[type][i]['message']
                            });
                        }
                    }
                }
            }).then(function (doc) {
                $scope.toNewPage('history.html', 'History');
            })
        });
    }
    $scope.submitPain = function (type) {
        var db = PouchDB('momlink');
        var type;
        db.get('track').then(function (doc) {
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment().format('YYYY/MM/DD'),
                "time": moment().format('HH:mm:ss'),
                "value": document.getElementById('pain').value
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
                "date": moment().format('YYYY/MM/DD'),
                "time": moment().format('HH:mm:ss'),
                "systolic": $('#count').html(),
                "diastolic": $('#count2').html()
            };
            doc['bloodPressure'].push(element);
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
                "date": moment().format('YYYY/MM/DD'),
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
        var imagePath;
        db.get('track').then(function (doc) {
            var id = moment().format('MM-DD-YYYYThhmmssa');
            var daysTaken = [];
            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var dayIds = ['7', '1', '2', '3', '4', '5', '6'];
            for (i in days) {
                if (document.getElementById(days[i]).classList.contains('activeBorder')) {
                    daysTaken.push(days[i]);
                }
            }

            //reminders
            var reminder = 0;
            if ($("input[name=reminder]:checked").val() == 1) {
                reminder = 1;
            }
            //save image
            window.resolveLocalFileSystemURL(document.getElementById('pillImg').src, resolveOnSuccess, resOnError);
            function resolveOnSuccess(entry) {
                fileName = id + ".jpg";
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                    dir.getDirectory('MomLink', { create: true, exclusive: false },
                    function (directory) {
                        entry.moveTo(directory, fileName, successMove, resOnError);
                    }, resOnError);
                }, resOnError);
            }
            function successMove(entry) {
                imagePath = entry.toURL();
                var element = {
                    "id": id,
                    "date": moment().format('YYYY/MM/DD'),
                    "time": moment().format('HH:mm:ss'),
                    "name": $('#pillName').val(),
                    "dosage": $('#dosage').val(),
                    "meal": $scope.mealRestriction,
                    "timesTaken": $scope.pillTimes,
                    "daysTaken": daysTaken,
                    "reminder": reminder,
                    "imagePath": imagePath
                };
                doc['pills'].push(element);
                return db.put(doc).then(function (doc) {
                    if (reminder == 1) {
                        setAlerts();
                    }
                    $scope.toNewPage('history.html', 'History');
                });
            }
            function resOnError(error) {
                var element = {
                    "id": id,
                    "date": moment().format('YYYY/MM/DD'),
                    "time": moment().format('HH:mm:ss'),
                    "name": $('#pillName').val(),
                    "dosage": $('#dosage').val(),
                    "meal": $scope.mealRestriction,
                    "timesTaken": $scope.pillTimes,
                    "daysTaken": daysTaken,
                    "reminder": reminder,
                    "imagePath": imagePath
                };
                doc['pills'].push(element);
                return db.put(doc).then(function (doc) {
                    if (reminder == 1) {
                        setAlerts();
                    }
                    $scope.toNewPage('history.html', 'History');
                });
            }
            function setAlerts() {
                var timerID = '';
                var schedule = [];
                var uniqueID = 0;
                for (j in daysTaken) {
                    //isn't the same as dayIds
                    for (k in $scope.pillTimes) {
                        //build reminderTime for each reminder based on days and times
                        //reminderTime should be next closest instance based on weekday and time
                        //check if day has already passed this week
                        today = moment().isoWeekday();
                        //week
                        if (parseInt(today) == parseInt(decodeWeekday(daysTaken[j]))) {
                            //weekday has already passed
                            pillTime = moment($scope.pillTimes[k], 'HH:mm')
                            if (pillTime.isBefore(moment())) {
                                //same day missed time
                                reminderTime = moment().add(7, 'days').isoWeekday(decodeWeekday(daysTaken[j])).format("YYYY-MM-DDT")
                            }
                            else {
                                //same day time hasnt happened
                                reminderTime = moment().isoWeekday(decodeWeekday(daysTaken[j])).format("YYYY-MM-DDT")
                            }
                        }
                        else if (parseInt(today) > parseInt(decodeWeekday(daysTaken[j]))) {
                            //weekday has passed
                            reminderTime = moment().add(7, 'days').isoWeekday(decodeWeekday(daysTaken[j])).format("YYYY-MM-DDT")
                        }
                        else {
                            //weekday has not happened
                            reminderTime = moment().isoWeekday(decodeWeekday(daysTaken[j])).format("YYYY-MM-DDT")
                        }
                        reminderTime = reminderTime + String($scope.pillTimes[k]);
                        //timerID = $scope.decodeReminder(String(id + uniqueID));
                        timerID = uniqueID;
                        uniqueID++;
                        reminderTimeFinal = moment(reminderTime, "YYYY-MM-DDTHH:mm:ssZ").toDate();
                        console.log(reminderTimeFinal)
                        schedule.push({
                            id: timerID,
                            title: String($('#pillName').val()),
                            text: 'Time to take your pill.',
                            at: reminderTimeFinal,
                            every: 'week',
                        })
                    }
                }
                //schedule all
                document.addEventListener("deviceready", function () {
                    console.log(JSON.stringify(schedule))
                    cordova.plugins.notification.local.schedule(schedule);
                })
            }
            function decodeWeekday(day) {
                switch (day) {
                    case 'Sun':
                        return 7;
                    case 'Mon':
                        return 1;
                    case 'Tue':
                        return 2;
                    case 'Wed':
                        return 3;
                    case 'Thu':
                        return 4;
                    case 'Fri':
                        return 5;
                    case 'Sat':
                        return 6;
                }
            }
            //add alert for pill
            /*if ($scope.notify == true) {
                document.addEventListener('deviceready', function () {

                }, false);
            }*/
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }
    $scope.updatePill = function () {
        var db = PouchDB('momlink');
        var daysTaken = [];
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var reminder = 0;
        if ($("input[name=reminder]:checked").val() == 1) {
            reminder = 1;
        }
        var imagePath;
        //get/save image
        window.resolveLocalFileSystemURL(document.getElementById('pillImg').src, resolveOnSuccess, resOnError);
        function resolveOnSuccess(entry) {
            fileName = String($scope.pillID + ".jpg");
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
                dir.getDirectory('MomLink', { create: true, exclusive: false },
                function (directory) {
                    console.log(directory)
                    console.log(fileName)
                    entry.moveTo(directory, fileName, successMove, resOnError);
                }, resOnError);
            }, resOnError);
        }
        function successMove(entry) {
            console.log(entry.toURL())
            imagePath = entry.toURL();
            updatePill();
            console.log(imagePath)
        }
        function resOnError(error) {
            console.log(error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
            updatePill();
            console.log('ERROR')
        }
        function updatePill() {
            var i;
            db.get('track').then(function (doc) {
                //get pill
                for (i in doc['pills']) {
                    if (doc['pills'][i]['id'] === $scope.pillID) {
                        break;
                    }
                }
                //get days selected
                for (j in days) {
                    if (document.getElementById(days[j]).classList.contains('activeBorder')) {
                        daysTaken.push(days[j]);
                    }
                }
                console.log(doc['pills'][i]['name'])
                doc['pills'][i]['name'] = $('#pillName').val();
                doc['pills'][i]['dosage'] = $('#dosage').val();
                doc['pills'][i]['meal'] = $scope.mealRestriction;
                doc['pills'][i]['timesTaken'] = $scope.pillTimes;
                doc['pills'][i]['daysTaken'] = daysTaken;
                doc['pills'][i]['reminder'] = reminder;
                if (imagePath != null) {
                    doc['pills'][i]['imagePath'] = imagePath;
                }
                return db.put(doc);
            }).then(function (doc) {
                $scope.toNewPage('history.html', 'History');
            });
        }
    }
    $scope.renderPills = function () {
        var hist = '';
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            pills = doc['pills'];
            //add pill
            hist += '<div class="item item-icon-left" ng-click="goToAddPill()"><i class="icon ion-plus-round"></i>Add Pill</div>';
            //build string
            for (m in pills) {
                if (pills[m]['imagePath'] == '' || pills[m]['imagePath'] == null) {
                    hist += '<div class="item item-thumbnail-left" ng-click="goToEditPill(&quot;' + pills[m]['id'] + '&quot;)"><img src="../img/trackers/pills.png" >';
                }
                else {
                    hist += '<div class="item item-thumbnail-left" ng-click="goToEditPill(&quot;' + pills[m]['id'] + '&quot;)" on-hold="deleteElement(&quot;pills&quot;,&quot;' + pills[m]['id'] + '&quot;)"><img src=' + pills[m]['imagePath'] + '>';
                }
                hist += '<h2 style="display:inline">' + pills[m]['name'] + '</h2>';
                //hist += '<p>Take at ' + $scope.convert24to12(todaysPills[m][2]) + '</p>';
                hist += '<p>Amount:  ' + pills[m]['dosage'] + '</p>';
                if (pills[m]['meal'] != '' && pills[m]['meal'] != null) {
                    hist += '<p>' + pills[m]['meal'] + '</p>';
                }
                hist += '</div>';
            }
            if (hist == '') {
                hist += '<div class="row">';
                hist += '<div class="col text-center">';
                hist += 'No Pills Saved';
                hist += '</div></div>';
            }
            $('#listPills').html(hist);
            $compile($('#listPills'))($scope);
        })

    };
    $scope.pullPill = function () {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            for (i in doc['pills']) {
                if (doc['pills'][i]['id'] === $scope.pillID) {
                    break;
                }
            }
            document.getElementById('pillImg').src = doc['pills'][i]['imagePath'];
            $('#takePic').css('display', 'none')
            $('#pillName').val(doc['pills'][i]['name']);
            $('#dosage').val(doc['pills'][i]['dosage']);
            //populate times
            for (j in doc['pills'][i]['timesTaken']) {
                $scope.pillTimes.push(doc['pills'][i]['timesTaken'][j]);
            }
            $scope.renderPillTimes()
            //populate days taken
            for (k in doc['pills'][i]['daysTaken']) {
                $scope.selectDay(doc['pills'][i]['daysTaken'][k])
            }
            //meal restrictions
            if (doc['pills'][i]['meal'] != '') {
                $scope.mealRestriction = doc['pills'][i]['meal'];
            }
        });
    }
    $scope.togglePillReminder = function () {
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            for (i in doc['pills']) {
                if (doc['pills'][i]['id'] === $scope.pillID) {
                    break;
                }
            }
            if (doc['pills'][i]['reminder'] == 1) {
                $("input[name=reminder]").prop('checked', true);
            }
        });
    };
    $scope.renderPillTimes = function () {
        var timesHtml = '';
        var db = PouchDB('momlink');
        db.get('events').then(function (doc) {
            for (i in $scope.pillTimes) {
                timesHtml += '<div class="item item-icon-right">' + $scope.convert24to12($scope.pillTimes[i]) + '<i class="button-icon icon ion-close-round" ng-click="deletePillTime(&quot;' + $scope.pillTimes[i] + '&quot;)" style="color:red"></i></div>';
            }
            $('#times').html(timesHtml);
            $compile($('#times'))($scope);
        })
    };
    $scope.pillTimes = [];
    $scope.addTime = function () {
        $ionicPopup.show({
            template: '<input id="time" type="time" value="00:00:00">',
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
    $scope.pillRestrictionsDropDown = function () {
        $('#meal').css('display', '')
        $('#mealYes').css('display', 'none')
        $('#mealNo').css('display', '')
    };
    $scope.pillRestrictionsDropDownClose = function () {
        $('#meal').css('display', 'none')
        $('#mealYes').css('display', '')
        $('#mealNo').css('display', 'none')
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
                $scope.clickTracker('deleteElement(confirm)');
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
                    $scope.clickTracker('deleteElement(&quot;' + category + '&quot;)')
                    $scope.loadHistory();
                })
            }
        },
        {
            text: 'Cancel',
            onTap: function (e) {
                $scope.clickTracker('deleteElement(cancel)');
            }
        }
            ]
        });
        function resOnError(error) {
            //if (error.code != '1' && error.code != '5') {
            console.log(error.code);
            //}
        }
    };
    $scope.populateConditions = function () {
        var db = PouchDB('momlink');
        var html = '<a class="item" ng-click="addCondition()"><i class="ion-plus-round"></i> Add new condition to list</a>';
        db.get('conditionsList').then(function (doc) {
            sorted = doc['conditionsList'].sort()
            for (i in sorted) {
                //need to remove spaces and lower case ng-model parameter
                var model = '';
                model = String(sorted[i]).replace(/\s/g, '');
                model = model.replace(/[^a-zA-Z ]/g, "");
                html += '<ion-checkbox ng-model="condition.' + model + '" on-hold="deleteCondition(&quot;' + sorted[i] + '&quot;)">' + sorted[i] + '</ion-checkbox>';
            }
        }).then(function () {
            $('#conditionsList').html(html);
            $compile($('#conditionsList'))($scope);
        })
    }
    $scope.submitConditions = function () {
        var array = [];
        for (i in $scope.condition) {
            if ($scope.condition[i] == true) {
                array.push(i);
            }
        }
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            for (j in array) {
                var element = {
                    "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                    "date": moment().format('YYYY/MM/DD'),
                    "time": moment().format('HH:mm:ss'),
                    "value": array[j]
                };
                doc['conditions'].push(element);
            }
            return db.put(doc);
        }).then(function (doc) {
            $scope.toNewPage('history.html', 'History');
        });
    }

    $scope.addCondition = function () {
        $ionicPopup.show({
            template: '<input id="addCond" type="text">',
            title: 'Add condition',
            scope: $scope,
            buttons: [
              {
                  text: 'Add',
                  type: 'button-positive',
                  onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('conditionsList').then(function (doc) {
                          doc['conditionsList'].push($('#addCond').val());
                          return db.put(doc);
                      }).then(function () {
                          $scope.populateConditions();
                      })
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };

    $scope.deleteCondition = function (id) {
        $ionicPopup.show({
            title: 'Are you sure you want to delete this condition?',
            scope: $scope,
            buttons: [
              {
                  text: 'Delete',
                  type: 'button-assertive',
                  onTap: function (e) {
                      var db = PouchDB('momlink');
                      db.get('conditionsList').then(function (doc) {
                          for (i in doc['conditionsList']) {
                              if (doc['conditionsList'][i] == id) {
                                  doc['conditionsList'].splice(i, 1)
                                  //delete element
                                  break;
                              }
                          }
                          return db.put(doc);
                      }).then(function () {
                          $scope.populateConditions();
                      })
                  }
              },
              { text: 'Cancel' }
            ]
        });
    };

    $scope.renderGraph = function () {
        var db = PouchDB('momlink');
        var tracker = $scope.trackType
        var data2 = []
        tracker = tracker.substring(3, 90);
        title = tracker
        tracker = tracker.charAt(0).toLowerCase() + tracker.slice(1);
        console.log(tracker)
        db.get('track').then(function (doc) {
            for (i in doc[tracker]) {
                console.log(JSON.stringify(doc[tracker][i]))
                dict = {}
                dict['x'] = moment(doc[tracker][i]['id'], "MM-DD-YYYYThh:mm:ssa").toDate()
                dict['y'] = parseFloat(doc[tracker][i]['value'])
                data2.push(dict)
            }
            console.log(JSON.stringify(data2))
        }).then(function () {
            html = '<canvas id="myChart" width="500" height="500"></canvas>';
            $('#history').html(html);
            $compile($('#history'))($scope);

            var config = {
                type: 'line',
                data: {
                    datasets: [{
                        label: String(title.replace(/([A-Z])/g, ' $1').trim()),
                        backgroundColor: "rgba(75,192,192,0.1)",
                        borderColor: "rgba(75,192,192,1)",
                        pointBorderColor: "rgba(0,0,0,1)",
                        data: data2
                    }]
                },
                options: {
                    animation: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    'millisecond': 'MMM DD',
                                    'second': 'MMM DD',
                                    'minute': 'MMM DD',
                                    'hour': 'MMM DD',
                                    'day': 'MMM DD',
                                    'week': 'MMM DD',
                                    'month': 'MMM DD',
                                    'quarter': 'MMM DD',
                                    'year': 'MMM DD',
                                }
                            }
                        }],
                    },
                }
            };
            console
            console.log(JSON.stringify(config['data']['datasets']['data']))
            var ctx = document.getElementById("myChart").getContext("2d");
            new Chart(ctx, config);


        })



    }

    /*$scope.populateConditions = function () {
        var date = new Date($scope.currentDate);
        date = (date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2)) + '/' + ('0' + date.getDate()).slice(-2);
        var hist = [];
        var db = PouchDB('momlink');
        db.get('track').then(function (doc) {
            elements = doc['condition'];
            //get all condtions today that are already marked
            for (var i in elements) {
                if (date == elements[i]["date"]) {
                    hist.push(elements[i]["value"]);
                }
            }
            console.log(JSON.stringify(hist))
        }).then(function () {
            conditions = ['headache', 'fever', 'coughing']
            var html = '';
            for (var j in conditions) {
                if ($.inArray(conditions[j], hist) != -1) {
                    html += '<ion-checkbox ng-model="condition.' + conditions[j] + '" ng-checked="true">' + conditions[j] + '</ion-checkbox>';
                }
                else {
                    html += '<ion-checkbox ng-model="condition.' + conditions[j] + '">' + conditions[j] + '</ion-checkbox>';
                }
            }
            $('#conditions').html(html);
            $compile($('#conditions'))($scope);
        })
    }*/
})


/*
                
                */
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
        $scope.nutritionCircle('fruits', '3', '10');
        $scope.nutritionCircle('vegetables', '5', '10');
        $scope.nutritionCircle('proteins', '3', '10');
        $scope.nutritionCircle('grains', '6', '10');
        $scope.nutritionCircle('dairy', '3', '10');
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
                if (moment(window.localStorage.getItem('currentDate')).format('YYYY/MM/DD') == doc[id][i]['date']) {
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
            //draw star if min serving is reached
            if (size >= min && (id != 'sweets' && id != 'fats/oils')) {
                image.src = '../img/food/star.png';
                image.onload = function () {
                    ctx.drawImage(image, (bg.width / 2) / 2, (bg.height / 2) / 2, bg.width / 2, bg.height / 2);
                }
            }
            //draw crown if max serving is reached
            if (size >= max && (id != 'sweets' && id != 'fats/oils')) {
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
    $scope.popupNutrition = function (template) {
        first = $ionicPopup.show({
            title: 'What did you eat?',
            templateUrl: template,
            buttons: [
                {
                    text: 'Cancel', onTap: function (e) { },
                    type: 'button-stable',
                    scope: $scope
                }
            ],
        });
    }
    $scope.showAmount = function (category, subcategory, servingInfoImg, halfServingImg, wholeServingImg, extraServingImg) {
        //build template
        amountHTML = '<div class="row" ng-controller="TrackCtrl">';
        amountHTML += '<div class="col text-left no-padding" ng-controller="NutritionCtrl">';
        amountHTML += '<button class="button button-icon icon ion-information-circled" ng-click="servingPopup(&quot;' + servingInfoImg + '&quot;)"></button>';
        amountHTML += '</div>';
        amountHTML += '</div>';
        amountHTML += '<div class="row" ng-controller="TrackCtrl"><div class="col"><div class="col text-center">';
        amountHTML += '<div class="col text-right"><p id="count" style="font-size: 30px; line-height: 30px; display: inline-block;">0</p><p style="font-size: 30px; line-height: 30px; display: inline-block;">&nbsp;Serving(s)</p></div>';
        amountHTML += '</div></div></div>';
        amountHTML += '<div class="row" ng-controller="TrackCtrl">';
        var servings = [[halfServingImg, 'countHalf'], [wholeServingImg, 'countWhole']];
        for (i in servings) {
            amountHTML += '<div class="col text-center">';
            amountHTML += '<div class="col text-center"><img src="' + servings[i][0] + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;"/></div>';
            console.log(servings[i][0])
            amountHTML += '<div class="row">';
            if (servings[i][1] == 'countHalf') {
                amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinusHalf(\&quot;\minus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
                amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinusHalf(\&quot;\plus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
            }
            if (servings[i][1] == 'countWhole') {
                amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinus(\&quot;\minus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
                amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinus(\&quot;\plus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
            }
            amountHTML += '</div>';
            amountHTML += '</div>';
        }
        amountHTML += '</div>';
        if (extraServingImg != null) {
            amountHTML += '<div class="row" ng-controller="TrackCtrl">';
            amountHTML += '<div class="col text-center">';
            amountHTML += '<div class="col text-center"><img src="' + extraServingImg + '" style="display:block; max-width:100px; max-height:100px; width:auto; height:auto;"/></div>';
            amountHTML += '<div class="row">';
            amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/minus.png" id="minus" ng-click="plusMinusTwo(\&quot;minus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
            amountHTML += '<div class="col text-center"><img type="button" src="../img/temp/plus.png" id="minus" ng-click="plusMinusTwo(\&quot;plus\&quot;,\&quot;count\&quot;)" style="width:30px;height:30px;"></div>';
            amountHTML += '</div>';
            amountHTML += '</div>';
            //spacing for 4th serving
            amountHTML += '<div class="row"><div class="col"></div></div>';
        }
        $ionicPopup.show({
            template: amountHTML,
            title: 'How much?',
            buttons: [
              {
                  text: 'Save', onTap: function (e) {
                      $scope.saveAmount(category, subcategory);
                  },
                  type: 'button-positive'
              },
              {
                  text: 'Cancel', onTap: function (e) {
                      $scope.clickTracker('cancelAmount(' + category + ')');
                  },
                  type: 'button-positive'
              }
            ],

        });
        first.close();
    };
    $scope.saveAmount = function (category, subcategory) {
        $scope.clickTracker('saveAmount(' + category + ',' + subcategory + ')');
        var db = PouchDB('momlink');
        value = $('#count').html();
        db.get('nutrition').then(function (doc) {
            var double = 0;
            if ($('#countDouble').html() != null) {
                double = parseInt($('#countDouble').html()) * 2;
            }
            var element = {
                "id": moment().format('MM-DD-YYYYThh:mm:ssa'),
                "date": moment(window.localStorage.getItem('currentDate')).format('YYYY/MM/DD'),
                "time": moment().format('HH:mm:ss'),
                "category": category,
                "subcategory": subcategory,
                "value": value
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
        window.localStorage.setItem('currentDate', d);
        if (selectedDate == today) {
            selectedDate = "Today, ".concat(selectedDate);
        }
        return selectedDate;
    };
    $scope.increaseDate = function () {
        var d = new Date(window.localStorage.getItem('currentDate'));
        d.setDate(d.getDate() + 1)
        $('#todaysDate').html($scope.formatDate(d));
    };
    $scope.decreaseDate = function () {
        var d = new Date(window.localStorage.getItem('currentDate'));
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
                    if (moment(window.localStorage.getItem('currentDate')).format('YYYY/MM/DD') == doc[category][i]["date"]) {
                        html += '<center><div class="item" on-hold="deleteElement(&quot;' + category + '&quot;,&quot;' + doc[category][i]["id"] + '&quot;)">' + $scope.convert24to12(doc[category][i]["time"]) + '&nbsp; &nbsp; &nbsp; ' + doc[category][i]["value"] + ' servings</div></center>';
                    }
                }
                if (html == '') {
                    html += '<div class="col text-center" style="color:gray">No History to Show</div>';
                }
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
                                  if (moment(window.localStorage.getItem('currentDate')).format('MM/DD/YYYY') == doc[category][i]["date"]) {
                                      html += '<center><div class="item" on-hold="deleteElement(&quot;' + doc[category] + '&quot;,&quot;' + doc[category][i]["id"] + '&quot;)">' + $scope.convert24to12(doc[category][i]["time"]) + '&nbsp; &nbsp; &nbsp; ' + doc[category][i]["value"] + '</div></center>';
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
    $scope.servingInfo = function (image) {
        var template = '<ion-modal-view>';
        template += '<ion-header-bar align-title="middle" class="bar-positive">';
        template += '<button class="button button-icon icon ion-close-round" ng-click="closeModal();"></button>';
        template += '<h1 class="title" id="modalHeadline">Serving Size Information</h1>';
        template += '</ion-header-bar>';
        template += '<ion-content overflow-scroll="true">';
        template += '<img class="col no-padding" src="' + image + '" style="max-width=100%;max-height=auto%">';
        //template += `<img class="col no-padding" src="../img/servingInfo/infoFruit.png" style="max-width=100%;max-height=auto">`;
        template += '</ion-content>';
        template += '</ion-modal-view>';
        $scope.modal = $ionicModal.fromTemplate(template, {
            scope: $scope,
            animation: 'slide-in-up'
        })
        $scope.modal.show();
    }
    $scope.servingPopup = function (image) {
        var template = '<img class="col no-padding" src="' + image + '" style="max-width=100%;max-height=auto">';
        $ionicPopup.alert({
            title: 'Serving Info',
            template: template
        });
    }
})


/*
                Handler for javascript clock used in addActivityTime page
                */
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


.controller('SurveyCtrl', function ($scope, $ionicPopup, $ionicModal, $compile) {
    $scope.renderSurveys = function () {
        var db = PouchDB('momlink');
        var html = '<div class="list">';
        db.get('surveys').then(function (doc) {
            for (i in doc['surveys']) {
                if (doc['surveys'][i]['dateTaken'] == '') {
                    html += '<a class="item" ng-click="renderSurvey(&quot;' + doc['surveys'][i]['id'] + '&quot;)">' + doc['surveys'][i]['title'] + '</a>';
                    //html += '<a class="item" ng-click="renderSurvey(&quot;' + doc['surveys'][i]['id'] + '&quot;)">' + doc['surveys'][i]['title'] + ' <p> Given on: ' + doc['surveys'][i]['dateGiven'] + '</p></a>';
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
        db.get('surveys').then(function (doc) {
            for (i in doc['surveys']) {
                if (doc['surveys'][i]['dateTaken'] != '') {
                    html += '<a class="item">' + doc['surveys'][i]['title'] + ' <p> Taken on: ' + doc['surveys'][i]['dateGiven'] + '</p></a>';
                }
            }
            html += '</div>';
            $('#history').html(html);
            $compile($('#history'))($scope);
        })
    };
    $scope.renderSurvey = function (surveyID) {
        $scope.clickTracker('startSurvey');
        var db = PouchDB('momlink');
        var html = '<div ng-controller="HeaderCtrl">';
        db.get('surveys').then(function (doc) {
            for (i in doc['surveys']) {
                //get survey
                if (doc['surveys'][i]['id'] == surveyID) {
                    var formID = 0;
                    for (j in doc['surveys'][i]['content']) {
                        question = doc['surveys'][i]['content'][j][0];
                        answers = doc['surveys'][i]['content'][j][1];
                        //render question
                        html += '  <div class="item item-text-wrap item-icon-right item-divider">' + question + '<i class="icon ion-volume-medium" ng-click="speak(&quot;' + question + '&quot;)"></i></div>';
                        //render answers
                        html += '<form id="' + String(formID) + '">';
                        html += '<ion-list>';
                        for (k = 0; k < answers.length; k++) {
                            answer = answers[k][0];
                            answerID = answers[k][1];
                            html += '<div class="row no-padding"><ion-radio class="col-90 item-text-wrap" name="' + String(formID) + '" value="' + String(answerID) + '">' + answer + '</ion-radio><button class="col icon ion-volume-medium" ng-click="speak(&quot;' + answer + '&quot;)"></button></div>';
                        }
                        html += '</ion-list>';
                        html += '</form>';
                        formID++;
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
                    $scope.saveSurvey(surveyID);
                    $ionicPopup.alert({
                        title: 'Your answers have been recorded. Thank You!',
                    });
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
    $scope.saveSurvey = function (surveyID) {
        var db = PouchDB('momlink');
        db.get('surveys').then(function (doc) {
            for (i in doc['surveys']) {
                if (doc['surveys'][i]['id'] == surveyID) {
                    var formID = 0;
                    for (j in doc['surveys'][i]['content']) {
                        questionID = doc['surveys'][i]['content'][j][2]
                        selectedAnswer = $('input[name="' + String(formID) + '"]:checked', '#'.concat(formID)).val();
                        //prune all other answers != selectedAnswer
                        doc['surveys'][i]['responses'].push([questionID, selectedAnswer]);
                        console.log(questionID)
                        console.log(selectedAnswer)
                        doc['surveys'][i]['survey_status'] = '1';
                        formID++;
                    }
                    doc['surveys'][i]['dateTaken'] = moment().format('YYYY-MM-DD');
                    return db.put(doc)
                }
            }
        }).then(function () {
            $scope.renderSurveys();
            $scope.toNewPage('survey.html', 'Surveys')
        })
    };
})


/*
                
                */
.controller('CarePlanCtrl', function ($scope, $compile, $ionicPopup) {
    $scope.renderCareplan = function () {
        var db = PouchDB('momlink');
        var html = '<ion-list>';
        db.get('careplan').then(function (doc) {
            for (i in doc['careplan']) {
                html += '<div class="item item-checkbox item-icon-right item-text-wrap" ng-click="updateGoal(&quot;' + doc['careplan'][i]['id'] + '&quot;)">' + doc['careplan'][i]['goal'] + '<label class="checkbox">';
                if (doc['careplan'][i]['status'] == '1') {
                    html += '<input type="checkbox" name="G" checked></label></div>'
                }
                else {
                    html += '<input type="checkbox" name="G"></label></div>'
                }
            }
        }).then(function () {
            html += '</ion-list>';
            $('#careplan').html(html);
            $compile($('#careplan'))($scope);
        })
    }
    $scope.updateGoal = function (id) {
        var db = PouchDB('momlink');
        db.get('careplan').then(function (doc) {
            for (i in doc['careplan']) {
                if (doc['careplan'][i]['id'] == id) {
                    break;
                }
            }
            if (doc['careplan'][i]['status'] == '1') {
                doc['careplan'][i]['status'] = '0'
                doc['careplan'][i]['upload'] = '0'
            }
            else {
                doc['careplan'][i]['status'] = '1'
                doc['careplan'][i]['upload'] = '0'
            }
            return db.put(doc)
        })
    }
})


/*
                
                */
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
                displayDate = String(moment(displayStart).format('ddd MMM Do') + ' - ' + moment(displayStart.add(6, 'days')).format('ddd MMM Do'))
                displayStart.subtract(6, 'days');
                //highlight the current week
                if (displayStart <= today && displayStart.add(6, 'days') >= today) {
                    html += '<div class="col-33 text-center padding activeWeek" ng-click="renderGallery(&quot;' + displayDate + '&quot;,' + weekCounter + ')"><b>Week:</b> ' + weekCounter + '<br>' + displayDate + '</div>';
                }
                    //normal week
                else {
                    html += '<div class="col-33 text-center padding nonActiveWeek" ng-click="renderGallery(&quot;' + displayDate + '&quot;,' + weekCounter + ')"><b>Week:</b> ' + weekCounter + '<br>' + displayDate + '</div>';
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
        html = '<div class="bar bar-header"><button class ="button button-icon icon ion-reply" ng-click="renderPhotoJournal()"></button><div class ="title">' + displayDate + '</div></div>';
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
                            html += '<div class="col-33 photoJournalBorder"><image src="' + weeksPhotos[j] + '" ng-click="openFile(&quot;' + String(weeksPhotos[j]) + '&quot;)" style="max-width:100%;height:auto%;">'
                            html += '<button class="button button-small button-full button-positive" ng-click="shareImage(&quot;' + weeksPhotos[j] + '&quot;)">SHARE</button></div>';
                            if (colSpacer % 3 == 0) {
                                html += '</div><div class="row" style="padding-right:0; padding-left:0; padding-top:0">';
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
            }, resOnError);
        }, resOnError);
        function resOnError(error) {
            html += '<div class="col text-center">No photos to display</div>';
            html += '</div>';
            $('#photoJournal').html(html);
            $compile($('#photoJournal'))($scope);
            console.log(error.code);
        }
    };


    /*
    Opens a selected image in the photo gallery
    */
    $scope.openFile = function (file) {
        var open = cordova.plugins.disusered.open;
        function success() {
            console.log('Success');
        }
        function error(code) {
            if (code === 1) {
                console.log('No file handler found');
            } else {
                console.log('Undefined error');
            }
        }
        open(file, success, error);
    }


    /*
    User can share their select image across social media apps they have installed
    */
    $scope.shareImage = function (file) {
        console.log(file);
        window.plugins.socialsharing.share(null, null, file, null, null, null)
    }


    $scope.renderNotes = function () {
        var db = PouchDB('momlink');
        var html = '<div class="list">';
        db.get('journal').then(function (doc) {
            notes = doc['notes'];
            for (i in notes) {
                html += '<a class="item" ng-click="editNote(&quot;' + notes[i]['id'] + '&quot;)">';
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
                        html += '<a class="item" ng-click="editEventNotes(&quot;' + doc['events'][i]['id'] + '&quot;)">';
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
        $scope.clickTracker('editNote');
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
    /*$scope.showVisits = function () {
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
    };*/
})


/*
                
                */
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
            doc['name'] = $('#name').val();
            doc['email'] = $('#email').val();
            doc['age'] = $('#age').val();
            doc['deliveryDate'] = $('#delivery').val();
            doc['startDate'] = moment(moment($('#delivery').val()).subtract(9, 'months')).format('YYYY-MM-DD');
            doc['aboutMe'] = $('#about').val();
            doc['doctorsName'] = $('#dName').val();
            doc['doctorsEmail'] = $('#dEmail').val();
            doc['doctorsPhone'] = $('#dNumber').val();
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


/*
            
            */
.controller('SettingsCtrl', function ($scope, $ionicModal, $ionicPopup, $compile, $ionicListDelegate) {
    $scope.listTrackers = function () {
        var db = PouchDB('momlink');
        $scope.trackers = []
        $scope.moveItem = function (item, fromIndex, toIndex) {
            $scope.trackers.splice(fromIndex, 1);
            $scope.trackers.splice(toIndex, 0, item);
            db.get('client_trackers').then(function (doc) {
                for (var i in $scope.trackers) {
                    doc[$scope.trackers[i].id]['order'] = i
                }
                return db.put(doc);
            })
        };
        $scope.removeItem = function (item) {
            db.get('client_trackers').then(function (doc) {
                doc[item.id]['status'] = '0'
                return db.put(doc).then(function () {
                    $scope.toNewPage('settings.html', 'Settings')
                })
            })
        };

        $scope.addItem = function (item) {
            console.log(item)
            db.get('client_trackers').then(function (doc) {
                doc[item]['status'] = '1'
                return db.put(doc).then(function () {
                    $scope.toNewPage('settings.html', 'Settings')
                })
            })
        };

        db.get('client_trackers').then(function (doc) {
            //need to first "sort" the dictionary
            var sortTrackers = Object.keys(doc).map(function (key) { return [key, parseInt(doc[key]['status']), parseInt(doc[key]['order'])] });
            sortTrackers.splice(-2, 2)
            sortTrackers = sortTrackers.sort(sortFunction)
            function sortFunction(a, b) {
                if (a[2] === b[2]) {
                    return 0;
                }
                else {
                    return (a[2] < b[2]) ? -1 : 1;
                }
            }

            for (var i in sortTrackers) {
                if (sortTrackers[i][1] == 1) {
                    $scope.trackers.push({ 'id': sortTrackers[i][0], 'title': capitalizeFirstLetter(sortTrackers[i][0].replace(/([A-Z])/g, ' $1').trim()) })
                }
            }
        }).then(function () {
            var html5 = '<ion-list show-delete="data.showDelete=true" show-reorder="data.showReorder=true">';
            html5 += '<div class="item item-divider">Turn Off/Reorder Trackers</div>'
            html5 += '<ion-item ng-repeat="item in trackers">'
            html5 += '<h2>{{item.title}}</h2>';
            html5 += '<ion-delete-button class="ion-close-round"  on-tap="removeItem(item)"></ion-delete-button>'
            html5 += '<ion-reorder-button class="ion-navicon" on-reorder="moveItem(item, $fromIndex, $toIndex)"></ion-reorder-button>';
            html5 += '</ion-item>';
            html5 += '</ion-list>';

            db.get('client_trackers').then(function (doc) {
                var deadTrackers = []
                html5 += '<div class="item item-divider">Reactivate Trackers</div>';
                html5 += '<ion-list>';
                for (var i in doc) {
                    if (doc[i]['status'] == '0') {
                        html5 += '<ion-item ng-click=addItem("' + i + '")>'
                        html5 += '<h2>' + capitalizeFirstLetter(i.replace(/([A-Z])/g, ' $1').trim()) + '</h2>';
                        html5 += '</ion-item>';
                    }
                    html5 += '</ion-list>';
                }
            }).then(function () {
                $('#trackers').html(html5);
                $compile($('#trackers'))($scope);
            })

        })
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }


})


/*
                
                */
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
            $('#takePic').css('display', 'none')
        }
    }
    $scope.onFail = function (message) {
        if (message != 'Camera cancelled.') {
            alert('Failed because: ' + message);
        }
    }
})


/*
                Handler for popOver features
                */
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
})

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
                                    html += '<div class="col-33 text-center padding nonActiveWeek" ng-click="viewEvent(&quot;' + doc['goals'][i]['eventID'] + '&quot;,&quot;goals.html&quot;,&quot;Goals&quot;)" style="background-color: #528ef4; color:white;"><b>' + doc['goals'][i]['name'] + '<br><i class="icon ion-checkmark-round"></i></b></div>';
                                }
                                    //event has been registered
                                else if (doc['goals'][i]['eventID'] != '' && doc['goals'][i]['eventID'] != null) {
                                    html += '<div class="col-33 text-center padding nonActiveWeek" ng-click="viewEvent(&quot;' + doc['goals'][i]['eventID'] + '&quot;,&quot;goals.html&quot;,&quot;Goals&quot;)" style="background-color: #528ef4; color:white;"><b>' + doc['goals'][i]['name'] + '</b></div>';
                                }
                                    //event has not been started
                                else {
                                    if (doc['goals'][i]['type'] == 'class') {
                                        html += '<div class="col-33 text-center padding nonActiveWeek" ng-click="viewClasses(&quot;' + doc['goals'][i]['name'] + '&quot;,&quot;' + doc['goals'][i]['id'] + '&quot;)"><b>' + doc['goals'][i]['name'] + '</b></div>';
                                    }
                                    if (doc['goals'][i]['type'] == 'meet') {
                                        html += '<div class="col-33 text-center padding nonActiveWeek" ng-click="setGoalID(&quot;' + doc['goals'][i]['id'] + '&quot;);createEvent(&quot;goals.html&quot;, &quot;Goals&quot;);"><b>' + doc['goals'][i]['name'] + '</b></div>';
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
            html = '<div class="list">';
            for (var j in doc['goals'][i]['classes']) {
                html += '<div class="item item-button-right">' + j + '<button class="button button-small button-positive" ng-click="showInfo(&quot;' + id + '&quot;,&quot;' + name + '&quot;,&quot;' + doc['goals'][i]['classes'][j] + '&quot;,&quot;' + j + '&quot;)">View</button></div>';
            }
            html += '</div>';
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
        html2 = '<div class="list">';
        html2 += '<div class="item">Venue: ' + classInfo[0] + '</div>';
        html2 += '<div class="item">Time: ' + classInfo[1] + ' - ' + classInfo[2] + '</div>';
        html2 += '<div class="item">Instructor: ' + classInfo[3] + '</div>';
        html2 += '</div>';
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

})


*/