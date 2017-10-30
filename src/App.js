import React, { Component } from 'react';
import lang from './js/components/Lang';
import strings from './js/components/Strings';
import SelectLang from './js/components/SelectLang';
import Intro from './js/components/Intro';
import Cards from './js/components/Cards';
import Result from './js/components/Result';
import './css/SelectLang.css';
import './App.css';
import './css/Card.css';
import './css/AppleCheckBox.css';

class App extends Component {

  constructor() {
    super();

    const browserLang = navigator.language.substring(0, 2);
    lang.setLanguage(browserLang);

    let firstState = {};
    if(localStorage.savedState && localStorage.savedState !== ''){
      firstState = JSON.parse(localStorage.savedState);
    } else {
      const loadedStrings = this.loadDefaultStrings();
      firstState = {
        animationTime: 300,
        cardsRunning: false,
        showResult: false,
        cheat: false,
        random: false,
        loadedStrings: loadedStrings
      }
    }

    this.state = firstState;
  }

  saveState() {
    const currentState = JSON.stringify(this.state);
    localStorage.savedState = currentState;
    console.log('State saved');
  }

  clearSavedState() {
    localStorage.savedState = '';
    console.log('Stored state cleared');
  }

  shuffleStrings(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  loadDefaultStrings() {

    //let loadedStrings = [];
    
    //make sure that there is a new array
    const loadedStrings = [...strings];

    loadedStrings.forEach(function(element,i) {

      //make sure that there is a new object inside the array
      loadedStrings[i] = Object.assign({}, strings[i]);

      let doneStatus = false;
      let activeStatus = false;
      let inLineStatus = false;
      const flippedStatus = false;
      const correctStatus = false;
      const wrongStatus = false;
      
      if(i === 0) {
        inLineStatus = true;
      }

      loadedStrings[i].userInput = '';
      loadedStrings[i].done = doneStatus;
      loadedStrings[i].active = activeStatus;
      loadedStrings[i].inLine = inLineStatus;
      loadedStrings[i].flipped = flippedStatus;
      loadedStrings[i].correct = correctStatus;
      loadedStrings[i].wrong = wrongStatus;
    }, this);
    return loadedStrings;
  }

  updateLang(newLang) {
    if(newLang){
      lang.setLanguage(newLang);
      this.forceUpdate();
    }
  }

  handleCardSubmit(e) {
    e.preventDefault();
    const target = e.currentTarget
    const keyindex = parseInt(target.getAttribute('data-keyindex'),10);
    const currLang = lang.getLanguage();
    let loadedStrings = this.state.loadedStrings;


    if(loadedStrings[keyindex].flipped) {
      this.loadUpNextCard(keyindex);
      return;
    };

    const animationTime = this.state.animationTime;

    const inputText = e.currentTarget.querySelector('.card_string_input').value;
    
    let answer = '';
    if(currLang === 'fr') {
      answer = loadedStrings[keyindex].sv
    } else {
      answer = loadedStrings[keyindex].fr
    }

    loadedStrings[keyindex].flipped = true;
    this.setState({
      loadedStrings: loadedStrings
    });

    setTimeout(() => {
      loadedStrings[keyindex].userInput = inputText;

      let fixedInputText = inputText.toUpperCase();
      let fixedAnswer = answer.toUpperCase();

      fixedInputText = fixedInputText.replace(/Ç/g, 'C');
      fixedAnswer = fixedAnswer.replace(/Ç/g, 'C');

      fixedInputText = fixedInputText.replace(/’/g, "'");
      fixedAnswer = fixedAnswer.replace(/’/g, "'");

      if(fixedInputText === fixedAnswer) {
        loadedStrings[keyindex].correct = true;
      } else {
        loadedStrings[keyindex].wrong = true;
      }
      
      this.setState({
        loadedStrings: loadedStrings
      });
    }, (animationTime / 3.5));

    /*
    //use this to auto load next card
    setTimeout(() => {
      this.loadUpNextCard(keyindex);
    }, 1000);
    */
    setTimeout(() => {
      this.saveState();
    }, (animationTime * 2));
  }

  loadUpNextCard(e) {
    const eIsNumber = !isNaN(e);
    
    let keyindex;
    if(eIsNumber){
      keyindex = parseInt(e,10);
    } else {
      const target = e.currentTarget
      keyindex = parseInt(target.getAttribute('data-keyindex'),10);
    }
    
    const nextInLine = document.querySelector('[data-keyindex="'+(keyindex + 1)+'"] .card_string_input');
  
    const animationTime = this.state.animationTime;

    if(nextInLine) {
      setTimeout(() => {
        nextInLine.focus();
      }, animationTime);      
    } else if ('activeElement' in document) {
      document.activeElement.blur();
    }

    let loadedStrings = this.state.loadedStrings;


    if(loadedStrings.length === (keyindex+1)) {
      this.toggleShowResult();
      return;
    }

    loadedStrings.forEach((element,i) => {
      let doneStatus = false;
      let activeStatus = false;
      let inLineStatus = false;

      if(loadedStrings[i].done) {
        doneStatus = true;
      }

      if(i === keyindex) {
        doneStatus = true;
        inLineStatus = true;
      } else if(i === keyindex + 1) {
        activeStatus = true;
        inLineStatus = true;
      } else if(i === keyindex + 2) {
        inLineStatus = true;
      }

      loadedStrings[i].done = doneStatus;
      loadedStrings[i].active = activeStatus;
      loadedStrings[i].inLine = inLineStatus;

    });

    this.setState({
      loadedStrings: loadedStrings
    },()=>{
      this.saveState();
    });
  }

  toggleShowResult() {
    this.setState({
      showResult: true,
      cardsRunning: false
    },()=>{
      this.saveState();
    });
    
  }

  toggleCheat() {
    const cheat = this.state.cheat;
    this.setState({
      cheat: !cheat
    },()=>{
      this.saveState();
    });
  }

  toggleRandom() {
    const random = this.state.random;
    this.setState({
      random: !random
    });
  }

  checkboxTextClick(e) {
    const target = e.currentTarget;

    var stateName = target.getAttribute('state-name');
    if(stateName && stateName !== '') {
      const currentState = this.state[stateName];
      this.setState({
        [stateName]: !currentState
      });
    } else {
      const parent = target.parentNode
      const checkbox = parent.querySelector('input');
      checkbox.checked = !checkbox.checked;
    }
  }


  runCards() {
    const random = this.state.random;
    let loadedStrings = this.state.loadedStrings;
    if(random){
      loadedStrings = this.shuffleStrings(loadedStrings);
    }

    this.setState({
      loadedStrings: loadedStrings,
      cardsRunning: true
    });
  }

  restart() {
    const loadedStrings = this.loadDefaultStrings();
    this.setState({
      cardsRunning: false,
      showResult: false,
      loadedStrings: loadedStrings
    },()=>{
      this.clearSavedState();
    });

  }

  render() {

    const cardsRunning = this.state.cardsRunning;
    const showResult = this.state.showResult;
    let main_content = '';
    if(showResult) {
      main_content = <Result {...this.state}
        restart={this.restart.bind(this)}
      />;
    } else if(cardsRunning){
      main_content = <Cards 
        {...this.state}
        toggleShowResult={this.toggleShowResult.bind(this)}
        handleCardSubmit={this.handleCardSubmit.bind(this)}
        loadUpNextCard={this.loadUpNextCard.bind(this)}
        toggleCheat={this.toggleCheat.bind(this)}
        checkboxTextClick={this.checkboxTextClick.bind(this)}
      />;
    } else {
      main_content = <Intro {...this.state}
        runCards={this.runCards.bind(this)}
        toggleRandom={this.toggleRandom.bind(this)}
        checkboxTextClick={this.checkboxTextClick.bind(this)}
      />
    }
    return (
      <div className="site add_padding">
        <header className="site_header">
          <SelectLang updateLang={this.updateLang.bind(this)} cardsRunning={cardsRunning} />
          <h1 className="site_title">Voila!</h1>
        </header>
        <div className="site_main">
          {main_content}
        </div>
      </div>
    );
  }
}

export default App;
