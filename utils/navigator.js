let navigator = function () {
    let indexUrl = 'http://localhost:8080/TestAppExample/index';

    this.goToIndexPage = function () {
        browser.getCurrentUrl().then(function (url) {
            if (url !== indexUrl) {
                browser.get(this.indexUrl);
            }
        })
    };

    this.getIndexUrl = function () {
       return indexUrl;
    }
};

module.exports = new navigator();