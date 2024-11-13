// src/components/estimate/estimate-form-list.tsx
interface EstimateFormListProps {
    children: React.ReactNode
    className?: string  // 追加のスタイルを受け取れるように
  }
  
  export function EstimateFormList({ children, className }: EstimateFormListProps) {
    return (
      <ul className={`
        flex
        flex-col
        items-center
        w-full
        ${className}
      `}>
        {children}
      </ul>
    ) 
}   