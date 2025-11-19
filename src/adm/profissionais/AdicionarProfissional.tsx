import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Spinner, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdicionarProfissional() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nome_completo: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("access");
      const response = await axios.post(
        "http://192.168.3.128:8000/administrador/profissional/api/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // mensagem que vai aparecer no modal
      setSuccessMessage(
        'Profissional adicionado com sucesso!'
      );

      // exibe modal
      setShowModal(true);

      // limpa formulário
      setFormData({
        email: "",
        password: "",
        nome_completo: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
      });
    } catch (err: any) {
      setError("Erro ao adicionar profissional. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/painel/admin/profissionais"); // redireciona após clicar em OK
  };

  return (
    <div className="p-2">
      <Card className="shadow-lg border-0">
        <Card.Body className="p-4">
          <h4 className="text-primary mt-1 text-center text-uppercase">
            Preencha os dados abaixo para cadastrar um novo profissional.
          </h4>
          <hr className="mt-4 py-2 text-primary" />

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

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

            <hr />

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
          </Form>
        </Card.Body>
      </Card>

        {/* MODAL DE SUCESSO MELHORADO */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Body className="text-center p-5">

            {/* Ícone verde */}
            <div
              style={{
                fontSize: "70px",
                color: "#0d6efd",
              }}
            >
              ✓
            </div>

            <h3 className="mt-3 text-primary" style={{ fontWeight: "bold" }}>
              Cadastro Realizado!
            </h3>

            <p className="mt-3 mb-4" style={{ fontSize: "18px", color: "#333" }}>
              {successMessage}
            </p>

            <Button
              variant="primary"
              size="lg"
              className="px-5"
              onClick={handleCloseModal}
              style={{
                borderRadius: "10px",
                fontSize: "18px",
                padding: "10px 30px",
              }}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal>

    </div>
  );
}
