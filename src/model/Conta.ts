//{*}atributos, constutores, funções, getters, setters
import { GrupoTransacao, TipoTransacao, ResumoTransacoes, Transacao} from "./Transacao.js";

export class Conta {
    private titular: string;
    private dataAbertura: Date = new Date();
    private dataEncerramento: Date = new Date();
    private saldo: number;
    private limite: number;
    private transacoes: Transacao[] = [];

    constructor() {
        this.titular = "Thiago Abreu",
        this.dataAbertura = new Date(),
        this.dataEncerramento = null,
        this.saldo = JSON.parse(localStorage.getItem("saldo")) || 0,
        this.limite = 5000,
        this.transacoes = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
            if (key === "data") {
                return new Date(value);
            }
            return value;
        }) || [];
    }

    private depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!")
        }
        this.saldo += valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }

    private debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser debitado deve ser maior que zero!")
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente!")
        }
        this.saldo -= valor;
        localStorage.setItem("saldo", this.saldo.toString());
    }

    public registrarTransacao(novaTransacao: Transacao): void {
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

    public getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = []

        this.transacoes.forEach(t => 
            listaTransacoes.push(Transacao.clone(t))
        );
        //console.log(listaTransacoes.map(t => t instanceof Transacao));

        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.getData().getTime() - t1.getData().getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let dataTransacao = transacao.getData();
            let labelGrupoTransacao: string = "30/01"//dataTransacao.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    
    public agruparTransacoes(): ResumoTransacoes {
        const resumo: ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };

        this.getTransacoes().forEach(transacao => {
            switch (transacao.getTipoTransacao()) {
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.getValor();
                    break
                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.getValor()*-1;
                    break;
                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.getValor()*-1;
            }
        });
        return resumo;
    }

    public getTitular(): string {
        return this.titular;
    }
    public setTitular(titular: string) {
        this.titular = titular;
    }

    static getDataAcesso(): Date {
      return new Date();
    }

    public getPrimeiroNomeTitular(): string {
    return this.titular.split(' ')[0];
    }

    public getDataAbertura(): Date {
        return this.dataAbertura;
    }
    public setDataAbertura(dataAbertura: Date) {
        this.dataAbertura = dataAbertura;
    }

    public getDataEncerramento(): Date {
        return this.dataEncerramento;
    }
    public setDataEncerramento(dataEncerramento: Date) {
        this.dataEncerramento = dataEncerramento;
    }
    
    public getSaldo(): number {
        return this.saldo;
    }

    public getTransacoes(): Transacao[] {
        return this.transacoes;
    }

    public getLimite(): number{
        return this.limite;
    }
    public setLimite(limite: number){
        this.limite = limite;
    }
}

export default Conta;