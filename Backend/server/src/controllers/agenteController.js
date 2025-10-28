import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";
import { authenticate } from "../utils/jwt.js";
import express from "express";
import agente from "../entities/agente.js";
import usuario from "../entities/usuario.js";
import paciente from "../entities/paciente.js";
import posto from "../entities/postosaude.js";
import cbo from "../entities/cbo.js";

const route = express.Router();
const repositorioAgente = AppDataSource.getRepository(agente);
const repositorioUsuario = AppDataSource.getRepository(usuario);
const repositorioPosto = AppDataSource.getRepository(posto);
const repositorioCbo = AppDataSource.getRepository(cbo);
const repositorioPaciente = AppDataSource.getRepository(paciente);

route.get("/", async (request, response) => {
    const agentes = await repositorioAgente.findBy({data_demissao: IsNull()});
    return response.status(200).send({response: agentes});
});

route.get("/:encontrarNome", async (request, response) => {
    const {encontrarNome} = request.params;
    const encontrarAgente = await repositorioAgente.find({where: [
        {nome_agente: Like(`%${encontrarNome}`)},
        {cpf: encontrarNome}
    ]});
    return response.status(200).send({response: encontrarAgente});
});

route.get("/perfil", authenticate, async (request, response) => {
   const {usuario} = request;

   if (!usuario) {
    return response.status(403).send({response: "Sem permissão de acesso."});
   }

   try {
    const agente = await repositorioAgente.findOne({where:
        {cpf: usuario.cpf},
        relations: ["posto", "cbo"]
    });

    if (!agente) {
        return response.status(404).send({response: "Agente não encontrado."});
    }

    const agentePayload = {
        ...agente,
        posto: agente.posto.nome_posto,
        cbo_codigo: agente.cbo.codigo,
        cbo_descricao: agente.cbo.descricao,
        createdAt: usuario.createdAt
    };

    return response.status(200).send(agentePayload); 
   } catch(err) {
    console.log(err);
   }
});

// CADASTRO DE AGENTES
route.post("/", async (request, response) => {
    const {nome_agente, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_agente.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }
    
    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        const novo_agente = repositorioAgente.create({nome_agente, cpf, data_admissao, email, telefone, posto, cbo});
        await repositorioAgente.save(novo_agente);
        return response.status(201).send({response: "Agente cadastrado com sucesso."});
    } catch(err) {
        return response.status(500).send({response: err});
    }
});

