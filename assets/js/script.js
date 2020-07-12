
/* 
OBJECTIVES:
    - call in the function via html button click *
    - ajax call to the api resource (URL)
    - receive the response from the resource api
    - create several html elements 
    - populate the elements with jquery
    - 

    ---history objectives---
    - take search items from recent search
    - apply search item inside a small search archive
    - print out that search archive inside a small list
    - save that info inside local storage
    - create a listener for the history items
    -


    $.ajax({

        type: "GET",
        url: "www........"


    })



*/

// global variables
var userSearchEl = document.querySelector("#user-search");
var userInputEl = document.querySelector("#search-city");
var apiKey = "&appid=ecddcae668690a57c873375393f18153";
var weatherLink  = "http://api.openweathermap.org/data/2.5/weather?q=";
var imperialUnits = "&units=imperial";
var imgSrc = "http://openweathermap.org/img/w/";
var forecastLink = "http://api.openweathermap.org/data/2.5/forecast?q=";
//9:00 a.m


$(".past").on("click", "li", function() {
    searchWeather($(this).text());
  });


  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".past").append(li);
  }


// get the city name that was written

var citySearchHandler = function(event) {
    event.preventDefault();
    var city = userInputEl.value.trim();
    console.log(city);

    weatherPullHandler(city);
    forecastPullHandler(city);

};

var weatherPullHandler = function(city) {
  
    var weatherData = weatherLink + city + apiKey + imperialUnits;

    $.ajax({
        url:  weatherData,
        type: "GET",
        dataType: "json",
        success : function(data) {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            
            $("#current").empty;

            //current weather
            var name = $("<h4>").text(data.name + new Date().toLocaleDateString());
            var currentCard = $("<div>").addClass("card");
            var dayCardHead = $("<div>").addClass("card");
            var dayCardBody = $("<div>").addClass("card-body");
            var temperature = $("<p>").addClass("temperature").html(data.main.temp + "&degF;");
            
            var image = $("<img>").attr("src", imgSrc + data.weather[0].icon + ".png");

            
            dayCardHead.append(name);
            dayCardBody.append(temperature, image);
            console.log(currentCard);
            console.log($("#current"));
            currentCard.append(dayCardHead,dayCardBody);
            $("#current").append(currentCard);
            indexOfUV(lat,lon);



        }



            

    });




};

var forecastPullHandler = function(city) {

    var forecastData = forecastLink + city + apiKey + imperialUnits;

    $.ajax({
        type:"GET",
        url: forecastData,
        dataType: "json",
        success: function(results){
            console.log(results);
            var dates = [];
    // results is data from api
    for (var i = 0; i < results.list.length; i++) {
        var isNine = results.list[i]["dt_txt"].split(" ")[1].split(":")[0] == 09;
        if (isNine) {
        // populate with weather data from this object
            dates.push(results.list[i]);
        }
}
    console.log(dates);
    for (var i = 0; i < dates.length; i++) {
        var card =$("<div>");
        card.text(dates[i].main.temp);
        var fHumid = $("<p>").addClass("humidity");
        fHumid.text(dates[i].main.humidity + "%") 
        var fDate = $("<h5>");
        fDate.text(new Date(dates[i].dt_txt).toLocaleDateString());
        var fImg = $("<img>");
        fImg


        $("#future").append(fDate,card, fHumid);
        

        

        
    }




        }
    });
}

var indexOfUV = function(lat, lon) {

}



// call the functions
userSearchEl.addEventListener("click", citySearchHandler);

