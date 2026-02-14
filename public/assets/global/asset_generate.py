import os
import json
import re
from google import genai
from google.genai import types

# -------------------------------------------------------------------------
# CONFIGURATION
# -------------------------------------------------------------------------
API_KEY = "AIzaSyAm-e1r9CLunkgAEC8eV7WQ-4zrktCEfoo"
MODEL_NAME = "gemini-2.5-flash-image"

SCENE_NUMBER = 5 # 🔥 change per scene

# -------------------------------------------------------------------------
# SCENE ASSETS DIRECTORY
# -------------------------------------------------------------------------
def get_scene_assets_directory(scene_number):
    folder_name = f"scene_{scene_number}_assets"

    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        print(f"Created folder: {folder_name}")
    else:
        print(f"Using existing folder: {folder_name}")

    return folder_name


OUTPUT_DIR = get_scene_assets_directory(SCENE_NUMBER)

client = genai.Client(api_key=API_KEY)

# -------------------------------------------------------------------------
# INPUT SCRIPT
# -------------------------------------------------------------------------
VIDEO_SCRIPT = """
মিস্টেক নাম্বার ফোর: পেপারওয়ার্কের ঘাপলা— আর পোর্টে গাড়ি আটকানো!" "বাংলাদেশে ভাই ডকুমেন্টেশন ইজ এভরিথিং। এক্সপোর্ট সার্টিফিকেট, বিল অফ লেডিং— এগুলোর একটা মিসিং তো আপনার গাড়ি কাস্টমসে আটকে যাবে! কারবার্নের সিকিউর ড্যাশবোর্ড থেকে আপনি আপনার সব অরিজিনাল ডকুমেন্ট ট্র্যাক আর ডাউনলোড করতে পারবেন। ক্লিয়ারেন্সের সময় সিঅ্যান্ডএফ (C&F) এজেন্টকে নিয়ে কোনো 'প্যারা' খেতে হবে না।
"""


# -------------------------------------------------------------------------
# PROMPT
# -------------------------------------------------------------------------
PROMPT = f"""
Role: You are an expert Infographic Designer for video motion graphics.

Task: Analyze the provided Video Script. Break the script down into granular visual "beats".
For each beat, generate a distinct 2D, flat-style, modern infographic asset.

CRITICAL STYLE CONSTRAINTS for ALL IMAGES:
1. NO TEXT ALLOWED in images.
2. Flat design, clean lines, modern aesthetic.
3. Clean solid or subtle gradient background.

Input Script:
"{VIDEO_SCRIPT}"

Output Instructions:
For each visual beat:
1. Generate a TEXT explanation of the visual rationale.
2. Immediately follow with the IMAGE.

Repeat until the full script is visualized (7–10 assets expected).
"""

# -------------------------------------------------------------------------
# GENERATION
# -------------------------------------------------------------------------
print(f"--- Starting generation for Scene {SCENE_NUMBER} ---")
print(f"Model: {MODEL_NAME}")
print("This may take 30–60 seconds...\n")

try:
    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=PROMPT,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            temperature=0.4,
        )
    )

    master_manifest = []
    current_text_buffer = ""
    image_counter = 0

    print("--- Processing generated assets ---")

    for part in response.candidates[0].content.parts:
        if part.text:
            current_text_buffer += part.text.strip() + "\n"

        elif part.inline_data:
            image_filename = f"asset_{image_counter:02d}.png"
            image_path = os.path.join(OUTPUT_DIR, image_filename)

            with open(image_path, "wb") as f:
                f.write(part.inline_data.data)

            print(f"Saved image → {image_path}")

            rationale = current_text_buffer.strip()
            rationale = re.sub(
                r'^(Visual Rationale:|Script Segment:)',
                '',
                rationale,
                flags=re.MULTILINE
            ).strip()

            asset_metadata = {
                "scene": SCENE_NUMBER,
                "asset_id": f"asset_{image_counter:02d}",
                "filename": image_filename,
                "filepath": image_path,
                "contextual_rationale": rationale,
                "style_tags": ["2d", "flat", "infographic", "no_text"]
            }

            master_manifest.append(asset_metadata)

            current_text_buffer = ""
            image_counter += 1

    # ---------------------------------------------------------------------
    # SAVE MASTER MANIFEST
    # ---------------------------------------------------------------------
    manifest_path = os.path.join(OUTPUT_DIR, "master_manifest.json")

    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(master_manifest, f, indent=2, ensure_ascii=False)

    print("\n--- SUCCESS ---")
    print(f"Scene: {SCENE_NUMBER}")
    print(f"Assets generated: {image_counter}")
    print(f"Assets folder: {OUTPUT_DIR}/")
    print(f"Manifest: {manifest_path}")
    print("Ready for Remotion / automation pipeline 🚀")

except Exception as e:
    print(f"\n❌ Error during generation:\n{e}")
