import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionTag } from "./Cell";
import { ContactForm } from "./ContactForm";
import { EmailCopy } from "./EmailCopy";

export function Contact({ copy }: { copy: SiteCopy["contact"] }) {
  return (
    <Section id="contact" className="mb-24 md:mb-32">
      <Bento>
        <Cell className="flex flex-col gap-8 p-6 md:col-span-6 md:p-10 lg:col-span-7">
          <SectionTag index="07" label={copy.label} />
          <h2
            id="contact-title"
            className="font-display text-[clamp(3.25rem,7vw,6.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-ink wdth-125"
          >
            {copy.heading}
          </h2>
          <p className="max-w-[54ch] text-pretty text-[16px] leading-[1.75] text-muted md:text-[17px]">
            {copy.body}
          </p>
          <Table className="mt-auto">
            <TableBody>
              <TableRow className="border-t">
                <TableCell className="w-28 whitespace-nowrap pt-5 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                  Email
                </TableCell>
                <TableCell>
                  <EmailCopy email={copy.email} />
                </TableCell>
              </TableRow>
              <TableRow className="last:border-b-0">
                <TableCell className="w-28 whitespace-nowrap pt-5 font-label text-[10px] uppercase tracking-[0.16em] text-faint">
                  Location
                </TableCell>
                <TableCell className="text-[15px] leading-[1.5] text-ink">{copy.location}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Cell>

        <Cell className="flex flex-col md:col-span-6 lg:col-span-5">
          <CellBar>{copy.heading}</CellBar>
          <div className="flex-1 p-6 md:p-10">
            <ContactForm />
          </div>
        </Cell>
      </Bento>
    </Section>
  );
}
