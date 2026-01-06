import servicoClient from "../clients/rhNet.js ";

export const cadastrarFeriado = (feriadoData, jwtToken) => servicoClient.post("/feriados", feriadoData, {
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