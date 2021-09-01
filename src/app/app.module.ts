import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ModalUsuarioComponent} from './components/modal-usuario/modal-usuario.component';
import {ModalVinculoPerfilComponent} from './components/modal-vinculo-perfil/modal-vinculo-perfil.component';
import {FormsModule} from '@angular/forms';
import {ModalVinculoAplicativoComponent} from './components/modal-vinculo-aplicativo/modal-vinculo-aplicativo.component';

@NgModule({
  declarations: [AppComponent, ModalUsuarioComponent, ModalVinculoPerfilComponent, ModalVinculoAplicativoComponent],
  entryComponents: [ModalUsuarioComponent, ModalVinculoPerfilComponent, ModalVinculoAplicativoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
