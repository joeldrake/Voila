import LocalizedStrings from 'react-localization';

const string = new LocalizedStrings({
    en:{
        s1:"Hello",
        s2:"Bye",
        s3:"Hur mår du?",
        s4:"Jag pratar lite franska"
    },
    sv:{
      s1:"Hej",
      s2:"Hejdå",
      s3:"Hur mår du?",
      s4:"Jag pratar lite franska"
    },
    fr:{
      s1:"Bonjour",
      s2:"Au revoir",
      s3:"comment ça va?",
      s4:"Je parle un peu français"
    }
});

export default string;