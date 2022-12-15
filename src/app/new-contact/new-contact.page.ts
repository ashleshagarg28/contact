import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { Contact } from '../contact';
import { DataService } from '../data.service';
@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {
  createContactForm: FormGroup;
  @ViewChild('createForm') createForm: FormGroupDirective;
  profilePic: boolean = false;
  fileUrl: string;
  picAction: string = '';
  constructor(
    private modalController: ModalController,
    private dataService: DataService,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform
  ) {}
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit(): void {
    this.createContactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(''),
      phone: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl(null),
    });
  }
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
          this.createContactForm.patchValue({ image: this.fileUrl });
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
          this.createContactForm.patchValue({ image: this.fileUrl });
          this.profilePic = true;
        },
        (err) => {
          alert('Photo can not be selected');
        }
      );
    }
  }
  submitForm() {
    this.createForm.onSubmit(undefined);
  }
  createContact(values: any) {
    let newContact: Contact = { ...values };
    this.dataService.createContact(newContact);
    this.dismissModal();
  }
}
