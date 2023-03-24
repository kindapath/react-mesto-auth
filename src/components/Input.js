

function Input({ name, value, onChange, type, addclass, formValid, errorText, ...props }) {
  return (
    <>
      <input
        className={`popup__input popup__input_type_${name} ${addclass}`}
        name={name}
        type={type}
        id={`${name}-input}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      <span className={`popup__input-error ${formValid ? '' : 'popup__input-error_active'} title-input-error`}>{errorText}</span>
    </>
  );
}

export default Input;
