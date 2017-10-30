import React, { Component } from 'react';
import lang from './Lang';
import Card from './Card';

class Cards extends Component {

    componentDidMount() {
        if(!localStorage.savedState || localStorage.savedState === ''){
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    this.props.loadUpNextCard(-1);
                });
            });
        }
    }

    render() {
        
        const loadedStrings = this.props.loadedStrings;
        const currLang = lang.getLanguage();
        let cards = []
        loadedStrings.forEach((element,i) => {
            cards.push(
              <Card {...this.props}
                  key={i}
                  keyindex={i}
                  currLang={currLang}
              />
            );
        }, this);
        
        return (
            <div>
                <div className="toggle_cheat">
                    <div className="apple_checkbox">
                        <input type="checkbox" checked={this.props.cheat} id="cheat_checkbox" onChange={this.props.toggleCheat} />
                        <label htmlFor="cheat_checkbox"></label>
                        <span className="apple_checkbox_text" state-name="cheat" onClick={this.props.checkboxTextClick}>{lang.help}</span>
                    </div>
                </div>
                <div className="show_result">
                    <button className="show_result_btn standard_button standard_button_mini" onClick={this.props.toggleShowResult}>
                    Stop
                    </button>
                </div>
                {cards}
            </div>
        );
    }
}

export default Cards;

