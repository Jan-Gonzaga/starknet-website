import { Footer, Props } from "../(components)/Footer";
import { useLocale, useTranslations } from "next-intl";
import { getPageByPage } from "src/data/pages";
import { NextIntlClientProvider } from "next-intl/client";
import { getMainMenu, transformMainMenu } from "src/data/settings/main-menu";

// @ts-expect-error Server Component
export async function FooterServer(): JSX.Element {
  const t = useTranslations();
  const locale = useLocale();
  const mainMenu = await transformMainMenu(
    await getMainMenu(locale),
    async (page) => {
      return {
        ...page,
        title: (await getPageByPage(page.page, locale)).title,
      } as Props["mainMenu"]["pages"][number];
    }
  );

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{
        search: t("search"),
      }}
    >
      <Footer mainMenu={mainMenu} />
    </NextIntlClientProvider>
  );
}