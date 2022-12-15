import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ContactDetailsPage } from './contact-details.page';
import { DataService } from '../data.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
describe('ContactDetailsPage', () => {
  let component: ContactDetailsPage;
  let fixture: ComponentFixture<ContactDetailsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDetailsPage],
      imports: [
        IonicModule.forRoot(),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        RouterTestingModule,
      ],
      providers: [DataService, BackgroundMode, CallNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
