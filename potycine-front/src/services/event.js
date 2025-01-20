import { getToken } from "./auth";

export async function createEvent(event) {
    const res = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(event),
    });

    if (!res.ok) {
        throw new Error('Erro ao cadastrar evento');
    }
    const data = await res.json();
    return data;
}

export async function getEvents() {
    const res = await fetch('http://localhost:8080/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar eventos');
    }
    const data = await res.json();
    return data;
}

export async function createExhibits(exhibits) {
    const res = await fetch('http://localhost:8080/exhibits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(exhibits),
    });

    if (!res.ok) {
        throw new Error('Erro ao cadastrar exibição');
    }
    const data = await res.json();
    return data;
}

export async function getEventsByUserId(userId) {
    const res = await fetch(`http://localhost:8080/events/producer/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar dados de produtor');
    }

    const data = await res.json();
    return data;
}
