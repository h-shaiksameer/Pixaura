import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
export const metadata: Metadata = { title: "Cookie policy" };
export default function Cookies() { return <InfoPage title="Cookie policy" intro="This page explains how cookies may be used on Pixaura."><section><h2 className="text-xl font-bold text-ink">Essential storage</h2><p>The app may use browser storage for interface preferences such as dark mode. Image files are not saved there.</p></section><section><h2 className="text-xl font-bold text-ink">Advertising and analytics</h2><p>When those services are enabled, they may set cookies or similar identifiers. Add the final provider names and consent choices here before publishing ads.</p></section></InfoPage>; }
