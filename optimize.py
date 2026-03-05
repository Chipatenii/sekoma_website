from PIL import Image
import os

try:
    img = Image.open('hero-mine.jpg.jpg')
    
    # Calculate new width and height while maintaining aspect ratio
    max_width = 1920
    wpercent = (max_width / float(img.size[0]))
    hsize = int((float(img.size[1]) * float(wpercent)))
    
    # Resize the image using high-quality downsampling
    img = img.resize((max_width, hsize), Image.Resampling.LANCZOS)
    
    # Save optimized version
    img.save('hero-mine-optimized.jpg', 'JPEG', quality=75, optimize=True)
    print("Optimization successful")
except Exception as e:
    print(f"Error: {e}")
