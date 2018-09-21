import React from 'react';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import { Input } from './Input';

Enzyme.configure({ adapter: new Adapter() })


describe('Input renders',() => {

  it('Input component created', () => {
    const rendered = renderer.create(
      <Input 
      type={'text'}
      value={'my text'}
      name={'username'}
      placeholder={'input your username'}
      checked={false}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })

})
