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

//state management
let isOperatorPresent = false;
let presentOperator = '';

operatorArr.forEach((operator) => {
    operator.addEventListener('click', addOperator);
});
buttonArr.forEach((button) => {
    button.addEventListener('click', inputNum);
});
backspace.addEventListener('click', clearChar);
equal.addEventListener('click', calculate);
allClean.addEventListener('click', clean);
minus.addEventListener('click', makeNegitive);

function inputNum(e) {
    if(isOperatorPresent == false) {
        let char = e.target.textContent;
        carryA = carryA + char;
        a= +carryA;
        mainScreen.textContent = carryA;
    }
    if(isOperatorPresent == true) {
        let char = e.target.textContent;
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

function addOperator(e) {
    if(isOperatorPresent == true && b!= null) {
        calculate(e);
        presentOperator = e.target.textContent; 
        isOperatorPresent = true;
        subScreen.textContent = a+e.target.textContent;
        mainScreen.textContent = '';
    } else {
    isOperatorPresent = true;
    presentOperator = e.target.textContent;
    console.log(e.target.textContent);
    subScreen.textContent = a+e.target.textContent;
    }
}

function calculate(e) {
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

    mainScreen.textContent='';
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
    }
}