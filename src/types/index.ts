export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  posted_date: string;
  employment_type: string;
  salary_range?: string;
  created_at: string;
}

export type JobFormData = Omit<Job, 'id' | 'created_at'>;