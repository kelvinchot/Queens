import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LifestylePage } from '../lifestyle/lifestyle';
import { TranslateService } from '@ngx-translate/core';


/**
* Generated class for the BudgetPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/


@IonicPage()
@Component({
    selector: 'page-budget',
    templateUrl: 'budget.html',
})

export class BudgetPage {
    monthly_earnings: string = "";
    monthly_beauty_budget: string = "";
    hairstyle_cost: string = "";
    advance_booking: string = "";
    manipedi_cost: string = "";
    last_month_expense: string = "";

    alreadySaved: false;

    budgetList: AngularFireList<any>;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public globals: GlobalsProvider,
        public afDatabase: AngularFireDatabase,private _translate: TranslateService) {
        this.budgetList = afDatabase.list('/budget');
    }

    ionViewDidLeave() {
        if (this.hasNulls()) {
            this.globals.showToast("Please answer all questions in the \'Budget\' tab");
            return; // this tab is not completely filled
        } else if (this.alreadySaved)
            return;
        this.nextTab();
    }

    hasNulls(): boolean {
        if (
            this.globals.isNullVal(this.monthly_earnings) ||
            this.globals.isNullVal(this.monthly_beauty_budget) ||
            this.globals.isNullVal(this.hairstyle_cost) ||
            this.globals.isNullVal(this.advance_booking) ||
            this.globals.isNullVal(this.last_month_expense) ||
            this.globals.isNullVal(this.manipedi_cost)
        ) {
            return true;
        }
        this.globals.isBudgetReady = true;
        return false;
    }

    nextTab() {

        if (this.hasNulls()) {
            this.globals.showToast('Please answer all questions.');
            return; // this tab is not completely filled
        }

        let data = {
            monthly_earnings: this.monthly_earnings,
            monthly_beauty_budget: this.monthly_beauty_budget,
            hairstyle_cost: this.hairstyle_cost,
            advance_booking: this.advance_booking,
            manipedi_cost: this.manipedi_cost,
            last_month_expense: this.last_month_expense

        };

        let thenableObj;
        if (this.globals.firebaseRef != null) {// if we already have Firebase key for this session, use it
            thenableObj = this.budgetList.set(this.globals.firebaseRef, data); // this.globals.firebaseRef
        } else {
            thenableObj = this.budgetList.push(data); // else generate new key and save it as a global variable
            this.globals.firebaseRef = thenableObj.key;
        }

        thenableObj.then(newBudget => {
            this.globals.showToast("Successfully saved 'Budget' tab details.", 'bottom');
        }, error => {
            this.globals.showToast("Failed to save, please check your internet connection.", 'bottom');
        });
        this.navCtrl.parent.select(1);
    }
  }