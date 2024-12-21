import React from 'react';
import { Job } from '../types';
import { SkillsList } from './SkillsList';
import { DetailSection } from './DetailSection';
import { X } from 'lucide-react';

interface JobDetailViewProps {
  job: Job;
  onClose: () => void;
}

export function JobDetailView({ job, onClose }: JobDetailViewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F8F9FB] w-full max-w-[960px] max-h-[90vh] overflow-y-auto rounded-lg relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-200 rounded-full"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-[#141C24] text-4xl font-black leading-tight tracking-[-0.033em]">
                  {job.title}
                </h1>
                <p className="text-[#3F5374] text-base font-normal leading-normal">
                  {job.company} · {job.location} · Posted {new Date(job.posted_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h2 className="text-[#141C24] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Overview
            </h2>
            <DetailSection 
              items={[
                { label: 'Location', value: job.location },
                { label: 'Compensation', value: job.salary_range || 'Not specified' },
                { label: 'Employment Type', value: job.employment_type },
                { label: 'Work Type', value: 'Remote, On Site, Hybrid' }
              ]}
            />

            <h2 className="text-[#141C24] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Skills
            </h2>
            <SkillsList skills={[
              'Software development',
              'Technical Support',
              'Computer science',
              'Object-Oriented Programming',
              'Software design',
              'Version control',
              'Programming languages'
            ]} />

            <h2 className="text-[#141C24] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Job Details
            </h2>
            <DetailSection 
              items={[
                { label: 'Title', value: job.title },
                { label: 'Location', value: job.location },
                { label: 'Description', value: job.description }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}