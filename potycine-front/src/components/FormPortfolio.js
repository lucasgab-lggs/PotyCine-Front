import React from "react";

const FormPortfolio = ({ onSubmit }) => {
  return (
    <div>
      <div className="mt-5 mb-3">
        <h1 className="fw-bold text-center pt-5">Portfolio</h1>
        <p className="fs-4 px-4 text-center">
          Onde podemos encontrar mais sobre os seus projetos
        </p>
      </div>
      <form className="p-4 ">
          <div className="row row-portfolio mb-3">
            <div className="col-4 ">
              <input
                className="form-control px-2 py-3"
                type="text"
                name="title"
                placeholder="Título"
                required
              ></input>
            </div>
            <div className="col">
              <input
                className="form-control px-2 py-3"
                type="text"
                name="link-1"
                placeholder="Link"
                required
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <input
                className="form-control px-2 py-3"
                type="text"
                name="title"
                placeholder="Título"
                required
              ></input>
            </div>
            <div className="col">
              <input
                className="form-control px-2 py-3"
                type="text"
                name="link-2"
                placeholder="Link"
                required
              ></input>
            </div>
          </div>
      </form>
      <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
        <button
          onClick={onSubmit}
          className="py-2 d-flex justify-content-center px-4"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default FormPortfolio;
