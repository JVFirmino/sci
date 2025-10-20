import authClient from "../clients/authClient.js";

export const loginCredencial = () =>
    authClient.post("/auth/credencial/login", "", {
    headers: {
        Authorization: `Basic ${process.env.BASIC_TOKEN}`,
        "X-CSRF-TOKEN": "",
    },
});
