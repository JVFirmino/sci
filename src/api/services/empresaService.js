import facialClient from "../clients/facialClient";

export const cadastrarEmpresa = (empresaData, jwtToken) => facialClient.post("/empresa", empresaData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});

export const buscarEmpresa = (cnpj, jwtToken) => facialClient.get(`/empresa/${cnpj}`, {
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "accept": "application/json"
    }
});

export const deletarEmpresa = (cnpj, jwtToken) => facialClient.delete(`/empresa/${cnpj}`, {
    headers: {
        "Authorization": `Bearer ${jwtToken}`,
        "accept": "application/json"
    }
});


