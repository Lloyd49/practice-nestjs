'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

type AppNavProps = { authenticated?: boolean };

export function AppNav({ authenticated = false }: AppNavProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    setIsLoggingOut(true);
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
      setIsLoggingOut(false);
    }
  }

  return (
    <nav className="topbar">
      <Link className="brand" href="/"><span className="brand-mark">N</span>Nest Portal</Link>
      <div className="nav-actions">
        <Link className="nav-link" href="/users">ผู้ใช้</Link>
        {authenticated ? <><Link className="nav-link" href="/profile">โปรไฟล์</Link><button className="nav-link nav-button" type="button" onClick={logout} disabled={isLoggingOut}>{isLoggingOut ? 'กำลังออก...' : 'ออกจากระบบ'}</button></> : <><Link className="nav-link" href="/register">สมัครสมาชิก</Link><Link className="button button-primary button-small" href="/login">เข้าสู่ระบบ</Link></>}
      </div>
    </nav>
  );
}
