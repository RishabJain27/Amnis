const record = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

const axios = require('axios');

var wordMap = new Map();

// Creates a client
const client = new speech.SpeechClient();

// Instantiates a client
const languageClient = new language.LanguageServiceClient();

var lectureID = '';
axios.get('http://localhost:5000/api/lectures')
    .then(res=>lectureID=res.data[0]._id);

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
 const encoding = 'LINEAR16';
 const sampleRateHertz = 16000;
 const languageCode =  'en-US';

var status = new Array();
//Initializes the array to five empty tags
status.push({name: '', val: 0});
status.push({name: '', val: 0});
status.push({name: '', val: 0});
status.push({name: '', val: 0});
status.push({name: '', val: 0});

status.sort(function(a,b) {
    return b.val - a.val;
});

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    {
      // Splitting the streamed input
      var str =  `${data.results[0].alternatives[0].transcript}\n`;
      var res = str.toLowerCase();
      var arr = new Array();

    const document = {
      content: str,
      type: 'PLAIN_TEXT',
    };

// Detects the sentiment of the text
  languageClient
  .analyzeEntities({document: document})
  .then(results => {
    const entities = results[0].entities;

    console.log('Entities:');
    entities.forEach(entity => {
      var str = entity.name;
      var lowerCase = str.toLowerCase();
      arr.push(lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1));
      if (entity.metadata && entity.metadata.wikipedia_url) {
        //console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      }
      for (var i = 0; i < arr.length; i++) {
        if(wordMap.has(arr[i]) && arr[i] != ''){    //if HashMap has the word
          var tempCount = wordMap.get(arr[i]);
          wordMap.set(arr[i], tempCount + 1);
          var a =  (status.some(e => e.name === arr[i]))
          if(a){
            for(var j = 0; j < status.length; j++){
              if(status[j].name === arr[j]){
                status[j].val = tempCount+1;
              }
            }
          } else if(status[status.length - 1].val < tempCount + 1 && !a){
            status[status.length - 1].name = arr[i];
            status[status.length - 1].val =  tempCount + 1;
            status.sort(function(a,b) {
              return b.val - a.val;
            });
          }
        }else if(arr[i] != '' && arr[i].length > 2){
          wordMap.set(arr[i], 1);
          if(status[status.length - 1].val < 1){
            status[status.length - 1].name = arr[i];
            status[status.length - 1].val = 1;
            status.sort(function(a,b) {
              return b.val - a.val;
            });
          }
        }
      }
      console.log("Array is:" + '\n');
      console.log(status); //THIS ARRAY IS WHAT NEEDS TO GO INTO THE DB
      postToDb(status);
    });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
    }
  );

  

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

function postToDb(tags){
    var tagsJSON = {tags:tags};
    axios.put(`http://localhost:5000/api/lectures/tags/${lectureID}`, tagsJSON)
      .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  // Recomendations: You're going to want to call this at the end of your main()
  // in main.js. requestAnimationFrame() needs to be used here (read the book).

console.log('Listening, press Ctrl+C to stop.');