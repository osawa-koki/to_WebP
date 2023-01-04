import React, { useState } from "react";

import { Button, Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function ToWebP() {

  const [file, setFile] = useState<File | null>(null);

  return (
    <Layout>
      <main>
        <div>
          <Form.Group>
            <Form.Label>Put Image file.</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </div>
      </main>
    </Layout>
  );
};
