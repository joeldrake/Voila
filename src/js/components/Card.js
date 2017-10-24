import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import lang from './Lang';
import string from './String';
import './../../css/Card.css';

class Card extends Component {


    handleCardBtnClick(btn) {
        const target = btn.currentTarget
        console.log(target);
    }

    render() {
      return (
          <div className="card add_padding">
              <div>lang: {lang.hello}</div>
              <div>string: {string.s1}</div>
              <br />
              <div className="standard_wrapper standard_wrapper_input">
                  <input type="text" className="standard_input" />
              </div>
              <div className="standard_wrapper standard_wrapper_button">
                  <button className="standard_button" onClick={this.handleCardBtnClick.bind(this)}>Svara</button>
              </div>
          </div>
      );
    }
}

export default Card;

