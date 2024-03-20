let choosenCity ="";


let todayTemp = document.getElementById("todayTemp");
let city = document.getElementById("city");
let hi = document.getElementById("hi");
let lo = document.getElementById("lo");
let toDay = document.getElementById("toDay");
let day1 = document.getElementById("day1");
let day2 = document.getElementById("day2");
let day3 = document.getElementById("day3");
let day4 = document.getElementById("day4");
let day5 = document.getElementById("day5");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let d = new Date();
let day = days[d.getDay()];
toDay.innerText = day;
day1.innerText = days[d.getDay()+1];
day2.innerText = days[d.getDay()+2];
day3.innerText = days[d.getDay()+3];
day4.innerText = days[d.getDay()+4];
day5.innerText = days[d.getDay()+5];


document.getElementById("searchBar").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        choosenCity = searchBar.value;
        getCity(choosenCity)
    }
});

async function getCity(cityOfChoice){
    let apiResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityOfChoice+"&appid=090ba3b4cceb537314a314c7996068af&units=imperial").then(Response => Response.json());
    city.innerText = apiResponse.name;
    hi.innerText = "hi: " + apiResponse.main.temp_max + " °F";
    lo.innerText = "lo: " + apiResponse.main.temp_min + " °F";
    todayTemp.innerText = apiResponse.main.temp +"°F";
    
    console.log(apiResponse);
}
