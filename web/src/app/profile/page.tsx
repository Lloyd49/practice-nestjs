'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppNav } from '@/components/app-nav';
import { apiFetch, getErrorMessage } from '@/lib/api';

type Profile = { id: string; name: string; email: string };

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    void apiFetch('/me').then(async (response) => {
      if (!response.ok) { setError(response.status === 401 ? 'กรุณาเข้าสู่ระบบเพื่อดูโปรไฟล์' : await getErrorMessage(response, 'ไม่สามารถดึงข้อมูลโปรไฟล์ได้')); return; }
      setProfile((await response.json()) as Profile);
    }).catch(() => setError('ไม่สามารถเชื่อมต่อกับ API ได้'));
  }, []);
  return <main className="app-shell"><AppNav authenticated /><section className="page-content"><header className="page-heading"><div><p className="eyebrow">Your account</p><h1>โปรไฟล์ของฉัน</h1><p>ข้อมูลจาก GET /me ผ่าน JWT cookie ที่ปลอดภัย</p></div></header>{error ? <div className="state-block profile-card"><p className="form-error">{error}</p><Link className="button button-primary" href="/login">เข้าสู่ระบบ</Link></div> : !profile ? <div className="profile-card loading-state">กำลังโหลดโปรไฟล์...</div> : <article className="profile-card"><span className="profile-avatar" aria-hidden="true">{profile.name.charAt(0).toUpperCase()}</span><div><p className="profile-label">ชื่อ</p><h2>{profile.name}</h2><p className="profile-label">อีเมล</p><p>{profile.email}</p><p className="profile-label">รหัสผู้ใช้</p><code>{profile.id}</code></div><Link className="button button-secondary" href="/users">ดูผู้ใช้ทั้งหมด</Link></article>}</section></main>;
}
