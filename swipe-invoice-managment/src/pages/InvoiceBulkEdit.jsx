import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkList, updateBulk } from "../redux/updateSlice";
import { Button, Card, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { updateAll } from "../redux/invoicesSlice";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil, BiTrash } from "react-icons/bi";

function InvoiceBulkEdit() {
  const bulk = useSelector(bulkList);
  const [bulkData, setBulkData] = useState([...bulk]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleInputChange = (index, field, value) => {
    const updatedBulk = [...bulkData];

    updatedBulk[index] = {
      ...updatedBulk[index],
      [field]: value,
    };

    setBulkData(updatedBulk);
  };

  const handleUpdateAll = () => {
    dispatch(updateAll(bulkData));
    navigate("/");
  };

  return (
    bulkData.length && (
      <>
        <h3 className="fw-bold pb-2 pb-md-4 text-center">Swipe Assignment</h3>
        <Card className="d-flex p-3 p-md-4 p-sm-3">
          <div className=" d-flex justify-content-between ">
            <p className="fw-bold fs-3 ">Bulk Edit</p>
            <Button
              variant="primary mb-2 mb-md-4"
              className=" px-4"
              onClick={handleUpdateAll}
            >
              Update All
            </Button>
          </div>
          <Table responsive bordered hover className=" text-center ">
            <thead>
              <tr>
                <th className="">Invoice No</th>
                <th>Due Date</th>
                <th colSpan={3}>Bill To</th>
                <th colSpan={3}>Bill From</th>
                <th>Items</th>
                <th>Currency</th>
                <th>Tax Rate</th>
                <th>Discount Rate</th>
              </tr>
            </thead>
            <tbody>
              {bulkData.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td className=" p-0 ">
                    <Form.Control
                      className=" text-center bg-white "
                      type="text"
                      value={invoice.invoiceNumber}
                      name="invoiceNumber"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "invoiceNumber",
                          +e.target.value
                        )
                      }
                      placeholder="invoice no"
                      min="1"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      className=" text-center bg-white"
                      type="date"
                      value={invoice.dateOfIssue}
                      name="dateOfIssue"
                      onChange={(e) =>
                        handleInputChange(index, "dateOfIssue", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td className="p-0">
                    <Form.Control
                      type="text"
                      className=" text-center bg-white"
                      value={invoice.billTo}
                      name="billTo"
                      onChange={(e) =>
                        handleInputChange(index, "billTo", e.target.value)
                      }
                      placeholder="name"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="email"
                      className=" text-center bg-white"
                      value={invoice.billToEmail}
                      name="billToEmail"
                      onChange={(e) =>
                        handleInputChange(index, "billToEmail", e.target.value)
                      }
                      placeholder="email"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="text"
                      className=" text-center bg-white"
                      value={invoice.billToAddress}
                      name="billToAddress"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "billToAddress",
                          e.target.value
                        )
                      }
                      placeholder="address"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="text"
                      className=" text-center bg-white"
                      value={invoice.billFrom}
                      name="billFrom"
                      onChange={(e) =>
                        handleInputChange(index, "billFrom", e.target.value)
                      }
                      required
                      placeholder="name"
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="email"
                      className=" text-center bg-white"
                      value={invoice.billFromEmail}
                      name="billFromEmail"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "billFromEmail",
                          e.target.value
                        )
                      }
                      placeholder="email"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="text"
                      className=" text-center bg-white"
                      value={invoice.billFromAddress}
                      name="billFromAddress"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "billFromAddress",
                          e.target.value
                        )
                      }
                      placeholder="address"
                      required
                    />
                  </td>
                  <td className=" p-0 d-flex align-items-center px-2">
                    <Form.Control
                      type="text"
                      className=" text-center bg-white"
                      value={invoice.items.length}
                      name="items"
                      required
                    />
                    <Button
                      variant="outline-primary"
                      className=" p-1 "
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <BiSolidPencil />
                      </div>
                    </Button>
                    <Modal show={show}>
                      <Modal.Header
                        closeButton
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <Modal.Title>Items</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        {invoice.items.map((item, i) => (
                          <div
                            className=" d-flex gap-2 align-items-center "
                            key={i}
                          >
                            <h3>{i+1}. </h3>
                            <Form.Control
                              style={{border:'1px solid gainsboro'}}
                              type="text"
                              className=" text-center"
                              value={item.itemName}
                              name="itemName"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "itemName",
                                  e.target.value
                                )
                              }
                              placeholder="item name"
                              required
                            />
                            <Form.Control
                              style={{border:'1px solid gainsboro'}}
                              type="text"
                              className=" text-center"
                              value={item.itemDescription}
                              name="itemDescription"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "itemDescription",
                                  e.target.value
                                )
                              }
                              placeholder="item description"
                              required
                            />
                            <Form.Control
                              style={{border:'1px solid gainsboro'}}
                              type="number"
                              className=" text-center"
                              value={item.itemQuantity}
                              name="itemQuantity"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "itemQuantity",
                                  e.target.value
                                )
                              }
                              placeholder="item quantity"
                              required
                            />
                            <Form.Control
                              style={{border:'1px solid gainsboro'}}
                              type="number"
                              className=" text-center"
                              value={item.itemPrice}
                              name="itemPrice"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "itemPrice",
                                  e.target.value
                                )
                              }
                              placeholder="item price"
                              required
                            />
                            <Button
                              variant="danger"
                              onClick={""}
                              style={{}}
                              className="d-flex align-items-center justify-content-center gap-2"
                            >
                              Delete
                            </Button>
                          </div>
                        ))}
                      </Modal.Body>
                    </Modal>
                  </td>
                  <td className=" p-0">
                    <Form.Select
                      name="currency"
                      value={invoice.currency}
                      onChange={(e) =>
                        handleInputChange(index, "currency", e.target.value)
                      }
                      className="text-center rounded-0 "
                      aria-label="Change Currency"
                    >
                      <option value="$">USD (United States Dollar)</option>
                      <option value="£">GBP (British Pound Sterling)</option>
                      <option value="¥">JPY (Japanese Yen)</option>
                      <option value="$">CAD (Canadian Dollar)</option>
                      <option value="$">AUD (Australian Dollar)</option>
                      <option value="$">SGD (Singapore Dollar)</option>
                      <option value="¥">CNY (Chinese Renminbi)</option>
                      <option value="₿">BTC (Bitcoin)</option>
                    </Form.Select>
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="number"
                      className=" text-center bg-white"
                      value={invoice.taxRate}
                      name="taxRate"
                      onChange={(e) =>
                        handleInputChange(index, "taxRate", e.target.value)
                      }
                      placeholder="0.0 %"
                      required
                    />
                  </td>
                  <td className=" p-0">
                    <Form.Control
                      type="number"
                      className=" text-center bg-white"
                      value={invoice.discountRate}
                      name="discountRate"
                      onChange={(e) =>
                        handleInputChange(index, "discountRate", e.target.value)
                      }
                      placeholder="0.0 %"
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </>
    )
  );
}

export default InvoiceBulkEdit;
