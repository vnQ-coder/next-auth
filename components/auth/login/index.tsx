import Layout from "../layout";
import Form from "./Form";

const Login = ({ locale }: any) => {
  return (
    <Layout>
      <Form locale={locale?.params?.locale} />
    </Layout>
  );
};

export default Login;
