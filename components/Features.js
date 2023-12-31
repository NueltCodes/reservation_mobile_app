import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Features = ({ gridData }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      {gridData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 20 }}>
          {rowData.map((amenity, colIndex) => (
            <View
              key={colIndex}
              style={{
                flex: 1,
                marginTop: 35,
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              {amenity.icon}
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginLeft: 5,
                    color: "gray",
                  }}
                >
                  {amenity.label}
                </Text>
                {amenity.description && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "gray",
                    }}
                  >
                    {amenity.description}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({});
