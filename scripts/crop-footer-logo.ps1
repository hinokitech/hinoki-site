param(
  [Parameter(Mandatory = $true)][string]$Path,
  [string]$OutPath,
  [int]$CropRight = 96,
  [int]$CropBottom = 96
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$srcPath = $Path
$dstPath = if ($OutPath) { $OutPath } else { $Path }

$img = [System.Drawing.Bitmap]::new($srcPath)
try {
  $newW = $img.Width - $CropRight
  $newH = $img.Height - $CropBottom
  if ($newW -le 0 -or $newH -le 0) { throw "Crop too large for image size." }

  $dst = New-Object System.Drawing.Bitmap $newW, $newH
  try {
    $g = [System.Drawing.Graphics]::FromImage($dst)
    try {
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $g.DrawImage($img, 0, 0, $newW, $newH)
    }
    finally {
      $g.Dispose()
    }

    $tmp = "$dstPath.__tmp.png"
    $dst.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $dst.Dispose()
  }

  if (Test-Path $dstPath) {
    try { Remove-Item -Force $dstPath -ErrorAction Stop } catch {}
  }
  Move-Item -Force $tmp $dstPath

  Write-Output ("cropped_to {0}x{1} -> {2}" -f $newW, $newH, $dstPath)
}
finally {
  $img.Dispose()
}

