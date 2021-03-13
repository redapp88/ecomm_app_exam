import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    cities=['Casablanca','Fés','Tanger','Marrakech','Salé','Meknès','Rabat','Oujda','Kénitra','Agadir','Tétouan','Témara','Safi','Mohammédia','Khouribga','El Jadida','Layoun','Dakhla','Béni Mellal','Nador','Taza']
    payementMethodes=["à la livraison","paypal"]
    constructor(private alertCtrl: AlertController) {
    }

    public showAlert(message: string) {
        if (message == null || message == '' || message.length == 0)
            message = 'erreur de connexion';
        else if (message === 'Unauthorized')
            message = 'Email ou mot de passe incorrect ';
        else if (message.includes('Maximum upload size exceeded'))
            message = 'Image trop volumeuse choisisez une photo de moin de 3 mb';

        this.alertCtrl.create({header: 'Information', message: message, buttons: ['Ok']}).then(
            (alertEl => {
                alertEl.present()
            })
        )
    }

    statusTranslate(state: string) {
        if(state=='WAITING')
            return "En Attente"
        if (state=="SHIPPED")
        return "Expedié"
        if(state=="DELETED")
            return "Supprimé"
        else return ""
    }
}