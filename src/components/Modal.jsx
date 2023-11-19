export function Modal({ gano, cerrarModal }) {
  return (
    <div className="modal" onClick={cerrarModal}>
      <main className="modal_main">
        <span className="modal_content">
          {gano && `Has ganado`}
          {gano === false ? "parece que nadie pudo ganar esta vez" : ""}
        </span>
        <h2>{gano ? `victoria espectacular de la ${gano}` : "EMPATADOS"} </h2>
      </main>
      <button className="close" onClick={cerrarModal}>
        Reiniciar
      </button>
    </div>
  );
}
