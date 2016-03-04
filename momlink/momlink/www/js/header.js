document.write(
'<ion-header-bar align-title="middle" class="bar-positive" ng-controller="HeaderBarController">' +
    '<div class="buttons">' +
        '<button class="button button-icon icon ion-ios-home" ng-click="home()"></button>' +
    '</div>' +
    '<h1 class="title">MomLink</h1>' +
    '<div class="buttons">' +
        '<button class="button button-icon icon ion-navicon-round" ng-click="toggleTopMenu()"></button>' +
    '</div>' +
'</ion-header-bar>' +
'<ion-top-menu class="text-center has-header">' +
    '<ion-content overflow-scroll="false">' +
        '<div class="row">' +
            '<div class="col"><img src="../img/buttons/btn-04.png" ng-click="mail()" style="width:75px;height:75px;vertical-align:middle" alt="Mail"><p>Mail</p></div>' +
            '<div class="col"><img src="../img/buttons/btn-05.png" ng-click="calendar()" style="width:75px;height:75px;vertical-align:middle" alt="Calendar"><p>Calendar</p></div>' +
            '<div class="col"><img src="../img/buttons/btn-06.png" ng-click="communities()" style="width:75px;height:75px;vertical-align:middle" alt="Communities"><p>Communities</p></div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col"><img src="../img/buttons/btn-08.png" ng-click="track()" style="width:75px;height:75px;vertical-align:middle" alt="Track"><p>Track</p></div>' +
            '<div class="col"><img src="../img/buttons/btn-07.png" ng-click="coupons()" style="width:75px;height:75px;vertical-align:middle" alt="Coupons"><p>Coupons</p></div>' +
            '<div class="col"><img src="../img/buttons/btn-09.png" ng-click="content()" style="width:75px;height:75px;vertical-align:middle" alt="Communities"><p>Content</p></div>' +
        '</div>' +
        '<div class="row">' +
            '<div class="col"></div>' +
            '<div class="col"><img src="../img/buttons/btn-12.png" ng-click="myProfile()" style="width:75px;height:75px;vertical-align:middle" alt="My Profile"><p>My Profile</p></div>' +
            '<div class="col"><img src="../img/buttons/btn-11.png" ng-click="logout()" style="width:75px;height:75px;vertical-align:middle" alt="Logout"><p>Logout</p></div>' +
        '</div>' +
    '</ion-content>' +
'</ion-top-menu>');
