import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SiteCopy } from "@/content/site.en";
import { Bento, Cell, Section, SectionHeader } from "./Cell";

export function Progress({ copy }: { copy: SiteCopy["progress"] }) {
  return (
    <Section id="progress" className="relative">
      {/* The one ember glow on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 top-1/3 -z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 70% at 55% 100%, var(--color-ember), transparent 70%)",
        }}
      />
      <div className="relative">
        <SectionHeader id="progress" index="05" label={copy.label}>
          {copy.heading.lead} <span className="text-grad">{copy.heading.accent}</span>
        </SectionHeader>
        <Bento>
          <Cell className="bg-lift/80 px-6 py-2 md:col-span-6 md:px-8 lg:col-span-12">
            {/* On phones each row restacks: status and date, milestone beneath. */}
            <Table>
              <TableHeader className="max-md:hidden">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-36">Status</TableHead>
                  <TableHead className="w-36">Date</TableHead>
                  <TableHead>Milestone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {copy.milestones.map((m) => (
                  <TableRow
                    key={`${m.date} ${m.text}`}
                    className={`last:border-b-0 max-md:grid max-md:grid-cols-[auto_1fr] max-md:items-center max-md:gap-x-4 max-md:gap-y-3 max-md:py-5 ${
                      m.current ? "bg-accent/[0.04]" : ""
                    }`}
                  >
                    <TableCell className="max-md:p-0">
                      <Badge variant={m.current ? "live" : "status"}>
                        {m.current ? (
                          <span
                            aria-hidden
                            className="size-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none"
                          />
                        ) : null}
                        {m.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap font-label text-[12px] tabular-nums tracking-[0.06em] text-accent max-md:p-0">
                      {m.date}
                    </TableCell>
                    <TableCell className="text-[15px] leading-[1.55] text-ink max-md:col-span-2 max-md:p-0 md:text-[16px]">
                      {m.text}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Cell>
        </Bento>
      </div>
    </Section>
  );
}
