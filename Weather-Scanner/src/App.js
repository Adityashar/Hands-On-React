import React from 'react';
import './App.css';
import Title from './Titles.js'
import Form from './Form.js'
import Weather from './weather.js'

class App extends React.Component {

  state = {
    temperature : undefined,
    city : undefined, 
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }

  getWeather = async(e) => {
    
    e.preventDefault();
    var key = "f54bca5d4f1506f9f5ab674e7ada150c"
    var country = e.target.elements.country.value
    var city = e.target.elements.city.value

    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`

    console.log(url);

    // fetch(url).then(res=>{
    //     res.json().then(data=>{
    //       this.setState({data})
    //     })
    // })

    const call = await fetch(url)
    const data = await call.json()
    console.log(data)

    if(city && country){
      this.setState({
        temperature : data.main.temp,
        city : data.name,
        country : data.sys.country,
        description : data.weather[0].description,
        humidity : data.main.description,
        error : ""
      })
    }else{
      this.setState({error : "Please Input the location !"})
    }


  }

  render (){
    return (
      <div >
        <Title />
        <Form loadWeather = {this.getWeather} />
        <Weather temperature = {this.state.temperature}
          city = {this.state.city}
          country = {this.state.country}
          description = {this.state.description}
          humidity = {this.state.humidity} 
          error = {this.state.error}/>
      </div>
    )
  }
}

export default App;
