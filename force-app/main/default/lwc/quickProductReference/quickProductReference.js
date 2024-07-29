import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class QuickProductReference extends NavigationMixin(LightningElement) {
    handleUrlProductOverview(event) {
        this[NavigationMixin.Navigate]({ // /lightning/cmp/c__MyComponent
            type: 'standard__component',
            attributes: {
              componentName: 'c__quickProductsOverview',
            },
            state: {
              value: '0000',
              c__optionalValue: "value",
            },
        });
    }
}