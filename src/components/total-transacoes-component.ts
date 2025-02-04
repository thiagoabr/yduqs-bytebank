import Conta from "../model/Conta.js";
import { ResumoTransacoes } from "../model/Transacao.js";
import { formatarMoeda } from "../utils/formatters.js";

const elementoTotalDepositos: HTMLElement = document.querySelector(".total-transacoes .debitos");
const elementoTotalTransferencias: HTMLElement = document.querySelector(".total-transacoes .transferencias");
const elementoTotalPagamentosBoleto: HTMLElement = document.querySelector(".total-transacoes .pagamentosBoleto");

renderizarTotalTransacoes();

function renderizarTotalTransacoes (): void {
    const totalTransacoes: ResumoTransacoes = new Conta().agruparTransacoes();
    elementoTotalDepositos.textContent = formatarMoeda(totalTransacoes.totalDepositos).toString();
    elementoTotalTransferencias.textContent = formatarMoeda(totalTransacoes.totalTransferencias).toString();
    elementoTotalPagamentosBoleto.textContent = formatarMoeda(totalTransacoes.totalPagamentosBoleto).toString();
}

const TotalTransacoesComponent = {
    atualizar() {
        renderizarTotalTransacoes();
    }
}

export default TotalTransacoesComponent;