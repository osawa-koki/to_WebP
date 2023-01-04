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
      img.src = result;
      img.onload = () => {
        const canvas = document.getElementById("MyCanvas") as HTMLCanvasElement;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/webp");
        const blob = dataURLtoBlob(dataURL);
        const file = new File([blob], "test.webp", { type: "image/webp" });
        console.log(file);
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
