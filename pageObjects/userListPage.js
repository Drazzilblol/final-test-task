let userListPage = function () {
    let userListTable = element(by.tagName('tbody'));
    let lastUser = userListTable.all(by.tagName('tr'))
        .last();
    let removeLastUserButton = lastUser.element(by.id('remove'));
    let editLastUserButton = lastUser.element(by.id('edit'));

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

    this.isUserExist = function (text) {
        return userListTable.all(by.cssContainingText('td', text))
            .count()
            .then(function (size) {
                return size > 0;
            });
    };
};

module.exports = new userListPage();