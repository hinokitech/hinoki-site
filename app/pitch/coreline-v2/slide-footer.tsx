import { SlideFooter as BaseSlideFooter } from "../slides";

const CONFIDENTIAL_LABEL = "Confidential - Not for Redistribution";

export function SlideFooter({ pageLabel }: { pageLabel: string }) {
  return (
    <BaseSlideFooter pageLabel={pageLabel} confidential={CONFIDENTIAL_LABEL} />
  );
}
