(()=>{
    'use strict';

        // Inicializacion de variables
        let deck = [];
        let tipos = ['C','D','H','S'];
        let especiales = ['A','J','Q','K'];
        let puntosJugador = 0;
        let puntosComputadora = 0;

        // Referencias del DOM 
        const btnPedir = document.querySelector('#btnPedir');
        const btnDetener = document.querySelector('#btnDetener');
        const btnNuevo = document.querySelector('#btnNuevo');
        const puntosHTML = document.querySelectorAll('small');
        const divCartasJugador = document.querySelector('#jugador-cartas')
        const divCartasComputadora = document.querySelector('#computadora-cartas')

        // Funciones
        const crearDeck = () => {
            for (let i=2; i<= 10; i++){
                for (let tipo of tipos){
                    deck.push(i+tipo)
                }
            }
            for (let tipo of tipos){
                for(let esp of especiales){
                    deck.push(esp + tipo)
                }
            }
            // el deck (maso) de esta manera esta ordenada, y js no tiene hasta la fecha un metodo para eso, pero existe una libreria muy popular llamada underscore con metodos js custom ,entre ellos un metodo para mezclar (aleatorio), la cual intalaremos localmente descargando un archivo js comprimido y guardandolo en un archivo de este proyecto y levantando su script en el index antes de script de juego
            // shuffle es el metodo de la libreria que mezcla el maso
            deck = _.shuffle(deck);
        }
        crearDeck();

        const pedirCarta = () => {
            //  simplemente hago un pop que lo que hace es extraer el ultimo valor del array y borrarlo, lo cual es lo que quiero que me de una carta y ya esa carta deje de estar en el maso
            if(deck.length === 0){
                throw "no hay mas cartas"
            }
            const carta = deck.pop();
            return carta
        }

        const valorCarta = (carta) => { 
                // ahora quiero asignarle el valor a la carta, del 2-10 valen su numero, J Q K valen 10 y la A vale 11
                // mi deck esta compuesto por el valor de la carta y la ultima letra es el tipo decarta (corazon,espada,etc) remuevo esa ultima letra para quedarme solo con el valor de la carta
            const valor = carta.substring(0,carta.length - 1);
            let puntos = 0;
                //  ahora vien los valores de las cartas son de dos tipos, tenemos los numeros del 2-10 y las letras A K Q J, por lo que pongo un condicional para asignarle su correspondiente valor segun el tipo usando un isNaN que te dice: si no sos numero devuelve true
            if (isNaN(valor)){
                // Aca solo entran los valores que son las letras. si es la a asigna un 11, sino un 10
                puntos = (valor === "A") ? 11 : 10;
            } else {
                // aca solo entran los numeros pero en formato string y para convertirlo a numero con multiplicarlo por 1 js lo convierte 
                puntos = valor * 1;
            }
            return puntos;
        }

        const turnoComputadora = (puntosMinimo) => {
            do{
                const carta = pedirCarta();
                puntosComputadora = puntosComputadora + valorCarta(carta);
                puntosHTML[1].innerText = puntosComputadora;
                const imgCarta = document.createElement('img');
                imgCarta.src = `assets/cartas/${carta}.png`
                imgCarta.classList = "carta";
                divCartasComputadora.append(imgCarta);
                if (puntosMinimo > 21){
                    break;
                }
            } while ((puntosComputadora < puntosMinimo) && (puntosMinimo <= 21) );
            
            setTimeout(() => {
                if (puntosComputadora === puntosMinimo){
                    alert("Empate :| ")
                } else if (puntosMinimo > 21){
                    alert("Perdiste :(")
                } else if( puntosComputadora > 21) {
                    alert("GANASTE :) !")
                } else {
                    alert("Perdiste :(")
                }
            }, 100)
        }

        // Eventos
        btnPedir.addEventListener('click',()=>{
            const carta = pedirCarta();
            puntosJugador = puntosJugador + valorCarta(carta);
            puntosHTML[0].innerText = puntosJugador;
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`
            imgCarta.classList = "carta";
            divCartasJugador.append(imgCarta)
            if (puntosJugador > 21){
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            } else if (puntosJugador === 21){
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            }
        });

        btnDetener.addEventListener("click", ()=>{
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        });

        btnNuevo.addEventListener("click", ()=>{
        deck = [];
        crearDeck();
        puntosJugador = 0;
        puntosComputadora =0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        divCartasComputadora.innerHTML = "";
        divCartasJugador.innerHTML = "";
        });

})();

