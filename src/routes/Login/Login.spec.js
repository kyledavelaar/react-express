import React from 'react';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import Login from './Login';

Enzyme.configure({ adapter: new Adapter() })


describe('Login renders',() => {

  it('Login component created', () => {
    const rendered = renderer.create(
      <Login 
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  })

})


// const comp = shallow( 
//   <Home 
//   />
// )

// const allDateFormats = comp.instance().createAllFormats();

// describe('createsAllOptions', () => {

//   it('creates them all', () => {
//     expect(allDateFormats.length).toBe(96);
//   })


// })



