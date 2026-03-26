const fractureInfo = {
  "Avulsion fracture": {
    plain: "A small piece of bone has been pulled away by a tendon or ligament — like a chip breaking off.",
    severity: "moderate",
    color: "yellow",
    firstAid: [
      "Rest the injured area immediately",
      "Apply ice wrapped in a cloth for 20 minutes every 2 hours",
      "Keep the limb elevated above heart level",
      "Do not try to push the bone fragment back",
    ],
    recovery: "6–8 weeks with rest and physiotherapy",
    seeDoctor: "Visit a doctor within 24 hours — you will likely need an X-ray and possible casting",
  },

  "Comminuted fracture": {
    plain: "Your bone has shattered into three or more fragments. This is a serious fracture that almost always needs surgery.",
    severity: "severe",
    color: "red",
    firstAid: [
      "Do NOT move the injured limb at all",
      "Stabilize the limb with a splint or rolled newspaper if available",
      "Do not attempt to straighten the bone",
      "Go to the emergency room immediately",
    ],
    recovery: "3–6 months, usually requires surgery and metal plates or screws",
    seeDoctor: "Go to the emergency room now",
  },

  "Fracture Dislocation": {
    plain: "Your bone is broken AND the joint has shifted out of its normal position at the same time.",
    severity: "severe",
    color: "red",
    firstAid: [
      "Do not attempt to put the joint back in place yourself",
      "Immobilize the joint in the position you find it",
      "Apply ice to reduce swelling",
      "Go to emergency immediately",
    ],
    recovery: "3–6 months depending on the joint involved and surgical outcome",
    seeDoctor: "Go to the emergency room now — this needs immediate medical attention",
  },

  "Greenstick fracture": {
    plain: "The bone bent and cracked on one side but didn't break all the way through — like bending a green twig. This is most common in children.",
    severity: "mild",
    color: "green",
    firstAid: [
      "Keep the child calm and still",
      "Apply ice wrapped in cloth for 20 minutes",
      "Support and immobilize the limb gently",
      "Visit a doctor the same day",
    ],
    recovery: "4–8 weeks in a cast, excellent prognosis in children",
    seeDoctor: "Visit a doctor today — casting is usually required",
  },

  "Hairline Fracture": {
    plain: "A very thin, tiny crack in your bone — like a crack in a ceramic cup. The bone is still in one piece.",
    severity: "mild",
    color: "green",
    firstAid: [
      "Rest completely — stop the activity that caused the pain",
      "Apply ice for 20 minutes every 2–3 hours for the first 48 hours",
      "Avoid putting weight on the area",
      "Take over-the-counter pain relief if needed",
    ],
    recovery: "6–8 weeks with rest. No surgery usually needed.",
    seeDoctor: "See a doctor within 48 hours to confirm with imaging and get a treatment plan",
  },

  "Impacted fracture": {
    plain: "One end of the broken bone has been driven into the other end — like two pieces being pushed together.",
    severity: "moderate",
    color: "yellow",
    firstAid: [
      "Do not move or bear weight on the limb",
      "Apply ice wrapped in cloth",
      "Elevate the injured area",
      "Seek medical care promptly",
    ],
    recovery: "6–12 weeks depending on location. Sometimes needs surgery.",
    seeDoctor: "Visit a doctor or urgent care within 24 hours",
  },

  "Longitudinal fracture": {
    plain: "The bone has cracked along its length, running up and down rather than across.",
    severity: "moderate",
    color: "yellow",
    firstAid: [
      "Immobilize the limb — avoid any movement",
      "Apply ice to reduce swelling",
      "Elevate the limb above heart level",
      "Seek medical attention the same day",
    ],
    recovery: "8–12 weeks, may require casting or surgery depending on severity",
    seeDoctor: "Visit a doctor today",
  },

  "Oblique fracture": {
    plain: "The bone has broken at a diagonal angle. This can sometimes cause the bone ends to shift.",
    severity: "moderate",
    color: "yellow",
    firstAid: [
      "Keep the limb as still as possible",
      "Apply ice wrapped in cloth — 20 minutes on, 20 minutes off",
      "Do not try to realign the bone",
      "Go to urgent care or emergency",
    ],
    recovery: "10–16 weeks, often needs surgical pins or plates to hold the angle",
    seeDoctor: "Go to urgent care or emergency today",
  },

  "Pathological fracture": {
    plain: "The bone broke due to an underlying condition (like osteoporosis or a tumor) that had already weakened it — not just from injury.",
    severity: "severe",
    color: "red",
    firstAid: [
      "Do not move the injured area",
      "Apply ice gently to reduce swelling",
      "This requires urgent medical evaluation",
      "Go to emergency immediately",
    ],
    recovery: "Highly variable — depends entirely on the underlying condition being treated",
    seeDoctor: "Go to emergency now — the underlying cause must be diagnosed and treated",
  },

  "Spiral Fracture": {
    plain: "A twisting force caused the bone to crack in a spiral pattern around itself — like wringing a wet cloth.",
    severity: "moderate",
    color: "yellow",
    firstAid: [
      "Immobilize the limb immediately",
      "Apply ice wrapped in a towel",
      "Keep the limb elevated",
      "Go to urgent care or emergency",
    ],
    recovery: "10–16 weeks, often requires surgery to stabilize the spiral break",
    seeDoctor: "Go to urgent care or emergency today",
  },
};

export default fractureInfo;