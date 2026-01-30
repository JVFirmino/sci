import axios from "axios";

const facialClient = axios.create({
    baseURL: "https://api-facial-hml.sci.com.br/v1",
    timeout: 20000,
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
    },
});

export default facialClient;