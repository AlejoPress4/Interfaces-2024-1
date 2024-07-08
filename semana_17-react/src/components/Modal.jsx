import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => { 
  const [formState, setFormState] = useState( // Se inicializa el estado del formulario, permite añadir el estado local a los componentes funcionales
    defaultValue || {
      date: "",
      description: "",
      status: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => { // Se crea una función para validar 
    if (formState.date && formState.description && formState.status) { //sirve para validar el form que no este vacio 
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) { //aqui se recorre el objeto 
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => { //se crea la funcion para los inputs y sus cambios 
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => { //se crea la funcion para el submit
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  //estas dos ultimas funciones no las entendi muy bien

  return ( 
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal(); 
      }}
    >
      <div className="modal"> 
        <form> 
          <div className="form-group">
            <label htmlFor="date">Fecha y Hora</label>
            <input name="date" onChange={handleChange} value={formState.date } />
          </div>
          <div className="form-group">
            <label htmlFor="description">Tarea a Programar</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              name="status"
              onChange={handleChange} //se agrega el evento onChange
              value ={formState.status}
            >
              <option value="No_Iniciada">Sin iniciar</option>
              <option value="En_Proceso">En proceso</option>
              <option value="Completada">Terminada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Abandonada">Abandonada Sin Terminar</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};