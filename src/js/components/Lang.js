import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
    sv:{
      hello:"Hej",
      bye:"Hejdå",
      howareyou:"Hur mår du?",
      italkalittlefrench:"Jag pratar lite franska"
    },
    fr: {
      hello:"Bonjour",
      bye:"Au revoir",
      howareyou:"comment ça va?",
      italkalittlefrench:"Je parle un peu français"
    }
});

export default lang;