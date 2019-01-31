var modalDialogs = function () {

    let deleteUserDialog = element(by.css('.modal-dialog '));
    let deleteUserDialogOkButton = deleteUserDialog.element(by.id('ok'));

    this.isDeleteUserDialogVisible = function () {
        return deleteUserDialog.isDisplayed();
    };

    this.confirmDeleteUser = function () {
        return deleteUserDialogOkButton.click();
    };
};

module.exports = new modalDialogs();