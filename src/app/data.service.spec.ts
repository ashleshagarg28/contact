import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonRouterOutlet } from '@ionic/angular';
describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
      ],
      providers: [IonRouterOutlet],
    });
    service = TestBed.inject(DataService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
