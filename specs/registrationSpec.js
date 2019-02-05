let registrationPage = require('../pageObjects/registrationPage.js');
let userListPage = require('../pageObjects/userListPage.js');
let navigator = require('../utils/navigator.js');
let registrationData = require('../fixtures/data.json');

describe('Check user registration form cleaning', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
    });

    it('Fill Name, Address, Email fields', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isResetButtonEnabled()).toBe(true);
    });

    it('Click on the Reset Form button', function () {
        registrationPage.resetButtonClick();
        registrationPage.isRegistrationFormCleared();
    });
});

describe('Check validation of email and name fields', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
    });

    it('Enter an invalid name in the Name field that is less than three characters long', function () {
        registrationPage.setNameFieldText(registrationData.invalidName);
        expect(registrationPage.isNameValid()).toBe(false);
        registrationPage.resetButtonClick();

    });

    it('Enter incorrect email address in the Email field', function () {
        registrationPage.setEmailFieldText(registrationData.invalidEmail);
        expect(registrationPage.isEmailValid()).toBe(false);
        registrationPage.resetButtonClick();
    });
});

describe('Check add user', function () {
    beforeAll(function () {
        navigator.goToIndexPage();
    });

    it('Fill Name, Address, Email fields', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
    });

    it('Click on the Add button', function () {
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.userData.name)).toBe(true);
        registrationPage.isRegistrationFormCleared();
    });
});