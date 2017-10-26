import React, { Component } from 'react';
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
      const keyindex = this.props.keyindex;
      const userInput = this.props.userInput;
      const string = this.props.string;
      const answer = this.props.answer;
      const done = this.props.done;
      const active = this.props.active;
      const in_line = this.props.in_line;
      const flipped = this.props.flipped;
      const correct = this.props.correct;
      const wrong = this.props.wrong;
      return (
          <div className={
            'card add_padding'+
            (active ? ' card_active' : '') +
            (in_line ? ' card_in_line' : '') +
            (flipped ? ' card_flipped' : '') +
            (done ? ' card_done' : '')
            }>
            <div className={
                'card_answer card_correct'+
                (correct ? '' : ' hidden')
            } onClick={this.props.loadUpNextCard} data-keyindex={keyindex}>
                <div className="card_string">
                    <div className="card_answer_string card_answer_string_correct">"{userInput}"</div>
                    <div className="card_answer_string_emoji">😘👌</div>
                    {string}<br />
                    =<br />
                    {answer}
                </div>
            </div>
            <div className={
                'card_answer card_wrong'+
                (wrong ? '' : ' hidden')
            } onClick={this.props.loadUpNextCard} data-keyindex={keyindex}>
                <div className="card_string">
                    <div className="card_answer_string card_answer_string_wrong">{userInput}</div>
                    <div className="card_answer_string_emoji">😵</div>
                    {string}<br />
                    =<br />
                    {answer}
                </div>
            </div>
              <form onSubmit={this.props.handleCardSubmit} data-keyindex={keyindex}>
              <div className="card_string">{string}</div>
                <div className="standard_wrapper standard_wrapper_input">
                    <input type="text" className="standard_input card_string_input" placeholder={lang.typeanswerhere} autoComplete="off" />
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

