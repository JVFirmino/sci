import axios from "axios";

const servicoClient = axios.create({
    baseURL: "https://api2.rhnetsocial.com.br/api/v1",
    timeout: 20000,
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
    },
});

servicoClient.interceptors.request.use(
    async (config) => {
        if (config.headers?.Authorization?.startsWith("Bearer ")) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default servicoClient;
