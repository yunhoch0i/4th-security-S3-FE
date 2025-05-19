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

export default function SignupPage() {
  return <div>✅ /login/signup</div>;
}
