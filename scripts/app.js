let choosenCity ="";
let faveCityAPI = [];
let favArr = [];
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
let firstCardTemp = document.getElementById("firstCardTemp");
let secondCardTemp = document.getElementById("secondCardTemp");
let thirdCardTemp = document.getElementById("thirdCardTemp");
let fourthCardTemp = document.getElementById("fourthCardTemp");
let fifthCardTemp = document.getElementById("fifthCardTemp");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let d = new Date();
let day = days[d.getDay()];
toDay.innerText = day;
day1.innerText = days[d.getDay()+1];
day2.innerText = days[d.getDay()+2];
day3.innerText = days[d.getDay()+3];
day4.innerText = days[d.getDay()+4];
day5.innerText = days[d.getDay()+5];

//Event Listener for search bar
document.getElementById("searchBar").addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        choosenCity = searchBar.value;
        getCity(choosenCity)
    }
});


//Save function 
saveBtn.addEventListener("click", function(){
    let obj = {
        "faveCityName" : faveCityAPI.name
    }
    console.log(obj)

    favArr.push(obj);
    console.log(favArr);
    
    localStorage.setItem("favorites", JSON.stringify(favArr));
    console.log(localStorage);

    let colDiv = document.createElement("div");
    colDiv.classList = "col"; 
    let pTag = document.createElement("p");
    pTag.innerText = faveCityAPI.name; 
    pTag.addEventListener("click", function(){
        getCity(pTag.innerText);
    });
    colDiv.appendChild(pTag);
    favorites.appendChild(colDiv);
});


// Delete Button 
deleteBtn.addEventListener("click", function(){
    for(let i = 0; i < favArr.length; i++){
        if(city.innerText === favArr[i].faveCityName){
            // remove 1 element starting at the current index
            favArr.splice(i, 1);
            // remove the element from the page
            let colDiv = favorites.getElementsByClassName("col")[i];
            favorites.removeChild(colDiv);
        }
    }
    localStorage.setItem("favorites", JSON.stringify(favArr));
    console.log(favArr);
    console.log(localStorage);
});



//async function to get information from Weather API
async function getCity(cityOfChoice){
    let apiResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityOfChoice+"&appid=090ba3b4cceb537314a314c7996068af&units=imperial").then(Response => Response.json());
    city.innerText = apiResponse.name;
    hi.innerText = "hi: " + apiResponse.main.temp_max + " °F";
    lo.innerText = "lo: " + apiResponse.main.temp_min + " °F";
    todayTemp.innerText = apiResponse.main.temp +"°F";
    console.log(apiResponse);
    fiveDayForecast(apiResponse.name);
    faveCityAPI = apiResponse;
};


//function for 5 day forecast
async function fiveDayForecast(dailyCity){
    let apiResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q="+dailyCity+"&appid=090ba3b4cceb537314a314c7996068af&units=imperial").then(Response => Response.json());
    
    console.log("Im in the fiveDayForecast Function");
    firstCardTemp.innerText = apiResponse.list["6"].main.temp;
    secondCardTemp.innerText = apiResponse.list["12"].main.temp;
    thirdCardTemp.innerText = apiResponse.list["18"].main.temp;
    fourthCardTemp.innerText = apiResponse.list["24"].main.temp;
    fifthCardTemp.innerText = apiResponse.list["30"].main.temp;

    console.log(apiResponse);
    console.log(firstCardTemp);
}


