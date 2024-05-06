import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  flags: any;
  constructor(private authService: AuthService) {
    this.flags = {
      profilePicture: '',
    };
  }

  uploadImage(event: Event) {
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
          });
      });
    }
  }

  cropImage() {}
}
