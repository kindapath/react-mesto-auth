import { useEffect, useState } from "react";

export default function useValidation() {

  const [values, setValues] = useState({})
  const [error, setError] = useState({})
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    //проверка всех инпутов на валидность и setIsValid
    const formValid = Object.values(error).every(error => error === '')
    setFormValid(formValid)
  }, [error])

  function onChange(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage

    setValues(values => ({ ...values, [name]: value }));
    setError(errors => ({ ...errors, [name]: error }));
  }
  function resetValidation(values = {}, error = {}) {
    setValues(values);
    setError(error)
  }


  return {
    values,
    setValues,
    error,
    onChange,
    resetValidation,
    formValid
  }
}

