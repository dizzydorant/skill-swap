import React from 'react'

export type PencilIconProps = React.SVGProps<SVGSVGElement>

export const PencilIcon: React.FC<PencilIconProps> = ({ className, ...props }) => {
  return (
    <svg
      className={`w-4 h-4 text-gray-400 ${className || ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  )
}
