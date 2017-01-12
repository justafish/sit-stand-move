import React, {Component} from 'react';

class TimerSettings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sit: 20,
      stand: 8,
      move: 2,
    };

    this.onSitChange = this.onSitChange.bind(this);
    this.onStandChange = this.onStandChange.bind(this);
    this.onMoveChange = this.onMoveChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSitChange(event) {
    this.setState({
      sit: event.target.value,
    });
  }

  onStandChange(event) {
    this.setState({
      stand: event.target.value,
    });
  }

  onMoveChange(event) {
    this.setState({
      move: event.target.value,
    });
  }

  onSubmit(event) {
    this.props.submitHandler(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <div className="container-fluid">
            <label className="col-xs-3" htmlFor="setSitTime">Sit time (minutes)
              <input id="setSitTime" value={this.state.sit} type="number" className="form-control" onChange={this.onSitChange} />
            </label>
            <label className="col-xs-3" htmlFor="setStandTime">Stand time (minutes)
              <input id="setStandTime" value={this.state.stand} type="number" className="form-control" onChange={this.onStandChange} />
            </label>
            <label className="col-xs-3" htmlFor="setMoveTime">Move time (minutes)
              <input id="setMoveTime" value={this.state.move} type="number" className="form-control" onChange={this.onMoveChange} />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-default col-xs-3" onClick={this.onSubmit}>Save</button>
      </form>
    )
  }

}

TimerSettings.propTypes = {
  submitHandler: React.PropTypes.func.isRequired,
};

export default TimerSettings;
