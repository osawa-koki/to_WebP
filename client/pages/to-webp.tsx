import React, { useState, useEffect } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function ToWebP() {

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target as FileReader;
      const result = target.result;
      if (!result) return;
      const img = new Image();
      img.src = result as string;
      img.onload = () => {
        const canvas = document.getElementById("MyCanvas") as HTMLCanvasElement;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        // fetch
        const apiUrl = '/api/to-webp';
        // Canvas の imageData を base64 エンコードした文字列を取得する
        const imageData = canvas.toDataURL('image/webp').split(',')[1];
        // base64 エンコードされた文字列を Uint8Array に変換する
        const bin = atob(imageData);
        const buffer = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) {
          buffer[i] = bin.charCodeAt(i);
        }

        // Uint8Array を Blob に変換する
        const blob = new Blob([buffer.buffer], { type: 'image/webp' });
        // FormData オブジェクトを作成する
        const formData = new FormData();
        formData.append('file', blob, 'image.webp');

        const init: RequestInit = {
          method: 'POST',
          body: formData,
        };

        fetch(apiUrl, init)
        .then((res) => {
          // API のレスポンスを処理する
        })
        .catch((err) => {
          // エラーを処理する
        });
      }
    };
    reader.readAsDataURL(file);
  }, [file]);

  const FileLoad = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  return (
    <Layout>
      <main>
        <div>
          <Form.Group>
            <Form.Label>Put Image file.</Form.Label>
            <Form.Control onInput={FileLoad} type="file" />
          </Form.Group>
        </div>
        <div id="MyCanvasDiv">
          <canvas id="MyCanvas"></canvas>
        </div>
      </main>
    </Layout>
  );
};
