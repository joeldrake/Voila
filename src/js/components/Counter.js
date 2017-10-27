import React, { Component } from 'react';
import './../../css/Counter.css';

class Counter extends Component {

    render() {
      const loadedStrings = this.props.loadedStrings;
      const totalLength = loadedStrings.length;

      let index = 1;
      for(var i = 0, len = loadedStrings.length; i < len; i++) {
        if (loadedStrings[i].active === true) {
            index = i+1;
            break;
        }
      }
      
      return (
          <div className="counter">
            {index}/{totalLength}
          </div>
      );
    }
}

export default Counter;

