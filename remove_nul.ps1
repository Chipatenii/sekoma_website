$path = [System.IO.Path]::GetFullPath("C:\Users\Innocent Manda\Documents\sekoma_website\nul")
$extPath = "\\?\" + $path
[System.IO.File]::Delete($extPath)
Write-Host "Done. nul file removed."
