document.addEventListener('DOMContentLoaded', () => {
  // --- 1. DYNAMICORE COMPARISON CALCULATOR ---
  const rentaSlider = document.getElementById('rentaSlider');
  const rentaValue = document.getElementById('rentaValue');
  
  const setupIntelligential = document.getElementById('setupIntelligential');
  const rentaAnualIntelligential = document.getElementById('rentaAnualIntelligential');
  const tcoIntelligential = document.getElementById('tcoIntelligential');
  
  const setupDynamicore = document.getElementById('setupDynamicore');
  const rentaAnualDynamicore = document.getElementById('rentaAnualDynamicore');
  const extrasDynamicore = document.getElementById('extrasDynamicore');
  const tcoDynamicore = document.getElementById('tcoDynamicore');
  
  const savingsAmount = document.getElementById('savingsAmount');
  const savingsPercent = document.getElementById('savingsPercent');

  function formatCurrency(val) {
    return '$' + val.toLocaleString('es-MX') + ' MXN';
  }

  function updateCalculator() {
    if (!rentaSlider) return;
    const renta = parseInt(rentaSlider.value, 10);
    if (rentaValue) rentaValue.textContent = '$' + renta.toLocaleString('es-MX');

    const setupInt = renta * 2;
    const rentaAnualInt = renta * 12;
    const totalInt = setupInt + rentaAnualInt;

    const setupDyn = 350000;
    const rentaAnualDyn = Math.round(renta * 1.2) * 12;
    const extrasDyn = 200000;
    const totalDyn = setupDyn + rentaAnualDyn + extrasDyn;

    const ahorro = totalDyn - totalInt;
    const porcentaje = ((ahorro / totalDyn) * 100).toFixed(1);

    if (setupIntelligential) setupIntelligential.textContent = formatCurrency(setupInt);
    if (rentaAnualIntelligential) rentaAnualIntelligential.textContent = formatCurrency(rentaAnualInt);
    if (tcoIntelligential) tcoIntelligential.textContent = formatCurrency(totalInt);

    if (setupDynamicore) setupDynamicore.textContent = formatCurrency(setupDyn);
    if (rentaAnualDynamicore) rentaAnualDynamicore.textContent = formatCurrency(rentaAnualDyn);
    if (extrasDynamicore) extrasDynamicore.textContent = formatCurrency(extrasDyn);
    if (tcoDynamicore) tcoDynamicore.textContent = formatCurrency(totalDyn);

    if (savingsAmount) savingsAmount.textContent = formatCurrency(ahorro);
    if (savingsPercent) savingsPercent.textContent = `(${porcentaje}% de Ahorro Real)`;
  }

  if (rentaSlider) {
    rentaSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // --- 2. REVOPS CAPACITY & ARR/MRR KISS CALCULATOR (SECTION 4) ---
  const calcSliderClientes = document.getElementById('calcSliderClientes');
  const calcSliderMeses = document.getElementById('calcSliderMeses');
  const calcSliderAEs = document.getElementById('calcSliderAEs');
  const calcSliderTicket = document.getElementById('calcSliderTicket');
  const calcSliderSetup = document.getElementById('calcSliderSetup');

  const calcValClientes = document.getElementById('calcValClientes');
  const calcValMeses = document.getElementById('calcValMeses');
  const calcValAEs = document.getElementById('calcValAEs');
  const calcValTicket = document.getElementById('calcValTicket');
  const calcValSetup = document.getElementById('calcValSetup');

  const calcKpiRitmoEmpresa = document.getElementById('calcKpiRitmoEmpresa');
  const calcKpiCuotaAE = document.getElementById('calcKpiCuotaAE');
  const calcKpiMrrTotal = document.getElementById('calcKpiMrrTotal');
  const calcKpiArrTotal = document.getElementById('calcKpiArrTotal');
  const calcKpiSetupTotal = document.getElementById('calcKpiSetupTotal');

  const calcBarMrr = document.getElementById('calcBarMrr');
  const calcBarSetup = document.getElementById('calcBarSetup');
  const calcLegMrrPct = document.getElementById('calcLegMrrPct');
  const calcLegSetupPct = document.getElementById('calcLegSetupPct');
  const calcMecanicaText = document.getElementById('calcMecanicaText');

  // Toggle Preset Buttons:
  const btnPresetActual = document.getElementById('btnPresetActual');
  const btnPresetSweet = document.getElementById('btnPresetSweet');
  const btnPresetMix = document.getElementById('btnPresetMix');

  function updateRevOpsCalculator() {
    if (!calcSliderClientes) return;

    const clientes = parseInt(calcSliderClientes.value, 10);
    const meses = parseInt(calcSliderMeses.value, 10);
    const aes = parseInt(calcSliderAEs.value, 10);
    const ticket = parseInt(calcSliderTicket.value, 10);
    const setup = parseInt(calcSliderSetup.value, 10);

    if (calcValClientes) calcValClientes.textContent = clientes.toLocaleString('es-MX');
    if (calcValMeses) calcValMeses.textContent = meses + ' Meses';
    if (calcValAEs) calcValAEs.textContent = aes + (aes === 1 ? ' AE' : ' AEs');
    if (calcValTicket) calcValTicket.textContent = '$' + ticket.toLocaleString('es-MX') + ' MXN';
    if (calcValSetup) calcValSetup.textContent = '$' + setup.toLocaleString('es-MX') + ' MXN';

    const ritmoEmpresa = (clientes / meses).toFixed(2);
    const cuotaAE = (clientes / meses / aes).toFixed(2);
    const mrrTotal = clientes * ticket;
    const arrTotal = mrrTotal * 12;
    const setupTotal = clientes * setup;

    function formatMdp(val) {
      if (val >= 1000000) {
        return '$' + (val / 1000000).toFixed(2) + ' MDP';
      }
      return '$' + (val / 1000).toFixed(0) + 'k MXN';
    }

    if (calcKpiRitmoEmpresa) calcKpiRitmoEmpresa.textContent = ritmoEmpresa;
    if (calcKpiCuotaAE) calcKpiCuotaAE.textContent = cuotaAE;
    if (calcKpiMrrTotal) calcKpiMrrTotal.textContent = formatMdp(mrrTotal);
    if (calcKpiArrTotal) calcKpiArrTotal.textContent = formatMdp(arrTotal);
    if (calcKpiSetupTotal) calcKpiSetupTotal.textContent = 'Setup Cash: ' + formatMdp(setupTotal);

    const totalRev = mrrTotal + setupTotal;
    const mrrPct = Math.round((mrrTotal / totalRev) * 100);
    const setupPct = 100 - mrrPct;

    if (calcBarMrr) calcBarMrr.style.width = mrrPct + '%';
    if (calcBarSetup) calcBarSetup.style.width = setupPct + '%';
    if (calcLegMrrPct) calcLegMrrPct.textContent = mrrPct + '%';
    if (calcLegSetupPct) calcLegSetupPct.textContent = setupPct + '%';

    const diasPorCierre = Math.round(30 / (clientes / meses / aes));

    if (calcMecanicaText) {
      calcMecanicaText.innerHTML = `
        Para alcanzar la meta de <strong>${clientes} clientes</strong> en <strong>${meses} meses</strong> con <strong>${aes} Ejecutivo(s) de Cuenta (AE)</strong>, solo se requiere un ritmo de <strong>${cuotaAE} cierres al mes por persona</strong> (1 cierre cada ${diasPorCierre} días). Esto genera <strong>${formatMdp(mrrTotal)}/mes en MRR</strong> (${formatMdp(arrTotal)} ARR) con una recaudación inmediata de <strong>${formatMdp(setupTotal)} en Setup Fees</strong>.
      `;
    }
  }

  // --- 3. TIER MIX (PRODUCT MIX) SIMULATOR (SECTION 5) & BIDIRECTIONAL SYNC ---
  const tierSliderT1 = document.getElementById('tierSliderT1');
  const tierSliderT2 = document.getElementById('tierSliderT2');
  const tierSliderT3 = document.getElementById('tierSliderT3');

  const tierValT1 = document.getElementById('tierValT1');
  const tierValT2 = document.getElementById('tierValT2');
  const tierValT3 = document.getElementById('tierValT3');

  const tierResultCiclo = document.getElementById('tierResultCiclo');
  const tierResultTicket = document.getElementById('tierResultTicket');
  const tierRecommendationText = document.getElementById('tierRecommendationText');

  function updateTierMixCalculator(syncToSection4 = true) {
    if (!tierSliderT1) return;

    let pctT1 = parseInt(tierSliderT1.value, 10);
    let pctT2 = parseInt(tierSliderT2.value, 10);
    let pctT3 = parseInt(tierSliderT3.value, 10);

    const totalPct = pctT1 + pctT2 + pctT3;
    if (totalPct === 0) pctT2 = 100;

    // Normalize to 100%:
    const normT1 = pctT1 / (totalPct || 1);
    const normT2 = pctT2 / (totalPct || 1);
    const normT3 = pctT3 / (totalPct || 1);

    if (tierValT1) tierValT1.textContent = Math.round(normT1 * 100) + '%';
    if (tierValT2) tierValT2.textContent = Math.round(normT2 * 100) + '%';
    if (tierValT3) tierValT3.textContent = Math.round(normT3 * 100) + '%';

    // Pricing & Setup Constants:
    // T1: Renta $20,000 | Setup $40,000 | Ciclo: 20 días
    // T2: Renta $42,000 | Setup $55,000 | Ciclo: 45 días
    // T3: Renta $83,000 | Setup $65,000 | Ciclo: 90 días
    const cicloPonderado = Math.round((normT1 * 20) + (normT2 * 45) + (normT3 * 90));
    const ticketPonderado = Math.round((normT1 * 20000) + (normT2 * 42000) + (normT3 * 83000));
    const setupPonderado = Math.round((normT1 * 40000) + (normT2 * 55000) + (normT3 * 65000));

    if (tierResultCiclo) tierResultCiclo.textContent = cicloPonderado + ' Días';
    if (tierResultTicket) tierResultTicket.textContent = '$' + ticketPonderado.toLocaleString('es-MX') + ' MXN';

    const t1CuotaMes = (normT1 * 3).toFixed(1);
    const t2CuotaMes = (normT2 * 3).toFixed(1);
    const t3CuotaMes = (normT3 * 3).toFixed(1);

    if (tierRecommendationText) {
      tierRecommendationText.innerHTML = `
        • <strong>${t1CuotaMes} Clientes Tier 1</strong> (Startup / $20k)<br>
        • <strong>${t2CuotaMes} Clientes Tier 2</strong> (Growth / $42k)<br>
        • <strong>${t3CuotaMes} Clientes Tier 3</strong> (Enterprise / $83k)
      `;
    }

    // SYNC TO SECTION 4:
    if (syncToSection4 && calcSliderTicket && calcSliderSetup) {
      calcSliderTicket.value = ticketPonderado;
      calcSliderSetup.value = setupPonderado;
      updateRevOpsCalculator();
    }
  }

  // --- PRESET TOGGLE BUTTON LOGIC FOR SECTION 4 (ESCENARIOS DE EJECUCIÓN ESTRATÉGICA) ---
  const btnPresetMin36 = document.getElementById('btnPresetMin36');

  function setActivePresetBtn(activeBtn) {
    [btnPresetActual, btnPresetSweet, btnPresetMix, btnPresetMin36].forEach(btn => {
      if (!btn) return;
      if (btn === activeBtn) {
        btn.style.background = '#FFFFFF';
        btn.style.color = '#0F172A';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#64748B';
        btn.style.boxShadow = 'none';
      }
    });
  }

  // Escenario 1: Q3-Q4 2026 (20 Clientes a Diciembre / +$200k MRR)
  if (btnPresetActual) {
    btnPresetActual.addEventListener('click', () => {
      setActivePresetBtn(btnPresetActual);
      calcSliderClientes.value = 20;
      calcSliderMeses.value = 5;
      calcSliderAEs.value = 1;
      calcSliderTicket.value = 42000;
      calcSliderSetup.value = 55000;
      
      tierSliderT1.value = 40;
      tierSliderT2.value = 50;
      tierSliderT3.value = 10;
      
      updateTierMixCalculator(false);
      updateRevOpsCalculator();
    });
  }

  // Escenario 2: Meta Anual del Consejo (40 Clientes SOM en 12 Meses)
  if (btnPresetSweet) {
    btnPresetSweet.addEventListener('click', () => {
      setActivePresetBtn(btnPresetSweet);
      calcSliderClientes.value = 40;
      calcSliderMeses.value = 12;
      calcSliderAEs.value = 1;
      calcSliderTicket.value = 39500;
      calcSliderSetup.value = 55000;

      tierSliderT1.value = 30;
      tierSliderT2.value = 60;
      tierSliderT3.value = 10;

      updateTierMixCalculator(false);
      updateRevOpsCalculator();
    });
  }

  // Escenario 3: Visión a 3 Años (100 Clientes en 36 Meses / Escala SaaS)
  if (btnPresetMix) {
    btnPresetMix.addEventListener('click', () => {
      setActivePresetBtn(btnPresetMix);
      calcSliderClientes.value = 100;
      calcSliderMeses.value = 36;
      calcSliderAEs.value = 1;
      calcSliderTicket.value = 42000;
      calcSliderSetup.value = 58000;

      tierSliderT1.value = 20;
      tierSliderT2.value = 60;
      tierSliderT3.value = 20;

      updateTierMixCalculator(false);
      updateRevOpsCalculator();
    });
  }

  // Escenario 4: Comportamiento Mínimo 36 Meses (Métricas Reales Esperadas por la Compañía)
  if (btnPresetMin36) {
    btnPresetMin36.addEventListener('click', () => {
      setActivePresetBtn(btnPresetMin36);
      calcSliderClientes.value = 100;
      calcSliderMeses.value = 36;
      calcSliderAEs.value = 1;
      calcSliderTicket.value = 42000;
      calcSliderSetup.value = 55000;

      tierSliderT1.value = 30;
      tierSliderT2.value = 60;
      tierSliderT3.value = 10;

      updateTierMixCalculator(false);
      updateRevOpsCalculator();

      if (calcMecanicaText) {
        calcMecanicaText.innerHTML = `
          • <strong>COMPORTAMIENTO MÍNIMO EXIGIBLE (36 MESES):</strong> Para alcanzar la meta de <strong>100 clientes acumulados</strong> (40 Año 1 + 30 Año 2 + 30 Año 3) con <strong>1 Ejecutivo (AE)</strong>, se requiere un ritmo mínimo sostenido de <strong>2.78 cierres al mes</strong> (1 cierre cada 11 días).<br>
          • <strong>IMPACTO FINANCIERO REAL:</strong> Genera <strong>$4.20 MDP/mes en MRR</strong> ($50.40 MDP ARR) con una recaudación acumulada inmediata de <strong>$5.50 MDP en Setup Fees Cash</strong>.<br>
          • <strong>ACTIVIDAD OUTBOUND MÍNIMA EXIGIBLE:</strong> 5 cuentas objetivo al día (100 cuentas/mes ➔ 2.78% tasa de conversión requerida).
        `;
      }
    });
  }

  // --- LIVE REGULATORY NEWS TRIGGER BUTTON ---
  const btnTriggerLiveNews = document.getElementById('btnTriggerLiveNews');
  if (btnTriggerLiveNews) {
    btnTriggerLiveNews.addEventListener('click', () => {
      window.open('https://www.google.com/search?q=CNBV+Diario+Oficial+de+la+Federacion+SOFOM+PLD+SITI+2026', '_blank');
    });
  }

  // --- PRESET TOGGLE BUTTON LOGIC FOR SECTION 5 ---
  const btnTierPreset1 = document.getElementById('btnTierPreset1');
  const btnTierPreset2 = document.getElementById('btnTierPreset2');
  const btnTierPreset3 = document.getElementById('btnTierPreset3');

  function setActiveTierPresetBtn(activeBtn) {
    [btnTierPreset1, btnTierPreset2, btnTierPreset3].forEach(btn => {
      if (!btn) return;
      if (btn === activeBtn) {
        btn.style.background = '#FFFFFF';
        btn.style.color = '#0F172A';
        btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } else {
        btn.style.background = 'transparent';
        btn.style.color = '#64748B';
        btn.style.boxShadow = 'none';
      }
    });
  }

  if (btnTierPreset1) {
    btnTierPreset1.addEventListener('click', () => {
      setActiveTierPresetBtn(btnTierPreset1);
      tierSliderT1.value = 30;
      tierSliderT2.value = 60;
      tierSliderT3.value = 10;
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
  }

  if (btnTierPreset2) {
    btnTierPreset2.addEventListener('click', () => {
      setActiveTierPresetBtn(btnTierPreset2);
      tierSliderT1.value = 70;
      tierSliderT2.value = 30;
      tierSliderT3.value = 0;
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
  }

  if (btnTierPreset3) {
    btnTierPreset3.addEventListener('click', () => {
      setActiveTierPresetBtn(btnTierPreset3);
      tierSliderT1.value = 10;
      tierSliderT2.value = 40;
      tierSliderT3.value = 50;
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
  }

  if (calcSliderClientes) {
    calcSliderClientes.addEventListener('input', updateRevOpsCalculator);
    calcSliderMeses.addEventListener('input', updateRevOpsCalculator);
    calcSliderAEs.addEventListener('input', updateRevOpsCalculator);
    calcSliderTicket.addEventListener('input', updateRevOpsCalculator);
    calcSliderSetup.addEventListener('input', updateRevOpsCalculator);
    updateRevOpsCalculator();
  }

  if (tierSliderT1) {
    tierSliderT1.addEventListener('input', () => {
      setActiveTierPresetBtn(null);
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
    tierSliderT2.addEventListener('input', () => {
      setActiveTierPresetBtn(null);
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
    tierSliderT3.addEventListener('input', () => {
      setActiveTierPresetBtn(null);
      setActivePresetBtn(btnPresetMix);
      updateTierMixCalculator(true);
    });
    updateTierMixCalculator(false);
  }

  // --- SECTION 6: REAL SOFOMES PIPELINE TABLE RENDERER ---
  const pipelineTableBody = document.getElementById('pipelineTableBody');
  const pipelineSearchInput = document.getElementById('pipelineSearchInput');
  const pipelineCounterText = document.getElementById('pipelineCounterText');
  const filterBtns = document.querySelectorAll('.btnPipelineFilter');

  let pipelineData = [];
  let currentFilter = 'all';

  function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      // Regex to handle quoted CSV fields
      const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      // Clean quotes
      const cleanRow = row.map(cell => cell.replace(/^"|"$/g, '').trim());
      if (cleanRow.length >= 5) {
        result.push({
          id: cleanRow[0] || i,
          denominacion: cleanRow[1] || 'SOFOM ENR',
          sector: cleanRow[2] || 'SOFOM ENR',
          estado: cleanRow[3] || 'México',
          estatus_sipres: cleanRow[4] || 'Operando',
          cartera: cleanRow[5] || '$45,000,000 MXN',
          tier: cleanRow[6] || 'Tier Mid-Market ($42k/m)',
          competidor: cleanRow[7] || 'Excel + Sistema Legado',
          puntos_dolor: cleanRow[8] || 'Cobro de conectores',
          estatus_funnel: cleanRow[9] || 'Candidato Quick Win',
          contacto: cleanRow[10] || 'CEO / Dir. General',
          prioridad: cleanRow[11] || 'Alta'
        });
      }
    }
    return result;
  }

  function renderPipelineTable(data) {
    if (!pipelineTableBody) return;
    pipelineTableBody.innerHTML = '';

    const query = pipelineSearchInput ? pipelineSearchInput.value.toLowerCase().trim() : '';

    const filtered = data.filter(item => {
      // Filter button check
      if (currentFilter === 'CDMX' && !item.estado.toLowerCase().includes('cdmx') && !item.estado.toLowerCase().includes('ciudad de méxico')) return false;
      if (currentFilter === 'Monterrey' && !item.estado.toLowerCase().includes('monterrey') && !item.estado.toLowerCase().includes('nuevo león')) return false;
      if (currentFilter === 'Guadalajara' && !item.estado.toLowerCase().includes('guadalajara') && !item.estado.toLowerCase().includes('jalisco')) return false;
      if (currentFilter === 'DynamiCore' && !item.competidor.toLowerCase().includes('dynamicore')) return false;

      // Text Search Query check
      if (query) {
        const matchName = item.denominacion.toLowerCase().includes(query);
        const matchState = item.estado.toLowerCase().includes(query);
        const matchComp = item.competidor.toLowerCase().includes(query);
        const matchTier = item.tier.toLowerCase().includes(query);
        return matchName || matchState || matchComp || matchTier;
      }
      return true;
    });

    if (pipelineCounterText) {
      pipelineCounterText.textContent = `${filtered.length} de ${data.length} SOFOMes Listas para Prospectar`;
    }

    if (filtered.length === 0) {
      pipelineTableBody.innerHTML = `
        <tr>
          <td colspan="8" style="padding:24px; text-align:center; color:#94A3B8; font-style:italic;">
            No se encontraron SOFOMes que coincidan con la búsqueda.
          </td>
        </tr>
      `;
      return;
    }

    // Limit render to first 100 rows for smooth DOM performance
    filtered.slice(0, 100).forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #F1F5F9';
      tr.style.transition = 'background 0.15s';
      tr.onmouseover = () => tr.style.background = '#F8FAFC';
      tr.onmouseout = () => tr.style.background = 'transparent';

      const isDynamicore = item.competidor.toLowerCase().includes('dynamicore');
      const compBadgeStyle = isDynamicore 
        ? 'background:#FEF2F2; color:#DC2626; border:1px solid #FECACA;' 
        : 'background:#F1F5F9; color:#475569; border:1px solid #E2E8F0;';

      tr.innerHTML = `
        <td style="padding:10px 14px; font-family:'JetBrains Mono',monospace; color:#94A3B8;">${index + 1}</td>
        <td style="padding:10px 14px; font-weight:700; color:#0F172A;">${item.denominacion}</td>
        <td style="padding:10px 14px; color:#475569;">${item.estado}</td>
        <td style="padding:10px 14px; font-family:'JetBrains Mono',monospace; font-weight:600; color:#059669;">${item.cartera}</td>
        <td style="padding:10px 14px;">
          <span style="font-family:'JetBrains Mono',monospace; font-size:0.72rem; padding:2px 8px; border-radius:4px; font-weight:700; ${compBadgeStyle}">
            ${item.competidor}
          </span>
        </td>
        <td style="padding:10px 14px; font-family:'JetBrains Mono',monospace; font-size:0.75rem; color:#2563EB; font-weight:700;">${item.tier}</td>
        <td style="padding:10px 14px; font-size:0.75rem; color:#64748B;">${item.estatus_funnel}</td>
        <td style="padding:10px 14px;">
          <button type="button" style="background:#0F172A; color:#FFFFFF; border:none; font-size:0.7rem; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:700;" onclick="alert('Iniciando cadencia Outbound para: ${item.denominacion.replace(/'/g, "")}')">
            ⚡ DISPARAR
          </button>
        </td>
      `;
      pipelineTableBody.appendChild(tr);
    });
  }

  // Fetch CSV file
  fetch('data/pipeline_real_sofomes_mx.csv')
    .then(response => response.text())
    .then(csvText => {
      pipelineData = parseCSV(csvText);
      renderPipelineTable(pipelineData);
    })
    .catch(err => {
      console.warn('Error loading CSV, using initial fallback dataset:', err);
    });

  if (pipelineSearchInput) {
    pipelineSearchInput.addEventListener('input', () => renderPipelineTable(pipelineData));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
        b.style.color = '#475569';
        b.style.borderColor = '#CBD5E1';
      });
      btn.classList.add('active');
      btn.style.background = btn.dataset.filter === 'DynamiCore' ? '#EF4444' : '#2563EB';
      btn.style.color = '#FFFFFF';
      btn.style.borderColor = btn.dataset.filter === 'DynamiCore' ? '#EF4444' : '#2563EB';

      currentFilter = btn.dataset.filter;
      renderPipelineTable(pipelineData);
    });
  });
});

