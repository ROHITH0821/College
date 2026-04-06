import type { ImgHTMLAttributes } from "react";

export const SITE_LOGO_SRC = "/cmrec-logo.png";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src">;

/** Official college logo (`/public/cmrec-logo.png`). Plain `<img>` so it always paints; `next/image` + `fill` inside links can size to zero. */
export function SiteLogo({
  alt = "CMR Engineering College",
  width = 320,
  height = 80,
  loading = "eager",
  decoding = "async",
  draggable = false,
  ...rest
}: Props) {
  return (
    <img
      src={SITE_LOGO_SRC}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      draggable={draggable}
      {...rest}
    />
  );
}
