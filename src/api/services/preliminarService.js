import servicoClient from "../clients/rhNetClient.js";

export const cadastrarAdmissaoPreliminar = (admissaoData, jwtToken) => servicoClient.post("/funcionario/preliminar", admissaoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});


export const atualizarPreliminar = (admissaoData, jwtToken) => servicoClient.put("/funcionario/preliminar", admissaoData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});


export const deletarAdmissaoPreliminar = (admissaoData, jwtToken) => servicoClient.delete("/funcionario/preliminar", {
    data: admissaoData,
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});