import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NewContactPage } from './new-contact.page';
import { DataService } from '../data.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Camera } from '@ionic-native/camera/ngx';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
describe('NewContactPage', () => {
  let component: NewContactPage;
  let fixture: ComponentFixture<NewContactPage>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NewContactPage],
      imports: [
        IonicModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        ReactiveFormsModule,
      ],
      providers: [DataService, Camera],
    }).compileComponents();

    fixture = TestBed.createComponent(NewContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
