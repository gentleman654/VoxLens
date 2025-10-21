"""
Quick test script for VoxLens API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000/api/v1"


def test_register():
    """Test user registration"""
    print("\n🔹 Testing user registration...")
    
    payload = {
        "email": "test@example.com",
        "password": "TestPass123!",
        "full_name": "Test User"
    }
    
    response = requests.post(f"{BASE_URL}/auth/register", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.json() if response.status_code == 201 else None


def test_login(email, password):
    """Test user login"""
    print("\n🔹 Testing user login...")
    
    payload = {
        "email": email,
        "password": password
    }
    
    response = requests.post(f"{BASE_URL}/auth/login", json=payload)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Login successful!")
        print(f"Access Token: {data['access_token'][:50]}...")
        print(f"Token Type: {data['token_type']}")
        return data
    else:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return None


def test_get_current_user(access_token):
    """Test getting current user info"""
    print("\n🔹 Testing get current user...")
    
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def test_get_searches(access_token):
    """Test getting user searches"""
    print("\n🔹 Testing get searches...")
    
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    response = requests.get(f"{BASE_URL}/searches", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def main():
    """Run all tests"""
    print("=" * 60)
    print("🚀 VoxLens API Test Suite")
    print("=" * 60)
    
    # Test 1: Register a new user
    user = test_register()
    
    if user:
        # Test 2: Login with the new user
        tokens = test_login("test@example.com", "TestPass123!")
        
        if tokens:
            access_token = tokens["access_token"]
            
            # Test 3: Get current user info
            test_get_current_user(access_token)
            
            # Test 4: Get user searches (should be empty)
            test_get_searches(access_token)
    
    print("\n" + "=" * 60)
    print("✅ Test suite completed!")
    print("=" * 60)


if __name__ == "__main__":
    main()
