import React from "react";
import { useState } from "react";

const FormPortfolio = ({ onSubmit, onPortfolioSubmit }) => {
  const [formValues, setFormValues] = useState({
    companyName: "",
    portfolio: {
      title1: "",
      link1: "",
      title2: "",
      link2: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formValues.portfolio) {
      setFormValues((prev) => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          [name]: value,
        },
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      companyName: formValues.companyName,
      portfolio: {
        [formValues.portfolio.title1]: formValues.portfolio.link1,
        [formValues.portfolio.title2]: formValues.portfolio.link2,
      },
    };
    //console.log(requestData)

    onPortfolioSubmit(requestData);
  }


  return (
    <div>
      <div className="mt-5 mb-3">
        <h1 className="fw-bold text-center pt-5">Produtora</h1>
      </div>
      <form onSubmit={handlePortfolioSubmit} className="p-4">
        <div className="mb-5">
          <input
            className="form-control px-2 py-3"
            type="text"
            name="companyName"
            placeholder="Nome da empresa"
            value={formValues.companyName}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <p className="fs-4 px-4 text-center">
          Onde podemos encontrar mais sobre os seus projetos?
        </p>
        <div className="row row-portfolio mb-3">
          <div className="col-4 ">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="title1"
              placeholder="Título 1"
              value={formValues.portfolio.title1}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="link1"
              placeholder="Link 1"
              value={formValues.portfolio.link1}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="title2"
              placeholder="Título 2"
              value={formValues.portfolio.title2}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="link2"
              placeholder="Link 2"
              value={formValues.portfolio.link2}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
          <button
            type="submit"
            className="py-2 d-flex justify-content-center px-4"
          >
            Finalizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPortfolio;
