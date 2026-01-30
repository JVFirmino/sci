import authLoginClient from "../clients/authLoginClient.js";

export const login = (login, senha) => authLoginClient.post("/auth/login", { login: login, senha: senha });