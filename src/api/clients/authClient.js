import axios from "axios";

const authClient = axios.create({
    baseURL: "https://api-auth-hml.sci.com.br/api/v1",
    timeout: 20000,
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default authClient;
