"use client";

import React from "react";
import { 
  Megaphone, Smartphone, PenTool, LayoutGrid, 
  ShoppingCart, Palette, Monitor, Globe, HelpCircle 
} from "lucide-react";

interface ServiceIconProps {
  iconName: string;
  className?: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ iconName, className }) => {
  // Map string names to actual Components
  const icons: Record<string, React.ReactNode> = {
    Megaphone: <Megaphone className={className} />,
    Smartphone: <Smartphone className={className} />,
    PenTool: <PenTool className={className} />,
    LayoutGrid: <LayoutGrid className={className} />,
    ShoppingCart: <ShoppingCart className={className} />,
    Palette: <Palette className={className} />,
    Monitor: <Monitor className={className} />,
    Globe: <Globe className={className} />,
  };

  // Return the matching icon, or a default one if not found
  return <>{icons[iconName] || <HelpCircle className={className} />}</>;
};

export default ServiceIcon;