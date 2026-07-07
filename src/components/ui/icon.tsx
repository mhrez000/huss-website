import {
  Camera,
  Plane,
  Sunset,
  Ruler,
  Video,
  Smartphone,
  Sofa,
  Eraser,
  Zap,
  CalendarCheck,
  BadgeCheck,
  Wand2,
  MousePointerClick,
  MessageCircle,
  Tags,
  CloudSun,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** Maps icon names stored in content files to lucide components. */
const iconMap: Record<string, LucideIcon> = {
  Camera,
  Plane,
  Sunset,
  Ruler,
  Video,
  Smartphone,
  Sofa,
  Eraser,
  Zap,
  CalendarCheck,
  BadgeCheck,
  Wand2,
  MousePointerClick,
  MessageCircle,
  Tags,
  CloudSun,
  Truck,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Camera;
  return <Cmp className={className} aria-hidden />;
}
