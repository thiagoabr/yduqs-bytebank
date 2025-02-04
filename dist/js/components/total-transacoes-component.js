import Conta from "../model/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";
const elementoTotalDepositos = document.querySelector(".total-transacoes .debitos");
const elementoTotalTransferencias = document.querySelector(".total-transacoes .transferencias");
const elementoTotalPagamentosBoleto = document.querySelector(".total-transacoes .pagamentosBoleto");
renderizarTotalTransacoes();
function renderizarTotalTransacoes() {
    const totalTransacoes = new Conta().agruparTransacoes();
    elementoTotalDepositos.textContent = formatarMoeda(totalTransacoes.totalDepositos).toString();
    elementoTotalTransferencias.textContent = formatarMoeda(totalTransacoes.totalTransferencias).toString();
    elementoTotalPagamentosBoleto.textContent = formatarMoeda(totalTransacoes.totalPagamentosBoleto).toString();
}
const TotalTransacoesComponent = {
    atualizar() {
        renderizarTotalTransacoes();
    }
};
export default TotalTransacoesComponent;
