import "server-only";

import { unstable_cache } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

export type SiteSettings = {
  newsletterPopupEnabled: boolean;
  newsletterPopupRevision: number;
};

const defaultSettings: SiteSettings = {
  newsletterPopupEnabled: true,
  newsletterPopupRevision: 1
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const supabase = createSupabaseServerClient();

    if (!supabase) {
      return defaultSettings;
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("newsletter_popup_enabled, newsletter_popup_revision")
      .eq("id", "global")
      .maybeSingle();

    if (error || !data) {
      return defaultSettings;
    }

    return {
      newsletterPopupEnabled: data.newsletter_popup_enabled,
      newsletterPopupRevision: data.newsletter_popup_revision
    };
  },
  ["align-site-settings"],
  {
    tags: ["site-settings"],
    revalidate: 300
  }
);
