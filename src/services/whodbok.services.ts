import axios from "axios";
import logger from "../utils/logger";

const endpoint = process.env.WHODBOK_ENDPOINT;
const apikey = process.env.WHODBOK_API_KEY;

export async function sendLogToWhodbok(event: any) {
  if (!endpoint || !apikey) {
    logger.warn("Whodbok não configurado. Ignorando envio de logs.");
    return;
  }

  try {
    await axios.post(
      endpoint,
      { event, bot: "Uchiha-Bot v10.0.1", timestamp: Date.now() },
      { headers: { Authorization: `Bearer ${apikey}`, "Content-Type": "application/json" } }
    );
    logger.info("Log enviado para Whodbok");
  } catch (err: any) {
    logger.error(`Falha ao enviar log para Whodbok: ${err.response?.data || err.message}`);
  }
}
