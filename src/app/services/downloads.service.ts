import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {AlertController, Platform} from '@ionic/angular';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DownloadRequest, NotificationVisibility,Downloader} from '@ionic-native/downloader/ngx';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {
    constructor(
        private http:HttpClient,
        private platform: Platform,
        private alertCtrl: AlertController,
        private authService:AuthService,
        private downloader:Downloader,
    ) {
    }
    public downloadFile(id:number) {
        return new Observable(observer=>{
            let url=`${environment.backEndUrl}/user/commandeCsvExport?id=${id}`;
            let fileName=id+"";
            if (!this.platform.is('cordova')) {
                window.open(url, '_system');
                observer.complete()
            }
            else{
                var request: DownloadRequest = {
                    uri: url,
                    title: fileName,
                    description: '',
                    mimeType: '',
                    visibleInDownloadsUi: true,
                    notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
                    destinationInExternalFilesDir: {
                        dirType: 'Downloads',
                        subPath: fileName
                    }
                };


                this.downloader.download(request)
                    .then((location: string) => observer.complete())
                    .catch((error: any) => observer.error(error));

            }
        })
    }





}
