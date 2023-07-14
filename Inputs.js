import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const amenities = [
  {
    label: "Wifi",
    icon: <AntDesign name="wifi" size={21} color="gray" />,
    description: "Free Wifi!",
  },
  {
    label: "Cleaning product",
    icon: <MaterialIcons name="soap" size={21} color="gray" />,
    description: "Free Wifi!",
  },
  {
    label: "Bathing products",
    icon: <MaterialIcons name="soap" size={21} color="gray" />,
    description: "Free Wifi!",
  },
  {
    label: "Tv",
    icon: <FontAwesome name="tv" size={21} color="gray" />,
    description: "Flat screen!",
  },
  {
    label: "Kitchen essentials",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={21}
        color="gray"
      />
    ),
  },

  {
    label: "Washer",
    icon: (
      <MaterialCommunityIcons name="washing-machine" size={21} color="gray" />
    ),
  },

  {
    label: "Air condition",
    icon: <FontAwesome name="snowflake-o" size={21} color="gray" />,
  },

  {
    label: "Iron",
    icon: <MaterialCommunityIcons name="iron-outline" size={21} color="gray" />,
  },
  {
    label: "Hair dryer",
    icon: (
      <MaterialCommunityIcons
        name="hair-dryer-outline"
        size={21}
        color="gray"
      />
    ),
  },
];

export const perks = [
  {
    label: "Pool",
    icon: <MaterialIcons name="pool" size={24} color="gray" />,
  },
  {
    label: "Hot tub",
    icon: <MaterialCommunityIcons name="hot-tub" size={24} color="gray" />,
    description: "This property has an hot tub!",
  },
  {
    label: "Mountain View",
    icon: <Foundation name="mountains" size={24} color="gray" />,
    description: "This property has an hot tub!",
  },
  {
    label: "Patio",
    icon: <MaterialCommunityIcons name="balcony" size={24} color="gray" />,
    description: "This property is has a balcony/courtyard!",
  },
  {
    label: "BBQ grill",
    icon: (
      <MaterialCommunityIcons name="grill-outline" size={24} color="gray" />
    ),
  },
  {
    label: "Outdoor fire-place",
    icon: <MaterialCommunityIcons name="campfire" size={24} color="gray" />,
  },
  {
    label: "Work space",
    icon: <Octicons name="codespaces" size={21} color="gray" />,
  },
  {
    label: "Ps5",
    icon: <Ionicons name="game-controller-outline" size={24} color="gray" />,
    description: "indoor fire place!",
  },

  {
    label: "Gym equipment",
    icon: (
      <MaterialCommunityIcons name="weight-lifter" size={24} color="gray" />
    ),
  },
  {
    label: "Free parking",
    icon: <FontAwesome5 name="parking" size={21} color="gray" />,
  },
  {
    label: "Outdoor shower",
    icon: <FontAwesome name="shower" size={24} color="gray" />,
  },
  {
    label: "Ocean view",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Dryer",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Sound system",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Ethernet connection",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Cooking essentials",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={21}
        color="gray"
      />
    ),
  },
  {
    label: "Indoor fire-place",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Dish washer",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
  {
    label: "Coffee maker",
    icon: <MaterialCommunityIcons name="water-polo" size={24} color="gray" />,
  },
];

export const safetyGuides = [
  {
    label: "Fire extinguisher",
    icon: <FontAwesome name="fire-extinguisher" size={24} color="gray" />,
  },
  {
    label: "Carbon monoxide alaram",
    icon: (
      <MaterialCommunityIcons
        name="alarm-light-off-outline"
        size={24}
        color="gray"
      />
    ),
  },
  {
    label: "Security dogs",
    icon: <MaterialCommunityIcons name="dog" size={24} color="gray" />,
  },
  {
    label: "First aid kit",
    icon: <MaterialCommunityIcons name="dog" size={24} color="gray" />,
  },
  {
    label: "Smoke alarm",
    icon: (
      <MaterialCommunityIcons
        name="smoke-detector-variant-off"
        size={24}
        color="gray"
      />
    ),
  },
];
export const categories = [
  {
    label: "Tropical",
    icon: <Fontisto name="island" size={24} color="gray" />,
  },
  {
    label: "Luxury",
    icon: <FontAwesome name="diamond" size={19} color="gray" />,
  },
  {
    label: "Camp Homes",
    icon: <MaterialCommunityIcons name="campfire" size={22} color="gray" />,
  },
  {
    label: "Modern",
    icon: (
      <MaterialCommunityIcons name="home-analytics" size={22} color="gray" />
    ),
  },
];
