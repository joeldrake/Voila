import React, { Component } from 'react';

class Backside extends Component {
    render() {
        const loadedStrings = this.props.loadedStrings;
        const i = this.props.keyindex;
        const userInput = loadedStrings[i].userInput;
        const correct = loadedStrings[i].correct;
        const wrong = loadedStrings[i].wrong;
        
        const string = this.props.string
        const answer = this.props.answer


        let emoji;
        if(userInput === '') {
            emoji = <span role="img" aria-label="no answer">🤔</span>;
        } else if(correct) {
            emoji = <span role="img" aria-label="correct">😘👌</span>;
        } else {
            emoji = <span role="img" aria-label="wrong">😵</span>;
        }

        return (
            <div className={'card_answer'+
                (correct ? ' card_correct' : '')+
                (wrong ? ' card_wrong' : '')+
                (!correct && !wrong ? ' hidden' : '')
            } onClick={this.props.loadUpNextCard} data-keyindex={i}>
                <div className="card_string">
                    <div className="card_answer_string">{userInput}</div>
                    <div className="card_answer_string_emoji">
                        {emoji}
                    </div>
                    {string}<br />
                    =<br />
                    {answer}
                </div>
            </div>
        );
    }
}

export default Backside;

