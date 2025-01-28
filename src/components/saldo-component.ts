import { formataData, formatarMoeda } from "../utils/formatters.js";
import Conta from '../types/Conta.js';

const elementoSaldo: HTMLElement = document.querySelector(".saldo-valor .valor");

renderizarSaldo();

function renderizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  }
}

export default SaldoComponent;