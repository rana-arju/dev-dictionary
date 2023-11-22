import Image from "next/image";
import Link from "next/link";

interface MetricProps {
  imgUrl: string;
  title: string;
  alt: string;
  value: number | string;
  href?: string;
  textStyles: string;
  isAuthor?: boolean;
}

function Metric({
  imgUrl,
  title,
  alt,
  value,
  href,
  textStyles,
  isAuthor,
}: MetricProps) {
  const MatricContent = (
    <>
      <Image
        src={imgUrl}
        height={16}
        width={16}
        alt={alt}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    <Link href={href} className="flex-center gap-1">
      {MatricContent}
    </Link>;
  }
  return <div className="flex-center flex-wrap gap-1">{MatricContent}</div>;
}

export default Metric;
