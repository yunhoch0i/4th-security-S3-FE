// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { authService } from '../../features/auth/authService';
// import Input from '../../components/Common/Input';
// import  Button  from '../../components/Common/Button';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

//     const handleLogin = async (e: LoginFormEvent): Promise<void> => {
//         e.preventDefault();
//         try {
//             await authService.login(email, password);
//             router.push('/'); 
//         } catch (err) {
//             setError('로그인에 실패했습니다. 다시 시도해 주세요.');
//         }
//     };

//     return (
//         <div>
//             <h1>로그인</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleLogin}>
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
//                 <Button type="submit">로그인</Button>
//             </form>
//         </div>
//     );
// };

// export default LoginPage;

export default function LoginPage() {
    return <div>✅ /login</div>;
  }
  