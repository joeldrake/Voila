import React, { Component } from 'react';
import lang from './Lang';
import ShowStrings from './ShowStrings';

class Intro extends Component {
    render() {
        return (
            <div className="intro">
                <p>
                    {lang.intro}<br />
                    {lang.pushToStart}
                </p>
                <br />
                <button className="standard_button add_padding_to_tabel" onClick={this.props.runCards}>
                    {lang.start}
                </button>
                <div className="apple_checkbox">
                    <input type="checkbox" checked={this.props.random} id="cheat_checkbox" onChange={this.props.toggleRandom} />
                    <label htmlFor="cheat_checkbox"></label>
                    <span className="apple_checkbox_text" state-name="random" onClick={this.props.checkboxTextClick}>{lang.random}</span>
                </div>
                <p>
                    {lang.chooseifrandom}
                </p>
                <hr />
                <p>
                    {lang.belowistheloadedwords}
                </p>
                <ShowStrings {...this.props} />
            </div>
        );
    }
}

export default Intro;

