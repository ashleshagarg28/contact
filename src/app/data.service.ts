import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  deleteDoc,
  docSnapshots,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  d;
  constructor(private firestore: Firestore) {}

  getContacts(): Observable<Contact[]> {
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, { idField: 'id' }).pipe(
      map((contacts) => contacts as Contact[])
    );
  }

  getContactById(id: string): Observable<Contact> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Contact;
      })
    );
  }

  createContact(contact: Contact): Promise<void> {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  updateContact(contact: Contact): Promise<void> {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data } = contact;
    return setDoc(document, data);
  }

  deleteContact(id: string): Promise<void> {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
