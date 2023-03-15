'use strict';

const display = document.getElementById('display');
const numeros  = document.querySelectorAll('[id*=tecla]');
const operadores  = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () =>{
    if(operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

const atualizarDisplay = (texto) =>{
    if (novoNumero){
        display.textContent = texto.toLocaleString('BR'); 
        novoNumero = false
    }else{ 
        display.textContent += texto.toLocaleString('BR');
    }
    
}


const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero){
        calcular()
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

const acionarigual = () => {
    calcular();
    operador = undefined;
}

document.getElementById('igual').addEventListener('click', acionarigual);


const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

const limparCalculo = () =>{
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
} 
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existedDcimal = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.lenght > 0 ;
const inserirDecimal = () => {
    if(!existedDcimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay(',');
        }
    }
} 
document.getElementById('decimal').addEventListener('click', inserirDecimal);
