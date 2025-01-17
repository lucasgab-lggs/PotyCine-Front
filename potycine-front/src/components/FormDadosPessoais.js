import React from "react";

const FormDadosPessoais = ({ onNext }) => {
  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="fw-bold text-center">Informações básicas</h1>
      </div>
      <form className="">
        <div className="row row-cols-1 px-4 gap-4">
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="name"
              placeholder="Nome"
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="email"
              placeholder="Email"
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="password"
              name="password"
              placeholder="Senha"
              required
            ></input>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
        <button
          onClick={onNext}
          className="py-2 d-flex justify-content-between px-4"
        >
          Próximo <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default FormDadosPessoais;
