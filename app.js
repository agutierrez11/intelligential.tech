document.addEventListener('DOMContentLoaded', () => {
  // Existing DynamiCore comparison calculator:
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

  // --- REV OPS CAPACITY & ARR/MRR KISS CALCULATOR ---
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

  if (calcSliderClientes) {
    calcSliderClientes.addEventListener('input', updateRevOpsCalculator);
    calcSliderMeses.addEventListener('input', updateRevOpsCalculator);
    calcSliderAEs.addEventListener('input', updateRevOpsCalculator);
    calcSliderTicket.addEventListener('input', updateRevOpsCalculator);
    calcSliderSetup.addEventListener('input', updateRevOpsCalculator);
    updateRevOpsCalculator();
  }

  // --- TIER MIX (PRODUCT MIX) SIMULATOR ---
  const tierSliderT1 = document.getElementById('tierSliderT1');
  const tierSliderT2 = document.getElementById('tierSliderT2');
  const tierSliderT3 = document.getElementById('tierSliderT3');

  const tierValT1 = document.getElementById('tierValT1');
  const tierValT2 = document.getElementById('tierValT2');
  const tierValT3 = document.getElementById('tierValT3');

  const tierResultCiclo = document.getElementById('tierResultCiclo');
  const tierResultTicket = document.getElementById('tierResultTicket');
  const tierRecommendationText = document.getElementById('tierRecommendationText');

  function updateTierMixCalculator() {
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

    // Pricing Constants:
    // T1: Renta $20,000 | Ciclo: 20 días
    // T2: Renta $42,000 | Ciclo: 45 días
    // T3: Renta $83,000 | Ciclo: 90 días
    const cicloPonderado = Math.round((normT1 * 20) + (normT2 * 45) + (normT3 * 90));
    const ticketPonderado = Math.round((normT1 * 20000) + (normT2 * 42000) + (normT3 * 83000));

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
  }

  if (tierSliderT1) {
    tierSliderT1.addEventListener('input', updateTierMixCalculator);
    tierSliderT2.addEventListener('input', updateTierMixCalculator);
    tierSliderT3.addEventListener('input', updateTierMixCalculator);
    updateTierMixCalculator();
  }
});
