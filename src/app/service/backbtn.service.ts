import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackbtnService {
  private previousUrl: string = "";
  private currentUrl: string = "";

  constructor(
    private router: Router,
    private platform: Platform,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  back() {
    // for home page back 

    this.platform.ready().then(() => {
      App.addListener('backButton', () => {
        let urlObject = new URL(window.location.href);
        let pathname = urlObject.pathname;
        console.log(pathname);

        if (pathname === '/') {
          console.log('appclosed');
          this.showExitConfirmation()
          return
        }
        else if (pathname === '/admin/dashboard' || pathname === '/employee/empdashboard') {
          console.log('closed');
          this.showExitConfirmation()
          return
        } else {
          console.log('pri');
          window.location.replace(this.previousUrl)
          window.location.href = this.previousUrl;
        }
      })
    })
  }


  showExitConfirmation() {
    const confirmed = window.confirm('Do you want to close the app?');
    if (confirmed) {
      // User confirmed, exit the app
      App.exitApp();
    }
  }
}