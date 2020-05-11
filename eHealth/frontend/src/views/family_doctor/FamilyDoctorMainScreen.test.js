import React from 'react'
import { shallow, mount, render } from "enzyme";
import Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() });

import FamilyDoctorMainScreen from './FamilyDoctorMainScreen'
import PageTitle from './../../components/common/PageTitle';


const loadProps = {
    title: "Family Doctor",
}


describe(`Test <UploaderScreen />`, () => {
    const warpper = shallow(<FamilyDoctorMainScreen />)
    const PageTitleShallowApp = shallow(<PageTitle  {...loadProps} />)
    const PageTitleApp = render(<PageTitle  {...loadProps} />)

    it('1. FamilyDoctorMainScreen App Has been loaded', () => {
        expect(warpper).toMatchSnapshot();
    })

    it('2. PageTitle App Has been loaded', () => {
        expect(PageTitleShallowApp).toMatchSnapshot();
    })

    test('2.1 PageTitle App Has props\'s title\'s Family Doctor', () => {
        var ttext = PageTitleApp.find('.page-title-main').text()
        expect(ttext).toEqual('Family Doctor')
    })

})


