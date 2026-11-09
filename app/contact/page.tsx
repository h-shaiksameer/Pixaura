import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { siteConfig } from "@/lib/siteConfig";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() { return <InfoPage title={`Contact ${siteConfig.name}`} intro="Found a problem or have an idea? We would like to hear from you."><section><h2 className="text-xl font-bold text-ink">Support and feedback</h2><p>Email us at <a className="font-semibold text-emerald-700" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p></section><section><h2 className="text-xl font-bold text-ink">Include useful details</h2><p>Tell us which browser you used, the tool settings, and the kind of image involved. Please do not email sensitive images unless you have permission to share them.</p></section></InfoPage>; }
