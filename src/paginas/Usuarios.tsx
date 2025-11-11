import { Card, Spinner, Container, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Usuarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.3.128:8000/funcionario/api/')
      .then(response => setFuncionarios(response.data))
      .catch(error => console.error('Erro ao buscar funcionários:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container fluid className="py-2">
      <Card className="shadow-sm">
          <h3 className="m-3 text-center text-primary">Lista de Funcionários</h3>
          <hr style={{width: '98%', alignSelf: 'center'}}/>
        <Card.Body>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Carregando...</span>
              </Spinner>
            </div>
          ) : (
            <Row className="g-3">
              {funcionarios.map(funcionario => (
                <Col xs={12} sm={6} md={4} lg={3} key={funcionario.id}>
                  <Card className="h-100 shadow-sm border-primary">
                    <Card.Body>
                      <Card.Title className="text-primary text-center">{funcionario.nome_completo}</Card.Title>
                      <Card.Text>
                        <strong>Data Nasc:</strong> {funcionario.data_nascimento} <br />
                        <strong>CPF:</strong> {funcionario.cpf} <br />
                        <strong>Telefone:</strong> {funcionario.telefone}
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

export default Usuarios;
