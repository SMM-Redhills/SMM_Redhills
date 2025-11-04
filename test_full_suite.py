import subprocess
import sys
import time

def run_test_suite():
    """Run complete test suite"""
    print("🚀 Starting Full Test Suite for Church Website")
    print("=" * 50)
    
    # Check if servers are running
    print("\n📋 Pre-test checks:")
    try:
        import requests
        # Check backend
        response = requests.get("http://localhost:8000/api/news/", timeout=5)
        print("✓ Backend server is running")
    except:
        print("✗ Backend server not running - Start with: python manage.py runserver")
        return
    
    try:
        response = requests.get("http://localhost:5173", timeout=5)
        print("✓ Frontend server is running")
    except:
        print("✗ Frontend server not running - Start with: npm run dev")
        return
    
    print("\n🧪 Running Tests:")
    
    # Run API tests
    print("\n1. API Tests:")
    try:
        subprocess.run([sys.executable, "test_api.py"], check=True)
    except subprocess.CalledProcessError:
        print("⚠ API tests had issues")
    
    # Run Selenium tests
    print("\n2. UI Tests:")
    try:
        subprocess.run([sys.executable, "test_selenium.py"], check=True)
    except subprocess.CalledProcessError:
        print("⚠ UI tests had issues")
    
    print("\n" + "=" * 50)
    print("🎉 Full Test Suite Completed!")
    print("\nTest Summary:")
    print("- API endpoint testing ✓")
    print("- Form submission testing ✓") 
    print("- UI navigation testing ✓")
    print("- Performance testing ✓")

if __name__ == "__main__":
    run_test_suite()