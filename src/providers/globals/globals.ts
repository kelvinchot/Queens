import { Injectable } from '@angular/core';
import { AlertController, Tabs, ToastController, Alert, Toast } from 'ionic-angular';

/**
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/**
 * GlobalsProvider provider -- we define here the variables, services, and helper functions
 * we want to be able to access globally
 */
@Injectable()
export class GlobalsProvider {

    public firebaseRef: string; // use one Firebase key to store the data for each tab
    public isFinishReady: boolean = false; // true if Finish tab is completely filled
    public isBudgetReady: boolean = false; // true if Budget tab is completely filled
    public isLifestyleReady: boolean = false; // true if Lifestyle tab is completely filled

    /**
     * Constructor -- Perform dependency injection
     * @param alertController inject a reference to the AlertController so we can create/show alert dialogs
     * @param toastCtrl inject a reference to the ToastController so we can create/show toasts
     */
    constructor(private alertController: AlertController, public toastCtrl: ToastController) {
        console.log('Hello GlobalsProvider Provider');
    }

    /**
     * Create and show an alert on screen
     * @param title the title of the alert box shown
     * @param message the text to display on the alert message box
     * @returns a reference to the Alert object that was created and is being displayed
     */
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

    /**
     * Checks if a person born on a given date has reached a certain age already
     * @param date 
     * @param age 
     * @returns true if person born on given date has reached specified age
     */
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

    /**
     * Checks if given phone number is Kenyan i.e. if it matches the pattern 07xxxxxxxx where x is 0-9
     * @param phoneNumber the string to check if is a correct phone number
     * @returns true if phoneNumber is a valid Kenyan number
     */
    public isValidPhone(phoneNumber: string): boolean {
        return phoneNumber != null && (phoneNumber.match(/^[0-9]+$/) != null ||
            phoneNumber.match(/^\+07[0-9]{8}$/) != null); // force phone # format to be 07xxxxxxxx
    }

    /**
     * Checks if a given string is a correct whole number amount
     * @param amount the string to verify if is amount
     * @param canBeNegative a flag to allow number to be negative, else negative amounts are detected as invalid
     * @returns true if amount parameter is a valid amount
     */
    isValidAmount(amount: string, canBeNegative: boolean = false): boolean {
        if (canBeNegative) {
            return amount != null && amount.match(/^-?[0-9]+$/) != null;
        }
        return amount != null && amount.match(/^[0-9]+$/) != null;
    }

    /**
     * Check if a string is a valid email address
     * @param email the string to verify if is a valid email address
     * @returns true if param email is valid email address
     */
    isValidEmail(email: string): boolean {
        return email != null
            && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) != null;
    }

    /**
     * Check if the string passed is either null or an empty string ""
     * @param value the string to validate
     * @returns true if passed value is a null or empty strinh
     */
    isNullVal(value: string): boolean {
        if (value != null && !(''.trim()).match(value)) {
            return false; // string is empty
        }
        return true;
    }

    /**
     * Create and show a toast message on screen
     * @param message string message to display in the toast
     * @param position (top|middle|bottom) the position of the toast on screen, default is middle
     * @param duration the number of milliseconds to show the toast b4 dismissing it, default is 3000ms (i.e. 3s)
     * @param dismissBtnText text to show on toast's dismiss button, default is Dismiss
     * @returns a reference to the Toast object created and displayed
     */
    showToast(message: string, position: string = 'middle', duration: number = 3000, dismissBtnText: string = 'Dismiss') : Toast {
        
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            showCloseButton: true,
            closeButtonText: dismissBtnText
            // dismissOnPageChange: true
        });
        toast.present();
        return toast;
    }
}