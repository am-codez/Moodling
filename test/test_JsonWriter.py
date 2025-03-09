import unittest
from main import JsonWriter  

class TestJsonWriter(unittest.TestCase):  # Inherit from unittest.TestCase
    def test_to_dict(self):
        # Create an instance of JsonWriter
        test_output = JsonWriter(25, "Male", 7, 2, 1, 3)
        
        # Expected dictionary
        expected_output = {
            "age": 25,
            "gender": "Male",
            "sleepHours": 7,
            "exerciseHours": 2,
            "caffeineIntake": 1,
            "screenTime": 3,
        }
        
        # Assert that the to_dict method returns the expected dictionary
        self.assertEqual(test_output.to_dict(), expected_output)

if __name__ == "__main__":
    unittest.main()