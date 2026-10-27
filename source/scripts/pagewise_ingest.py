"""Builds the pagewise index the chat widget queries.

Run after the resume PDF changes:
    pip install "pagewise[server]"
    python scripts/pagewise_ingest.py

Then serve it with:
    pagewise serve --index data/resume.index.pkl --port 8000
"""

import pathlib

from pagewise import DocQA

ROOT = pathlib.Path(__file__).resolve().parent.parent
RESUME_PDF = ROOT / "public" / "Sharif_Hossain_Resume.pdf"
INDEX_PATH = ROOT / "data" / "resume.index.pkl"

# The resume PDF is bullet-heavy, so pagewise's sentence-level extraction
# pulls poor fragments for these common questions. FAQ entries are checked
# before document retrieval, so they take priority and keep answers accurate.
#
# pagewise matches FAQ questions with plain lexical word-overlap cosine
# similarity (no stemming, no synonyms) against a fixed 0.6 threshold, so
# each entry needs real, SHORT, casual phrasings rather than one formal
# wording. Its stopword list also strips "who/is/where/he/what/does" but
# keeps "his/him/me" as real tokens, and "work" != "working" (no stemming)
# -- so near-duplicate short variants catch what one polished question won't.
FAQS = [
    ("hi", "Hi there! Ask me anything about Sharif — experience, skills, certifications, education, or how to reach him."),
    ("hello", "Hi there! Ask me anything about Sharif — experience, skills, certifications, education, or how to reach him."),
    ("hey", "Hi there! Ask me anything about Sharif — experience, skills, certifications, education, or how to reach him."),

    ("Sharif", "Sharif Hossain is an Assistant Principal Software Engineer II at Brotecs Technologies Limited (Dhaka, Bangladesh), with 10+ years in cloud infrastructure, DevSecOps, cybersecurity, and AI/LLM systems."),
    ("Who is Sharif?", "Sharif Hossain is an Assistant Principal Software Engineer II at Brotecs Technologies Limited (Dhaka, Bangladesh), with 10+ years in cloud infrastructure, DevSecOps, cybersecurity, and AI/LLM systems."),
    ("Tell me about Sharif", "Sharif Hossain is an Assistant Principal Software Engineer II at Brotecs Technologies Limited (Dhaka, Bangladesh), with 10+ years in cloud infrastructure, DevSecOps, cybersecurity, and AI/LLM systems."),
    ("Tell me about yourself", "Sharif Hossain is an Assistant Principal Software Engineer II at Brotecs Technologies Limited (Dhaka, Bangladesh), with 10+ years in cloud infrastructure, DevSecOps, cybersecurity, and AI/LLM systems."),

    ("How many years of experience does Sharif have?",
     "10+ years of professional experience in cloud infrastructure, DevSecOps, and software engineering."),
    ("How long has Sharif been working as an engineer?",
     "10+ years of professional experience in cloud infrastructure, DevSecOps, and software engineering."),
    ("His experience", "10+ years of professional experience in cloud infrastructure, DevSecOps, and software engineering."),
    ("What is his experience?", "10+ years of professional experience in cloud infrastructure, DevSecOps, and software engineering."),
    ("Experience", "10+ years of professional experience in cloud infrastructure, DevSecOps, and software engineering."),

    ("What is Sharif's current job title?",
     "Assistant Principal Software Engineer II."),
    ("What role does Sharif have?",
     "Assistant Principal Software Engineer II."),
    ("His job title", "Assistant Principal Software Engineer II."),
    ("What does he do?", "Assistant Principal Software Engineer II at Brotecs Technologies Limited."),

    ("What company does Sharif work for?",
     "Brotecs Technologies Limited, in Dhaka, Bangladesh, since June 2017."),
    ("Where does Sharif currently work?",
     "Brotecs Technologies Limited, in Dhaka, Bangladesh, since June 2017."),
    ("Where is he currently working?",
     "Brotecs Technologies Limited, in Dhaka, Bangladesh, since June 2017."),
    ("Where is Sharif employed?",
     "Brotecs Technologies Limited, in Dhaka, Bangladesh, since June 2017."),
    ("His current company", "Brotecs Technologies Limited, in Dhaka, Bangladesh, since June 2017."),

    ("What certifications does Sharif have?",
     "Professional Scrum Master I (PSM I) from Scrum.org, and an Ethical Hacker certification from Cisco Networking Academy (NetAcad)."),
    ("Is Sharif certified in anything?",
     "Professional Scrum Master I (PSM I) from Scrum.org, and an Ethical Hacker certification from Cisco Networking Academy (NetAcad)."),
    ("His certifications", "Professional Scrum Master I (PSM I) from Scrum.org, and an Ethical Hacker certification from Cisco Networking Academy (NetAcad)."),

    ("What is Sharif's education?",
     "B.Sc. in Computer Science & Engineering from American International University-Bangladesh (AIUB), December 2017."),
    ("What is Sharif's educational background?",
     "B.Sc. in Computer Science & Engineering from American International University-Bangladesh (AIUB), December 2017."),
    ("Which university did Sharif attend?",
     "B.Sc. in Computer Science & Engineering from American International University-Bangladesh (AIUB), December 2017."),
    ("What is his educational background?",
     "B.Sc. in Computer Science & Engineering from American International University-Bangladesh (AIUB), December 2017."),
    ("His education", "B.Sc. in Computer Science & Engineering from American International University-Bangladesh (AIUB), December 2017."),

    ("What projects has Sharif worked on?",
     "Notable past projects include a Smart Cabin Router for in-flight connectivity, core Asterisk/FreeSWITCH VoIP development, a VoIP billing system, a worldwide virtual phone number service, and a SaaS platform for Remote Monitoring & Management (RMM)."),
    ("What has he built before?",
     "Notable past projects include a Smart Cabin Router for in-flight connectivity, core Asterisk/FreeSWITCH VoIP development, a VoIP billing system, a worldwide virtual phone number service, and a SaaS platform for Remote Monitoring & Management (RMM)."),
    ("His projects", "Notable past projects include a Smart Cabin Router for in-flight connectivity, core Asterisk/FreeSWITCH VoIP development, a VoIP billing system, a worldwide virtual phone number service, and a SaaS platform for Remote Monitoring & Management (RMM)."),

    ("What programming languages does Sharif know?",
     "PHP, Python, JavaScript, TypeScript, C/C++, Perl, and Shell."),
    ("What languages can Sharif code in?",
     "PHP, Python, JavaScript, TypeScript, C/C++, Perl, and Shell."),
    ("His programming languages", "PHP, Python, JavaScript, TypeScript, C/C++, Perl, and Shell."),

    ("What frameworks does Sharif use?",
     "Laravel, CodeIgniter, Django, React.js, Next.js, Angular, and Node.js."),
    ("His frameworks", "Laravel, CodeIgniter, Django, React.js, Next.js, Angular, and Node.js."),

    ("What are his skills?",
     "Cloud & infrastructure: AWS, Google Cloud, Docker, Kubernetes, Ansible, Jenkins. Languages: PHP, Python, JavaScript, TypeScript, C/C++, Perl, Shell. Frameworks: Laravel, CodeIgniter, Django, React.js, Next.js, Angular, Node.js."),
    ("His skills",
     "Cloud & infrastructure: AWS, Google Cloud, Docker, Kubernetes, Ansible, Jenkins. Languages: PHP, Python, JavaScript, TypeScript, C/C++, Perl, Shell. Frameworks: Laravel, CodeIgniter, Django, React.js, Next.js, Angular, Node.js."),
    ("Skills",
     "Cloud & infrastructure: AWS, Google Cloud, Docker, Kubernetes, Ansible, Jenkins. Languages: PHP, Python, JavaScript, TypeScript, C/C++, Perl, Shell. Frameworks: Laravel, CodeIgniter, Django, React.js, Next.js, Angular, Node.js."),

    ("What cloud and infrastructure tools does Sharif use?",
     "AWS, Google Cloud, Docker, Kubernetes, Ansible, and Jenkins."),
    ("Does Sharif know any cloud platforms?",
     "AWS, Google Cloud, Docker, Kubernetes, Ansible, and Jenkins."),
    ("Is Sharif experienced with Kubernetes or Docker?",
     "AWS, Google Cloud, Docker, Kubernetes, Ansible, and Jenkins."),

    ("Does Sharif have VoIP or telephony experience?",
     "Yes — core Asterisk/FreeSWITCH development, carrier integrations with DIDWW and DIDX, a VoIP billing system, and a worldwide virtual phone number service."),
    ("Is Sharif good with VoIP or Asterisk?",
     "Yes — core Asterisk/FreeSWITCH development, carrier integrations with DIDWW and DIDX, a VoIP billing system, and a worldwide virtual phone number service."),

    ("What is Sharif's email?",
     "sharif.aiub.20@gmail.com"),
    ("His email", "sharif.aiub.20@gmail.com"),
    ("How can I contact Sharif?",
     "By email at sharif.aiub.20@gmail.com."),
    ("What is Sharif's contact information?",
     "By email at sharif.aiub.20@gmail.com."),
    ("How can I reach him?", "By email at sharif.aiub.20@gmail.com."),
    ("How do I reach him?", "By email at sharif.aiub.20@gmail.com."),
    ("How to reach him", "By email at sharif.aiub.20@gmail.com."),
    ("His contact info", "By email at sharif.aiub.20@gmail.com."),
    ("Contact", "By email at sharif.aiub.20@gmail.com."),

    ("thanks", "You're welcome! Let me know if you have any other questions about Sharif."),
    ("thank you", "You're welcome! Let me know if you have any other questions about Sharif."),
    ("bye", "Thanks for stopping by! Feel free to reach out at sharif.aiub.20@gmail.com."),
]


def main():
    qa = DocQA()
    qa.ingest(str(RESUME_PDF))

    for question, answer in FAQS:
        qa.add_faq(question, answer)

    INDEX_PATH.parent.mkdir(parents=True, exist_ok=True)
    qa.save(str(INDEX_PATH))
    print(f"Indexed {RESUME_PDF.name} + {len(FAQS)} FAQ entries -> {INDEX_PATH}")


if __name__ == "__main__":
    main()
