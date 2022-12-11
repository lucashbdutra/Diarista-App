# Diarista-App

Aplicação para agendamento de visitas e avaliação para diaristas.

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/lucashbdutra/Diarista-App/blob/main/LICENSE) 

## Sobre o projeto

Uma aplicação full stack, composta de uma API rest no back-end que utilizando o SpringBoot e o framework Angular no front. O foco da aplicação é permitir o agendamento dinâmico de visitas para diaristas, permitindo também a avaliação do trabalho da profissional da limpeza por parte do cliente.

## Tecnologias utilizadas
### Back end
- Java
- Spring Boot
- JPA / Hibernate / H2
- Maven
- Angular
- Nodejs

### Front end
- Angular
- Nodejs
- Npm


## Como executar o projeto

### Back end
Pré-requisitos: 
- Java: 17
- Maven

### Front end
- Nodejs: LTS
- Npm
- Angular

```bash
## clonar repositório
git clone https://github.com/lucashbdutra/Diarista-App

## entrar na pasta do projeto que você quer executar
cd Diarista-App/Diarista-View
Dentro dessa pasta executar o comando "npm install"

cd Diarista-App/diarista
Dentro dessa pasta executar o comando "mvn install"


## executar o projeto
### Back end
Execute o comando a seguir:
java -jar ./diarista/target/diarista-0.0.1-SNAPSHOT.jar

### Front end
Execute os comandos a seguir em ordem:
cd Diarista-View
ng serve
```


## Documentação
#### Swagger
http://localhost:8080/swagger-ui.html

# Autor

Lucas Dutra

https://www.linkedin.com/in/lucas-dutra-8b41681b7/
