#!/bin/bash

echo "Starting Human Traces website..."
echo "Available on: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Try different server options
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
elif command -v php &> /dev/null; then
    php -S localhost:8000
else
    echo "No web server found. Please install Python or PHP."
    echo "Or use: npx http-server"
fi
