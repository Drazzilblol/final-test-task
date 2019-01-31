let modalDialogs = function () {

    let deleteUserDialog = element(by.css('.modal-dialog '));
    let deleteUserDialogOkButton = deleteUserDialog.element(by.id('ok'));

    this.isDeleteUserDialogVisible = function () {
        return deleteUserDialog.isDisplayed();
    };

    this.confirmDeleteUser = function () {
        return deleteUserDialogOkButton.click();
    };

    this.isDeleteDialogContainUserName = function (name) {
        return deleteUserDialog.all(by.cssContainingText('.modal-body', name))
            .count()
            .then(function (size) {
            return size > 0;
        });
    };
};

module.exports = new modalDialogs();