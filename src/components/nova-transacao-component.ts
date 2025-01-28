import { TipoTransacao } from "../types/transacao/TipoTransacao.js";
import { Transacao } from "../types/transacao/Transacao.js";
import DataComponent from "./data-component.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
import TotalTransacoesComponent from "./total-transacoes-component.js";
import Conta from "../types/Conta.js";

const elementoFormulario: HTMLFormElement = document.querySelector(".block-nova-transacao form");

elementoFormulario.addEventListener("submit", function (event) {
  try {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
      alert("Por favor, preencha todos os campos da trasnsação!");
      return;
    }

    const inputTipoTransacao: HTMLSelectElement = elementoFormulario.querySelector("#tipoTransacao");
    const inputValor: HTMLInputElement = elementoFormulario.querySelector("#valor");
    const inputData: HTMLInputElement = elementoFormulario.querySelector("#data");

    let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + " 00:00:00");

    const novaTransacao: Transacao = {
      tipoTransacao: tipoTransacao,
      valor: valor,
      data: data,
    };

    DataComponent.atualizar();
    Conta.registrarTransacao(novaTransacao);
    SaldoComponent.atualizar();
    elementoFormulario.reset();
    ExtratoComponent.atualizar();
    TotalTransacoesComponent.atualizar();
    
    //console.log(Conta.agruparTransacoes());

  } catch (error) {
    alert(error.message);
  }

});