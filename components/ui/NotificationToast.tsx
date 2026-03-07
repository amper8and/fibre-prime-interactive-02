'use client';
import { useAppStore } from '@/store/useAppStore';
import { CheckCircle } from 'lucide-react';

export default function NotificationToast() {
  const { notification } = useAppStore();
  if (!notification) return null;
  return (
    <div className="notification-toast">
      <CheckCircle size={18} className="text-mtn-yellow" />
      {notification.message}
    </div>
  );
}
