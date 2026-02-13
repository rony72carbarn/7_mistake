@echo off
echo ================================================
echo Scene 4 Audio Analysis Helper
echo ================================================
echo.

REM Check if audio file exists
if not exist "public\audio_scene4_south_sudan.mp3" (
    echo ERROR: Audio file not found!
    echo Please save your ElevenLabs audio as:
    echo public\audio_scene4_south_sudan.mp3
    echo.
    pause
    exit /b 1
)

echo Audio file found!
echo.

REM Check if ffmpeg is installed
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: FFmpeg not installed!
    echo.
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    echo Or use online tools to analyze your audio.
    echo.
    pause
    exit /b 1
)

echo Analyzing audio duration...
echo.
ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 public\audio_scene4_south_sudan.mp3 > temp_duration.txt
set /p DURATION=<temp_duration.txt
del temp_duration.txt

echo Total Audio Duration: %DURATION% seconds
echo.

REM Calculate total frames
powershell -Command "$duration = [float]'%DURATION%'; $frames = [math]::Round($duration * 30); Write-Host 'Total Frames (30fps): '$frames"
echo.

echo Generating waveform image...
ffmpeg -i public\audio_scene4_south_sudan.mp3 -filter_complex "showwavespic=s=1920x400" -frames:v 1 scene4_waveform.png -y

if exist scene4_waveform.png (
    echo SUCCESS: Waveform saved as scene4_waveform.png
    echo Opening waveform...
    start scene4_waveform.png
) else (
    echo ERROR: Failed to generate waveform
)

echo.
echo ================================================
echo Next Steps:
echo ================================================
echo 1. Look at the waveform (scene4_waveform.png)
echo 2. Play the audio and note timestamps for each scene
echo 3. Calculate frames: timestamp_seconds x 30
echo 4. Update src/scene_4/constants.ts with frame counts
echo.
echo Example:
echo   If Scene 1 ends at 3.2s: 3.2 x 30 = 96 frames
echo   Set SCENE4_LINE1_DUR = 96
echo.
pause
