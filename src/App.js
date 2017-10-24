import React, { Component } from 'react';
import lang from './js/components/Lang';
import string from './js/components/String';
import SelectLang from './js/components/SelectLang';
import Card from './js/components/Card';
import './App.css';

class App extends Component {

  constructor() {
    super();
    const browserLang = navigator.language.substring(0, 2);
    console.log(browserLang);
    this.state = {
      lang: browserLang,
    };
  }

  updateLang(newLang) {
    if(newLang){
      lang.setLanguage(newLang);
      string.setLanguage(newLang);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="site add_padding">
        <header className="site_header">
          <SelectLang updateLang={this.updateLang.bind(this)} />
          <h1 className="site_title">Voila!</h1>
        </header>
        <div className="site_main">
          <Card updateLang={this.updateLang.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
