'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppNav } from '@/components/app-nav';
import { apiFetch, getErrorMessage } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try {
      const response = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      if (!response.ok) { setError(await getErrorMessage(response, 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')); return; }
      router.push('/profile');
    } catch { setError('ไม่สามารถเชื่อมต่อกับ API ได้'); } finally { setLoading(false); }
  }
  return <main className="app-shell"><AppNav /><section className="auth-wrap"><div className="auth-card"><p className="eyebrow">Welcome back</p><h1>เข้าสู่ระบบ</h1><p className="auth-subtitle">เข้าสู่ระบบเพื่อดูโปรไฟล์และรายชื่อผู้ใช้</p><form className="auth-form" onSubmit={handleLogin}><div className="field"><label htmlFor="email">อีเมล</label><input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="field"><label htmlFor="password">รหัสผ่าน</label><input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</button></form><p className="form-footnote">ยังไม่มีบัญชี? <Link href="/register">สมัครสมาชิก</Link></p></div></section></main>;
}
