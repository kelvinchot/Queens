import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Firebase } from '@ionic-native/firebase';
//angularfire imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpModule, Http } from '@angular/http';

export const firebaseConfig = {
    apiKey: "AIzaSyC9sv-EILi-uaNNPj6R2otHryoAF_EIwcg",
    authDomain: "trial-9a321.firebaseapp.com",
    databaseURL: "https://trial-9a321.firebaseio.com",
    projectId: "trial-9a321",
    storageBucket: "",
    messagingSenderId: "73247815828"
};

import { TabsPage } from '../pages/tabs/tabs';
import { LifestylePage } from '../pages/lifestyle/lifestyle';
import { FinishPage } from '../pages/finish/finish';
import { BudgetPage } from '../pages/budget/budget';

import { IntroSliderPage } from '../pages/intro-slider/intro-slider';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalsProvider } from '../providers/globals/globals';
import { AlertService } from '../providers/alert-service/alert-service';
import {SocialSharing} from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LifestylePage,
    IntroSliderPage,
    FinishPage,
    BudgetPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
     IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig), 
        AngularFireDatabaseModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LifestylePage,
    IntroSliderPage,
    FinishPage,
    BudgetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalsProvider, AlertService, SocialSharing
  ]
})

export class AppModule {}
