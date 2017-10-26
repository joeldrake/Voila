import React, { Component } from 'react';
import lang from './js/components/Lang';
import strings from './js/components/Strings';
import SelectLang from './js/components/SelectLang';
import Counter from './js/components/Counter';
import Card from './js/components/Card';
import './css/SelectLang.css';
import './App.css';
import './css/Card.css';

class App extends Component {

  constructor() {
    super();
    const browserLang = navigator.language.substring(0, 2);

    const loadedStrings = this.loadDefaultStrings();

    this.state = {
      lang: browserLang,
      animationTime: 300,
      cardsRunning: false,
      showResult: false,
      loadedStrings: loadedStrings
    };
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
    let loadedStrings = strings;

    let shuffledStrings = this.shuffleStrings(loadedStrings);

    shuffledStrings.forEach(function(element,i) {
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
      shuffledStrings[i].userInput = '';
      shuffledStrings[i].done = doneStatus;
      shuffledStrings[i].active = activeStatus;
      shuffledStrings[i].inLine = inLineStatus;
      shuffledStrings[i].flipped = flippedStatus;
      shuffledStrings[i].correct = correctStatus;
      shuffledStrings[i].wrong = wrongStatus;
    }, this);
    return shuffledStrings;
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
  
    if(nextInLine) {
      setTimeout(() => {
        nextInLine.focus();
      }, 300);      
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

  renderResult() {
    let loadedStrings = this.state.loadedStrings;

    const result = loadedStrings.map((element,i) => {
      let addClass = '';
      if(element.correct) {
        addClass = 'result_correct';
      } else {
        addClass = 'result_wrong';
      }  
      return(
          <tr className={addClass} key={i+1}>
            <td>{i+1}</td>
            <td>{element.userInput}</td>
            <td>{element.fr}</td>
            <td>{element.sv}</td>
          </tr>
      )
    }, this);

    return result;
  }

  toggleShowResult() {
    this.setState({
      showResult: true,
      cardsRunning: false
    });
  }

  runCards() {
    this.setState({
      cardsRunning: true
    });
  }

  restart() {
    const loadedStrings = this.loadDefaultStrings();
    this.setState({
      cardsRunning: false,
      showResult: false,
      loadedStrings: loadedStrings
    });
  }

  render() {
    const cardsRunning = this.state.cardsRunning;
    const showResult = this.state.showResult;
    let main_content = '';
    if(showResult) {
      let loadedStrings = this.state.loadedStrings;
      const totalLength = loadedStrings.length;
      let totalScore = 0;
      loadedStrings.forEach((element,i) => {
        if(element.correct === true) {
          totalScore++;
        }
      });

      main_content = 
      <div>
        <div className="total_result_string">{totalScore} {lang.of} {totalLength} {lang.correct}</div>
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
            {this.renderResult()}
          </tbody>
      </table>
      <br /><br />
      <button className="standard_button" onClick={this.restart.bind(this)}>{lang.restart}</button>
      </div>
    } else if(cardsRunning){
      main_content = this.renderCards();
    } else {
      main_content = <div className="intro">
        {lang.intro}<br />
        {lang.pushToStart}<br /><br /><br />
        <button className="standard_button" onClick={this.runCards.bind(this)}>{lang.start}</button>
      </div>
    }
    return (
      <div className="site add_padding">
        <header className="site_header">

          <div className={
            'show_result select_lang'+
            (cardsRunning ? '' : ' hidden')
            }
          >
            <button className="show_result_btn" onClick={this.toggleShowResult.bind(this)}>✕</button>
          </div>

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
