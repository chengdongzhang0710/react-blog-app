import { Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import img404 from "@/assets/error.png";

const Article = () => {
  const navigate = useNavigate();
  const { channelStore, articleStore } = useStore();
  const [params, setParams] = useState({ page: 1, per_page: 10 });

  useEffect(() => {
    articleStore.loadList(params);
  }, [articleStore, params]);

  const onFinish = values => {
    const { status, channel_id, date } = values;
    const queryParams = {};
    queryParams.status = status;
    if (channel_id) {
      queryParams.channel_id = channel_id;
    } else {
      queryParams.channel_id = null;
    }
    if (date) {
      queryParams.begin_pubdate = date[0].format("YYYY-MM-DD");
      queryParams.end_pubdate = date[1].format("YYYY-MM-DD");
    } else {
      queryParams.begin_pubdate = null;
      queryParams.end_pubdate = null;
    }
    setParams({ ...params, ...queryParams, page: 1 });
  };

  const onPageChange = page => {
    setParams({ ...params, page });
  };

  const onDeleteArticle = async id => {
    await articleStore.deleteArticle(id);
    setParams({ ...params, page: 1 });
  };

  const onGoPublish = id => {
    navigate(`/publish?id=${ id }`);
  };

  const formatStatus = type => {
    const TYPES = {
      1: <Tag color="red">审核失败</Tag>,
      2: <Tag color="green">审核成功</Tag>,
    };
    return TYPES[type];
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: cover => {
        return <img src={ cover.images[0] || img404 } width="80" height="60" alt=""/>;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: type => formatStatus(type),
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      fixed: "right",
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={ <EditOutlined/> } onClick={ () => onGoPublish(data.id) }/>
            <Popconfirm title="是否确认删除?" okText="删除" cancelText="取消"
                        onConfirm={ () => onDeleteArticle(data.id) }>
              <Button type="primary" danger shape="circle" icon={ <DeleteOutlined/> }/>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={ { marginBottom: 20 } }
      >
        <Form initialValues={ { status: null } } onFinish={ onFinish }>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={ null }>全部</Radio>
              <Radio value={ 0 }>草稿</Radio>
              <Radio value={ 1 }>待审核</Radio>
              <Radio value={ 2 }>审核通过</Radio>
              <Radio value={ 3 }>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select placeholder="全部" style={ { width: 120 } }>
              { channelStore.channelList.map(item => {
                return <Select.Option key={ item.id } value={ item.id }>{ item.name }</Select.Option>;
              }) }
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <DatePicker.RangePicker locale={ locale }/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={ { marginLeft: 80 } }>筛选</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={ `根据筛选条件共查询到${ articleStore.count }条结果` }>
        <Table
          bordered
          rowKey="id"
          columns={ columns }
          dataSource={ articleStore.list }
          pagination={ {
            total: articleStore.count,
            pageSize: params.per_page,
            current: params.page,
            onChange: onPageChange,
          } }
        />
      </Card>
    </div>
  );
};

export default observer(Article);
