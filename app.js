// Manufacturing Cost Calculator - Application Logic

/**
 * Application State
 */
let state = {
    productName: '',
    parts: [],
    expenses: {
        labor: 0,
        electricity: 0,
        rent: 0,
        productionQty: 1
    },
    profitPercent: 20
};

// Chart Instance
let costChart = null;

/**
 * DOM Elements
 */
const elements = {
    productName: document.getElementById('product-name'),
    partName: document.getElementById('part-name'),
    priceKg: document.getElementById('price-kg'),
    weightG: document.getElementById('weight-g'),
    btnAddPart: document.getElementById('btn-add-part'),
    partsBody: document.getElementById('parts-body'),
    laborCost: document.getElementById('labor-cost'),
    electricityCost: document.getElementById('electricity-cost'),
    rentCost: document.getElementById('rent-cost'),
    productionQty: document.getElementById('production-qty'),
    profitPercent: document.getElementById('profit-percent'),
    btnSaveProduct: document.getElementById('btn-save-product'),
    btnClearAll: document.getElementById('btn-clear-all'),
    rawCostDisplay: document.getElementById('raw-cost-display'),
    overheadDisplay: document.getElementById('overhead-display'),
    totalCostDisplay: document.getElementById('total-cost-display'),
    sellingPriceDisplay: document.getElementById('selling-price-display'),
    savedProductsList: document.getElementById('saved-products-list'),
};

/**
 * Initialization
 */
function init() {
    loadSavedProducts();
    setupEventListeners();
    updateUI();
    initChart();
}

/**
 * Event Listeners
 */
function setupEventListeners() {
    // Inputs
    elements.productName.addEventListener('input', (e) => {
        state.productName = e.target.value;
    });

    elements.laborCost.addEventListener('input', updateExpenses);
    elements.electricityCost.addEventListener('input', updateExpenses);
    elements.rentCost.addEventListener('input', updateExpenses);
    elements.productionQty.addEventListener('input', updateExpenses);
    elements.profitPercent.addEventListener('input', (e) => {
        state.profitPercent = parseFloat(e.target.value) || 0;
        calculateAndRender();
    });

    // Add Part
    elements.btnAddPart.addEventListener('click', addPart);

    // Save/Clear
    elements.btnSaveProduct.addEventListener('click', saveProduct);
    elements.btnClearAll.addEventListener('click', clearAll);
}

function updateExpenses() {
    state.expenses = {
        labor: parseFloat(elements.laborCost.value) || 0,
        electricity: parseFloat(elements.electricityCost.value) || 0,
        rent: parseFloat(elements.rentCost.value) || 0,
        productionQty: parseFloat(elements.productionQty.value) || 1
    };
    calculateAndRender();
}

/**
 * Core Logic
 */
function addPart() {
    const name = elements.partName.value.trim();
    const price = parseFloat(elements.priceKg.value);
    const weight = parseFloat(elements.weightG.value);

    if (!name || isNaN(price) || isNaN(weight) || price <= 0 || weight <= 0) {
        alert('Please enter valid part details (Name, Price > 0, Weight > 0)');
        return;
    }

    const cost = (price / 1000) * weight;
    
    state.parts.push({
        id: Date.now(),
        name,
        price,
        weight,
        cost
    });

    // Reset inputs
    elements.partName.value = '';
    elements.priceKg.value = '';
    elements.weightG.value = '';
    elements.partName.focus();

    calculateAndRender();
}

function deletePart(id) {
    state.parts = state.parts.filter(part => part.id !== id);
    calculateAndRender();
}

function calculateAndRender() {
    // Calculations
    const rawCost = state.parts.reduce((sum, part) => sum + part.cost, 0);
    const monthlyOverhead = state.expenses.labor + state.expenses.electricity + state.expenses.rent;
    const overheadPerUnit = monthlyOverhead / (state.expenses.productionQty || 1);
    const totalCost = rawCost + overheadPerUnit;
    const sellingPrice = totalCost + (totalCost * (state.profitPercent / 100));

    // Update UI Displays
    elements.rawCostDisplay.textContent = formatCurrency(rawCost);
    elements.overheadDisplay.textContent = formatCurrency(overheadPerUnit);
    elements.totalCostDisplay.textContent = formatCurrency(totalCost);
    elements.sellingPriceDisplay.textContent = formatCurrency(sellingPrice);

    renderPartsTable();
    updateChart(state.parts);
}

function renderPartsTable() {
    elements.partsBody.innerHTML = '';
    
    state.parts.forEach(part => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.name}</td>
            <td>${formatCurrency(part.cost)}</td>
            <td>
                <button class="btn-delete" onclick="window.app.deletePart(${part.id})">Delete</button>
            </td>
        `;
        elements.partsBody.appendChild(row);
    });
}

function updateUI() {
    // Sync inputs with state
    elements.productName.value = state.productName;
    elements.laborCost.value = state.expenses.labor || '';
    elements.electricityCost.value = state.expenses.electricity || '';
    elements.rentCost.value = state.expenses.rent || '';
    elements.productionQty.value = state.expenses.productionQty || 1;
    elements.profitPercent.value = state.profitPercent;
    
    calculateAndRender();
}

/**
 * Storage Logic
 */
function saveProduct() {
    if (!state.productName) {
        alert('Please enter a Product Name first.');
        return;
    }

    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    const newProduct = { ...state, id: Date.now() };
    
    products.push(newProduct);
    localStorage.setItem('mfg_products', JSON.stringify(products));
    
    alert(`Product "${state.productName}" saved!`);
    loadSavedProducts();
}

function loadSavedProducts() {
    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    elements.savedProductsList.innerHTML = '';
    
    products.forEach(prod => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <span>${prod.productName}</span>
            <div class="item-actions">
                <button onclick="window.app.loadProduct(${prod.id})">Load</button>
                <button class="btn-delete" onclick="window.app.deleteSavedProduct(${prod.id})">Remove</button>
            </div>
        `;
        elements.savedProductsList.appendChild(li);
    });
}

function loadProduct(id) {
    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    const product = products.find(p => p.id === id);
    if (product) {
        state = JSON.parse(JSON.stringify(product));
        updateUI();
    }
}

function deleteSavedProduct(id) {
    let products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    products = products.filter(p => p.id !== id);
    localStorage.setItem('mfg_products', JSON.stringify(products));
    loadSavedProducts();
}

function clearAll() {
    if (confirm('Are you sure you want to clear all inputs?')) {
        state = {
            productName: '',
            parts: [],
            expenses: { labor: 0, electricity: 0, rent: 0, productionQty: 1 },
            profitPercent: 20
        };
        updateUI();
    }
}

/**
 * Chart Logic
 */
function initChart() {
    const ctx = document.getElementById('costChart').getContext('2d');
    costChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe',
                    '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%'
        }
    });
}

function updateChart(parts) {
    if (!costChart) return;
    
    if (parts.length === 0) {
        costChart.data.labels = ['No Data'];
        costChart.data.datasets[0].data = [1];
        costChart.data.datasets[0].backgroundColor = ['#e2e8f0'];
    } else {
        costChart.data.labels = parts.map(p => p.name);
        costChart.data.datasets[0].data = parts.map(p => p.cost);
        costChart.data.datasets[0].backgroundColor = [
            '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe',
            '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa'
        ];
    }
    costChart.update();
}

/**
 * Utility Functions
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(value);
}

// Expose functions for inline HTML event handlers
window.app = {
    deletePart,
    loadProduct,
    deleteSavedProduct
};

// Start App
document.addEventListener('DOMContentLoaded', init);
