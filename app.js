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

  // --- NEW: RevOps Capacity & ARR/MRR KISS Calculator ---
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

    // Update Slider Labels:
    if (calcValClientes) calcValClientes.textContent = clientes.toLocaleString('es-MX');
    if (calcValMeses) calcValMeses.textContent = meses + ' Meses';
    if (calcValAEs) calcValAEs.textContent = aes + (aes === 1 ? ' AE' : ' AEs');
    if (calcValTicket) calcValTicket.textContent = '$' + ticket.toLocaleString('es-MX') + ' MXN';
    if (calcValSetup) calcValSetup.textContent = '$' + setup.toLocaleString('es-MX') + ' MXN';

    // Math Calculations:
    const ritmoEmpresa = (clientes / meses).toFixed(2);
    const cuotaAE = (clientes / meses / aes).toFixed(2);
    const mrrTotal = clientes * ticket;
    const arrTotal = mrrTotal * 12;
    const setupTotal = clientes * setup;

    // Helper format MDP or MXN:
    function formatMdp(val) {
      if (val >= 1000000) {
        return '$' + (val / 1000000).toFixed(2) + ' MDP';
      }
      return '$' + (val / 1000).toFixed(0) + 'k MXN';
    }

    // Update Output Cards:
    if (calcKpiRitmoEmpresa) calcKpiRitmoEmpresa.textContent = ritmoEmpresa;
    if (calcKpiCuotaAE) calcKpiCuotaAE.textContent = cuotaAE;
    if (calcKpiMrrTotal) calcKpiMrrTotal.textContent = formatMdp(mrrTotal);
    if (calcKpiArrTotal) calcKpiArrTotal.textContent = formatMdp(arrTotal);
    if (calcKpiSetupTotal) calcKpiSetupTotal.textContent = 'Setup Cash: ' + formatMdp(setupTotal);

    // Waterfall percentages:
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
});
