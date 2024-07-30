String iterativeProductName = 'Product Name #{0}';
String iterativeProductCode = 'P-{0}';

List<Product2> newProducts = new List<Product2>();
for (Integer i = 0; i < 500; i++) {
    Product2 newProduct = new Product2();
    newProduct.Name = String.format(iterativeProductName, new List<Object>{Math.random()*i});
    newProduct.ProductCode = String.format(iterativeProductCode, new List<Object>{i});
    newProduct.isActive = true;

    newProducts.add(newProduct);
}

insert newProducts;

Pricebook2 newPriceBook = new Pricebook2();
newPriceBook.IsActive = true;
newPriceBook.Description = 'Test Pricebook';
newPriceBook.Name = 'Test';
insert newPriceBook;

Account newCompany = new Account();
newCompany.Name = 'Salesfoce Summer24 Release';
newCompany.Type = 'Other';
insert newCompany;

Contract newContract = new Contract();
newContract.StartDate = System.today();
newContract.ContractTerm = 10;
newContract.AccountId = newCompany.Id;
insert newContract;

Pricebook2 standardPriceBook = [SELECT Id FROM Pricebook2 WHERE isStandard = true LIMIT 1];

Order newOrder = new Order();
newOrder.ContractId = newContract.Id;
newOrder.AccountId = newCompany.Id;
newOrder.EffectiveDate = System.today();
newOrder.Description = 'Test Order';
newOrder.Status = 'Draft';
newOrder.Pricebook2Id = standardPriceBook.Id;
insert newOrder;

PricebookEntry newPricebookEntry = new PricebookEntry();
newPricebookEntry.IsActive = true;
newPricebookEntry.Pricebook2Id = standardPriceBook.Id;
newPricebookEntry.Product2Id = newProducts.get(0).Id;
newPricebookEntry.UnitPrice = 1.0;
insert newPricebookEntry;

OrderItem newOrderItem = new OrderItem();
newOrderItem.Product2Id = newProducts.get(0).Id;
newOrderItem.OrderId = newOrder.Id;
newOrderItem.Description = 'Test Item';
newOrderItem.PricebookEntryId = newPricebookEntry.Id;
newOrderItem.UnitPrice = 1.0;
newOrderItem.Quantity = 1;
insert newOrderItem;
