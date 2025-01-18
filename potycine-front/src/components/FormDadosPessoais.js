import React from "react";
import { useState } from "react";

const FormDadosPessoais = ({ onNext, userType, onSubmit, saveFormData }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
      role: userType,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  }

  const handleNext = () => {
    console.log("formValues", formValues);
    saveFormData(formValues);
    onNext();
  }

  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="fw-bold text-center p-5">Informações básicas</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 px-4 gap-4">
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="name"
              placeholder="Nome"
              value={formValues.name}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="password"
              name="password"
              placeholder="Senha"
              value={formValues.password}
              onChange={handleInputChange}
              required
            ></input>
          </div>
        </div>
      <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
        {userType === "PRODUCER" ? (
          <button
            onClick={handleNext}
            className="py-2 d-flex justify-content-between px-4"
          >
            Próximo <i className="bi bi-chevron-right"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="py-2 d-flex justify-content-center px-4"
          >
            Finalizar
          </button>
        )}
      </div>
      </form>
    </div>
  );
};

export default FormDadosPessoais;
