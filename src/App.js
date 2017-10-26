import React, { Component } from 'react';
import lang from './js/components/Lang';
import strings from './js/components/Strings';
import SelectLang from './js/components/SelectLang';
import Counter from './js/components/Counter';
import Card from './js/components/Card';
import './App.css';

class App extends Component {

  constructor() {
    super();
    const browserLang = navigator.language.substring(0, 2);

    const loadedStrings = this.loadDefaultStrings();

    this.state = {
      lang: browserLang,
      animationTime: 300,
      cardsRunning: false,
      loadedStrings: loadedStrings
    };
  }

  loadDefaultStrings() {
    let loadedStrings = strings;
    loadedStrings.forEach(function(element,i) {
      let doneStatus = false;
      let activeStatus = false;
      let inLineStatus = false;
      const flippedStatus = false;
      const correctStatus = false;
      const wrongStatus = false;
      if(i === 0) {
        activeStatus = true;
        inLineStatus = true;
      } else if(i === 1) {
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
    const keyindex = parseInt(target.getAttribute('data-keyindex'));
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

    console.log(inputText);
    console.log(answer);

  }

  loadUpNextCard(e) {

    const eIsNumber = !isNaN(e);
    
    let keyindex;
    if(eIsNumber){
      keyindex = parseInt(e);
    } else {
      const target = e.currentTarget
      keyindex = parseInt(target.getAttribute('data-keyindex'));
    }
    
    const nextInLine = document.querySelector('[data-keyindex="'+(keyindex + 1)+'"] .card_string_input');
  
    if(nextInLine) {
      nextInLine.focus();
    } else if ('activeElement' in document) {
      document.activeElement.blur();
    }

    console.log(nextInLine);

    let loadedStrings = this.state.loadedStrings;
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
    });
  }

  renderCards() {
    let loadedStrings = this.state.loadedStrings;
    let cards = [];
    const currLang = lang.getLanguage();
    loadedStrings.forEach((element,i) => {
      const userInput = loadedStrings[i].userInput
      let string = '';
      let answer = '';
      if(currLang === 'fr') {
        string = loadedStrings[i].fr
        answer = loadedStrings[i].sv
      } else {
        string = loadedStrings[i].sv
        answer = loadedStrings[i].fr
      }
      cards.push(
        <Card
          key={i}
          string={string}
          answer={answer}
          userInput={userInput}
          currLang={currLang}
          done={loadedStrings[i].done}
          active={loadedStrings[i].active}
          in_line={loadedStrings[i].inLine}
          flipped={loadedStrings[i].flipped}
          correct={loadedStrings[i].correct}
          wrong={loadedStrings[i].wrong}
          keyindex={i}
          handleCardSubmit={this.handleCardSubmit.bind(this)}
          loadUpNextCard={this.loadUpNextCard.bind(this)}
        />
      );
    }, this);
    return cards;
  }

  runCards() {
    this.setState({
      cardsRunning: true
    });
  }

  render() {
    const cardsRunning = this.state.cardsRunning;
    let main_content = '';
    if(cardsRunning){
      main_content = this.renderCards();
    } else {
      main_content = <div className="intro">
        {lang.intro}<br />
        {lang.pushToStart}<br /><br />
        <button className="standard_button" onClick={this.runCards.bind(this)}>{lang.start}</button>
      </div>
    }
    return (
      <div className="site add_padding">
        <header className="site_header">
          <Counter cardsRunning={cardsRunning} loadedString={this.state.loadedStrings} />
          <SelectLang updateLang={this.updateLang.bind(this)} cardsRunning={cardsRunning} />
          <h1 className="site_title">Voila!</h1>
        </header>
        <div className="site_main add_padding">
          {main_content}
        </div>
      </div>
    );
  }
}

export default App;
