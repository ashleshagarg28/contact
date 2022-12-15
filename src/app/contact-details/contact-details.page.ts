import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { Subscription } from 'rxjs';
import { NavController, Platform } from '@ionic/angular';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.page.html',
  styleUrls: ['./contact-details.page.scss'],
})
export class ContactDetailsPage implements OnInit, OnDestroy {
  public contact: Contact;
  sub1: Subscription;
  id: number;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private callNumber: CallNumber,
    public navCtrl: NavController,
    public platform: Platform,
    private backgroundMode: BackgroundMode
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.dataService.getContactById(id).subscribe((contact) => {
      if (!contact) {
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.contact = contact;
      }
    });
  }
  callNow(phone: string) {
    this.callNumber.callNumber(phone, true).then((res) => {
      if (this.platform.is('android')) {
        this.backgroundMode.enable();
        this.backgroundMode.on('activate').subscribe(() => {
          console.log('background mode activated');
        });
      }
    });
  }
  deleteContact(contactId: string) {
    this.dataService
      .deleteContact(contactId)
      .then((res) => this.router.navigate(['/tabs/tab1']));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
