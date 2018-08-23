import InputRange from '../../../../src/t03/components/optimization/inputRange';
import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from "enzyme";

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe('Component renders as expected', () => {
    it('Renders correctly', () => {
        const rendered = renderer.create(
            <InputRange
                name="test"
                from={0}
                to={100}
                label="Test"
                label_from="min"
                label_to="max"
                onChange={() => {return true}}
            />
        );
        expect(rendered.toJSON()).toMatchSnapshot();
    });
});

test('Return onChange after changing values and onBlur', () => {
    const doneChange = jest.fn();
    const wrapper = mount(
        <InputRange
            name="test"
            from={0}
            to={100}
            label="Test"
            label_from="min"
            label_to="max"
            onChange={doneChange}
        />
    );
    const input1 = wrapper.find('input[name="from"]').hostNodes();
    input1.simulate('change', {target: {name: 'from', value: 20}});
    const input2 = wrapper.find('input[name="to"]').hostNodes();
    input2.simulate('change', {target: {name: 'to', value: 80}});
    input2.simulate('blur');
    expect(doneChange).toBeCalledWith({"from": 20, "name": "test", "to": 80});
});