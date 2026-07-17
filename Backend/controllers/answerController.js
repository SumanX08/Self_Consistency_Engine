import { orchestrate } from "../orchestrator.js";
import { sendEvent } from "../utils/sseManager.js";

export async function generateAnswer(req, res) {
  try {
    const { question, clientId } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "clientId is required.",
      });
    }

    const result = await orchestrate(question, {
      onModelStart(provider) {
        sendEvent(clientId, {
          type: "model_start",
          provider,
        });
      },

      onModelComplete(response) {
        sendEvent(clientId, {
          type: "model_complete",
          response,
        });
      },

      onEvaluationStart() {
        sendEvent(clientId, {
          type: "evaluation_start",
        });
      },

      onEvaluationComplete(answer) {
        sendEvent(clientId, {
          type: "evaluation_complete",
          answer,
        });
      },

      onError(error) {
        sendEvent(clientId, {
          type: "error",
          error,
        });
      },
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}