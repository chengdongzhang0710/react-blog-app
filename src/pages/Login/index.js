import { Button, Card, Checkbox, Form, Input, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  const onFinish = async values => {
    const { mobile, code } = values;
    try {
      await loginStore.login({ mobile, code });
      navigate("/");
    } catch (e) {
      message.error(e.response?.data?.message || "登录失败");
    }
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={ logo } alt=""/>
        <Form
          onFinish={ onFinish }
          validateTrigger={ ["onBlur", "onChange"] }
        >
          <Form.Item
            name="mobile"
            rules={ [
              { required: true, message: "手机号不能为空" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误", validateTrigger: "onBlur" },
            ] }
          >
            <Input size="large" placeholder="请输入手机号"/>
          </Form.Item>
          <Form.Item
            name="code"
            rules={ [
              { required: true, message: "验证码不能为空" },
              { len: 6, message: "验证码格式错误", validateTrigger: "onBlur" },
            ] }
          >
            <Input size="large" placeholder="请输入验证码"/>
          </Form.Item>
          <Form.Item name="agreement" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
