import { Card, Spinner, Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import api from "../autenticacao/axios";

interface Funcionario {
  id: number;
  nome_completo: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
}

function Responsaveis() {
  const [responsaveis, setFuncionarios] = useState<Funcionario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await api.get("responsavel/api/");
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar responsáveis:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFuncionarios();
  }, []);

  return (
    <Container fluid className="py-2">
      <Card className="shadow-sm">
        <h3 className="m-3 text-center text-primary">Lista</h3>
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
            <Row className="g-3">
              {responsaveis.map((responsavel) => (
                <Col xs={12} sm={6} md={4} lg={3} key={responsavel.id}>
                  <Card className="h-100 shadow-sm border-primary">
                    <Card.Body>
                      <Card.Title className="text-primary text-center">
                        {responsavel.nome_completo}
                      </Card.Title>
                      <Card.Text>
                        <strong>Data Nasc:</strong>{" "}
                        {responsavel.data_nascimento || "—"} <br />
                        <strong>CPF:</strong> {responsavel.cpf || "—"} <br />
                        <strong>Telefone:</strong> {responsavel.telefone || "—"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Responsaveis;
