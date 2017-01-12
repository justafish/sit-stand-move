import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Timer';
import TimerSettings from './components/TimerSettings';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ui: 'settings',
      settings: {
        sit: 20,
        stand: 8,
        move: 2,
      },
    };

    this.onSettingsChange = this.onSettingsChange.bind(this);
  }

  onSettingsChange(settings) {
    this.setState({
      settings: settings,
      ui: 'timer',
    });
  }

  render() {
    if (this.state.ui === 'timer') {
      return (
        <Timer sit={this.state.settings.sit} stand={this.state.settings.stand} move={this.state.settings.move} />
      );
    }
    else if (this.state.ui === 'settings') {
      return (
        <TimerSettings submitHandler={this.onSettingsChange} />
      )
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
