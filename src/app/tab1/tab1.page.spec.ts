import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { Tab1Page } from './tab1.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../data.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tab1Page],
      providers: [
        DataService,
        {
          provide: IonRouterOutlet,
          useValue: {
            nativeEl: 'presentingElement',
          },
        },
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
