import {
  addClient,
  removeClient,
} from "../utils/sseManager.js";

export function streamAnswers(req, res) {
  const { clientId } = req.query;

  if (!clientId) {
    return res.status(400).json({
      success: false,
      message: "clientId is required",
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  addClient(clientId, res);

  // Optional: notify frontend that connection is ready
  res.write(
    `data: ${JSON.stringify({
      type: "connected",
    })}\n\n`
  );

  req.on("close", () => {
    removeClient(clientId);
  });
}