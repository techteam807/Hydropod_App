import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  getCorrectionFector,
  getExchangeCapacity,
  getMinimumPipeSize,
  getVelocityByTSS,
  getVesselBackwashRinse,
  getVesselDetails,
  getVesselInjectorFlow,
} from "../../utilis/services";
import { BLFCIdentifier, DLFCIdentifier } from "../../utilis/constant";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const FiltCalculator = () => {
  const navigation = useNavigation();
  const [tss, setTss] = useState(null);
  const [vesselSize, setVesselSize] = useState("");
  // const [regenerationLevel, setRegenerationLevel] = useState("");
  // const [noOfReg, setNoOfReg] = useState(null);
  // const [totalHardnessRemoval, setTotalHardnessRemoval] = useState(null);
  const [waterFlow, setWaterFlow] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");

  const [dropdownVisible, setDropdownVisible] = useState({
    vessel: false,
  });

  const dropdownHeight = {
    vessel: useRef(new Animated.Value(0)).current,
  };

  const vesselOptions = ["10 x 54", "13 x 54"];

  const toggleDropdown = (type) => {
    const newState = {
      vessel: false,
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
    const newState = { vessel: false };
    setDropdownVisible({ vessel: false });
    Object.keys(dropdownHeight).forEach((key) => {
      Animated.timing(dropdownHeight[key], {
        toValue: newState[key] ? 100 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const closeDropdowns = () => {
    setDropdownVisible({ vessel: false });
    Object.keys(dropdownHeight).forEach((key) => {
      Animated.timing(dropdownHeight[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleTssChange = (text) => {
    const value = parseInt(text);
    if ((!isNaN(value) && value < 0) || value > 20.01) {
      setErrorMessage("Please Enter hardness less then 20.01 ppm");
    } else {
      setErrorMessage("");
    }
    setTss(text);
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
    if (!tss || !vesselSize || !waterFlow) {
      console.log("Please select all inputs.");
      setCalculationResult(null);
      return;
    }

    console.log("Tss:", tss);

    console.log("vessel Size", vesselSize);

    const vesselDetails = getVesselDetails(vesselSize);
    console.log("Vessel Details:", vesselDetails?.totalVolume);

    const TotalPolyfiltVolumeVessel =
      Math.round((vesselDetails.totalVolume * 0.6) / 10) * 10;
    console.log("Total Polyfilt Volume in Vessel", TotalPolyfiltVolumeVessel);

    const ServiceVelocity = getVelocityByTSS(tss);
    console.log("Service Velocity:", ServiceVelocity);

    const TankDia = Number(vesselSize.slice(0, 2));

    if (vesselDetails && waterFlow && tss) {
      console.log("TankDia:", TankDia);

      const TankSurfaceArea = TankDia ** 2 * 0.0005067;
      console.log("TankSurfaceArea:", TankSurfaceArea.toFixed(3));

      const MaximumFlow = Number(
        (TankSurfaceArea * ServiceVelocity * 1000).toFixed(2)
      );
      console.log("Maximum Flow:", MaximumFlow.toFixed(2));

      const TSSLoad = (MaximumFlow * tss * 24) / 1000000;
      console.log("TSS Load", TSSLoad.toFixed(2));

      const SolidLoadingRate = TSSLoad / TankSurfaceArea;
      console.log("Solid Loading Rate", SolidLoadingRate.toFixed(2));

      const SolidLoadingRateHour = SolidLoadingRate / 24;
      console.log("Solid Loading Rate/ Hour", SolidLoadingRateHour.toFixed(2));

      const DirtHoldingCapacity = 4;
      console.log("Dirt Holding Capacity", DirtHoldingCapacity);

      const BackwashReqHours = DirtHoldingCapacity / SolidLoadingRateHour;
      console.log("Backwash Req", BackwashReqHours.toFixed(2));

      const BackwashReqDays = Number((BackwashReqHours / 24).toFixed(2));
      console.log("BackwashReq Days", BackwashReqDays.toFixed(2));

      const BackwashVelocity = ServiceVelocity;
      console.log("BackwashVelocity", BackwashVelocity);

      const BackwashFlow = Number(
        (BackwashVelocity * TankSurfaceArea).toFixed(2)
      );
      console.log("Backwash Flow", BackwashFlow.toFixed(2));

      const BackwashDuration = 20;
      console.log("Backwash Duration", BackwashDuration);

      setCalculationResult({
        MaximumFlow,
        BackwashReqDays,
        BackwashDuration,
        BackwashFlow,
      });
    } else {
      setCalculationResult(null);
      console.log("Please select all inputs.");
    }
  };

  const handleCalculateClear = () => {
    setTss(null);
    setWaterFlow(null);
    setVesselSize("");
    // setTotalHardnessRemoval(null);
    setCalculationResult(null);
  };

  const downloadPDF = async () => {
    if (!calculationResult) {
      alert("Please calculate first to generate PDF.");
      return;
    }

    // Create Input Data table dynamically
    const inputData = [
      { label: "Inlet TSS (ppm)", value: tss || "-" },
      { label: "Maximum Flow (LPH)", value: waterFlow || "-" },
      { label: "Vessel Size", value: vesselSize || "-" },
    ];

    // Create Calculation Results table dynamically
    const resultData = Object.keys(calculationResult).map((key) => ({
      label: key,
      value: calculationResult[key],
    }));

    const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #2C3E50; }
          h2, h3 { color: #32516e; margin-bottom: 10px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #BDC3C7; padding: 10px; text-align: left; }
          th { background-color: #32516e; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Filt Calculator Report</h2>

        <h3>Input Data</h3>
        <table>
          <tr><th>Parameter</th><th>Value</th></tr>
          ${inputData
            .map(
              (item) => `<tr><td>${item.label}</td><td>${item.value}</td></tr>`
            )
            .join("")}
        </table>

        <h3>Calculation Results</h3>
        <table>
          <tr><th>Parameter</th><th>Value</th></tr>
          ${resultData
            .map(
              (item) => `<tr><td>${item.label}</td><td>${item.value}</td></tr>`
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
          <Text style={styles.headerText}>Filt Calculate</Text>
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
              <Text style={styles.label}>Inlet TSS (ppm (mg/ L))</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter TSS"
                value={tss}
                onChangeText={handleTssChange}
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
                { label: "Maximum Flow (LPH)", key: "MaximumFlow" },
                { label: "Backwash Frequency (Days)", key: "BackwashReqDays" },
                { label: "Backwash Time (min)", key: "BackwashDuration" },
                { label: "Backwash Flow (LPH)", key: "BackwashFlow" },
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

export default FiltCalculator;

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
