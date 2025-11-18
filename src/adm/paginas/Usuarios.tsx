import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, Table, Modal, Button } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import api from "../../autenticacao/axios";
import { Link } from "react-router-dom";

interface Funcionario {
  id: number;
  nome_completo: string;
  funcao: string;
  cpf: string;
  telefone: string;
}

function Usuarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Estado do modal
  const [showModal, setShowModal] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<Funcionario | null>(null);
  const [deletando, setDeletando] = useState(false);

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await api.get("/administrador/funcionario/api/");
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFuncionarios();
  }, []);

  // 🔹 Abrir modal
  const abrirModalExcluir = (func: Funcionario) => {
    setFuncionarioSelecionado(func);
    setShowModal(true);
  };

  // 🔹 Confirmar exclusão
  const excluirFuncionario = async () => {
    if (!funcionarioSelecionado) return;

    setDeletando(true);

    try {
      await api.delete(`/administrador/funcionario/api/${funcionarioSelecionado.id}/`);
      setFuncionarios((prev) => prev.filter((f) => f.id !== funcionarioSelecionado.id));
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
      alert("Erro ao excluir funcionário.");
    } finally {
      setDeletando(false);
    }
  };

  return (
    <Container fluid className="py-2">
      <Card className="shadow-sm">
        <h4 className="m-2 text-center text-primary">Lista de Funcionários</h4>
        <hr style={{ width: "98%", alignSelf: "center" }} />

        <Card.Body>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          ) : (
            <div className="table-responsive">
              <Table bordered hover striped size="sm" className="align-middle text-center">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Nome Completo</th>
                    <th>Função</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {funcionarios.length > 0 ? (
                    funcionarios.map((func) => (
                      <tr key={func.id}>
                        <td>{func.id}</td>
                        <td>{func.nome_completo}</td>
                        <td>{func.funcao || "—"}</td>
                        <td>{func.cpf || "—"}</td>
                        <td>{func.telefone || "—"}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">

                            {/* Botão Editar */}
                            <Link
                              to={`/painel/admin/funcionario/editar/${func.id}`}
                              className="text-primary d-flex align-items-center"
                              style={{ textDecoration: "none" }}
                            >
                              <FaEdit size={16} />
                            </Link>

                            {/* Botão Excluir */}
                            <span
                              role="button"
                              className="text-danger d-flex align-items-center"
                              onClick={() => abrirModalExcluir(func)}
                            >
                              <FaRegTrashAlt size={16} />
                            </span>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-muted">
                        Nenhum funcionário encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* 🔻 Modal de Confirmação de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header 
          className="bg-danger text-white"  
          >
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          Tem certeza que deseja excluir o funcionário:
          <div className="mb-2">
          <strong>{funcionarioSelecionado?.nome_completo}</strong>?
          </div>
          <small className="text-danger fst-italic">
            * Esta ação não poderá ser desfeita.
          </small>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-success" onClick={() => setShowModal(false)}>
            Fechar
          </Button>

          <Button
            variant="danger"
            onClick={excluirFuncionario}
            disabled={deletando}
          >
            {deletando ? "Excluindo..." : "Excluir"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Usuarios;
