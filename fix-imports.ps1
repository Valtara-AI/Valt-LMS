# PowerShell script to fix imports in UI components
$uiPath = "c:\Users\SHIVAM\Downloads\LMS-NextJS\src\components\ui"

# Get all .tsx files
$files = Get-ChildItem -Path $uiPath -Filter "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix imports with version numbers
    $content = $content -replace '@radix-ui/react-([a-z-]+)@[\d\.]+', '@radix-ui/react-$1'
    $content = $content -replace 'lucide-react@[\d\.]+', 'lucide-react'
    $content = $content -replace 'class-variance-authority@[\d\.]+', 'class-variance-authority'
    $content = $content -replace 'next-themes@[\d\.]+', 'next-themes'
    $content = $content -replace 'sonner@[\d\.]+', 'sonner'
    $content = $content -replace 'vaul@[\d\.]+', 'vaul'
    $content = $content -replace 'cmdk@[\d\.]+', 'cmdk'
    $content = $content -replace 'input-otp@[\d\.]+', 'input-otp'
    $content = $content -replace 'embla-carousel-react@[\d\.]+', 'embla-carousel-react'
    $content = $content -replace 'react-day-picker@[\d\.]+', 'react-day-picker'
    $content = $content -replace 'react-hook-form@[\d\.]+', 'react-hook-form'
    $content = $content -replace 'react-resizable-panels@[\d\.]+', 'react-resizable-panels'
    $content = $content -replace 'recharts@[\d\.]+', 'recharts'
    
    # Fix utils import
    $content = $content -replace 'from "\.\/utils"', 'from "@/lib/utils"'
    
    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed imports in $($file.Name)"
}

Write-Host "All UI component imports have been fixed!"