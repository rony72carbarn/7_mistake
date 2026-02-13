#!/usr/bin/env python3
"""
Generate Scene 4 Audio using ElevenLabs API
Run: python generate_scene4_audio.py
"""

import os
import requests

# ElevenLabs API Configuration
ELEVENLABS_API_KEY = "YOUR_ELEVENLABS_API_KEY_HERE"  # Replace with your API key
VOICE_ID = "21m00Tcm4TlvDq8ikWAM"  # Default: Rachel voice (or use your preferred voice ID)

# Scene 4 Script
SCRIPT = """For South Sudan, your documents matter as much as the car. You need the right originals ready for customs and registration. With Carbarn, you can track and download key documents through your dashboard, and you'll receive what you need, including your invoice and shipping paperwork — so nothing is missing later."""

# Output file
OUTPUT_FILE = "public/audio_scene4_south_sudan.mp3"

def generate_audio():
    """Generate audio using ElevenLabs API"""

    if ELEVENLABS_API_KEY == "YOUR_ELEVENLABS_API_KEY_HERE":
        print("❌ ERROR: Please set your ElevenLabs API key in the script!")
        print("Get your API key from: https://elevenlabs.io/")
        return False

    print("🎙️  Generating Scene 4 audio...")
    print(f"📝 Script: {SCRIPT[:50]}...")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"

    headers = {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY
    }

    data = {
        "text": SCRIPT,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()

        # Save audio file
        with open(OUTPUT_FILE, "wb") as f:
            f.write(response.content)

        print(f"✅ Audio generated successfully!")
        print(f"📁 Saved to: {OUTPUT_FILE}")
        print("\n🎯 Next steps:")
        print("1. Update src/Composition.tsx line 520:")
        print('   const AUDIO_SCENE4 = staticFile("audio_scene4_south_sudan.mp3");')
        print("2. Refresh your browser (Ctrl + Shift + R)")
        print("3. Play Scene4 - audio should match now!")

        return True

    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")
        if hasattr(e.response, 'text'):
            print(f"Response: {e.response.text}")
        return False

if __name__ == "__main__":
    # Check if requests is installed
    try:
        import requests
    except ImportError:
        print("❌ 'requests' library not found!")
        print("Install it with: pip install requests")
        exit(1)

    generate_audio()
