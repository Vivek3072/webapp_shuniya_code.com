import React, { Component } from 'react'

export default class FilterOptions extends Component {
    changeOption=(type, e)=> {
        var val = e.target.value;
        this.props.changeOption(val, type);
      };
    render() {
        return (
            <div className="filter-options">
            <div className="filter-option">
              <label>Bender</label>
              <select id="bender" value={this.props.bender} onChange={this.changeOption.bind(this, 'bender')}>
              {this.props.benderOptions.map(function(option) {
                return ( <option key={option} value={option}>{option}</option> )
              })}
              </select>
              <label>Nation</label>
              <select id="nation" value={this.props.nation} onChange={this.changeOption.bind(this, 'nation')}>
              {this.props.nationOptions.map(function(option) {
                return ( <option key={option} value={option}>{option}</option> )
              })}
              </select>
              <label>Person</label>
              <select id="person" value={this.props.person} onChange={this.changeOption.bind(this, 'person')}>
              {this.props.personOptions.map(function(option) {
                return ( <option key={option} value={option}>{option}</option> )
              })}
              </select>
              <label>Show</label>
              <select id="show" value={this.props.show} onChange={this.changeOption.bind(this, 'show')}>
              {this.props.showOptions.map(function(option) {
                return ( <option key={option} value={option}>{option}</option> )
              })}
              </select>
            </div>
          </div>
        )
    }
}
