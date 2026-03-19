/**
 * Translations Data
 */
const translations = {
    en: {
        app_title: "Manufacturing Cost Calculator",
        app_subtitle: "Optimize your production costs and pricing strategy.",
        section_product_details: "1. Product Details",
        label_product_name: "Product Name",
        section_bom: "2. Bill of Materials (Parts)",
        label_part_name: "Part Name",
        label_price_kg: "Price per kg (₹)",
        label_weight_g: "Weight (grams)",
        btn_add_part: "Add Part",
        btn_update_part: "Update Part",
        th_part_name: "Part Name",
        th_cost: "Cost (₹)",
        th_action: "Action",
        section_expenses: "3. Monthly Expenses (Overheads)",
        label_labor: "Labor Cost (₹)",
        label_electricity: "Electricity Cost (₹)",
        label_rent: "Rent (₹)",
        label_qty: "Monthly Production Qty",
        section_pricing: "4. Pricing Strategy",
        label_profit: "Target Profit Percentage (%)",
        btn_save_product: "Save Product",
        btn_clear_all: "Clear All",
        btn_backup: "Download Backup",
        section_summary: "Financial Summary",
        summary_raw: "Raw Material Cost",
        summary_overhead: "Overhead per Unit",
        summary_total: "Total Manufacturing Cost",
        summary_selling: "Suggested Selling Price",
        section_distribution: "Cost Distribution",
        section_saved: "Saved Products",
        footer: "&copy; 2026 Manufacturing Cost Calculator. Built for Efficiency.",
        msg_enter_product: "Please enter a Product Name first.",
        msg_saved: 'Product "{name}" saved and backup generated!',
        msg_confirm_clear: "Are you sure you want to clear all inputs?",
        msg_invalid_part: "Please enter valid part details (Name, Price > 0, Weight > 0)",
        load_btn: "Load",
        remove_btn: "Remove",
        edit_btn: "Edit",
        delete_btn: "Delete"
    },
    gu: {
        app_title: "મેન્યુફેક્ચરિંગ કોસ્ટ કેલ્ક્યુલેટર",
        app_subtitle: "તમારા ઉત્પાદન ખર્ચ અને કિંમત વ્યૂહરચનાને ઑપ્ટિમાઇઝ કરો.",
        section_product_details: "૧. ઉત્પાદન વિગતો",
        label_product_name: "ઉત્પાદનનું નામ",
        section_bom: "૨. માલનું બિલ (ભાગો)",
        label_part_name: "ભાગનું નામ",
        label_price_kg: "કિલો દીઠ કિંમત (₹)",
        label_weight_g: "વજન (ગ્રામ)",
        btn_add_part: "ભાગ ઉમેરો",
        btn_update_part: "ભાગ અપડેટ કરો",
        th_part_name: "ભાગનું નામ",
        th_cost: "ખર્ચ (₹)",
        th_action: "ક્રિયા",
        section_expenses: "૩. માસિક ખર્ચ (ઓવરહેડ્સ)",
        label_labor: "મજૂરી ખર્ચ (₹)",
        label_electricity: "વીજળી ખર્ચ (₹)",
        label_rent: "ભાડું (₹)",
        label_qty: "માસિક ઉત્પાદન જથ્થો",
        section_pricing: "૪. કિંમત નિર્ધારણ વ્યૂહરચના",
        label_profit: "લક્ષિત નફો ટકાવારી (%)",
        btn_save_product: "ઉત્પાદન સાચવો",
        btn_clear_all: "બધું સાફ કરો",
        btn_backup: "બેકઅપ ડાઉનલોડ કરો",
        section_summary: "નાણાકીય સારાંશ",
        summary_raw: "કાચા માલનો ખર્ચ",
        summary_overhead: "એકમ દીઠ ઓવરહેડ",
        summary_total: "કુલ ઉત્પાદન ખર્ચ",
        summary_selling: "સુચવેલ વેચાણ કિંમત",
        section_distribution: "ખર્ચ વિતરણ",
        section_saved: "સાચવેલા ઉત્પાદનો",
        footer: "&copy; ૨૦૨૬ મેન્યુફેક્ચરિંગ કોસ્ટ કેલ્ક્યુલેટર. કાર્યક્ષમતા માટે બનાવેલ.",
        msg_enter_product: "કૃપા કરીને પહેલા ઉત્પાદનનું નામ દાખલ કરો.",
        msg_saved: 'ઉત્પાદન "{name}" સાચવવામાં આવ્યું અને બેકઅપ ફાઇલ બની!',
        msg_confirm_clear: "શું તમે ચોક્કસ બધા ઇનપુટ્સ સાફ કરવા માંગો છો?",
        msg_invalid_part: "કૃપા કરીને માન્ય ભાગ વિગતો દાખલ કરો (નામ, કિંમત > ૦, વજન > ૦)",
        load_btn: "લોડ કરો",
        remove_btn: "દૂર કરો",
        edit_btn: "ફેરફાર કરો",
        delete_btn: "કાઢી નાખો"
    }
};

