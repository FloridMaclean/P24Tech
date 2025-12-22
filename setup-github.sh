#!/bin/bash

# GitHub Setup Script for PORT24 Technologies
# This script helps initialize and push to GitHub

echo "🚀 Setting up GitHub repository for PORT24 Technologies"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already exists"
    CURRENT_URL=$(git remote get-url origin)
    echo "   Current URL: $CURRENT_URL"
    read -p "Do you want to update it to https://github.com/FloridMaclean/P24Tech.git? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin https://github.com/FloridMaclean/P24Tech.git
        echo "✅ Remote URL updated"
    fi
else
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/FloridMaclean/P24Tech.git
    echo "✅ Remote added"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if [ -z "$CURRENT_BRANCH" ]; then
    echo "🌿 Creating main branch..."
    git checkout -b main
    CURRENT_BRANCH="main"
fi

echo ""
echo "📋 Current status:"
git status --short

echo ""
echo "📝 Next steps:"
echo "1. Review the files above"
echo "2. Add files: git add ."
echo "3. Commit: git commit -m 'Production-ready build for Hostinger'"
echo "4. Push: git push -u origin $CURRENT_BRANCH"
echo ""
echo "Or run this script with --auto to automatically add, commit, and push:"
echo "  ./setup-github.sh --auto"
echo ""

# Auto mode
if [ "$1" == "--auto" ]; then
    echo "🤖 Auto mode enabled..."
    read -p "This will add, commit, and push all changes. Continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Production-ready build for Hostinger deployment"
        echo ""
        echo "📤 Pushing to GitHub..."
        git push -u origin $CURRENT_BRANCH
        echo ""
        echo "✅ Done! Your code is now on GitHub."
    else
        echo "❌ Cancelled"
    fi
fi

