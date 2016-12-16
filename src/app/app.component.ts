import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { AndroidFingerprintAuth, TouchID } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      // Check if app is running on an Android device, else if device is running ios
      if (platform.is("android")) {
        // Check to see if device supports fingerprints
        AndroidFingerprintAuth.isAvailable().then((result) => {
          if (result.isAvailable) {
            // device has a fingerprint scanner
            AndroidFingerprintAuth.show({ clientId: 'myId', clientSecret: 'shhItsASecret' }).then((result) => {
              // success!
              alert('Valid fingerprint entered. Welcome!');
            }).catch((error) => {
              console.log(`AndroidFingerprintError: ${JSON.stringify(error)}`);
            });
          } else {
            // device does not have a fingerprint scanner
          }
        }).catch((error) => {
          console.log(`AndroidFingerprintError: ${JSON.stringify(error)}`);
        });
      } else if (platform.is('ios')) {
        // Check to see if device supports fingerprints
        TouchID.isAvailable().then((success) => {
          // Device has TouchID
          TouchID.verifyFingerprint('Give me your fingerprints!').then((success) => {
            // success!
            alert('Valid fingerprint entered. Welcome!');
          }, (error) => {
            alert(JSON.stringify(error));
            console.log(`TouchIDPlugin: ${JSON.stringify(error)}`);
          });
        }, (error) => {
          // Device doesn't have TouchID
          alert(JSON.stringify(error));
          console.log(`TouchIDPlugin: ${JSON.stringify(error)}`);
        });
      }
    });
  }
}
