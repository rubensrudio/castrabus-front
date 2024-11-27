import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { Animal } from '../../../models/animal.model';
import { Pessoa } from '../../../models/pessoa.model';
import { AgendamentoService } from '../../../services/agendamento.service';
import { CampanhaService } from '../../../services/campanha.service';
import { AnimalService } from '../../../services/animal.service';
import { PessoaService } from '../../../services/pessoa.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrl: './agendamento-form.component.scss'
})
export class AgendamentoFormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  agendamentoForm: FormGroup;
  agendamentoForm2: FormGroup;
  campanhas: any[] = [];
  agendas: any[] = [];
  horarios: any[] = [];
  animais!: Animal[];
  httpModel: any;
  minDate!: Date;
  maxDate!: Date;
  pessoa!: Pessoa;
  showModal = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private campanhaService: CampanhaService,
    private animalService: AnimalService,
    private pessoaService: PessoaService,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private mensagem: ToastrService,
  ) {
    this.agendamentoForm = this.fb.group({
      campanhaId: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.maxLength(14)]],
      animalId: ['', Validators.required],
    });

    this.agendamentoForm2 = this.fb.group({
      data: ['', Validators.required],
      horario: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      this.user = user;
    });
    this.campanhaService.getCampanhasValidas().subscribe((data) => {
        this.httpModel = data;
        this.campanhas = this.httpModel.result;
    });
  }

  onCampanhaChange(event: MatSelectChange) {
    const campanhaId = event.value;
    this.agendamentoService.getAgendamentos(campanhaId).subscribe((data) => {
      this.agendas = data.agendas;

      const parseDate = (dateString: string): Date => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
      };

      this.minDate = parseDate(this.agendas[0].data);
      this.maxDate = parseDate(this.agendas[this.agendas.length - 1].data);
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;

    const formatDate = (date: Date): string => {
      return this.convertDataBR(date);
    };

    const agenda = this.agendas.find(a => a.data === formatDate(selectedDate!));

    if (agenda) {
        this.horarios = agenda.horarios.filter((h: { disponivel: any; }) => h.disponivel);
      } else {
        this.horarios = [];
      }
  }

  private convertDataBR(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
     const year = date.getFullYear();
     return `${day}/${month}/${year}`;
  }

  buscarAnimais() {
    const cpf = this.agendamentoForm.get('cpf')?.value;
    if (cpf) {
      this.pessoaService.getPessoaByCpf(cpf).subscribe((pessoa) => {
        this.pessoa = pessoa;
        if (this.pessoa?.id !== undefined) {
          this.animalService.getAnimaisByPessoaId(this.pessoa.id).subscribe((animais) => {
            this.animais = animais;
          });
        } else {
          console.error('Tutor não encontrado!');
        }
      });
    }
  }

  onSubmit() {
    if (this.agendamentoForm.valid && this.agendamentoForm2.valid) {
      if (this.pessoa?.id !== undefined) {
        const agendamentoData = {
          id: 0,
          campanhaId: this.agendamentoForm.value.campanhaId,
          data: this.convertDataBR(new Date(this.agendamentoForm2.value.data)),
          hora: this.agendamentoForm2.value.horario.horaInicio,
          pessoaId: this.pessoa.id,
          animalId: this.agendamentoForm.value.animalId,
          empresaId: this.user.empresa
        };
        
        this.agendamentoService.verificarAgendamento(agendamentoData.animalId, agendamentoData.campanhaId).subscribe(
          (agendado: boolean) => {
            if (agendado) {
              this.mensagem.warning('Este animal já tem agendamento registrado!', 'Aviso');
            } else {
              this.agendamentoService.createAgendamento(agendamentoData).subscribe({
                next: () => {
                  this.mensagem.success('Agendamento Realizado com Sucesso!', 'Sucesso');
                  this.showModal = true;
                },
                error: () => {
                  this.mensagem.error('Erro ao realizar agendamento!', 'Erro');
                }
              });
            }
          },
          () => {
            this.mensagem.error('Erro ao verificar agendamento!', 'Erro');
          }
        );
      }
    }
  }

  novoAgendamento() {
    this.showModal = false;
    this.agendamentoForm.reset();
    this.agendamentoForm2.reset();
    this.stepper.reset();
    this.horarios = [];
    this.animais = [];
  }

  concluirAgendamento() {
    this.router.navigate(['/agendamentos']);
  }
}
