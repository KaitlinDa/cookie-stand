function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createElement(tag, content, parent) {
  const element = document.createElement(tag);
  if (content) element.textContent = content;
  if (parent) parent.appendChild(element);
  return element;
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
  for (let i = 0; i < 14; i++) {
    const cookiesThisHour = Math.floor(random(this.minCust, this.maxCust) * this.avgCookie);
    this.cookiesEachHour.push(cookiesThisHour);
    this.totalCookies += cookiesThisHour;
  }
};

Store.prototype.render = function(table) {
  const tr = createElement('tr', '', table);
  createElement('td', this.name, tr);
  this.cookiesEachHour.forEach(hour => createElement('td', hour, tr));
  createElement('td', this.totalCookies, tr);
};

function createTableHeader(table) {
  const times = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
  const tr = createElement('tr', '', table);
  createElement('th', '', tr);
  times.forEach(time => createElement('th', time, tr));
  createElement('th', 'Daily Location Total', tr);
}

function createTableFooter(table, stores) {
  const tr = createElement('tr', '', table);
  createElement('td', 'Totals', tr);

  let grandTotal = 0;
  for (let i = 0; i < 14; i++) {
    let hourlyTotal = 0;
    for (let store of stores) {
      hourlyTotal += store.cookiesEachHour[i];
    }
    grandTotal += hourlyTotal;
    createElement('td', hourlyTotal, tr);
  }

  createElement('td', grandTotal, tr);
}

function clearTableFooter(table) {
  table.deleteRow(-1);
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('new-store-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const minCust = parseInt(document.getElementById('minCust').value, 10);
    const maxCust = parseInt(document.getElementById('maxCust').value, 10);
    const avgCookie = parseFloat(document.getElementById('avgCookie').value);

    const newStore = new Store(name, minCust, maxCust, avgCookie);
    newStore.calculateHourlySales();
    newStore.render(table);

    stores.push(newStore);

    clearTableFooter(table);
    createTableFooter(table, stores);

    form.reset();
  });
});

const table = document.getElementById('sales-table');
const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 16, 4.6);

const stores = [seattle, tokyo, dubai, paris, lima];

createTableHeader(table);
stores.forEach(store => {
  store.calculateHourlySales();
  store.render(table);
});
createTableFooter(table, stores);
