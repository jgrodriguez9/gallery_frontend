import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

export default function NomencladorSkeleton(){
    return(
        <div>
            <Card>
                <Card.Header className="py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Principal info</h6>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs lg="4">
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Skeleton height={35}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}