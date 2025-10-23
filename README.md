# **IMPORTANTE**

- Significados:
  - **Clonar**: Baixar arquivos do GitHub pela PRIMEIRA vez.
  - **Commit**: Comentário adicionado na hora do envio dos arquivos, detalhando as alterações.
  - **Pull**: Baixar arquivos do GitHub OUTRAS vezes (pra manter a pasta atualizada com o repositório do GitHub).
  - **Push**: Enviar arquivos ao GitHub.

</br>

- Crie **DUAS pastas**: 
  - A **primeira** será pra clonar o repositório do GitHub e sempre receber a última versão vindo do GitHub com o **PULL**.
  - A **segunda** será uma cópia da primeira, onde você **fará suas alterações** pra enviar ao GitHub com o **PUSH**.

</br>

- Por que disso? 
  - O objetivo é de evitar conflitos de versões caso outra pessoa mandar uma atualização enquanto você está mexendo em algo, e evita adicionar complexidade aqui no GitHub, tornando algo simplificado.
  - Antes de enviar as suas alterações, você terá que baixar novamente a pasta do GitHub (pra caso alguém tenha feito atualizações, não dar conflito de versões).

</br>

Caso você alterou diretamente na primeira pasta (pasta clonada), você irá **perder suas alterações na hora do PULL da etapa de receber os arquivos** vindo do GitHub.

**>>Faça suas alterações na segunda pasta!<<**

</br>

- Caso tenha que voltar pra uma versão anterior, o GitHub **permite baixar a partir de um commit feito anteriormente**. Por isso, **mantenha o commit com uma descrição das alterações feitas com um bom detalhamento.**


</br>


# Passo a passo:

## Baixando o repositório pela primeira vez:
- Copia o caminho da **primeira pasta**, depois vai no Cmder e dê os comandos:
  ```
  cd CAMINHO-PRIMEIRA-PASTA
  ```
  ```
  git clone https://github.com/luizfelipe-gif/TCC-versoes .
  ```
  - Depois, copie os arquivos de dentro e jogue na **segunda pasta**.
  - A partir disso, faça as alterações **NA SEGUNDA PASTA**.


<br>


## Baixando o repositório demais vezes:
- Copia o caminho da **primeira pasta**, depois vai no Cmder e dê os comandos:
  ```
  git pull origin main
  ```
    - origin é uma *Alias* (referência) ao link do repositório do GitHub "[https://github.com/luizfelipe-gif/TCC-versoes](https://github.com/luizfelipe-gif/TCC-versoes)"
    - main é a Branch única do repositório. Pra manter a simplicidade por aqui, preferi manter só uma Branch.
  <br>
- Isso garante que na hora que você fazer isso, receberá a versão atualizada vindo do GitHub.


<br>


## Envio dos arquivos atualizados ao GitHub:
- Antes de fazer o envio, **FAÇA O PASSO ACIMA** pra receber a última versão, e **EVITAR CONFLITOS DE VERSÕES**
- Feito isso, copie os arquivos da **segunda pasta** (que você alterou) e jogue-os na primeira pasta.
  - Você também pode excluir a pasta da stack em que mexeu na primeira pasta, e copiar a pasta (que tem as alterações) **da segunda pasta pra primeira pasta**
  - Exemplo: Mexi nos arquivos do "Frontend Luiz" na **segunda pasta**. Na hora de enviar ao GitHub, exclui a pasta "Frontend Luiz" da **primeira pasta** (mantendo o restante), copio a pasta "Frontend Luiz" da **segunda pasta** que contém as alterações, e colo na **primeira pasta**
  
- Com os arquivos alterados na **primeira pasta**, hora de enviar os arquivos:
  - Abra o Cmder e dê os comandos:
  ```
  cd CAMINHO-PRIMEIRA-PASTA
  ```
  ```
  git add .
  ```
  ```
  git commit -m "COMENTÁRIO DETALHADO"
  ```
  ```
  git push origin main
  ```

**LEMBRETE: Ao adicionar o comentário, DETALHE AS MUDANÇAS!**


<br>


## Acesso ao histórico de versões:
Na [página inicial do projeto](https://github.com/luizfelipe-gif/TCC-versoes), procure pelo campo "XX Commits" (terá um número na frente). Lá tem o histórico dos commits feitos, podendo acessar algum feito anteriormente e baixar as pastas daquele momento. 
