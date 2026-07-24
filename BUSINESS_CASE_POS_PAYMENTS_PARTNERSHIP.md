# 📄 Business Case & Modelo de Alianza Financiera: Adquirente / Agregador FinTech x Software POS de Restaurantes

**Autor / Vehículo de Originación:** Firma BD & Channel Management (Antonio Gutiérrez & Socios)  
**Fecha:** Julio 2026  
**Estatus:** Modelo Genérico Portátil (Agnóstico a Procesador / Adquirente)

---

## Executive Summary

El presente Business Case establece la arquitectura de **alianza comercial, unit economics y modelo de integración tecnológica** entre una entidad **Adquirente / Agregadora FinTech** y una plataforma de **Software POS de Restaurantes** (sistema de comandas y administración).

La oportunidad consiste en capturar la cartera transaccional de restaurantes (especialmente en zonas turísticas y de alto ticket medio) sustituyendo terminales bancarias y agregadores desconectados por una solución **nativamente integrada comanda-a-terminal vía API**.

---

## 1. ⚔️ Tesis de Mercado y Ventaja Competitiva

1. **Movimiento Defensivo y Tendencia M&A:**
   * Agregadores líderes (ej. Clip comprando Wansoft) y software dominantes de la industria (ej. SoftRestaurant con terminales propias) están cerrando la distribución mediante ecosistemas cerrados (POS + Pagos).
   * Para cualquier **Adquirente o Agregador FinTech**, aliarse de forma nativa con softwares de restaurantes independientes es la única vía para **proteger y hacer crecer la cartera gastronómica sin incurrir en CAC (Costo de Adquisición de Clientes)**.

2. **Diferencial del Modelo Adquirente:**
   * Las terminales tradicionales cobran comisiones agregadas de **~2.9% a 3.6% + cuotas fijas**.
   * Un Adquirente directo puede ofrecer una **tasa adquirente altamente competitiva de 2.26% - 2.74% en nacional y 3.20% en internacional**, dejando un **Net Margin (Margen Neto) de ~1.10% (110 bps)** libre de costos de intercambio de red.

---

## 2. 📊 Unit Economics & Matriz de Tasas Reales de Adquisición

### Benchmark de Industria & Sesgo Turístico:
* **Tasa Crédito Nacional (Restaurante):** 2.74%
* **Tasa Débito Nacional (Restaurante):** 2.26%
* **Tasa Tarjeta Internacional:** 3.20%
* **Mezcla Transaccional Estimada (50% Nac / 50% Intl en zona turística):** **2.85% Tasa Ponderada**.
* **Costo Directo de Red / Intercambio (Visa, Mastercard, Bancos):** ~1.75%
* **Net Margin Adquirente:** **1.10% a 1.45% (110 a 145 bps del TPV Total)**.

---

## 3. 🌊 Waterfall del Reparto del Net Margin (Pool del Canal 32.5%)

De los **110 bps de Net Margin** limpios capturados por el Adquirente:

```
                      ┌──────────────────────────────────────────┐
                      │    Net Margin Adquirente (~110 bps)      │
                      └────────────────────┬─────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
┌──────────────────────────┐   ┌──────────────────────────┐   ┌──────────────────────────┐
│ Adquirente (67.5% Net)   │   │  Software POS (25% Net)  │   │  Nuestros 3 Socios (7.5%)│
│  Retención Libre de CAC  │   │   Incentivo Distribución │   │  Originación BD & Channel│
│   (74.25 bps del TPV)    │   │    (27.5 bps del TPV)    │   │    (8.25 bps del TPV)    │
└──────────────────────────┘   └──────────────────────────┘   └──────────────────────────┘
```

---

## 4. 📈 Escenarios de Escala y Proyección de Revenue Recurrente (MRR)

Calculado bajo un **TPV promedio conservador por nodo de $600,000 MXN / mes** (Restaurante Turístico Mediano):

