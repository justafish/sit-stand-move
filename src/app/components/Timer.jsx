import React from 'react';
import format from 'date-fns/format';

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
      new Notification(this.state.states[this.nextState()]);
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
    this.setState({start: null, elapsed: null})
  }
  timeToNextState() {
    return (this.props[this.state.states[this.state.currentState]] * 60000) - this.state.elapsed;
  }
  nextState() {
    return this.state.currentState + 1 >= this.state.states.length ? 0 : this.state.currentState + 1;
  }
  render() {
    return (
      <div className="timer">
        {this.state.start ?  <button onClick={() => this.stopTimer()}>Stop</button> : <button onClick={() => this.startTimer()}>Start</button>}
        {this.state.states[this.nextState()]} in {format(this.timeToNextState(), 'm[m] s[s]')}
      </div>
    );
  }
}

export default Timer;
