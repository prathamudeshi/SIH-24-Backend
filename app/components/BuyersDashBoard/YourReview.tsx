import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings"; // Use AirbnbRating for ratings
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "YOUR_BASE_URL_HERE"; // Replace with your actual base URL

const YourReview: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // State to hold review data

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Get token from AsyncStorage
        const response = await fetch(`${BASE_URL}/api/review/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token || "",
          },
        });
        const json = await response.json();
        setData(json.review);
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <Text style={styles.subtitle}>
          There are <Text style={styles.highlight}>{data.length}</Text> Reviews
        </Text>
      </View>

      {data.length !== 0 &&
        [...data].reverse().map((item, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.productInfo}>
              <Image
                source={{ uri: item.image + "?im=Resize=(100,100)" }}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productPrice}>RS. {item.price}</Text>
                <Text style={styles.productWeight}>
                  Weight:{" "}
                  {item.quantity < 1
                    ? item.quantity * 1000 + "GM"
                    : item.quantity + "KG"}
                </Text>
              </View>
            </View>
            <Text style={styles.date}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <View style={styles.ratingContainer}>
              <AirbnbRating
                isDisabled
                showRating={false}
                defaultRating={item.rating}
                size={20}
                starContainerStyle={styles.rating}
              />
              <Text style={styles.ratingText}>({item.rating})</Text>
            </View>
            <Text style={styles.reviewText}>"{item.review}"</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  highlight: {
    color: "#3bb77e",
    fontWeight: "bold",
  },
  reviewCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  productWeight: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rating: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});

export default YourReview;
