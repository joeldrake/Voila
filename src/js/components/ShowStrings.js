import React, { Component } from 'react';
import strings from './Strings';
import lang from './Lang';

class ShowStrings extends Component {

    render() {
            
        let renderedData = strings.map((string, i) => {
            return (
                <tr key={i+1}>
                    <td>{i+1}</td>
                    <td>{string.sv}</td>
                    <td>{string.fr}</td>
                </tr>
            );
        });
/*
        let strings = [];
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
*/

        return (
            <div>
                <table className="result_table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{lang.swedish}</td>
                            <td>{lang.french}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedData}
                    </tbody>
                </table>                
            </div>
        )
    }
}

export default ShowStrings;

