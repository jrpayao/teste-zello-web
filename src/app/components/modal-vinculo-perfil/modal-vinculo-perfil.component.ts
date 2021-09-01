import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PerfilService} from '../../service/perfil/perfil.service';
import {UsuarioService} from '../../service/usuario/usuario.service';

@Component({
  selector: 'app-modal-vinculo-perfil',
  templateUrl: './modal-vinculo-perfil.component.html',
  styleUrls: ['./modal-vinculo-perfil.component.scss'],
})
export class ModalVinculoPerfilComponent implements OnInit {

  perfis: any;
  perfisSelecionados: any;
  sel_perfil: any;
  users: any;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private perfilService: PerfilService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.perfisSelecionados = this.navParams.get('perfis');
    // this.perfisSelecionados = this.perfisSelecionados.toString();
    // console.log('PerfisSel => ', this.perfisSelecionados);
    this.perfilService.getAll().subscribe((perfis) => {
      this.perfis = perfis.data;
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
      const data = {pessoaId:this.navParams.get('pessoaId'), perfilId: this.sel_perfil };
      this.perfilService.createVinculo(data).subscribe(async r => {
        await this.modalCtrl.dismiss();
      });
  }

}
