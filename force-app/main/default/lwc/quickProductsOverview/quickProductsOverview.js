import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import productCreationModal from 'c/quickProductCreation';
import getProductsScope from '@salesforce/apex/QuickProductController.retrieveLazyProduct2Chunk';
import getAccountOrdersInfo from '@salesforce/apex/QuickProductController.retrieveAccountOrdersInfo';
import getProductsAmount from '@salesforce/apex/QuickProductController.retrieveProductsAmount';

const DATA_LOAD_SCOPE = 200;
const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Product Code', fieldName: 'ProductCode' },
    { label: 'Active', fieldName: 'IsActive' }
];

export default class QuickProductsOverview extends LightningElement {
    columns = COLUMNS;
    isLoadingOverview = false;
    isLoadingDatatable = false;
    products = [];
    totalProductsAmount = 0;

    @wire(CurrentPageReference)
    quickPageReference;

    @wire(getProductsAmount)
    wiredProductsAmount({ data }) {
        if (data) {
            this.totalProductsAmount = data;
        }
    }

    connectedCallback() {
        this.handleLoadProducts();
    }

    handleLoadProducts(event) {
        this.isLoadingDatatable = true;

        let currentNumberOfProducts = this.products.length;
        getProductsScope({ startPosition: currentNumberOfProducts, scope: DATA_LOAD_SCOPE })
		    .then(result => {
			    let updatedRecords = [...this.products, ...result];
                this.products = updatedRecords;
		    })
            .finally(() => {
                this.isLoadingDatatable = false;
            });
    }

    async handleNewProductCreation(event) {
        let result = await productCreationModal.open({
            header: 'Creating a new product'
        });
    }

    async handleAccountOrdersInfo(event) {
        let selectedAccountId = event.detail.recordId;
        if (selectedAccountId != null) {
            this.isLoadingOverview = true;

            await getAccountOrdersInfo({ accountId: selectedAccountId })
		        .then(result => {
                    let accoundOrders = this.refs.companyOrders;
                    accoundOrders.textContent = JSON.stringify(result, undefined, 2);
		        });

            this.isLoadingOverview = false;
        }
    }

    isEmptyObject(obj) {
        return (obj === null || obj == undefined || obj == false || obj.length == 0);
    }
}