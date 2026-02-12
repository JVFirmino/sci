import jwt from "jsonwebtoken";

export function gerarBasicToken(username, password) {
  return Buffer.from(`${username}:${password}`).toString("base64");
};

export function decodificarJwt(token) {
  return jwt.decode(token);
};