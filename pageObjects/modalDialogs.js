let modalDialogs = function () {

    let deleteUserDialog = element.all(by.css('.modal-dialog '));
    let deleteUserDialogOkButton = deleteUserDialog.last().element(by.id('ok'));
    let deleteUserDialogCancelButton = deleteUserDialog.last().element(by.id('cancel'));

    this.isDeleteUserDialogVisible = function () {
        return deleteUserDialog
            .count()
            .then(function (size) {
                return size > 0;
            });
    };

    let buttonClick = function (button) {
        button.click()
    };

    this.confirmDeleteUser = function () {
        return buttonClick(deleteUserDialogOkButton);
    };

    this.cancelDeleteUser = function () {
        return buttonClick(deleteUserDialogCancelButton);
    };

    this.isDeleteDialogContainUserName = function (name) {
        return deleteUserDialog.last().all(by.cssContainingText('.modal-body', name))
            .count()
            .then(function (size) {
                return size > 0;
            });
    };
};

module.exports = new modalDialogs();