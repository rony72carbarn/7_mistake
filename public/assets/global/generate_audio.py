import requests
import json
import base64
import re
import os

# -------------------------------------------------------------------------
# CONFIGURATION
# -------------------------------------------------------------------------
API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6"
VOICE_ID = "SC7dE9527sxeZsMWVg9Z"

SCENE_NUMBER = 5  # 🔥 change this per scene

OUTPUT_AUDIO_NAME = "script_audio.mp3"
OUTPUT_METADATA_NAME = "script_metadata.json"

TEXT_TO_SPEAK = (
    """
  মিস্টেক নাম্বার ফোর: পেপারওয়ার্কের ঘাপলা— আর পোর্টে গাড়ি আটকানো!" "বাংলাদেশে ভাই ডকুমেন্টেশন ইজ এভরিথিং। এক্সপোর্ট সার্টিফিকেট, বিল অফ লেডিং— এগুলোর একটা মিসিং তো আপনার গাড়ি কাস্টমসে আটকে যাবে! কারবার্নের সিকিউর ড্যাশবোর্ড থেকে আপনি আপনার সব অরিজিনাল ডকুমেন্ট ট্র্যাক আর ডাউনলোড করতে পারবেন। ক্লিয়ারেন্সের সময় সিঅ্যান্ডএফ (C&F) এজেন্টকে নিয়ে কোনো 'প্যারা' খেতে হবে না।
"""
)

MAX_SENTENCE_DURATION = 8.0  # seconds

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

# -------------------------------------------------------------------------
# API CALL
# -------------------------------------------------------------------------
def generate_audio_with_timestamps(text, voice_id, api_key):
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps"

    headers = {
        "xi-api-key": api_key,
        "Content-Type": "application/json"
    }

    payload = {
        "text": text,
        "model_id": "eleven_v3",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75
        }
    }

    print("Sending request to ElevenLabs...")
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code != 200:
        raise Exception(f"ElevenLabs Error {response.status_code}: {response.text}")

    return response.json()

# -------------------------------------------------------------------------
# SENTENCE TIMING EXTRACTION
# -------------------------------------------------------------------------
def calculate_sentence_timestamps(alignment_data):
    characters = alignment_data["characters"]
    start_times = alignment_data["character_start_times_seconds"]
    end_times = alignment_data["character_end_times_seconds"]

    sentences = []
    current_text = ""
    sentence_start = None

    for i, char in enumerate(characters):
        if sentence_start is None:
            sentence_start = start_times[i]

        current_text += char

        if char in ".!?।" or i == len(characters) - 1:
            sentence_end = end_times[i]

            sentences.append({
                "sentence": current_text.strip(),
                "start_time": sentence_start,
                "end_time": sentence_end,
                "duration_seconds": round(sentence_end - sentence_start, 3)
            })

            current_text = ""
            sentence_start = None

    return sentences

# -------------------------------------------------------------------------
# SPLIT LONG SENTENCES
# -------------------------------------------------------------------------
def split_long_sentences(sentences, max_duration):
    final = []

    for s in sentences:
        if s["duration_seconds"] <= max_duration:
            final.append(s)
            continue

        text = s["sentence"]
        start = s["start_time"]
        end = s["end_time"]
        mid_time = start + (end - start) / 2

        split_index = text.rfind(" ", 0, len(text)//2)
        if split_index == -1:
            split_index = len(text)//2

        final.append({
            "sentence": text[:split_index].strip(),
            "start_time": start,
            "end_time": mid_time,
            "duration_seconds": round(mid_time - start, 3)
        })

        final.append({
            "sentence": text[split_index:].strip(),
            "start_time": mid_time,
            "end_time": end,
            "duration_seconds": round(end - mid_time, 3)
        })

    return final

# -------------------------------------------------------------------------
# MAIN
# -------------------------------------------------------------------------
def main():
    assets_dir = get_scene_assets_directory(SCENE_NUMBER)

    audio_path = os.path.join(assets_dir, OUTPUT_AUDIO_NAME)
    metadata_path = os.path.join(assets_dir, OUTPUT_METADATA_NAME)

    response = generate_audio_with_timestamps(
        TEXT_TO_SPEAK,
        VOICE_ID,
        API_KEY
    )

    # Save audio
    audio_bytes = base64.b64decode(response["audio_base64"])
    with open(audio_path, "wb") as f:
        f.write(audio_bytes)

    print(f"Audio saved → {audio_path}")

    alignment = response["alignment"]
    sentences = calculate_sentence_timestamps(alignment)
    sentences = split_long_sentences(sentences, MAX_SENTENCE_DURATION)

    metadata = {
        "scene": SCENE_NUMBER,
        "total_duration": alignment["character_end_times_seconds"][-1],
        "sentences": sentences
    }

    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=4, ensure_ascii=False)

    print(f"Metadata saved → {metadata_path}")

    print("\n--- SENTENCE TIMINGS ---")
    for s in sentences:
        print(f"[{s['duration_seconds']}s] {s['sentence']}")

if __name__ == "__main__":
    main()
