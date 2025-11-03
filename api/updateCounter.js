export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GH_TOKEN; // ⚠️ Lo pondremos en Vercel
  const username = "koalami";
  const repo = "GB_DEVS";
  const branch = "main";
  const filePath = "update_trigger.json";
  const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/${filePath}`;

  try {
    // 1️⃣ Obtener el archivo actual (para conseguir su SHA)
    const getRes = await fetch(apiUrl);
    const fileData = await getRes.json();

    // 2️⃣ Crear nuevo contenido con marca de tiempo
    const newContent = { last_trigger: Date.now() };

    // 3️⃣ Actualizar el archivo en el repo (esto activa tu workflow)
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: "Trigger update",
        content: Buffer.from(JSON.stringify(newContent, null, 2)).toString("base64"),
        sha: fileData.sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      console.error("Error al actualizar:", errText);
      return res.status(500).json({ error: "Failed to update file", details: errText });
    }

    res.status(200).json({ success: true, message: "Contador actualizado correctamente" });
  } catch (err) {
    console.error("Error general:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
