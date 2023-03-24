
// Попап с формой

import Form from "./Form";
import Popup from "./Popup";

export default function PopupWithForm({ name, title, isOpen, onClose, children, onSubmit, formValid, buttonText }) {
  return (

    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__text">{title}</h2>
      <Form name={name} onSubmit={onSubmit} >
        {children}
        <button className={`popup__submit ${formValid ? "" : "popup__submit_disabled"}`} disabled={formValid ? "" : true} type="submit">{buttonText}</button>
      </Form>
    </Popup>
  )
}
