param(
  [Parameter(Mandatory = $true)][string]$Path
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::new($Path)
try {
  $w = $bmp.Width
  $h = $bmp.Height

  $pts = @(
    @(0, 0),
    @(($w - 1), 0),
    @(0, ($h - 1)),
    @(($w - 1), ($h - 1)),
    @([int]($w * 0.05), [int]($h * 0.05)),
    @([int]($w * 0.95), [int]($h * 0.05)),
    @([int]($w * 0.05), [int]($h * 0.95)),
    @([int]($w * 0.95), [int]($h * 0.95))
  )

  $rows = foreach ($pt in $pts) {
    $c = $bmp.GetPixel($pt[0], $pt[1])
    [pscustomobject]@{
      x   = $pt[0]
      y   = $pt[1]
      A   = $c.A
      R   = $c.R
      G   = $c.G
      B   = $c.B
      Hex = ("#{0:X2}{1:X2}{2:X2}" -f $c.R, $c.G, $c.B)
    }
  }

  $rows | Format-Table -AutoSize | Out-String | Write-Output

  $r = [int]([math]::Round(($rows | Measure-Object R -Average).Average))
  $g = [int]([math]::Round(($rows | Measure-Object G -Average).Average))
  $b = [int]([math]::Round(($rows | Measure-Object B -Average).Average))
  $hex = ("#{0:X2}{1:X2}{2:X2}" -f $r, $g, $b)
  Write-Output ("avg {0}  rgb({1},{2},{3})" -f $hex, $r, $g, $b)
}
finally {
  $bmp.Dispose()
}

