import Cookies from "js-cookie";

export async function registerUser(user) {
    const res = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!res.ok) {
        throw new Error('Erro ao cadastrar usuário');
    }
    const data = await res.json();
    return data;
};

export async function registerProducer(producer) {
    const res = await fetch('http://localhost:8080/producers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producer),
    });

    if (!res.ok) {
        throw new Error('Erro ao cadastrar produtor');
    }
    const data = await res.json();
    return data;
};

export async function loginUser(email, password) {
    const res = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error('Email ou senha inválidos');
    }

    const data = await res.json();
    return data.token;
}

export function saveToken(token) {
    Cookies.set('token', token);
}

export function getToken() {
    return Cookies.get('token');
}

export function removeToken() {
    Cookies.remove('token');
}

export function isLoggedIn() {
    return !!getToken();
}

