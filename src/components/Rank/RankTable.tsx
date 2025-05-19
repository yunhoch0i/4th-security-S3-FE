import React from 'react';

const RankTable = ({ ranks }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>순위</th>
                    <th>사용자</th>
                    <th>점수</th>
                </tr>
            </thead>
            <tbody>
                {ranks.map((rank, index) => (
                    <tr key={rank.userId}>
                        <td>{index + 1}</td>
                        <td>{rank.username}</td>
                        <td>{rank.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RankTable;