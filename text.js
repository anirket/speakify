//grab all
const characters = document.querySelector("#characters");
const textarea = document.querySelector("textarea");
const rangevalue = document.querySelector("#rangevalue");
const pitchvalue = document.querySelector("#pitchvalue");
const dropdown = document.querySelector("#select")
const button = document.querySelector("button");
const body = document.querySelector("body");
let numberofcharacters;
let synth = speechSynthesis;
let voices =[];
let changedvoice;
//event listeners

//displaying characters
textarea.addEventListener("input",()=>{
    if(textarea.value.length != 0){
        numberofcharacters = parseInt(textarea.value.length, 10) ;
characters.textContent = `characters: ${numberofcharacters}/100`
    }
    else{
        characters.textContent = `characters: 0/100`   
    }
})

//all functions
function getvoices(){ 

    voices = synth.getVoices();
   voices.forEach((voice)=>{
    let option = document.createElement("option");
    option.textContent = `${voice.name}`;
    option.setAttribute('data-lang',voice.lang);
    option.setAttribute('data-voice',voice.name);
    dropdown.appendChild(option)
   })
}

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getvoices; 
}


//setting the changedvoice on first run
setTimeout(()=>{
    let selectedvoice = dropdown.firstElementChild.getAttribute("data-voice");
    let selectedlang = dropdown.firstElementChild.getAttribute("data-lang")
    console.log(selectedvoice);
    console.log(selectedlang);
    changedvoice = voices[0];
},500)


//changing the dropdown changedvoice
dropdown.addEventListener("change",(e)=>{
    selectedvoice = e.target.value;
 voices.forEach((voice)=>{
     if(selectedvoice ==  voice.name){
         selectedlang = voice.lang;
        changedvoice = voice;  
     }
 })
})

const speak = () => {
    if(synth.speaking){
    synth.cancel();
    }
    if(textarea.value !== null){
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textarea.value);
        //speak end
        speakText.onend = e =>{
            console.log("done speaking");
        }
        //speak error
        speakText.onerror = e =>{
            console.log("something went wrong");
            synth.cancel(); 
        }

        //selected voice
        speakText.voice = changedvoice;

        //set pitch and rate
        speakText.rate = rangevalue.value;
        speakText.pitch = pitchvalue.value
        //speak
        synth.speak(speakText)
    }
    else{
        console.log("empty");
    }

}
speak();

button.addEventListener("click",()=>{
    console.log("clicked");
    textarea.blur();
    speak();
})

