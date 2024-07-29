import { LightningElement } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import externalForm from "@salesforce/resourceUrl/external_summer24_form";

export default class QuickExternalProductsOverview extends LightningElement {
    isExternalLoaded = false;
    productsConfig = '{"type":"object","properties":{"enabled":{"type":"boolean","ui":{"widget":"switch"},"title":"Customized Settings","default":false},"disableSwitchDemo":{"type":"boolean","ui":{"rule":{"action":"disable","path":"/enabled","condition":{"const":false,"default":false}},"widget":"switch"},"title":"Notify Me About New Products","description":"Email notifications when new products are created in your region."},"textFieldDemo":{"type":"string","ui":{"rule":{"action":"disable","path":"/enabled","condition":{"const":false,"default":false}}},"title":"Specify a product description template"}}}';

    async renderedCallback() {
        if (!this.isExternalLoaded) {
            await loadScript(this, externalForm);
            this.isExternalLoaded = true;
        }
    }

    handleProductSetting(event) {
        console.log('new changes');
        console.log(event.detail);
    }

    get loadedExternalSource() {
        return (this.isExternalLoaded === true);
    }
}