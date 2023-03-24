import React from 'react';

function Form({ name, onSubmit, children }) {
  return (
    <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
}

export default Form;
