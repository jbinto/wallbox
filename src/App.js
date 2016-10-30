import React, { Component } from 'react';
import moment from 'moment'
import './App.css';
import getPredictionsAndLocation, {
  STOPS,
  EASTBOUND_PREFIX,
  WESTBOUND_PREFIX
} from './get_predictions'
import Map from './Map'
import Overlay from './Overlay'
import Predictions from './Predictions'

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
    setInterval(this.updatePredictions.bind(this), 30*1000)
  }

  updateLastUpdated() {
    // console.log(this.state)
    const lastUpdated = this.state.lastUpdated
    this.setState({ lastUpdatedMessage:
      `${moment().diff(lastUpdated, 'seconds')}s ago`
    })
  }

  async updatePredictions() {
    for (const stop of STOPS) {
      const { predictions, location } = await getPredictionsAndLocation(stop.url)
      console.log(location)
      this.setState({ [`prediction${stop.code}`]: predictions })
      this.setState({ [`location${stop.code}`]: location })
      this.setLastUpdated()
    }
  }

  setLastUpdated() {
    this.setState({ lastUpdated: moment() })
  }

  // formatPredictions(predictions) {
  //   if (predictions == null) return '?'
  //   const minutes = predictions.map(p => `${p.minutes}m`)
  //   return minutes.join(', ')
  // }

  render() {
    return (
      <div style={{ width: 480, height: 320, overflow: 'hidden', position: 'relative' }}>
        {/* Absolute positioned layout, omg no stop */}
        <Overlay styles={{ top: 0, left: 0 }}>
          {STOPS[0].name}
        </Overlay>
        <Overlay styles={{ top: 0, left: 238 }}>
          {STOPS[1].name}
        </Overlay>
        <Overlay styles={{ bottom: 0, left: 0 }}>
          <Predictions predictions={this.state.predictionE} />
        </Overlay>
        <Overlay styles={{ bottom: 0, left: 238 }}>
          <Predictions predictions={this.state.predictionW} />
        </Overlay>

        <Overlay styles={{ bottom: 0, right: 0, width: 60, height: 20, fontSize: '0.5em' }}>
          {this.state.lastUpdatedMessage}
        </Overlay>

        {/* Worst possible way to draw a vertical line. */}
        <Overlay styles={{ left: 238, top: 0, width: 2, height: 320, backgroundColor: 'black' }} />

        <div style={{ position: 'absolute', left: 0 }}>
          <Map
            location={this.state.locationE}
            expectedPrefix={EASTBOUND_PREFIX}
            eastPrefix={EASTBOUND_PREFIX}
            westPrefix={WESTBOUND_PREFIX}

          />
        </div>
        <div style={{ position: 'absolute', left: 238 }}>
          <Map
            location={this.state.locationW}
            expectedPrefix={WESTBOUND_PREFIX}
            eastPrefix={EASTBOUND_PREFIX}
            westPrefix={WESTBOUND_PREFIX}
          />
        </div>
      </div>
    )
  }
}

export default App
