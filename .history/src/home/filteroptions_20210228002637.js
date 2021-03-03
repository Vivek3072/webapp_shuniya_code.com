import React, { Component } from 'react'

export default class filteroptions extends Component {
    changeOption=(type, e)=> {
        var val = e.target.value;
        this.props.changeOption(val, type);
      },
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
