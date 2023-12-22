export default function getAbortSignal(): { timeout: NodeJS.Timeout, signal: AbortSignal } {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);
  return { timeout: timeout, signal: controller.signal };
}