const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const fs = require('fs');

var wordMap = new Map();

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
 const encoding = 'LINEAR16';
 const sampleRateHertz = 16000;
 const languageCode =  'en-US';

 fs.open('transcribedSpeech.txt', 'r', (err, fd) => {
  if (err) throw err;
  fs.close(fd, (err) => {
    if (err) throw err;
  });
});

var status = new Array();
status.push({name: 'BOB', val: 0});
status.push({name: 'TOM', val: 0});
status.push({name: 'ROB', val: 0});
status.push({name: 'JON', val: 0});
status.push({name: 'JOE', val: 0});

status.sort(function(a,b) {
    return b.val - a.val;
});

console.log(status);

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
    //data.results[0] && data.results[0].alternatives[0];
    {
      // Splitting the streamed input
      var str =  `${data.results[0].alternatives[0].transcript}\n`;
      var res = str.toLowerCase();
      var arr = res.split(/[^A-Za-z]/);
      for (var i = 0; i < arr.length; i++) {
        console.log("Word " + i +" is:" + arr[i]);
        if(wordMap.has(arr[i]) && arr[i] != ''){    //if HashMap has the word
          var tempCount = wordMap.get(arr[i]);
          wordMap.set(arr[i], tempCount + 1);
          var a =  (status.some(e => e.name === arr[i]))
          if(a){
            for(var j = 0; j < status.length; j++){
              if(status[j].name === arr[j]){
                status[j].val = tempCount+1;
                //break;
                console.log('reached counter increase');
              }
            }
          } else if(status[status.length - 1].val < tempCount + 1 && !a){
            status[status.length - 1].name = arr[i];
            status[status.length - 1].val =  tempCount + 1;
            status.sort(function(a,b) {
              return b.val - a.val;
            });
            console.log('replace lowest');
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
          console.log('add NEw');
        }
      }
      console.log("Array is:" + '\n');

      console.log(status);
      //console.log(wordMap.entries());
    }
  );

  

// Start recording and send the microphone input to the Speech API
record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '10.0',
  })
  .on('error', console.error)
  .pipe(recognizeStream);



  // Recomendations: You're going to want to call this at the end of your main()
  // in main.js. requestAnimationFrame() needs to be used here (read the book).

console.log('Listening, press Ctrl+C to stop.');