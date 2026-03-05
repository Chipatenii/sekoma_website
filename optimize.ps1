Add-Type -AssemblyName System.Drawing
$imagePath = "C:\Users\Innocent Manda\Documents\sekoma_website\hero-mine.jpg.jpg"
$outputPath = "C:\Users\Innocent Manda\Documents\sekoma_website\hero-mine-optimized.jpg"

try {
    $img = [System.Drawing.Image]::FromFile($imagePath)
    
    # Calculate dimensions
    $targetWidth = 1920
    $ratio = $targetWidth / $img.Width
    $targetHeight = [int]($img.Height * $ratio)
    
    # Create new bitmap
    $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    
    # High quality settings
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($img, 0, 0, $targetWidth, $targetHeight)
    
    # Compress quality to 75%
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)
    
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    
    # Save optimized image
    $bmp.Save($outputPath, $jpegCodec, $encoderParams)
    
    # Cleanup
    $graphics.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Success: Image optimized and saved."
} catch {
    Write-Host "Error: $_"
}
