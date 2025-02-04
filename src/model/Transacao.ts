export class Transacao {
    private tipoTransacao: TipoTransacao;
    private valor: number;
    private data: Date = new Date();
    private titularOrigem: string = "";
    private titularDestino: string = "";
    
    constructor(valor: number, tipoTransacao: TipoTransacao, data: Date, titularOrigem: string, titlarDestino: string) {
       this.valor = valor;
       this.tipoTransacao = tipoTransacao;
       this.data = data;
       this.titularOrigem = titularOrigem;
       this.titularDestino = titlarDestino;
   }

   public getTipoTransacao(): TipoTransacao {
        return this.tipoTransacao;
    }
    public setTipoTransacao(tipoTransacao: TipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }

    public getValor(): number {
        return this.valor;
    }
    public setValor(valor: number): number {
        return this.valor = valor;
    }

    public getData(): Date {
        return this.data;
    }
    public setData(data: Date): Date{
        return this.data = data;
    }

    public getTitularOrigem(): string{
        return this.titularOrigem;
    }
    public setTitularOrigem(titularOrigem: string): string{
        return this.titularOrigem = titularOrigem;
    }

    public getTitularDestino(): string{
        return this.titularDestino;
    }
    public setTitularDestino(titularOrigem: string): string{
        return this.titularDestino = titularOrigem;
    }    

    public static clone(transacoes: any): Transacao {
        var obj = new Transacao(transacoes.valor, transacoes.tipoTransacao, transacoes.data, transacoes.titularOrigem, transacoes.titularDestino);
        return obj;
    }
}

export enum TipoTransacao {
    DEPOSITO = "Depósito",
    TRANSFERENCIA = "Transferência",
    PAGAMENTO_BOLETO = "Pagamento de Boleto"
}

export type GrupoTransacao = {
    label: string;
    transacoes: Transacao[];
}

export type ResumoTransacoes = {
    totalDepositos: number, 
    totalTransferencias: number,
    totalPagamentosBoleto: number
}

export default Transacao