import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/transacao/GrupoTransacao.js";
import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { formataData, formatarMoeda } from "../utils/formatters.js";

const elementoRegistroTransacoesExtrato: HTMLElement = document.querySelector(".extrato .registro-transacoes");

rendenizarExtrato();

function rendenizarExtrato(): void {
    const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes: string = "";

    for(let grupoTransacao of gruposTransacoes) {
        let htmlTransacaoItem: string = "";

        for(let transacao of grupoTransacao.transacoes) {

            let linhaValor: string = "";
            if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
                linhaValor = `<strong class="valor">${formatarMoeda(transacao.valor)}</strong>`;
            } else {
                linhaValor = `<strong class="valor" style="color: red">${formatarMoeda(transacao.valor)}</strong>`;
            }

            htmlTransacaoItem += `
                <div class="transacao-item">
                    <div class="transacao-info">
                        <span class="tipo">${transacao.tipoTransacao}</span>
                        ${linhaValor}
                    </div>
                    <time class="data">${formataData(transacao.data, FormatoData.DIA_MES)}</time>
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
        rendenizarExtrato();
    }
}

export default ExtratoComponent;