import React from 'react';
import format from 'date-fns/format';
import path from 'path';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      states: ['sit', 'stand', 'move'],
      currentState: 0,
      start: null,
      elapsed: 0
    };
  }
  tick() {
    if (this.timeToNextState() <= 0) {
      // Change state.
      new Notification(this.getNextStateTitle(), {
        icon: path.join('icons', this.state.states[this.nextState()] + '.png')
      });
      this.setState({
        currentState: this.nextState(),
        start: Date.now(),
        elapsed: 0
      });
    }
    else {
      this.setState({elapsed: Date.now() - this.state.start});
    }
  }
  startTimer() {
    this.setState({start: Date.now()}, () => {
      this.timer = setInterval(this.tick.bind(this), 1000);
    });
  }
  stopTimer() {
    clearInterval(this.timer);
    this.setState({currentState: 0, start: null, elapsed: null})
  }
  timeToNextState() {
    let time = (this.props[this.state.states[this.state.currentState]] * 60000) - this.state.elapsed;
    return time >= 0 ? time : 0;
  }
  nextState() {
    return this.state.currentState + 1 >= this.state.states.length ? 0 : this.state.currentState + 1;
  }
  getNextStateTitle() {
    let state = this.state.states[this.nextState()];
    state = state.charAt(0).toUpperCase() + state.slice(1);

    return state;
  }
  render() {
    return (
      <div className="timer container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="panel-title">
                  {this.state.start ?  <button type="button" className="btn btn-danger btn-lg" onClick={() => this.stopTimer()}>Stop</button> : <button type="button" className="btn btn-success btn-lg" onClick={() => this.startTimer()}>Start</button>}
                </div>
              </div>
              <div className="panel-body">
                <h4>{this.getNextStateTitle()} in {format(this.timeToNextState(), 'm[m] s[s]')}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timer;
