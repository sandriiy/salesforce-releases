import { api } from 'lwc';
import LightningModal from 'lightning/modal';

import getFinalProductPrice from '@salesforce/apex/QuickProductController.calculateFinalProductPrice';
import getProductName from '@salesforce/apex/QuickProductController.identifyPotentialProductName';

export default class MyModal extends LightningModal {
    @api header;

    confirmProductName;
    isLoading = false;

    async handleProductEvaluation(event) {
        this.isLoading = true;

        let productName = this.refs.name.value;
        let productPrice = this.refs.price.value;
        let productQuality = this.refs.quality.value;

        let finalProductPrice = await this.retrieveFinalProductPrice(productQuality, productPrice);
        let finalProductName = await this.retrieveProductName(productName, finalProductPrice);
        
        this.confirmProductName = finalProductName;
        this.refs.final.value = finalProductPrice;
        
        this.isLoading = false;
    }

    handleProductCreation(event) {
        this.close('created');
    }

    async retrieveFinalProductPrice(quality, pricePerUnit) {
        let finalPrice = 0;

        await getFinalProductPrice({ quality: quality, pricePerUnit: pricePerUnit })
        .then(result => {
            finalPrice = result;
        });

        return finalPrice;
    }

    async retrieveProductName(productName, finalPrice) {
        let potentialProductName = 'Unknown';

        await getProductName({ productName: productName, finalPrice: finalPrice })
        .then(result => {
            potentialProductName = result;
        });

        return potentialProductName;
    }
}