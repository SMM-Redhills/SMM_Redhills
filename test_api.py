import requests
import time

class APITest:
    def __init__(self):
        self.base_url = "http://localhost:8000/api"
    
    def test_api_endpoints(self):
        """Test all API endpoints"""
        endpoints = [
            '/news/',
            '/events/',
            '/gallery/',
            '/schedule/',
            '/prayers/'
        ]
        
        for endpoint in endpoints:
            try:
                response = requests.get(f"{self.base_url}{endpoint}")
                if response.status_code == 200:
                    print(f"✓ {endpoint} - Status: {response.status_code}")
                else:
                    print(f"⚠ {endpoint} - Status: {response.status_code}")
            except Exception as e:
                print(f"✗ {endpoint} - Error: {e}")
    
    def test_form_submissions(self):
        """Test form submission endpoints"""
        # Test contact form
        contact_data = {
            "name": "API Test User",
            "email": "apitest@example.com",
            "subject": "API Test",
            "message": "This is an API test message"
        }
        
        try:
            response = requests.post(f"{self.base_url}/submit-contact/", json=contact_data)
            if response.status_code == 201:
                print("✓ Contact form API works")
            else:
                print(f"⚠ Contact form API - Status: {response.status_code}")
        except Exception as e:
            print(f"✗ Contact form API - Error: {e}")
        
        # Test prayer request
        prayer_data = {
            "name": "API Prayer Test",
            "email": "prayer@example.com",
            "prayer_type": "health",
            "intention": "API test prayer intention"
        }
        
        try:
            response = requests.post(f"{self.base_url}/submit-prayer/", json=prayer_data)
            if response.status_code == 201:
                print("✓ Prayer request API works")
            else:
                print(f"⚠ Prayer request API - Status: {response.status_code}")
        except Exception as e:
            print(f"✗ Prayer request API - Error: {e}")
    
    def test_performance(self):
        """Test API response times"""
        start_time = time.time()
        response = requests.get(f"{self.base_url}/news/")
        end_time = time.time()
        
        response_time = (end_time - start_time) * 1000
        if response_time < 1000:
            print(f"✓ API Performance: {response_time:.2f}ms")
        else:
            print(f"⚠ API Performance slow: {response_time:.2f}ms")
    
    def run_all_tests(self):
        """Run all API tests"""
        print("Starting API tests...")
        print("Make sure backend is running on http://localhost:8000")
        
        self.test_api_endpoints()
        self.test_form_submissions()
        self.test_performance()
        
        print("\n✅ API tests completed!")

if __name__ == "__main__":
    test = APITest()
    test.run_all_tests()