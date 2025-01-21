import {getToken} from "./auth";

export async function getProducerByUserId(userId) {
    const res = await fetch(`http://localhost:8080/producers/${userId}`, {
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
export async function getDataByUserId(userId) {
    const res = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar dados do usuário');
    }

    const data = await res.json();
    return data;
}

export async function getTicketsByUserId(userId) {
    const res = await fetch(`http://localhost:8080/users/${userId}/tickets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
        }
    });

    if (!res.ok) {
        throw new Error('Erro ao buscar os tickets do usuário');
    }

    const data = await res.json();
    return data;
}
export async function buyTicket(userId, eventId, price, quantity) {
    let data = [];

    for (let i = 0; i < quantity; i++) {
        const res = await fetch(`http://localhost:8080/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ userId, eventId, price })
        });

        if (!res.ok) {
            throw new Error('Erro ao comprar ticket');
        }
        const ticketData = await res.json();
        data.push(ticketData);
    }
    return data;
}






