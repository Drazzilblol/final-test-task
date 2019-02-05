let registrationPage = function () {
    let registrationForm = element(by.name('myForm'));
    let nameField = registrationForm.element(by.id('uname'));
    let addressField = registrationForm.element(by.id('address'));
    let emailField = registrationForm.element(by.id('email'));
    let submitButton = registrationForm.element(by.id('submit'));
    let resetButton = registrationForm.element(by.id('reset'));

    let isButtonEnabled = function (button) {
        return button.getAttribute('disabled').then(function (result) {
            return result === null;
        });
    };

    this.isSubmitButtonEnabled = function () {
        return isButtonEnabled(submitButton);
    };

    this.isResetButtonEnabled = function () {
        return isButtonEnabled(resetButton);

    };

    let buttonClick = function (button) {
        button.click()
    };

    this.resetButtonClick = function () {
        buttonClick(resetButton);
    };

    this.submitButtonClick = function () {
        buttonClick(submitButton);
    };

    let isFieldValid = function (field) {
        return field.getAttribute('class').then(function (result) {
            return !(result.indexOf('ng-invalid') !== -1);
        });
    };

    this.isNameValid = function () {
        return isFieldValid(nameField);
    };

    this.isEmailValid = function () {
        return isFieldValid(emailField)
    };

    let getElementText = function (field) {
        return field.getAttribute('value');
    };

    this.getSubmitButtonText = function () {
        return getElementText(submitButton);
    };

    let setFieldText = function (field, text) {
        field.clear();
        field.sendKeys(text);
    };

    this.setNameFieldText = function (text) {
        setFieldText(nameField, text);
    };

    this.getNameFieldText = function () {
        return getElementText(nameField)
    };

    this.setAddressFieldText = function (text) {
        setFieldText(addressField, text);
    };

    this.getAddressFieldText = function () {
        return getElementText(addressField);
    };

    this.setEmailFieldText = function (text) {
        setFieldText(emailField, text);
    };

    this.getEmailFieldText = function () {
        return getElementText(emailField);
    };

    this.isRegistrationFormCleared = function () {
        expect(this.getNameFieldText()).toEqual('');
        expect(this.getAddressFieldText()).toEqual('');
        expect(this.getEmailFieldText()).toEqual('');
    }
};

module.exports = new registrationPage();