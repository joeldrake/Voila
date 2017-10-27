import React, { Component } from 'react';
import Counter from './Counter';
import Backside from './Backside';
import lang from './Lang';

class Card extends Component {

    /*
    handleCardBtnClick(btn) {
        const target = btn.currentTarget
        console.log(target);
        this.props.handleCardSubmit();
    }
    */

    render() {
      const loadedStrings = this.props.loadedStrings;
      const i = this.props.keyindex;
      const cheat = this.props.cheat;
      const done = loadedStrings[i].done;
      const active = loadedStrings[i].active;
      const in_line = loadedStrings[i].inLine;
      const flipped = loadedStrings[i].flipped;

      const currLang = lang.getLanguage();
      
      let string = '';
      let answer = '';
      if(currLang === 'fr') {
        string = loadedStrings[i].fr
        answer = loadedStrings[i].sv
      } else {
        string = loadedStrings[i].sv
        answer = loadedStrings[i].fr
      }

      let placeholder = '';
      if(!cheat){
        placeholder = lang.typeanswerhere;
      } else {
        placeholder = answer;
      }

      return (
          <div className={'card add_padding'+
            (active ? ' card_active' : '') +
            (in_line ? ' card_in_line' : '') +
            (flipped ? ' card_flipped' : '') +
            (done ? ' card_done' : '')
            }>
            <Counter {...this.props} />
              <Backside {...this.props}
                currLang={currLang}
                string={string}
                answer={answer}
              />
              <form onSubmit={this.props.handleCardSubmit} data-keyindex={i}>
              <div className="card_string">{string}</div>
                <div className="standard_wrapper standard_wrapper_input">
                    <input type="text" className="standard_input card_string_input" placeholder={placeholder} autoComplete="off" />
                </div>
                <div className="standard_wrapper standard_wrapper_button">
                    <button className="standard_button">{lang.send}</button>
                </div>
              </form>
          </div>
      );
    }
}

export default Card;

