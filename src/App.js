import React, { Component } from 'react';
import moment from 'moment'
import './App.css';


const stops = [
  { name: 'W', url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/10133/predictions' },
  { name: 'E', url: 'http://restbus.info/api/agencies/ttc/routes/85/stops/9322/predictions' },
]

// const getPrediction = async (url) => {
//   const data = await fetch(url)
//   return data
// }


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lastUpdated: moment().subtract(100000, 'days')
    }
  }

  componentWillMount() {
    this.updateLastUpdated()
    this.updatePredictions()
  }

  componentDidMount() {
    setInterval(this.updateLastUpdated.bind(this), 1000)
    setInterval(this.updatePredictions.bind(this), 60*1000)
  }

  updateLastUpdated() {
    console.log(this.state)
    const lastUpdated = this.state.lastUpdated
    this.setState({ lastUpdatedMessage:
      lastUpdated.fromNow()
    })
  }

  updatePredictions() {
    stops.forEach((stop, index) => {
      fetch(stop.url)
        .then(response => response.json())
        .then(json => json[0])
        .then(data => {
          console.log(data)
          const prediction = data['values'].map((v) => (
            {
              minutes: v.minutes,
              seconds: v.seconds,
              vehicle_id: v.vehicle.id,
              title: v.direction.title,
            }
          ))
          this.setState({ [`prediction${index}`]: prediction })

          // bug: timers aren't independent
          this.setState({ lastUpdated: moment() })
        })
    })
  }

  renderPredictions(predictions) {
    if (predictions == null) return '?'
    const minutes = predictions.map(p => `${p.minutes}m`)
    return minutes.join(', ')
  }

  lastUpdated() {
    return this.state.lastUpdated.fromNow()
  }

  render() {
    return (
      <div className="App">
        <p>WEST: {this.renderPredictions(this.state.prediction0)}</p>
        <p>EAST: {this.renderPredictions(this.state.prediction1)}</p>
        <p className="small">Last updated {this.state.lastUpdatedMessage}</p>
      </div>
    );
  }
}

export default App;
