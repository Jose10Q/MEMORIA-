document.getElementById("iniciar").addEventListener("click", function() {
    document.getElementById("portada").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");
    iniciarJuego();
});

const tablero = document.getElementById("tablero");
const emojis = ["🍎", "🍌", "🍉", "🍇", "🍓", "🍒", "🥝", "🍍"];
let cartas = [];
let cartasVolteadas = [];
let paresEncontrados = 0;

function iniciarJuego() {
    tablero.innerHTML = "";
    paresEncontrados = 0;
    cartasVolteadas = [];
    
    let cartasDuplicadas = [...emojis, ...emojis];
    cartasDuplicadas.sort(() => Math.random() - 0.5);

    cartas = cartasDuplicadas.map((emoji, index) => {
        let carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.emoji = emoji;
        carta.dataset.index = index;
        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
        return carta;
    });
}

function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains("descubierta")) {
        this.innerText = this.dataset.emoji;
        this.classList.add("descubierta");
        cartasVolteadas.push(this);

        if (cartasVolteadas.length === 2) {
            setTimeout(verificarPareja, 500);
        }
    }
}

function verificarPareja() {
    let [carta1, carta2] = cartasVolteadas;

    if (carta1.dataset.emoji === carta2.dataset.emoji) {
        paresEncontrados++;
        if (paresEncontrados === emojis.length) {
            alert("¡Ganaste!");
        }
    } else {
        carta1.innerText = "";
        carta2.innerText = "";
        carta1.classList.remove("descubierta");
        carta2.classList.remove("descubierta");
    }
    
    cartasVolteadas = [];
}

document.getElementById("reiniciar").addEventListener("click", iniciarJuego);
