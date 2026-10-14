'use client';

import Link from 'next/link';
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppNav } from '@/components/app-nav';
import { apiFetch, getErrorMessage } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try {
      const response = await apiFetch('/users', { method: 'POST', body: JSON.stringify(form) });
      if (!response.ok) { setError(await getErrorMessage(response, 'ไม่สามารถสร้างบัญชีได้')); return; }
      router.push('/login');
    } catch { setError('ไม่สามารถเชื่อมต่อกับ API ได้'); } finally { setLoading(false); }
  }
  return <main className="app-shell"><AppNav /><section className="auth-wrap"><div className="auth-card"><p className="eyebrow">Create account</p><h1>สมัครสมาชิก</h1><p className="auth-subtitle">สร้างบัญชีเพื่อเริ่มใช้งาน Nest Portal</p><form className="auth-form" onSubmit={submit}><div className="field"><label htmlFor="name">ชื่อ</label><input id="name" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></div><div className="field"><label htmlFor="email">อีเมล</label><input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></div><div className="field"><label htmlFor="password">รหัสผ่าน</label><input id="password" type="password" minLength={8} autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /><small>อย่างน้อย 8 ตัวอักษร</small></div>{error && <p className="form-error">{error}</p>}<button className="button button-primary" type="submit" disabled={loading}>{loading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}</button></form><p className="form-footnote">มีบัญชีอยู่แล้ว? <Link href="/login">เข้าสู่ระบบ</Link></p></div></section></main>;
}
