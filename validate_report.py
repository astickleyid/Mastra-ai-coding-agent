import json
import sys

def validate_json(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)

        if not isinstance(data, list):
            print("Error: Root element must be a list")
            sys.exit(1)

        # Since we expect an empty list, this is valid.
        # If there were items, we would validate them here.
        for item in data:
            required_fields = [
                'title', 'description', 'deepLink', 'filePath',
                'lineNumber', 'confidence', 'rationale', 'context', 'language'
            ]
            for field in required_fields:
                if field not in item:
                    print(f"Error: Missing field {field} in item")
                    sys.exit(1)

            if not isinstance(item['confidence'], int) or not (1 <= item['confidence'] <= 3):
                 print(f"Error: Confidence must be an integer between 1 and 3. Got {item['confidence']}")
                 sys.exit(1)

        print("JSON report is valid.")

    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format - {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    validate_json('todo_report.json')
