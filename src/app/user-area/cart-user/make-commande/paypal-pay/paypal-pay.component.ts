import {Component, Input, OnInit} from '@angular/core';
import {PayPal} from '@ionic-native/paypal/ngx';
import {PayPalConfiguration, PayPalPayment} from '@ionic-native/paypal';
import {AlertController, ModalController, Platform} from '@ionic/angular';


@Component({
    selector: 'app-paypal-pay',
    templateUrl: './paypal-pay.component.html',
    styleUrls: ['./paypal-pay.component.scss'],
})
export class PaypalPayComponent {
    @Input()
    paymentAmount: string;
    currency: string = 'USD';
    currencyIcon: string = 'MAD';

    responseData: any = '';
    private plat: string

    constructor(private payPal: PayPal,
                private modalCtrl: ModalController,
                public platform: Platform,
                public alertCtrl: AlertController) {


        let _this = this;
        setTimeout(() => {
            // Render the PayPal button into #paypal-button-container
            <any>window['paypal'].Buttons({

                // Set up the transaction
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.paymentAmount
                            }
                        }]
                    });
                },

                // Finalize the transaction
                onApprove: function (data, actions) {
                    return actions.order.capture()
                        .then(function (details) {
                            console.log(details);
                            // Show a success message to the buyer
                            //alert('Transaction completed by ' + details.payer.name.given_name + '!');
                            this.modalCtrl.dismiss({},'success');
                        })
                        .catch(err => {
                            this.showAlert(err)
                        })
                }
            }).render('#paypal-button-container');
        }, 500)
    }

    ionViewWillEnter() {
        if (this.platform.is('cordova'))
            this.plat = 'mobile'
        else
            this.plat = 'web'

    }

    payWithPaypal() {
        this.payPal.init({
            PayPalEnvironmentProduction: 'sb-xr3pd5212287@business.example.com',
            PayPalEnvironmentSandbox: 'AfUg0DwgyUDbdPS-tCVTq2_HoXtsm4gYQqEQWDJLeGFTHIeAJUGGAfEFWaPu88O9UQpHrD-0IQf5Zvlt'
        }).then(() => {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
                // Only needed if you get an "Internal Service Error" after PayPal login!
                //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(() => {
                let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
                this.payPal.renderSinglePaymentUI(payment).then((res) => {
                    this.responseData = JSON.stringify(res, null, 1);
                    // Successfully paid
                    this.modalCtrl.dismiss({},'success');


                    console.log('ok')
                }, (error) => {
                    // Error or render dialog closed without being successful
                    console.log('error1')
                    this.showAlert(error)
                });
            }, (error) => {
                // Error in configuration
                console.log('error2')
                this.showAlert(error)
            });

        }, (error) => {
            // Error in initialization, maybe PayPal isn't supported or something else
            console.log(error)
            console.log('error3')
            this.showAlert(error)
        });
    }

    onCancel() {
        this.modalCtrl.dismiss({}, 'cancel');
    }

    public showAlert(error) {
        this.alertCtrl.create({header: 'Information', message: error, buttons: ['Ok']}).then(
            (alertEl => {
                alertEl.present()
            })
        )
    }
}