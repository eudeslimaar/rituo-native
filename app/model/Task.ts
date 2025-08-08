export type RepeatType = 'Once' | 'EveryDay' | 'Weekdays' | 'Weekends' | 'Custom';

export interface TaskValidity {
  type: 'forever' | 'until';
  date?: string; // formato: yyyy-MM-dd
}

export interface Task {
  id: string;
  name: string;
  startDate: string; // obrigatório agora
  startTime: string;
  endTime: string;
  repeat: RepeatType;
  customDays?: string[];
  validity: TaskValidity;
  color: string;
  icon?: string;
  tag?: string;
  reminder?: string;
  createdAt: string;
  updatedAt: string;
}

