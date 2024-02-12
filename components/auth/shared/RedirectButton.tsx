import Link from "next/link";
import { useTranslations } from "next-intl";

const RedirectButton = ({ href, text }: { href: string; text: string }) => {
  const t = useTranslations("auth");
  return (
    <p className="flex justify-end mt-4">
      <Link
        href={href}
        className="text-fontPrimary text-sm hover:text-fontPrimary hover:underline"
      >
        {t(text)}
      </Link>
    </p>
  );
};

export default RedirectButton;
