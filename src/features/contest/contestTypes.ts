export interface Contest {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    participants: number;
}

export interface CreateContestInput {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

export interface ContestRank {
    userId: string;
    contestId: string;
    rank: number;
    score: number;
}


export type ContestType = {
    id: string;
    name: string;
};

export interface ContestData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }
  
  export interface ContestFormProps {
    onSubmit: (data: CreateContestInput) => Promise<void>;
    loading: boolean;
  }
  
  