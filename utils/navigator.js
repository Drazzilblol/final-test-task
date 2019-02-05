let navigator = function () {
    let indexUrl = 'http://localhost:8080/TestAppExample/index';

    this.goToIndexPage = function () {
        browser.waitForAngularEnabled(false);
        browser.getCurrentUrl().then(function (url) {
            if (url !== indexUrl) {
                browser.get(indexUrl);
            }
        })
        browser.waitForAngularEnabled(true);
    };
};

module.exports = new navigator();