import pandas as pd
import random
import time
import os

# Define the categories (months)
categories = ["January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"]

# Define the filename
filename = 'data.csv'

def generate_random_values():
    """Generate random values for Value1 and Value2."""
    return [random.randint(1, 100) for _ in range(2)]

def update_csv():
    """Update the CSV file with random values."""
    # Initialize an empty list to hold rows
    data = []

    # Generate rows
    for category in categories:
        value1, value2 = generate_random_values()
        data.append({'Category': category, 'Value1': value1, 'Value2': value2})

    # Create a DataFrame with the generated rows
    df = pd.DataFrame(data, columns=['Category', 'Value1', 'Value2'])
    
    # Save the DataFrame to CSV
    df.to_csv(filename, index=False)
    print(f"Data written to {filename}")

if __name__ == "__main__":
    # Print the current working directory for verification
    print(f"Current working directory: {os.getcwd()}")
    
    while True:
        try:
            update_csv()
            print(f"Updated {filename} with new random values.")
        except Exception as e:
            print(f"An error occurred: {e}")
        
        time.sleep(1)  # Wait for 1 second before updating again
