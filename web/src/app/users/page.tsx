'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

type User = { _id: string; name: string; email: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => { async function loadUsers() { try { const response = await apiFetch('/users'); if (response.status === 401) { setError('กรุณาเข้าสู่ระบบก่อนจึงจะดูข้อมูลหน้านี้ได้'); return; } if (!response.ok) { setError('ไม่สามารถดึงข้อมูลผู้ใช้ได้'); return; } setUsers((await response.json()) as User[]); } catch { setError('ไม่สามารถเชื่อมต่อกับ API ได้'); } finally { setLoading(false); } } void loadUsers(); }, []);
  return <main className="app-shell"><nav className="topbar"><Link className="brand" href="/"><span className="brand-mark">N</span>Nest Portal</Link><Link className="nav-link" href="/login">เข้าสู่ระบบ</Link></nav><section className="page-content"><header className="page-heading"><div><p className="eyebrow">Protected area</p><h1>ผู้ใช้ทั้งหมด</h1><p>ข้อมูลชุดนี้มาจาก MongoDB ผ่าน NestJS API</p></div><Link className="button button-secondary" href="/">กลับหน้าหลัก</Link></header><div className="users-panel"><div className="panel-title"><span>Directory</span><span className="count-badge">{users.length} users</span></div>{loading && <p className="loading-state">กำลังโหลดข้อมูล...</p>}{!loading && error && <p className="form-error">{error}</p>}{!loading && !error && users.length === 0 && <p className="empty-state">ยังไม่มีผู้ใช้ในระบบ</p>}{!loading && !error && users.length > 0 && <ul className="user-list">{users.map((user) => <li className="user-item" key={user._id}><span className="avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span><div><span className="user-name">{user.name}</span><span className="user-email">{user.email}</span></div></li>)}</ul>}</div></section></main>;
}
