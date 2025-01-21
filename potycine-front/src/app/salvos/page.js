"use client";

import { useState, useEffect } from "react";
import { getUserId } from "@/services/auth";
import { getTicketsByUserId, buyTicket } from "@/services/users";
import "./TicketsPage.css";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  //PEGA ESSAS 2 CONSTANTES
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  //===============================================

  useEffect(() => {
    async function fetchTickets() {
      try {
        const userId = await getUserId();
        const userTickets = await getTicketsByUserId(userId);
        setTickets(userTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    fetchTickets();
  }, []);

  //PEGAR ISSO AQUI TAMBÉM
  const openPopup = () => {
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

  const handleBuyTicket = async () => {
    try {
      const userId = await getUserId();
      //COLOCAR VARIÁVEIS DE VERDADE EM EVENT_ID E PRICE
      await buyTicket(userId, 2 ,40, ticketCount);
      alert("Compra realizada com sucesso!");
      closePopup();
    } catch (error) {
      console.error("Erro ao comprar ingresso:", error);
      alert("Ocorreu um erro na compra. Tente novamente.");
    }
  };
  //=============================================
  return (
    <div className="tickets-page">
      <h1 className="page-title">Meus Ingressos</h1>
      <div className="tickets-container">
        {tickets.length > 0 ? (
          <div className="tickets-list">
            {tickets.map((ticket, index) => (
              <div key={index} className="ticket-card">
                <h2 className="ticket-title">{ticket.eventName}</h2>
                <p className="ticket-info"><strong>Evento:</strong> {ticket.event.name}</p>
                <p className="ticket-info"><strong>Local:</strong> {ticket.event.address}</p>
                <p className="ticket-info"><strong>Data:</strong> {ticket.event.startDate} - {ticket.event.endDate}</p>
                <p className="ticket-info"><strong>Preço:</strong> R${ticket.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tickets">Você ainda não possui ingressos.</p>
        )}
      </div>

    //COMEÇA AQUI
      {/* Botão para abrir o pop-up de compra */}
      <button className="buy-button" onClick={openPopup}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
        </svg>
      </button>

      {/* Pop-up de compra */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>X</button>

            <div className="ticket-sample">
              {tickets.length > 0 && (
                <div className="ticket-card">
                  <h2 className="ticket-title">{tickets[2].eventName}</h2>
                  <p className="ticket-info"><strong>Evento:</strong> {tickets[2].event.name}</p>
                  <p className="ticket-info"><strong>Local:</strong> {tickets[2].event.address}</p>
                  <p className="ticket-info"><strong>Data:</strong> {tickets[2].event.startDate} - {tickets[2].event.endDate}</p>
                  <p className="ticket-info"><strong>Preço:</strong> R${tickets[2].price}</p>
                </div>
              )}
            </div>

            <div className="ticket-quantity">
              <button onClick={decrementTicketCount} className="quantity-button">-</button>
              <span>{ticketCount}</span>
              <button onClick={incrementTicketCount} className="quantity-button">+</button>
            </div>

            <button className="confirm-button" onClick={handleBuyTicket}>Confirmar Compra</button>
          </div>
        </div>
      )}
      //TERMINA AQ
    </div>
  );
}
