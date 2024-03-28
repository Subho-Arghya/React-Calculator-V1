const Button = ({ symbol, handleClick, classes }) => {
    return (
      <div
        onClick={() => handleClick(symbol)}
        className={`button-wrapper ${classes}`}        
      >
        {symbol}
      </div>
    );
  };
  
  export default Button;