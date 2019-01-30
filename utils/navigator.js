let navigator = function () {
    let indexUrl = 'http://localhost:8080/TestAppExample/index';

    this.startApp = function () {
        browser.get(indexUrl);
    };

    this.goToIndexPage = function () {
        browser.getCurrentUrl().then(function (url) {
            if (url !== indexUrl) {
                browser.get(indexUrl);
            }
        })
    };
};

module.exports = new navigator();