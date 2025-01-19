"use client";
import "./createexhibits.css";

import { use, useEffect, useState } from "react";
import { getProducerByUserId, getUserId } from "@/services/auth";
import { createEvent, createExhibits } from "@/services/event";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function CreateEventsPage() {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    movieTitle: "",
    movieDuration: "",
    movieDescription: "",
    movieDirector: "",
    movieScript: "",
    time: "",
    date: "",
  });

  function formatDate(dateString, timeString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}T${timeString}:00`;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedTime = formatDate(formValues.date, formValues.time);
    const exhibit = {
      ...formValues,
      eventId: slug,
      time: formattedTime,
    };

    console.log(exhibit);
    createExhibits(exhibit);
    router.push("/eventos/explorar");
  };

  return (
    <div>
      <div className="mt-5 mb-5">
        <h1 className="fw-bold text-center p-5">Adicionar exibição</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row row-cols-1 px-4 gap-4">
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="text"
              name="movieTitle"
              placeholder="Titulo"
              value={formValues.name}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="col">
            <input
              className="form-control px-2 py-3"
              type="number"
              name="movieDuration"
              placeholder="Duração (minutos)"
              value={formValues.name}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="col">
            <textarea
              className="form-control px-2 py-3"
              type="text"
              name="movieDescription"
              placeholder="Descrição"
              value={formValues.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="col row d-flex row-data">
            <div className="col">
              <input
                className="form-control py-3"
                type="text"
                name="movieDirector"
                placeholder="Diretor"
                value={formValues.startDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="col">
              <input
                className="form-control py-3"
                type="text"
                name="movieScript"
                placeholder="Roteirista"
                value={formValues.endDate}
                onChange={handleInputChange}
                required
              ></input>
            </div>
          </div>
          <div className="col row d-flex row-data">
            <div className="col">
              <label>Horário</label>
              <input
                className="form-control py-3"
                type="time"
                name="time"
                value={formValues.time}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="col">
              <label>Data</label>
              <input
                className="form-control py-3"
                type="date"
                name="date"
                value={formValues.date}
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
