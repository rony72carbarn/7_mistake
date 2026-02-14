import { z } from "zod";
import { staticFile } from "remotion";

export const Scene5Schema = z.object({
    // ---------- TEXT ----------
    line1Text: z.string(),
    line1Highlights: z.array(z.string()),
    line1Color: z.string(),

    line2Text: z.string(),
    line2Highlights: z.array(z.string()),
    line2Color: z.string(),
    line2SubText: z.string(),

    line3Text: z.string(),
    line3Highlights: z.array(z.string()),
    line3Color: z.string(),

    line4Text: z.string(),
    line4Highlights: z.array(z.string()),
    line4Color: z.string(),
    line4SubText: z.string(),

    line5Text: z.string(),
    line5Highlights: z.array(z.string()),
    line5Color: z.string(),
    line5SubText: z.string(),

    // ---------- ASSETS ----------
    bgImage1: z.string(),
    bgImage2: z.string(),
    bgImage3: z.string(),
    bgImage4: z.string(),
    bgImage5: z.string(),

    lotAlert: z.string(),
    lotCheck: z.string(),
    lotLock: z.string(),

    // ---------- DURATIONS (ONLY NEW THING) ----------
    durations: z.object({
        line1: z.number(),
        line2: z.number(),
        line3: z.number(),
        line4: z.number(),
        line5: z.number(),
    }),
});

export const Scene5DefaultProps = {
    line1Text: "মিস্টেক নাম্বার ফোর: পেপারওয়ার্কের ঘাপলা— আর পোর্টে গাড়ি আটকানো!",
    line1Highlights: ["ফোর", "ঘাপলা", "আটকানো"],
    line1Color: "#FF3B30",

    line2Text: "বাংলাদেশে ভাই ডকুমেন্টেশন ইজ এভরিথিং। এক্সপোর্ট সার্টিফিকেট, বিল অফ লেডিং—",
    line2Highlights: ["ডকুমেন্টেশন", "সার্টিফিকেট", "লেডিং"],
    line2Color: "#FF9500",
    line2SubText: "Export Certificate & Bill of Lading are crucial for a smooth entry.",

    line3Text: "এগুলোর একটা মিসিং তো আপনার গাড়ি কাস্টমসে আটকে যাবে!",
    line3Highlights: ["মিসিং", "কাস্টমসে", "আটকে"],
    line3Color: "#FF3B30",

    line4Text: "কারবার্নের সিকিউর ড্যাশবোর্ড থেকে আপনি আপনার সব অরিজনাল ডকুমেন্ট ট্র্যাক আর ডাউনলোড করতে পারবেন।",
    line4Highlights: ["সিকিউর", "ড্যাশবোর্ড", "ডাউনলোড"],
    line4Color: "#0052FF",
    line4SubText: "Download and track all original documents securely from our portal.",

    line5Text: "ক্লিয়ারেন্সের সময় সিঅ্যান্ডএফ এজেন্টকে নিয়ে কোনো 'প্যারা' খেতে হবে না।",
    line5Highlights: ["সিঅ্যান্ডএফ", "প্যারা", "এজেন্টকে"],
    line5Color: "#34C759",
    line5SubText: "No hidden hassles. Total control over your documentation.",

    bgImage1: staticFile("assets/global/scene_5_assets/asset_00.png"),
    bgImage2: staticFile("assets/global/scene_5_assets/asset_01.png"),
    bgImage3: staticFile("assets/global/scene_5_assets/asset_02.png"),
    bgImage4: staticFile("assets/global/scene_5_assets/asset_03.png"),
    bgImage5: staticFile("assets/global/scene_5_assets/asset_05.png"),

    lotAlert: staticFile("assets/global/animated_icons/Alert.json"),
    lotCheck: staticFile("assets/global/animated_icons/premium_some_icons/Check.json"),
    lotLock: staticFile("assets/global/animated_icons/lock.json"),

    // ---------- DEFAULT DURATIONS (frames) ----------
    durations: {
        line1: 187,
        line2: 197,
        line3: 155,
        line4: 210,
        line5: 168,
    },
};
