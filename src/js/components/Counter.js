import React, { Component } from 'react';
import './../../css/Counter.css';

class Counter extends Component {

    render() {

      const loadedString = this.props.loadedString;
      const totalLength = loadedString.length;

      let index = 1;
      for(var i = 0, len = loadedString.length; i < len; i++) {
        if (loadedString[i].active === true) {
            index = i+1;
            break;
        }
      }

      const cardsRunning = this.props.cardsRunning;
      return (
          <div className={
            'counter'+
            (!cardsRunning ? ' hidden' : '')
            }
          >
            {index}/{totalLength}
          </div>
      );
    }
}

export default Counter;

