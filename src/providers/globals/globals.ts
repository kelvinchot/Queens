import { Injectable } from '@angular/core';
import { AlertController, Tabs, ToastController, Alert } from 'ionic-angular';
import {
    RealEstateAsset, VehicleAsset, OtherAsset, BankAccount, UnitTrust,
    RetirementSaving, RegularSaving, EmployeeBenefit, GroupEmployeeBenefit
} from '../../pages/investments/investments';

/*  
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Person {
    first_name: string, middle_name: string, surname: string, dob: string,
    marital_status: string, occupation: string, employer: string
}

interface Child {
    name: string, dob: string, fee_balance_pri: number,
    fee_balance_sec: number, fee_balance_uni: number
}

interface Loan {
    type: string, institution: string, repaymentAmount: number, frequency: 0, outstanding: number, is_mortgage: boolean
}
interface MonthlyExpense {
    rent: number, utilities: number, food: number, clothing: number, transport: number,
    entertainment: number, others: number
}
interface ExtraIncome {
    source: string; amount: number; frequency: 0;
}
interface Income {
    principle: number; spouse: number;
    extra: ExtraIncome[]
}

@Injectable()
export class GlobalsProvider {
    monthlyearnings: any;
    foodbudget: any;
    lunch: any;
    paylunch: any;
    lunchcost: any;
    takeaway: string = "any";
    variety: string = "any";
    likelunch: string = "any";
    lunchkesho: string = "any";
    work: string = "any";
    lunches: string = "any";
    reason: string = "any";
    challenges: string = "any";
    lunchi: string = "any";
    lunchvalue: string = "any";
    onlinefrom: string = "any";
    office: string = "any";
    home: string = "any";
    challenge: string = "any";
    missed: string = "any";
    phone: string = "any";
    email: string = "any";


    childrenDetails: Child[];
    spouseDetails: Person;
    principleDetails: Person;
    income: { income: Income, extra: ExtraIncome[] };
    contacts: any;
    public firebaseRef: string;
    public isFinishReady: boolean = false;
    public isBudgetReady: boolean = false;
    public isLifestyleReady: boolean = false;
    public language: string;

    expenses: { monthlyExpenses: MonthlyExpense, loanExpenses: Loan[] };
    investments: {
        realEstateAssets: RealEstateAsset[],
        otherAssets: OtherAsset[],
        vehicleAssets: VehicleAsset[],
        bankAccounts: BankAccount[],
        //            saccoAccounts: this.saccoAccountsJSON,
        unitTrusts: UnitTrust[],
        //            shares: this.sharesJSON,
        retirementSavings: RetirementSaving[],
        regularSavings: RegularSaving[],
        employeeBenefits: EmployeeBenefit[],
        groupEmployeeBenefits: GroupEmployeeBenefit[]
    };
    confirmation: any;

    tabs: Tabs;

    constructor(private alertController: AlertController, public toastCtrl: ToastController) {
        console.log('Hello GlobalsProvider Provider');
    }

    showAlert(title: string, message: string) : Alert {

        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: ['OK'],
            cssClass: 'alertBox'
        });
        alert.present();
        return alert;
    }

    isAgeCorrect(date: string, age: number = 18): boolean {
        let argDateMillis = Date.parse(date);

        // calculate milliseconds since [age (default=18)] years
        let years = age;
        let days = years * 365;
        let hours = days * 24;
        let minutes = hours * 60;
        let seconds = minutes * 60;
        let millis = seconds * 1000;

        // milliseconds at exactly [age] years ago
        let _NeededYearsAgoMillis = Date.parse(Date()) - millis;

        let neededMinBirthYear = Math.round(_NeededYearsAgoMillis / (1000 * 60 * 60 * 24));
        let givenMinBirthYear = Math.round(argDateMillis / (1000 * 60 * 60 * 24));

        if (givenMinBirthYear <= neededMinBirthYear) {
            return true;
        } else
            return false;
    }
    isBlank1(missed: string): boolean {
        return missed != null && missed.match(/^[a-zA-Z0-9\s]+$/) != null;
    }

    isBlank2(lunch: string): boolean {
        return lunch != null && lunch.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank3(office: string): boolean {
        return office != null && office.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank4(home: string): boolean {
        return home != null && home.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank5(takeaway: string): boolean {
        return takeaway != null && takeaway.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank6(work: string): boolean {
        return work != null && work.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank7(food: string): boolean {
        return food != null && food.match(/^[a-zA-Z0-9\s]+$/) != null;
    }
    isBlank8(challenge: string): boolean {
        return challenge != null && challenge.match(/^[a-zA-Z0-9\s]+$/) != null;
    }


    public isValidPhone(phoneNumber: string): boolean {
        return phoneNumber != null && (phoneNumber.match(/^[0-9]+$/) != null ||
            phoneNumber.match(/^\+07[0-9]{8}$/) != null); // force phone # format to be 07xxxxxxxx
    }


    isValidAmount(amount: string, canBeNegative: boolean = false): boolean {
        if (canBeNegative) {
            return amount != null && amount.match(/^-?[0-9]+$/) != null;
        }
        return amount != null && amount.match(/^[0-9]+$/) != null;
    }

    isValidEmail(email: string): boolean {
        return email != null
            && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) != null;
    }

    removeItem(children: [any], i: number) {
        console.log(children);
        children.splice(i, 1);
    }

    setCurrentTabName(activeTab: Tabs) {
        activeTab.name = "Fuck That Nigga";
    }

    isNullVal(value: string): boolean {
        if (value != null && !(''.trim()).match(value)) {
            return false; // string is empty
        }
        return true;
    }

    showToast(message: string, position: string = 'middle', duration: number = 3000, dismissBtnText: string = 'Dismiss') {
        
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            showCloseButton: true,
            closeButtonText: dismissBtnText
            // dismissOnPageChange: true
        });

        toast.present();
    }
}
