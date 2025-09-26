interface HandwrittenAnnotationProps {
  children: React.ReactNode
  color?: 'red' | 'blue' | 'green'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export default function HandwrittenAnnotation({
  children,
  color = 'red',
  position = 'top-right',
  className = ""
}: HandwrittenAnnotationProps) {
  const colorClasses = {
    red: 'text-correction-red',
    blue: 'text-ink-blue',
    green: 'text-success-green',
  }

  const positionClasses = {
    'top-left': 'absolute -top-8 -left-4',
    'top-right': 'absolute -top-8 -right-4',
    'bottom-left': 'absolute -bottom-8 -left-4',
    'bottom-right': 'absolute -bottom-8 -right-4',
  }

  return (
    <div className={`${positionClasses[position]} ${colorClasses[color]} handwritten text-sm font-bold transform rotate-12 ${className}`}>
      {children}
    </div>
  )
}