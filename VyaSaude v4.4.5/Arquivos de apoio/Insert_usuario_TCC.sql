CREATE DATABASE vya_saude;
USE vya_saude;

INSERT INTO usuario (cpf, nome, email, senha, tipoUsuario) VALUES 
(12345678901, "Paciente", "paciente@email.com", 12345678, "paciente"),
(12332112332, "Profissional", "profissional@email.com", 12345678, "profissional"),
(98765432109, "Admin", "admin@email.com", 12345678, "admin");

select * from usuario;
select * from paciente;
select * from profissional;
select * from admin;