'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import { login } from '../../features/auth/authService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await login(email, password);
            if (result.success) {
                alert('로그인 성공!');
                router.push('/'); // 성공 시 메인 페이지로 이동
            } else {
                setError(result.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
            }
        } catch (err) {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
            console.error(err);
        }
    };

    return (
        <div className="login-container login-background">
            <div className="login-box">
                <h1 className="login-title">로그인</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <Input
                            label="이메일"
                            type="email"
                            placeholder="test@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label="비밀번호"
                            type="password"
                            placeholder="password123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="w-full">
                            로그인
                        </Button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    계정이 없으신가요? <Link href="/login/signup" className="text-blue-500 hover:text-blue-700">회원가입</Link>
                </p>
            </div>
        </div>
    );
};
// export default function LoginPage() {
//     return <div>✅ /login</div>;
//   }
  