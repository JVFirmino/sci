import authClient from "../clients/authClient.js";

export const loginCredencial = (basicToken) => authClient.post("/auth/credencial/login", "", {
    headers:{
        "Authorization": `Basic ${basicToken}`,
        "X-CSRF-TOKEN": "",
    },
});

export const refresh = (jwtToken) => authClient.post("/auth/refresh", "", {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
        "X-CSRF-TOKEN": "",
    },
});
