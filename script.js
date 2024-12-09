let tablero = ["", "", "", "", "", "", "", "", ""];
let turno = "X";
let jugando = true;
let contraMaquina = false;

const celdas = document.querySelectorAll(".celda");
const turnoTexto = document.getElementById("turno");
const resultadoTexto = document.getElementById("resultado");
const btnJvJ = document.getElementById("btnJvJ");
const btnJvM = document.getElementById("btnJvM");
const btnReiniciar = document.getElementById("btnReiniciar");

const combinacionesGanadoras = [
    [0, 1, 2], // Horizontal arriba
    [3, 4, 5], // Horizontal medio
    [6, 7, 8], // Horizontal abajo
    [0, 3, 6], // Vertical izquierda
    [1, 4, 7], // Vertical medio
    [2, 5, 8], // Vertical derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundaria
];

function iniciarJuego(maquina = false) {
    tablero = ["", "", "", "", "", "", "", "", ""];
    turno = "X";
    jugando = true;
    contraMaquina = maquina;
    turnoTexto.textContent = `Turno: ${turno}`;
    resultadoTexto.textContent = ""; 
    celdas.forEach(celda => {
        celda.textContent = "";
        celda.classList.remove("ganador");
    });

    // Si es contra máquina, la máquina hará el primer movimiento
    if (maquina && turno === "O") {
        setTimeout(jugarMaquina, 500); // Espera un poco antes de que la máquina juegue
    }
}

function verificarGanador() {
    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            document.getElementById(`c${a}`).classList.add("ganador");
            document.getElementById(`c${b}`).classList.add("ganador");
            document.getElementById(`c${c}`).classList.add("ganador");
            resultadoTexto.textContent = `¡Ganador: ${tablero[a]}!`; // Muestra el mensaje
            jugando = false;
            return true;
        }
    }
    if (!tablero.includes("")) {
        resultadoTexto.textContent = "¡Es un empate!";
        jugando = false;
        return false;
    }
    return false;
}

function manejarCeldaClick(e) {
    const celda = e.target;
    const index = Array.from(celdas).indexOf(celda);

    if (tablero[index] || !jugando || (contraMaquina && turno === "O")) return; // No permite hacer clic si la celda está ocupada o si es el turno de la máquina

    tablero[index] = turno;
    celda.textContent = turno;

    if (!verificarGanador()) {
        turno = turno === "X" ? "O" : "X";
        turnoTexto.textContent = `Turno: ${turno}`;
        if (contraMaquina && turno === "O") {
            setTimeout(jugarMaquina, 500); // La máquina juega después del jugador
        }
    }
}

function jugarMaquina() {
    const opcionesDisponibles = tablero.map((valor, index) => valor === "" ? index : null).filter(val => val !== null);
    if (opcionesDisponibles.length === 0) return;

    const movimiento = opcionesDisponibles[Math.floor(Math.random() * opcionesDisponibles.length)];
    tablero[movimiento] = "O";
    document.getElementById(`c${movimiento}`).textContent = "O";
    if (!verificarGanador()) {
        turno = "X";
        turnoTexto.textContent = `Turno: ${turno}`;
    }
}

celdas.forEach(celda => celda.addEventListener("click", manejarCeldaClick));
btnJvJ.addEventListener("click", () => iniciarJuego(false));
btnJvM.addEventListener("click", () => iniciarJuego(true));
btnReiniciar.addEventListener("click", () => iniciarJuego(false));

iniciarJuego();

