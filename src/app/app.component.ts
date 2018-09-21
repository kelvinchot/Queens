import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { LifestylePage } from '../pages/lifestyle/lifestyle';
//import { FinishPage } from '../pages/finish/finish';
import { GlobalsProvider } from '../providers/globals/globals';
import { TranslateService } from '@ngx-translate/core';

//import { IntroSliderPage } from '../pages/intro-slider/intro-slider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public title : string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      menuCtrl: MenuController, public globals: GlobalsProvider, private _translate: TranslateService) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      menuCtrl.open();
      this._initTranslate();
    });
  }

  /**
   * Changes the display language when a user selects a different language
   * @param obj an event object with information of the selected button
   */
  public changeLanguage(obj) : void
  {
     this._translate.use(this.globals.currentLanguage);
  }

  /**
   * initiate the translate service, set a default language but allow user to continue with their browser's
   * current language, we only need to do this once
   */
   private _initTranslate()
  {
     // Set the default language for translation strings, and the current language.
     this._translate.setDefaultLang(this.globals.currentLanguage);

     if (this._translate.getBrowserLang() !== undefined)
     {
         this.globals.currentLanguage = this._translate.getBrowserLang();
         this._translate.use(this.globals.currentLanguage);
     }
  }
}
