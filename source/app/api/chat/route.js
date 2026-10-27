const PAGEWISE_API_URL = process.env.PAGEWISE_API_URL || "http://127.0.0.1:8000";
const MAX_QUESTION_LENGTH = 300;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question) {
    return Response.json({ error: "Question is required." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return Response.json({ error: "Question is too long." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(`${PAGEWISE_API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return Response.json(
        { found: false, answer: "The assistant couldn't process that question. Please try rephrasing it." },
        { status: 502 }
      );
    }

    const data = await res.json();
    let answer = data.answer ?? null;

    // The resume PDF is bullet-heavy, so pagewise's sentence picker sometimes
    // extracts a single stray word (e.g. "Sharif", "years") from a document
    // match. Its full chunk ("context") reads far better, so prefer it
    // whenever the picked sentence is too short to stand on its own.
    if (data.source === "document" && answer && answer.trim().split(/\s+/).length <= 3 && data.context) {
      answer = data.context;
    }

    return Response.json({
      found: Boolean(data.found),
      answer,
      page: data.page ?? null,
    });
  } catch {
    return Response.json(
      {
        found: false,
        answer:
          "The Q&A assistant is offline right now. Please reach out directly at sharif.aiub.20@gmail.com.",
      },
      { status: 503 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
