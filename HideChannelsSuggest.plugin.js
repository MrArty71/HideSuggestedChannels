/**
 * @name HideSuggestedChannels
 * @author Artem Leonov
 * @description Hide the annoying block with the suggested channels using this plugin. When the suggested channels appear, the plugin will automatically click on the hide button
 * @version 1.0.1
 */


module.exports = class HideSuggestedChannels {
    constructor(observer) {
        this.observer = observer;
    }

    start() {
        var observerStatus = false;
        function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }
        
        const suggestLocator = "//*[contains(@class,'dismissButton')]";
        const suggestBlock = getElementByXpath(suggestLocator);
        if (document.contains(suggestBlock)) {
            // console.log("Hide suggested channels from base code");
            suggestBlock.click();
        }


        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const suggestLocator2 = "//*[contains(@class,'dismissButton')]";
                    const suggestBlock2 = getElementByXpath(suggestLocator);
                    if (document.contains(suggestBlock2)) {
                        // console.log("Hide suggested channels from observer");
                        suggestBlock2.click();
                    }
                }
            });
        });


        this.observer.observe(document, {attributes: true, childList: true, subtree: true});
    }

    stop() {
        this.observer.disconnect()
    }
}
