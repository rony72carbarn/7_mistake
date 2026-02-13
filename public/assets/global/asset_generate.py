import os
import json
import re
from google import genai
from google.genai import types

# --- Configuration ---
API_KEY = "AIzaSyAm-e1r9CLunkgAEC8eV7WQ-4zrktCEfoo"  # Replace with your string key if not using env vars
# Using a highly capable multimodal model is crucial here.
# gemini-2.0-flash-exp or similar is recommended for interleaved sequences.
MODEL_NAME = "gemini-2.5-flash-image" 
OUTPUT_DIR = "output_assets"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

client = genai.Client(api_key=API_KEY)

# --- The Input Script ---
VIDEO_SCRIPT = """
This is where Carbarn is different. You don’t just “wait and hope.”
You log into your Carbarn Dashboard to track real vessel progress, download your documents, and follow each stage clearly: Ready to Ship, then Shipped, then Arrived. You always know where your vehicle is, and what’s happening next.
"""

# --- The Complex Prompt ---
# This prompt instructs the model to act as an infographic designer,
# break the script down, and generate images interleaved with rationale text.
PROMPT = f"""
Role: You are an expert Infographic Designer for video motion graphics.

Task: Analyze the provided Video Script. Break the script down into granular visual "beats". For each beat, generate a distinct 2D, flat-style, modern infographic asset.

CRITICAL STYLE CONSTRAINTS for ALL IMAGES:
1.  **NO TEXT ALLOWED:** Do not include any words, letters, or numbers in the generated images. Rely solely on visual metaphors, icons, and clean graphics.
2.  **STYLE:** Flat design, clean lines, modern aesthetic, suitable for corporate motion graphics.
3.  **BACKGROUND:** Clean, solid, or subtle gradient background that is easy to isolate.

Input Script:
"{VIDEO_SCRIPT}"

Output Instructions:
Generate a sequence of outputs. For every visual beat you identify:
1. First, generate a TEXT BLOCK explaining the script segment you are visualizing and the rationale for the image.
2. Immediately follow the text block by generating the IMAGE itself.

Repeat this pattern until the entire script is visualized (expect 7 to 10 assets).
"""

print(f"--- Starting generation with model: {MODEL_NAME} ---")
print("This may take 30-60 seconds as multiple assets are generated...")

try:
    # We DO NOT use response_mime_type="application/json" here.
    # We need the raw interleaved sequence of text and image parts.
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=PROMPT,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            temperature=0.4, # Lower temperature for more consistent style adherence
        )
    )

    master_manifest = []
    current_text_buffer = ""
    image_counter = 0

    print("--- Processing Response Sequence ---")

    # Iterate through the interleaved parts
    for part in response.candidates[0].content.parts:
        if part.text:
            # Accumulate text descriptions between images
            current_text_buffer += part.text + "\n"
        
        elif part.inline_data:
            # An image part arrived. Let's save it and create its metadata entry.
            image_filename = f"asset_{image_counter:02d}.png"
            image_path = os.path.join(OUTPUT_DIR, image_filename)
            
            with open(image_path, "wb") as f:
                f.write(part.inline_data.data)
            print(f"Saved image: {image_path}")

            # Create metadata for this asset based on the text preceding it
            # We use simple regex to try and clean up the buffer to just the rationale.
            rationale = current_text_buffer.strip()
            # Remove common prefixes if the model adds them
            rationale = re.sub(r'^(Visual Rationale:|Script Segment:)', '', rationale, flags=re.MULTILINE).strip()

            asset_metadata = {
                "asset_id": f"asset_{image_counter:02d}",
                "filename": image_filename,
                "filepath": image_path,
                # The text buffer holds the rationale the model generated just before the image
                "contextual_rationale": rationale,
                "style_tags": ["2d", "flat", "infographic", "no_text"]
            }
            master_manifest.append(asset_metadata)
            
            # Reset buffer and increment counter for the next asset cycle
            current_text_buffer = ""
            image_counter += 1

    # --- Finalize Output ---
    manifest_path = os.path.join(OUTPUT_DIR, "master_manifest.json")
    with open(manifest_path, "w", encoding='utf-8') as f:
        json.dump(master_manifest, f, indent=2)

    print(f"\n--- Success! ---")
    print(f"Generated {image_counter} images in '{OUTPUT_DIR}/'")
    print(f"Master JSON manifest saved to '{manifest_path}'")
    print("You can now use this JSON to drive your automated video editor.")

except Exception as e:
    print(f"\nError during generation: {e}")
    # If you get a 400 error about JSON mode, ensure you are NOT setting response_mime_type in the config.