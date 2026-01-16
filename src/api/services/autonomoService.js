import servicoClient from "../clients/rhNet.js ";

export const cadastrarAutonomo = (autonomoData, jwtToken) => servicoClient.post("/autonomo/autonomos", autonomoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});