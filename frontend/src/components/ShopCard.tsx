import { View, Text, StyleSheet, Pressable } from "react-native";

interface Props {
  name: string;
  distance: string;
  rating: number;
  onPress: () => void;
}

export default function ShopCard({
  name,
  distance,
  rating,
  onPress
}: Props) {

  return (
    <Pressable style={styles.card} onPress={onPress}>

      <Text style={styles.name}>{name}</Text>

      <View style={styles.row}>
        <Text style={styles.rating}> {rating}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  rating: {
    fontSize: 14
  },

  distance: {
    fontSize: 14,
    color: "gray"
  }

});