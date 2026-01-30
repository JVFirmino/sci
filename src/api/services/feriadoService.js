import servicoClient from "../clients/rhNetClient.js";

export const cadastrarFeriado = (feriadoData, jwtToken) => servicoClient.post("/feriados", feriadoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const atualizarFeriado = (feriadoData, jwtToken) => servicoClient.put("/feriados", feriadoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const deletarFeriado = (feriadoData, jwtToken) => servicoClient.delete("/feriados", {
    data: feriadoData,
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});