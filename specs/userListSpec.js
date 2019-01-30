describe('user list', function () {
    let registrationPage = require('../page_objects/registrationPage.js');
    let userListPage = require('../page_objects/userListPage.js');
    let modalDialogs = require('../page_objects/modalDialogs.js');
    let navigator = require('../utils/navigator.js');
    let registrationData = require('../fixtures/data.json');

    beforeEach(function () {
        navigator.goToIndexPage();
    });

    it('should edit user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.editLastUser();
        expect(registrationPage.getAddressFieldText()).toEqual(registrationData.userData.address);
        expect(registrationPage.getNameFieldText()).toEqual(registrationData.userData.name);
        expect(registrationPage.getEmailFieldText()).toEqual(registrationData.userData.email);
        registrationPage.setNameFieldText(registrationData.editData.name);
        registrationPage.setAddressFieldText(registrationData.editData.address);
        registrationPage.setEmailFieldText(registrationData.editData.email);
        registrationPage.submitButtonClick();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(true);
        registrationPage.isRegistrationFormCleared();
    });

    it('should remove user', function () {
        expect(userListPage.getUserListSize()).toBeGreaterThan(0);
        userListPage.removeLastUser();
        expect(modalDialogs.isDeleteUserDialogVisible()).toBe(true);
        modalDialogs.confirmDeleteUser();
        expect(userListPage.isUserExist(registrationData.editData.name)).toBe(false);
    });
});