import axios from "axios";

const facialClient = axios.create({
    baseURL: "https://api-facial.sci.com.br/v1",
    timeout: 20000,
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
    },
});

facialClient.interceptors.request.use(
    async (config) => {
        if (config.headers?.Authorization?.startsWith("Bearer ")) {
            await new Promise(resolve => setTimeout(resolve, 6000));
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default facialClient;