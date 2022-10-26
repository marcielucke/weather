
// element variables

var searchInput = $('#city-input');
var searchButton = $('#search-btn');
var historyList = $('#search-history-list');
var clearButton = $('#clear-history');
var currentWeather = $('#weather-content');
var currentCity = $('#current-city');
var currentTemp = $('#current-temp');
var currentHumidity = $('#current-humidity');
var currentWind = $('#current-wind-speed');
const weatherIconUrl = 'http://openweathermap.org/img/wn/';
var APIkey ="023691b4ae03c9d9485d831b220c21a4";
var search= "";

//data list
var cityList = [];

// search for city 

function find(aCity){
  for (var i=0; i<cityList.length; i++){
      if(aCity.toUpperCase()===catalogue[i]){
          return -1;
      }
  }
  return 1;
}
//get current date 

var currentDate = moment().format('L');
$("#current-date").text("" + currentDate + "");


//Displays the current and future weather to the user after the city from the search box
function weatherDetails(event){
  event.preventDefault();
  if (searchInput.val().trim()!==""){
      city=searchInput.val().trim();
      weatherInfo(city);
  }
}


// function to call API
//creating a function for grabbing our weather data!
function weatherInfo(city){
  //Enetering in url for current weather!
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIkey;
  var currentDate = moment().format('L');
  $.ajax({
      url:requestUrl,
      method:"GET",
  }).then(function(response){
      console.log(response);
      // Getting the icon from API server
      var icon= response.weather[0].icon;
      var iconURL="https://openweathermap.org/img/wn/"+icon +"@2x.png";
      //add all the data together for current city 
      $(currentCity).html(response.name + " " + currentDate + " <img src="+iconURL+">");
      // tempature, wind, and humidity
      var farenheit= (((response.main.temp-273.5)*1.80)+32).toFixed(0) + "°F";
      $(currentTemp).html(farenheit);
      $(currentHumidity).html(response.main.humidity);
      $(currentWind).html(response.wind.speed) + "%";
    

      forecast(response.id);
      if(response.cod==200){
          cityList=JSON.parse(localStorage.getItem("city name", ));
          console.log(cityList);
          if (cityList==null){
              cityList=[];
              cityList.push(city.toUpperCase()
              );
              localStorage.setItem("city name",JSON.stringify(cityList));
              
          }
          else {
              if(find(city)>0){
                  catalogue.push(city.toUpperCase());
                  localStorage.setItem("city name",JSON.stringify(cityList));
                  addToList(city);
              }
          }
      }
  })
} 

$("#search-btn").on("click",weatherDetails);

  //
  

   // create function to call 5 day forecast api

   // save search to search history

   //



  //local storage

  /*function saveCity (city) {

  

  localStorage.setItem('current city', city);
  $('#city-input').value = localStorage.getItem('city name');
  }; */