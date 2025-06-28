// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { authService } from '../../features/auth/authService';
// import  Input  from '../../components/Common/Input';
// import  Button  from '../../components/Common/Button';

// const SignupPage = () => {
//     const router = useRouter();
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleSignup = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await authService.signup(username, email, password);
//             router.push('/login'); // Redirect to login after successful signup
//         } catch (err) {
//             setError('회원가입에 실패했습니다. 다시 시도해주세요.');
//         }
//     };

//     return (
//         <div>
//             <h1>회원가입</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSignup}>
//                 <Input
//                     type="text"
//                     placeholder="사용자 이름"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <Input
//                     type="email"
//                     placeholder="이메일"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <Input
//                     type="password"
//                     placeholder="비밀번호"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <Button type="submit">회원가입</Button>
//             </form>
//         </div>
//     );
// };

// export default SignupPage;

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import { signup } from '../../../features/auth/authService';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [phoneNumb, setPhoneNumb] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await signup({ username, phoneNumb, email, password });

            if (result.success) {
                alert('회원가입 성공! 로그인 페이지로 이동합니다.');
                router.push('/login'); // 성공 시 로그인 페이지로 이동
            } else {
                // API가 전달한 에러 메시지를 표시
                setError(result.message || '회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
            }
        } catch (err) {
            setError('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-xs">
                <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSignup} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <Input label="이름" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Input label="휴대폰 번호" type="tel" value={phoneNumb} onChange={(e) => setPhoneNumb(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <Input label="이메일" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                        <Input label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="w-full">
                            가입하기
                        </Button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    이미 계정이 있으신가요? <Link href="/login" className="text-blue-500 hover:text-blue-700">로그인</Link>
                </p>
            </div>
        </div>
    );
};