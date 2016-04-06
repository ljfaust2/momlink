document.write(
`<ion-pane>
<ion-subheader-bar class="bar bar-subheader">
    <h2 class="title" id="todaysDate"></h2>
    <script>
        var d = new Date(),
            date = d.getDate(),
            month = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",")[d.getMonth()];
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
    </script>
</ion-subheader-bar>`
);
