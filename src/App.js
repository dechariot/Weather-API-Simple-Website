import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      locationName: null,
      isLoading: true
    }
  }

  currentWeather = async(lat, lon) => {
    const api_key = '7d64897e9b3a81212bc0bbb96a4b4bb0';

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    let response = await fetch(url);
    let data = await response.json();
    console.log('api result:', data);
    this.setState({
      locationName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      isLoading: false
    });
    console.log('locationName:', this.state.locationName,
    'temperature:', data.main.temp, 'description:', data.weather[0].description);
  }

  //getLocation() 
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {this.currentWeather(position.coords.latitude,position.coords.longitude)})
  }


  componentDidMount(){
    this.getLocation();
  }
  

  render(){
    return this.state.isLoading? (<h1 className="text-center my-5">Hey my friend! Let get a cup of coffee and waiting for get weather news</h1>) : (
      <div className="container-fluid my-auto text-white weather-widget">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 font-weight-bold">
              Weather API
            </h1>
            <h2 className="col-12">{this.state.locationName}</h2>
            <h3 className="col-12">{this.state.temperature}&#8451; / {this.state.temperature*9/5+32}&#8457; </h3>
            <h3 className="col-12" style={{textTransform: 'capitalize'}}>{this.state.description}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default App;