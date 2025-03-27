document.addEventListener('DOMContentLoaded', function () {

   const cityInput= document.getElementById('city-input');
   const getWeather= document.getElementById('get-weather-btn');
    const weatherInfo= document.getElementById('weather-info');
    const cityNameDisplay= document.getElementById('city-name');
    const temperatureDisplay= document.getElementById('temperature');
    const descriptionDisplay= document.getElementById('description');
    const errorMessage= document.getElementById('error-message');

 
const API_KEY='959bc98649dfda21c25058d963421c97';  //env variable

getWeather.addEventListener('click', async function(){
const city=cityInput.value.trim();
if(!city) return;
          
try {
    const weatherData=  await fetchWatherData(city);   //to use await function needs to be async  you cnnot use in all function
   displayWeatherData(weatherData);
   cityInput.value='';
   } catch (error) {
       showError();
   }
   

});


//server may throw error
//server/database is always in another continent


async function fetchWatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
       
             const response=   await  fetch(url);
                console.log(typeof response);
                console.log("RESPONSE",response);
 if(!response.ok){
    throw new error('City not found');

 }
            const data= await      response.json();
            return data;


}


function displayWeatherData(weatherData){
console.log(weatherData);

const{main,name,weather}=weatherData;
cityNameDisplay.textContent=name;
temperatureDisplay.textContent= `Temperature: ${main.temp}°C`;
descriptionDisplay.textContent=`Description : ${weather[0].description}`


    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
}

function showError(){
weatherInfo.classList.add('hidden');
errorMessage.classList.remove('hidden');
}




});
















