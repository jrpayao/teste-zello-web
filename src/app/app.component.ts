import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfis', url: 'perfil', icon: 'paper-plane' },
    { title: 'Aplicativos', url: 'aplicativo', icon: 'paper-plane' },
    { title: 'Usuários', url: 'usuario', icon: 'paper-plane' },
  ];
  constructor() {}
}
