Add-Type -AssemblyName System.Drawing
$imagePath = "C:\Users\Innocent Manda\Documents\sekoma_website\logo-transparent.png"
$outputPath = "C:\Users\Innocent Manda\Documents\sekoma_website\favicon.png"

try {
    $img = [System.Drawing.Image]::FromFile($imagePath)
    
    # We want a square image, padding with transparency if needed
    $size = [math]::Max($img.Width, $img.Height)
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    # Calculate offset to center the image
    $x = ($size - $img.Width) / 2
    $y = ($size - $img.Height) / 2
    
    $graphics.DrawImage($img, $x, $y, $img.Width, $img.Height)
    
    # Now resize to 64x64 for favicon to reduce file size
    $faviconSize = 64
    $faviconBmp = New-Object System.Drawing.Bitmap($faviconSize, $faviconSize)
    $faviconGraphics = [System.Drawing.Graphics]::FromImage($faviconBmp)
    $faviconGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $faviconGraphics.DrawImage($bmp, 0, 0, $faviconSize, $faviconSize)
    
    $faviconBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    $faviconGraphics.Dispose()
    $faviconBmp.Dispose()
    $graphics.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Favicon created successfully."
}
catch {
    Write-Host "Error: $_"
}
