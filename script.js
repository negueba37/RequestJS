function Pessoa(nome, numero) {
    this.nome = nome;
    this.numero = numero;
}
let pessoas = [];
const BaseURL = "http://192.168.0.107:9000/api/";

const onClickItemLista = ()=>{
    window.alert('Clicou');
}
const onLoadHome = () => {
    document.querySelector('input#fnome').focus();
}
const listarAmigos = () => {
    let lista = document.querySelector('ul#flista');
    let tabela = document.querySelector('thead#ftabela') 

    fetch(BaseURL + 'listar')
        .then(
            (response) => {
                return response.json();
            })
        .then((data) => {
            pessoas = data;

            for (let i = 0; i < pessoas.length; i++) {
                let linha = document.createElement("tr");    
                let campoNome = document.createElement("td");
                let campoTelefone = document.createElement("td");    
                let txtNome = document.createTextNode(pessoas[i].NOME);
                let txtTelefone = document.createTextNode(pessoas[i].TELEFONE);                
                campoNome.appendChild(txtNome);
                campoTelefone.appendChild(txtTelefone);
                linha.appendChild(campoNome);
                linha.appendChild(campoTelefone);
                tabela.appendChild(linha)
                /*item = document.createElement('li');
                item.innerText = pessoas[i].NOME;
                lista.appendChild(item);*/
            }
        });
}

const cadastrar = () => {
    let nome = document.querySelector('input#fnome');
    let numero = document.querySelector('input#fnumero');

    if (nome.value == '') {
        window.alert('Nome não pode ser vazio');
    }
    else if (numero.value == '') {
        window.alert('Numero Invalido');
    } else {

        let amigo = new Pessoa(nome.value, numero.value);
        pessoas.push(amigo);

        nome.value = '';
        numero.value = '';
        nome.focus();

        fetch("http://192.168.0.107:9000/api/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(amigo),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Sucesso", data);
            })
            .catch((error) => {
                console.log("Erro", error);
            });
    }
}