import PyPDF2
import docx
import io

def extract_text(filename, content):
    if filename.endswith(".pdf"):
        reader = PyPDF2.PdfReader(io.BytesIO(content))
        return "\n".join([page.extract_text() for page in reader.pages])

    elif filename.endswith(".docx"):
        doc = docx.Document(io.BytesIO(content))
        return "\n".join([p.text for p in doc.paragraphs])

    return "Unsupported file"