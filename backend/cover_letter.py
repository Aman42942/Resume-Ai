def generate_cover_letter(resume, job):
    return f"""
Dear Hiring Manager,

I am excited to apply for this role. Based on my experience:

{resume[:500]}

I believe I am a strong fit for the position described below:

{job[:300]}

Sincerely,
Candidate
"""