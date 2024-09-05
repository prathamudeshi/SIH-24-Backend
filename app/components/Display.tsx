import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import Ionicons from "react-native-vector-icons/Ionicons"; // Correct import for Ionicons

const Display: React.FC = () => {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainTitle}>
        <Text style={styles.title}>DASHBOARD</Text>
      </View>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardText}>PRODUCTS</Text>
          <Ionicons name="archive-outline" style={styles.cardIcon} size={40} />
          <Text style={styles.cardNumber}>300</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>CATEGORIES</Text>
          <Ionicons name="grid-outline" style={styles.cardIcon} size={40} />
          <Text style={styles.cardNumber}>12</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>CUSTOMERS</Text>
          <Ionicons name="people-outline" style={styles.cardIcon} size={40} />
          <Text style={styles.cardNumber}>33</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>ALERTS</Text>
          <Ionicons
            name="notifications-outline"
            style={styles.cardIcon}
            size={40}
          />
          <Text style={styles.cardNumber}>42</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <BarChart
          data={{
            labels: ["A", "B", "C", "D", "E", "F", "G"],
            datasets: [
              { data: data.map((item) => item.pv) },
              { data: data.map((item) => item.uv) },
            ],
          }}
          width={screenWidth - 30} // Width of the chart
          height={220}
          yAxisLabel="" // Optional, can set it to a currency or unit symbol if needed
          yAxisSuffix="" // Added yAxisSuffix to fix the error
          chartConfig={{
            backgroundColor: "#1c1c1e",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />

        <LineChart
          data={{
            labels: ["A", "B", "C", "D", "E", "F", "G"],
            datasets: [
              { data: data.map((item) => item.pv), strokeWidth: 2 },
              { data: data.map((item) => item.uv), strokeWidth: 2 },
            ],
          }}
          width={screenWidth - 30} // Width of the chart
          height={220}
          chartConfig={{
            backgroundColor: "#1c1c1e",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  mainTitle: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "45%",
    padding: 15,
    backgroundColor: "#f8f9fa",
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardIcon: {
    marginVertical: 10,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  chartContainer: {
    marginTop: 20,
  },
});

export default Display;
