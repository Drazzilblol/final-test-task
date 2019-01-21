describe('index page', function () {
    let registrationPage = require('../page_objects/registration-page.js');
    let userListPage = require('../page_objects/user-list-page.js');
    let registrationData = require('../fixtures/data.json');

    it('should clear registration fields', function () {
        browser.get('http://localhost:8080/TestAppExample/index');
        registrationPage.setNameFieldText(registrationData.validData.name);
        registrationPage.setAddressFieldText(registrationData.validData.address);
        registrationPage.setEmailFieldText(registrationData.validData.email);
        registrationPage.resetButtonClick();
        expect(registrationPage.getNameFieldText()).toEqual('');
        expect(registrationPage.getAddressFieldText()).toEqual('');
        expect(registrationPage.getEmaiFieldText()).toEqual('');
    });

    it('should disable add button if name validation not passed', function () {
        registrationPage.setNameFieldText(registrationData.dataWithInvalidName.name);
        registrationPage.setAddressFieldText(registrationData.dataWithInvalidName.address);
        registrationPage.setEmailFieldText(registrationData.dataWithInvalidName.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should disable add button if email validation not passed', function () {
        registrationPage.setNameFieldText(registrationData.dataWithInvalidEmail.name);
        registrationPage.setAddressFieldText(registrationData.dataWithInvalidEmail.address);
        registrationPage.setEmailFieldText(registrationData.dataWithInvalidEmail.email);
        expect(registrationPage.isSubmitButtonEnabled()).toBe(false);
        registrationPage.resetButtonClick();
    });

    it('should add user', function () {
        registrationPage.setNameFieldText(registrationData.validData.name);
        registrationPage.setAddressFieldText(registrationData.validData.address);
        registrationPage.setEmailFieldText(registrationData.validData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.validData.name)).toBe(true);
    });

    it('should not add user with same name', function () {
        registrationPage.setNameFieldText(registrationData.validData.name);
        registrationPage.setAddressFieldText(registrationData.validData.address);
        registrationPage.setEmailFieldText(registrationData.validData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.getUserListSize()).toBe(4);
    });

    it('should remove user', function () {
        userListPage.removeLastUser();
        userListPage.acceptUserRemoving();
        expect(userListPage.getUserListSize()).toBe(3);
    });

    it('should edit user', function () {
        userListPage.editLastUser();
        registrationPage.setNameFieldText(registrationData.validData.name);
        registrationPage.setAddressFieldText(registrationData.validData.address);
        registrationPage.setEmailFieldText(registrationData.validData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.validData.name)).toBe(true);
    });
});