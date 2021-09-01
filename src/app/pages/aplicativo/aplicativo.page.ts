import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ModalController, NavController, ToastController} from '@ionic/angular';
import {UsuarioService} from '../../service/usuario/usuario.service';
import {ModalUsuarioComponent} from '../../components/modal-usuario/modal-usuario.component';
import {AplicativoService} from '../../service/aplicativo/aplicativo.service';
import {ModalVinculoAplicativoComponent} from '../../components/modal-vinculo-aplicativo/modal-vinculo-aplicativo.component';

@Component({
  selector: 'app-aplicativo',
  templateUrl: './aplicativo.page.html',
  styleUrls: ['./aplicativo.page.scss'],
})
export class AplicativoPage implements OnInit {

  aplicativos: any = [];
  perfis: any = [];
  apps: any;
  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private usuarioService: UsuarioService,
              private aplicativoService: AplicativoService,
              private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.refreshLista();
  }

  refreshLista(){
    this.aplicativoService.getAll().subscribe(apps => {
      this.apps = apps.data;
      console.log(this.apps);
    });
  }


  async vincularAplicativo(id)
  {
    this.usuarioService.findById(id).subscribe(async r => {
      this.aplicativos = [];
      const modal = await this.modalCtrl.create({
        component: ModalVinculoAplicativoComponent,
        swipeToClose: true,
        keyboardClose: true,
        componentProps: {
          aplicativos: this.aplicativos,
          pessoaId: id,
        },
      });

      modal.onDidDismiss().then(data => {
        this.refreshLista();
      });

      return await modal.present();
    });
  }

  adicionar() {
    this.navCtrl.navigateForward('aplicativo-adicionar');
  }

  async visualizar(id) {
    this.usuarioService.findById(id).subscribe((async r => {
      const modal = await this.modalCtrl.create({
        component: ModalUsuarioComponent,
        swipeToClose: true,
        keyboardClose: true,
        componentProps: {
          name: r.data.name,
          email: r.data.email,
          cpf: r.data.cpf,
          rg: r.data.rg,
          nascimento: r.data.birth,
        }
      });
      return await modal.present();
    }));
  }

  async delete(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirma a exclusão?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sim',
          handler: () => {
            this.aplicativoService.delete(id).subscribe(async r => {
              this.refreshLista();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar Aplicativo',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome',
          label: 'Nome'
        },
        {
          name: 'bundleId',
          type: 'number',
          placeholder: 'Bundle-ID',
          label: 'Bundle Id'
        },
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
            this.validate(form);
            this.aplicativoService.create(form).subscribe((data) => {
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

  async editar(id) {
    this.usuarioService.findById(id).subscribe(async user => {
      const alert = await this.alertCtrl.create({
        header: 'Alterar Usuário',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Nome',
            value: user.data.name
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'E-mail',
            value: user.data.email
          },
          {
            name: 'birth',
            type: 'date',
            placeholder: 'Data de Nascimento',
            value: user.data.birth
          },

          {
            name: 'rg',
            type: 'number',
            placeholder: 'RG',
            attributes: {
              maxlength: 7
            },
            value: user.data.rg
          },
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
            text: 'Alterar',
            handler: (form) => {
              this.validate(form);
              this.usuarioService.update(id, form).subscribe((data) => {
                this.refreshLista();
              });
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
