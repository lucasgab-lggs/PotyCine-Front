import Link from "next/link";
import "./loginpage.css"

export default function LoginPage() {
    return (
      <div>
        <div className="my-5">
          <h1 className="fw-bold">Login</h1>
          <p className="fs-4">Bem vindo de volta!</p>
        </div>
        <form className="login-form">
          <div className="row row-cols-1 px-4 gap-4">
            <div className="col">
              <input
                className="form-control px-2 py-3"
                type = 'text'
                name = 'email'
                placeholder="Email"
                required
              ></input>
            </div>
            <div className="col">
              <input
                className="form-control px-2 py-3"
                type = 'password'
                name = 'password'
                placeholder="Senha"
                required
              ></input>
            </div>
            <div className="col d-flex justify-content-end">
              <a className="fw-bold esqueceu-senha">Esqueceu a senha?</a>
            </div>
            <div className="col">
              <button className="btn btn-entrar fw-semibold py-2 mt-4" >Entrar</button>
            </div>
            <div className="registro-text fs-5">
              Ainda não possui conta? <Link className="esqueceu-senha fw-bold" href="/registro">Registre-se</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
  