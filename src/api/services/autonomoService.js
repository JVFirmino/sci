import servicoClient from "../clients/rhNet.js ";

export const cadastrarAutonomo = (autonomoData, jwtToken) => servicoClient.post("/autonomo/autonomos", autonomoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const deletarAutonomo = (autonomoData, jwtToken) => servicoClient.delete("/autonomo/autonomos", {
    data: autonomoData,
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});