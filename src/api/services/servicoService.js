import servicoClient from "../clients/rhNetClient.js";

export const cadastrarServico = (servicoData, jwtToken) => servicoClient.post("/autonomo/tiposervicos", servicoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const atualizarServico = (servicoData, jwtToken) => servicoClient.put("/autonomo/tiposervicos", servicoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const deletarServico = (servicoData, jwtToken) => servicoClient.delete("/autonomo/tiposervicos", {
    data: servicoData,
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});