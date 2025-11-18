import React, { useEffect, useState } from "react";
import axios from "../../autenticacao/axios"; // seu axios customizado
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Spinner,
  Modal,
  Card,
} from "react-bootstrap";

export default function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    nome_completo: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
    funcao: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 🔹 Carregar funcionário ao abrir a página
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`/administrador/funcionario/api/${id}/`);
        setFormData({
          email: response.data.email,
          nome_completo: response.data.nome_completo,
          cpf: response.data.cpf,
          data_nascimento: response.data.data_nascimento,
          telefone: response.data.telefone,
          funcao: response.data.funcao,
          password: "",
        });
      } catch (err: any) {
        setError("Erro ao carregar dados");
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  // 🔹 Atualizar formulário
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Enviar atualização
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await axios.put(`/administrador/funcionario/api/${id}/`, formData);
      navigate("/painel/admin/funcionarios");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Erro ao salvar informações.");
      setShowModal(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p className="mt-2">Carregando funcionário...</p>
      </div>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      
      <h3 className="mb-2 d-flex align-items-center gap-2 text-primary">
          Editar Funcionário
      </h3>
      <hr style={{color: "#0c0b0bff"}}/>

        <div className="col-md-12 mb-3">
          <Form.Group className="mt-2">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>
      <Form onSubmit={handleSubmit}>
        <div className="row">
        <div className="col-md-6 mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
        </div>

        <div className="col-md-6 mb-4">
            <Form.Label>Nova Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Caso não queira mudar a senha repita a atual"
              value={formData.password}
              onChange={handleChange}
            />
        </div>

        <div className="col-md-6 mb-4">
          <Form.Label>CPF</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-4">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-4">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-4">
          <Form.Label>Função</Form.Label>
          <Form.Control
            type="text"
            name="funcao"
            value={formData.funcao}
            onChange={handleChange}
          />
        </div>
        <hr />
        <Button
          variant="primary"
          type="submit"
          disabled={saving}
          className="px-4 mt-3"
        >
          {saving ? (
            <>
              <Spinner size="sm" animation="border" /> Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
        </div>
      </Form>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ color: "red" }}
        >
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}
