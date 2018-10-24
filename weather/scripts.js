function getInfo(){
   $.ajax({
       url: "https://api.openweathermap.org/data/2.5/weather?q=provo&appid=cc8ef8e5c209d938ab3801daa42b5e31&units=imperial",
       type: "GET",
       success: function(data, status){
           console.log(data);
           console.log(status);
           $('#weather').html(`<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"/><h2>${data.weather[0].main}</h2><p>${data.weather[0].description}</p><p>Current Temperature: ${data.main.temp}°F</p>`)
       },
   });
}