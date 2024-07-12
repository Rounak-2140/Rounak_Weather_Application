import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';
// https://open-meteo.com/#:~:text=Open%2DMeteo%20is%20an%20open,You%20can%20use%20it%20immediately!
// https://api.open-meteo.com/v1/forecast?latitude=28.66672&longitude=77.21671&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m

function App() {


  const apiKey="88e5d461c60b4f6a7f170de7cb1a8074"
  const [inputCity,setinputCity]=useState("")
  const[data,setData]=useState({})
  const [detail,setInfo]=useState({})
  let hourlyData=[];

  const getWeatherHourlyDailyInfo=(lat,long)=>{
    const apiNewUrl = "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"
    axios.get(apiNewUrl).then((res)=>{
      // console.log("response2",res.data.hourly.temperature_2m)
      hourlyData = [res.data.hourly.temperature_2m[14],res.data.hourly.temperature_2m[15],res.data.hourly.temperature_2m[16],res.data.hourly.temperature_2m[17],res.data.hourly.temperature_2m[18]];
      setInfo(hourlyData);
      console.log(hourlyData);

    }).catch((err) => {
      console.log("Err",err)
    })
  }
  const getWeatherDetails=( cityName) =>{
    if(!cityName) return
    const apiURL="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey
    axios.get(apiURL).then((res)=>{
      console.log("response",res.data)
      getWeatherHourlyDailyInfo(res.data.coord.lat,res.data.coord.lon);
      setData(res.data)

    }).catch((err) => {
      console.log("Err",err)
    })
  }
  const handlechangeinput=(e)=>{
    console.log("value",e.target.value)
    setinputCity(e.target.value)
  }
  


  const handleSearch = ()=>{
    getWeatherDetails(inputCity)
  }

  var currentdate = new Date();
var currentDate = currentdate.getDate() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear();
var currentTime =  currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();



  
  return (
    <div className="col-md-12">
      <div className="weatherbg">
      <h1 className="heading" >Know About Your City </h1>
        <h1 className="heading" >Weather App</h1>



       <div className="d-grid gap-3 col-4 mt-4">
       <input type="text" className="form-control" 
        value={inputCity}
        onChange={handlechangeinput}/>
        <button className="btn btn-primary"type="button"
        onClick={handleSearch}
        >Search</button>
       </div>
       

      </div>


      {Object.keys(data).length>0 &&

         <div className="col-md-12 text-center mt-5" style={{'backgroundSize': 'cover','backgroundImage': 'url("https://st.depositphotos.com/1074550/2952/i/450/depositphotos_29522159-stock-photo-abstract-pastel-pink-and-white.jpg")'}}>


        <div className="shadow rounded weatherResultBox">

         <img className="weatherIcon"
          src="https://static01.nyt.com/images/2014/12/11/technology/personaltech/11machin-illo/11machin-illo-superJumbo-v3.jpg?quality=75&auto=webp" alt="xyz"/>
            <h3 className="weatherCity">{data?.name}</h3>
            <h4 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h4>
            <h5 className="Disc">Min.temp : {((data?.main?.temp_min)- 273.15).toFixed(2)}°C<br/>
            Max.temp : {((data?.main?.temp_max)- 273.15).toFixed(2)}°C
            </h5>
            <p>{currentDate}</p>
            <p>{currentTime}</p>
            
           
        </div><br/>

        


            
        <div className="col-md-12" style={{display: 'inline-flex'}}>
              <div className="col-md-4">
              <img className="weatherIcon weatherCommonImg" style={{}}
          src="https://i0.wp.com/dictionaryblog.cambridge.org/wp-content/uploads/2018/07/day-orig.jpg?resize=300%2C200&ssl=1" alt="xyz"/>
              <h1 className="Info">latitude :{data?.coord?.lat} <br/>
              longitude :{data?.coord?.lon}</h1>
           
              </div>
              <div className="col-md-4">
              <img className="weatherIcon weatherCommonImg"
          src="https://i.pinimg.com/736x/d2/32/9f/d2329fdbe5c72d21b12dce3b334dce14.jpg" alt="xyz"/>
               <h1 className="Info">Sunrise :{new Date(data?.sys?.sunrise*1000).toString()}<br/>
               Sunset :{new Date((data?.sys?.sunset)*1000).toString()}</h1>
           
              </div>
              <div className="col-md-4">
              <img className="weatherIcon weatherCommonImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEvjRi5NScdbU4M7tlNU7jdlbsEF6cG_cNVg&usqp=CAU" alt="xyz"/>
              <p>
              Weather : {typeof data?.weather !== "undefined" ? data?.weather[0]?.main : ''}
              <br/>
              Description : {typeof data?.weather !== "undefined" ? data?.weather[0]?.description : ''}
              </p>

              
              </div>
              
            </div>
            <hr className="my-2" />
            <div className="row">
            <h5>Hourly Forecast</h5>
           
              
             
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">4:00 PM</p>
                <img src="https://images.freeimages.com/images/large-previews/6e5/sunrise-on-the-sea-beach-1634814.jpg" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">{detail[0]} °C</p>
              </div>
            
          
             
              
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">5:00 PM</p>
                <img src="https://images.freeimages.com/images/large-previews/6e5/sunrise-on-the-sea-beach-1634814.jpg" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">{detail[1]} °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">6:00 PM</p>
                <img src="https://images.freeimages.com/images/large-previews/6e5/sunrise-on-the-sea-beach-1634814.jpg" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">{detail[2]} °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">7:00 PM</p>
                <img src="https://images.freeimages.com/images/large-previews/6e5/sunrise-on-the-sea-beach-1634814.jpg" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">{detail[3]} °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">8:00 PM</p>
                <img src="https://images.freeimages.com/images/large-previews/6e5/sunrise-on-the-sea-beach-1634814.jpg" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">{detail[4]} °C</p>
              </div>
            </div>


            <hr className="my-2" />
            <div className="row">
            <h4>Daily Forecast</h4>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">Wednesday</p>
                <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">28.82 °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">Thursday</p>
                <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">27.24 °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">Friday</p>
                <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">29.67 °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">Saturday</p>
                <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">28.98 °C</p>
              </div>
              <div className="col-sm text-black">
                <p className="text-light text-sm text-black">Sunday</p>
                <img src="https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" height="100" width="100" alt="xyz"/>
                <p className="text-light text-sm text-black">29.05 °C</p>
              </div>
              
            </div>
       </div>

}
    </div>
  );
}

export default App;
