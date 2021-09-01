import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalVinculoAplicativoComponent } from './modal-vinculo-aplicativo.component';

describe('ModalVinculoAplicativoComponent', () => {
  let component: ModalVinculoAplicativoComponent;
  let fixture: ComponentFixture<ModalVinculoAplicativoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVinculoAplicativoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalVinculoAplicativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