| Nodos Activos | TPV Cartera Mensual | Net Margin Adquirente (110 bps) | Software POS (25% Net) | **NUESTROS 3 SOCIOS (7.5% NET)** | Success Fee Único ($500/nodo) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **10 Nodos** | $6.0 MDP / mes | $66,000 MXN | $16,500 MXN / mes | **$4,950 MXN / mes** | $5,000 MXN |
| **25 Nodos** | $15.0 MDP / mes | $165,000 MXN | $41,250 MXN / mes | **$12,375 MXN / mes** | $12,500 MXN |
| **50 Nodos** | $30.0 MDP / mes | $330,000 MXN | $82,500 MXN / mes | **$24,750 MXN / mes** | $25,000 MXN |
| **100 Nodos** | $60.0 MDP / mes | $660,000 MXN | $165,000 MXN / mes | **$49,500 MXN / mes** | $50,000 MXN |
| **250 Nodos** | $150.0 MDP / mes | $1,650,000 MXN | $412,500 MXN / mes | **$123,750 MXN / mes** | $125,000 MXN |

---

## 5. 🔌 Arquitectura Técnica de Integración API (Super Sencilla)

El esquema tecnológico opera mediante una arquitectura cliente-servidor ultraligera donde el **Adquirente provee el Smart POS Device (Terminal Android)** y una **API REST de Cobro**:

```mermaid
sequenceDiagram
    autonumber
    participant M as Mesero / POS Software
    participant API as API REST Adquirente
    participant POS as Smart POS Device (Mesa)
    participant Switch as Switch Bancario / Card Brand

    M->>API: POST /v1/transactions/create (Monto: $1,500 MXN, Ref: Mesa 4)
    API->>POS: Push Notification / Remote Trigger (Despierta Pantalla)
    POS->>Switch: Cliente inserta/pasa Tarjeta + Captura Propina
    Switch-->>POS: Autorización Aprobada (Auth Code: 948201)
    POS-->>API: Status: APPROVED, Baucher Digital Generado
    API-->>M: Webhook / Callback 200 OK (Comanda marcada como PAGADA)
```

---

## 6. 🏆 Matriz Estratégica de Evaluación de los 4 Procesadores en Pipeline

Verificación directa con sitios oficiales de cada opción:

| Aliado Evaluado | Sitio Oficial | Oferta Principal de Mercado | Evaluación de API & Smart POS | Estrategia de Negociación |
| :--- | :--- | :--- | :--- | :--- |
| **Efevoo Pay** | [efevoopay.com](https://efevoopay.com/es/adquiriente/) | Adquirencia comercial directa, terminales Smart POS Android y soluciones omnicanal. | ⭐️⭐️⭐️⭐️⭐️ API REST nativa para terminales de cobro en mesa. | **Prioridad 1 para Adquirencia Directa B2B.** Exigir habilitación de DCC + 7.5% Net Margin. |
| **BZ PAY Solutions** | [bzpay.com.mx](https://bzpay.com.mx/) | Terminales de pago con tarjeta, tasas personalizadas y **depósito de fondos en 24 horas**. | ⭐️⭐️⭐️⭐️⭐️ Terminales físicas ágiles con integración rápida. | **Prioridad 1 para oferta de liquidación rápida 24h** a restaurantes y Success Fees directos. |
| **Prosepago** | [prosepago.com](https://www.prosepago.com/home) | Procesadora y agregadora de pagos omnicanal para comercios y distribuidores en México. | ⭐️⭐️⭐️⭐️⭐️ Flexibilidad en APIs e integraciones POS personalizadas. | **Prioridad 1 para rapidez contractual de convenio ISO y split de comisiones.** |
| **AxxiPay** | [axxipay.com](https://www.axxipay.com/) | Pasarela y soluciones de procesamiento con alta capacidad de reconciliación y ruteo. | ⭐️⭐️⭐️⭐️ Pasarela REST moderna y SDKs de cobro. | **Ideal para reconciliación en tiempo real en cadenas y franquicias.** |

---

## 7. 🛡️ Criterios Mínimos de Calificación para Firmar Convenio ISO

1. **Licencia / Capacidad de Adquirencia Directa:** Ofrecer tasas adquirentes competitivas (~2.45% nac / 3.20% intl).
2. **Capacidad de DCC (Dynamic Currency Conversion) / Multimoneda:** Para maximizar el margen neto en zonas turísticas.
3. **API REST / SDK de Cobro para POS:** Push to device y Webhook callback para cierre automático de mesa.
4. **Respeto a la Estructura de Canal ISO:** 7.5% del Net Margin para originadores + Success Fee de activación.

---

### 🌐 Herramienta Interactiva
El simulador interactivo completo y la calculadora de ROI están disponibles en:  
🔗 [revshare_dashboard.html](file:///C:/Users/Antonio/.gemini/antigravity-ide/scratch/intelligential/revshare_dashboard.html)
