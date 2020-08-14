window,addEventListener("load",() => {
    let longitude;
    let latitude;
    let tempdesc=document.querySelector(".temperature-description");
    let tempdegree=document.querySelector(".temperature-degree"); 
    let locationTimezone=document.querySelector(".location-timezone"); 
    let tempspan = document.querySelector(".temperature span");
    let tempsection = document.querySelector(".temperature");

    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=> {
                longitude=position.coords.longitude;
                latitude=position.coords.latitude;

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`
               
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data=>{
                console.log(data);// shows all the weather informatin from the api
                const {temperature,summary,icon} = data.currently;// takes the temp and summary from api 
                //DOM  elemeents from api
                tempdegree.textContent=temperature; // displays the temperature from api to webpage
                tempdesc.textContent=summary;// displays the description     from api to webpage
                locationTimezone.textContent=data.timezone;// displays the timezone from api to webpage

                //changing temp formula
                let celcius = (temperature -32) * (5/9);

                //set Icon
                setIcon(icon,document.querySelector('.icon'))//function call that displays icon based on weather description 

                //change temp
                tempsection.addEventListener("click", ()=>{
                        if(tempspan.textContent === "F"){
                            tempspan.textContent = "C"
                            tempdegree.textContent=Math.floor(celcius);
                        }else{
                            tempspan.textContent="F";
                            tempdegree.textContent= temperature;
                        }
                });

            }); 
            });

            
     }//else{
    //     h1.textContent="Enable location"
    // }
   function setIcon(icon,iconID){
       const skycons = new Skycons({color:"white"});// create object for icons
       const currentIcon = icon.replace(/-/g,"_").toUpperCase();//rename icons so they can be used in function call
        //(replacing spaces with underscores and converting to upper case) according to the skycon documentation at https://darkskyapp.github.io/skycons/
       
        skycons.play();//playing icons
       return skycons.set(iconID, Skycons[currentIcon]);// return icons object and its name
   } 
});