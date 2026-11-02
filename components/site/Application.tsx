import { buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionHeader } from "./Cell";

export function Application({ copy }: { copy: SiteCopy["application"] }) {
  return (
    <Section id="application">
      <SectionHeader id="application" index="04" label={copy.label}>
        {copy.heading}
      </SectionHeader>
      <Bento>
        <Cell className="flex flex-col gap-8 p-6 md:col-span-6 md:p-8 lg:col-span-7">
          <p className="max-w-[62ch] text-pretty text-[16px] leading-[1.75] text-muted">{copy.body}</p>

          <Table>
            <TableBody>
              {copy.values.map((value) => (
                <TableRow key={value.label} className="first:border-t">
                  <TableCell className="w-44 whitespace-nowrap pt-5 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                    {value.label}
                  </TableCell>
                  <TableCell className="text-[16px] leading-[1.5] text-ink">{value.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <p className="max-w-[62ch] text-[14px] leading-[1.7] text-muted">{copy.safetyNote}</p>

          <div className="border-t border-white/[0.06] pt-6">
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-faint">
              {copy.alsoSuited.label}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {copy.alsoSuited.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-[1.5] text-ink">
                  <span aria-hidden className="font-label text-accent">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Cell>

        <Cell className="flex flex-col md:col-span-6 lg:col-span-5">
          <CellBar>{copy.offer.title}</CellBar>
          <div className="flex flex-1 flex-col gap-8 p-6 md:p-8">
            <h3 className="font-display text-[26px] font-bold leading-[1.05] tracking-[-0.025em] text-ink wdth-112">
              {copy.offer.title}
            </h3>
            <Table>
              <TableBody>
                {copy.offer.rows.map((row) => (
                  <TableRow key={row.term} className="first:border-t">
                    <TableCell className="w-28 whitespace-nowrap pt-5 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                      {row.term}
                    </TableCell>
                    <TableCell className="text-[15px] leading-[1.55] text-ink">{row.detail}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <a href="#contact" className={buttonVariants({ className: "mt-auto self-start" })}>
              {copy.offer.cta}
            </a>
          </div>
        </Cell>
      </Bento>
    </Section>
  );
}
