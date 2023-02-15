import React, { FunctionComponent, ReactNode } from 'react'
import {
  Modal,
} from "react-bootstrap";

type ModalProps = {
  title: string,
  show: boolean,
  handleClose: () => void,
  children: ReactNode
}

export const CModal: FunctionComponent<ModalProps> = ({ title, show, handleClose, children }) => {

  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};