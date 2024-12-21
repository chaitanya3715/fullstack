import React from 'react';

interface DetailItem {
  label: string;
  value: string;
}

interface DetailSectionProps {
  items: DetailItem[];
}

export function DetailSection({ items }: DetailSectionProps) {
  return (
    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      {items.map((item, index) => (
        <div key={index} className="col-span-2 grid grid-cols-subgrid border-t border-t-[#D4DBE8] py-5">
          <p className="text-[#3F5374] text-sm font-normal leading-normal">{item.label}</p>
          <p className="text-[#141C24] text-sm font-normal leading-normal">{item.value}</p>
        </div>
      ))}
    </div>
  );
}