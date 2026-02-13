import requests
import json
import base64
import re

# -------------------------------------------------------------------------
# CONFIGURATION
# -------------------------------------------------------------------------
API_KEY = "sk_58b986671e9c03f7f8212fffc0becf1c211aedc93fddb5b6"
VOICE_ID = "SC7dE9527sxeZsMWVg9Z"

OUTPUT_FILENAME = "script_audio.mp3"
METADATA_FILENAME = "script_metadata.json"

TEXT_TO_SPEAK = (
    """Cholakwika chachinayi: Kudumpha kuwunika zikalata—ndikukagwidwa potulutsa galimoto (clearing).
Ku Malawi, zikalata zanu ndizofunika chimodzimodzi ndi galimotoyo. Mukufunika zikalata zenizeni (originals) zokonzeka ku Customs ndi kulembetsa—kuphatikizapo invoice yanu, Bill of Lading, ndi mapepala ofunikira potulutsa galimoto. Ndi Carbarn, mutha kutsata ndi kutsitsa zikalata zofunika kudzera pa Dashboard yanu, ndipo mudzalandira zomwe mukufunikira, kuphatikizapo invoice ndi mapepala otumizira—choncho palibe chomwe chidzasowe "pambuyo pake".
"""
)

MAX_SENTENCE_DURATION = 8.0  # seconds

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
        "model_id": "eleven_multilingual_v2",
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

    sentence_end_pattern = re.compile(r"[.!?]")

    for i, char in enumerate(characters):
        if sentence_start is None:
            sentence_start = start_times[i]

        current_text += char

        is_last_char = i == len(characters) - 1
        is_sentence_end = sentence_end_pattern.match(char)

        if is_sentence_end or is_last_char:
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
    final_sentences = []

    for s in sentences:
        if s["duration_seconds"] < max_duration:
            final_sentences.append(s)
            continue

        text = s["sentence"]
        start = s["start_time"]
        end = s["end_time"]
        mid_time = start + (end - start) / 2

        mid_index = len(text) // 2

        # Avoid cutting words
        left_space = text.rfind(" ", 0, mid_index)
        right_space = text.find(" ", mid_index)

        if left_space == -1 and right_space == -1:
            split_index = mid_index
        else:
            candidates = [i for i in [left_space, right_space] if i != -1]
            split_index = min(candidates, key=lambda x: abs(x - mid_index))

        first_text = text[:split_index].strip()
        second_text = text[split_index:].strip()

        final_sentences.append({
            "sentence": first_text,
            "start_time": start,
            "end_time": mid_time,
            "duration_seconds": round(mid_time - start, 3)
        })

        final_sentences.append({
            "sentence": second_text,
            "start_time": mid_time,
            "end_time": end,
            "duration_seconds": round(end - mid_time, 3)
        })

    return final_sentences

# -------------------------------------------------------------------------
# MAIN
# -------------------------------------------------------------------------
def main():
    response = generate_audio_with_timestamps(
        TEXT_TO_SPEAK,
        VOICE_ID,
        API_KEY
    )

    # Save audio
    audio_bytes = base64.b64decode(response["audio_base64"])
    with open(OUTPUT_FILENAME, "wb") as f:
        f.write(audio_bytes)

    print(f"Audio saved: {OUTPUT_FILENAME}")

    # Process timestamps
    alignment = response["alignment"]
    sentences = calculate_sentence_timestamps(alignment)
    sentences = split_long_sentences(sentences, MAX_SENTENCE_DURATION)

    metadata = {
        "total_duration": alignment["character_end_times_seconds"][-1],
        "sentences": sentences
    }

    with open(METADATA_FILENAME, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=4, ensure_ascii=False)

    print(f"Metadata saved: {METADATA_FILENAME}")

    print("\n--- FINAL SENTENCE TIMINGS ---")
    for s in sentences:
        print(f"[{s['duration_seconds']}s] {s['sentence']}")

if __name__ == "__main__":
    main()
