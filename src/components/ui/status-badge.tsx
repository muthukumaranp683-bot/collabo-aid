import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'present' | 'absent' | 'approved' | 'pending' | 'rejected' | 'paid' | 'unpaid';
  className?: string;
}

const statusConfig = {
  present: { label: 'Present', className: 'bg-success text-success-foreground' },
  absent: { label: 'Absent', className: 'bg-destructive text-destructive-foreground' },
  approved: { label: 'Approved', className: 'bg-success text-success-foreground' },
  pending: { label: 'Pending', className: 'bg-warning text-warning-foreground' },
  rejected: { label: 'Rejected', className: 'bg-destructive text-destructive-foreground' },
  paid: { label: 'Paid', className: 'bg-success text-success-foreground' },
  unpaid: { label: 'Unpaid', className: 'bg-destructive text-destructive-foreground' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}