import React from 'react';
import { Certification } from './certificationsData';

export default function CertificationCard({ title, issuer, date, description, link }: Certification) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500 mb-1">{issuer} &mdash; {date}</p>
      <p className="mb-3 text-gray-700 dark:text-gray-300">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View Certificate
        </a>
      )}
    </div>
  );
}
