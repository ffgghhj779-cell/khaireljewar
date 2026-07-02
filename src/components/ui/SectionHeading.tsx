interface SectionHeadingProps {
  title: string
  subtitle?: string
  lang: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  lang, 
  centered = false,
  light = false 
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-16`}>
      <h2 className={`
        text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6
        ${light ? 'text-white' : 'text-dark'}
        ${lang === 'ar' ? 'font-ibm-arabic' : 'font-manrope'}
      `}>
        {title}
      </h2>
      {subtitle && (
        <p className={`
          text-lg md:text-xl leading-relaxed
          ${light ? 'text-white/80' : 'text-gray-600'}
        `}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-1 w-24 bg-primary rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
