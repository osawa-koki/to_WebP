import React, { useState, useEffect } from "react";

import { Button, ListGroup , Form, Alert } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

function Ext2Webp(filename: string) {
  const ext = filename.split(".").pop();
  if (ext === undefined) {
    return filename;
  }
  return `${filename.slice(0, -ext.length)}webp`;
}

export default function ToWebP() {

  const [uris, setUris] = useState<Map<string, string>>(new Map());
  const [files, setFiles] = useState<File[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const FileLoad = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files) as File[];
    setFiles(files);
  };

  const Cenvert = async () => {
    try {
      setError(null);
      setLoading(true);
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      await fetch(`${setting.apiBasePath}/api/to-webp`, {
        method: "POST",
        body: formData,
      })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to convert.");
        }
        return res.json();
      })
      .then((res) => {
        const map = new Map<string, string>();
        Object.keys(res).forEach((key) => {
          map.set(key, res[key]);
        });
        setUris(map);
        setLoading(false);
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
            <Button variant="outline-primary" onClick={Cenvert} disabled={loading}>
              {
                loading ? <>Converting...</> :  <>🐍 Convert 🐍</>
              }
            </Button>
          </div>
        }
        {
          uris.size > 0 &&
          <div id="UrisDiv" className="box">
            <ListGroup>
              {
                Array.from(uris.entries()).map(([key, value], index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <a href={`${setting.apiBasePath}/api/webp/${value}`} download={`${Ext2Webp(key)}`}>download - {key}</a>
                    </ListGroup.Item>
                  );
                })
              }
            </ListGroup>
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