/**
 * Application State
 */
let state = {
    id: null,
    productName: '',
    parts: [],
    expenses: {
        labor: 0,
        electricity: 0,
        rent: 0,
        productionQty: 1
    },
    profitPercent: 20,
    currentLanguage: 'en',
    editingPartId: null
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
    btnDownloadBackup: document.getElementById('btn-download-backup'),
    rawCostDisplay: document.getElementById('raw-cost-display'),
    overheadDisplay: document.getElementById('overhead-display'),
    totalCostDisplay: document.getElementById('total-cost-display'),
    sellingPriceDisplay: document.getElementById('selling-price-display'),
    savedProductsList: document.getElementById('saved-products-list'),
    langButtons: document.querySelectorAll('.btn-lang'),
};

/**
 * Initialization
 */
function init() {
    loadSavedProducts();
    setupEventListeners();
    applyLanguage(state.currentLanguage);
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

    // Add/Update Part
    elements.btnAddPart.addEventListener('click', () => {
        if (state.editingPartId) {
            updatePart();
        } else {
            addPart();
        }
    });

    // Save/Clear/Backup
    elements.btnSaveProduct.addEventListener('click', saveProduct);
    elements.btnClearAll.addEventListener('click', clearAll);
    elements.btnDownloadBackup.addEventListener('click', generateBackup);

    // Language Toggle
    elements.langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

/**
 * Language Logic
 */
function changeLanguage(lang) {
    state.currentLanguage = lang;
    elements.langButtons.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    applyLanguage(lang);
    renderPartsTable();
    loadSavedProducts();
}

function applyLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // Update placeholders
    elements.productName.placeholder = lang === 'en' ? "e.g., Ceramic Mug" : "દા.ત., સિરામિક મગ";
    elements.partName.placeholder = lang === 'en' ? "Part name" : "ભાગનું નામ";
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
 * Core Logic - Parts
 */
function addPart() {
    const name = elements.partName.value.trim();
    const price = parseFloat(elements.priceKg.value);
    const weight = parseFloat(elements.weightG.value);

    const t = translations[state.currentLanguage];

    if (!name || isNaN(price) || isNaN(weight) || price <= 0 || weight <= 0) {
        alert(t.msg_invalid_part);
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

    resetPartInputs();
    calculateAndRender();
}

function editPart(id) {
    const part = state.parts.find(p => p.id === id);
    if (!part) return;

    state.editingPartId = id;
    elements.partName.value = part.name;
    elements.priceKg.value = part.price;
    elements.weightG.value = part.weight;
    
    const t = translations[state.currentLanguage];
    elements.btnAddPart.textContent = t.btn_update_part;
    elements.btnAddPart.classList.add('btn-secondary');
    elements.btnAddPart.classList.remove('btn-primary');
    
    elements.partName.focus();
}

function updatePart() {
    const name = elements.partName.value.trim();
    const price = parseFloat(elements.priceKg.value);
    const weight = parseFloat(elements.weightG.value);

    const t = translations[state.currentLanguage];

    if (!name || isNaN(price) || isNaN(weight) || price <= 0 || weight <= 0) {
        alert(t.msg_invalid_part);
        return;
    }

    const index = state.parts.findIndex(p => p.id === state.editingPartId);
    if (index !== -1) {
        const cost = (price / 1000) * weight;
        state.parts[index] = {
            ...state.parts[index],
            name,
            price,
            weight,
            cost
        };
    }

    state.editingPartId = null;
    elements.btnAddPart.textContent = t.btn_add_part;
    elements.btnAddPart.classList.add('btn-primary');
    elements.btnAddPart.classList.remove('btn-secondary');

    resetPartInputs();
    calculateAndRender();
}

function deletePart(id) {
    state.parts = state.parts.filter(part => part.id !== id);
    if (state.editingPartId === id) {
        state.editingPartId = null;
        const t = translations[state.currentLanguage];
        elements.btnAddPart.textContent = t.btn_add_part;
        resetPartInputs();
    }
    calculateAndRender();
}

function resetPartInputs() {
    elements.partName.value = '';
    elements.priceKg.value = '';
    elements.weightG.value = '';
}

/**
 * Calculation & Rendering
 */
function calculateAndRender() {
    const rawCost = state.parts.reduce((sum, part) => sum + part.cost, 0);
    const monthlyOverhead = state.expenses.labor + state.expenses.electricity + state.expenses.rent;
    const overheadPerUnit = monthlyOverhead / (state.expenses.productionQty || 1);
    const totalCost = rawCost + overheadPerUnit;
    const sellingPrice = totalCost + (totalCost * (state.profitPercent / 100));

    elements.rawCostDisplay.textContent = formatCurrency(rawCost);
    elements.overheadDisplay.textContent = formatCurrency(overheadPerUnit);
    elements.totalCostDisplay.textContent = formatCurrency(totalCost);
    elements.sellingPriceDisplay.textContent = formatCurrency(sellingPrice);

    renderPartsTable();
    updateChart(state.parts);
}

function renderPartsTable() {
    elements.partsBody.innerHTML = '';
    const t = translations[state.currentLanguage];
    
    state.parts.forEach(part => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.name}</td>
            <td>${formatCurrency(part.cost)}</td>
            <td>
                <div class="item-actions">
                    <button class="btn-edit" onclick="window.app.editPart(${part.id})">${t.edit_btn}</button>
                    <button class="btn-delete" onclick="window.app.deletePart(${part.id})">${t.delete_btn}</button>
                </div>
            </td>
        `;
        elements.partsBody.appendChild(row);
    });
}

function updateUI() {
    elements.productName.value = state.productName;
    elements.laborCost.value = state.expenses.labor || '';
    elements.electricityCost.value = state.expenses.electricity || '';
    elements.rentCost.value = state.expenses.rent || '';
    elements.productionQty.value = state.expenses.productionQty || 1;
    elements.profitPercent.value = state.profitPercent;
    
    calculateAndRender();
}

/**
 * Storage & Backup Logic
 */
function saveProduct() {
    const t = translations[state.currentLanguage];
    if (!state.productName) {
        alert(t.msg_enter_product);
        return;
    }

    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    
    if (state.id) {
        const index = products.findIndex(p => p.id === state.id);
        if (index !== -1) {
            products[index] = { ...state };
        } else {
            products.push({ ...state });
        }
    } else {
        state.id = Date.now();
        products.push({ ...state });
    }
    
    localStorage.setItem('mfg_products', JSON.stringify(products));
    
    // Auto-generate backup on mobile
    generateBackup(false);

    alert(t.msg_saved.replace('{name}', state.productName));
    loadSavedProducts();
}

function loadSavedProducts() {
    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    const t = translations[state.currentLanguage];
    elements.savedProductsList.innerHTML = '';
    
    products.forEach(prod => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <span>${prod.productName}</span>
            <div class="item-actions">
                <button onclick="window.app.loadProduct(${prod.id})">${t.load_btn}</button>
                <button class="btn-delete" onclick="window.app.deleteSavedProduct(${prod.id})">${t.remove_btn}</button>
            </div>
        `;
        elements.savedProductsList.appendChild(li);
    });
}

