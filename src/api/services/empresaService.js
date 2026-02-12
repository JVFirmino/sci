import facialClient from "../clients/facialClient";

export const cadastrarEmpresa = (empresaData, jwtToken) => facialClient.post("/empresa", empresaData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});