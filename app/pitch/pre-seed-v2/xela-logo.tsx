const XELA_LOGO_SRC = "/assets/partners/xela-robotics.png";

type PartnerLogoPadProps = {
  src: string;
  className?: string;
  imgClassName?: string;
};

/** Light pad so dark partner wordmarks read on dark deck backgrounds. */
export function PartnerLogoPad({
  src,
  className = "",
  imgClassName = "h-7 w-auto max-w-[120px] object-contain object-left",
}: PartnerLogoPadProps) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center justify-center rounded-md bg-[#f4f1ed] px-3 py-1.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden className={imgClassName} />
    </span>
  );
}

type XelaLogoProps = Omit<PartnerLogoPadProps, "src">;

export function XelaLogo({
  className = "",
  imgClassName = "h-7 w-auto max-w-[120px] object-contain object-left",
}: XelaLogoProps) {
  return (
    <PartnerLogoPad
      src={XELA_LOGO_SRC}
      className={className}
      imgClassName={imgClassName}
    />
  );
}
