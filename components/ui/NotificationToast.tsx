'use client';

import { CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function NotificationToast() {
  const { notification } = useAppStore();

  if (!notification) {
    return null;
  }

  return (
    <div className="fp-toast">
      <CheckCircle2 size={16} className="shrink-0" />
      <span>{notification.message}</span>
    </div>
  );
}

