import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ModalController, NavController, ToastController} from '@ionic/angular';
import {UsuarioService} from '../../service/usuario/usuario.service';
import {ModalUsuarioComponent} from '../../components/modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  users: any;
  tasks: any[] = [];

  constructor(private alertCtrl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private usuarioService: UsuarioService,
              private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.usuarioService.getAllPessoas().subscribe((users) => {
      this.users = users.data;
    });
  }

  adicionar() {
    this.navCtrl.navigateForward('pessoa-adicionar');
  }

  async alterar(id) {
    this.usuarioService.findById(id).subscribe((async r => {
      const modal = await this.modalCtrl.create({
        component: ModalUsuarioComponent,
        swipeToClose: true,
        keyboardClose: true,
        componentProps: {
          idPessoa: id,
          name: r.data.name,
          email: r.data.email,
          cpf: r.data.cpf,
          rg: r.data.rg,
          nascimento: r.data.birth,
        }
      });

      modal.onDidDismiss().then(data => {
        this.getAllUsuarios();
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
            this.usuarioService.delete(id).subscribe(async r => {
              this.getAllUsuarios();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async showAdd() {
      const modal = await this.modalCtrl.create({
        component: ModalUsuarioComponent,
        swipeToClose: true,
        keyboardClose: true,
        componentProps: {
        }
      });

    modal.onDidDismiss().then(data => {
      this.getAllUsuarios();
    });

      return await modal.present();
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
