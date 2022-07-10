<h1>Rentx</h1>

## Requisitos de negócio:

### Cadastro de carro

**Requisitos funcionais:**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**Regras de negócio:**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.

### Listagem de carros

**Requisitos funcionais:**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros pela caregoria.
Deve ser possível listar todos os carros pela marca.
Deve ser possível listar todos os carros pelo nome.

**Regras de negócio:**
O usuário não precisa estar logado no sistema.

### Cadastro de Especificações do carro

**Requisitos funcionais:**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**Regras de negócio:**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

### Cadastro de imagens do carro

**Requisitos funcionais:**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**Requisitos não funcionais:**
Utilizar o multer para fazer o upload do aquivo.

**Regras de negócio:**
O usuário deve poder cadastrar mais de uma imagem para o carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

### Aluguel de carro

**Requisitos funcionais:**
Deve ser possível cadastrar um aluguel.

**Regras de negócio:**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel, caso já exista um aluguel aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel, caso já exista um aluguel aberto para o mesmo carro.
O usuário deve estar logado na aplicação
Ao realizar o aluguél, o status do carro deverá ser alterado para indisponível

### Devolução do carro

**Requisitos funcionais:**
Deve ser possível realizar a devolução de um carro

**Regras de negócio:**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado a diária completa.
Ao realizar a devolução do carro, ele deve ficar disponível para o aluguel
Ao realizar a devolução, o usuário deverá ser liberado para um outro aluguel
Ao realizar a devolução, deverá ser calculado o valor do aluguél
Caso o horário da devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá der somado ao total do aluguél
O usuário deve estar logado na aplicação

### Recuperar a senha

**Requisitos funcionais**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**Regra de negócio**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação da senha deve ser expirado em 3 horas
