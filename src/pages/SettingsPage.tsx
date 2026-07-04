import { useTranslation } from "react-i18next";
import {
  useTheme,
  Theme,
  FontSize,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sudobility/components";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui } from "@sudobility/design";
import ThemeSwitcher from "../components/internal/ThemeSwitcher";

interface AppProps {
  emailDomain: string;
  appName: string;
}

/** A labeled settings row: title/description on the left, control on the right. */
function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${ui.background.surface} ${ui.border.default} flex flex-col gap-4 rounded-lg border p-6 sm:flex-row sm:items-center sm:justify-between`}
    >
      <div>
        <h3 className={`${textVariants.heading.h5()} mb-1`}>{title}</h3>
        {description && (
          <p className={`${textVariants.body.sm()} text-muted-foreground`}>
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

const SettingsPage: React.FC<AppProps> = ({ appName }) => {
  const { t } = useTranslation("common");
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  return (
    <>
      <SEOHead
        title={`${t("settings.title")} - ${appName}`}
        description="Appearance settings"
      />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className={`${textVariants.heading.display.md()} mb-2`}>
          {t("settings.title")}
        </h1>
        <p className={`${textVariants.body.md()} text-muted-foreground mb-8`}>
          {t("settings.appearance")}
        </p>

        <div className="space-y-4">
          {/* Light / Dark theme */}
          <SettingRow title={t("settings.theme")}>
            <Select
              value={theme}
              onValueChange={(value) => setTheme(value as Theme)}
            >
              <SelectTrigger
                aria-label={t("settings.theme")}
                className="min-w-[10rem]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Theme.LIGHT}>
                  {t("settings.light")}
                </SelectItem>
                <SelectItem value={Theme.DARK}>{t("settings.dark")}</SelectItem>
                <SelectItem value={Theme.SYSTEM}>
                  {t("settings.system")}
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>

          {/* Font size */}
          <SettingRow title={t("settings.fontSize")}>
            <Select
              value={fontSize}
              onValueChange={(value) => setFontSize(value as FontSize)}
            >
              <SelectTrigger
                aria-label={t("settings.fontSize")}
                className="min-w-[10rem]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={FontSize.SMALL}>
                  {t("settings.small")}
                </SelectItem>
                <SelectItem value={FontSize.MEDIUM}>
                  {t("settings.medium")}
                </SelectItem>
                <SelectItem value={FontSize.LARGE}>
                  {t("settings.large")}
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingRow>

          {/* Design theme (palette) */}
          <SettingRow title={t("settings.designTheme")}>
            <ThemeSwitcher />
          </SettingRow>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
