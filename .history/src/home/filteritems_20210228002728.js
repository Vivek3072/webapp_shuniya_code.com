import React, { Component } from 'react'

export default class filteritems extends Component {
    render() {
        return (
            <div>
                 <div className="filter-items">
      {this.props.data.map(function(item){
        return (
          <div className="filter-item">{item.name}</div>
        );
      })}
      </div>
            </div>
        )
    }
}
