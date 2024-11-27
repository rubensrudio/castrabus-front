import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Recomendacao } from 'src/app/models/recomendacao.model';

@Component({
  selector: 'app-dialog-recomendacao',
  templateUrl: './dialog-recomendacao.component.html',
  styleUrl: './dialog-recomendacao.component.scss',
})
export class DialogRecomendacaoComponent {

  isView: boolean = false;
  isEdit: boolean = false;
  item = {
    id: '',
    pesoInicio: '',
    pesoFim: '',
    dias: '',
    dose: '',
    uso: '',
    qtdComprimidos: '',
    medicacaoId: 0
  };
  selectUso: string[] = ['6h/6h', '8h/8h', '12h/12h', '24h/24h']

  constructor(
      public dialogRef: MatDialogRef<DialogRecomendacaoComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (!data.isNew) {
      this.item = {...data.item}
    }
    else {
      let id = data.ultimoId + 1;
      this.item.id = id;
    }
  }

  onSave(): void {
    this.dialogRef.close(this.item);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
