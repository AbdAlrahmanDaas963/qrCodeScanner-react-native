import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dialog } from "react-native-simple-dialogs";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setShowDialog(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // setResult(`Bar code with type ${type} and data ${data} has been scanned!`);
    setResult(`Result: ${data}`);
  };

  if (hasPermission === null) {
    return (
      <Text style={styles.permissionText}>Requesting camera permission...</Text>
    );
  }
  if (hasPermission === false) {
    return <Text style={styles.permissionText}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.overlay} /> */}

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />

      {/* {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )} */}

      <View style={styles.frame}></View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          disabled={!scanned}
          onPress={() => setScanned(false)}
          style={!scanned ? styles.disBtn : styles.btn}
        >
          <Text style={!scanned ? styles.disBtnTxt : styles.btnTxt}>
            Scan Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={scanned}
          onPress={() => setScanned(true)}
          style={scanned ? styles.disBtn : styles.btn}
        >
          <Text style={scanned ? styles.disBtnTxt : styles.btnTxt}>Stop</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={showDialog}
        title="Scan complate"
        onTouchOutside={() => setShowDialog(false)}
      >
        <View style={styles.dialog}>
          <Text>{result}</Text>
        </View>
      </Dialog>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  permissionText: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  frame: {
    position: "absolute",
    width: 250,
    height: 250,
    borderColor: "#C7FFED",
    borderWidth: 5,
    borderRadius: 50,
  },

  overlay: {
    flex: 1,
    backgroundColor: "white", // Adjust opacity as needed
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "#C7FFED",
    borderRadius: 7,
    width: 300,
    height: 50,
  },
  btn: {
    backgroundColor: "#008F8C",
    width: 140,
    height: 35,
    borderRadius: 7,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: "#C7FFED",
  },
  disBtn: {
    backgroundColor: "#C7FFED",
    width: 140,
    height: 35,
    borderRadius: 7,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  disBtnTxt: {
    color: "#008F8C",
  },
  dialog: {},
});
