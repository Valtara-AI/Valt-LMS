import React from 'react'
import { ImageWithFallback } from '../ImageWithFallback'

export default function ImageWithFallbackExamples() {
  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold">Fixed dimensions (recommended)</h4>
        <div className="w-full max-w-md">
          <ImageWithFallback src="/images/sample-800x600.jpg" alt="Sample fixed" width={800} height={600} />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold">Fill / responsive mode</h4>
        <div className="w-full h-56">
          <ImageWithFallback src="/images/sample-1200x800.jpg" alt="Sample fill" />
        </div>
      </div>
    </div>
  )
}
