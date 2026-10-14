'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppNav } from '@/components/app-nav';
import { apiFetch } from '@/lib/api';

export default function HomePage() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    void apiFetch('/').then((response) => setApiOnline(response.ok)).catch(() => setApiOnline(false));
  }, []);

  return <main className="app-shell">
    <AppNav />
    <section className="hero">
      <div>
        <p className="eyebrow">NestJS · MongoDB · Next.js</p>
        <h1>จัดการผู้ใช้จากจุดเดียว</h1>
        <p className="hero-text">สมัครสมาชิก เข้าสู่ระบบ ดูโปรไฟล์ และเรียกดูรายชื่อผู้ใช้ ผ่าน NestJS API ที่เชื่อมด้วย HttpOnly cookie</p>
        <div className="hero-actions"><Link className="button button-primary" href="/register">เริ่มสมัครสมาชิก <span aria-hidden="true">→</span></Link><Link className="button button-secondary" href="/login">เข้าสู่ระบบ</Link></div>
        <p className={`api-status ${apiOnline === false ? 'is-offline' : ''}`}><span aria-hidden="true">●</span> {apiOnline === null ? 'กำลังตรวจสอบ API...' : apiOnline ? 'API พร้อมใช้งาน' : 'ไม่พบการเชื่อมต่อ API'}</p>
      </div>
      <aside className="feature-card" aria-label="เมนูระบบ">
        <div className="feature-row"><span className="feature-icon">1</span><div><strong>สร้างบัญชี</strong><span>POST /users</span></div><Link href="/register">เปิด</Link></div>
        <div className="feature-row"><span className="feature-icon">2</span><div><strong>ยืนยันตัวตน</strong><span>POST /auth/login และ /auth/logout</span></div><Link href="/login">เปิด</Link></div>
        <div className="feature-row"><span className="feature-icon">3</span><div><strong>ข้อมูลที่ป้องกัน</strong><span>GET /me และ GET /users</span></div><Link href="/profile">เปิด</Link></div>
      </aside>
    </section>
  </main>;
}
