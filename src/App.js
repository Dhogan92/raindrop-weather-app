import React from "react";
import Title from "./components/title";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "YOUR_API_KEY";

class App extends React.Component {
  state = {

    temperature: undefined,

    city: undefined,

    country: undefined,

    humidity: undefined,

    description: undefined,

    error: undefined

  }

  getWeather = async (e) => {
// prevents page from refreshing (Essential for single page apps)
    e.preventDefault();
//retrieves input from form
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

//Grabs information from API
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
//Where weather information is stored
    const data = await api_call.json();
//checks to see if City and Country have values
    if(city && country) {

//Updates the values with new data from request
    this.setState({

      temperature: data.main.temp,

      city: data.name,

      country: data.sys.country,

      humidity: data.main.humidity,

      description: data.weather[0].description,

      error: ""

    });

  } else {
    this.setState({

      temperature: undefined,

      city: undefined,

      country: undefined,

      humidity: undefined,

      description: undefined,

      error: "Please enter a location"

    });
    }
  }
  render() {
    return (
        <div>
          <div className="wrapper">
            <div className="main">
              <div className="container">
                <div className="row">
                  <div className="col-xs-6 title-container">
                    <Title />
                  </div>
                  <div className="col-xs-6 form-container">
                    <Form getWeather = {this.getWeather} />
                    <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      country={this.state.country}
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}


          

export default App;
