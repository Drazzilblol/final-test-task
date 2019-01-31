describe('registration form', function () {
    let registrationPage = require('../pageObjects/registrationPage.js');
    let userListPage = require('../pageObjects/userListPage.js');
    let navigator = require('../utils/navigator.js');
    let registrationData = require('../fixtures/data.json');

    beforeAll(function () {
        navigator.startApp();
    });

    beforeEach(function () {
        navigator.goToIndexPage();
    });

    it('should clear registration fields', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isResetButtonEnabled()).toBe(true);
        registrationPage.resetButtonClick();
        registrationPage.isRegistrationFormCleared();
    });

    it('should check name and email fields validation', function () {
        registrationPage.setNameFieldText(registrationData.invalidName);
        expect(registrationPage.isNameValid()).toBe(false);
        registrationPage.resetButtonClick();
        registrationPage.setEmailFieldText(registrationData.invalidEmail);
        expect(registrationPage.isEmailValid()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should not add user with same name', function () {
        registrationPage.setNameFieldText(registrationData.invalidData.name);
        registrationPage.setAddressFieldText(registrationData.invalidData.address);
        registrationPage.setEmailFieldText(registrationData.invalidData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
        registrationPage.submitButtonClick();
        registrationPage.isRegistrationFormCleared();
        expect(userListPage.getUserListSize()).toBe(3);
    });

    it('should add user', function () {
        registrationPage.setNameFieldText(registrationData.userData.name);
        registrationPage.setAddressFieldText(registrationData.userData.address);
        registrationPage.setEmailFieldText(registrationData.userData.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(true);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.userData.name)).toBe(true);
        registrationPage.isRegistrationFormCleared();
    });
});