# App

GymPass style app.

## RFs (Requisitos funcionais)

- [V] Deve ser possível se cadastrar;
- [V] Deve ser possível se autenticar;
- [V] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [V] Deve ser possível o usuário realizar check-ins em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [V] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [V] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [V] O usuário não pode fazer 2 check-ins no mesmo dia;
- [V] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [V] A senha do usuário precisa estar criptografada;
- [V] Os dados da aplicação precisa estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
