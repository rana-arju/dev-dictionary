import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
  title: string;
  href?: string;
  imgUrl: string;
}
function ProfileLink({ title, imgUrl, href }: ProfileLinkProps) {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} height={20} width={20} alt="icon" />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-500 paragraph-medium"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
}

export default ProfileLink;
