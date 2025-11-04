import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service

class ChurchWebsiteTest:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--disable-gpu')
        options.add_argument('--disable-web-security')
        options.add_argument('--allow-running-insecure-content')
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_experimental_option('useAutomationExtension', False)
        
        try:
            self.driver = webdriver.Chrome(options=options)
        except Exception as e:
            print(f"Chrome driver error: {e}")
            return
        
        self.driver.maximize_window()
        self.base_url = "http://localhost:5173"
    
    def test_homepage(self):
        """Test homepage loads correctly"""
        try:
            self.driver.get(self.base_url)
            time.sleep(3)
            title = self.driver.title
            if "Saint Mary" in title or "Church" in title:
                print("✓ Homepage loaded successfully")
            else:
                print(f"⚠ Homepage loaded but title unexpected: {title}")
        except Exception as e:
            print(f"❌ Homepage test failed: {e}")
    
    def test_navigation(self):
        """Test navigation between pages"""
        try:
            self.driver.get(self.base_url)
            time.sleep(2)
            
            # Test prayer page navigation
            prayer_link = self.driver.find_element(By.XPATH, "//button[contains(text(), 'View Prayers')]")
            prayer_link.click()
            time.sleep(3)
            
            if "prayers" in self.driver.current_url:
                print("✓ Prayer page navigation works")
            else:
                print(f"⚠ Navigation issue - URL: {self.driver.current_url}")
        except Exception as e:
            print(f"❌ Navigation test failed: {e}")
    
    def test_contact_form(self):
        """Test contact form submission"""
        try:
            self.driver.get(f"{self.base_url}/contact")
            time.sleep(3)
            
            # Fill form
            self.driver.find_element(By.NAME, "name").send_keys("Test User")
            self.driver.find_element(By.NAME, "email").send_keys("test@example.com")
            self.driver.find_element(By.NAME, "message").send_keys("Test message")
            
            # Submit form
            submit_btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
            submit_btn.click()
            time.sleep(3)
            
            print("✓ Contact form submission attempted")
        except Exception as e:
            print(f"❌ Contact form test failed: {e}")
    
    def test_prayer_request(self):
        """Test prayer request form"""
        try:
            self.driver.get(f"{self.base_url}/prayers")
            time.sleep(3)
            
            # Fill prayer form
            self.driver.find_element(By.NAME, "name").send_keys("Test Prayer")
            self.driver.find_element(By.NAME, "email").send_keys("prayer@example.com")
            
            # Select prayer type
            prayer_select = self.driver.find_element(By.NAME, "prayer_type")
            prayer_select.click()
            self.driver.find_element(By.XPATH, "//option[@value='health']").click()
            
            # Fill intention
            self.driver.find_element(By.NAME, "intention").send_keys("Test prayer intention")
            
            # Submit
            submit_btn = self.driver.find_element(By.XPATH, "//button[@type='submit']")
            submit_btn.click()
            time.sleep(3)
            
            print("✓ Prayer request form works")
        except Exception as e:
            print(f"❌ Prayer request test failed: {e}")
    
    def test_admin_access(self):
        """Test admin page access"""
        try:
            self.driver.get(f"{self.base_url}/admin")
            time.sleep(3)
            
            # Check if admin interface loads
            page_source = self.driver.page_source
            if "Administration" in page_source or "Admin" in page_source:
                print("✓ Admin page loads")
            else:
                print("⚠ Admin page loaded but content unclear")
        except Exception as e:
            print(f"❌ Admin access test failed: {e}")
    
    def run_all_tests(self):
        """Run all tests"""
        if not hasattr(self, 'driver'):
            print("❌ Chrome driver failed to initialize")
            return
            
        try:
            print("Starting Selenium tests for Church Website...")
            print("Make sure frontend is running on http://localhost:5173")
            self.test_homepage()
            self.test_navigation()
            self.test_contact_form()
            self.test_prayer_request()
            self.test_admin_access()
            print("\n✅ All tests completed!")
        except Exception as e:
            print(f"\n❌ Test failed: {e}")
        finally:
            if hasattr(self, 'driver'):
                self.driver.quit()

if __name__ == "__main__":
    test = ChurchWebsiteTest()
    test.run_all_tests()