let userListPage = function () {
    let userListTable = element(by.tagName('tbody'));
    let userList = userListTable.all(by.tagName('tr'));
    let lastUser = userList.last().all(by.tagName('td'));
    let lastUserName = lastUser.first();
    let lastUserAddress = lastUser.get(1);
    let lastUserEmail = lastUser.get(2);
    let removeLastUserButton = lastUser.last().element(by.id('remove'));
    let editLastUserButton = lastUser.last().element(by.id('edit'));

    this.getUserListSize = function () {
        return userList.count()
            .then(function (size) {
                return size;
            });
    };

    let getRowText = function (row) {
        return row.getText();
    };

    this.getLastUserNameRowText = function () {
        return getRowText(lastUserName);
    };

    this.getLastUserEmailRowText = function () {
        return getRowText(lastUserEmail);
    };

    this.getLastUserAddressRowText = function () {
        return getRowText(lastUserAddress);
    };

    this.removeLastUser = function () {
        removeLastUserButton.click();
    };

    this.editLastUser = function () {
        editLastUserButton.click();
    };

    this.isUserExist = function (userName) {
        if (typeof userName === "string") {
            return isUserListContainUser(userName);
        } else {
            return userName.then(function (text) {
                return isUserListContainUser(text);
            })
        }
    };

    let isUserListContainUser = function (userName) {
        return userList.map(function (element) {
            return getRowText(element.all(by.tagName('td')).first());
        }).then(function (array) {
            return array.includes(userName);
        })
    }
};

module.exports = new userListPage();