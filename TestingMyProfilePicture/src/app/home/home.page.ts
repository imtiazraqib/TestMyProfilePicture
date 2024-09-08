import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  flags: any;
  feedTogglePages: any;
  feed: any;
  reels: any;
  tagged: any;
  animate: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.feedTogglePages = 'feed';
    this.flags = {
      profilePicture: '',
      activePlatform: 'instagram',
    };
  }

  uploadImage(event: Event) {
    this.imageChangedEvent = event;
    const element = event.target as HTMLInputElement; // Typecast to HTMLInputElement
    const files = element.files; // Now you can safely access the files property
    if (files && files.length > 0) {
      const file = files[0];
      // Handle the file here
      console.log('SELECTED FILE >>> ' + file);
      this.authService.uploadImageToSupabase(file).then((data) => {
        console.log('DATA >>> ', data);
        this.authService
          .getProfilePicture(data?.path)
          .then((profilePicture) => {
            console.log('PROFILE PICTURE >>> ', profilePicture);
            this.flags.profilePicture = profilePicture?.signedUrl;
            this.imageLoaded();
          });
      });
    }
  }

  finalizeImage(event: Event) {}

  imageCropped(event: ImageCroppedEvent) {
    // Preview the cropped image
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl || event.base64 || ''
    );
    console.log(event);
    this.flags.profilePicture = this.croppedImage;
  }

  imageLoaded() {
    this.showCropper = true;

    console.log('Image loaded');
  }

  cropperReady() {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  cropImage() {
    this.showCropper = !this.showCropper;
  }

  instagram() {
    this.animate = true;
    this.flags.activePlatform = 'instagram';
    setTimeout(() => (this.animate = false), 1000); // reset animation state after it ends
  }

  facebook() {
    this.animate = true;
    this.flags.activePlatform = 'facebook';
    setTimeout(() => (this.animate = false), 1000); // reset animation state after it ends
  }

  linkedin() {
    this.animate = true;
    this.flags.activePlatform = 'linkedin';
    setTimeout(() => (this.animate = false), 1000); // reset animation state after it ends
  }
}
