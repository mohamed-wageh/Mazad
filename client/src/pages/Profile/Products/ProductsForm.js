import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { AddProduct, EditProduct } from "../../../apiCalls/proudcts";
import Images from "./Images";

const additionalThings = [
  {
    label: "Bill available",
    name: "billAvailable",
  },
  {
    label: "Warranty available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        // message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);
  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey="1" onChange={(key) => setSelectedTab(key)}>
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Name" name="name" rules={rules}>
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={rules}
                  >
                    <TextArea type="text" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home">Home</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label="Show Bids on product page"
                    name="ShowBidsOnProductPage"
                    valuePropName="checked"
                  >
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          ShowBidsOnProductPage: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(
                        "ShowBidsOnProductPage"
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-wrap gap-10">
                {additionalThings.map((Item) => {
                  return (
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item
                        label={Item.label}
                        name={Item.name}
                        valuePropName="checked"
                      >
                        <Input
                          type="checkbox"
                          value={Item.name}
                          onChange={(e) => {
                            formRef.current.setFieldsValue({
                              [Item.name]: e.target.checked,
                            });
                          }}
                          checked={formRef.current?.getFieldValue(Item.name)}
                        />
                      </Form.Item>
                    </Col>
                  );
                })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              getData={getData}
              setShowProductForm={setShowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductForm;
