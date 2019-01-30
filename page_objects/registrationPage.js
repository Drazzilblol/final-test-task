var registrationPage = function () {
    let registrationForm = element(by.name('myForm'));
    let nameField = registrationForm.element(by.id('uname'));
    let addressField = registrationForm.element(by.id('address'));
    let emailField = registrationForm.element(by.id('email'));
    let submitButton = registrationForm.element(by.id('submit'));
    let resetButton = registrationForm.element(by.id('reset'));

    this.isSubmitButtonEnabled = function () {
        return submitButton.getAttribute('disabled').then(function (result) {
            return result === null;
        });
    };

    this.isResetButtonEnabled = function () {
        return resetButton.getAttribute('disabled').then(function (result) {
            return result === null;
        });
    };

    this.resetButtonClick = function () {
        resetButton.click();
    };

    this.submitButtonClick = function () {
        submitButton.click();
    };

    this.isNameValid = function () {
        return nameField.getAttribute('class').then(function (result) {
            return !(result.indexOf('ng-invalid') !== -1);
        });
    };

    this.isEmailValid = function () {
        return emailField.getAttribute('class').then(function (result) {
            return !(result.indexOf('ng-invalid') !== -1);
        });
    };

    this.setNameFieldText = function (text) {
        nameField.clear();
        nameField.sendKeys(text);
    };

    this.getNameFieldText = function () {
       return nameField.getAttribute('value');
    };

    this.setAddressFieldText = function (text) {
        addressField.clear();
        addressField.sendKeys(text);
    };

    this.getAddressFieldText = function () {
        return addressField.getAttribute('value');
    };

    this.setEmailFieldText = function (text) {
        emailField.clear();
        emailField.sendKeys(text);
    };

    this.getEmailFieldText = function () {
        return emailField.getAttribute('value');
    };

    this.isRegistrationFormCleared = function () {
        expect(this.getNameFieldText()).toEqual('');
        expect(this.getAddressFieldText()).toEqual('');
        expect(this.getEmailFieldText()).toEqual('');
    }
};

module.exports = new registrationPage();