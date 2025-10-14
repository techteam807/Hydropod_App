import {
  backwashActivatedCarbon,
  BLFCIdentifier,
  DLFCIdentifier,
  flowVelocityCorrection,
  pipeDiameterFlow,
  polyfiltServiceVelocity,
  regenerationVsExchangeCapacity,
  vesselBackwashRinse,
  vesselInjectorFlow,
  vesselSizeVolume,
} from "./constant";

export const getExchangeCapacity = (regenLevel) => {
  const found = regenerationVsExchangeCapacity?.find(
    (item) => item.regenLevel === regenLevel
  );
  return found ? found.exchangeCapacity : null;
};

export const getCorrectionFector = (velocity) => {
  const found = flowVelocityCorrection?.find(
    (item) => item.velocity === velocity
  );
  return found ? found.correctionFactor : null;
};

export const getVesselDetails = (vesselSize) => {
  const found = vesselSizeVolume?.find((item) => item.vessel === vesselSize);
  return found || null;
};

export const getPipeFlow = (diameterInch) => {
  const found = pipeDiameterFlow?.find(
    (item) => item.diameterInch === diameterInch
  );
  return found || null;
};

export const getMinimumPipeSize = (flowLPH) => {
  const sorted = pipeDiameterFlow?.sort((a, b) => a.maxFlowLPH - b.maxFlowLPH);
  let matchedIndex = -1;

  for (let i = 0; i < sorted.length; i++) {
    if (flowLPH >= sorted[i].maxFlowLPH) {
      matchedIndex = i; // last row <= flow
    } else {
      break;
    }
  }

  const nextIndex = matchedIndex + 1;
  return nextIndex < sorted.length
    ? sorted[nextIndex].diameterInch
    : sorted[sorted.length - 1].diameterInch;
};

export const getVesselInjectorFlow = (vesselSize) => {
  const found = vesselInjectorFlow?.find((item) => item.vessel === vesselSize);
  return found || null;
};

export const getVesselBackwashRinse = (vesselSize) => {
  const found = vesselBackwashRinse?.find((item) => item.vessel === vesselSize);
  return found || null;
};

export const getBLFCColour = (flowGPM) => {
  const found = BLFCIdentifier?.find((item) => item.flowGPM === flowGPM);
  return found ? found.colour : null;
};

export const getDLFCColour = (flowGPM) => {
  const found = DLFCIdentifier?.find((item) => item.flowGPM === flowGPM);
  return found ? found.colour : null;
};

export const getBackwashDaysByTSS = (TSS) => {
  const found = backwashActivatedCarbon?.find((item) => item.TSS === TSS);
  return found ? found.backwashDays : null;
};

export const getPolyfiltVelocityByTSS = (TSS) => {
  const found = polyfiltServiceVelocity?.find((item) => item.TSS === TSS);
  return found
    ? { velocityLow: found.velocityLow, velocityHigh: found.velocityHigh }
    : null;
};
