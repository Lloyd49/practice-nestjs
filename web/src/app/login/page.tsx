'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try { const response = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }); if (!response.ok) { setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง'); return; } router.push('/users'); } catch { setError('ไม่สามารถเชื่อมต่อกับ API ได้'); } finally { setLoading(false); }
  }
  return <main className="app-shell"><nav className="topbar"><Link className="brand" href="/"><span className="brand-mark">N</span>Nest Portal</Link><Link className="nav-link" href="/">กลับหน้าหลัก</Link></nav><section className="auth-wrap"><div className="auth-card"><p className="eyebrow">Welcome back</p><h1>เข้าสู่ระบบ</h1><p className="auth-subtitle">ใช้บัญชีที่สร้างไว้จาก Nest API เพื่อดูรายชื่อผู้ใช้</p><form className="auth-form" onSubmit={handleLogin}><div className="field"><label htmlFor="email">อีเมล</label><input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="field"><label htmlFor="password">รหัสผ่าน</label><input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button></form></div></section></main>;
}
