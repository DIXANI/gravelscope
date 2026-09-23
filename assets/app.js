(() => {
  const $ = (id) => document.getElementById(id);
  const form = $('gravel-form');
  if (!form) return;

  const state = { system: 'us', shape: 'rectangle' };
  const densities = {
    general: 1600,
    pea: 1500,
    crushed: 1600,
    river: 1650
  };

  const unitLabels = {
    us: { length: 'ft', depth: 'in', area: 'sq ft', density: 'lb/ft³', bag: 'lb', price: '$ / short ton' },
    metric: { length: 'm', depth: 'cm', area: 'm²', density: 'kg/m³', bag: 'kg', price: 'price / tonne' }
  };

  const elements = {
    length: $('length'), width: $('width'), diameter: $('diameter'), knownArea: $('known-area'), depth: $('depth'),
    material: $('material'), density: $('density'), waste: $('waste'), bagSize: $('bag-size'), price: $('price'),
    rectFields: $('rect-fields'), circleFields: $('circle-fields'), areaFields: $('area-fields'),
    error: $('calc-error'), primary: $('primary-value'), primaryLabel: $('primary-label'),
    volumeAlt: $('volume-alt'), weightMain: $('weight-main'), weightAlt: $('weight-alt'), bags: $('bags'), cost: $('cost'),
    resultNote: $('result-note')
  };

  const allUnitSuffixes = document.querySelectorAll('[data-unit]');

  function setSystem(system) {
    const previousSystem = state.system;
    const wasCustom = elements.material.value === 'custom';
    const previousDensity = numberValue(elements.density);
    state.system = system;
    document.querySelectorAll('[data-system]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.system === system);
      btn.setAttribute('aria-pressed', btn.dataset.system === system ? 'true' : 'false');
    });

    const u = unitLabels[system];
    allUnitSuffixes.forEach(el => {
      const type = el.dataset.unit;
      el.textContent = u[type] || '';
    });

    if (system === 'us') {
      elements.length.value = '20'; elements.width.value = '10'; elements.depth.value = '2';
      elements.diameter.value = '12'; elements.knownArea.value = '200';
      elements.bagSize.value = '50';
    } else {
      elements.length.value = '6'; elements.width.value = '3'; elements.depth.value = '5';
      elements.diameter.value = '4'; elements.knownArea.value = '18';
      elements.bagSize.value = '25';
    }
    if (wasCustom && Number.isFinite(previousDensity) && previousSystem !== system) {
      elements.density.value = system === 'metric'
        ? (previousDensity / 0.06242796).toFixed(0)
        : (previousDensity * 0.06242796).toFixed(1);
    } else {
      updateDensityDisplay();
    }
    elements.price.value = '';
    calculate();
  }

  function setShape(shape) {
    state.shape = shape;
    document.querySelectorAll('[data-shape]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.shape === shape);
      btn.setAttribute('aria-pressed', btn.dataset.shape === shape ? 'true' : 'false');
    });
    elements.rectFields.classList.toggle('hidden', shape !== 'rectangle');
    elements.circleFields.classList.toggle('hidden', shape !== 'circle');
    elements.areaFields.classList.toggle('hidden', shape !== 'area');
    calculate();
  }

  function updateDensityDisplay() {
    const material = elements.material.value;
    if (material !== 'custom') {
      const kgm3 = densities[material] || 1600;
      elements.density.value = state.system === 'us' ? (kgm3 * 0.06242796).toFixed(1) : String(kgm3);
      elements.density.readOnly = true;
    } else {
      elements.density.readOnly = false;
      if (!elements.density.value) elements.density.value = state.system === 'us' ? '100' : '1600';
    }
  }

  function numberValue(el) {
    const n = Number.parseFloat(el.value);
    return Number.isFinite(n) ? n : NaN;
  }

  function fmt(n, digits = 2) {
    if (!Number.isFinite(n)) return '—';
    return n.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: n < 10 ? 2 : 0 });
  }

  function calculate() {
    elements.error.classList.remove('show');
    const depthInput = numberValue(elements.depth);
    const waste = Math.max(0, numberValue(elements.waste) || 0);
    const densityInput = numberValue(elements.density);
    const bagSizeInput = numberValue(elements.bagSize);
    const price = numberValue(elements.price);

    let areaM2;
    if (state.system === 'us') {
      if (state.shape === 'rectangle') {
        const l = numberValue(elements.length), w = numberValue(elements.width);
        areaM2 = l * w * 0.09290304;
      } else if (state.shape === 'circle') {
        const d = numberValue(elements.diameter);
        areaM2 = Math.PI * Math.pow(d / 2, 2) * 0.09290304;
      } else {
        areaM2 = numberValue(elements.knownArea) * 0.09290304;
      }
    } else {
      if (state.shape === 'rectangle') {
        areaM2 = numberValue(elements.length) * numberValue(elements.width);
      } else if (state.shape === 'circle') {
        const d = numberValue(elements.diameter);
        areaM2 = Math.PI * Math.pow(d / 2, 2);
      } else {
        areaM2 = numberValue(elements.knownArea);
      }
    }

    const depthM = state.system === 'us' ? depthInput * 0.0254 : depthInput / 100;
    const densityKgM3 = state.system === 'us' ? densityInput / 0.06242796 : densityInput;
    const bagKg = state.system === 'us' ? bagSizeInput * 0.45359237 : bagSizeInput;

    if (![areaM2, depthM, densityKgM3].every(v => Number.isFinite(v) && v > 0)) {
      elements.error.textContent = 'Enter positive project dimensions, depth, and material density.';
      elements.error.classList.add('show');
      return;
    }

    const baseM3 = areaM2 * depthM;
    const orderM3 = baseM3 * (1 + waste / 100);
    const kg = orderM3 * densityKgM3;
    const cubicYards = orderM3 * 1.30795062;
    const cubicFeet = orderM3 * 35.3146667;
    const shortTons = kg / 907.18474;
    const metricTonnes = kg / 1000;
    const pounds = kg * 2.20462262;
    const bagCount = Number.isFinite(bagKg) && bagKg > 0 ? Math.ceil(kg / bagKg) : NaN;

    if (state.system === 'us') {
      elements.primary.textContent = `${fmt(cubicYards)} yd³`;
      elements.primaryLabel.textContent = `order volume including ${fmt(waste, 0)}% allowance`;
      elements.volumeAlt.textContent = `${fmt(cubicFeet)} ft³`;
      elements.weightMain.textContent = `${fmt(shortTons)} short tons`;
      elements.weightAlt.textContent = `${fmt(pounds, 0)} lb`;
      elements.cost.textContent = Number.isFinite(price) && price >= 0 ? `$${fmt(shortTons * price)}` : 'Optional';
    } else {
      elements.primary.textContent = `${fmt(orderM3)} m³`;
      elements.primaryLabel.textContent = `order volume including ${fmt(waste, 0)}% allowance`;
      elements.volumeAlt.textContent = `${fmt(cubicYards)} yd³`;
      elements.weightMain.textContent = `${fmt(metricTonnes)} tonnes`;
      elements.weightAlt.textContent = `${fmt(kg, 0)} kg`;
      elements.cost.textContent = Number.isFinite(price) && price >= 0 ? `${fmt(metricTonnes * price)}` : 'Optional';
    }

    elements.bags.textContent = Number.isFinite(bagCount) ? `${bagCount.toLocaleString()} bags` : '—';
    elements.resultNote.textContent = `Base volume before allowance: ${fmt(baseM3)} m³. Weight uses a planning density of ${fmt(densityKgM3, 0)} kg/m³; supplier density should be used when available.`;
  }

  document.querySelectorAll('[data-system]').forEach(btn => btn.addEventListener('click', () => setSystem(btn.dataset.system)));
  document.querySelectorAll('[data-shape]').forEach(btn => btn.addEventListener('click', () => setShape(btn.dataset.shape)));
  elements.material.addEventListener('change', () => { updateDensityDisplay(); calculate(); });
  form.addEventListener('submit', (e) => { e.preventDefault(); calculate(); });
  form.addEventListener('input', (e) => {
    if (e.target === elements.density && elements.material.value !== 'custom') return;
    calculate();
  });

  updateDensityDisplay();
  calculate();
})();
