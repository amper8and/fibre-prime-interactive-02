'use client';
import { useAppStore } from '@/store/useAppStore';
import { CheckCircle } from 'lucide-react';

export default function NotificationToast() {
  const { notification } = useAppStore();
  if (!notification) return null;

  return (
    <div className="fp-toast">
      <CheckCircle size={16} className="text-[#FFCB00] shrink-0" />
      <span>{notification.message}</span>
    </div>
  );
}
