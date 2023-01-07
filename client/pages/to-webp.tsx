import React, { useState, useEffect } from "react";

import { Button, ListGroup , Form, Alert } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function ToWebP() {

  const [files, setFiles] = useState<File[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  const FileLoad = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files) as File[];
    setFiles(files);
  };

  const Cenvert = async () => {
    try {
      setError(null);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      await fetch("http://localhost:8080/api/to-webp", {
        method: "POST",
        body: formData,
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to convert.");
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.zip";
        a.click();
      });
    } catch (error) {
      setError(error.message);
    }
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
          <div id="ButtonDiv" className="center box">
            <Button variant="outline-primary" onClick={Cenvert}>Convert 🐍</Button>
          </div>
        }
        {
          error &&
          <Alert variant="danger" className="box">
            {error}
          </Alert>
        }
      </main>
    </Layout>
  );
};
