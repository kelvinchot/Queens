import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { LifestylePage } from '../pages/lifestyle/lifestyle';
//import { FinishPage } from '../pages/finish/finish';
import { GlobalsProvider } from '../providers/globals/globals';
import { BudgetPage } from '../pages/budget/budget';
import { TranslateService } from '@ngx-translate/core';

//import { IntroSliderPage } from '../pages/intro-slider/intro-slider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  public language : string;



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

   public changeLanguage() : void
  {
    this.globals.language=this.language;
     this._translateLanguage();
  }

  private _translateLanguage() : void
  {
     this._translate.use(this.language);
     this._initialiseTranslation();
  }
 private _initialiseTranslation() : void
  {setTimeout(() =>
     {
        this.title        = this._translate.instant("home.heading");
        
     }, 250);
      
  }

   private _initTranslate()
  {
     // Set the default language for translation strings, and the current language.
     this._translate.setDefaultLang('en');


     if (this._translate.getBrowserLang() !== undefined)
     {
         this._translate.use(this._translate.getBrowserLang());
     }
     else
     {
         this._translate.use('en'); // Set your language here
     }
  }
  

}
