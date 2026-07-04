import { useTranslation } from "react-i18next";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { SEOHead } from "@sudobility/seo_lib";
import { textVariants, ui, variants } from "@sudobility/design";
import { LIBRARIES } from "../config/constants";

interface AppProps {
  emailDomain: string;
  appName: string;
}

const INSTALL_SNIPPET = `# Install the design system + component library
bun add @sudobility/design @sudobility/components

# tailwind.config.js — map the semantic tokens
import { createTailwindPreset } from '@sudobility/design';
export default {
  presets: [createTailwindPreset()],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@sudobility/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
};

// Use design tokens instead of hardcoded classes
import { textVariants, ui } from '@sudobility/design';
<h1 className={textVariants.heading.display.xl()}>Hello</h1>`;

const DocsPage: React.FC<AppProps> = ({ appName }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <SEOHead
        title={`${t("docs.title")} - ${appName}`}
        description="Documentation for the Sudobility design system and its libraries."
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className={`${textVariants.heading.display.md()} mb-3`}>
          {t("docs.title")}
        </h1>

        {/* Overview */}
        <section className="mb-12">
          <h2 className={`${textVariants.heading.h3()} mb-3`}>
            {t("docs.overviewTitle")}
          </h2>
          <p
            className={`${textVariants.body.md()} text-muted-foreground max-w-3xl`}
          >
            {t("docs.overviewBody")}
          </p>
        </section>

        {/* How to use */}
        <section className="mb-12">
          <h2 className={`${textVariants.heading.h3()} mb-4`}>
            {t("docs.howToTitle")}
          </h2>
          <pre
            className={`${variants.dataDisplay.code.block()} overflow-x-auto`}
          >
            {INSTALL_SNIPPET}
          </pre>
        </section>

        {/* Libraries */}
        <section>
          <h2 className={`${textVariants.heading.h3()} mb-4`}>
            {t("docs.librariesTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {LIBRARIES.map((lib) => (
              <a
                key={lib.name}
                href={lib.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ui.background.surface} ${ui.border.default} group flex flex-col rounded-xl border p-6 transition-all duration-200 hover:shadow-lg`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3
                    className={`${textVariants.heading.h5()} break-all group-hover:text-primary transition-colors`}
                  >
                    {lib.name}
                  </h3>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
                </div>
                <p
                  className={`${textVariants.body.sm()} text-muted-foreground mb-4 flex-1`}
                >
                  {lib.desc}
                </p>
                <span className={textVariants.link.subtle()}>
                  View on GitHub →
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default DocsPage;
