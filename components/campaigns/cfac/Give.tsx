import { cx } from "../../cx.ts";
import { CfacDonateForm } from "./DonateForm.tsx";
import { CfacFaq } from "./Faq.tsx";
import { CFAC_FRAME, CFAC_SECTION } from "./layout.ts";
import { CFAC } from "./content.ts";

/**
 * CFAC "Give in a Way That Works for You" (`#donate`), cloned from
 * cfac-landing-page's donate section: a light-weight display intro, then
 * two columns from `lg` — Tax-Deductible Giving copy + `CfacFaq` on the
 * left, the `CfacDonateForm` card on the right. Every DONATE link on the
 * page targets this section.
 */
export function CfacGive() {
  const { give } = CFAC;
  return (
    <section
      id="donate"
      className={cx("scroll-mt-20 bg-surface-container-low", CFAC_SECTION)}
    >
      <div className={CFAC_FRAME}>
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extralight tracking-tight text-primary md:text-5xl">
            {give.title}
          </h2>
          <p className="mt-6 text-lg font-light text-primary md:text-xl">
            {give.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <h3 className="text-4xl font-bold leading-10 text-primary">
                {give.tax.title}
              </h3>
              <p className="text-lg leading-7 text-primary">{give.tax.body}</p>
              <p className="text-sm text-on-surface-variant">
                {give.tax.footnote}
              </p>
            </div>
            <CfacFaq items={give.faqs} />
          </div>
          <CfacDonateForm />
        </div>
      </div>
    </section>
  );
}

export default CfacGive;
