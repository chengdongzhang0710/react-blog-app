import { Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

const Publish = () => {
  const { channelStore, articleStore } = useStore();
  const fileListRef = useRef([]);
  const [fileList, setFileList] = useState([]);
  const [imgCount, setImgCount] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const articleId = searchParams.get("id");

  useEffect(() => {
    const retrieveForm = async () => {
      const res = await articleStore.getArticle(articleId);
      const formValue = res.data;
      const imgType = formValue.cover.type > 1 ? 3 : formValue.cover.type;
      form.setFieldsValue({ ...formValue, type: imgType });
      const formatList = formValue.cover.images.map(item => ({ url: item }));
      setImgCount(formValue.cover.type);
      setFileList(formatList);
      fileListRef.current = formatList;
    };
    if (articleId) {
      retrieveForm();
    }
  }, [articleStore, articleId, form]);

  const onUploadChange = value => {
    const formatList = value.fileList.map(item => {
      if (item.response) {
        return { url: item.response.data.url };
      }
      return item;
    });
    setFileList(formatList);
    fileListRef.current = formatList;
  };

  const onRadioChange = e => {
    const count = e.target.value;
    setImgCount(count);
    if (fileListRef.current.length > 0) {
      if (count === 1) {
        setFileList([fileListRef.current[0]]);
      }
      if (count === 3) {
        setFileList([...fileListRef.current]);
      }
    }
  };

  const onFormFinish = values => {
    const params = {
      ...values,
      cover: { type: values.type, images: fileList.map(item => item.url) },
    };
    if (articleId) {
      articleStore.modifyArticle(articleId, params);
    } else {
      articleStore.uploadArticle(params);
    }
    navigate("/article");
    message.success(`${ articleId ? "更新成功" : "发布成功" }`);
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{ articleId ? "更新文章" : "发布文章" }</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          form={ form }
          labelCol={ { span: 4 } }
          wrapperCol={ { span: 16 } }
          initialValues={ { type: 1, content: "" } }
          onFinish={ onFormFinish }
        >
          <Form.Item
            label="标题"
            name="title"
            rules={ [{ required: true, message: "请输入文章标题" }] }
          >
            <Input placeholder="请输入文章标题" style={ { width: 400 } }/>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={ [{ required: true, message: "请选择文章频道" }] }
          >
            <Select placeholder="请选择文章频道" style={ { width: 400 } }>
              { channelStore.channelList.map(item => {
                return <Select.Option key={ item.id } value={ item.id }>{ item.name }</Select.Option>;
              }) }
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={ onRadioChange }>
                <Radio value={ 1 }>单图</Radio>
                <Radio value={ 3 }>三图</Radio>
                <Radio value={ 0 }>无图</Radio>
              </Radio.Group>
            </Form.Item>
            { imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-upload"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                multiple={ imgCount > 1 }
                maxCount={ imgCount }
                fileList={ fileList }
                onChange={ onUploadChange }
              >
                <div style={ { marginTop: 8 } }><PlusOutlined/></div>
              </Upload>
            ) }
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={ [{ required: true, message: "请输入文章内容" }] }
          >
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容"/>
          </Form.Item>
          <Form.Item wrapperCol={ { offset: 4 } }>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                { articleId ? "更新文章" : "发布文章" }
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default observer(Publish);
