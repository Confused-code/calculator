'use strict'

const buttons = document.querySelectorAll('.button');
const operators = document.querySelectorAll('.operator');
const backspace = document.querySelector('.backspace');
const equal = document.querySelector('.equal');
const allClean = document.querySelector('.allClean');
const minus = document.querySelector('.minus');
const mainScreen = document.querySelector('.mainScreen');
const subScreen = document.querySelector('.subScreen');

let a = null;
let carryA = '';
let b = null;
let carryB = '';
let result = null;
const buttonArr = Array.from(buttons);
const operatorArr = Array.from(operators);

//button characters allowed
const numChars = '1234567890.';
const operatorChars = '+-*/';

//state management
let isOperatorPresent = false;
let presentOperator = '';

buttonArr.forEach((button) => {
    button.addEventListener('click', (e) => {
        const char = e.target.textContent;
        inputNum(char);
    });
});
operatorArr.forEach((operator) => {
    operator.addEventListener('click', (e)=> {
        const op = e.target.textContent;
        addOperator(op);
    });
});
document.addEventListener('keydown', (e)=> {
    const char = e.key;
    if(numChars.includes(char)) inputNum(char);
    //checking for operators
    const op = e.key;
    if(operatorChars.includes(op)) addOperator(op);
    else if(op === '=' || op === "Enter") calculate(op);
    else if(op === 'Backspace') clearChar();
})
backspace.addEventListener('click', clearChar);
equal.addEventListener('click', calculate);
allClean.addEventListener('click', clean);
minus.addEventListener('click', makeNegitive);

function inputNum(char) {
    if(isOperatorPresent == false) {
        // let char = e.target.textContent;
        if(char === '.') {
            if(carryA.includes(char)) return;
        }
        carryA = carryA + char;
        a= +carryA;
        mainScreen.textContent = carryA;
    }
    if(isOperatorPresent == true) {
        // let char = e.target.textContent;
        if(char === '.') {
            if(carryB.includes(char)) return;
        }
        carryB = carryB + char;
        b= +carryB;
        mainScreen.textContent = carryB;
    }
}

function clearChar() {
    if(isOperatorPresent == false) {
        if(carryA.length !== 0) {
            carryA = carryA.slice(0, carryA.length-1);
            a =+carryA;
            if(carryA.length == 0) a=null;
        }
        mainScreen.textContent = carryA;
    }

    if(isOperatorPresent == true) {
        if(carryB.length !== 0) {
            carryB = carryB.slice(0, carryB.length-1);
            b =+carryB;
            if(carryB.length == 0) b=null;
        }
        mainScreen.textContent = carryB;
    }
}

function addOperator(op) {
    if(isOperatorPresent == true && b!= null) {
        calculate(op);
        presentOperator = op; 
        isOperatorPresent = true;
        subScreen.textContent = a+op;
        mainScreen.textContent = '0';
    } else {
    isOperatorPresent = true;
    presentOperator = op;
    // console.log(e.target.textContent);
    subScreen.textContent = a+op;
    mainScreen.textContent = '0';
    }
}

function calculate(op) {
    switch(presentOperator) {
        case '+': 
            result = a+b;
            // a = result;
            break;

        case '-': 
            result = a-b;
            // a = result;
            break;

        case '*':
            result = a*b;
            // a = result;
            break;
        
        case '/':
            result = a/b;
            // a = result;
            break;

        default: console.error('some error');
    }
    // subScreen.textContent = a+e.target.textContent+b;
    subScreen.textContent = "";
    a = result;
    b =null;
    carryA = '';
    carryB = '';
    isOperatorPresent = false;
    mainScreen.textContent = parseFloat(result.toFixed(2));
}

function clean() {
    a= null;
    b= null;
    carryA='';
    carryB='';

    isOperatorPresent = false;
    presentOperator = '';

    mainScreen.textContent='0';
}

function makeNegitive() {
    if(isOperatorPresent === true) {
        b *= -1;
        let temp = carryB.split('');
        if (temp[0] === '-') {
            temp.shift();
            carryB = temp.join('');
        } else {
            temp.unshift('-');
            carryB = temp.join('');
        }
        mainScreen.textContent = b;
    } else {
        a *= -1;
        let temp = carryA.split('');
        if (temp[0] === '-') {
            temp.shift();
            carryA = temp.join('');
        } else {
            temp.unshift('-');
            carryA = temp.join('');
        }
        mainScreen.textContent = a;
    }
}