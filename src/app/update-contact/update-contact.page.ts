import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit, OnDestroy {
  public contact: Contact;
  updateContactForm: FormGroup;
  formIsEdited: boolean = false;
  profilePic: boolean = false;
  fileUrl: string;
  picAction: string = '';
  sub1: Subscription;
  sub2: Subscription;
  @ViewChild('updateForm') updateForm: FormGroupDirective;
  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform
  ) {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose From Gallery',
          role: 'destructive',
          data: {
            action: 'fromGallery',
          },
        },
        {
          text: 'Take Photo',
          data: {
            action: 'takePhoto',
          },
        },
      ],
    });
    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    this.picAction = result.data?.action;
    if (this.picAction === 'takePhoto') {
      this.captureCamera();
    }
    if (this.picAction === 'fromGallery') {
      this.fromGallery();
    }
  }
  captureCamera() {
    const optionsCamera: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 100,
      targetWidth: 100,
    };
    if (this.platform.is('android')) {
      this.camera.getPicture(optionsCamera).then(
        (imageData) => {
          this.fileUrl = 'data:image/jpeg;base64,' + imageData;
          this.updateContactForm.patchValue({ image: this.fileUrl });
          this.profilePic = true;
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  fromGallery() {
    const optionsGallery: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight: 100,
      targetWidth: 100,
    };
    if (this.platform.is('android')) {
      this.camera.getPicture(optionsGallery).then(
        (imageData) => {
          this.fileUrl = 'data:image/jpeg;base64,' + imageData;
          this.updateContactForm.patchValue({ image: this.fileUrl });
          this.profilePic = true;
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sub1 = this.dataService.getContactById(id).subscribe((contact) => {
      if (!contact) {
        this.router.navigate(['/tabs/tab1']);
      } else {
        this.contact = contact;
        this.updateContactForm = new FormGroup({
          firstName: new FormControl(
            this.contact.firstName,
            Validators.required
          ),
          lastName: new FormControl(this.contact.lastName, Validators.required),
          email: new FormControl(this.contact.email),
          phone: new FormControl(this.contact.phone, Validators.required),
          category: new FormControl(this.contact.category, Validators.required),
          image: new FormControl(null),
        });
        this.sub2 = this.updateContactForm.valueChanges.subscribe((values) => {
          this.formIsEdited = true;
        });
      }
    });
  }
  submitForm() {
    this.updateForm.onSubmit(undefined);
  }
  updateContact(values: any) {
    let updatedContact: Contact = { id: this.contact.id, ...values };

    this.dataService
      .updateContact(updatedContact)
      .then((res) => this.router.navigate(['/tabs/tab1']));
  }
  ngOnDestroy() {}
}
