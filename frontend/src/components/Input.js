function Input({ id, className, type, name, minLength, maxLength, placeholder, required, inputRef, value, onChange }) {
  return (
    <div className="popup__input-container">
      <input
        id={id}
        className={className}
        type={type}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
      <span id={`${name}-error`} className="popup__error"></span>
    </div>
  );
}
export default Input;