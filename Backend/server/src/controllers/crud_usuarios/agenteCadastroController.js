import { AppDataSource } from "../../database/data-source.js";
import { Like, IsNull } from "typeorm";
import { authenticate } from "../../utils/jwt.js";

import express from "express";
import agente from "../../entities/agente.js";
import paciente from "../../entities/paciente.js";
import cbo from "../../entities/cbo.js";
import endereco from "../../entities/endereco.js";

const route = express.Router();
const repositorioAgente = AppDataSource.getRepository();
const repositorioPaciente = AppDataSource.getRepository();
const repositorioEndereco = AppDataSource.getRepository();
const repositorioCbo = AppDataSource.getRepository();


// CADASTRO DE PACIENTES


// CADASTRO DE REGISTROS


// ATUALIZAÇÃO DE PACIENTES


// ATUALIZAÇÃO DE REGISTROS


// EXCLUSÃO DE PACIENTES


// EXCLUSÃO DE REGISTROS