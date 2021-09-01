import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../service/usuario/usuario.service';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {ModalVinculoPerfilComponent} from '../../components/modal-vinculo-perfil/modal-vinculo-perfil.component';
import {PerfilService} from '../../service/perfil/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfis: any = [];
  users: any;
  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private usuarioService: UsuarioService,
              private perfilService: PerfilService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.refreshLista();
  }

  refreshLista(){
    this.perfilService.getAll().subscribe(perfis => {
      this.perfis = perfis.data;
      console.log(this.users);
    });
  }

  async delete(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirma a exclusão do perfil?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sim',
          handler: () => {
            this.perfilService.delete(id).subscribe(async r => {
              this.refreshLista();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async vincularPerfil(id)
  {
    this.usuarioService.findById(id).subscribe(async r => {
      this.perfis = [];
      r.data.perfis.forEach((perfil) => {
        this.perfis.push(''+perfil.perfil_id+'');
      });
      const modal = await this.modalCtrl.create({
        component: ModalVinculoPerfilComponent,
        swipeToClose: true,
        keyboardClose: true,
        componentProps: {
          perfis: this.perfis,
          pessoaId: id,
        },
      });

      modal.onDidDismiss().then(data => {
        this.refreshLista();
      });

      return await modal.present();
    });
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Cadastrar Perfil',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secundary',
          handler: () => {
          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {
            this.perfilService.create(form).subscribe((data) => {
            this.refreshLista();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async validate(form) {
    if (!form.name) {
      const toast = await this.toastCtrl.create({
        message: 'ERRO: Informe o nome no cadastro.',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      await toast.present();
      return;
    }
  }
}
