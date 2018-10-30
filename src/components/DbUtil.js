
import { Row, Button, Select, Form,Col } from 'antd';
import React from 'react';
const FormItem = Form.Item;

const Option = Select.Option;

export default class App extends React.Component {

  render() {

      function handleChange(value) {
        console.log(`selected ${value}`);
      }
      
      function handleBlur() {
        console.log('blur');
      }
      
      function handleFocus() {
        console.log('focus');
      }

      const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
      };

    return (
        <div>
            <div>
                <Form>
                    <FormItem {...formTailLayout}>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Select a person"
                                                optionFilterProp="children"
                                                onChange={handleChange}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                                filterOption={
                                                    (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                >
                                                    <Option value="jack">Jack</Option>
                                                    <Option value="lucy">Lucy</Option>
                                                    <Option value="tom">Tom</Option>
                                            </Select>
                        </Col>

                        <Col span={12}>
                            <Button type="primary">
                                                    新增
                                            </Button>

                        </Col>
                    </Row> 
                    

                                        
                    </FormItem> 

                    <FormItem {...formTailLayout}>
                                        <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        filterOption={
                                            (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="tom">Tom</Option>
                                    </Select>
                                </FormItem>
                    
                    <FormItem {...formTailLayout}>
                                    <Button type="primary">
                                            新增
                                    </Button>
                                </FormItem>
                    
                </Form>
            </div>

            <div>
            </div>
        </div>
    );
  }
}
