import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const AmberCalculator = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>
      {/* Header */}
      <View style={styles.share}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Amber & Purple Calculate</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>CALCULATOR</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Inlet Hardness</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Hardness"
              value=""
              editable={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Maximum Flow</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Maximum Flow"
              value=""
              editable={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Vessel Size</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Vessel Size"
              value=""
              editable={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Regeneration Level</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Regeneration Level"
              value=""
              editable={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>No. of Regenerations/Brine Tank</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Regenerations"
              value=""
              editable={true}
            />
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          <View style={styles.resultsContainer}>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>OBR Volume:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Injector:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>BLFC:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>DLFC:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Set Time for Backwash:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
            <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Set Time for Brine Draw:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
             <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Set Time for Raise:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
             <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Set Time for Refill</Text>
              <Text style={styles.resultValue}></Text>
            </View>
             <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Salt Required/Regeneration:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
             <View style={styles.resultItem}>
              <Text style={styles.resultLabel}>Salt in Brine Tank:</Text>
              <Text style={styles.resultValue}></Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText1}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AmberCalculator;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#32516e",
  },
  headerText: {
    fontWeight: "500",
    fontSize: 23,
    marginLeft: 6,
    color: "#fff",
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
    backgroundColor: "#32516e",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
});
