var userListPage = function () {
    let userListTable = element(by.tagName('tbody'));
    let lastUser = userListTable.all(by.tagName('tr'))
        .last();
    let removeLastUserButton = lastUser.element(by.id('remove'));
    let editLastUserButton = lastUser.element(by.id('edit'));
    let removeUserDialogOkButton = element(by.css('.modal-dialog ')).element(by.id('ok'));

    this.getUserListSize = function () {
        return userListTable.all(by.tagName('tr'))
            .count()
            .then(function (size) {
                return size;
            });
    };

    this.removeLastUser = function () {
        removeLastUserButton.click();
    };

    this.editLastUser = function () {
        editLastUserButton.click();
    };

    this.acceptUserRemoving = function () {
        removeUserDialogOkButton.click();
    };

    this.isUserExist = function (text) {
        return userListTable.element(by.cssContainingText('td', text)).getText().then(function (result) {
            return result.indexOf(text) !== -1;
        });
    };

    this.getUsersWithSameName = function (text) {
        return userListTable.all(by.cssContainingText('td', text))
            .count()
            .then(function (size) {
                return size;
            });
    };
};

module.exports = new userListPage();