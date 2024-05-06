import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  constructor(private loadingCtrl: LoadingController) {
    this.supabase = createClient(
      environment.supabaseURL,
      environment.supabaseKey
    );
  }

  async presentLoading(msg: string) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      spinner: 'circles',
    });
    await loading.present();
    return loading;
  }

  uploadImageToSupabase = async (file: File) => {
    const loader = await this.presentLoading('Uploading Image');
    // Generate a unique file name with a timestamp
    const timestamp = Date.now();
    const fileName = this.appendTimestamp(file.name, timestamp);

    // Attempt to upload the file with the new unique name
    const { data, error } = await this.supabase.storage
      .from('user-media')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file: ', error.message);
      return null;
    }
    await loader.dismiss();
    return data;
  };

  appendTimestamp(fileName: string, timestamp: number): string {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1) {
      // No extension found
      return `${fileName}_${timestamp}`;
    }
    const extension = fileName.substring(dotIndex);
    const baseName = fileName.substring(0, dotIndex);
    return `${baseName}_${timestamp}${extension}`;
  }

  // Retrieve the profile picture from Supabase with the given fullPath
  getProfilePicture = async (fullPath: any) => {
    const loader = await this.presentLoading('Getting Image');
    const { data } = await this.supabase.storage
      .from('user-media')
      .createSignedUrl(fullPath, 3600);
    await loader.dismiss();
    return data;
  };
}
