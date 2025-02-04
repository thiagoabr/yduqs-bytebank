//{*}atributos, constutores, funções, getters, setters
import { TipoTransacao, Transacao } from "./Transacao.js";
export class Conta {
    titular;
    dataAbertura = new Date();
    dataEncerramento = new Date();
    saldo;
    limite;
    transacoes = [];
    constructor() {
        this.titular = "Thiago Abreu",
            this.dataAbertura = new Date(),
            this.dataEncerramento = null,
            this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0,
            this.limite = 5000,
            this.transacoes = JSON.parse(localStorage.getItem("transacoes"), (key, value) => {
                if (key === "data") {
                    return new Date(value);
                }
                return value;
            }) || [];
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!");
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.getTipoTransacao() == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.getValor());
        }
        else if (novaTransacao.getTipoTransacao() == TipoTransacao.TRANSFERENCIA || novaTransacao.getTipoTransacao() == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.getValor());
            novaTransacao.setValor(novaTransacao.getValor() * -1);
        }
        else {
            throw new Error("Tipo de Transação é inválido!");
        }
        this.transacoes.push(novaTransacao);
        //console.log(this.getGruposTransacoes());
        localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = [];
        this.transacoes.forEach(t => listaTransacoes.push(Transacao.clone(t)));
        //console.log(listaTransacoes.map(t => t instanceof Transacao));
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = transacao.getData();
            let labelGrupoTransacao = "30/01"; //dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    agruparTransacoes() {
        const resumo = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };
        this.getTransacoes().forEach(transacao => {
            switch (transacao.getTipoTransacao()) {
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.getValor();
                    break;
                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.getValor() * -1;
                    break;
                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.getValor() * -1;
            }
        });
        return resumo;
    }
    getTitular() {
        return this.titular;
    }
    setTitular(titular) {
        this.titular = titular;
    }
    static getDataAcesso() {
        return new Date();
    }
    getPrimeiroNomeTitular() {
        return this.titular.split(' ')[0];
    }
    getDataAbertura() {
        return this.dataAbertura;
    }
    setDataAbertura(dataAbertura) {
        this.dataAbertura = dataAbertura;
    }
    getDataEncerramento() {
        return this.dataEncerramento;
    }
    setDataEncerramento(dataEncerramento) {
        this.dataEncerramento = dataEncerramento;
    }
    getSaldo() {
        return this.saldo;
    }
    getTransacoes() {
        return this.transacoes;
    }
    getLimite() {
        return this.limite;
    }
    setLimite(limite) {
        this.limite = limite;
    }
}
export default Conta;
