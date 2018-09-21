import React from 'react';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import Home from './Home';

Enzyme.configure({ adapter: new Adapter() })


describe('Home renders',() => {

  it('Home component created', () => {
    const rendered = renderer.create(
      <Home 
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



