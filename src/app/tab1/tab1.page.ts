import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Contact } from '../contact';
import { DataService } from '../data.service';
import { NewContactPage } from '../new-contact/new-contact.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  term: string;
  public contacts: Observable<Contact[]>;
  mycontacts: any[];
  searchedcontact: any[];
  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {
    this.contacts = this.dataService.getContacts();
  }
  ngOnInit(): void {
    this.contacts.subscribe((res) => {
      this.mycontacts = res;
      this.searchedcontact = res;
    });
  }
  async openNewContactModal() {
    const modal = await this.modalController.create({
      component: NewContactPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    return await modal.present();
  }
  searchcontact(search: string) {
    if (!search) {
      this.searchedcontact = this.mycontacts;
    } else {
      this.searchedcontact = this.mycontacts.filter(
        (ele) =>
          (ele.firstName + ' ' + ele.lastName).includes(search) ||
          ele.firstName.includes(search) ||
          ele.lastName.includes(search)
      );
    }
  }
}
