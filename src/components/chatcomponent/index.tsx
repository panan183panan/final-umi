import React, { useState, useEffect, useRef } from 'react';
import Chat, { Bubble, useMessages } from '@chatui/core';
import { message as antmessage } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons'
import request from 'umi-request';
import '@chatui/core/dist/index.css';

const initialMessages = [
  {
    type: 'image',
    content: {
      picUrl: 'http://panan.xyz:8090/upload/image-qkmk.png',
    },
  },
  {
    type: 'text',
    content: { text: '我是9组的智能助理，您有什么疑问吗?~' },
    user: { avatar: '//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg' },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    // icon: 'message',
    name: '子组合',
    isNew: true,
    isHighlight: true,
  },
  {
    name: '股票',
    isNew: true,
  },
  {
    name: '特斯拉股票组合',
    isHighlight: true,
  }
];

const ChatComponent = () => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);
  // const [content, setContent] = useState<any[]>([])
  const content = useRef<any[]>([])
  // 发送回调
  const handleSend = (type: string, val: string) => {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });
      setTyping(true);
      // TODO: 发送请求
      fetchData(val)
    }
  }

  // 请求接口
  const fetchData = async (val: string) => {
    content.current.push({
      role: 'user',
      content: val
    })
    request('http://frontend.myhexin.com/kingfisher/robot/homeworkChat', {
      method: 'POST',
      data: {
        source: 'homework-47-fengjiawang',
        temperature: 0.8,
        token: '610EE45BF-Qtc2VydmU=',
        content: val,
        context: content.current
      }
    }).then((res: any) => {
      const { status_code, data } = res || {}
      if (status_code !== 0) {
        antmessage.error('请求失败')
        return
      }
      appendMsg({
        type: 'text',
        content: {
          text: data?.res || '请求失败'
        },
      });
      content.current.push({
        role: 'assistant',
        content: data?.res || ''
      })
    }).catch(err => {
      antmessage.warning('网络出错')
    }).finally(() => {
      setTyping(false)
    })
  }

  // 快捷短语回调，可根据 item 数据做出不同的操作，这里以发送文本消息为例
  const handleQuickReplyClick = (item: any) => {
    handleSend('text', item.name);
  }

  const renderMessageContent = (msg: any) => {
    const { type, content } = msg;
    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: '智能助理' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
      placeholder='请输入你的疑问'
      toolbar={[
        {
          type: 'image',
          icon: 'image',
          title: '相册'
        }
      ]}
      onToolbarClick={(item, ctx) => {
        // 如果点的是“相册”
        if (item.type === 'image') {
          console.log('image')
          // ctx.util.chooseImage({
          //   // multiple: true, // 是否可多选
          //   success(e) {
          //     if (e.files) { // 如果有 h5 上传的图
          //       const file = e.files[0];
          //       // 先展示图片
          //       ctx.appendMessage({
          //         type: 'image',
          //         content: {
          //           picUrl: URL.createObjectURL(file)
          //         },
          //         position: 'right'
          //       });

          //       // 发起请求，具体自行实现，这里以 OCR 识别后返回文本为例
          //       requestOcr({ file }).then(res => {
          //         ctx.postMessage({
          //           type: 'text',
          //           content: {
          //             text: res.text
          //           },
          //           quiet: true // 不展示
          //         });
          //       });

          //     } else if (e.images) { // 如果有 app 上传的图
          //       // ..与上面类似
          //     }
          //   },
          // });
        }
      }}
    />
  );
};

export default ChatComponent
