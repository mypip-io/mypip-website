interface HighlightedTextProps {
  children: React.ReactNode
  color?: 'yellow' | 'green' | 'blue'
  className?: string
}

export default function HighlightedText({
  children,
  color = 'yellow',
  className = ""
}: HighlightedTextProps) {
  const highlightClasses = {
    yellow: 'highlight-yellow',
    green: 'bg-gradient-to-r from-transparent via-success-green/30 to-transparent',
    blue: 'bg-gradient-to-r from-transparent via-blue-300/30 to-transparent',
  }

  return (
    <span className={`${highlightClasses[color]} px-1 ${className}`}>
      {children}
    </span>
  )
}