"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserId } from "@/services/auth";
import { getProducerByUserId } from "@/services/users";
import { getEventsByUserId } from "@/services/event";
import "./PerfilPage.css";

export default function PerfilPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    bio: "This is your bio. You can update it!",
    events: [],
    profileImage: "/images/cover.jpg",
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserId();
        const producerData = await getProducerByUserId(userId);
        const eventsData = await getEventsByUserId(3);

        setUserData({
          id: userId,
          name: producerData.user.name,
          email: producerData.user.email,
          bio: producerData.bio || "This is your bio. You can update it!",
          events: eventsData || [],
          profileImage: producerData.profileImage || "/images/cover.jpg",
        });
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCreateEventClick = () => {
    router.push("/create-event");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfileImage(URL.createObjectURL(file)); // Cria uma URL temporária para a imagem
    }
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev); // Alterna entre o modo de edição e o modo de visualização
  };

  const handleBioChange = (event) => {
    setUserData((prev) => ({
      ...prev,
      bio: event.target.value,
    }));
  };

  return (
    <div className="perfil-body">
      {/* Container principal do perfil */}
      <div className="perfil-container">
        <img
          src={newProfileImage || userData.profileImage}
          alt="Perfil"
          className="perfil-image"
        />

        {/* Ícone de editar imagem */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="edit-icon"
          width="24"
          height="24"
          onClick={handleEditClick} // Alterna entre os modos de edição
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>

        {/* Campo para alterar a imagem, visível apenas quando estiver no modo de edição */}
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "block", marginTop: "10px" }} // Exibe o input de arquivo
          />
        )}

        <div className="perfil-content">
          <h2 className="perfil-title">{userData.name}</h2>
          <p className="perfil-text">{userData.email}</p>

          <div className="perfil-tags">
            {["Tag 1", "Tag 2", "Tag 3"].map((tag, index) => (
              <span key={index} className="perfil-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Container da bio */}
      <div className="bio-container">
        <h3 className="bio-title">Bio</h3>
        {isEditing ? (
          <textarea
            value={userData.bio}
            onChange={handleBioChange}
            className="bio-textarea"
          />
        ) : (
          <p className="bio-text">{userData.bio}</p>
        )}
      </div>

      {/* Contêiner dinâmico para eventos */}
      <div className="events-container">
        <div className="events-header">
          <h3 className="events-title">My Events</h3>
          <button className="add-event-button" onClick={handleCreateEventClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="add-event-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        {userData.events.length === 0 ? (
          <p className="events-empty">No events to display.</p>
        ) : (
          userData.events.map((event, index) => (
            <div key={index} className="event-card">
              <h4 className="event-name">{event.name}</h4>
              <p className="event-date">{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
              <p className="event-location">{event.address}</p>
              <p className="event-description">{event.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
