export const regenerationVsExchangeCapacity = [
  { regenLevel: 50, exchangeCapacity: 0.7 },
  { regenLevel: 100, exchangeCapacity: 1.2 },
  { regenLevel: 150, exchangeCapacity: 1.4 },
  { regenLevel: 200, exchangeCapacity: 1.5 },
  { regenLevel: 250, exchangeCapacity: 1.6 },
];

export const flowVelocityCorrection = [
  { velocity: 20, correctionFactor: 1 },
  { velocity: 30, correctionFactor: 0.975 },
  { velocity: 40, correctionFactor: 0.95 },
  { velocity: 50, correctionFactor: 0.9 },
  { velocity: 60, correctionFactor: 0.85 },
  { velocity: 70, correctionFactor: 0.82 },
  { velocity: 80, correctionFactor: 0.775 },
];

export const vesselSizeVolume = [
  { vessel: "10 x 54", totalVolume: 62, resinFilled: 45 },
  { vessel: "13 x 54", totalVolume: 102, resinFilled: 75 },
  { vessel: "14 x 65", totalVolume: 150, resinFilled: 112.5 },
  { vessel: "16 x 65", totalVolume: 184, resinFilled: 138 },
];

export const pipeDiameterFlow = [
  { diameterInch: 0, maxFlowM3Hr: 0, maxFlowLPH: 0 },
  { diameterInch: 0.5, maxFlowM3Hr: 1.14, maxFlowLPH: 1139.51 },
  { diameterInch: 0.75, maxFlowM3Hr: 2.56, maxFlowLPH: 2563.91 },
  { diameterInch: 1, maxFlowM3Hr: 4.56, maxFlowLPH: 4558.06 },
  { diameterInch: 1.5, maxFlowM3Hr: 10.26, maxFlowLPH: 10255.62 },
  { diameterInch: 2, maxFlowM3Hr: 18.23, maxFlowLPH: 18232.22 },
  { diameterInch: 2.5, maxFlowM3Hr: 28.49, maxFlowLPH: 28487.85 },
  { diameterInch: 3, maxFlowM3Hr: 41.02, maxFlowLPH: 41022.5 },
  { diameterInch: 4, maxFlowM3Hr: 72.93, maxFlowLPH: 72928.89 },
  { diameterInch: 5, maxFlowM3Hr: 113.95, maxFlowLPH: 113951.39 },
];

export const vesselInjectorFlow = [
  { vessel: "10 x 54", injector: "Purple", BLFC: 0.3, DLFC: 3.5 },
  { vessel: "13 x 54", injector: "Yellow", BLFC: 0.7, DLFC: 4.0 },
];

export const vesselBackwashRinse = [
  {
    vessel: "10 x 54",
    backwash: 10,
    brineInjection: 60,
    rinse: 10,
    refill: 4.5,
  },
  {
    vessel: "13 x 54",
    backwash: 10,
    brineInjection: 40,
    rinse: 10,
    refill: 4.5,
  },
];

export const BLFCIdentifier = [
  { flowGPM: 0.2, colour: "#1 Grey" },
  { flowGPM: 0.3, colour: "#2 White" },
  { flowGPM: 0.7, colour: "#3 Black" },
];

export const DLFCIdentifier = [
  { flowGPM: 1.5, colour: "#1 Grey" },
  { flowGPM: 2.0, colour: "#2 Grey" },
  { flowGPM: 2.4, colour: "#3 Grey" },
  { flowGPM: 3.0, colour: "#4 White" },
  { flowGPM: 3.5, colour: "#5 White" },
  { flowGPM: 4.0, colour: "#6 White" },
  { flowGPM: 5.0, colour: "#7 White" },
];

export const backwashActivatedCarbon = [
  { TSS: 0.5, backwashDays: 20 },
  { TSS: 1, backwashDays: 14 },
  { TSS: 5, backwashDays: 7 },
  { TSS: 10, backwashDays: 5 },
  { TSS: 20, backwashDays: 2 },
];

export const polyfiltServiceVelocity = [
  { TSS: 0.9, velocity: 22, other: 20 },
  { TSS: 5.1, velocity: 20, other: 18 },
  { TSS: 10.1, velocity: 17, other: 15 },
  { TSS: 25.1, velocity: 14, other: 12 },
  { TSS: 50.1, velocity: 12, other: 10 },
  { TSS: 100, velocity: 10, other: 8 },
];
