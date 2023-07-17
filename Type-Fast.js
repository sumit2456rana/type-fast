const Random_Quote_API = "https://api.quotable.io/random";

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timer =  document.getElementById("timer");
const record = document.getElementById("record");

function getRandomQuote() {
    return fetch(Random_Quote_API)
    .then((resp) => resp.json())
    .then((finalResp) => finalResp.content);
}

quoteInput.addEventListener("input" , () => {
    const allQuoteChar = document.querySelectorAll(".eachChar");
    const allInputChar = quoteInput.value.split("");

    let correct = true;

    allQuoteChar.forEach((eQuoteChar , idx) => {
        if(!allInputChar[idx]){
            eQuoteChar.classList.remove("correct");
            eQuoteChar.classList.remove("incorrect");
            correct = false;
        }
        else if(eQuoteChar.innerText == allInputChar[idx]){
            eQuoteChar.classList.add("correct");
            eQuoteChar.classList.remove("incorrect")
        }else if(eQuoteChar.innerText != allInputChar[idx]){
            eQuoteChar.classList.remove("correct");
            eQuoteChar.classList.add("incorrect");
            correct = false;
        }

    })

    if(correct){
        const currTime = parseInt(timer.innerText);
        let lsTime = window.localStorage.getItem("leastTime");

        if(!lsTime){
            window.localStorage.setItem("leastTime" , currTime);
            record.innerHTML = `${currTime}s`;
        }else{
            lsTime = parseInt(lsTime);
            if(currTime < parseInt(record.innerText)){
                window.localStorage.setItem("leastTime" , currTime);
                record.innerText = `${currTime}s`;
            }
        }

        getNextQuote();  
    } 
})

async function getNextQuote() {
    const quote = await getRandomQuote();
    quoteDisplay.innerHTML = "";
    quoteInput.value = "";
    const quoteArray = quote.split("");
    
    quoteArray.forEach((eQuote) => {
        let charSpan = document.createElement("span");
        charSpan.classList.add("eachChar");
        charSpan.innerText = eQuote;
        quoteDisplay.appendChild(charSpan);
    });

    startTimer();
}
let startTime;
function startTimer() {
    timer.innerText = "0";
    startTime = new Date();
    setInterval(() => {
        let currSec = parseInt((new Date() - startTime) / 1000);
        timer.innerText = currSec;
    },1000)
}
getNextQuote();

const lsTime = window.localStorage.getItem("leastTime");
if(lsTime) {
    record.innerText = `${lsTime}s`;
}
