import React, { useState } from "react";
import api from "../autenticacao/axios"; // 👈 novo import
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";

export default function AdicionarResponsavel() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome_completo: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await api.post("responsavel/api/", formData);

      setSuccess(`Responsavel ${response.data.nome_completo} adicionado com sucesso!`);
      setFormData({
        email: "",
        password: "",
        nome_completo: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
      });
    } catch (err: any) {
      console.error("Erro ao adicionar responsável:", err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Erro ao adicionar responsavel. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-2">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-4">
          <h5 className="text-primary mt-1 text-center">
            Preencha os dados abaixo para cadastrar um novo responsável.
          </h5>
          <hr className="mt-4 py-2 text-primary" />  
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-3">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  type="text"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-12 text-center mt-4">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
