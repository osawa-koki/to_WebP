import React, { useState, useEffect } from "react";

import { Button, ListGroup , Form } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function ToWebP() {

  const [files, setFiles] = useState<File[] | null>([]);

  const FileLoad = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files) as File[];
    setFiles(files);
  };

  const Cenvert = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    fetch("/api/to-webp", {
      method: "POST",
      body: formData,
    })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.zip";
      a.click();
    });
  };

  return (
    <Layout>
      <main>
        <div>
          <Form.Group>
            <Form.Label>Put Image file.</Form.Label>
            <Form.Control onInput={FileLoad} type="file" multiple />
          </Form.Group>
        </div>
        <div id="FilesDiv">
          <ListGroup className="box">
            {
              files.map((file, index) => {
                return (
                  <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
                );
              })
            }
          </ListGroup>
        </div>
        {
          files.length > 0 &&
          <div id="ButtonDiv" className="center box" onClick={Cenvert}>
            <Button variant="outline-primary">Convert 🐍</Button>
          </div>
        }
      </main>
    </Layout>
  );
};
