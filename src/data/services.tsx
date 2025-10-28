import {
  IconDevicesCode,
  IconRocket,
  IconBrandGoogle,
  IconCode,
} from "@tabler/icons-react";

export const getServices = () => {
  return [
    {
      name: "Web Development",
      slugify: "development",
      icon: <IconCode className="w-full h-full" />,
      bg: "#007bff",
    },
    {
      name: "Digital Marketing",
      slugify: "marketing",
      icon: <IconBrandGoogle className="w-full h-full" />,
      bg: "#6c63ff",
    },
    {
      name: "Automation",
      slugify: "automation",
      icon: <IconRocket className="w-full h-full" />,
      bg: "#00d4aa",
    },
    {
      name: "Software Development",
      slugify: "development-software",
      icon: <IconDevicesCode className="w-full h-full" />,
      bg: "#ff6b00",
    },
  ];
};

