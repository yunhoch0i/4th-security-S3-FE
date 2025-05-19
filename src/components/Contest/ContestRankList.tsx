import React from 'react';

type Rank = {
    userId: string | number;
    username: string;
    score: number;
};

interface ContestRankListProps {
    ranks: Rank[];
}

const ContestRankList: React.FC<ContestRankListProps> = ({ ranks }) => {
    return (
        <div>
            <h2>대회 랭킹 리스트</h2>
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
        </div>
    );
};

export default ContestRankList;