import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {UsuarioService} from '../../service/usuario/usuario.service';
import {PerfilService} from '../../service/perfil/perfil.service';
import {AplicativoService} from '../../service/aplicativo/aplicativo.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss'],
})
export class ModalUsuarioComponent implements OnInit {

  name: string;
  cpf: number;
  rg: number;
  birth: any;
  email: string;
  idPessoa: any;

  perfis: any;
  apps: any;
  appSelect: any;
  perfilSelect: any;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private usuarioService: UsuarioService,
              private perfilService: PerfilService,
              private aplicativoService: AplicativoService) {
  }

  ngOnInit() {
    this.name = this.navParams.get('name');
    this.cpf = this.navParams.get('cpf');
    this.rg = this.navParams.get('rg');
    this.birth = this.navParams.get('nascimento');
    this.email = this.navParams.get('email');
    this.idPessoa = this.navParams.get('idPessoa');
    this.showApps();
    this.showPerfis();
  }

  showPerfis() {
    this.perfilService.getAll().subscribe(perfil => {
      this.perfis = perfil.data;
    });
  }

  showApps() {
    this.aplicativoService.getAll().subscribe(apps => {
      this.apps = apps.data;
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  emitirAcao() {
    const data = {
      name: this.name,
      rg: this.rg,
      cpf: this.cpf,
      email: this.email,
      birth: this.birth,
      aplicativos: this.appSelect,
      perfil_id: this.perfilSelect
    };

    console.log('DATA => ', data);
    if (this.idPessoa) {
      return this.usuarioService.update(this.idPessoa, data).subscribe(async res => {
        await this.modalCtrl.dismiss();
      });
    }
    return this.usuarioService.create(data).subscribe(async res => {
      await this.modalCtrl.dismiss();
    });
  }
}
