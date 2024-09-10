const Input = ({ name, placeholder, handleInput }) => {
  return (
    <div>
      <input
        name={name}
        className="input-field"
        placeholder={placeholder}
        onChange={handleInput}
      />
    </div>
  );
};

export default Input;
