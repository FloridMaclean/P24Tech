/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 */

interface StructuredDataProps {
  data: object | object[]
}

export default function StructuredData({ data }: StructuredDataProps) {
  try {
    if (!data) {
      console.warn('StructuredData: No data provided')
      return null
    }

    const jsonLd = Array.isArray(data) ? data : [data]

    return (
      <>
        {jsonLd.map((item, index) => {
          try {
            if (!item || typeof item !== 'object') {
              console.warn(`StructuredData: Invalid item at index ${index}`)
              return null
            }

            const jsonString = JSON.stringify(item)
            return (
              <script
                key={index}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonString }}
              />
            )
          } catch (error) {
            console.error(`StructuredData: Error serializing item at index ${index}:`, error)
            return null
          }
        })}
      </>
    )
  } catch (error) {
    console.error('StructuredData: Error rendering structured data:', error)
    return null
  }
}

