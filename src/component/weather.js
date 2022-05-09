import React, { Component } from 'react';
import axios from 'axios';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { BsFillCloudSunFill } from 'react-icons/bs'
export default class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: "",
            err: "",
            data: [],
            date: "",
            day: "",
            month: "",
            year: "",
            months: ""
        }
    }
    search = () => {
        let d = new Date()
        let months = ["January", "February", "March", "Apirl", "May", "June", "July", "Augest", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let day = days[d.getDay()];
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        if (this.state.city === "") {
            this.setState({ err: "Enter Valid City or State or Country!!!" })
            this.setState({ data: [] })
        }
        else {
            this.setState({ err: "" })
        }
        axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=d302f70fec6a1f60e02829a8cd79fdb8`)
            .then((res) => {
                console.log(res.data, "weather")
                this.setState({ data: res.data })
                this.setState({ day: day })
                this.setState({ month: month })
                this.setState({ year: year })
                this.setState({ date: date })
                // this.setState({months:months})
            })
            .catch(error => {
                // this.setState({ err: error.response.data.message })
                this.setState({ err: "Enter Valid City or State or Country!!!" })

            })
    }
    render() {
        console.log(this.state.city, 'city name')
        console.log(this.state.data.name, "response")
        console.log(this.state.data, "data")
        console.log(this.state.err, "error")
        return (
            <div className='weather-body '>
                <h1 className='head'>Weather Forecast</h1>
                <div className='weather-main-container'>
                    <div className='weather-container '>
                        <input type="text" className='form-control text' placeholder='Enter City or State or Country...' onChange={(e) => { this.setState({ city: e.target.value }) }}></input>
                        <button className='btn btn-success search-btn' onClick={this.search}>Search</button>
                    </div>
                    {this.state.data.name !== undefined && this.state.city !== "" && this.state.err === "" ?
                        < div className='weather-result'>
                            <div className='weather-content'>
                                <h2 className="city-name mt-1">{this.state.data.name} ({this.state.data.sys.country})</h2>
                                {/* <hr></hr> */}
                                <h3>{this.state.day}</h3>
                                <p>{this.state.date}/{this.state.month}/{this.state.year}</p>
                                <p className='wind-text'>Wind: {this.state.data.wind.speed} km/hr </p>
                                <div className='humidity'>
                                    <MdOutlineWaterDrop color="black" size="25px"></MdOutlineWaterDrop>
                                    <p className='wind-icon'>{this.state.data.main.humidity} %</p>
                                </div>
                            </div>
                            <div className='cloud-icon'>
                                <BsFillCloudSunFill size="200px"></BsFillCloudSunFill>
                                <h2 className='desc'>{this.state.data.weather[0].description}</h2>

                            </div>
                            <div className='weather-degree'>
                                <p className='degree-text'>{(this.state.data.main.temp - 273).toFixed(2)} &deg;C</p>
                            </div>
                        </div> :
                        <div className='error'>
                            <p className=''>{this.state.err}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
