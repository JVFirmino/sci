import servicoClient from "../clients/servicoClient.js";

export const cadastrarServico = (servicoData, jwtToken) => servicoClient.post("/autonomo/tiposervicos", servicoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});