// CADASTRO DE PACIENTES
route.post("/cadastroPaciente", async (request, response) => {
    const {cpf, sus, nome, nome_social, data_nascimento, num_telefone, email, estado_civil, etnia, genero, escolaridade, 
          nacionalidade, naturalidade_estado, naturalidade_municipio, estado_clinico, responsavel_legal, filiacao_mae, filiacao_pai, 
          leitura, escrita, nome_instituicao, tipo_instituicao, id_endereco, id_agente, id_cbo } = request.body;
       
    if(cpf.length != 11) {
        return response.status(400).send({response: "O CPF deve conter 11 dígitos."});
    }

    if(sus.length != 15) {
        return response.status(400).send({response: "O Sus deve conter 15 caracteres."});
    }
        
    if(nome.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }

    if(data_nascimento.length != 8) {
        return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
    }
    
    if(num_telefone.length < 10 || num_telefone.length > 11) {
        return response.status(400).send({response: "O numero deve conter pelo menos 10 caraceteres."});
    }
    
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'."});
    }

    if(etnia.length < 1) {
        return response.status(400).send({response: "A etnia deve conter pelo menos 1 caracetere."});
    }

    if(genero.length < 1) {
        return response.status(400).send({response: "O genero deve conter pelo menos 1 caracetere."});
    }
    
    if(escolaridade.length < 1) {
        return response.status(400).send({response: "A escolaridade deve conter pelo menos 1 caracetere."});
    }
    
    if(nacionalidade.length < 1) {
        return response.status(400).send({response: "A nacionalidade deve conter pelo menos 1 caracetere."});
    }
    
    if(naturalidade_estado.length < 1) {
        return response.status(400).send({response: "A naturalidade do estado deve conter pelo menos 1 caracetere."});
    }

    if(naturalidade_municipio.length < 1) {
        return response.status(400).send({response: "A naturalidade do municipio deve conter pelo menos 1 caracetere."});
    }
    if(estado_clinico.length < 1) {
        return response.status(400).send({response: "O estado clinico deve conter pelo menos 1 caracetere."});
    }

    if(responsavel_legal.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }
    
    if(filiacao_mae.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }

    if(filiacao_pai.length < 1) {
        return response.status(400).send({response: "O nome deve conter pelo menos 1 caracetere."});
    }

    try {
        const endereco = await repositorioEndereco.findOneBy({
            id: id_endereco
        })
        if(!endereco) {
            return response.status(400).send({response: "Esse endereço não foi encontrado."});
        }

        const agente = await repositorioagente.findOneBy({
            id: id_agente,
            deletedAt: IsNull()
        })
        if(!agente) {
            return response.status(400).send({response: "Esse agente não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        })
        if(!cbo) {
            return response.status(400).send({response: "Esse cbo não foi encontrado."});
        }

        const nomeSocial = nome_social != null ? nome_social : null; // Cria uma variavel chamada nomeSocial, onde verifica a variavel vinda do Front (nome_social) se ela está vazia ou tem algum valor. Se tiver, insere o valor na nomeSocial. Se não tiver, mantém vazio.

        const novo_paciente = repositorioPaciente.create({cpf, sus, nome, nome_social : nomeSocial, data_nascimento, num_telefone, email, estado_civil, etnia, genero, escolaridade, 
        nacionalidade, naturalidade_estado, naturalidade_municipio, estado_clinico, responsavel_legal, filiacao_mae, filiacao_pai, 
        leitura, escrita, nome_instituicao, tipo_instituicao, endereco, agente, cbo});

        await repositorioPaciente.save(novo_paciente);
        
    } catch (err) {
        console.log(err)
        return response.status(500).send({response: err});
    }

    return response.status(201).send({response: "Paciente cadastrado com sucesso."});
})

route.put("/:id", async (request, response) => {

    const {id} = request.params;
    const {nome_agente, cpf, data_admissao, email, telefone, id_posto, id_cbo} = request.body;

    if(nome_agente.length < 1) {
        return response.status(400).send({response: "O nome deve conter no mínimo 1 caractere."});
    }
    if(cpf.length != 11) {
        return response.status(400).send({response: "O cpf deve conter 11 caracteres."});
    }
    if(data_admissao.length != 8) {
        return response.status(400).send({response: "A data deve estar no formato de data"});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "O email deve conter '@'"});
    }
    if(telefone.length < 10 && telefone.length > 11) {
        return response.status(400).send({response: "O telefone deve conter até 11 caracteres."});
    }

    try {
        const posto = await repositorioPosto.findOneBy({
            id: id_posto
        });
        if(!posto) {
            return response.status(400).send({response: "Esse posto não foi encontrado."});
        }

        const cbo = await repositorioCbo.findOneBy({
            codigo: id_cbo
        });
        if(!cbo) {
            return response.status(400).send({response: "O cbo não foi encontrado."});
        }

        await repositorioAgente.update({id}, {nome_agente, cpf, data_admissao, email, telefone, posto, cbo});
        return response.status(200).send({response: "Agente atualizado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err})
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
        return response.status(400).send({response: "O id deve ser numérico."});
    }

    try {
        await repositorioAgente.update({id}, {data_demissao: () => "CURRENT_TIMESTAMP"});
        return response.status(200).send({response: "Agente deletado com sucesso."});
    } catch (err) {
        return response.status(500).send({response: err});
    }
});

export default route;