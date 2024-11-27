export interface TransOperatorio {
  agendamento_Id: number,
  atendimento_Id: number,
  animal_Id: number,
  veterinario_Id: number,
  tutor_Id: number,

  esterilizacao: boolean,
  motivoEsterilizacao: string,
  intercorrencia: boolean,
  motivoIntercorrencia: string,
}
