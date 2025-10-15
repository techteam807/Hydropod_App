import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  getCorrectionFector,
  getExchangeCapacity,
  getMinimumPipeSize,
  getVesselBackwashRinse,
  getVesselDetails,
  getVesselInjectorFlow,
} from "../../utilis/services";
import { BLFCIdentifier, DLFCIdentifier } from "../../utilis/constant";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const AmberCalculator = () => {
  const navigation = useNavigation();
  const [hardness, setHardness] = useState(null);
  const [vesselSize, setVesselSize] = useState("");
  const [regenerationLevel, setRegenerationLevel] = useState("");
  const [noOfReg, setNoOfReg] = useState(null);
  const [totalHardnessRemoval, setTotalHardnessRemoval] = useState(null);
  const [waterFlow, setWaterFlow] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState({
    vessel: false,
    regeneration: false,
    noOfReg: false,
  });

  const dropdownHeight = {
    vessel: useRef(new Animated.Value(0)).current,
    regeneration: useRef(new Animated.Value(0)).current,
    noOfReg: useRef(new Animated.Value(0)).current,
  };

  const vesselOptions = ["10 x 54", "13 x 54"];
  const regenerationOptions = [100, 150];
  const noOfRegOptions = [1, 2, 3];

  const toggleDropdown = (type) => {
    const newState = {
      vessel: false,
      regeneration: false,
      noOfReg: false,
      [type]: !dropdownVisible[type],
    };
    setDropdownVisible(newState);
    Object.keys(dropdownHeight).forEach((key) => {
      Animated.timing(dropdownHeight[key], {
        toValue: newState[key] ? 100 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const selectOption = (type, option) => {
    if (type === "vessel") setVesselSize(option);
    else if (type === "regeneration") setRegenerationLevel(option);
    else setNoOfReg(option);
    const newState = { vessel: false, regeneration: false, noOfReg: false };
    setDropdownVisible({ vessel: false, regeneration: false, noOfReg: false });
    Object.keys(dropdownHeight).forEach((key) => {
      Animated.timing(dropdownHeight[key], {
        toValue: newState[key] ? 100 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const closeDropdowns = () => {
    setDropdownVisible({ vessel: false, regeneration: false, noOfReg: false });
    Object.keys(dropdownHeight).forEach((key) => {
      Animated.timing(dropdownHeight[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleHardnessChange = (text) => {
    const value = parseInt(text);
    if ((!isNaN(value) && value < 0) || value > 1000) {
      setErrorMessage("Please Enter hardness less then 1000 ppm");
    } else {
      setErrorMessage("");
    }
    setHardness(text);
  };

  const handleWaterFlowChange = (text) => {
    const value = parseInt(text);
    if ((!isNaN(value) && value < 0) || value > 3001) {
      setErrorMessage1("Please Enter flow less then 3001 LPH");
    } else {
      setErrorMessage1("");
    }
    setWaterFlow(text);
  };

  const calculate = () => {
    if (
      !hardness ||
      !vesselSize ||
      !regenerationLevel ||
      !noOfReg ||
      !waterFlow
    ) {
      console.log("Please select all inputs.");
      setCalculationResult(null);
      return;
    }

    console.log("Hardness:", hardness);

    const vesselDetails = getVesselDetails(vesselSize);
    console.log("Vessel Details:", vesselDetails?.resinFilled);

    console.log("regeneration Level", regenerationLevel);

    console.log("No. of Regenerations/Brine Tank", noOfReg);

    const exchangeCapacity = getExchangeCapacity(regenerationLevel);
    console.log("Exchange Capacity:", exchangeCapacity);

    console.log("Water Flow:", waterFlow);

    if (vesselDetails && exchangeCapacity && hardness) {
      const totalHardnessCapacity =
        (exchangeCapacity * vesselDetails.resinFilled * 50000) / 1000;
      setTotalHardnessRemoval(totalHardnessCapacity);
      console.log("Total Hardness Removal Capacity:", totalHardnessCapacity);

      const VelocitySoftener = waterFlow / vesselDetails.resinFilled;
      const roundedVelocity = Math.round(VelocitySoftener / 10) * 10;
      console.log("VelocitySoftener (rounded to nearest 10):", roundedVelocity);

      const correctionFactor = getCorrectionFector(roundedVelocity);
      console.log("Correction Factor:", correctionFactor);

      const TotalHardnessRemovalCapacity =
        correctionFactor * totalHardnessCapacity;
      console.log(
        "Total Hardness Removal Capacity",
        TotalHardnessRemovalCapacity
      );

      const TotalOBR = (TotalHardnessRemovalCapacity * 1000) / hardness;
      console.log("Total OBR", TotalOBR);

      const MinimumPipeSize = getMinimumPipeSize(waterFlow);
      console.log("Minimum Pipe Size (inch):", MinimumPipeSize);

      const SaltRequiredRegeneration =
        (regenerationLevel * vesselDetails.resinFilled) / 1000;
      console.log("SaltRequiredRegeneration", SaltRequiredRegeneration);

      const SaltBrineTank = noOfReg * SaltRequiredRegeneration;
      console.log("Salt to be put in Brine Tank", SaltBrineTank);

      const TankDia = Number(vesselSize.slice(0, 2));
      console.log("TankDia:", TankDia);

      const TankSurfaceArea = TankDia ** 2 * 0.0005067;
      console.log("Tank Volume:", TankSurfaceArea.toFixed(2));

      const RecommendedFlowRate = 11000;
      console.log("Recommended Flow Rate", RecommendedFlowRate);

      const FlowRateRequiredLPH = RecommendedFlowRate * TankSurfaceArea;
      console.log("Flow Rate Required LPH", FlowRateRequiredLPH);

      const FlowRateRequiredGPM = FlowRateRequiredLPH / 227.1246;
      console.log("Flow Rate Required GPM", FlowRateRequiredGPM);

      const OBRVolume = Math.round((TotalOBR / 1000) * 10) / 10;
      console.log("OBR Volume:", OBRVolume);

      const vesselFlowData = getVesselInjectorFlow(vesselSize);
      const Injector = vesselFlowData ? vesselFlowData.injector : null;

      const BLFC = vesselFlowData ? vesselFlowData.BLFC : null;

      const BLFCColor =
        BLFCIdentifier.find((item) => item.flowGPM === BLFC)?.colour || null;

      const DLFC = vesselFlowData ? vesselFlowData.DLFC : null;

      const DLFCColor =
        DLFCIdentifier.find((item) => item.flowGPM === DLFC)?.colour || null;

      console.log("Injector:", Injector);
      console.log("BLFC:", BLFC);
      console.log("DLFC:", DLFC);
      console.log("BLFC Color:", BLFCColor);
      console.log("DLFC Color:", DLFCColor);

      const vesselBackwashData = getVesselBackwashRinse(vesselSize);
      const Backwash = vesselBackwashData ? vesselBackwashData.backwash : null;
      const BrineInjection = vesselBackwashData
        ? vesselBackwashData.brineInjection
        : null;
      const Rinse = vesselBackwashData ? vesselBackwashData.rinse : null;
      const Refill = vesselBackwashData ? vesselBackwashData.refill : null;
      console.log("Backwash:", Backwash);
      console.log("BrineInjection:", BrineInjection);
      console.log("Rinse:", Rinse);
      console.log("Refill:", Refill);

      const SaltRequiredRegenerationKgNaCL = Number(
        (SaltRequiredRegeneration * 1.05).toFixed(1)
      );
      console.log(
        "SaltRequiredRegeneration (with 5% margin, rounded):",
        SaltRequiredRegenerationKgNaCL
      );

      const SaltBrineTankKgNaCL = SaltRequiredRegenerationKgNaCL * noOfReg;
      console.log("SaltBrineTankKgNaCL", SaltBrineTankKgNaCL);

      setCalculationResult({
        OBRVolume,
        Injector,
        BLFC: BLFCColor ? `${BLFC} GPM (${BLFCColor})` : BLFC,
        DLFC: DLFCColor ? `${DLFC} GPM (${DLFCColor})` : DLFC,
        Backwash,
        BrineInjection,
        Rinse,
        Refill,
        SaltRequiredRegeneration: SaltRequiredRegenerationKgNaCL,
        SaltBrineTank: SaltBrineTankKgNaCL,
      });
    } else {
      setCalculationResult(null);
      console.log("Please select all inputs.");
    }
  };

  const handleCalculateClear = () => {
    setHardness(null);
    setWaterFlow(null);
    setVesselSize("");
    setRegenerationLevel("");
    setNoOfReg(null);
    setTotalHardnessRemoval(null);
    setCalculationResult(null);
  };

  const downloadPDF = async () => {
    if (!calculationResult) {
      alert("No calculation results to generate PDF");
      return;
    }

    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #2C3E50; }
          h2 { text-align: center; color: #32516e; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #BDC3C7; padding: 10px; text-align: left; }
          th { background-color: #32516e; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Amber & Purple Calculation Report</h2>
        <h3>Input Data</h3>
        <table>
          <tr><th>Parameter</th><th>Value</th></tr>
          <tr><td>Hardness (ppm)</td><td>${hardness}</td></tr>
          <tr><td>Water Flow (LPH)</td><td>${waterFlow}</td></tr>
          <tr><td>Vessel Size</td><td>${vesselSize}</td></tr>
          <tr><td>Regeneration Level</td><td>${regenerationLevel}</td></tr>
          <tr><td>No. of Regenerations</td><td>${noOfReg}</td></tr>
        </table>

        <h3>Calculation Results</h3>
        <table>
          <tr><th>Parameter</th><th>Value</th></tr>
          ${Object.keys(calculationResult)
            .map(
              (key) =>
                `<tr><td>${key}</td><td>${calculationResult[key]}</td></tr>`
            )
            .join("")}
        </table>
      </body>
    </html>
  `;

    try {
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      if (Platform.OS === "ios" || Platform.OS === "android") {
        await Sharing.shareAsync(uri);
      } else {
        alert(`PDF saved at: ${uri}`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>
      {/* Header */}
      <View style={styles.share}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={"black"} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Amber & Purple Calculate</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={closeDropdowns}>
          <View style={styles.card}>
            <Text style={styles.title}>CALCULATOR</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Inlet Hardness (ppm (mg/ L) as CaCO3)
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Hardness"
                value={hardness}
                onChangeText={handleHardnessChange}
                keyboardType="numeric"
              />
              {errorMessage ? (
                <Text
                  style={{
                    color: "red",
                    fontSize: 8,
                    bottom: -13,
                    right: 2,
                    position: "absolute",
                  }}
                >
                  {errorMessage}
                </Text>
              ) : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Maximum Flow (LPH)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Maximum Flow"
                value={waterFlow}
                onChangeText={handleWaterFlowChange}
                keyboardType="numeric"
              />
              {errorMessage1 ? (
                <Text
                  style={{
                    color: "red",
                    fontSize: 8,
                    bottom: -13,
                    right: 2,
                    position: "absolute",
                  }}
                >
                  {errorMessage1}
                </Text>
              ) : null}
            </View>

            {/* Vessel Size Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vessel Size (inches)</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => toggleDropdown("vessel")}
              >
                <Text style={{ color: vesselSize ? "#2C3E50" : "#9da1a4ff" }}>
                  {vesselSize || "Select Vessel Size"}
                </Text>
                <Ionicons
                  name={dropdownVisible.vessel ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#2C3E50"
                />
              </TouchableOpacity>
              {dropdownVisible.vessel && (
                <Animated.View
                  style={[
                    styles.dropdown,
                    { maxHeight: dropdownHeight.vessel },
                  ]}
                >
                  <ScrollView
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                  >
                    {vesselOptions.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => selectOption("vessel", item)}
                      >
                        <Text>{item}</Text>
                        {vesselSize === item && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#32516e"
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            {/* Regeneration Level Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Regeneration Level (g NaCl/ Ltr Resin)
              </Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => toggleDropdown("regeneration")}
              >
                <Text
                  style={{
                    color: regenerationLevel ? "#2C3E50" : "#9da1a4ff",
                  }}
                >
                  {regenerationLevel || "Select Regeneration Level"}
                </Text>
                <Ionicons
                  name={
                    dropdownVisible.regeneration ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color="#2C3E50"
                />
              </TouchableOpacity>
              {dropdownVisible.regeneration && (
                <Animated.View
                  style={[
                    styles.dropdown,
                    { height: dropdownHeight.regeneration },
                  ]}
                >
                  <ScrollView
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                  >
                    {regenerationOptions.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => selectOption("regeneration", item)}
                      >
                        <Text>{item}</Text>
                        {regenerationLevel === item && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#32516e"
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>No. of Regenerations/Brine Tank</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => toggleDropdown("noOfReg")}
              >
                <Text style={{ color: noOfReg ? "#2C3E50" : "#9da1a4ff" }}>
                  {noOfReg || "Select Number"}
                </Text>
                <Ionicons
                  name={dropdownVisible.noOfReg ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#2C3E50"
                />
              </TouchableOpacity>
              {dropdownVisible.noOfReg && (
                <Animated.View
                  style={[styles.dropdown, { height: dropdownHeight.noOfReg }]}
                >
                  <ScrollView
                    nestedScrollEnabled={true}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                  >
                    {noOfRegOptions.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => selectOption("noOfReg", item)}
                      >
                        <Text>{item}</Text>
                        {noOfReg === item && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#32516e"
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </View>

            {/* Buttons */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.button1}
                onPress={handleCalculateClear}
              >
                <MaterialIcons name="clear" size={20} color="white" />
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={calculate}>
                <Ionicons name="calculator-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Calculate</Text>
              </TouchableOpacity>
            </View>

            {/* Results */}
            <View style={styles.resultsContainer}>
              {[
                { label: "OBR Volume (T)", key: "OBRVolume" },
                { label: "Injector", key: "Injector" },
                { label: "BLFC", key: "BLFC" },
                { label: "DLFC", key: "DLFC" },
                { label: "Set Time for Backwash (min)", key: "Backwash" },
                {
                  label: "Set Time for Brine Draw (min)",
                  key: "BrineInjection",
                },
                { label: "Set Time for Raise (min)", key: "Rinse" },
                { label: "Set Time for Refill (min)", key: "Refill" },
                {
                  label: "Salt Required/Regeneration (kg NaCL)",
                  key: "SaltRequiredRegeneration",
                },
                { label: "Salt in Brine Tank (kg NaCL)", key: "SaltBrineTank" },
              ].map(({ label, key }) => (
                <View style={styles.resultItem} key={label}>
                  <Text style={styles.resultLabel}>{label}:</Text>
                  <Text style={styles.resultValue}>
                    {calculationResult ? calculationResult[key] : ""}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={downloadPDF}>
              <Text style={styles.buttonText1}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default AmberCalculator;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 9,
    paddingTop: 35,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  headerText: {
    fontWeight: "500",
    fontSize: 23,
    marginLeft: 6,
    color: "#000",
    fontFamily: "outfit-medium",
  },
  card: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: "#32516e",
    fontFamily: "outfit-bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
    position: "relative",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#34495E",
    fontFamily: "outfit",
  },
  input: {
    height: 40,
    borderColor: "#BDC3C7",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 14,
    color: "#2C3E50",
    fontFamily: "outfit",
  },
  button1: {
    flexDirection: "row",
    backgroundColor: "#32516e",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
    flex: 1,
  },
  button: {
    backgroundColor: "#32516e",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit",
  },
  buttonText1: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit",
  },
  resultsContainer: {
    width: "100%",
    marginTop: 30,
  },
  resultItem: {
    borderBottomColor: "#BDC3C7",
    borderBottomWidth: 1,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultLabel: {
    fontSize: 14,
    color: "#34495E",
  },
  resultValue: {
    fontSize: 14,
    color: "green",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    position: "absolute",
    top: 63,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#BDC3C7",
    overflow: "hidden",
    zIndex: 99,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
