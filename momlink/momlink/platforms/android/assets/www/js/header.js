function header(title) {
    document.write(
    `<ion-header-bar align-title="middle" class="bar-positive" ng-controller="HeaderBarController">
        <div class="buttons">
            <button class="button button-icon icon ion-ios-home" ng-click="home()"></button>
        </div>
        <h1 class="title">` + title + `</h1>
        <div class="buttons">
            <button class="button button-icon icon ion-navicon-round" ng-click="toggleTopMenu()"></button>
        </div>
    </ion-header-bar>
    <ion-top-menu class="text-center has-header">
        <ion-content overflow-scroll="false">
            <div class ="row">
                <div class ="col"><a href="inbox.html"><img src="../img/mainIcons/momlink_icon-16.png" style="width:75px;height:75px;vertical-align:middle" alt="Mail"></a><p>Mail</p></div>
                <div class ="col"><a href="calendar.html"><img src="../img/mainIcons/momlink_icon-17.png" style="width:75px;height:75px;vertical-align:middle" alt="Calendar"></a><p>Calendar</p></div>
                <div class ="col"><a href="referrals.html"><img src="../img/mainIcons/momlink_icon-18.png" style="width:75px;height:75px;vertical-align:middle" alt="Referrals"></a><p>Referrals</p></div>
            </div>
            <div class ="row">
                <div class ="col"><a href="track.html"><img src="../img/mainIcons/momlink_icon-19.png" style="width:75px;height:75px;vertical-align:middle" alt="Track"></a><p>Track</p></div>
                <div class ="col"><a href="coupons.html"><img src="../img/mainIcons/momlink_icon-20.png" style="width:75px;height:75px;vertical-align:middle" alt="Coupons"></a><p>Coupons</p></div>
                <div class ="col"><a href="education.html"><img src="../img/mainIcons/momlink_icon-21.png" style="width:75px;height:75px;vertical-align:middle" alt="Education"></a><p>Education</p></div>
            </div>
            <div class ="row">
                <div class ="col"><a href="journal.html"><img src="../img/mainIcons/momlink_icon-22.png" style="width:75px;height:75px;vertical-align:middle" alt="Notes"></a><p>Journal</p></div>
                <div class ="col"><a href="myProfile.html"><img src="../img/mainIcons/momlink_icon-23.png" style="width:75px;height:75px;vertical-align:middle" alt="My Profile"></a><p>My Profile</p></div>
                <div class ="col"><img src="../img/mainIcons/momlink_icon-24.png" ng-click="logout()" style="width:75px;height:75px;vertical-align:middle" alt="Logout"><p>Logout</p></div>
            </div>
        </ion-content>
    </ion-top-menu>`);
}
