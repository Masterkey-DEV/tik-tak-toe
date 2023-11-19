export function Cuadrado ({ index, cambio, children, isSelected }){
    const handleClick = () => {
      cambio(index);
    };
  
    return (
      <div
        className={`cuadrado ${isSelected ? "isSelected" : ""}`}
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }