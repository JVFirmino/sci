import servicoClient from "../clients/rhNet";

export const liberarPreliminar = (liberarData, jwtToken) => servicoClient.post("/liberacao/preliminar", liberarData, {
    headers:{
        "Authorization": `Bearer ${jwtToken}`,
    }
});