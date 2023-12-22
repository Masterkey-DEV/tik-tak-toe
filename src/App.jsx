import "./css/app.css";
import { useState } from "react";
import { Cuadrado } from "./components/Cuadrado";
import { Reinicio } from "./components/Reinicio";
import { Modal } from "./components/Modal";
import { GANADORES, TURNOS } from "./const/const";

function App() {
  const [cuadradito, setCuadradito] = useState(() => {
    return localStorage.getItem("partida")
      ? JSON.parse(localStorage.getItem("partida"))
      : Array(9).fill(null);
  });

  const [turno, setTurno] = useState(() => {
    return localStorage.getItem("turno")
      ? localStorage.getItem("turno")
      : TURNOS.x;
  });
  const [ganador, setGanador] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const cambioDeTurno = () => {
    setTurno(turno === TURNOS.x ? TURNOS.o : TURNOS.x);
  };

  const hasGanado = (arr) => {
    for (let i = 0; i < GANADORES.length; i++) {
      const [a, b, c] = GANADORES[i];
      if (arr[a] && arr[a] === arr[b] && arr[b] === arr[c]) {
        setGanador(arr[a]);
        setModalVisible(true);
        return;
      }
    }
    if (arr.every((element) => element != null)) {
      setGanador(false);
      setModalVisible(true);
    }
  };

  const relleno = (index) => {
    if (cuadradito[index] || ganador) {
      return;
    }

    const nuevosCuadraditos = [...cuadradito];
    nuevosCuadraditos[index] = turno;
    setCuadradito(nuevosCuadraditos);

    localStorage.setItem("partida", JSON.stringify(nuevosCuadraditos));
    cambioDeTurno();
    const turnoActual = turno === TURNOS.x ? "O" : "X";

    localStorage.setItem("turno", turnoActual);
    hasGanado(nuevosCuadraditos);
  };

  const resetGame = () => {
    setCuadradito(Array(9).fill(null));
    setTurno(TURNOS.x);
    setGanador(null);
    setModalVisible(false);
    localStorage.removeItem("partida");
    localStorage.removeItem("turno");
  };

  return (
    <>
      <div className="contenido">
        <h1>Tik-Tak-toe</h1>
        <main className="zona">
          {cuadradito.map((nada, index) => {
            return (
              <Cuadrado key={index} index={index} cambio={relleno}>
                {nada}
              </Cuadrado>
            );
          })}
        </main>
        <Reinicio reset={resetGame} />
        <section>
          <Cuadrado isSelected={turno === TURNOS.x}>X</Cuadrado>
          <Cuadrado isSelected={turno === TURNOS.o}>O</Cuadrado>
        </section>

        {modalVisible ? <Modal gano={ganador} cerrarModal={resetGame} /> : null}
      </div>
    </>
  );
}

export default App;
