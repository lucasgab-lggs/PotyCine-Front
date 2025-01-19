"use client"
import "./createevent.css";

import { use, useEffect, useState } from "react";
import { getProducerByUserId, getUserId } from "@/services/auth";
import { createEvent } from "@/services/event";
import { useRouter } from "next/navigation";

export default function CreateEventsPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    address: "",
    startDate: "",
    endDate: "",
  });
  const [producer, setProducer] = useState({});

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const day = String(date.getDate()).padStart(2, '0');
    const hours = '22';
    const minutes = '00';
    const seconds = '00';
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const idUser = getUserId();
    if (idUser) {
      const producer = getProducerByUserId(idUser).then((data) => {
        setProducer(data);
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedStartDate = formatDate(formValues.startDate);
    const formattedEndDate = formatDate(formValues.endDate);
    const event = {
      ...formValues,
      producerId: producer.id,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    }
    createEvent(event);
    router.push("/eventos/explorar");
  }

  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="fw-bold text-center p-5">Dados do evento</h1>
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
            <textarea
              className="form-control px-2 py-3"
              type="text"
              name="description"
              placeholder="Descrição do evento"
              value={formValues.description}
              onChange={handleInputChange}
              required
            >
            </textarea>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="address"
              placeholder="Endereço"
              value={formValues.address}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="col row d-flex">
            <div className="col">
              <label>Data de Início</label>
              <input
                className="form-control py-3"
                type="date"
                name="startDate"
                value={formValues.startDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="col">
              <label>Data de Finalização</label>
              <input
                className="form-control py-3"
                type="date"
                name="endDate"
                value={formValues.endDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-5 p-2 fixed-bottom mb-5">
          <button
            type="submit"
            className="py-2 d-flex justify-content-center px-4"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
