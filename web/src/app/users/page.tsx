'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppNav } from '@/components/app-nav';
import { apiFetch, getErrorMessage } from '@/lib/api';

type User = { _id?: string; id?: string; name: string; email: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  async function loadUsers() {
    setLoading(true); setError('');
    try {
      const response = await apiFetch('/users');
      if (!response.ok) { setError(response.status === 401 ? 'กรุณาเข้าสู่ระบบก่อนดูรายชื่อผู้ใช้' : await getErrorMessage(response, 'ไม่สามารถดึงข้อมูลผู้ใช้ได้')); return; }
      setUsers((await response.json()) as User[]);
    } catch { setError('ไม่สามารถเชื่อมต่อกับ API ได้'); } finally { setLoading(false); }
  }
  useEffect(() => {
    async function loadInitialUsers() {
      try {
        const response = await apiFetch('/users');
        if (!response.ok) {
          setError(response.status === 401 ? 'กรุณาเข้าสู่ระบบก่อนดูรายชื่อผู้ใช้' : await getErrorMessage(response, 'ไม่สามารถดึงข้อมูลผู้ใช้ได้'));
          return;
        }
        setUsers((await response.json()) as User[]);
      } catch {
        setError('ไม่สามารถเชื่อมต่อกับ API ได้');
      } finally {
        setLoading(false);
      }
    }
    void loadInitialUsers();
  }, []);
  return <main className="app-shell"><AppNav authenticated /><section className="page-content"><header className="page-heading"><div><p className="eyebrow">Protected area</p><h1>ผู้ใช้ทั้งหมด</h1><p>ข้อมูลนี้มาจาก GET /users และต้องยืนยันตัวตนก่อน</p></div><button className="button button-secondary" type="button" onClick={() => void loadUsers()} disabled={loading}>รีเฟรช</button></header><div className="users-panel"><div className="panel-title"><span>Directory</span><span className="count-badge">{users.length} users</span></div>{loading && <p className="loading-state">กำลังโหลดข้อมูล...</p>}{!loading && error && <div className="state-block"><p className="form-error">{error}</p><Link className="button button-primary" href="/login">เข้าสู่ระบบ</Link></div>}{!loading && !error && users.length === 0 && <p className="empty-state">ยังไม่มีผู้ใช้ในระบบ</p>}{!loading && !error && users.length > 0 && <ul className="user-list">{users.map((user) => <li className="user-item" key={user._id ?? user.id ?? user.email}><span className="avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span><div><span className="user-name">{user.name}</span><span className="user-email">{user.email}</span></div></li>)}</ul>}</div></section></main>;
}
