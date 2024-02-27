// pages/api/readAndSave.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function readAndSave(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // 执行读取操作
    try {
      const response = await fetch('http://zjjbst.club:3002/read', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('读取请求失败:', error);
      return res.status(500).json({ message: '服务器内部错误' });
    }
  } else {
    // 执行写入操作
    try {
      const { content } = req.body || {}; // 从请求体中获取content，非GET请求需要包含请求体

      const response = await fetch('http://zjjbst.club:3002/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // 将content作为请求体发送
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('写入请求失败:', error);
      return res.status(500).json({ message: '服务器内部错误' });
    }
  }
}
