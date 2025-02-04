import Conta from "../model/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao, TipoTransacao } from "../model/Transacao.js";
import { formatarData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

renderizarExtrato();

function renderizarExtrato(): void {
    let conta = new Conta();

    const gruposTransacoes: GrupoTransacao[] = conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for(let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem: string = "";

        for(let transacao of grupoTransacao.transacoes) {

            let linhaValor: string = "";
            if (transacao.getTipoTransacao() === TipoTransacao.DEPOSITO) {
                linhaValor = `<strong class="valor">${formatarMoeda(transacao.getValor())}</strong>`;
            } else {
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

        htmlRegistroTransacoes +=`
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
    atualizar(): void {
        renderizarExtrato();
    }
}

export default ExtratoComponent;