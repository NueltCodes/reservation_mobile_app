import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
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
    label: "Tv",
    icon: <FontAwesome name="tv" size={21} color="gray" />,
    description: "Flat screen!",
  },
  {
    label: "Kitchen essentails",
    icon: (
      <MaterialCommunityIcons
        name="silverware-fork-knife"
        size={21}
        color="gray"
      />
    ),
  },
  {
    label: "Work space",
    icon: <Octicons name="codespaces" size={21} color="gray" />,
  },
  {
    label: "Washing machine",
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
    label: "Mountain",
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
];

export const safetyGuide = [
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
