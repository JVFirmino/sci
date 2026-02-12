import authClient from "../clients/authClient.js";

export const loginCredencial = (basicToken) => authClient.post("/auth/credencial/login", "", {
    headers:{
        "Authorization": `Basic ${basicToken}`
    },
});

export const refresh = (jwtToken) => authClient.post("/auth/refresh", "", {
    headers:{
        "Authorization": `Bearer ${jwtToken}`
    },
});

export const login = (login, senha) => authClient.post("/auth/login", { 
    login: login, 
    senha: senha 
});
