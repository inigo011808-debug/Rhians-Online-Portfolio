export { cn } from "cn"

/**
 * Gmail compose URL with the recipient pre-filled in the To field.
 * Shared by every email CTA (Contact me button, social icon, address link)
 * so they all behave identically and can never drift apart.
 */
export function gmailComposeUrl(email: string): string {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
}
