# Summer '24 | Product & Orders Management

## Overview
This project was created for educational purposes to demonstrate the new features of the Salesforce Summer '24 Release, specifically this example uses a demo project to manage, display, and work with products and orders. The project contains a set of manual steps that must be performed after deployment to the environment.

## Getting Started
1. Clone the repository and checkout to the `summer24-release` branch, then use the Salesforce CLI or your preferred deployment tool to deploy the components to your Salesforce org.
2. Since the presented code does not include permissions, ensure that your user has access to the `Salesforce Summer '24` custom tab, as well as the following fields of the `Product2` Sobject: `FinalPrice__c`, `Quality__c`, `UnitPrice__c`.
3. One of the examples presented uses the integration with <a href="https://openweathermap.org/">OpenWeatherMap</a> to get weather information. The key is in a custom label called `OpenWeatherKey`. Please replace this key with your own.
4. To demonstrate the functionality of the implementation, you need a test data set. To create it, use the file located at: `\scripts\data\summer24.apex`. Simply execute all the code in an anonymous window to create the entire data set. Please note that this data set generates more than 500 records, so the use of a test environment is recommended.

## Usage
1. **Salesforce Summer '24 Custom Tab**

    - Navigate to the `Salesforce Summer '24` tab.
    - Use the interface to view the full range of functionality on the left side (+ Flow tab contains components for interaction), and to work with external web component, as well as the LWC as a separate tab on the right side.

## Contact
For any questions or issues, please contact [ansukhetskyi@gmail.com](mailto:ansukhetskyi@gmail.com).
