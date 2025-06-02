@echo off
echo Fetching latest from GitHub...
git pull

echo.
set /p msg="Enter commit message: "
git add .
git commit -m "%msg%"
git push

echo.
echo Done! Your project is now synced with GitHub.
pause
