import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/login">로그인</Link>
                </li>
                <li>
                    <Link to="/signup">회원가입</Link>
                </li>
                <li>
                    <Link to="/tutorial">튜토리얼</Link>
                </li>
                <li>
                    <Link to="/stock">종목 리스트</Link>
                </li>
                <li>
                    <Link to="/trade">매수/매도</Link>
                </li>
                <li>
                    <Link to="/contest">대회</Link>
                </li>
                <li>
                    <Link to="/rank">랭킹</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;