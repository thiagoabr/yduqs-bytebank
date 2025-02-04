import Conta from "../model/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { TipoTransacao } from "../model/Transacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    let conta = new Conta();
    const gruposTransacoes = conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of grupoTransacao.transacoes) {
            let linhaValor = "";
            if (transacao.getTipoTransacao() === TipoTransacao.DEPOSITO) {
                linhaValor = `<strong class="valor">${formatarMoeda(transacao.getValor())}</strong>`;
            }
            else {
                linhaValor = `<strong class="valor" style="color: red">${formatarMoeda(transacao.getValor())}</strong>`;
            }
            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.getTipoTransacao()}</span>
                        ${linhaValor}
                    </div>
                    <time class="data">${formatarData(transacao.getData(), FormatoData.DIA_MES)}</time>
                </div>
            `;
        }
        htmlRegistroTransacoes += `
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacao.label}</strong>
                ${htmlTransacaoItem}
            </div>
        `;
    }
    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas.</div>";
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
