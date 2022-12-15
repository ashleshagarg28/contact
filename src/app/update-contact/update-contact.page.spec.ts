import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateContactPage } from './update-contact.page';
import { DataService } from '../data.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';

describe('UpdateContactPage', () => {
  let component: UpdateContactPage;
  let fixture: ComponentFixture<UpdateContactPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateContactPage],
      imports: [
        IonicModule.forRoot(),
        IonicModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [{ provide: DataService }, Camera],
    }).compileComponents();
    fixture = TestBed.createComponent(UpdateContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
