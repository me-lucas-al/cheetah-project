CREATE DATABASE IF NOT EXISTS bdd;
USE bdd;

DROP TABLE IF EXISTS Monitor;
DROP TABLE IF EXISTS Aluno;
DROP TABLE IF EXISTS User;


CREATE TABLE User (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    senha VARCHAR(25) NOT NULL,
    data_nascimento DATE,
    genero VARCHAR(10),    
    estado VARCHAR(50),    
    cidade VARCHAR(50),    
    tipoUser ENUM('Aluno', 'Monitor') NOT NULL 
);


CREATE TABLE Aluno (
    id BIGINT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);


CREATE TABLE Monitor (
    id BIGINT PRIMARY KEY,
    rg CHAR(9) UNIQUE, 
    formacao VARCHAR(100),  
    formacao_status VARCHAR(50),
    diploma BLOB,          
    documento_identidade BLOB, 
    FOREIGN KEY (id) REFERENCES User(id) ON DELETE CASCADE
);
