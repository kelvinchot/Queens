import {Component, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular';

import { LifestylePage } from '../lifestyle/lifestyle'; 
import { FinishPage } from '../finish/finish'; 
import { BudgetPage } from '../budget/budget';

import {GlobalsProvider} from '../../providers/globals/globals';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild('navTabs') tabRef: Tabs;

    tab2Root = FinishPage;
   tab3Root = LifestylePage;
    tab7Root = BudgetPage

    constructor(public globals: GlobalsProvider) {
        console.log(this.tabRef);
    }
}
