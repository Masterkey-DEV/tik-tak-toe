export function Reinicio({ reset }) {
  const handleClick = () => {
    reset();
  };

  return (
    <button className="reset" onClick={handleClick}>
      Reiniciar
    </button>
  );
}
