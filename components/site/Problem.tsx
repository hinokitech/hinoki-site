import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, CellBar, Section, SectionHeader } from "./Cell";

export function Problem({ copy }: { copy: SiteCopy["problem"] }) {
  return (
    <Section id="problem">
      <Bento>
        <Cell className="p-6 md:col-span-6 md:p-8 lg:col-span-5">
          <SectionHeader id="problem" index="01" label={copy.label}>
            {copy.heading}
          </SectionHeader>
          <p className="text-pretty text-[16px] leading-[1.75] text-muted">{copy.body}</p>
        </Cell>

        <Cell className="flex flex-col md:col-span-6 lg:col-span-7">
          <CellBar aside={<span className="tabular-nums">03</span>}>Spec</CellBar>
          <div className="flex flex-1 items-center px-6 py-4 md:px-8">
            {/* On phones each row restacks: value and parameter, note beneath. */}
            <Table>
              <TableHeader className="max-md:hidden">
                <TableRow className="hover:bg-transparent">
                  <TableHead>Value</TableHead>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Note</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {copy.facts.map((fact) => (
                  <TableRow
                    key={fact.tag}
                    className="last:border-b-0 max-md:grid max-md:grid-cols-[auto_1fr] max-md:items-baseline max-md:gap-x-4 max-md:gap-y-2 max-md:py-5"
                  >
                    <TableCell className="whitespace-nowrap font-label text-[15px] tracking-[-0.01em] text-accent max-md:p-0 md:text-[17px]">
                      {fact.tag}
                    </TableCell>
                    <TableCell className="text-[15px] font-semibold text-ink max-md:p-0 md:min-w-[9rem]">
                      {fact.title}
                    </TableCell>
                    <TableCell className="text-[14px] leading-[1.6] text-muted max-md:col-span-2 max-md:p-0 md:min-w-[14rem]">
                      {fact.text}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Cell>
      </Bento>
    </Section>
  );
}
