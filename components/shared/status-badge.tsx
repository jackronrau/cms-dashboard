import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

const statusConfig = {
  published: {
    label: "Published",
    className: "bg-green-500/15 text-green-700 dark:text-green-400",
  },
  draft: {
    label: "Draft",
    className: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-500/15 text-gray-700 dark:text-gray-400",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    className: "bg-gray-500/15 text-gray-700",
  };

  return (
    <Badge
      variant="secondary"
      className={cn("font-medium capitalize", config.className)}
    >
      {config.label}
    </Badge>
  );
}