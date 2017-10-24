import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import lang from './Lang';
import string from './String';
import './../../css/SelectLang.css';

class SelectLang extends Component {

    constructor() {
        super();
        this.state = {
            choose_lang_open: false,
        };
      }

    toggleLangDropdown(btn) {
        const target = btn.currentTarget;
        const newLang = target.getAttribute('data-lang');
        const choose_lang_open = this.state.choose_lang_open;
        this.setState({
            choose_lang_open: !choose_lang_open
        });
    }

    langBtnClick(btn) {
        const target = btn.currentTarget;
        const newLang = target.getAttribute('data-lang');
        this.props.updateLang(newLang);

        this.setState({
            choose_lang_open: false
        });
    }

    render() {
      const currLang = lang.getLanguage();
      const choose_lang_open = this.state.choose_lang_open;
      return (
          <div className={
            this.state.choose_lang_open ? 'select_lang select_lang_open' : 'select_lang'
          }>

              <button className="current_lang" onClick={this.toggleLangDropdown.bind(this)}>{currLang}</button>

              <div className="choose_lang">
                <button className={
                    currLang === 'sv' ? 'choose_lang_btn choose_lang_btn_active' : 'choose_lang_btn'
                } data-lang="sv" onClick={this.langBtnClick.bind(this)}>Svenska</button>
                <button className={
                    currLang === 'fr' ? 'choose_lang_btn choose_lang_btn_active' : 'choose_lang_btn'
                } data-lang="fr" onClick={this.langBtnClick.bind(this)}>Franska</button>
              </div>
          </div>
      );
    }
}

export default SelectLang;
