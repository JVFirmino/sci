import authClient from "../clients/authClient.js";

// Função para realizar login e obter token JWT
export const loginCredencial = (basicToken) => authClient.post("/auth/credencial/login", "", {
    headers:{
        "Authorization": `Basic ${basicToken}`
    },
});

// Função para renovar o token JWT
export const refresh = (jwtToken) => authClient.post("/auth/refresh", "", {
    headers:{
        "Authorization": `Bearer ${jwtToken}`
    },
});
