interface PostItNoteProps {
  children: React.ReactNode
  color?: 'yellow' | 'blue' | 'green' | 'pink'
  rotation?: number
  className?: string
  style?: React.CSSProperties
}

export default function PostItNote({
  children,
  color = 'yellow',
  rotation = -1,
  className = "",
  style = {}
}: PostItNoteProps) {
  const colorClasses = {
    yellow: 'bg-postit-yellow',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    pink: 'bg-pink-200',
  }

  return (
    <div
      className={`${colorClasses[color]} p-4 shadow-lg relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      {/* Tape effect */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-300/50 rounded-sm"></div>

      <div className="handwritten text-ink-blue">
        {children}
      </div>
    </div>
  )
}