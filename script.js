const coordinates = document.querySelector(".altitude");
const address = document.querySelector(".address");

const button = document.getElementById("get-location-button");
const detail = document.querySelectorAll(".detail");

let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "415d40009f3a412380055f022916d3be"; 


//api to get user address
const getUserCurrentAddress = async (latitude,longitude) => {

    let apiUrl = `${apiEndpoint}?q=${latitude}%2c${longitude}&key=${apiKey}`;

    try{
        const res = await fetch(apiUrl);
        const data = await res.json();
        // console.log(data.results[0]);

        const {suburb,state,postcode,country} = data.results[0].components;

        address.textContent = `${suburb}, ${state}, ${postcode}, ${country}`;

    } catch(error){
        console.log(error);
    }

};


button.addEventListener("click", async () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            const {latitude, longitude} = position.coords;
            coordinates.textContent = `Latitude : ${latitude} & Longitude : ${longitude}`;

            getUserCurrentAddress(latitude,longitude);
    
        },
        (error) => {
            console.error("User denied permission");
        }
        );

    }

    detail.forEach(function(detail) {
        detail.style.display = "block";


    });
    

});