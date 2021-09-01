import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PerfilService} from '../../service/perfil/perfil.service';
import {UsuarioService} from '../../service/usuario/usuario.service';
import {AplicativoService} from '../../service/aplicativo/aplicativo.service';

@Component({
  selector: 'app-modal-vinculo-aplicativo',
  templateUrl: './modal-vinculo-aplicativo.component.html',
  styleUrls: ['./modal-vinculo-aplicativo.component.scss'],
})
export class ModalVinculoAplicativoComponent implements OnInit {

  aplicativos: any;
  perfisSelecionados: any;
  appSelect: any;
  users: any;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private perfilService: PerfilService,
              private aplicativoService: AplicativoService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.perfisSelecionados = this.navParams.get('perfis');
    this.aplicativoService.getAll().subscribe((apps) => {
      console.log(apps);
      this.aplicativos = apps.data;
    });
  }

  async closeModal() {
    this.usuarioService.getAllPessoas().subscribe(users => {
      this.users = users.data;
      console.log(this.users);
    });
    await this.modalCtrl.dismiss();
  }

  salvar() {
    const data = {pessoaId:this.navParams.get('pessoaId'), aplicativoId: this.appSelect };
    this.aplicativoService.createVinculo(data).subscribe(async r => {
      await this.modalCtrl.dismiss();
    });
  }

}
