global without sharing class QuickProductController {
    @AuraEnabled
    public static List<Product2> retrieveLazyProduct2Chunk(Integer startPosition, Integer scope) {
        try {
            // Verification of the specified query
            Database.Cursor locator = Database.getCursor('SELECT Id, Name, ProductCode, IsActive FROM Product2');

            Integer endPosition = startPosition + scope;
            if (locator.getNumRecords() < endPosition && locator.getNumRecords() > startPosition) {
                Integer endCursorCount = locator.getNumRecords() - startPosition;
                return (List<Product2>) locator.fetch(startPosition, endCursorCount);
            } else if (locator.getNumRecords() > startPosition) {
                return (List<Product2>) locator.fetch(startPosition, scope);
            } else {
                return new List<Product2>();
            }

            // Maximum number of rows per cursor: 50 million (both synchronous and asynchronous)
            // Maximum number of fetch calls per transaction: 10 (both synchronous and asynchronous) 
            // Maximum number of cursors per day: 10,000 (both synchronous and asynchronous)
            // Maximum number of rows per day (aggregate limit): 100 million
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> retrieveAccountOrdersInfo(Id accountId) {
        return [
            SELECT Id, Name, 
                (SELECT Id, 
                    (SELECT Id FROM OrderItems) 
                FROM Orders) 
            FROM Account 
            WHERE Id =: accountId
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Integer retrieveProductsAmount() {
        List<AggregateResult> result  = [SELECT COUNT(Id) total FROM Product2];
        return (Integer) result[0].get('total');
    }

    @AuraEnabled
    public static Double calculateFinalProductPrice(String quality, Decimal pricePerUnit) {
        Product2 newProduct = new Product2();
        newProduct.UnitPrice__c = pricePerUnit;
        newProduct.Quality__c = quality;

        Schema.DescribeFieldResult finalPriceField = Schema.SObjectType.Product2.fields.FinalPrice__c;
        FormulaEval.FormulaInstance newFormula = Formula.builder()
            .withReturnType(FormulaEval.FormulaReturnType.DOUBLE)
            .withType(Product2.class)
            .withFormula(finalPriceField.getCalculatedFormula())
            .build();
        
        return (Double) newFormula.evaluate(newProduct);
    }

    @AuraEnabled
    public static String identifyPotentialProductName(String productName, Double finalPrice) {
        ProductWrapper newWrapper = new ProductWrapper();
        newWrapper.productName = productName;
        newWrapper.productFinalPrice = finalPrice;

        FormulaEval.FormulaInstance newFormula = Formula.builder()
            .withReturnType(FormulaEval.FormulaReturnType.STRING)
            .withType(ProductWrapper.class)
            .withFormula('TEXT(TODAY()) & " | " & productName & " - " & "$" & TEXT(productFinalPrice)')
            .build();

        return (String) newFormula.evaluate(newWrapper); // Illegal conversion from Object to String
    }

    global class ProductWrapper { // System.FormulaValidationException: context type must be global
        global String productName;
        global Double productFinalPrice;
    }
}