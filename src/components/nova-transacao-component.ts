import Conta from "../model/Conta.js";
import { Transacao, TipoTransacao } from "../model/Transacao.js";
import DataComponent from "./data-component.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
import TotalTransacoesComponent from "./total-transacoes-component.js";

const elementoFormulario: HTMLFormElement = document.querySelector("#formNovaTransacao");

elementoFormulario.addEventListener("submit", function (event) {
  try {

    event.preventDefault();

    if (!elementoFormulario.checkValidity()) {
      alert("Por favor, preencha todos os campos da trasnsação!");
      return;
    }

    const tipoTransacao = (document.querySelector("#tipoTransacao") as HTMLSelectElement).value as TipoTransacao;
    const valorTransacao = (document.querySelector("#valor") as HTMLInputElement).valueAsNumber;
    const elementoData = document.querySelector("#data") as HTMLInputElement
    const dataTransacao = new Date(elementoData.value + " 00:00:00");

    let conta = new Conta();

    let novaTransacao = new Transacao(
      valorTransacao,
      tipoTransacao,
      dataTransacao,
      conta.getTitular(),
      "Conta Alura"
    );

    conta.registrarTransacao(novaTransacao);

    DataComponent.atualizar();
    SaldoComponent.atualizar();
    elementoFormulario.reset();
    ExtratoComponent.atualizar();
    TotalTransacoesComponent.atualizar();

  } catch (error) {
    alert("Ocorreu um erro inesperado durante o processamento da transação: " + error.message);
  }
});