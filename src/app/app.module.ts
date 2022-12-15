import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NewContactPage } from './new-contact/new-contact.page';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Camera } from '@ionic-native/camera/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
@NgModule({
  declarations: [AppComponent, NewContactPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
  ],
  providers: [
    Camera,
    CallNumber,
    BackgroundMode,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
