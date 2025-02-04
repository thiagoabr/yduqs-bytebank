export class Transacao {
    tipoTransacao;
    valor;
    data = new Date();
    titularOrigem = "";
    titularDestino = "";
    constructor(valor, tipoTransacao, data, titularOrigem, titlarDestino) {
        this.valor = valor;
        this.tipoTransacao = tipoTransacao;
        this.data = data;
        this.titularOrigem = titularOrigem;
        this.titularDestino = titlarDestino;
    }
    getTipoTransacao() {
        return this.tipoTransacao;
    }
    setTipoTransacao(tipoTransacao) {
        this.tipoTransacao = tipoTransacao;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        return this.valor = valor;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        return this.data = data;
    }
    getTitularOrigem() {
        return this.titularOrigem;
    }
    setTitularOrigem(titularOrigem) {
        return this.titularOrigem = titularOrigem;
    }
    getTitularDestino() {
        return this.titularDestino;
    }
    setTitularDestino(titularOrigem) {
        return this.titularDestino = titularOrigem;
    }
    static clone(transacoes) {
        var obj = new Transacao(transacoes.valor, transacoes.tipoTransacao, transacoes.data, transacoes.titularOrigem, transacoes.titularDestino);
        return obj;
    }
}
export var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
export default Transacao;
