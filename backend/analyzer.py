import re

ACTION_VERBS = [
    "developed", "managed", "led", "designed", "implemented",
    "optimized", "increased", "reduced", "created"
]

SKILLS = [
    "python", "java", "react", "sql", "machine learning",
    "data analysis", "aws"
]

def analyze_resume(text):
    score = 0
    feedback = []

    text_lower = text.lower()

    # Length check
    if len(text.split()) > 300:
        score += 15
    else:
        feedback.append("Resume is too short")

    # Action verbs
    verbs_found = [v for v in ACTION_VERBS if v in text_lower]
    if verbs_found:
        score += 20
    else:
        feedback.append("Use strong action verbs")

    # Metrics
    if re.search(r"\d+%", text):
        score += 20
    else:
        feedback.append("Add measurable achievements")

    # Skills detection
    found_skills = [s for s in SKILLS if s in text_lower]
    score += min(len(found_skills) * 2, 20)

    # Sections
    sections = ["experience", "education", "skills"]
    missing = [s for s in sections if s not in text_lower]
    if missing:
        feedback.append(f"Missing sections: {', '.join(missing)}")
    else:
        score += 15

    return {
        "score": min(score, 100),
        "feedback": feedback,
        "skills_found": found_skills
    }