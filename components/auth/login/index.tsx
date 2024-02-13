import Form from "./Form";
import { useTranslations } from "next-intl";
import LeftContent from "../shared/LeftContent";
import Layout from "../layout";
import RightContent from "../shared/RightBar";
import RedirectButton from "../shared/RedirectButton";

type LoginProps = {
  params: {
    params: { locale: string };
  };
};

const Login = ({ params }: LoginProps) => {
  const t = useTranslations("auth");
  return (
    <Layout
      RightContent={
        <RightContent
          title={t("welcome")}
          loginSubTitle1={t("description1")}
          loginSubTitle2={t("description2")}
          loginSubTitle3={t("description3")}
          description={t("description")}
        />
      }
    >
      <LeftContent title={t("login")} description={t("welcome")} />
      <Form locale={params?.params?.locale} />
      <RedirectButton href={`forgotPassword`} text="forgot-password?" />
    </Layout>
  );
};

export default Login;
