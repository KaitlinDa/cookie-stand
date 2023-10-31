'use strict';

// Seattle info
let seattle = {
  name: 'Seattle',
  minimumCustomers: 23,
  maximumCustomers: 65,
  avgCookiesPerSale: 6.3,
  salesData: [], // Array to store hourly sales data
};

// Tokyo info
let tokyo = {
  name: 'Tokyo',
  minimumCustomers: 3,
  maximumCustomers: 24,
  avgCookiesPerSale: 1.2,
  salesData: [], 
};

// Dubai info
let dubai = {
  name: 'Dubai',
  minimumCustomers: 11,
  maximumCustomers: 38,
  avgCookiesPerSale: 3.7,
  salesData: [], 
};

// Paris info
let paris = {
  name: 'Paris',
  minimumCustomers: 20,
  maximumCustomers: 38,
  avgCookiesPerSale: 2.3,
  salesData: [], 
};

// Lima info
let lima = {
  name: 'Lima',
  minimumCustomers: 2,
  maximumCustomers: 16,
  avgCookiesPerSale: 4.6,
  salesData: [], 
};

// Function that generates random sales data for each location
function generateSalesData(location) {
  for (let hour = 6; hour <= 19; hour++) {
    // Generate a random number of customers within the specified range
    let randomCustomers = Math.floor(Math.random() * (location.maximumCustomers - location.minimumCustomers + 1) + location.minimumCustomers);
    // Calculate the cookies sold for the hour
    let cookiesSold = Math.round(randomCustomers * location.avgCookiesPerSale);
    // Store the sales data for the hour
    location.salesData.push({ hour: hour, cookiesSold: cookiesSold });
  }
}

// Generate sales data for each location
generateSalesData(seattle);
generateSalesData(tokyo);
generateSalesData(dubai);
generateSalesData(paris);
generateSalesData(lima);

  