#!/bin/bash
echo "Starting Portfolio V2 from: $(pwd)"
if [[ $(pwd) != *"portfolio_v2"* ]]; then
    echo "⚠️  WARNING: You are NOT in portfolio_v2 directory!"
    echo "Current directory: $(pwd)"
    exit 1
fi
echo "✓ Correct directory - Starting server..."
npm start
