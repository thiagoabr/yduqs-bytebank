import { formataData, formatarMoeda } from "../utils/formatters.js";
import Conta from '../types/Conta.js';

const elementoSaldo: HTMLElement = document.querySelector(".saldo-valor .valor");

rendenizarSaldo();

function rendenizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar() {
    rendenizarSaldo();
  }
}

export default SaldoComponent;