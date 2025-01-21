"use client"

import './explorarpage.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getEvents } from '@/services/event';
import { getUserId } from '@/services/auth';
import { buyTicket } from '@/services/users';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [halfTicketCount, setHalfTicketCount] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

    return { day, month, time: time };
  };

  // Funções de controle do pop-up e quantidade de ingressos
  const openPopup = (event) => {
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const incrementTicketCount = () => {
    setTicketCount(ticketCount + 1);
  };

  const decrementTicketCount = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const incrementHalfTicketCount = () => {
    setHalfTicketCount(halfTicketCount + 1);
  };

  const decrementHalfTicketCount = () => {
    if (halfTicketCount > 0) {
      setHalfTicketCount(halfTicketCount - 1);
    }
  };

  const handleBuyTicket = async () => {
    try {
      const userId = await getUserId();
      /* COLOCAR VARIÁVEIS DE VERDADE EM EVENT_ID E PRICE*/
      await buyTicket(userId, selectedEvent.id, selectedEvent.price, ticketCount);
      await buyTicket(userId, selectedEvent.id, (selectedEvent.price / 2).toFixed(2), halfTicketCount);
      alert("Compra realizada com sucesso!");
      closePopup();
    } catch (error) {
      console.error("Erro ao comprar ingresso:", error);
      alert("Ocorreu um erro na compra. Tente novamente.");
    }
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

                  {/* Link para redirecionar à página do produtor */}
                  <Link
                    href={`/perfil/${event.producer.user.id}`}
                    className="btn btn-primary"
                  >
                    Ver Perfil do Produtor
                  </Link>
                  {/* Botão para abrir o pop-up de compra */}
                  <button className="buy-button" onClick={() => openPopup(event)}>
                    Comprar Ingresso
                  </button>
                </div>
              </div>
              <br />
            </div>
          );
        })}
      </div>

      {/* Pop-up de compra */}
      {isPopupOpen && selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            {/* Botão de fechar no canto superior direito */}
            <button
              className="close-button"
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'red',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>

            <div className="ticket-sample">
              <div className="ticket-card">
                <h2 className="ticket-title">{selectedEvent.name}</h2>
                <p className="ticket-info"><strong>Evento:</strong> {selectedEvent.name}</p>
                <p className="ticket-info"><strong>Local:</strong> {selectedEvent.address}</p>
                <p className="ticket-info"><strong>Data:</strong> {selectedEvent.startDate} - {selectedEvent.endDate}</p>
                <p className="ticket-info"><strong>Preço Inteira:</strong> R${selectedEvent.price}</p>
              </div>

              {/* Contêiner para ingresso inteiro */}
              <div className="ticket-container white-background">
                <div className="ticket-left">
                  <h4>Inteira</h4>
                  <p>R${selectedEvent.price}</p>
                </div>
                <div className="ticket-right">
                  <button onClick={decrementTicketCount} className="quantity-button">-</button>
                  <span>{ticketCount}</span>
                  <button onClick={incrementTicketCount} className="quantity-button">+</button>
                </div>
              </div>

              {/* Contêiner para ingresso meia entrada */}
              <div className="ticket-container white-background">
                <div className="ticket-left">
                  <h4>Meia Entrada</h4>
                  <p>R${(selectedEvent.price / 2).toFixed(2)}</p>
                </div>
                <div className="ticket-right">
                  <button onClick={decrementHalfTicketCount} className="quantity-button">-</button>
                  <span>{halfTicketCount}</span>
                  <button onClick={incrementHalfTicketCount} className="quantity-button">+</button>
                </div>
              </div>
            </div>

            <button className="confirm-button" onClick={handleBuyTicket}>Confirmar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}
