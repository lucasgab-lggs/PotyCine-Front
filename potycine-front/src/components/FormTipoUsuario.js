import React from "react";
import { useState } from "react";

const FormTipoUsuario = ({ onNext }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleUserType = (userType) => {
    setSelectedUserType(userType);
  };
  return (
    <div>
      <div className="mt-5 mb-3">
        <h1 className="fw-bold text-center p-5">
          Vamos começar o seu registro
        </h1>
        <p className="fs-4 px-4 subtitulo">Você é ...</p>
      </div>
      <form className="register-form">
        <div className="row px-4 d-flex justify-content-between gap-2">
          <div
            className={`col tipo-usuario ${
              selectedUserType === "USER" ? "selected" : ""
            }`}
            onClick={() => handleUserType("USER")}
          >
            <div className="text-center">
              <div>
                <i className="bi bi-sunglasses"></i>
              </div>
              <span className="fw-semibold">Cinéfilo</span>
            </div>
          </div>
          <div
            className={`col tipo-usuario ${
              selectedUserType === "PRODUCER" ? "selected" : ""
            }`}
            onClick={() => handleUserType("PRODUCER")}
          >
            <div className="text-center">
              <div>
                <i className="bi bi-film"></i>
              </div>
              <span className="fw-semibold">Produtor</span>
            </div>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
        <button onClick={onNext} className="py-2 d-flex justify-content-between px-4">Próximo <i class="bi bi-chevron-right"></i></button>
      </div>
    </div>
  );
};

export default FormTipoUsuario;
