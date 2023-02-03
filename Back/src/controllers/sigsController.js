import * as userRepository from "../repositories/userRepository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signIn(req, res) {
  try {
    const rows = res.localItens;

    const token = uuid();

    await userRepository.insert({
      localItens: `sessions("userId", token)`,
      iten: [rows[0].id, token],
    });

    res.send({ token: token }).status(200);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function signUp(req, res) {
  const { name, email, pictureUrl, password } = req.body;

  const encrypt = bcrypt.hashSync(password, 10);

  // console.log(req, res)
  try {
    await userRepository.insert({
      localItens: `users("userName", email, "pictureUrl", "passwordHash" )`,
      iten: [name, email, pictureUrl, encrypt],
    });

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function signValid(req, res) {
  const obj = res.localItens;

  try {
    const rows = await userRepository.getItem({
      table: `users`,
      categori: "id",
      iten: obj.userId,
    });

    if (rows.length === 0) return res.sendStatus(400);

    delete rows[0].passwordHash;
    delete rows[0].createDate;

    res.send(rows[0]).status(201);
  } catch (error) {
    res.sendStatus(400);
  }
}
