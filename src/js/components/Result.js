import React, { Component } from 'react';
import lang from './Lang';

class Result extends Component {
    render() {
        let loadedStrings = this.props.loadedStrings;
        
        const totalLength = loadedStrings.length;
        let totalScore = 0;

        let result = [];
        loadedStrings.forEach((element,i) => {
            if(element.correct === true) {
                totalScore++;
            }

            let addClass = '';
            if(element.userInput === '') {
                addClass = 'result_notdone';
            } else if(element.correct) {
                addClass = 'result_correct';
            } else {
                addClass = 'result_wrong';
            }

            result.push(
                <tr className={addClass} key={i+1}>
                    <td>{i+1}</td>
                    <td>{element.userInput}</td>
                    <td>{element.fr}</td>
                    <td>{element.sv}</td>
                </tr>
            );
        }, this);

        return (
            <div>
                <div className="total_result_string">
                    {totalScore} {lang.of} {totalLength} {lang.correct}
                </div>
                <button className="standard_button add_padding_to_tabel" onClick={this.props.restart}>{lang.restart}</button>
                <table className="result_table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{lang.you}</td>
                            <td>{lang.french}</td>
                            <td>{lang.swedish}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {result}
                    </tbody>
                </table>                
            </div>
        );

    }
}

export default Result;

