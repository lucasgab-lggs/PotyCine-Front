"use client"

import './explorarpage.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getEvents } from '@/services/event';

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  // Carrega os eventos no cliente
  useEffect(() => {
    async function fetchEvents() {
      const data = await getEvents(); // Para obter do back, descomentar o import e comentar a função que retorna placeholders.
      setEvents(data);
    }
    fetchEvents();
  }, []);

  // Função para formatar a data e hora
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = format(date, 'dd MMM yyyy, HH:mm', { locale: ptBR });
    const [day, monthYearTime] = formattedDate.split(' ');
    const [month, time] = monthYearTime.split(',');

    return { day, month, time:time };
  };

  return (
    <div className="container-fluid py-4">
      {/* Avatar e Categorias */}
      <div className="text-center mb-4">
        <Link href="/perfil" className="avatar mx-auto mb-3">
          <img
            src="/images/cover.jpg"
            alt="Avatar"
            className="rounded-circle img-fluid"
            style={{ maxWidth: '4rem', cursor: 'pointer' }}
          />
        </Link>
        <div className="categories d-flex flex-wrap justify-content-center">
          {['Exibição', 'Festival', 'Oficina', 'Longa-metragem', 'Curta-metragem', 'Outro'].map(
            (category) => (
              <button key={category} className="btn mx-2 mb-2 rounded-pill">
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Lista de Eventos Dinâmicos */}
      <div className="row">
        {events.map((event) => {
          const { day, month, time } = formatDate(event.startDate);
          return (
            <div className="col-md-6 col-lg-4 mb-4" key={event.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Data e Hora */}
                  <div className="d-flex align-items-center flex-wrap">
                    <h5 className="date text-danger me-3">{day}</h5>
                    <div>
                      <h6 className="month mb-0">{month}</h6>
                      <small>{time}</small>
                    </div>
                  </div>

                  {/* Nome e Local */}
                  <h5 className="mt-3">{event.name}</h5>
                  <p className="text-muted mb-1">
                    <i className="bi bi-geo-alt"></i> {event.address}
                  </p>
                </div>
              </div>
              <br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
}
