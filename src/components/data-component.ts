import { formataData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from '../types/Conta.js';

const elementoDataAcesso: HTMLElement = document.querySelector(".block-saldo time");

rendenizarData();

function rendenizarData (): void {
    if (elementoDataAcesso != null) {
    elementoDataAcesso.textContent = formataData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
}
const DataComponent = {
    atualizar() {
        rendenizarData();
    }
}

export default DataComponent;