import authClient from "../clients/authClient.js";

export const loginCredencial = (basicToken) => authClient.post("/auth/credencial/login", "", {
    headers: {
        Authorization: `Basic ${basicToken}`,
        "X-CSRF-TOKEN": "",
    },
});
