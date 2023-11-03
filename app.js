function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Store(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.cookiesEachHour = [];
  this.totalCookies = 0;
}

Store.prototype.calculateHourlySales = function() {
  for(let i = 0; i < 14; i++) {
      const cookiesThisHour = Math.floor(random(this.minCust, this.maxCust) * this.avgCookie);
      this.cookiesEachHour.push(cookiesThisHour);
      this.totalCookies += cookiesThisHour;
  }
};

Store.prototype.render = function(table) {
  const tr = document.createElement('tr');
  let td = document.createElement('td');
  td.textContent = this.name;
  tr.appendChild(td);

  for(let i = 0; i < this.cookiesEachHour.length; i++) {
      td = document.createElement('td');
      td.textContent = this.cookiesEachHour[i];
      tr.appendChild(td);
  }

  td = document.createElement('td');
  td.textContent = this.totalCookies;
  tr.appendChild(td);

  table.appendChild(tr);
};

function createTableHeader(table) {
  const times = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
  const tr = document.createElement('tr');
  let th = document.createElement('th');
  th.textContent = '';
  tr.appendChild(th);

  for(let i = 0; i < times.length; i++) {
      th = document.createElement('th');
      th.textContent = times[i];
      tr.appendChild(th);
  }

  th = document.createElement('th');
  th.textContent = 'Daily Location Total';
  tr.appendChild(th);
  
  table.appendChild(tr);
}

function createTableFooter(table, stores) {
  const tr = document.createElement('tr');
  let td = document.createElement('td');
  td.textContent = 'Totals';
  tr.appendChild(td);

  let grandTotal = 0;
  for(let i = 0; i < 14; i++) {
      let hourlyTotal = 0;
      for(let j = 0; j < stores.length; j++) {
          hourlyTotal += stores[j].cookiesEachHour[i];
      }
      grandTotal += hourlyTotal;
      td = document.createElement('td');
      td.textContent = hourlyTotal;
      tr.appendChild(td);
  }

  td = document.createElement('td');
  td.textContent = grandTotal;
  tr.appendChild(td);

  table.appendChild(tr);
}

const table = document.getElementById('sales-table');
const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 16, 4.6);

const stores = [seattle, tokyo, dubai, paris, lima];

createTableHeader(table);

for(let i = 0; i < stores.length; i++) {
  stores[i].calculateHourlySales();
  stores[i].render(table);
}

createTableFooter(table, stores);

// Take a look at this, having issues

function clearTableFooter(table) {
  table.deleteRow(-1);
}

document.addEventListener('DOMContentLoaded', function() {
const form = document.getElementById('new-store-form');
form.addEventListener('submit', function(event) {
  event.preventDefault(); 


  const newStore = new Store(name, minCust, maxCust, avgCookie);
  newStore.calculateHourlySales();
  newStore.render(table);

  stores.push(newStore);

  clearTableFooter(table);

  createTableFooter(table, stores);

  form.reset();
});
});
