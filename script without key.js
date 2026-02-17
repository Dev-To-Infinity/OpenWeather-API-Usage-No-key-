const search = document.getElementById("search");
search.addEventListener("input", () => geoLocator(search.value));
let currCityArr = null;
let currCity = null;

const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        currCityArr = JSON.parse(this.responseText);
        let rowContainerContent = "";
        for(let i = 0; i < currCityArr.length; i++) {
            const city = currCityArr[i];
            rowContainerContent += 
            `<div class="row" data-index=${i}>${city.state}</div>
            <div class="row" data-index=${i}>${city.name}</div>`
        }
        document.getElementById("rows_container").innerHTML = rowContainerContent;
        onclickEventAttacher(document.getElementsByClassName("row"));
    }
}

const xmlhttpWeather = new XMLHttpRequest();
xmlhttpWeather.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
    }
}

function geoLocator(input) {
    xmlhttp.open("GET", `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=!KEY!`);
    xmlhttp.send();
}

function onclickEventAttacher(rowArr) {
    for (const div of rowArr) {
        div.addEventListener("click", () => placeHolder(div.dataset.index));
    }
}

function placeHolder(id) {
    currCity = currCityArr[id];
    xmlhttpWeather.open("GET", `https://api.openweathermap.org/data/2.5/forecast?&lat=${currCity.lat}&lon=${currCity.lon}&appid=!KEY!`);
    xmlhttpWeather.send();
}