function loadProduct(id) {
    const products = JSON.parse(localStorage.getItem('mfg_products') || '[]');
    const product = products.find(p => p.id === id);
    if (product) {
        // Keep the current language but update the rest of the state
        const currentLang = state.currentLanguage;
        state = JSON.parse(JSON.stringify(product));
        state.currentLanguage = currentLang;
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
    const t = translations[state.currentLanguage];
    if (confirm(t.msg_confirm_clear)) {
        state = {
            id: null,
            productName: '',
            parts: [],
            expenses: { labor: 0, electricity: 0, rent: 0, productionQty: 1 },
            profitPercent: 20,
            currentLanguage: state.currentLanguage,
            editingPartId: null
        };
        updateUI();
    }
}

/**
 * Backup Logic
 */
function generateBackup(isManual = true) {
    if (!state.productName && isManual) {
        const t = translations[state.currentLanguage];
        alert(t.msg_enter_product);
        return;
    }

    const rawCost = state.parts.reduce((sum, part) => sum + part.cost, 0);
    const monthlyOverhead = state.expenses.labor + state.expenses.electricity + state.expenses.rent;
    const overheadPerUnit = monthlyOverhead / (state.expenses.productionQty || 1);
    const totalCost = rawCost + overheadPerUnit;
    const sellingPrice = totalCost + (totalCost * (state.profitPercent / 100));

    let content = `--- MANUFACTURING COST REPORT ---\n`;
    content += `Product Name: ${state.productName}\n`;
    content += `Date: ${new Date().toLocaleString()}\n\n`;
    
    content += `PARTS LIST:\n`;
    state.parts.forEach(p => {
        content += `- ${p.name}: ₹${p.cost.toFixed(2)} (${p.weight}g @ ₹${p.price}/kg)\n`;
    });
    
    content += `\nOVERHEADS:\n`;
    content += `- Labor: ₹${state.expenses.labor}\n`;
    content += `- Electricity: ₹${state.expenses.electricity}\n`;
    content += `- Rent: ₹${state.expenses.rent}\n`;
    content += `- Monthly Quantity: ${state.expenses.productionQty}\n`;
    
    content += `\nSUMMARY:\n`;
    content += `Raw Material Cost: ₹${rawCost.toFixed(2)}\n`;
    content += `Overhead Per Unit: ₹${overheadPerUnit.toFixed(2)}\n`;
    content += `TOTAL MANUFACTURING COST: ₹${totalCost.toFixed(2)}\n`;
    content += `Target Profit: ${state.profitPercent}%\n`;
    content += `SUGGESTED SELLING PRICE: ₹${sellingPrice.toFixed(2)}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.productName.replace(/\s+/g, '_')}_Backup.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            plugins: { legend: { position: 'bottom' } },
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
    editPart,
    loadProduct,
    deleteSavedProduct
};

// Start App
document.addEventListener('DOMContentLoaded', init);
