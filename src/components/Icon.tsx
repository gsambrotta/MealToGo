import Ionicons from "@expo/vector-icons/Ionicons";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string;
}

export const IconComp = ({ name, size, color }: IconProps) => (
  <Ionicons name={name} size={size} color={color} />
);
