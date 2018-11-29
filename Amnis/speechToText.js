const record = require('node-record-lpcm16');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

const fs = require('fs');

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

      //console.log(data.results[0].alternatives[0].transcript);
      var str =  `${data.results[0].alternatives[0].transcript}\n`;
      var arr = str.split(" ");
      for (var i = 0; i < arr.length; i++) {
        console.log("Array at " + i +" is:" + arr[i]);
      }
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